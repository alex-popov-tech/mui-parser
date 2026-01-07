# Form Section Detector

Detects form section components that group related form fields under a common heading.

## Example HTML

```html
<section class="FormSection_wrapper__uqhuu">
  <h2 class="FormSection_title__d4amn">Event Setup</h2>
  <div class="FormSection_bodyWrapper__fL8I1">
    <div class="FormSection_body__PFarl">
      <div class="FormFieldWrapper_wrapper__1reXs">
        <div class="FormFieldWrapper_inputWrapper__IyIrO" data-testid="form-field-wrapper">
          <!-- Form fields like toggles, text fields, etc. -->
        </div>
      </div>
    </div>
  </div>
</section>
```

## Playright Usage
```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element
```

## Output

```json
{
  "type": "section",
  "kind": "form-section",
  "path": "section[class*=\"FormSection_wrapper__\"]:has(h2:text-is(\"Event Setup\"))",
  "meta": {
    "title": "h2[class*=\"FormSection_title__\"]",
    "body": "div[class*=\"FormSection_body__\"]",
    "fields": "[data-testid=\"form-field-wrapper\"]"
  },
  "children": [
    // Child fields detected recursively
  ]
}
```

## Meta Fields

| Field    | Type   | Description                                                    |
| -------- | ------ | -------------------------------------------------------------- |
| `title`  | string | Selector for section title heading (relative to `path`)        |
| `body`   | string | Selector for section body container (relative to `path`)       |
| `fields` | string | Selector for form field wrappers within section (relative to `path`) |

## Structure Requirements

The detector validates this exact structure:

1. Root must be `<section>` with class matching `FormSection_wrapper__*`
2. Must contain exactly one `<h2>` with class matching `FormSection_title__*`
3. Must contain `<div>` with class matching `FormSection_bodyWrapper__*`
4. Body wrapper must contain `<div>` with class matching `FormSection_body__*`
5. Title text must be non-empty

## Path Selector

The `path` uses the section title text for unique identification:
```
section[class*="FormSection_wrapper__"]:has(h2:text-is("Event Setup"))
```

This allows locating specific sections by their heading when multiple sections exist on a page.

## Child Detection

The body container (`div[class*="FormSection_body__"]`) is returned as a `childContainer`, enabling recursive detection of form fields within the section. The actual fields (toggles, text fields, etc.) inside `[data-testid="form-field-wrapper"]` elements are detected by their respective field detectors.
