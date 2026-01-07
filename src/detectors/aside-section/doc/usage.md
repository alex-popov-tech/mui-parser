# Aside Section - Playwright Usage

## Locating

```typescript
// From page/stage
const aside = stage.locateBy('{path}');

// From parent element
const aside = parentElement.locateBy('{path}');
```

## Page Object Example

```typescript
class AsideSectionComponent {
  constructor(private root: Locator) {}

  // Access nested elements using children paths
  getChild(childPath: string): Locator {
    return this.root.locator(childPath);
  }
}
```
