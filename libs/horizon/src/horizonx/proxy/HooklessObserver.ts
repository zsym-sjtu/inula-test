// TODO: implement vNode type

import {IObserver} from '../types';

/**
 * 一个对象（对象、数组、集合）对应一个Observer
 *
 */
export class HooklessObserver implements IObserver {

  listeners = [];
  vNodeKeys: null;
  keyVNodes: null;

  useProp(key: string): void {
  }

  addListener(listener: () => void) {
    this.listeners.push(listener);
  }

  removeListener(listener: () => void) {
    this.listeners = this.listeners.filter(item => item != listener);
  }

  setProp(key: string): void {
    this.triggerChangeListeners();
  }

  triggerChangeListeners(): void {
    this.listeners.forEach(listener => {
      if (!listener) {
        return;
      }
      listener();
    });
  }

  triggerUpdate(vNode): void {
  }

  allChange(): void {
  }

  clearByVNode(vNode): void {
  }
}
