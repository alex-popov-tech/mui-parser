# Playright Usage

```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW TO SET VALUE
await container.locateBy('{meta.input}').upload('{argument}');
// assert upload completion
await container.locateBy('{meta.img}').should(be.visible);
```
