import React, { useState } from "react";
import { Table, Transfer, TransferProps } from "@arco-design/web-react";
import { ColumnProps } from "@arco-design/web-react/es/Table";
import "@arco-design/web-react/dist/css/arco.css";
import "./transfer.css";

const TableTransfer: React.FC<
  TransferProps & { sourceColumns: ColumnProps[]; targetColumns: ColumnProps[] }
> = ({ sourceColumns, targetColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      listType,
      filteredItems,
      onItemSelect,
      onItemSelectAll,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = listType === "source" ? sourceColumns : targetColumns;
      return (
        <Table
          style={{
            pointerEvents: listDisabled ? "none" : undefined,
            borderRadius: 0,
            padding: 5,
          }}
          scroll={{ y: 600, x: true }}
          data={filteredItems}
          pagination={{ sizeCanChange: true }}
          columns={columns}
          rowSelection={{
            checkCrossPage: true,
            selectedRowKeys: listSelectedKeys,
            checkboxProps: (item) => {
              return {
                disabled: listDisabled || item.disabled,
                // Avoid triggering onRow.onClick
                onClick: (e) => e.stopPropagation(),
              };
            },

            onChange(selectedRowKeys) {
              onItemSelectAll(selectedRowKeys as any, true);
            },
          }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: (e) => {
              !itemDisabled &&
                !listDisabled &&
                onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const dataSource: ({ key: string } & Record<string, any>)[] = [
  {
    key: "0",
    company: "Bytedance Technology Co., Ltd.",
    headcount: 3000000,
    industry: "Technology",
  },
  {
    key: "1",
    company: "Toutiao Co., Ltd.",
    headcount: 40000,
    industry: "AI",
  },
  {
    key: "2",
    company: "Beijing Toutiao Technology Co., Ltd.",
    headcount: 500000,
    industry: "Technology",
  },
  {
    key: "3",
    company: "Beijing Volcengine Technology...",
    headcount: 6000000,
    industry: "Technology",
  },
  {
    key: "4",
    company: "4Beijing Volcengine Technology...",
    headcount: 6000000,
    industry: "Technology",
  },
  {
    key: "5",
    company: "5Beijing Volcengine Technology...",
    headcount: 6000000,
    industry: "Technology",
  },
  {
    key: "6",
    company: "6Beijing Volcengine Technology...",
    headcount: 6000000,
    industry: "Technology",
  },
];
for (let i = 0; i < 10; i++) {
  dataSource.push({
    key: String(i + 10),
    company: `company ${i + 10}`,
    headcount: 6000000,
    industry: "Technology",
    disabled: i % 5 === 0,
  });
}
const tableColumns = [
  {
    dataIndex: "key",
    title: "Id",
    width: 30,
  },
  {
    dataIndex: "company",
    title: "Company",
    width: 50,
  },
  {
    dataIndex: "headcount",
    title: "Headcount",
    width: 50,
    sorter: (a, b) => a.headcount - b.headcount,
    render: (_, item) => `${item.headcount}`.replace(/B(?=(d{3})+(?!d))/g, ","),
  },
  {
    dataIndex: "industry",
    title: "Industry",
    sorter: (a, b) =>
      a.industry.toUpperCase() > b.industry.toUpperCase() ? 1 : -1,
    width: 50,
  },
];

const filterOption = (input: string, item: any): boolean => {
  return new RegExp(input, "i").test(item.company);
};

/**
 * 功能验证：
 * 穿梭框中展示表格（前端分页数据）
 * 支持搜索筛选
 */
const TableTransferDemo: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  return (
    <TableTransfer
      showSearch={{ allowClear: true }}
      className="transfer-demo-with-table"
      style={{ padding: 20 }}
      listStyle={{
        width: 540,
        height: 840,
        flex: undefined,
      }}
      dataSource={dataSource as any}
      filterOption={filterOption}
      targetKeys={targetKeys}
      sourceColumns={tableColumns}
      targetColumns={tableColumns}
      onChange={(keys) => {
        setTargetKeys(keys);
      }}
    />
  );
};
export { TableTransferDemo as Transfer };
