import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { AppContextProvider } from "./context/AppContext";

function App() {
  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [currentMouth, setCurrentMonth] = useState(new Date());
  // const [isLoading, setIsLoading] = useState(true);

  // function isFireStoreError(
  //   err: unknown
  // ): err is { code: string; message: string } {
  //   return typeof err === "object" && err !== null && "code" in err;
  // }

  // // ひと月分のデータのみ取得
  // const monthlyTransactions = transactions.filter((transaction) => {
  //   return transaction.date.startsWith(formatMonth(currentMouth));
  // });

  // //取引を保存する処理
  // const handleSaveTransaction = async (transaction: Schema) => {
  //   console.log(transaction);
  //   try {
  //     //firestoreにデータを保存
  //     // Add a new document with a generated id.
  //     const docRef = await addDoc(collection(db, "Transactions"), transaction);
  //     console.log("Document written with ID: ", docRef.id);

  //     const newTransaction = {
  //       id: docRef.id,
  //       ...transaction,
  //     } as Transaction;
  //     console.log(newTransaction);
  //     setTransactions((prevTransaction) => [
  //       ...prevTransaction,
  //       newTransaction,
  //     ]);
  //   } catch (err) {
  //     if (isFireStoreError(err)) {
  //       console.error("firestoreのエラーは：", err);
  //     } else {
  //       console.error("一般的なエラーは：", err);
  //     }
  //   }
  // };

  // //削除処理関数
  // const handleDeleteTransaction = async (
  //   transactionIds: string | readonly string[]
  // ) => {
  //   try {
  //     const idsToDelete = Array.isArray(transactionIds)
  //       ? transactionIds
  //       : [transactionIds];
  //     console.log(idsToDelete);

  //     for (const id of idsToDelete) {
  //       //firestoreのデータ削除
  //       await deleteDoc(doc(db, "Transactions", id));
  //     }
  //     // const filterdTransactions = transactions.filter(
  //     //   (transaction) => transaction.id !== transactionId
  //     // );

  //     const filterdTransactions = transactions.filter(
  //       (transaction) => !idsToDelete.includes(transaction.id)
  //     );

  //     console.log(filterdTransactions);
  //     setTransactions(filterdTransactions);
  //   } catch (err) {
  //     if (isFireStoreError(err)) {
  //       console.error("firestoreのエラーは：", err);
  //     } else {
  //       console.error("一般的なエラーは：", err);
  //     }
  //   }
  // };

  // const handleUpdateTransaction = async (
  //   transaction: Schema,
  //   transactionId: string
  // ) => {
  //   try {
  //     // firestore更新処理
  //     const docRef = doc(db, "Transactions", transactionId);
  //     // Set the "capital" field of the city 'DC'
  //     await updateDoc(docRef, transaction);
  //     //フロント更新
  //     const updatedTransactions = transactions.map((t) =>
  //       t.id === transactionId ? { ...t, ...transaction } : t
  //     ) as Transaction[];
  //     console.log(updatedTransactions);
  //     setTransactions(updatedTransactions);
  //   } catch (err) {
  //     if (isFireStoreError(err)) {
  //       console.error("firestoreのエラーは：", err);
  //     } else {
  //       console.error("一般的なエラーは：", err);
  //     }
  //   }
  // };

  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route
                index
                element={
                  <Home
                    // monthlyTransactions={monthlyTransactions}
                    // setCurrentMonth={setCurrentMonth}
                    // onSaveTransaction={handleSaveTransaction}
                    // onDeleteTransaction={handleDeleteTransaction}
                    // onUpdateTransaction={handleUpdateTransaction}
                  />
                }
              />
              <Route
                path="/report"
                element={
                  <Report
                    // currentMonth={currentMouth}
                    // setCurrentMonth={setCurrentMonth}
                    // monthlyTransactions={monthlyTransactions}
                    // isLoading={isLoading}
                    // onDeleteTransaction={handleDeleteTransaction}
                  />
                }
              />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
