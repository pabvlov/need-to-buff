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
}

export interface Athlete {
    id:        number;
    name:      string;
    lastname:  string;
    birthdate: Date;
    image:     null;
    work_line: string;
}
