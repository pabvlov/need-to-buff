export interface GroupsResponse {
    id_establishment: number;
    groups:           Group[];
}

export interface Group {
    id:         number;
    name:       string;
    difficulty: string;
    athletes:   Athlete[];
}

export interface Athlete {
    id:    number;
    name:  string;
    image: null;
}
