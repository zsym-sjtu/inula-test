import type { VNode } from './Types';
import { asyncUpdates, syncUpdates, runDiscreteUpdates } from './TreeBuilder';
import { runAsyncEffects } from './submit/HookEffectHandler';
import { Callback } from './UpdateHandler';
export { createVNode, createTreeRootVNode } from './vnode/VNodeCreator';
export { createPortal } from './components/CreatePortal';
export { asyncUpdates, syncUpdates, runDiscreteUpdates, runAsyncEffects };
export declare function startUpdate(element: any, treeRoot: VNode, callback?: Callback): void;
export declare function getFirstCustomDom(treeRoot?: VNode | null): Element | Text | null;
