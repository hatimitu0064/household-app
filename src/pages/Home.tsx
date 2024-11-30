import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";
import { format, isSameDay, parseISO } from "date-fns";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { useAppContext } from "../context/AppContext";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";

// interface HomeProps {
//   monthlyTransactions: Transaction[];
//   setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
//   onSaveTransaction: (transaction: Schema) => Promise<void>;
//   onDeleteTransaction: (
//     transactionId: string | readonly string[]
//   ) => Promise<void>;
//   onUpdateTransaction: (
//     transaction: Schema,
//     transactionId: string
//   ) => Promise<void>;
// }

const Home = (
	// {}:
// monthlyTransactions,
// setCurrentMonth,
// onSaveTransaction,
// onDeleteTransaction,
// onUpdateTransaction,
// HomeProps
) => {
  const { isMobile } = useAppContext();
  const monthlyTransactions = useMonthlyTransactions();

  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  //一日分のデータを取得
  const dailyTransactions = useMemo(() => {
    return monthlyTransactions.filter((transaction) =>
      isSameDay(parseISO(transaction.date), parseISO(currentDay))
    );
  }, [monthlyTransactions, currentDay]);

  const closeForm = () => {
    setSelectedTransaction(null);
    if (isMobile) {
      setIsDialogOpen(false);
    } else {
      setIsEntryDrawerOpen(false);
    }
  };

  const handleAddTransactionForm = () => {
    if (isMobile) {
      setIsDialogOpen(true);
    } else {
      if (selectedTransaction) {
        setSelectedTransaction(null);
      } else {
        setIsEntryDrawerOpen(!isEntryDrawerOpen);
      }
    }
  };

  // 取引が選択されたときの処理
  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);

    if (isMobile) {
      setIsDialogOpen(true);
    } else {
      setIsEntryDrawerOpen(true);
    }
  };

  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
    setIsMobileDrawerOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary
        // monthlyTransactions={monthlyTransactions}
        />
        <Calendar
          // monthlyTransactions={monthlyTransactions}
          // setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
          onDateClick={handleDateClick}
        />
      </Box>
      <Box>
        <TransactionMenu
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          onAddTransactionForm={handleAddTransactionForm}
          onSelectTransaction={handleSelectTransaction}
          // isMobile={isMobile}
          open={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
        />
        <TransactionForm
          onCloseForm={closeForm}
          isEntryDrawerOpen={isEntryDrawerOpen}
          currentDay={currentDay}
          // onSaveTransaction={onSaveTransaction}
          selectedTransaction={selectedTransaction}
          // onDeleteTransaction={onDeleteTransaction}
          setSelectedTransaction={setSelectedTransaction}
          // onUpdateTransaction={onUpdateTransaction}
          // isMobile={isMobile}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </Box>
    </Box>
  );
};

export default Home;
