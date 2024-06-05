import {SectionElement} from "./section-element.interface";

export interface LayoutElement {
  name: string;  // This should match with data keys
  type: string;
  label: string;
  width: number;
  elements: SectionElement[];  // Nested elements for data sets
}
