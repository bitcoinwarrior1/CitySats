import { Profile, Review } from '../components/profile';

export const getRatingInfo = (reviews: Review[]) => {
    let total = 0;
    for (const review of reviews) {
        total += review?.star;
    }

    let description = 'No reviews yet.';
    if (reviews.length == 1) {
        description = '1 review.';
    } else if (reviews.length > 1) {
        description = `${reviews.length} reviews.`;
    }

    return {
        average: total / reviews.length,
        numberOfReviews: reviews.length,
        description
    };
};

export const getRatingDescription = (reviews: Review[]) => {
    const { average, numberOfReviews, description } = getRatingInfo(reviews);
    if (description === 'No reviews yet.') return description;
    return `${average} stars, ${numberOfReviews} reviews.`;
};

export const setMarkerImage = (profile: Profile) => {
    if (profile.buyer && profile.seller) {
        profile.markerImagePath = 'buyerAndSeller.png';
    } else if (profile.seller) {
        profile.markerImagePath = 'seller.png';
    } else {
        profile.markerImagePath = 'buyer.png';
    }
};
