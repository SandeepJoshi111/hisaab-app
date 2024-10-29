/* eslint-disable react/prop-types */
import { Line, Pie } from "@ant-design/charts";
import "./charts.css";
import { useEffect, useState } from "react";

const Charts = ({ sortedTransactions, currentBalance }) => {
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.4);

  // Update chart width on window resize
  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth * 0.8);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate running balance for each date
  let runningBalance = 0;
  const balanceData = sortedTransactions.map((item) => {
    runningBalance += item.type === "income" ? item.amount : -item.amount;
    return {
      date: item.date,
      balance: runningBalance,
    };
  });

  // Add the current balance as the last data point
  const lastDate =
    sortedTransactions.length > 0
      ? sortedTransactions[sortedTransactions.length - 1].date
      : null;
  if (lastDate) {
    balanceData.push({ date: lastDate, balance: currentBalance });
  }

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
    width: chartWidth,
    xAxis: {
      type: "timeCat",
      title: { text: "Date" },
    },
    yAxis: {
      title: { text: "Balance" },
    },
    color: (datum) =>
      datum.balance === currentBalance ? "#FFD700" : "#1890FF", // Highlight current balance in gold
  };

  // Pie chart configuration for total expenses by tag
  const spendingConfig = {
    data: spendingData,
    colorField: "tag",
    angleField: "amount",
    radius: 0.8,
    width: chartWidth,
  };

  return (
    <div className="charts-wrapper">
      <div className="charts-line">
        <h2>Your Balance Over Time</h2>
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
