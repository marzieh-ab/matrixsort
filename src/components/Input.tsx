import { ChangeEvent, useState } from "react";

interface Props {
  error: boolean;
  onChange: (value: number, error: boolean) => void;
  validation: "number" | "even-after-3";
  placeholder:string,
  isFormValid:string
}

const Input = ({ error, onChange,placeholder,isFormValid }: Props) => {
 console.log( error,"ooooooooo")

  return (
    <>
      <input onChange={onChange}    placeholder={placeholder}  className="  bg-white  rounded-md text-[15px]  w-[300px] p-4 outline-none  flex justify-center"/>
      {error && <p  className="text-red-400">{isFormValid}</p>}
    </>
  );
};

export default Input;
