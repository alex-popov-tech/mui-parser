# Playright Usage

```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW SET VALUE
await container.locateBy('{path}').click();
await stage.locateBy('{meta.options}:has-text("...")').click();

// HOW ASSERT VALUE
await stage.locateBy('{meta.input}').should(have.value('...'));
```
