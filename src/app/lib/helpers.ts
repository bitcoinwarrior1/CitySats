import { Profile, Review } from '../components/profile';

export const getStarRatingInfo = (reviews: Review[]) => {
    let total = 0;
    for (const review of reviews) {
        total += review?.star;
    }

    let description = 'no reviews yet';
    if (reviews.length == 1) {
        description = '1 review';
    } else if (reviews.length > 1) {
        description = `${reviews.length} reviews`;
    }

    return {
        average: total / reviews.length,
        numberOfReviews: reviews.length,
        description
    };
};

export const setMarkerImage = (profile: Profile) => {
    if (profile.buyer && profile.seller) {
        profile.markerImagePath = 'buyerAndSeller.jpeg';
    } else if (profile.seller) {
        profile.markerImagePath = 'seller.png';
    } else {
        profile.markerImagePath = 'buyer.png';
    }
};
