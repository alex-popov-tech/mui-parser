# Playright Usage

```typescript
// HOW TO LOCATE
const field = stage.locateBy('{path}'); // from page
const field = element.locateBy('{path}'); // from parent element

// HOW TO ASSERT VALUE
await field.locateBy('{path}').locateBy('{meta.input}').should(have.value('...'));

// HOW TO SET VALUE
// type value first, so there will be less options, ideally only one, if its unique
await field.locateBy('{path}').locateBy('{meta.input}').setValue('some value');
// find floating option from page level and click on it
await stage.locateBy('{meta.options}:has-text("some value")').click();
```
