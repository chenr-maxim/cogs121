export const DEFAULT_PICTURE_URL = '/assets/default-profile-pic.svg';

import { Meteor } from 'meteor/meteor';

export interface User extends Meteor.User {
    profile?: Profile;
}

export interface Profile {
    name?: string;
    pictureId?: string;
}

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

export interface Reviews extends Model {
    creatorId: string;
    providerId: string;
    subject?: string;
}

export interface Picture {
    _id?: string;
    complete?: boolean;
    extension?: string;
    name?: string;
    progress?: number;
    size?: number;
    store?: string;
    token?: string;
    type?: string;
    uploadedAt?: Date;
    uploading?: boolean;
    url?: string;
    userId?: string;
}