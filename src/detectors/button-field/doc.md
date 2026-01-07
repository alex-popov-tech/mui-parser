# Button Detector

Detects MUI Button components.

## Example HTML

```html
<button class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorPrimary css-bivbcb" tabindex="0" type="button">
  <span class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9">
    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
    </svg>
  </span>
  Add Link
  <span class="MuiTouchRipple-root css-w0pj6f"></span>
</button>
```

## Playright Usage
```typescript
// HOW TO LOCATE
const button = stage.locateBy('{path}'); // from page
const button = element.locateBy('{path}'); // from parent element

// HOW TO ASSERT VALUE
// when we need to check that button changed state - for example from 'Save' to 'Saved'
await container.locateBy('{path}').should(have.text('Saved'));
```

## Output

```json
{
  "type": "field",
  "kind": "button",
  "path": "button.MuiButton-root:text(\"Add Link\")",
  "meta": {
    "label": "Add Link"
  }
}
```

## Meta Fields

| Field   | Type   | Description                                  |
|---------|--------|----------------------------------------------|
| `label` | string | The button's text label (excludes icon text) |

## Value Handling

- **Read**: Get button text from `meta.label`
- **Click**: Use `path` selector with text-based matching (e.g., Playwright's `:text()` or `getByRole('button', { name: label })`)

## Notes

- The detector extracts text content excluding icon spans (`MuiButton-startIcon`, `MuiButton-endIcon`) and ripple (`MuiTouchRipple-root`)
- The `path` uses `:text()` pseudo-selector for Playwright compatibility
- Buttons must have non-empty text content to be detected
