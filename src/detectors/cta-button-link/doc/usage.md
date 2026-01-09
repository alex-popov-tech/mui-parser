# CTA Button Link - Playright Usage

```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW TO SET VALUE
// some field depend on what we choose in 'callToAction' field
// usually we select 'Custom Page' there
await container.locateBy('{meta.fields.callToAction.input}').click();
await stage.locateBy('{meta.fields.callToAction.options}:has-text("{arguments.callToAction}")').click(); // search from the page
// then there are two mandatory fields appear to fill
await container.locateBy('{meta.fields.customUrl}').setValue("{argument.customUrl}");
await container.locateBy('{meta.fields.customText}').setValue("{argument.customText}");
// rest fields to be ignored
```
