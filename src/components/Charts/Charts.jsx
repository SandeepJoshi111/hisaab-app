/* eslint-disable react/prop-types */
import { Line, Pie } from "@ant-design/charts";
import "./charts.css";

const Charts = ({ sortedTransactions }) => {
  // Calculate running balance for each date
  let currentBalance = 0;
  const balanceData = sortedTransactions.map((item) => {
    currentBalance += item.type === "income" ? item.amount : -item.amount;
    return { date: item.date, balance: currentBalance };
  });

  const spendingData = sortedTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => {
      const existingTag = acc.find((item) => item.tag === transaction.tag);
      if (existingTag) {
        existingTag.amount += transaction.amount;
      } else {
        acc.push({ tag: transaction.tag, amount: transaction.amount });
      }
      return acc;
    }, []);

  const balanceConfig = {
    data: balanceData,
    xField: "date",
    yField: "balance",
    smooth: true,
    height: 300,
    xAxis: {
      type: "timeCat",
      title: { text: "Date" },
    },
    yAxis: {
      title: { text: "Balance" },
    },
  };

  // Pie chart configuration for total expenses by tag
  const spendingConfig = {
    data: spendingData,
    colorField: "tag",
    angleField: "amount",
    radius: 0.8,
    width: 500,
  };

  return (
    <div className="charts-wrapper">
      <div className="charts-line">
        <h1>Your Balance Over Time</h1>
        <Line {...balanceConfig} />
      </div>
      <div className="charts-pie">
        <h2>Total Spending</h2>
        {spendingData.length === 0 ? (
          <p>Seems like you haven&apos;t spent anything till now...</p>
        ) : (
          <Pie {...spendingConfig} />
        )}
      </div>
    </div>
  );
};

export default Charts;
