import { attributeName } from '../types/attribute.type';

export interface IAttribute {
  name: attributeName;
  value: number;
  valueMin: number;
  valueMax: number;
  valueConstant: number;
}
