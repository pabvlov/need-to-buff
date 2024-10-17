export interface FindUsersResponse {
    establishments: Establishment[];
}

export interface Establishment {
    id_establishment: number;
    user: User[];
}

export interface User {
    id: number;
    mail: string;
    name: string;
    lastname: string;
    birthdate: Date;
    contact: number;
    athletes: Athlete[];
    roles: Role[];
}

export interface Athlete {
    id: number;
    name: string;
    lastname: string;
    birthdate: Date;
    image: null;
    work_line: string;
    active: string;
}

export interface Role {
    id: number;
    role: string;
    id_establishment: number;
}
export interface AthleteUser {
    id: number;
    name: string;
    lastname: string;
    birthdate: Date;
    image: null;
    work_line: string;
    id_establishment: number;
    user: UserData
}

export interface UserData {
    id: number;
    mail: string;
    name: string;
    lastname: string;
    birthdate: Date;
    contact: number;
    roles: Role[];
}