/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Table from '../';
import { render, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import { Simulate } from 'react-addons-test-utils';

describe('Table with fixed columns', () => {
  const columns = [
    { title: 'title1', dataIndex: 'a', key: 'a', width: 100, fixed: 'left' },
    { title: 'title2', dataIndex: 'b', key: 'b', width: 100, fixed: 'left' },
    { title: 'title3', dataIndex: 'c', key: 'c' },
    { title: 'title4', dataIndex: 'b', key: 'd' },
    { title: 'title5', dataIndex: 'b', key: 'e' },
    { title: 'title6', dataIndex: 'b', key: 'f' },
    { title: 'title7', dataIndex: 'b', key: 'g' },
    { title: 'title8', dataIndex: 'b', key: 'h' },
    { title: 'title9', dataIndex: 'b', key: 'i' },
    { title: 'title10', dataIndex: 'b', key: 'j' },
    { title: 'title11', dataIndex: 'b', key: 'k' },
    { title: 'title12', dataIndex: 'b', key: 'l', width: 100, fixed: 'right' },
  ];

  const data = [
    { a: '123', b: 'xxxxxxxx', d: 3, key: '1' },
    { a: 'cdd', b: 'edd12221', d: 3, key: '2' },
    { a: '133', c: 'edd12221', d: 2, key: '3' },
    { a: '133', c: 'edd12221', d: 2, key: '4' },
    { a: '133', c: 'edd12221', d: 2, key: '5' },
    { a: '133', c: 'edd12221', d: 2, key: '6' },
    { a: '133', c: 'edd12221', d: 2, key: '7' },
    { a: '133', c: 'edd12221', d: 2, key: '8' },
    { a: '133', c: 'edd12221', d: 2, key: '9' },
  ];

  it('renders correctly', () => {
    const wrapper = render(
      <Table
        columns={columns}
        data={data}
        scroll={{ x: 1200 }}
      />
    );

    expect(renderToJson(wrapper)).toMatchSnapshot();
  });


  it('should be fixed in right when scroll', () => {
    const wrapper = mount(
      <Table
        columns={columns}
        data={data}
        scroll={{ x: 1200 }}
      />
    );

    const instance = wrapper.instance();
    const node = ReactDOM.findDOMNode(instance);
    const bodyNode = node.querySelector('.rc-table-scroll .rc-table-body');

    expect(wrapper.find('.rc-table').hasClass('rc-table-scroll-position-left')).toBe(true);

    Simulate.mouseOver(bodyNode);
    bodyNode.scrollLeft = 2000;
    Simulate.scroll(bodyNode);

    expect(wrapper.find('.rc-table').hasClass('rc-table-scroll-position-right')).toBe(true);
  });

  it('should has hover className', () => {
    const wrapper = mount(
      <Table
        columns={columns}
        data={data}
        scroll={{ x: 1200 }}
      />
    );

    const row = wrapper.find('table tbody tr').first();

    row.simulate('mouseenter');
    wrapper.find('table tbody').forEach(node => {
      expect(node.find('tr').first().hasClass('rc-table-row-hover')).toBe(true);
    });

    row.simulate('mouseleave');
    wrapper.find('table tbody').forEach(node => {
      expect(node.find('tr').first().hasClass('rc-table-row-hover')).toBe(false);
    });
  });
});
