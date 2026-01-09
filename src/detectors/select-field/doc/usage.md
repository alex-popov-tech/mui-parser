# Playright Usage

```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW SET VALUE
// click on container, not an input
await container.locateBy('{path}').click();
// find option by text
await stage.locateBy('{meta.options}:has-text("{argument}")').click();

// HOW ASSERT VALUE
await stage.locateBy('{meta.input}').should(have.value('...'));
```
