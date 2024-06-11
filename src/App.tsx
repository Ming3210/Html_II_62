import axios from "axios";
import React, { useEffect, useState } from "react";
import JobList from "./components/JobList";
import Loading from "./components/Loading";
import ConfirmDelete from "./components/ConfirmDelete";
import Update from "./components/Update";

type Job = {
  id: number;
  name: string;
  status: boolean;
};

export default function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [jobList, setJobList] = useState<Job[]>([]);
  const [deleteJob, setDeletedJob] = useState<Job | null>(null);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [showComplete, setShowComplete] = useState<boolean>(false);
  const [updateJob, setUpdateJob] = useState<Job | null>(null);
  const [showUpdateJob, setShowUpdateJob] = useState<boolean>(false);
  const [filtering, setFiltering] = useState<boolean>(false);
  const loadData = () => {
    axios
      .get("http://localhost:8080/jobs")
      .then((res) => {
        setJobList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const firstLoad = () => {
    axios
      .get("http://localhost:8080/jobs")
      .then((res) => {
        setTimeout(() => {
          setJobList(res.data);
          setLoading(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const changeStatus = (id: number) => {
    const findIndexJob = jobList.findIndex((job: Job) => job.id == id);
    let newJob = {
      id: jobList[findIndexJob].id,
      name: jobList[findIndexJob].name,
      status: !jobList[findIndexJob].status,
    };

    axios
      .patch(`http://localhost:8080/jobs/${id}`, newJob)
      .then((res) => loadData());
  };

  const checkJobDelete = (job: Job) => {
    setDeletedJob(job);
    setShowModalDelete(true);
  };
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/jobs/${deleteJob?.id}`)
      .then((res) => loadData())
      .catch((err) => {
        console.log(err);
      });
    setShowModalDelete(false);
  };
  const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!e.target.value) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const addJob = () => {
    if (inputValue) {
      const job: Job = {
        id: Math.floor(Math.random() * 9999999999999),
        name: inputValue,
        status: false,
      };
      axios
        .post(`http://localhost:8080/jobs`, job)
        .then((res) => loadData())
        .catch((err) => console.log(err));
    }
  };

  const updateId = (job: Job) => {
    console.log(job);
    setUpdateJob(job);
    setShowUpdateJob(true);
  };
  const handleUpdate = (name: any) => {
    let update = {
      name: name,
    };
    axios
      .patch(`http://localhost:8080/jobs/${updateJob?.id}`, update)
      .then((res) => loadData())
      .catch((err) => console.log(err));
    setShowUpdateJob(false);
  };

  const all = () => {
    loadData();
  };

  const complete = () => {
    axios
      .get("http://localhost:8080/jobs")
      .then((res) => {
        const completedJobs = res.data.filter(
          (job: Job) => job.status === true
        );
        setJobList(completedJobs);
        setFiltering(true);
      })
      .catch((err) => console.log(err));
  };

  const onGoing = () => {
    axios
      .get("http://localhost:8080/jobs")
      .then((res) => {
        const ongoingJobs = res.data.filter((job: Job) => !job.status);
        setJobList(ongoingJobs);
        setFiltering(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (
      !filtering &&
      jobList.length > 0 &&
      jobList.every((job) => job.status)
    ) {
      setShowComplete(true);
      alert("Đã hoàn thành hết công việc");
    } else {
      setShowComplete(false);
    }
  }, [jobList]);

  useEffect(() => {
    firstLoad();
  }, []);

  return (
    <div className="flex justify-center items-center">
      {loading ? <Loading></Loading> : ""}
      <div className="w-[40%] h-[100vh] border-4 border-sky-500">
        <div className="text-center my-8 text-[24px] font-bold">
          <h1>Quản lí công việc</h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-[80%] bg-violet-600 justify-center rounded-lg items-center h-[150px]">
            <input
              onChange={handleChage}
              className="w-[90%] border-2 border-green-600 rounded-md mt-[20px] h-[30%] pl-[20px]"
              type="text"
              placeholder="Nhập tên công việc"
            />
            {showError && (
              <p className="text-white">Tên công việc ko đc để trống</p>
            )}
            <button
              onClick={addJob}
              className=" border-2 w-[90%] mt-[20px] rounded-lg text-neutral-100"
            >
              Thêm công việc
            </button>
          </div>
        </div>
        <br />
        <div className="flex justify-center h-[100px]  items-center">
          <div className="flex justify-evenly rounded-lg w-[80%]  bg-yellow-400 h-[70%] items-center">
            <button
              onClick={all}
              className="border-2 w-[18%] rounded-lg h-[40px] bg-cyan-300 text-white"
            >
              Tất cả
            </button>
            <button
              onClick={complete}
              className="border-2 w-[18%] rounded-lg h-[40px]"
            >
              Hoàn thành
            </button>
            <button
              onClick={onGoing}
              className="border-2 w-[22%] rounded-lg h-[40px]"
            >
              Đang thực hiện
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <ul className="w-[80%] max-h-[350px] overflow-y-auto">
            {jobList.map((job) => (
              <JobList
                job={job}
                handleDelete={checkJobDelete}
                changeStatus={changeStatus}
                updateJob={updateId}
              ></JobList>
            ))}
          </ul>
        </div>
        <div className="flex justify-center ">
          <div className="w-[80%] flex justify-between ">
            <button className="border-2 bg-red-400 text-white rounded-lg h-[50px] w-[46%]">
              Xóa công việc đã hoàn thành
            </button>
            <button className="border-2 bg-red-400 text-white rounded-lg h-[50px] w-[45%]">
              Xóa tất cả các công việc
            </button>
          </div>
        </div>
      </div>
      {showModalDelete ? (
        <ConfirmDelete
          handleConfirm={handleDelete}
          handleClose={() => setShowModalDelete(false)}
        ></ConfirmDelete>
      ) : (
        ""
      )}
      {showUpdateJob ? (
        <Update
          updateFormConfirm={handleUpdate}
          updateFormClose={() => setShowUpdateJob(false)}
        ></Update>
      ) : (
        ""
      )}
    </div>
  );
}
