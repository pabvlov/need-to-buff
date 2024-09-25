export interface WarmUps {
    id:   number;
    name: string;
}

export interface WarmUpsByClass {
    id_class:             number;
    warm_up:              string;
    quantity:             number;
    quantity_type:        string;
    quantity_type_single: string;
}

export interface PostWarmUp {
    id_warmup:    number;
    affectedRows: number;
}

export interface DeleteWarmUp {
    affectedRows: number;
}