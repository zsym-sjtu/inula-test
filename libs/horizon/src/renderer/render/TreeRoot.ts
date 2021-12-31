import type {VNode} from '../Types';
import {throwIfTrue} from '../utils/throwIfTrue';
import {processUpdates} from '../UpdateHandler';
import {createVNodeChildren} from './BaseComponent';
import {resetNamespaceCtx, setNamespaceCtx} from '../ContextSaver';
import {resetOldCtx} from '../components/context/CompatibleContext';
import {onlyUpdateChildVNodes} from '../vnode/VNodeCreator';

export function captureRender(processing: VNode): VNode | null {
  return updateTreeRoot(processing);
}

export function bubbleRender(processing: VNode) {
  resetNamespaceCtx(processing);
  resetOldCtx(processing);
}

function updateTreeRoot(processing) {
  setNamespaceCtx(processing, processing.outerDom);

  const updates = processing.updates;
  throwIfTrue(
    processing.isCreated || updates === null,
    'If the root does not have an updates, we should have already ' +
    'bailed out. This error is likely caused by a bug. Please ' +
    'file an issue.',
  );

  const newProps = processing.props;
  const oldState = processing.state;
  const oldElement = oldState !== null ? oldState.element : null;
  processUpdates(processing, null, newProps);

  const newState = processing.state;
  // 为了保持对Dev Tools的兼容，这里还是使用element
  const newElement = newState.element;
  if (newElement === oldElement) {
    return onlyUpdateChildVNodes(processing);
  }
  processing.child = createVNodeChildren(processing, newElement);
  return processing.child;
}
