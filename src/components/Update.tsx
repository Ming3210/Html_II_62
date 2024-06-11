import React, { useState } from "react";

type UpdateProps = {
  updateFormClose: () => void;
  updateFormConfirm: (name: string) => void;
};

export default function Update({
  updateFormClose,
  updateFormConfirm,
}: UpdateProps) {
  const [name, setName] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  return (
    <div>
      {" "}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col w-[300px] border-2 p-8 bg-white rounded">
          <div>
            <h1 className="text-start text-[24px]">Sửa công việc</h1>
          </div>
          <hr />
          <div className="h-[70px] flex items-center w-[100%]">
            <input
              name="name"
              onChange={handleChange}
              type="text"
              className="border-2 w-[100%]"
            />
          </div>
          <hr />
          <div className="text-end mt-4">
            <button onClick={updateFormClose} className="border-2 w-[60px]">
              Hủy
            </button>
            <button
              onClick={() => updateFormConfirm(name)}
              className="border-2 bg-green-400 w-[60px]"
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
