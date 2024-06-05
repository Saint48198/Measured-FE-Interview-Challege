import {FieldTitle} from "./field-title.interface";
import {FieldDefinition} from "./field-definition.interface";

export interface SectionElement {
  name:string;
  type: string;
  width: number;
  label: string;
  digitsInfo: string;
  format: string;
  data: any;
  fields?: FieldTitle[];
  fieldDefinitions?: FieldDefinition[];
}
