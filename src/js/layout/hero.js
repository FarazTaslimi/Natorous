import { asset } from '../utils/asset.js';
import { icon } from '../utils/icons.js';
import { statBox } from '../components/statBox.js';

/**
 * Full-screen hero with background image, headline, CTAs and a stat bar.
 * Content comes entirely from config.hero + config.stats.
 */
export function hero({ hero, stats }) {
    return (
        `<section class="hero" id="home">

            <picture class="hero__bg">
                <img src="${asset(hero.image)}" alt="${hero.imageAlt}" fetchpriority="high" />
            </picture>
            <div class="hero__scrim" aria-hidden="true"></div>

            <div class="hero__content container">

                <p class="eyebrow reveal">${hero.eyebrow}</p>

                <h1 class="hero__title">
                    <span class="hero__title-line reveal">${hero.titleLine1}</span>
                    <span class="hero__title-line reveal">
                        <span class="text-gradient">${hero.titleAccent}</span>
                        ${hero.titleLine2}
                    </span>
                </h1>

                <p class="hero__text reveal">${hero.text}</p>

                <div class="hero__actions reveal">
                    <a class="btn btn--primary" href="${hero.primaryCta.href}">
                        ${hero.primaryCta.label}
                        ${icon('arrowRight', 'btn__icon')}
                    </a>
                    <a class="btn btn--ghost" href="${hero.secondaryCta.href}" data-hero-secondary>
                        ${hero.secondaryCta.icon ? icon(hero.secondaryCta.icon, 'btn__icon') : ''}
                        ${hero.secondaryCta.label}
                    </a>
                </div>

            </div>

            <div class="hero__scroll reveal" aria-hidden="true">
                <span class="hero__scroll-text">${hero.scrollHint}</span>
                <span class="hero__scroll-line"></span>
            </div>

            <div class="hero__stats">
                <div class="hero__stats-inner container">
                    ${stats.map((stat) => statBox(stat)).join('\n')}
                </div>
            </div>

        </section>`
    );
}
