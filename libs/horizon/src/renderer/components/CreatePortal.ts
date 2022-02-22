import {TYPE_PORTAL} from '../../external/JSXElementType';
import type {PortalType} from '../Types';

export function createPortal(
  children: any,
  realNode: any,
  key: string = '',
): PortalType {
  return {
    vtype: TYPE_PORTAL,
    key: key == '' ? '' : '' + key,
    children,
    realNode,
  };
}
