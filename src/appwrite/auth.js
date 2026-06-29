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

    async loginWithGoogle() {
        try {
            this.account.createOAuth2Session(
                'google',
                `${window.location.origin}/`,
                `${window.location.origin}/login`
            )
        } catch (error) {
            console.error("Appwrite service :: loginWithGoogle :: error", error);
            throw error;
        }
    }

    async loginWithGitHub() {
        try {
            this.account.createOAuth2Session(
                'github',
                `${window.location.origin}/`,
                `${window.location.origin}/login`
            )
        } catch (error) {
            console.error("Appwrite service :: loginWithGitHub :: error", error);
            throw error;
        }
    }

    async sendPasswordRecovery(email) {
        try {
            return await this.account.createRecovery(email, `${window.location.origin}/reset-password`);
        } catch (error) {
            console.error("Appwrite service :: sendPasswordRecovery :: error", error);
            throw error;
        }
    }

    async confirmPasswordRecovery(userId, secret, password) {
        try {
            return await this.account.updateRecovery(userId, secret, password);
        } catch (error) {
            console.error("Appwrite service :: confirmPasswordRecovery :: error", error);
            throw error;
        }
    }

    async sendVerification() {
        try {
            return await this.account.createVerification(`${window.location.origin}/verify-email`);
        } catch (error) {
            console.error("Appwrite service :: sendVerification :: error", error);
            throw error;
        }
    }

    async confirmVerification(userId, secret) {
        try {
            return await this.account.updateVerification(userId, secret);
        } catch (error) {
            console.error("Appwrite service :: confirmVerification :: error", error);
            throw error;
        }
    }
}

const authservice = new AuthService();
export default authservice;
