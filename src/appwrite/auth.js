import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async register({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return await this.createSession({ email, password });
            }
            return userAccount;
        } catch (error) {
            console.error("Appwrite service :: register :: error", error);
            throw error;
        }
    }

    async createSession({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Appwrite service :: createSession :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async deleteSessions() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite service :: deleteSessions :: error", error);
            throw error;
        }
    }
}

const authservice = new AuthService();
export default authservice;
