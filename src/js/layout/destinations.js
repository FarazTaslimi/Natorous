import { asset } from '../utils/asset.js';
import { sectionHeading } from '../components/sectionHeading.js';
import { icon } from '../utils/icons.js';

/**
 * Destination cards grid. Each card = photo, name, country, number of trips.
 */
export function destinations({ destinations }) {
    return (
        `<section class="destinations section" id="${destinations.id}">

            <div class="container">

                ${sectionHeading(destinations, 'section-heading--split')}

                <div class="destinations__grid">
                    ${destinations.items.map((dest) => `
                        <a class="dest-card reveal" href="${destinations.moreHref}" aria-label="${dest.name}, ${dest.country}">
                            <img class="dest-card__img" src="${asset(dest.image)}" alt="${dest.name}, ${dest.country}" loading="lazy" />

                            <span class="chip chip--trips dest-card__trips">
                                ${dest.trips} ${destinations.tripsLabel}
                            </span>

                            <span class="dest-card__overlay" aria-hidden="true"></span>

                            <span class="dest-card__caption">
                                <span class="dest-card__name">${dest.name}</span>
                                <span class="dest-card__country">
                                    ${icon('mapPin', 'dest-card__country-icon')}
                                    ${dest.country}
                                </span>
                            </span>
                        </a>
                    `).join('\n')}
                </div>

                <div class="destinations__more reveal">
                    <a class="btn btn--outline btn--lg" href="${destinations.moreHref}">
                        ${destinations.moreLabel}
                        ${icon('arrowRight', 'btn__icon')}
                    </a>
                </div>

            </div>

        </section>`
    );
}
