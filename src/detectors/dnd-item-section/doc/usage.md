# Playright Usage

```typescript
// HOW TO LOCATE
// when locating dnd-items we always use indexing accessors, to select particular item from the list
const container = stage.locateAllBy('{path}').first; // from page
const container = element.locateAllBy('{path}').nth(index); // from parent element

// HOW TO ASSERT VALUE
// title
await container.locateAllBy('{path}').first.locateBy('{meta.title}').should(have.text('...'));
// enabled
await container.locateAllBy('{path}').first.locateBy('{meta.enabled}').locateBy('input[type="checkbox"]').parent.should(have.cssClass('Mui-checked'));

// HOW TO UPDATE
// collapse
await container.locateAllBy('{path}').first.locateBy('{meta.collapse}').click();
// expand
await container.locateAllBy('{path}').first.locateBy('{meta.expand}').click();
// enable/disable - usually called 'toggle'
await container.locateAllBy('{path}').first.locateBy('{meta.enabled}').click();
```
