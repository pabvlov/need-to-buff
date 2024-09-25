export interface GetClasses {
    id:                   number;
    id_establishment:     number;
    id_planification:     number | null;
    start_date:           Date;
    end_date:             Date;
    teacher:              Teacher;
    planning:             Planning[];
    warmups:              Warmup[];
    physicalpreparations: Physicalpreparation[];
    group:                Group;
}

export interface Group {
    id:         number;
    name:       string;
    difficulty: string;
    athletes:   AthleteElement[];
}

export interface AthleteElement {
    athlete_id:    number;
    athlete:       AthleteEnum;
    athlete_image: null;
}

export enum AthleteEnum {
    JuliánPrieto = "Julián Prieto",
    PabloPrieto = "Pablo Prieto",
}

export interface Physicalpreparation {
    physical_preparation: string;
    quantity:             number;
}

export interface Planning {
    apparatus: Apparatus;
    element:   Element;
}

export interface Apparatus {
    name: string;
}

export interface Element {
    id:         number;
    name:       string;
    video:      null;
    image:      null;
    difficulty: string;
}

export interface Teacher {
    id:         number;
    assistence: boolean;
}

export interface Warmup {
    warm_up:       string;
    quantity:      number;
    quantity_type: string;
}
