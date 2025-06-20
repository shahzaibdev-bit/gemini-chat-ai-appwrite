// config.js
import conf from "../conf/conf.js";
import { Client, ID, Databases, Query, Permission, Role } from "appwrite";

export class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  async storePrompt({ prompts, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          prompts, // ✅ Must match your Appwrite collection's field name
          userId,
        },
        [
          Permission.read(Role.user(userId)),
          Permission.write(Role.user(userId)),
        ]
      );
    } catch (error) {
      console.error("Appwrite :: storePrompt :: error", error);
      return null;
    }
  }

  async getPrompts(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.error("Appwrite :: getPrompts :: error", error);
      return null;
    }
  }
}

const service = new Service();
export default service;
