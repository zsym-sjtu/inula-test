import {createHandlerCustomEvent} from '../customEvents/EventFactory';
import {getDom} from '../../dom/DOMInternalKeys';
import {isInputValueChanged} from '../../dom/valueHandler/ValueChangeHandler';
import {addValueUpdateList} from '../ControlledValueUpdater';
import {isTextInputElement} from '../utils';
import {EVENT_TYPE_ALL} from '../const';
import {AnyNativeEvent, ProcessingListenerList} from '../Types';
import {
  getListenersFromTree,
} from '../ListenerGetter';
import {VNode} from '../../renderer/Types';
import {getDomTag} from '../../dom/utils/Common';

// 返回是否需要触发change事件标记
function shouldTriggerChangeEvent(targetDom, evtName) {
  const { type } = targetDom;
  const domTag = getDomTag(targetDom);

  if (domTag === 'select' || (domTag === 'input' && type === 'file')) {
    return evtName === 'change';
  } else if (isTextInputElement(targetDom)) {
    if (evtName === 'input' || evtName === 'change') {
      return isInputValueChanged(targetDom);
    }
  } else if (domTag === 'input' && (type === 'checkbox' || type === 'radio')) {
    if (evtName === 'click') {
      return isInputValueChanged(targetDom);
    }
  }
  return false;
}

/**
 *
 * 支持input/textarea/select的onChange事件
 */
export function getListeners(
  nativeEvtName: string,
  nativeEvt: AnyNativeEvent,
  vNode: null | VNode,
  target: null | EventTarget,
): ProcessingListenerList {
  if (!vNode) {
    return [];
  }
  const targetDom = getDom(vNode);

  // 判断是否需要触发change事件
  if (shouldTriggerChangeEvent(targetDom, nativeEvtName)) {
    addValueUpdateList(target);
    const event = createHandlerCustomEvent(
      'onChange',
      'change',
      nativeEvt,
      null,
      target,
    );
    return getListenersFromTree(vNode, 'onChange', event, EVENT_TYPE_ALL);
  }

  return [];
}