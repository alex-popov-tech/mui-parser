# Playwright Usage

```typescript
// HOW TO LOCATE
const toggle = stage.locateBy('{path}'); // from page
const toggle = element.locateBy('{path}'); // from parent element

// HOW TO SET VALUE
// toggle the field
await toggle.click();
// set to 'on'
await toggle.locateBy('{meta.input}').check();
// set to 'off'
await toggle.locateBy('{meta.input}').uncheck();

// HOW TO ASSERT VALUE
await toggle.locateBy('{meta.input}').parent.should(have.cssClass('Mui-checked'));

// HOW TO ASSERT LABEL
// {meta.label} contains the toggle's text (e.g., "Featured")
await toggle.should(have.text('{meta.label}'));
```
