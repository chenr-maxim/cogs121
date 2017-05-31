import { Meteor } from 'meteor/meteor';

export interface User extends Meteor.User {
    profile?: Profile;
}

export interface Profile {
    name?: string;
    lat?: number;
    lng?: number;
}

export interface Model {
    _id?:string;
    createdAt?: Date;
}

export interface Provider extends Model {
    name?: string;
    latitude?: number;
    longitude?: number;
    picture?: string;
}

export interface TutorLocation extends Model
{
    latitude?: number;
    longitude?: number;
    lastUpdated: Date;
    isActive?: boolean;
    userId: string
}

export interface Request extends Model
{
    requesterId: string,
    requesteeId: string,
    handshake: string
}

export interface Acknowledge extends Model
{
    requesterId: string,
    requesteeId: string,
    requester?: User,
    requestee?: User,
    handshake:string,
    accepted:boolean
}

export interface Session extends Model
{
    requesterId:string,
    requesteeId:string,
    sessionId:string,
    active:boolean,
    startTime: Date,
}