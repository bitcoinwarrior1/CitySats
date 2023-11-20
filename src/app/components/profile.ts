import { ObjectId } from "bson";

export interface Profile {
    lat: Number,
    lng: Number,
    id: ObjectId,
    buyer: boolean,
    seller: boolean,
    picture: string,
    reviews: Review[],
}

export interface Review {
    star: Number,
    comment: string,
}