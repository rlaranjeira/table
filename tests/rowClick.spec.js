/* eslint-disable no-undef */
import React from 'react';
import Table from '../';
import { mount } from 'enzyme';

describe('click table row', () => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 400,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 100,
    render: (text) => (
      <a href="#">
        Alert: {text}, click will pop to row click
      </a>
    ),
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 200,
  }];
  const data = [{
    key: 1,
    name: 'a',
    age: 32,
    address: 'I am a',
  }];

  let wrapper;
  let onRowClick;
  let onRowDoubleClick;

  beforeEach(() => {
    onRowClick = jest.fn();
    onRowDoubleClick = jest.fn();
    wrapper = mount(
      <Table
        columns={columns}
        data={data}
        onRowClick={onRowClick}
        onRowDoubleClick={onRowDoubleClick}
      />
    );
  });


  it('click', () => {
    const row = wrapper.find('tbody tr');
    row.simulate('click');
    const args = onRowClick.mock.calls[0];
    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(args[0]).toBe(data[0]);
    expect(args[1]).toBe(0);
    expect(args[2].type).toBe('click');
  });

  it('double click', () => {
    const row = wrapper.find('tbody tr');
    row.simulate('doubleclick');
    const args = onRowDoubleClick.mock.calls[0];
    expect(onRowDoubleClick).toHaveBeenCalledTimes(1);
    expect(args[0]).toBe(data[0]);
    expect(args[1]).toBe(0);
    expect(args[2].type).toBe('doubleclick');
  });
});
