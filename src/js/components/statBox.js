import { icon } from '../utils/icons.js';

/**
 * Single stat box with animated counter (numbers animated in main.js).
 * `value` is numeric, `suffix`/`decimals` control how it is displayed
 * after the count-up finishes.
 */
export function statBox({ icon: statIcon, value, suffix = '', decimals = 0, label }) {
    return (
        `<div class="stat-box reveal">

            ${statIcon ? icon(statIcon, 'stat-box__icon') : ''}

            <div class="stat-box__info">
                <span class="stat-box__value"
                      data-count-to="${value}"
                      data-decimals="${decimals}"
                      data-suffix="${suffix}">0</span>
                <span class="stat-box__label">${label}</span>
            </div>

        </div>`
    );
}
