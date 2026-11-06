import { icon } from '../utils/icons.js';

/**
 * Traveller review card with initials avatar (photos can be added later:
 * extend config item with "photo": "avatar.jpg" and render it here).
 */
export function reviewCard({ name, trip, rating, text }) {
    const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
    const stars = Array.from({ length: 5 }, (_, i) => icon('star', `review-card__star ${i < rating ? 'is-filled' : ''}`)).join('');

    return (
        `<figure class="review-card reveal">

            <div class="review-card__top">

                <span class="review-card__avatar" aria-hidden="true">${initials}</span>

                <div class="review-card__person">
                    <figcaption class="review-card__name">${name}</figcaption>
                    <span class="review-card__trip">${trip}</span>
                </div>

                ${icon('quote', 'review-card__quote')}

            </div>

            <div class="review-card__stars" role="img" aria-label="Rated ${rating} out of 5 stars">
                ${stars}
            </div>

            <blockquote class="review-card__text">${text}</blockquote>

        </figure>`
    );
}
