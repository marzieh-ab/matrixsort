import { ChangeEvent, useState } from "react";

interface Props {
  error: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  validation: "number" | "even-after-3";
  placeholder: string;
}

const Input = ({ error, onChange, placeholder}: Props) => {
  console.log(error, "ooooooooo");

  return (
    <>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="  bg-white  rounded-md text-[15px]  w-[300px] p-4 outline-none  flex justify-center"
      />
      {error && <p className="text-red-400">{error}</p>}
    </>
  );
};

export default Input;
