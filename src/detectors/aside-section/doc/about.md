# Aside Section Detector

Detects `<aside>` HTML elements as structural sections for page layout namespacing.

The aside section serves as a namespace container, grouping all elements within an `<aside>` tag under a common parent in the parsed tree. This is useful for distinguishing sidebar content from main content.

## Example HTML

```html
<aside>
  <nav>
    <!-- Navigation content -->
  </nav>
</aside>
```
