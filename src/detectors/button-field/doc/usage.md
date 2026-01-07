# Playright Usage

```typescript
// HOW TO LOCATE
const button = stage.locateBy('{path}'); // from page
const button = element.locateBy('{path}'); // from parent element

// HOW TO ASSERT VALUE
// when we need to check that button changed state - for example from 'Save' to 'Saved'
await container.locateBy('{path}').should(have.text('Saved'));

// HOW TO TRIGGER
await container.locateBy('{path}').click();
```
