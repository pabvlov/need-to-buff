export interface GetClasses {
    id:               number;
    id_establishment: number;
    start_date:       Date;
    end_date:         Date;
    teacher:          Teacher;
    planning:         Planning | null;
    group:            Group;
}

export interface Group {
    id:         number;
    name:       string;
    difficulty: string;
    athletes:   AthleteElement[];
}

export interface AthleteElement {
    athlete_id:    number;
    athlete:       string;
    athlete_image: null;
}

export interface Planning {
    id:                    number;
    elements:              any[];
    warm_ups:              WarmUp[];
    physical_preparations: PhysicalPreparation[];
}

export interface PhysicalPreparation {
    physical_preparation: string;
    quantity:             number;
}

export interface WarmUp {
    warm_up:       string;
    quantity:      number;
    quantity_type: string;
}

export interface Teacher {
    id:         number;
    name:       string;
    lastname:   string;
    assistence: boolean;
}
