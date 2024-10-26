/* eslint-disable react/prop-types */
import { Table } from "antd";
import "./transactiontable.css";
import { useState } from "react";

const TransactionsTable = ({ transactions }) => {
  const [search, setSearch] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name"
      />
      <Table columns={columns} dataSource={filteredTransactions}></Table>
    </>
  );
};

export default TransactionsTable;
