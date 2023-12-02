import { Contact, Profile } from '../components/profile';

export const emptyContact: Contact = {
    telegram: '',
    email: '',
    wickr: '',
    signal: ''
};

export const emptyProfile: Profile = {
    lat: 0,
    lng: 0,
    buyer: false,
    seller: false,
    picture: '',
    bio: '',
    markerImagePath: '',
    username: '',
    reviews: [],
    contact: emptyContact
};
