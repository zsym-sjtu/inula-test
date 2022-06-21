import {decorateNativeEvent} from '../customEvents/EventFactory';
import {getDom} from '../../dom/DOMInternalKeys';
import {updateInputValueIfChanged} from '../../dom/valueHandler/ValueChangeHandler';
import {isInputElement} from '../utils';
import {EVENT_TYPE_ALL} from '../const';
import {AnyNativeEvent, ListenerUnitList} from '../Types';
import {
  getListenersFromTree,
} from '../ListenerGetter';
import {VNode} from '../../renderer/Types';
import {getDomTag} from '../../dom/utils/Common';

// 返回是否需要触发change事件标记
// | 元素 | 事件 |  需要值变更 |
// | --- | ---  | ---------------  |
// | <select/> / <input type="file/> | change | NO |
// | <input type="checkbox" /> <input type="radio" /> | click | YES |
// | <input type="input /> / <input type="text" /> | input / change | YES |
function shouldTriggerChangeEvent(targetDom, evtName) {
  const { type } = targetDom;
  const domTag = getDomTag(targetDom);

  if (domTag === 'select' || (domTag === 'input' && type === 'file')) {
    return evtName === 'change';
  } else if (domTag === 'input' && (type === 'checkbox' || type === 'radio')) {
    if (evtName === 'click') {
      return updateInputValueIfChanged(targetDom);
    }
  } else if (isInputElement(targetDom)) {
    if (evtName === 'input' || evtName === 'change') {
      return updateInputValueIfChanged(targetDom);
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
  vNode: null | VNode
): ListenerUnitList {
  if (!vNode) {
    return [];
  }
  const targetDom = getDom(vNode);

  // 判断是否需要触发change事件
  if (shouldTriggerChangeEvent(targetDom, nativeEvtName)) {
    const event = decorateNativeEvent(
      'onChange',
      'change',
      nativeEvt,
    );
    return getListenersFromTree(vNode, 'onChange', event, EVENT_TYPE_ALL);
  }

  return [];
}
