import { SelectPhysicalPreparation } from "./physical-preparations";
import { SelectWarmUp } from "./warm-ups";

export interface GetPlanifications {
    id:                   number;
    name:                 null;
    id_establishment:     number;
    warmups:              Warmup[];
    physicalpreparations: Physicalpreparation[];
    achievements:         any[];
}

export interface Physicalpreparation {
    id_planification:     number;
    physical_preparation: string;
    quantity:             number;
    quantity_type:        string;
    quantity_type_single: string;
}

export interface Warmup {
    id_planification:     number;
    warm_up:              string;
    quantity:             number;
    quantity_type:        string;
    quantity_type_single: string;
}

export interface RequestPostPlanification {
    id_establishment: number;
    elements:        number[];
    warmups:         SelectWarmUp[];
    physicalpreparations: SelectPhysicalPreparation[];
}

export interface PostPlanificationResponse {
    planification?: Planification;
    affectedRows:  number;
    message:       string;
}

export interface Planification {
    id:                   number;
    warmups:              Warmup[];
    physicalpreparations: Physicalpreparation[];
    elements:             Element[];
}

export interface Element {
    id_planification:    number;
    element_achievement: string;
}