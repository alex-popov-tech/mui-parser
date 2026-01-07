# Text Field Detector

Detects MUI TextField components used for text input in forms.

## Example HTML

```html
<div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-11n4w43" data-testid="text-field">
  <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required" data-shrink="true" for=":r4m:" id=":r4m:-label">
    Event Name
    <span aria-hidden="true" class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-3fe08"> *</span>
  </label>
  <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-1rgex39">
    <input aria-invalid="false" aria-describedby=":r4m:-helper-text" id=":r4m:" name="localisedName.values.en" required="" type="text" dir="auto" class="MuiInputBase-input MuiOutlinedInput-input css-13ny0hi" value="IanV-Test">
    <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
      <legend class="css-14lo706"><span>Event Name *</span></legend>
    </fieldset>
  </div>
  <p class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled Mui-required css-1lzxs8f" id=":r4m:-helper-text"></p>
</div>
```

## Output

```json
{
  "type": "field",
  "kind": "text-field",
  "path": "div[data-testid=\"text-field\"]:has(input[name^=\"localisedName\"])",
  "meta": {
    "input": "input[name^=\"localisedName\"]"
  }
}
```

## Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `input` | string | Selector for the text input element (relative to `path`) |

## Value Handling

- **Read**: Get the current value from the input's `value` attribute
- **Write**: Set the input's `value` attribute or use standard input interaction methods

## Identification

The detector uses `[name^="baseName"]` (starts-with) selector to handle localized field names like `localisedName.values.en`. The base name is extracted by removing the `.values.*` suffix if present.

### Structure Requirements

1. Root element must be `<div>` with `data-testid="text-field"`
2. Must have `MuiTextField-root` class
3. Must contain exactly one `.MuiInputBase-root` div
4. Must contain exactly one `input.MuiInputBase-input[type="text"]`
5. Input must have non-empty `name` attribute
