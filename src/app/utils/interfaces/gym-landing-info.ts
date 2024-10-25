export interface GymLandingInfo {
    banners:        Content[];
    community:      Community;
    establishments: Establishment[];
    content:        Content[];
}

export interface Content {
    id:                number;
    url:               string;
    id_establishment?: number;
    id_user:           number;
    user_name:         string;
    user_lastname:     string;
    user_mail:         string;
    description:       string;
    index?:            number;
    date?:             null;
}

export interface Community {
    razon_social: string;
    acronym:      string;
    logo:         string;
    contact:      number;
    instagram:    string;
    facebook:     string;
    description:  string;
}

export interface Establishment {
    id:       number;
    name:     string;
    address:  string;
    capacity: number;
    athletes: Athlete[];
}

export interface Athlete {
    id_athlete:       number;
    id_establishment: number;
    athlete_name:     string;
    athlete_lastname: string;
    birthdate:        Date;
    image:            null;
}
