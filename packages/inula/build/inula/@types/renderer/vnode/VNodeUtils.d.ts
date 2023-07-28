/**
 * 提供：vNode的“遍历”，“查找”，“判断”的相关工具方法
 */
import type { VNode } from '../Types';
export declare function travelChildren(beginVNode: VNode | null, handleVNode: (node: VNode) => void, isFinish?: (node: VNode) => boolean): void;
export declare function travelVNodeTree(beginVNode: VNode, handleVNode: (node: VNode) => VNode | boolean | null | void, childFilter: ((node: VNode) => boolean) | null, // 返回true不处理child
finishVNode: VNode, // 结束遍历节点，有时候和beginVNode不相同
handleWhenToParent: ((node: VNode) => void) | null): VNode | boolean | null | void;
export declare function clearVNode(vNode: VNode): void;
export declare function isDomVNode(node: VNode): boolean;
export declare function findDomVNode(vNode: VNode): VNode | null;
export declare function findDOMByClassInst(inst: any): any;
export declare function isMounted(vNode: VNode): boolean;
export declare function getSiblingDom(vNode: VNode): Element | null;
export declare function findRoot(targetVNode: any, targetDom: any): any;
