import { asset } from '../utils/asset.js';
import { icon } from '../utils/icons.js';

/**
 * Expedition card: image, tag chip, price chip, meta row, CTA.
 * Data comes from config.tours.items.
 */
export function tourCard({ location, title, description, image, days, difficulty, groupSize, price, tag }, { currency, bookLabel, bookingUrl }) {
    return (
        `<article class="tour-card reveal">

            <div class="tour-card__media">
                <img class="tour-card__img" src="${asset(image)}" alt="${location} — ${title}" loading="lazy" />

                ${tag ? `<span class="chip tour-card__tag">${tag}</span>` : ''}
                <span class="chip chip--price tour-card__price">
                    <span class="tour-card__price-currency">${currency}</span>${price}
                    <span class="tour-card__price-per">/ person</span>
                </span>
            </div>

            <div class="tour-card__body">

                <p class="tour-card__location">
                    ${icon('mapPin', 'tour-card__location-icon')}
                    ${location}
                </p>

                <h3 class="tour-card__title">${title}</h3>

                <p class="tour-card__description">${description}</p>

                <ul class="tour-card__meta" role="list">
                    <li class="tour-card__meta-item">
                        ${icon('calendar', 'tour-card__meta-icon')}
                        <strong>${days}</strong> days
                    </li>
                    <li class="tour-card__meta-item">
                        ${icon('clock', 'tour-card__meta-icon')}
                        ${difficulty}
                    </li>
                    <li class="tour-card__meta-item">
                        ${icon('users', 'tour-card__meta-icon')}
                        max <strong>${groupSize}</strong>
                    </li>
                </ul>

                <a class="btn btn--outline tour-card__cta" href="${bookingUrl}">
                    ${bookLabel}
                    ${icon('arrowRight', 'btn__icon')}
                </a>

            </div>

        </article>`
    );
}
