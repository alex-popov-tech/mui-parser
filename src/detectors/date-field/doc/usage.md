# Playright Usage

```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW TO ASSERT VALUE
await container.locateBy('{path}').locateBy('{meta.input}').should(have.value('...'));

// HOW TO SET VALUE
await container.locateBy('{path}').locateBy('{meta.input}').setValue('some valid formatted date');
```
