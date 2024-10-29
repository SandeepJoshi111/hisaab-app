/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Cards from "../components/Cards/Cards";
import Header from "../components/Header/Header";
import AddExpenseModal from "../components/Modals/AddExpenseModal";
import AddIncomeModal from "../components/Modals/AddIncomeModal";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import TransactionsTable from "../components/TransactionsTable/TransactionsTable";
import Charts from "../components/Charts/Charts";
import NoTransactions from "../components/NoTransactions";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
      const newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      // toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
  };

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading..</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            currentBalance={currentBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          {transactions.length != 0 ? (
            <Charts sortedTransactions={sortedTransactions} />
          ) : (
            <NoTransactions />
          )}
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <TransactionsTable transactions={transactions} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
