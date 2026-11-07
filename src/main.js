import './sass/main.scss';

import { header } from './js/layout/header.js';
import { hero } from './js/layout/hero.js';
import { tours } from './js/layout/tours.js';
import { destinations } from './js/layout/destinations.js';
import { reviews } from './js/layout/reviews.js';
import { cta } from './js/layout/cta.js';
import { footer } from './js/layout/footer.js';

/* ============================================================
 * Render — the whole site is built from ONE data file:
 * public/site.config.json (editable without rebuilding)
 * ============================================================ */

document.documentElement.classList.remove('no-js');

const app = document.getElementById('app');

async function loadConfig() {
    try {
        const response = await fetch(`${import.meta.env.BASE_URL}site.config.json`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error('[natorous] failed to load site.config.json:', err);
        app.innerHTML =
            '<p style="padding:2rem;font-family:sans-serif">Could not load <code>public/site.config.json</code> — check the file exists and is valid JSON.</p>';
        return null;
    }
}

function render(config) {
    app.innerHTML = [
        header(config),
        hero(config),
        tours(config),
        destinations(config),
        reviews(config),
        cta(config),
        footer(config),
    ].join('\n');
}

/* ============================================================
 * Header — glass effect on scroll + mobile navigation
 * ============================================================ */

function initHeader() {
    const headerEl = document.querySelector('[data-header]');
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');
    const links = document.querySelectorAll('[data-nav-link]');

    const onScroll = () => headerEl.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const closeNav = () => {
        headerEl.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        document.body.classList.remove('u-lock-scroll');
    };

    toggle.addEventListener('click', () => {
        const open = headerEl.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.classList.toggle('u-lock-scroll', open);
    });

    links.forEach((link) => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && closeNav());
}

/* ============================================================
 * Scroll spy — highlight the nav link of the current section
 * ============================================================ */

function initScrollSpy() {
    const links = [...document.querySelectorAll('[data-nav-link]')];
    const sections = links
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const spy = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((link) =>
                    link.classList.toggle(
                        'is-active',
                        link.getAttribute('href') === `#${entry.target.id}`
                    )
                );
            });
        },
        { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach((section) => spy.observe(section));
}

/* ============================================================
 * Reveal on scroll — adds .is-visible as elements enter view
 * ============================================================ */

function initReveal() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = document.querySelectorAll('.reveal');

    if (reducedMotion || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const reveal = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    reveal.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((el) => reveal.observe(el));
}

/* ============================================================
 * Stat counters — count from 0 to data-count-to when in view
 * ============================================================ */

function initCounters() {
    const counters = document.querySelectorAll('[data-count-to]');

    const animate = (el) => {
        const target = parseFloat(el.dataset.countTo);
        const decimals = parseInt(el.dataset.decimals, 10) || 0;
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = (target * eased).toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    };

    const seen = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animate(entry.target);
                    seen.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.6 }
    );

    counters.forEach((el) => seen.observe(el));
}

/* ============================================================
 * Expedition filters — show/hide tour cards by tag
 * ============================================================ */

function initFilters() {
    const chips = document.querySelectorAll('[data-filter]');
    const grid = document.querySelector('[data-tours-grid]');
    const empty = document.querySelector('[data-tours-empty]');
    if (!chips.length || !grid) return;

    const cards = [...grid.querySelectorAll('.tour-card')];

    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            chips.forEach((c) => c.classList.toggle('is-active', c === chip));

            const filter = chip.dataset.filter;
            let visible = 0;

            cards.forEach((card, i) => {
                const tag = config.tours.items[i]?.tag || '';
                const show = filter === 'all' || tag === filter;
                card.classList.toggle('is-hidden', !show);
                if (show) visible += 1;
            });

            if (empty) empty.hidden = visible !== 0;
        });
    });
}

/* ============================================================
 * Expedition planner — the "Plan my expedition" form in the CTA.
 * No backend by default: a valid submit swaps the form for an
 * inline success state. If config.cta.form.action is set, the form
 * POSTs there natively and this handler steps aside.
 * ============================================================ */

function initPlanner() {
    const form = document.querySelector('[data-planner-form]');
    if (!form || form.getAttribute('action')) return;

    const success = document.querySelector('[data-planner-success]');
    const again = document.querySelector('[data-planner-again]');
    if (!success || !again) return;

    const heading = success.querySelector('[tabindex="-1"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // `novalidate` is set so we control the moment; reportValidity
        // shows native bubbles and focuses the first invalid field.
        if (!form.reportValidity()) return;

        form.hidden = true;
        success.hidden = false;
        if (heading) heading.focus({ preventScroll: true });
    });

    again.addEventListener('click', () => {
        success.hidden = true;
        form.hidden = false;
        form.reset();
        form.querySelector('input, select, textarea')?.focus({ preventScroll: true });
    });
}

/* ============================================================
 * Newsletter form — success state (no backend).
 * If config.footer.newsletter.action is set, the form posts there
 * natively and this handler is skipped.
 * ============================================================ */

function initNewsletter() {
    const form = document.querySelector('[data-newsletter-form]');
    if (!form || form.getAttribute('action')) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.email.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            form.email.focus();
            return;
        }

        form.querySelector('[data-form-success]').hidden = false;
        form.querySelector('.footer__form-row').hidden = true;
    });
}

/* ============================================================
 * Misc — dynamic year in the copyright line
 * ============================================================ */

function initMisc() {
    const copyright = document.querySelector('[data-copyright]');
    if (copyright) {
        copyright.textContent = copyright.textContent.replace('{year}', new Date().getFullYear());
    }
}

function initInteractions() {
    initHeader();
    initScrollSpy();
    initReveal();
    initCounters();
    initFilters();
    initNewsletter();
    initPlanner();
    initMisc();
}

const config = await loadConfig();
if (config) {
    render(config);
    initInteractions();
}
