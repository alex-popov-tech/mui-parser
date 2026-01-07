# Image Field Detector

Detects custom ImageField components used for image upload functionality.

## Example HTML

### With image uploaded

```html
<div class="ImageField_wrapper__JDqhr">
  <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined ImageField_label__i+eAH css-14wmy0l" data-shrink="false">Logo</label>
  <div class="ImagePreview_previewWrapper__L8VDB">
    <img src="/caas/content/api/v1/admin/files/informa-771bc30ba8b987da64c92a52c35597be.png" alt="Preview" class="ImagePreview_previewImage__U5JlM">
  </div>
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-testid="file-input">
      <button class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedError MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorError MuiButton-root MuiButton-outlined MuiButton-outlinedError MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorError css-1cnrq8r" tabindex="0" type="button" data-testid="file-remove-action">Remove<span class="MuiTouchRipple-root css-w0pj6f"></span></button>
      <span class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-1bty08p" tabindex="0" role="button" data-testid="file-change-action">Change file<span class="MuiTouchRipple-root css-w0pj6f"></span></span>
    </label>
  </div>
</div>
```

### Default state (no image)

```html
<div class="ImageField_wrapper__JDqhr">
  <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined ImageField_label__i+eAH css-14wmy0l" data-shrink="false">Logo</label>
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-testid="file-input">
      <span class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-1bty08p" tabindex="0" role="button" data-testid="file-change-action">Choose file<span class="MuiTouchRipple-root css-w0pj6f"></span></span>
    </label>
  </div>
</div>
```

## Playright Usage
```typescript
// HOW TO LOCATE
const container = stage.locateBy('{path}'); // from page
const container = element.locateBy('{path}'); // from parent element

// HOW TO SET VALUE
// first you need to upload an image
await container.locateBy('{fileInput}').upload(args.backgroundImage);
// then we need to wait for it to load and preview to be shown as sign of successful upload
await container.locateBy('img').should(be.visible);
```

## Output

```json
{
  "type": "field",
  "kind": "image-field",
  "path": "div[class*=\"ImageField_wrapper\"]:has-text(\"Logo\")",
  "meta": {
    "label": "label.MuiInputLabel-root",
    "preview": "img[class*=\"ImagePreview_previewImage\"]",
    "fileInput": "input[data-testid=\"file-input\"]",
    "uploadButton": "[data-testid=\"file-change-action\"]",
    "removeButton": "[data-testid=\"file-remove-action\"]"
  }
}
```

## Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `label` | string | Selector for the label element (relative to `path`). Read text content for field name. |
| `preview` | string | Selector for the preview image (relative to `path`). Only exists when image is uploaded. |
| `fileInput` | string | Selector for the hidden file input (relative to `path`). Used for programmatic uploads. |
| `uploadButton` | string | Selector for the upload/change button (relative to `path`). |
| `removeButton` | string | Selector for the remove button (relative to `path`). Only exists when image is uploaded. |

## Value Handling

- **Read**: Check if `preview` element exists. If it does, read the `src` attribute to get the image URL.
- **Write**: Use Playwright's `setInputFiles()` on the `fileInput` selector to upload a new image.
- **Clear**: Click the `removeButton` to remove the uploaded image.

### State: Image uploaded

When an image is uploaded:
- `preview` element exists with `src` attribute containing the image URL
- `removeButton` exists (styled as error/red button)
- `uploadButton` text is "Change file"

### State: No image (default)

When no image is uploaded:
- `preview` element does NOT exist
- `removeButton` does NOT exist
- `uploadButton` text is "Choose file"
