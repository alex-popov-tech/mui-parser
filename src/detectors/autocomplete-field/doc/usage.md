# Playright Usage

```typescript
// HOW TO LOCATE
const field = stage.locateBy('{path}'); // from page
const field = element.locateBy('{path}'); // from parent element

// HOW TO ASSERT VALUE
await field.locateBy('{path}').locateBy('{meta.input}').should(have.value("{argument}"));

// HOW TO SET VALUE
// type value first, so there will be less options, ideally only one, if its unique
await field.locateBy('{path}').locateBy('{meta.input}').setValue("{argument}");
// find floating option from page level and click on it
await stage.locateBy('{meta.options}:has-text("{argument}")').click();
```
