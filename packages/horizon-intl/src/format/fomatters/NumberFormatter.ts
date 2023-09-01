/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */

import creatI18nCache from '../cache/cache';
import { Locales } from '../../types/types';
import utils from '../../utils/utils';

/**
 * 数字格式化
 */
class NumberFormatter {
  private readonly locales: Locales;
  private readonly formatOption?: Intl.NumberFormatOptions;
  private readonly useMemorize?: boolean;
  private cache = creatI18nCache().numberFormat; // 创建一个缓存对象，用于缓存已经创建的数字格式化器

  constructor(locales: Locales, formatOption?: Intl.NumberFormatOptions, useMemorize?: boolean) {
    this.locales = locales;
    this.formatOption = formatOption ?? {};
    this.useMemorize = useMemorize ?? true;
  }

  numberFormat(value: number, formatOption?: Intl.NumberFormatOptions): string {
    const options = formatOption ?? this.formatOption;
    const formatter = new Intl.NumberFormat(this.locales, options);

    // 如果启用了记忆化且已经有对应的数字格式化器缓存，则直接返回缓存中的格式化结果。否则创建新的格式化数据，并进行缓存
    if (this.useMemorize) {
      // 造缓存的key，key包含区域设置数字格式选项
      const cacheKey = utils.generateKey<Intl.NumberFormatOptions>(this.locales, options);

      if (this.cache[cacheKey]) {
        return this.cache[cacheKey].format(value);
      }

      this.cache[cacheKey] = formatter;
      return formatter.format(value);
    }
    return formatter.format(value);
  }
}

export default NumberFormatter;
