export interface FindUserResponse {
    ok: boolean;
    content: FullName;
}

export interface FullName {
    name: string;
    lastname: string;
}