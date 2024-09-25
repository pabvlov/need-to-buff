export interface CreateClassRequest {
    id_group: number;
    id_user_teacher: number;
    id_planification: number | null;
    start_date: string;
    end_date: string;
    id_establishment: number;
    teacher_assistence: boolean;
}