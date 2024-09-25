export interface Group {
    id:                  number;
    name:                string;
    difficulty_category: string;
    athletes:            Athlete[];
}

export interface Athlete {
    id:    number;
    name:  string;
    image: null;
}
