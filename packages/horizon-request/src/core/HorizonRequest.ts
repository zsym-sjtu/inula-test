import getMergedConfig from '../utils/configUtils/getMergedConfig';
import HrHeaders from './HrHeaders';
import InterceptorManager from '../interceptor/InterceptorManager';
import processRequest from '../request/processRequest';
import getRequestInterceptorsInfo from '../interceptor/getRequestInterceptorsInfo';
import getResponseInterceptorChain from '../interceptor/getResponseInterceptorChain';
import handleAsyncInterceptor from '../interceptor/handleAsyncInterceptor';
import handleSyncInterceptor from '../interceptor/handleSyncInterceptor';
import defaultConfig from '../config/defaultConfig';
import { Method } from '../types/types';
import {
  HrRequestConfig,
  HrResponse,
  HrInterface,
  HrInstance,
  Interceptors,
} from '../types/interfaces';

class HorizonRequest implements HrInterface {
  defaultConfig: HrRequestConfig;
  interceptors: Interceptors;
  processRequest: (config: HrRequestConfig) => Promise<any>;

  constructor(config: HrRequestConfig) {
    this.defaultConfig = config;
    // 初始化拦截器
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
    this.processRequest = processRequest;
  }

  request<T = unknown>(requestParam: string | Record<string, any>, config?: HrRequestConfig): Promise<HrResponse<T>> {
    // 1. 解析参数
    const mergedConfig = this.preprocessing(requestParam, config);

    // 2. 生成请求拦截器
    let isSync: boolean | undefined = true;

    // 生成请求和响应的拦截器链
    const requestInterceptorsInfo = getRequestInterceptorsInfo(this.interceptors, config, isSync);
    const requestInterceptorChain = requestInterceptorsInfo.requestInterceptorChain;
    isSync = requestInterceptorsInfo.isSync;
    const responseInterceptorChain = getResponseInterceptorChain.call(this);

    // 存在异步拦截器
    if (!isSync) {
      return handleAsyncInterceptor(
        this.processRequest,
        requestInterceptorChain,
        responseInterceptorChain,
        mergedConfig
      );
    }

    // 全都是同步拦截器处理
    return handleSyncInterceptor(
      this.processRequest,
      mergedConfig,
      requestInterceptorChain,
      responseInterceptorChain
    );
  }

  private preprocessing(requestParam: string | Record<string, any>, config?: HrRequestConfig) {
    let configOperation: Record<string, any> = {};

    if (typeof requestParam === 'object') {
      configOperation = { ...requestParam };
    } else {
      configOperation.url = requestParam;
      configOperation = { ...configOperation, ...config };
    }

    const mergedConfig: HrRequestConfig = getMergedConfig(this.defaultConfig, configOperation);
    mergedConfig.method = (mergedConfig.method || this.defaultConfig.method || 'GET').toUpperCase() as Method;

    const { headers } = mergedConfig;
    if (headers) {
      const contextHeaders = headers[mergedConfig.method]
        ? { ...headers.common, ...headers[mergedConfig.method] }
        : headers.common;

      // 删除 headers 中预定义的 common 请求头，确保 headers 对象只包含自定义的请求头
      if (contextHeaders) {
        Object.keys(headers).forEach(key => {
          if (key === 'common') {
            delete headers[key];
          }
        });
      }

      mergedConfig.headers = HrHeaders.concat(contextHeaders, headers);
    }

    return mergedConfig;
  }

  get<T = unknown>(url: string, config: HrRequestConfig) {
    return this.request<T>(
      getMergedConfig(config || {}, {
        method: 'get',
        url,
        data: (config || {}).data,
      })
    );
  }

  delete<T = unknown>(url: string, config: HrRequestConfig) {
    return this.request<T>(
      getMergedConfig(config || {}, {
        method: 'delete',
        url,
        data: (config || {}).data,
      })
    );
  }

  head<T = unknown>(url: string, config: HrRequestConfig) {
    return this.request<T>(
      getMergedConfig(config || {}, {
        method: 'head',
        url,
        data: (config || {}).data,
      })
    );
  }

  options<T = unknown>(url: string, config: HrRequestConfig) {
    return this.request<T>(
      getMergedConfig(config || {}, {
        method: 'options',
        url,
        data: (config || {}).data,
      })
    );
  }

  post<T = unknown>(url: string, data: any, config: HrRequestConfig) {
    return this.request<T>(
      getMergedConfig(config || {}, {
        method: 'post',
        url,
        data,
      })
    );
  }

  postForm<T = unknown>(url: string, data: any, config: HrRequestConfig) {
    return this.request<T>(
      getMergedConfig(config || {}, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        url,
        data,
      })
    );
  }

  put<T = unknown>(url: string, data: any, config: HrRequestConfig) {
    return this.request<T>(
      getMergedConfig(config || {}, {
        method: 'put',
        url,
        data,
      })
    );
  }

  putForm<T = unknown>(url: string, data: any, config: HrRequestConfig) {
    return this.request<T>(
      getMergedConfig(config || {}, {
        method: 'put',
        headers: { 'Content-Type': 'multipart/form-data' },
        url,
        data,
      })
    );
  }

  patch<T = unknown>(url: string, data: any, config: HrRequestConfig) {
    return this.request<T>(
      getMergedConfig(config || {}, {
        method: 'patch',
        url,
        data,
      })
    );
  }

  patchForm<T = unknown>(url: string, data: any, config: HrRequestConfig) {
    return this.request<T>(
      getMergedConfig(config || {}, {
        method: 'patch',
        headers: { 'Content-Type': 'multipart/form-data' },
        url,
        data,
      })
    );
  }

  // 创建 Hr 实例
  static create(instanceConfig?: HrRequestConfig): HrInstance {
    const config = getMergedConfig(defaultConfig, instanceConfig || {});

    return new HorizonRequest(config) as unknown as HrInstance;
  }
}

export default HorizonRequest;