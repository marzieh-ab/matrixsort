import { createSlice } from "@reduxjs/toolkit";

interface MatrixState {
  row: { value: number; error?: string };
  column: { value: number; error?: string };
  isFormValid: boolean | string;
  data: string[][];
}

const initialState: MatrixState = {
  row: { value: 0, error: "" },
  column: { value: 0, error: "" },
  isFormValid: false,
  data: [],
};

const matrixSlice = createSlice({
  name: "matrix",
  initialState,
  reducers: {
    rowChange: (state, action) => {
      const inputValue = +action.payload; 
      const isValid = validateEvenNumber(inputValue);
      console.log(isValid, "isvaliddrow");

      state.row = {
        value: inputValue,
        error: isValid,
      };

    
      state.isFormValid = !state.row.error && !state.column.error;
      state.data = generateInitialData(state.row.value, state.column.value);
    },

    columnChange: (state, action) => {
      const inputValue = +action.payload; 
      const isValid = validateEvenNumber(inputValue);
      console.log(isValid, "isvaliddcol");

      state.column = {
        value: inputValue,
        error: isValid,
      };

      // Update isFormValid based on your logic
      state.isFormValid = !state.row.error && !state.column.error;
      state.data = generateInitialData(state.row.value, state.column.value);
    },
    updateCell: (state, action) => {
      const { rowIndex, colIndex, value } = action.payload;
      state.data[rowIndex][colIndex] = value;
    },

    sortRows: (state) => {
      const sortedData = [...state.data];

      for (let i = 0; i < sortedData.length; i += 2) {
        const rowValues = sortedData[i].map((cell) => parseInt(cell, 10));
        rowValues.sort((a, b) => a - b);
        sortedData[i] = rowValues.map((value) => String(value));
      }

      for (let i = 1; i < sortedData.length; i += 2) {
        const rowValues = sortedData[i].map((cell) => parseInt(cell, 10));
        rowValues.sort((a, b) => b - a);
        sortedData[i] = rowValues.map((value) => String(value));
      }

      state.data = sortedData;
    },
  },
});

export const {
  rowChange: rowChange,
  columnChange: columnChange,
  updateCell: updateCell,
  sortRows: sortRows,
} = matrixSlice.actions;

export default matrixSlice.reducer;



function validateEvenNumber(value: number) {
  if (isNaN(value)) {
    return "لطفاً یک عدد وارد کنید";
  } else if (!Number.isInteger(value)) {
    return "لطفاً یک عدد صحیح وارد کنید";
  } else if (value <= 3 || value % 2 === 0) {
    return "لطفاً عدد فرد و بزرگتر از 3 وارد کنید";
  }
}

function generateInitialData(rows: number, columns: number) {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, colIndex) => "")
  );
}
