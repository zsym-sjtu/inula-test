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

import getFormData from '../../../../src/utils/dataUtils/getFormData';

describe('getFormData function', () => {
  it('should convert object to FormData', () => {
    const obj = {
      name: 'John',
      age: 30,
      hobbies: ['Reading', 'Gaming'],
    };

    const formData = getFormData(obj);

    expect(formData.get('name')).toBe('John');
    expect(formData.get('age')).toBe('30');
    expect(formData.getAll('hobbies')).toEqual(['Reading', 'Gaming']);
  });

  it('should append to existing FormData', () => {
    const existingFormData = new FormData();
    existingFormData.append('existing', 'value');

    const obj = {
      name: 'John',
      age: 30,
    };

    const formData = getFormData(obj, existingFormData);

    expect(formData.get('existing')).toBe('value');
    expect(formData.get('name')).toBe('John');
    expect(formData.get('age')).toBe('30');
  });

  it('should handle empty object', () => {
    const obj = {};

    const formData = getFormData(obj);

    expect(formData.get('name')).toBeNull();
    expect(formData.get('age')).toBeNull();
  });

  it('should convert array values to string', () => {
    const obj = {
      items: [1, 2, 3],
    };

    const formData = getFormData(obj);

    expect(formData.getAll('items')).toEqual(['1', '2', '3']);
  });
});
