import { asset } from '../utils/asset.js';
import { icon } from '../utils/icons.js';

/**
 * Full-width call-to-action panel with starry-sky background.
 *
 * Two modes, both driven entirely by site.config.json:
 *  - `cta.form` present  → two-column panel: pitch on the left, the
 *    expedition-planner form on the right (the real "Plan my expedition").
 *  - `cta.form` missing  → classic centered panel with a single button,
 *    unchanged behaviour for companies that don't want the form.
 */

/* Render one planner field from its config entry. */
function plannerField(name, f) {
    const id = `planner-${name}`;
    const required = f.required ? 'required' : '';
    const placeholder = f.placeholder ? ` placeholder="${f.placeholder}"` : '';
    const label = `<label class="planner__label" for="${id}">${f.label}</label>`;

    let control;

    if (f.type === 'select') {
        const options = (f.options || [])
            .map((option) => `<option value="${option}">${option}</option>`)
            .join('');
        control =
            `<span class="planner__select-wrap">` +
            `<select class="planner__control" id="${id}" name="${name}" ${required}>${options}</select>` +
            `${icon('chevronDown', 'planner__chevron')}` +
            `</span>`;
    } else if (f.type === 'textarea') {
        control =
            `<textarea class="planner__control" id="${id}" name="${name}" ` +
            `rows="3"${placeholder} ${required}></textarea>`;
    } else {
        control =
            `<input class="planner__control" id="${id}" name="${name}" ` +
            `type="${f.type || 'text'}"${placeholder} ${required} />`;
    }

    return `<div class="planner__field">${label}${control}</div>`;
}

/* Render the glass planner card: fields in label-driven rows. */
function plannerCard(form) {
    const entries = Object.entries(form.fields || {});
    const rows = [];

    // Greedy pairing: two normal fields share a row, a textarea (or an
    // odd leftover) always gets the full row to itself.
    let i = 0;
    while (i < entries.length) {
        const [nameA, fieldA] = entries[i];
        const pairB = entries[i + 1];
        const pairable =
            fieldA.type !== 'textarea' && pairB && pairB[1].type !== 'textarea';

        const html = pairable
            ? `${plannerField(nameA, fieldA)}${plannerField(pairB[0], pairB[1])}`
            : plannerField(nameA, fieldA);

        rows.push(`<div class="planner__row">${html}</div>`);
        i += pairable ? 2 : 1;
    }

    const action = form.action ? ` action="${form.action}"` : '';

    return (
        `<div class="planner-card">` +
        `<form class="planner" data-planner-form${action} novalidate>` +
        fieldsWrap(rows) +
        `<button class="btn btn--primary planner__submit" type="submit">` +
        `${form.submitLabel || 'Send my request'}` +
        `${icon('send', 'btn__icon')}</button>` +
        (form.note ? `<p class="planner__note">${form.note}</p>` : '') +
        `</form>` +
        `<div class="planner__success" data-planner-success hidden>` +
        `<span class="planner__success-icon">${icon('check')}</span>` +
        `<h3 class="planner__success-heading" tabindex="-1">${form.successHeading || 'Request received!'}</h3>` +
        `<p class="planner__success-text">${form.successText || 'A route designer will reply within one working day.'}</p>` +
        `<button class="planner__again" type="button" data-planner-again>Plan another trip</button>` +
        `</div>` +
        `</div>`
    );
}

function fieldsWrap(rows) {
    return `<div class="planner__fields" data-planner-fields>${rows.join('')}</div>`;
}

export function cta({ cta }) {
    const hasForm = Boolean(cta.form?.fields);

    if (!hasForm) {
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

    const points = (cta.form.points || [])
        .map(
            (point) =>
                `<li class="cta__point">${icon('check', 'cta__point-icon')}<span>${point}</span></li>`
        )
        .join('');

    return (
        `<section class="cta section" id="contact">

            <div class="container">

                <div class="cta__panel cta__panel--form reveal">

                    <img class="cta__bg" src="${asset(cta.image)}" alt="" loading="lazy" />
                    <span class="cta__scrim" aria-hidden="true"></span>

                    <div class="cta__inner">

                        <div class="cta__content">

                            <h2 class="cta__heading">${cta.heading}</h2>
                            <p class="cta__text">${cta.text}</p>
                            ${points ? `<ul class="cta__points">${points}</ul>` : ''}

                        </div>

                        ${plannerCard(cta.form)}

                    </div>

                </div>

            </div>

        </section>`
    );
}
