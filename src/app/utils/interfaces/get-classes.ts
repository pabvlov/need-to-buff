export interface GetClasses {
    id_establishment: number;
    classes:          Class[];
}

export interface Class {
    id:               number;
    id_establishment: number;
    start_date:       Date;
    end_date:         Date;
    teacher:          Teacher;
    planning:         Planning;
    group:            Group;
    presences:        Presence[];
}

export interface Group {
    id:         number;
    name:       string;
    difficulty: string;
    athletes:   GroupAthlete[];
}

export interface GroupAthlete {
    athlete_id:    number;
    athlete:       string;
    athlete_image: null;
}

export interface Planning {
    id:                    number;
    apparatuses:           Apparatus[];
    warm_ups:              WarmUp[];
    physical_preparations: PhysicalPreparation[];
}

export interface Apparatus {
    id:       number;
    name:     string;
    image:    null;
    elements: Element[];
}

export interface Element {
    id:         number;
    name:       string;
    video:      null | string;
    image:      null | string;
    difficulty: string;
}

export interface PhysicalPreparation {
    physical_preparation: string;
    quantity:             number | null;
    quantity_type:        null;
}

export interface WarmUp {
    warm_up:       string;
    quantity:      number | null;
    quantity_type: null | string;
}

export interface Presence {
    date:     Date;
    athletes: PresenceAthlete[];
}

export interface PresenceAthlete {
    id_athlete: number;
    athlete:    string;
}

export interface Teacher {
    id:         number;
    name:       string;
    lastname:   string;
    assistence: boolean;
}


export interface AttachClasses {
    id_planification: number;
    classes: Clase[];
}

export interface Clase {
    id: number;
}
