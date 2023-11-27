import { ObjectId } from 'bson';

export interface Contact {
    telegram?: string;
    email?: string;
    wickr?: string;
    signal?: string;
}

export interface AuthData {
    name: string;
    picture: string;
    email: string;
}

export interface Profile {
    lat?: number;
    lng?: number;
    _id?: ObjectId;
    buyer?: boolean;
    seller?: boolean;
    picture?: string;
    reviews?: Review[];
    contact?: Contact;
    bio?: string;
    markerImagePath?: string;
    username: string;
}

export interface Review {
    star: number;
    comment?: string;
}
