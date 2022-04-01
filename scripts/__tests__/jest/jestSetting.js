import { unmountComponentAtNode } from '../../../libs/horizon/src/dom/DOMExternal';
import * as LogUtils from '../jest/logUtils';

global.isDev = process.env.NODE_ENV === 'development';
global.container = null;
global.beforeEach(() => {
  LogUtils.clear();
  // 创建一个 DOM 元素作为渲染目标
  global.container = document.createElement('div');
  document.body.appendChild(global.container);
});

global.afterEach(() => {
  unmountComponentAtNode(global.container);
  global.container.remove();
  global.container = null;
  LogUtils.clear();
});

// 使Jest感知自定义匹配器
expect.extend({
  ...require('./customMatcher'),
});