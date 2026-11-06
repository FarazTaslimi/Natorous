import { asset } from '../utils/asset.js';
import { icon } from '../utils/icons.js';

/**
 * Full-width call-to-action panel with starry-sky background.
 */
export function cta({ cta }) {
    return (
        `<section class="cta section" id="contact">

            <div class="container">

                <div class="cta__panel reveal">

                    <img class="cta__bg" src="${asset(cta.image)}" alt="" loading="lazy" />
                    <span class="cta__scrim" aria-hidden="true"></span>

                    <div class="cta__content">

                        <h2 class="cta__heading">${cta.heading}</h2>
                        <p class="cta__text">${cta.text}</p>
                        <a class="btn btn--primary btn--lg" href="${cta.button.href}">
                            ${cta.button.label}
                            ${icon('arrowRight', 'btn__icon')}
                        </a>

                    </div>

                </div>

            </div>

        </section>`
    );
}
