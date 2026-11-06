import { reviewCard } from '../components/reviewCard.js';
import { sectionHeading } from '../components/sectionHeading.js';

/**
 * Traveller stories / reviews section.
 */
export function reviews({ reviews }) {
    return (
        `<section class="reviews section" id="${reviews.id}">

            <div class="container">

                ${sectionHeading(reviews, 'section-heading--center')}

                <div class="reviews__grid">
                    ${reviews.items.map((review) => reviewCard(review)).join('\n')}
                </div>

            </div>

        </section>`
    );
}
