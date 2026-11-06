import { icon } from '../utils/icons.js';

/**
 * Sticky site header: logo, nav (from config), CTA.
 * Mobile behaviour is handled in main.js (burger + overlay).
 */
export function header({ site, nav }) {
    return (
        `<header class="header" id="header" data-header>

            <div class="header__inner container">

                <a class="header__brand" href="#home" aria-label="${site.name} — home">
                    ${icon('logo', 'header__brand-icon')}
                    <span class="header__brand-text">
                        <span class="header__brand-name">${site.name}</span>
                        <span class="header__brand-tagline">${site.tagline}</span>
                    </span>
                </a>

                <nav class="header__nav" id="site-nav" data-nav aria-label="Main navigation">
                    ${nav.map((link, i) => `
                        <a class="header__link ${i === 0 ? 'is-active' : ''}" href="${link.href}" data-nav-link>${link.label}</a>
                    `).join('\n')}
                </nav>

                <div class="header__actions">
                    <a class="btn btn--primary btn--sm header__cta" href="${site.bookingUrl}">
                        Book a trip
                        ${icon('arrowUpRight', 'btn__icon')}
                    </a>

                    <button class="header__burger" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">
                        ${icon('menu', 'header__burger-open')}
                        ${icon('close', 'header__burger-close')}
                    </button>
                </div>

            </div>

        </header>`
    );
}
