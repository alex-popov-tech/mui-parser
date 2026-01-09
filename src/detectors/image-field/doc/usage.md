# Playright Usage

```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW TO SET VALUE
// first you need to upload an image
await container.locateBy('{path}').locateBy('{meta.fileInput}').upload('{argument}');
// then we need to wait for it to load and preview to be shown as sign of successful upload
await container.locateBy('{path}').locateBy('img').should(be.visible);
```
