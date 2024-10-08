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

/* export interface ResponseApparatus {
    id:     number;
    name:   string;
    gender: Gender;
    image:  null;
}

export enum Gender {
    F = "F",
    M = "M",
} */

export interface Apparatus {
    id:       number;
    name:     string;
    image:    null;
    gender:   Gender;
    elements: Element[];
}

export interface Element {
    id:           number;
    name:         string;
    image:        null | string;
    difficulty:   string;
    connections?: Element[];
}

export enum Gender {
    Femenino = "Femenino",
    Masculino = "Masculino",
}

export interface ApparatusesRequest {
    apparatuses: ApparatusRequest[];
}

export interface ApparatusRequest {
    id: number;
}