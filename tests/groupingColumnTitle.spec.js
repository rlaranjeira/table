/* eslint-disable no-undef */
import React from 'react';
import Table from '../';
import { render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

describe('Table with grouping columns', () => {
  it('group columns', () => {
    /**
     * +---+---+---------------+-------+---+
     * |   |   |       C       |   J   |   |
     * |   |   +---+---------------+---+   |
     * |   |   |   |     E     |   |   |   |
     * | A | B |   +---+-------+   |   | M |
     * |   |   | D | F |   G   | K | L |   |
     * |   |   |   |   +---+---+   |   |   |
     * |   |   |   |   | H | I |   |   |   |
     * +---+---+---+---+---+---+---+---+---+
     */
    const columns = [
      { title: '表头A', className: 'title-a', dataIndex: 'a', key: 'a' },
      { title: '表头B', className: 'title-b', dataIndex: 'b', key: 'b' },
      { title: '表头C', className: 'title-c', children:
        [
          { title: '表头D', className: 'title-d', dataIndex: 'c', key: 'c' },
          { title: '表头E', className: 'title-e', children:
            [
              { title: '表头F', className: 'title-f', dataIndex: 'd', key: 'd' },
              { title: '表头G', className: 'title-g', children:
                [
                  { title: '表头H', className: 'title-h', dataIndex: 'e', key: 'e' },
                  { title: '表头I', className: 'title-i', dataIndex: 'f', key: 'f' },
                ],
              },
            ],
          },
        ],
      },
      { title: '表头J', className: 'title-j', children:
        [
          { title: '表头K', className: 'title-k', dataIndex: 'g', key: 'g' },
          { title: '表头L', className: 'title-l', dataIndex: 'h', key: 'h' },
        ],
      },
      { title: '表头M', className: 'title-m', dataIndex: 'i', key: 'i' },
    ];

    const data = [
      { key: '1', a: 'a1', b: 'b1', c: 'c1', d: 'd1', e: 'e1', f: 'f1', g: 'g1', h: 'h1', i: 'i1' },
      { key: '2', a: 'a2', b: 'b2', c: 'c2', d: 'd2', e: 'e2', f: 'f2', g: 'g2', h: 'h2', i: 'i2' },
      { key: '3', a: 'a3', b: 'b3', c: 'c3', d: 'd3', e: 'e3', f: 'f3', g: 'g3', h: 'h3', i: 'i3' },
    ];

    const wrapper = render(
      <Table columns={columns} data={data} />
    );

    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('work with fixed columns', () => {
    const columns = [
      { title: '表头A', className: 'title-a', dataIndex: 'a', key: 'a', fixed: 'left' },
      { title: '表头B', className: 'title-b', children:
        [
          { title: '表头C', className: 'title-c', dataIndex: 'b', key: 'b' },
          { title: '表头D', className: 'title-d', dataIndex: 'c', key: 'c' },
        ],
      },
      { title: '表头E', className: 'title-e', dataIndex: 'd', key: 'd', fixed: 'right' },
    ];

    const data = [
      { key: '1', a: 'a1', b: 'b1', c: 'c1', d: 'd1' },
      { key: '2', a: 'a2', b: 'b2', c: 'c2', d: 'd2' },
      { key: '3', a: 'a3', b: 'b3', c: 'c3', d: 'd3' },
    ];

    const wrapper = render(
      <Table columns={columns} data={data} />
    );

    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
});
