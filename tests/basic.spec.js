/* eslint-disable no-undef */
import React from 'react';
import Table from '../';
import { render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

describe('table', () => {
  const columns = [
    { title: '表头1', dataIndex: 'a', key: 'a', colSpan: 2,
      width: 100, render(o, row, index) {
      // 第一列中第一行合并两列
        const obj = {
          children: o,
          props: {},
        };
        if (index === 0) {
          obj.props.colSpan = 2;
        }
        return obj;
      } },
    { id: '123', title: '表头2', colSpan: 0, dataIndex: 'b', key: 'b',
      width: 100, render(o, row, index) {
      // 2列被合并掉了colSpan:0，第二列中第一行合并两行rowSpan:2
        const obj = {
          children: o,
          props: {},
        };
        if (index === 0) {
          obj.props.colSpan = 0;
        }
        return obj;
      } },
    { title: '表头3', dataIndex: 'c', key: 'c', width: 200, render(o, row, index) {
      const obj = {
        children: o,
        props: {},
      };
      if (index === 0) {
        obj.props.rowSpan = 2;
      }
      if (index === 1) {
        obj.props.rowSpan = 0;
      }
      return obj;
    } },
    {
      title: 'operation', dataIndex: '', key: 'operation', render() {
        return <a href="#">操作</a>;
      },
    },
    {
      title: 'number', dataIndex: '', key: 'number', render() {
        return 123;
      },
    },
    {
      title: 'zero', dataIndex: '', key: 'zero', render() {
        return 0;
      },
    },
    {
      title: 'empty string', dataIndex: '', key: 'empty-string', render() {
        return '';
      },
    },
    {
      title: 'string', dataIndex: '', key: 'string', render() {
        return 'text';
      },
    },
    {
      title: 'false', dataIndex: '', key: 'false', render() {
        return false;
      },
    },
    {
      title: 'Array', dataIndex: '', key: 'array', render() {
        return [<a href="#" key="1">操作1</a>, <a href="#" key="2">操作2</a>];
      },
    },
  ];
  const data = [
    { a: '123', key: '1' },
    { a: 'cdd', b: 'edd', key: '2' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: {}, key: '4' },
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <Table
        columns={columns}
        data={data}
        expandedRowRender={record => <p>{record.a}</p>}
        expandRowByClick
      />
    );
  });

  it('renders correctly', () => {
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
});
