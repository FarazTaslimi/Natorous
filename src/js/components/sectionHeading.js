/**
 * Shared section heading block: eyebrow + heading + optional lead text.
 * Used by tours / destinations / reviews — keys come straight from config.
 */
export function sectionHeading({ eyebrow, heading, text }, modifiers = '') {
    return (
        `<div class="section-heading ${modifiers}">

            <p class="eyebrow reveal">${eyebrow}</p>
            <h2 class="section-heading__title reveal">${heading}</h2>
            ${text ? `<p class="section-heading__text reveal">${text}</p>` : ''}

        </div>`
    );
}
