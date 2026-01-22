# Playwright Usage

```typescript
// HOW TO LOCATE
const link = stage.locateBy('{path}'); // from page
const link = element.locateBy('{path}'); // from parent element

// HOW TO TRIGGER
await container.locateBy('{path}').click();
```
