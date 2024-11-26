import { Box, Button } from "@mui/material";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
// If you are using date-fns v2.x, please import `AdapterDateFns`
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
// If you are using date-fns v3.x or v4.x, please import the v3 adapter
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ja } from "date-fns/locale";
import { addMonths } from "date-fns";

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthSelector = ({
  currentMonth,
  setCurrentMonth,
}: MonthSelectorProps) => {
  const handleDateChange = (newDate: Date | null) => {
    console.log(newDate);
    if (newDate) {
      setCurrentMonth(newDate);
    }
  };

  //先月ボタンを押したときの処理
  const handlePreviousMonth = () => {
    const previousMonth = addMonths(currentMonth, -1);
    // console.log(previousMonth);
    setCurrentMonth(previousMonth);
  };

  //次月ボタンを押したときの処理
  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    setCurrentMonth(nextMonth);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          onClick={handlePreviousMonth}
          color={"error"}
          variant="contained"
        >
          先月
        </Button>
        <DatePicker
          onChange={handleDateChange}
          value={currentMonth}
          label="年月を選択"
          sx={{ mx: 2 }}
          views={["year", "month"]}
          format="yyyy年 MM月"
          slotProps={{
            // ↓ 何も変わらず
            toolbar: { toolbarFormat: "yyyy年 MM月" },
            calendarHeader: {
              format: "yyyy年 MM月", // ← これでダイアログの年月の見た目が変わる
            },
          }}
        />
        <Button onClick={handleNextMonth} color={"primary"} variant="contained">
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthSelector;
