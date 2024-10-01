export interface FindUsersResponse {
    users: User[];
}

export interface User {
    id:        number;
    mail:      string;
    name:      string;
    lastname:  string;
    birthdate: Date;
    contact:   number;
    athletes:  Athlete[];
    roles: Rol[];
}

export interface Rol {
    id:          number;
    role: string;
}

export interface Athlete {
    id:        number;
    name:      string;
    lastname:  string;
    birthdate: Date;
    image:     null;
    work_line: string;
}

export interface AthleteUser {
    id:        number;
    name:      string;
    lastname:  string;
    birthdate: Date;
    image:     null;
    work_line: string;
    user:      User;
}