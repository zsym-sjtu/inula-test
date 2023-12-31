/*
 * Copyright (c) 2023 Huawei Technologies Co.,Ltd.
 *
 * openInula is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *
 *          http://license.coscl.org.cn/MulanPSL2
 *
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider, useIntl } from '../../../index';

const FunctionComponent = ({ spy }: { spy?: Function }) => {
  const { i18n } = useIntl();
  spy!(i18n.locale);
  return null;
};

const FC = () => {
  const i18n = useIntl();
  return i18n.formatNumber(10000, { style: 'currency', currency: 'USD' }) as any;
};

describe('useIntl() hooks', () => {
  it('throws when <IntlProvider> is missing from ancestry', () => {
    // So it doesn't spam the console
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<FunctionComponent />)).toThrow('I18n object is not found!');
  });

  it('hooks onto the intl context', () => {
    const spy = jest.fn();
    render(
      <IntlProvider locale="en">
        <FunctionComponent spy={spy} />
      </IntlProvider>
    );
    expect(spy).toHaveBeenCalledWith('en');
  });

  it('should work when switching locale on provider', () => {
    const { rerender, getByTestId } = render(
      <IntlProvider locale="en">
        <span data-testid="comp">
          <FC />
        </span>
      </IntlProvider>
    );
    expect(getByTestId('comp')).toMatchSnapshot();
    rerender(
      <IntlProvider locale="es">
        <span data-testid="comp">
          <FC />
        </span>
      </IntlProvider>
    );
    expect(getByTestId('comp')).toMatchSnapshot();
    rerender(
      <IntlProvider locale="en">
        <span data-testid="comp">
          <FC />
        </span>
      </IntlProvider>
    );

    expect(getByTestId('comp')).toMatchSnapshot();
  });
});
