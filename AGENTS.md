# Collaboration boundaries

This repository is being edited by more than one collaborator. Keep the following ownership boundary strict.

## Home-page collaborator

- Work only on the home page and home-page-specific assets.
- Do not modify wardrobe behavior, layout, styles, item data, image mappings, cache keys, or assets.
- In `index.html`, do not change blocks, selectors, scripts, links, or markup containing `wardrobe`, `v110`, or `v97WardrobeOpen`.
- Do not modify `assets/wardrobe-v110.css`, `assets/wardrobe-v110.js`, or any path whose filename or directory name begins with `wardrobe-`.
- Before publishing a home-page change, verify the diff contains no wardrobe-related paths or wardrobe-related lines in `index.html`.

## Wardrobe ownership

Wardrobe changes are handled separately by the wardrobe owner. If a home-page task appears to require a wardrobe edit, stop and ask the user instead of changing it.
