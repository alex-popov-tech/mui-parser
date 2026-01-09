# Playright Usage

```typescript
// HOW TO LOCATE
const field = stage.locateBy('{path}'); // from page
const field = element.locateBy('{path}'); // from parent element

// HOW TO ASSERT VALUE
await field.locateBy('{path}').locateBy('{meta.input}').should(have.value('{argument}'));

// HOW TO SET VALUE
await field.locateBy('{path}').locateBy('{meta.input}').setValue('{argument}');
```
