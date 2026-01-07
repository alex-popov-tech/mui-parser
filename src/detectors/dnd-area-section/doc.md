# DnD Area Section Detector

Detects drag-and-drop droppable area containers. These areas serve as drop zones for sortable items (detected by the `dnd-item-section` detector).

## Purpose

The DnD area section is a structural container that groups draggable items. It provides the drop zone for react-beautiful-dnd (rbd) sortable lists, enabling users to reorder items by dragging.

## Example HTML

```html
<div data-testid="dnd-droppable-area" data-rbd-droppable-id="buttons-list">
  <div data-testid="dnd-draggable-item" data-rbd-draggable-id="item1">
    <!-- DnD item content (detected by dnd-item-section) -->
  </div>
  <div data-testid="dnd-draggable-item" data-rbd-draggable-id="item2">
    <!-- DnD item content -->
  </div>
</div>
```

## Playwright Usage
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

## Output

```json
{
  "type": "section",
  "kind": "dnd-area-section",
  "path": "[data-testid=\"dnd-droppable-area\"]",
  "children": [
    // DnD item sections detected recursively
  ]
}
```

## Meta Fields

This detector has no meta fields - it is a pure structural container for draggable items.

## Structure Requirements

The detector validates this structure:

1. Root must be a `<div>` element
2. Must have `data-testid="dnd-droppable-area"`
3. Must have `data-rbd-droppable-id` attribute (react-beautiful-dnd identifier)

## Child Detection

All direct children with `data-testid="dnd-draggable-item"` are returned as child containers, enabling recursive detection of DnD items within the area. Each item is typically detected by the `dnd-item-section` detector.

## Relationship with DnD Item Section

- **dnd-area-section**: The droppable container/zone
- **dnd-item-section**: Individual draggable items within the area

The area provides the structural grouping, while items contain the actual content and controls (title, toggle, remove button, etc.).
