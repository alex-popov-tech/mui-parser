import type { Detector } from "../types";
import { asideSectionDetector } from "./aside-section";
import { autocompleteFieldDetector } from "./autocomplete-field";
import { buttonFieldDetector } from "./button-field";
import { ctaButtonLinkDetector } from "./cta-button-link";
import { dateFieldDetector } from "./date-field";
import { dndAreaSectionDetector } from "./dnd-area-section";
import { dndItemSectionDetector } from "./dnd-item-section";
import { formSectionDetector } from "./form-section";
import { imageFieldDetector } from "./image-field";
import { linkFieldDetector } from "./link-field";
import { mainSectionDetector } from "./main-section";
import { selectFieldDetector } from "./select-field";
import { textEditorFieldDetector } from "./text-editor-field";
import { textFieldDetector } from "./text-field";
import { toggleFieldDetector } from "./toggle-field";

export const detectors: Detector[] = [
  asideSectionDetector,
  mainSectionDetector,
  formSectionDetector,
  dndAreaSectionDetector,
  dndItemSectionDetector,
  ctaButtonLinkDetector,
  toggleFieldDetector,
  textFieldDetector,
  dateFieldDetector,
  textEditorFieldDetector,
  selectFieldDetector,
  autocompleteFieldDetector,
  imageFieldDetector,
  buttonFieldDetector,
  linkFieldDetector,
];

// Re-export detector types
export type { AsideSectionMeta, AsideSectionNode } from "./aside-section";
export type {
  AutocompleteFieldMeta,
  AutocompleteFieldNode,
} from "./autocomplete-field";
export type { ButtonFieldMeta, ButtonFieldNode } from "./button-field";
export type {
  CtaButtonLinkMeta,
  CtaButtonLinkNode,
  ToggleButtonGroupSelectors,
} from "./cta-button-link";
export type { DateFieldMeta, DateFieldNode } from "./date-field";
export type {
  DndAreaSectionMeta,
  DndAreaSectionNode,
} from "./dnd-area-section";
export type {
  DndItemSectionMeta,
  DndItemSectionNode,
} from "./dnd-item-section";
export type { FormSectionMeta, FormSectionNode } from "./form-section";
export type { ImageFieldMeta, ImageFieldNode } from "./image-field";
export type { LinkFieldMeta, LinkFieldNode } from "./link-field";
export type { MainSectionMeta, MainSectionNode } from "./main-section";
export type { SelectFieldMeta, SelectFieldNode } from "./select-field";
export type {
  TextEditorFieldMeta,
  TextEditorFieldNode,
} from "./text-editor-field";
export type { TextFieldMeta, TextFieldNode } from "./text-field";
export type { ToggleFieldMeta, ToggleFieldNode } from "./toggle-field";
