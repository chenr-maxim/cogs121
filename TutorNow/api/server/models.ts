import { Meteor } from 'meteor/meteor';

export interface User extends Meteor.User {
    profile?: Profile;
}

export interface Profile {
    name?: string;
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

export interface Request 
{
    requesterId:string,
    requesteeId: string,
    handshake: string
}

export interface Acknowledge
{
    requesterId: string
    handshake:string,
    accepted:boolean
}

export interface Session 
{
    requesterId:string,
    requesteeId:string,
    sessionId:string,
    active:boolean,
    startTime: Date,
}