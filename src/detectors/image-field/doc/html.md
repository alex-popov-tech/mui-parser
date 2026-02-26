# Example HTML

## Default state (no image)

```html
<div class="ImageField_wrapper__JDqhr">
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-testid="file-input">
      <span class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-1bty08p" tabindex="0" role="button" data-testid="file-change-action">Choose file<span class="MuiTouchRipple-root css-w0pj6f"></span></span>
    </label>
  </div>
</div>
```

## With image uploaded

```html
<div class="ImageField_wrapper__JDqhr">
  <div class="ImagePreview_previewWrapper__L8VDB">
    <img src="/api/files/image-abc123.png" alt="Preview" class="ImagePreview_previewImage__U5JlM">
  </div>
  <div tabindex="0">
    <label data-testid="file-upload">
      <input hidden="" type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-testid="file-input">
      <span data-testid="file-change-action">Change file</span>
    </label>
  </div>
</div>
```
