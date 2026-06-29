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

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId, authorName }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                { title, content, featuredImage, status, userId, authorName }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const payload = { title, content, status };
            if (featuredImage !== undefined) payload.featuredImage = featuredImage;

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                payload
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error);
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
            );
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            throw error;
        }
    }

    async getPosts({ filters = [Query.equal("status", "active")], limit = 4, offset = 0 } = {}) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                [
                    ...filters,
                    Query.orderDesc("$createdAt"),
                    Query.limit(limit),
                    Query.offset(offset),
                ]
            );
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error", error);
            throw error;
        }
    }

    async getUserPosts(userId, { limit = 4, offset = 0, status = 'active' } = {}) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                [
                    Query.equal("userId", userId),
                    Query.equal("status", status),
                    Query.orderDesc("$createdAt"),
                    Query.limit(limit),
                    Query.offset(offset),
                ]
            );
        } catch (error) {
            console.error("Appwrite service :: getUserPosts :: error", error);
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("Appwrite service :: deleteFile :: error", error);
            throw error;
        }
    }

    getFileView(fileId) {
        return this.bucket.getFileView(conf.appwriteBucketId, fileId);
    }
}

const service = new Service();
export default service;
