# Playright Usage

```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW SET VALUE
// toggle field
await container.locateBy('{path}').click();

// HOW TO ASSERT VALUE
await container.locateBy('{path}').locateBy('{meta.input}').parent.should(have.cssClass('Mui-checked'));
```
