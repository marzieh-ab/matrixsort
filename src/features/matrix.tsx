import { createSlice } from "@reduxjs/toolkit";

interface MatrixState {
  row: { value: number; error: boolean };
  column: { value: number; error: boolean };
  isFormValid: boolean | string;
  data:string[][]
}

const initialState: MatrixState = {
  row: { value: 0, error: false },
  column: { value: 0, error: false },
  isFormValid: false,
  data:[]

};

const matrixSlice = createSlice({
  name: "matrix",
  initialState,
  reducers: {
    rowChange: (state, action) => {
      const inputValue = +action.payload; // Assuming payload is the value from the input
      const isValid = isValidEvenNumber(inputValue);
      console.log(isValid,"isvaliddrow")

      state.row = {
        value: inputValue,
        error: isValid,
      };

      // Update isFormValid based on your logic
      state.isFormValid = isValid;
      state.data = generateInitialData(state.row.value, state.column.value);

    },

    columnChange: (state, action) => {
      const inputValue = +action.payload; // Assuming payload is the value from the input
      const isValid = isValidEvenNumber(inputValue);
      console.log(isValid,"isvaliddcol")


      state.column = {
        value: inputValue,
        error: isValid,
      };

      // Update isFormValid based on your logic
      state.isFormValid = isValid;
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

export const { rowChange: rowChange, columnChange: columnChange, updateCell:updateCell,  sortRows : sortRows} = matrixSlice.actions;

export default matrixSlice.reducer;

// Utility function to check if a number is even
// function isValidEvenNumber(value: number): boolean {
//   return value % 2 !== 0;
// }





function isValidEvenNumber(value: number | string) {
  const numericValue = Number(value);

  if (isNaN(numericValue)) {
    return "لطفاً یک عدد وارد کنید";
  } else if (!Number.isInteger(numericValue)) {
    return "لطفاً یک عدد صحیح وارد کنید";
  } else if (numericValue <= 3 || numericValue % 2 === 0) {
    return "لطفاً عدد فرد و بزرگتر از 3 وارد کنید";
  } else {
    return true;
  }
}

function generateInitialData(rows:number, columns:number) {
  return Array.from({ length: rows }, (_, rowIndex) => (
    Array.from({ length: columns }, (_, colIndex) => '')
  ));
}
