import React from "react";
import ConfirmDelete from "./ConfirmDelete";

type Job = {
  id: number;
  name: string;
  status: boolean;
};

type Props = {
  job: Job;
  changeStatus: (id: number) => any;
  handleDelete: (job: Job) => any;
  updateJob: (job: Job) => any;
};

export default function JobList({
  job,
  changeStatus,
  handleDelete,
  updateJob,
}: Props) {
  const handleChecked = (id: number) => {
    changeStatus(id);
  };

  const checkDeleteJob = (job: Job) => {
    handleDelete(job);
  };

  const editId = (job: Job) => {
    updateJob(job);
  };

  return (
    <div>
      <>
        <li key={job.id} className="mb-[20px]">
          <div className="flex justify-between items-center  rounded-md h-[50px] border-2 px-[20px]">
            <div className="flex items-center">
              <input
                className="mr-[10px]"
                onChange={() => handleChecked(job.id)}
                type="checkbox"
                checked={job.status}
              />
              {job.status ? <s>{job.name}</s> : <p>{job.name}</p>}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => editId(job)}>
                <i className="fa-solid fa-pen text-yellow-300"></i>
              </button>
              <button onClick={() => checkDeleteJob(job)}>
                <i className="fa-solid fa-trash text-red-600"></i>
              </button>
            </div>
          </div>
        </li>
      </>
    </div>
  );
}
