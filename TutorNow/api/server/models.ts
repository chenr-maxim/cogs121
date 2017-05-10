export interface Model {
    createdAt: Date;
}

export interface Provider extends Model {
    name?: string;
    latitude?: number;
    longitude?: number;
    picture?: string;
}

export interface TutorLocation
{
    latitude?: number;
    longitude?: number;
    lastUpdated: Date;
    isActive?: boolean;
    userId: string
}