import React from "react";

type UpdateProps = {
  updateFormClose: () => void;
  updateFormConfirm: () => void;
};

export default function Loading({
  updateFormClose,
  updateFormConfirm,
}: UpdateProps) {
  return (
    <div className="w-[100%] h-[100%] absolute flex justify-center items-center bg-slate-500  bg-opacity-50">
      <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
    </div>
  );
}
