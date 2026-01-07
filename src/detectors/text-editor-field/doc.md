# Text Editor Field Detector

Detects MUI FormControl components wrapping a Froala rich text editor.

## Example HTML

```html
<div class="MuiFormControl-root MuiFormControl-fullWidth css-tzsjye" data-testid="text-editor-field">
  <label class="MuiFormLabel-root MuiFormLabel-colorPrimary css-1ib89cd">Date and Venue Info</label>
  <div class="fr-custom" data-testid="text-editor">
    <div class="fr-box fr-basic fr-top" role="application">
      <div class="fr-toolbar fr-desktop fr-top fr-basic">
        <!-- toolbar buttons (bold, undo, redo, etc.) -->
      </div>
      <div class="fr-wrapper show-placeholder" dir="auto">
        <div class="fr-element fr-view" dir="auto" contenteditable="true" style="min-height: 200px;" aria-disabled="false" spellcheck="true">
          <p><br></p>
        </div>
        <span class="fr-placeholder">Formatted text is allowed here...</span>
      </div>
      <div class="fr-second-toolbar"></div>
    </div>
  </div>
  <p class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1lzxs8f"></p>
</div>
```

## Playright Usage
```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW SET VALUE
await container.locateBy('{path}').locateBy('{meta.editor}').fill('...');
```

## Output

```json
{
  "type": "field",
  "kind": "text-editor-field",
  "path": "div[data-testid=\"text-editor-field\"]:has(label:contains(\"Date and Venue Info\"))",
  "meta": {
    "label": "label.MuiFormLabel-root",
    "editor": "div.fr-element.fr-view[contenteditable=\"true\"]",
    "helperText": "p.MuiFormHelperText-root"
  }
}
```

## Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `label` | string | Selector for the label element (relative to `path`). Read text content to get field name. |
| `editor` | string | Selector for the contenteditable editor element (relative to `path`). This is the Froala editor's editable area. |
| `helperText` | string | Selector for the helper/error text element (relative to `path`). |

## Value Handling

- **Read**: Get the `innerHTML` of the `editor` element to read the formatted content. For plain text, use `innerText` or `textContent`.
- **Write**: Use Playwright's `type` action on the `editor` element to enter text. The editor is a `contenteditable` div, so standard typing works. Clear existing content first if needed by selecting all (Ctrl+A) and typing.

### Editor States

#### Empty state (with placeholder)
```html
<div class="fr-wrapper show-placeholder" dir="auto">
  <div class="fr-element fr-view" dir="auto" contenteditable="true">
    <p><br></p>
  </div>
  <span class="fr-placeholder">Formatted text is allowed here...</span>
</div>
```
- The `fr-wrapper` has class `show-placeholder`
- Editor contains just `<p><br></p>`

#### With content
```html
<div class="fr-wrapper" dir="auto">
  <div class="fr-element fr-view" dir="auto" contenteditable="true">
    <p>Some formatted <strong>text</strong> here</p>
  </div>
</div>
```
- The `show-placeholder` class is removed from `fr-wrapper`
- Editor contains the actual formatted content

## Unique Identification

This component does not have an `input[name]` attribute like standard form fields. Instead, the label text is used to uniquely identify each text-editor-field on the page. The path selector uses `:has(label:contains("..."))` to match by label text.
