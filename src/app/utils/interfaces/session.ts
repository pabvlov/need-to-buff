import { User } from "./user";

export interface Session {
    content: Content;
}

export interface Content {
    user:  User;
    token?: string;
}
