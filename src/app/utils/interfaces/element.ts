export interface RequestCreateElement {
    name:                  string;
    video:                 string;
    image:                 string;
    id_element_connection?: number;
    difficulty:            string;
    id_apparatus:          number;
}

export interface ResponseCreateElement {
    id_element:   number;
    affectedRows: number;
}


export interface ResponseElements {
    id:          number;
    name:        string;
    image:       null;
    difficulty:  string;
    apparatus:   Apparatus;
    connections: Apparatus[];
}

export interface Apparatus {
    id:          number;
    name:        string;
    image:       null;
    gender?:     string;
    difficulty?: string;
}

export interface ResponseApparatus {
    id:     number;
    name:   string;
    gender: Gender;
    image:  null;
}

export enum Gender {
    F = "F",
    M = "M",
}

export interface ElementsByApparatus {
    id_apparatus: number;
    elements:     ResponseElements[];
}
