export interface UserCommunities {
    communities: Community[];
}

export interface Community {
    id:             number;
    razon_social:   string;
    acronym:        string;
    logo:           string;
    contact:        number;
    instagram:      string;
    facebook:       string;
    establishments: Establishment[];
}

export interface Establishment {
    id:      number;
    name:    string;
    address: string;
    capacity: number;
}
