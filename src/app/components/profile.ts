import { ObjectId } from 'bson';

export interface Contact {
    telegram?: string;
    email?: string;
    wickr?: string;
    signal?: string;
    whatsapp?: string;
}

export interface AuthData {
    name: string;
    picture: string;
    email: string;
}

export interface Profile {
    lat: number;
    lng: number;
    _id?: ObjectId;
    buyer: boolean;
    seller: boolean;
    picture: string;
    reviews?: Review[];
    contact?: Contact;
    bio: string;
    markerImagePath: string;
    username: string;
}

export interface Review {
    profileId?: ObjectId; // profileId of the user who is reviewing
    star: number;
    comment?: string;
}

export interface SubmitReview extends Review {
    username: string; // username of the profile who is getting reviewed
}
