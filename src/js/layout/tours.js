import { tourCard } from '../components/tourCard.js';
import { sectionHeading } from '../components/sectionHeading.js';
import { icon } from '../utils/icons.js';

/**
 * Featured expeditions section with optional tag filter chips.
 * Filtering logic lives in main.js (data-tag attributes below).
 */
export function tours({ tours, site }) {
    const tags = [...new Set(tours.items.map((t) => t.tag).filter(Boolean))];

    const filterChips = tours.showFilters
        ? `
            <div class="tours__filters reveal" role="group" aria-label="Filter expeditions">
                <button class="chip chip--filter is-active" type="button" data-filter="all">${tours.allFilterLabel}</button>
                ${tags.map((tag) => `<button class="chip chip--filter" type="button" data-filter="${tag}">${tag}</button>`).join('\n')}
            </div>`
        : '';

    return (
        `<section class="tours section" id="${tours.id}">

            <div class="container">

                ${sectionHeading(tours)}

                ${filterChips}

                <div class="tours__grid" data-tours-grid>
                    ${tours.items.map((tour) => tourCard(tour, { currency: site.currency, bookLabel: tours.bookLabel, bookingUrl: site.bookingUrl })).join('\n')}
                </div>

                <p class="tours__empty" data-tours-empty hidden>
                    No expeditions match this filter right now.
                </p>

                <div class="tours__more reveal">
                    <a class="btn btn--outline btn--lg" href="${tours.moreHref}">
                        ${tours.moreLabel}
                        ${icon('arrowRight', 'btn__icon')}
                    </a>
                </div>

            </div>

        </section>`
    );
}
