import { Profile, Review } from '../components/profile';

export const getStarRatingInfo = (reviews: Review[]) => {
    let total = 0;
    for (const review of reviews) {
        total += review.star;
    }

    return {
        average: total / reviews.length,
        numberOfReviews: reviews.length
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
