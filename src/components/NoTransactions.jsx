import transactions from "../assets/transactions.svg";

function NoTransactions() {
  return (
    <div className="no-transactions-wrapper">
      <img
        src={transactions}
        className="no-transactions-image"
        alt="No transactions"
      />
      <p className="no-transactions-text">You Have No Transactions Currently</p>
    </div>
  );
}

export default NoTransactions;
