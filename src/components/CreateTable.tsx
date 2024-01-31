import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { sortRows, updateCell } from "../features/matrix";


const CreateTable = () => {
  const tableData = useSelector((store: any) => store.matrix.data);
  const dispatch = useDispatch();
  console.log(tableData, "dataaa");

  const handleInputChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    console.log(rowIndex, "indexxx");
    const isValid = isValidEvenNumber(value);

    if (isValid === true) {
      dispatch(updateCell({ rowIndex, colIndex, value }));
    } else {
      alert(`${isValid}`);
    }
  };

  function isValidEvenNumber(value: number | string): boolean | string {
    const numericValue = Number(value);
    if (isNaN(numericValue)) {
      return "لطفاً یک عدد وارد کنید";
    } else if (!Number.isInteger(numericValue)) {
      return "لطفاً یک عدد صحیح وارد کنید";
    } else {
      return true;
    }
  }
  const areAllInputsFilled = (tableData:string[][]) => {
    return tableData.every(row => row.every(cell => cell.trim() !== ''));
  };

  const sortRowsHandler = () => {
    const allInputsFilled = areAllInputsFilled(tableData);
  
    if (allInputsFilled) {
      dispatch(sortRows());
    } else {
      alert("لطفاً تمامی فیلدها را پر کنید");
    }
  };

  return (
    <div className="flex flex-col mt-[40px]  bg-red items-center justify-center h-[100%]  w-[100%] ">
      {tableData.map((row: string[], rowIndex: number) => (
        <div key={rowIndex} className={`table-row ${rowIndex % 2 === 0 ? 'even-row' : 'odd-row'}`}
        >
          {row.map((cell, colIndex) => (
            <div key={colIndex}  className={`table-cell `}
>
            
              <input
                type="text"
                className="  border-t border-b  text-center   p-3 outline-none w-[100px]  text-[10px]  bg-transparent "
                placeholder="عدد وارد کنید"
                required
                value={cell}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      ))}
      <div>
        <div>
          <button
            onClick={sortRowsHandler}
            className="bg-blue-500 text-white p-2 m-2  rounded rounded-md  text-[12px] mt-9 "
          >
            مرتب‌سازی
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTable;
