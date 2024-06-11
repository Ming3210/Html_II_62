import React from "react";

type DeleteProps = {
  handleClose: () => void;
  handleConfirm: () => void;
};

export default function ConfirmDelete({
  handleClose,
  handleConfirm,
}: DeleteProps) {
  return (
    <div>
      {" "}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col w-[300px] border-2 p-8 bg-white rounded">
          <div>
            <h1 className="text-start text-[24px]">Xóa sinh viên</h1>
          </div>
          <hr />
          <div className="h-[70px] flex items-center">
            <p>Bạn chắc chắn muốn xóa</p>
          </div>
          <hr />
          <div className="text-end mt-4">
            <button onClick={handleClose} className="border-2 w-[60px]">
              Hủy
            </button>
            <button
              onClick={handleConfirm}
              className="border-2 bg-red-400 w-[60px]"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
