import type { VNode, JSXElement } from '../Types';

// 当前vNode和element是同样的类型
// LazyComponent 会修改type的类型，所以特殊处理这种类型
export const isSameType = (vNode: VNode, ele: JSXElement) => {
  return vNode.type === ele.type || (vNode.isLazyComponent && vNode.lazyType === ele.type);
};

export function isTextType(newChild: any) {
  return typeof newChild === 'string' || typeof newChild === 'number';
}

export function isArrayType(newChild: any) {
  return Array.isArray(newChild);
}

export function isIteratorType(newChild: any) {
  return (typeof Symbol === 'function' && newChild[Symbol.iterator]) || newChild['@@iterator'];
}

export function getIteratorFn(maybeIterable: any): () => Iterator<any> {
  return maybeIterable[Symbol.iterator] || maybeIterable['@@iterator'];
}

export function isObjectType(newChild: any) {
  return typeof newChild === 'object' && newChild !== null;
}
