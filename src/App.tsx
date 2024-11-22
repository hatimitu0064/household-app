import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Transaction } from "./types/index";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { format } from "date-fns";
import { formatMonth } from "./utils/formatting";

function App() {
  // Firestoreエラーかどうかを判定する型ガード
  function isFireStoreError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === "object" && err !== null && "code" in err;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMouth, setCurrentMonth] = useState(new Date());

	// Firestoreのデータをすべて取得
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        // console.log(querySnapshot);

        const transactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });

        // console.log(transactionsData);
        setTransactions(transactionsData);
      } catch (err) {
        if (isFireStoreError(err)) {
          console.error("firebaseのエラーは：", err);
        } else {
          console.error("一般的なエラーは：", err);
        }
        //error
      }
    };

    fetchTransactions();
  }, []);

	// ひと月分のデータのみ取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMouth));
  });

  console.log(monthlyTransactions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={<Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} />}
            />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
