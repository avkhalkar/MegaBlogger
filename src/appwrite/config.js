import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client;
    databases;
    bucket;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        // Setting up databases
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const createdPost = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug, // Document id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
            return createdPost;
        }
        catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const updatedPost = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug, // Document id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
            return updatedPost;
        }
        catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug, // Document id
            );
            return true;
        }
        catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug, // Document id
            );
            return post;
        }
        catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
        }
    }

    // Return all active ones
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const posts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                queries
            );
            return posts;
        }
        catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // File upload: in storage i.e. bucket

    async uploadFile(file) {
        try {
            const fileResponse = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            console.log(fileResponse);
            return fileResponse;
        }
        catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        }
        catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // This is not async function
    getFileView(fileId) {
        const storage = new Storage(this.client);
        return storage.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId
        });
    }

}

// Creating object-instance of Service class
const service = new Service();

// Exporting the instance
export default service;