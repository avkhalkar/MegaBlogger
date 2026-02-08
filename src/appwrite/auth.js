import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
// ID is for unique ID

export class AuthService {
    client = new Client();
    account;

    // Creating an account → makes a real user on Appwrite’s server.

    // Binding an account → just connects your code to Appwrite; creates nothing.

    constructor() {
        // Initialize Appwrite client with endpoint and project
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        // Bind the account to the client
        this.account = new Account(this.client);
    }

    async register({ email, password, name }) {


        try {
            // Creating account

            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // call another method: Once account created log in
                const session = await this.createSession({ email, password });
                return session;
            }
            return userAccount;
        }
        catch (error) {
            console.log("Appwrite service :: register :: error", error);
            throw error;
        }
    }

    async createSession({ email, password }) {
        const session = await this.account.createEmailPasswordSession(
            email,
            password
        );
        return session;
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        }
        catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async deleteSessions() {
        try {
            // Delete all the sessions i.e. from different browsers the user has logged in
            await this.account.deleteSessions();
        }
        catch (error) {
            console.log("Appwrite service :: deleteSessions :: error", error);
        }
    }

}

// Creating instance of Authservice class
const authservice = new AuthService();

// Exporting the instance
export default authservice;