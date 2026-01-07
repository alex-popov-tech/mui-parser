# Playright Usage

```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW TO ACCESS ITEMS
// Items within the area are accessed via dnd-item-section children
const items = container.locateAllBy('[data-testid="dnd-draggable-item"]');
const firstItem = items.first;
const secondItem = items.nth(1);
```
