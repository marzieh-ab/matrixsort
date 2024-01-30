import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CreateTable from "./components/CreateTable";
import Input from "./components/Input";
import { columnChange, rowChange } from "./features/matrix";

function isValidNumber(value: number) {
  if (!value || isNaN(value)) {
    return false;
  } else {
    return true;
  }
}

function isValidEvenNumber(value: number) {
  if (!value) {
    return "لطفا فیلد مورد نطر را پر کنید";
  } else if (isNaN(value)) {
    return "لطفا عدد وارد کنید";
  } else if (value <= 3 && value % 2 === 0) {
    return " عدد فرد و بزرگتر از 3 وارد کنید";
  } else {
    return true;
  }
}

function App() {
  const { row, column, isFormValid } = useSelector((store:any) => store.matrix);
  const dispatch = useDispatch();
  const [showTable, setShowTable] = useState(false);

  // const {row, column} = useSelector(state => state.app)
  // dispatch(rowChanged({ value, error }))

  const handelSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid) {
      setShowTable(true);
    }
  };

  const handleRowsChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(rowChange(+event.target.value));
  };

  const handleColumnChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(columnChange(+event.target.value));
  };

  console.log(row, "rowww");
  console.log(column, "column");
  console.log(  typeof isFormValid, "isfrrmvalid");

  return (
    <>
      <div className="w-full h-full flex  flex-col items-center justify-center">
        {showTable ? (
          <CreateTable  />
        ) : (
          <form
            action=""
            onSubmit={handelSubmit}
            className="mt-20 w-[450px] h-[400px] bg-[#f6f7fa]  rounded-md  shadow-lg flex flex-col gap-y-5  justify-center items-center"
          >
            <Input
              onChange={handleRowsChange}
              isFormValid={isFormValid}
              error={row.error}
              placeholder="لطفا تعداد سطرها را وارد کنید"
            />
            <Input
              onChange={handleColumnChange}
              isFormValid={isFormValid}
              error={column.error}
              placeholder="لطفا تعداد ستون ها را وارد کنید"
            />
            <button className="p-2  mt-3 rounded-md  border bg-slate-400 text-white"  >
              ثبت و ادامه
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default App;
