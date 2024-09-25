export interface SimplePost {
    affectedRows: number;
    message?: string;
}

export interface CreateClass extends SimplePost {
    id_class: number;
}