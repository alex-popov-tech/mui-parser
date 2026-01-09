# Example HTML

## With Label

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

## Without Label (Single-Field Section)

When the text-editor-field is the only field in a section, the section title serves as the label.

```html
<div class="MuiFormControl-root MuiFormControl-fullWidth css-tzsjye" data-testid="text-editor-field">
  <!-- No label element - parent section title provides the label -->
  <div class="fr-custom" data-testid="text-editor">
    <div class="fr-box fr-basic fr-top" role="application">
      <div class="fr-toolbar fr-desktop fr-top fr-basic">
        <!-- toolbar buttons -->
      </div>
      <div class="fr-wrapper show-placeholder" dir="auto">
        <div class="fr-element fr-view" dir="auto" contenteditable="true" style="min-height: 200px;">
          <p><br></p>
        </div>
      </div>
    </div>
  </div>
  <p class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1lzxs8f"></p>
</div>
```
