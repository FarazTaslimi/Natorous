import { icon } from '../utils/icons.js';

/**
 * Site footer: brand column, link columns, socials, newsletter, legal bar.
 * `{year}` in copyright is replaced at runtime by main.js.
 */
export function footer({ footer, site }) {
    return (
        `<footer class="footer">

            <div class="container">

                <div class="footer__grid">

                    <div class="footer__brand">

                        <a class="footer__logo" href="#home" aria-label="${site.name} — back to top">
                            ${icon('logo', 'footer__logo-icon')}
                            <span>${site.name}</span>
                        </a>

                        <p class="footer__about">${footer.about}</p>

                        <ul class="footer__socials" role="list">
                            ${footer.socials.map((social) => `
                                <li>
                                    <a class="footer__social" href="${social.href}" aria-label="${social.label}" title="${social.label}" target="_blank" rel="noopener">
                                        ${icon(social.icon)}
                                    </a>
                                </li>
                            `).join('\n')}
                        </ul>

                        <ul class="footer__contact" role="list">
                            <li class="footer__contact-item">${icon('mail', 'footer__contact-icon')} <a href="mailto:${footer.contact.email}">${footer.contact.email}</a></li>
                            <li class="footer__contact-item">${icon('phone', 'footer__contact-icon')} <a href="tel:${footer.contact.phone.replace(/[^+\d]/g, '')}">${footer.contact.phone}</a></li>
                            <li class="footer__contact-item">${icon('mapPin', 'footer__contact-icon')} <span>${footer.contact.address}</span></li>
                        </ul>

                    </div>

                    ${footer.columns.map((column) => `
                        <nav class="footer__col" aria-label="${column.title} links">
                            <h3 class="footer__col-title">${column.title}</h3>
                            <ul class="footer__links" role="list">
                                ${column.links.map((link) => `<li><a class="footer__link" href="${link.href}">${link.label}</a></li>`).join('\n')}
                            </ul>
                        </nav>
                    `).join('\n')}

                    <div class="footer__newsletter">

                        <h3 class="footer__col-title">${footer.newsletter.heading}</h3>
                        <p class="footer__newsletter-text">${footer.newsletter.text}</p>

                        <form class="footer__form" data-newsletter-form
                              ${footer.newsletter.action ? `action="${footer.newsletter.action}"` : ''} novalidate>

                            <label class="visually-hidden" for="newsletter-email">Email address</label>

                            <div class="footer__form-row">
                                <input class="footer__input" id="newsletter-email" name="email" type="email"
                                       placeholder="${footer.newsletter.placeholder}" autocomplete="email" required />
                                <button class="btn btn--primary footer__submit" type="submit" aria-label="Subscribe">
                                    ${icon('send')}
                                </button>
                            </div>

                            <p class="footer__form-success" data-form-success hidden>
                                ${icon('check', 'footer__form-success-icon')}
                                ${footer.newsletter.successMessage}
                            </p>

                        </form>

                    </div>

                </div>

                <div class="footer__bottom">

                    <p class="footer__copyright" data-copyright>${footer.copyright}</p>

                    <ul class="footer__legal" role="list">
                        ${footer.legalLinks.map((link) => `<li><a class="footer__link" href="${link.href}">${link.label}</a></li>`).join('\n')}
                    </ul>

                </div>

            </div>

        </footer>`
    );
}
