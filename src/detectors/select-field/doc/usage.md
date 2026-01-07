# Playright Usage

```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW SET VALUE
await container.locateBy('{path}').click();
const stage.locateBy('{meta.options}:has-text("...")').click();
```
