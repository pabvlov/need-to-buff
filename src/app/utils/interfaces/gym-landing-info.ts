export interface GymLandingInfo {
    banners:        Banner[];
    community:      Community;
    establishments: Establishment[];
}

export interface Banner {
    url:              string;
    id_establishment: number;
    id_athlete:       number;
    athlete_name:    string;
    athlete_lastname: string;
    description:      string;
    index:            number;
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
    birthdate:        null;
    image:            string;
}
