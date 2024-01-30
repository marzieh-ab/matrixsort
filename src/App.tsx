import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CreateTable from "./components/CreateTable";
import Input from "./components/Input";
import { columnChange, rowChange } from "./features/matrix";





function App() {
  const { row, column, isFormValid } = useSelector(
    (store: any) => store.matrix
  );
  const dispatch = useDispatch();
  const [showTable, setShowTable] = useState(false);

  

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
  console.log(isFormValid, "isfrrmvalid");

  return (
    <>
      <div className="w-full h-full flex  flex-col items-center justify-center">
        {showTable ? (
          <CreateTable />
        ) : (
          <form
            action=""
            onSubmit={handelSubmit}
            className="mt-20 w-[450px] h-[400px] bg-[#f6f7fa]  rounded-md  shadow-lg flex flex-col gap-y-5  justify-center items-center"
          >
            <Input
              onChange={handleRowsChange}
              error={row.error}
              placeholder="لطفا تعداد سطرها را وارد کنید"
              validation={"number"}
            />
            <Input
              onChange={handleColumnChange}
              error={column.error}
              placeholder="لطفا تعداد ستون ها را وارد کنید"
              validation={"number"}
            />
            <button
              className="p-2  mt-3 rounded-md  border bg-slate-400 text-white"
              disabled={!isFormValid}
            >
              ثبت و ادامه
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default App;
