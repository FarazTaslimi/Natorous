/**
 * Resolves an image filename from site.config.json to a public URL.
 *
 * All images live in `public/img/` and the config lives in
 * `public/site.config.json`, so companies can swap content WITHOUT
 * rebuilding — edit, deploy, done.
 *
 * Usage: asset("hero.png")  →  "/img/hero.png"
 * (BASE_URL keeps this correct when deployed under a sub-path.)
 */
export const asset = (name) => `${import.meta.env.BASE_URL}img/${name}`;
