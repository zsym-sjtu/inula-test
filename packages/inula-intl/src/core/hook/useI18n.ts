/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
import Inula, { useContext } from 'inulajs';
import utils from '../../utils/utils';
import { I18nContext } from '../components/InjectI18n';
import I18n from '../I18n';
import { IntlType } from '../../types/types';

/**
 *  useI18n hook，与 Inula 组件一起使用。
 *  使用 useI18n 钩子函数可以更方便地在函数组件中进行国际化操作
 */
function useI18n(): IntlType {
  const i18nContext = useContext<I18n>(I18nContext);
  utils.isVariantI18n(i18nContext);
  const i18n = i18nContext;
  return {
    i18n: i18n,
    formatMessage: i18n.formatMessage.bind(i18n),
    formatNumber: i18n.formatNumber.bind(i18n),
    formatDate: i18n.formatDate.bind(i18n),
  };
}

export default useI18n;