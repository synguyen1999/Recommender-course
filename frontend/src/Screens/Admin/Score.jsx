import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { baseApiURL } from "../../baseUrl";

const Score = () => {
  const [studentData, setStudentData] = useState();
  const [selected, setSelected] = useState({
    StudedntId: "",
    CourseId: "",
    Score: "",
  });

  const addScoreHandle = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/scores/addScores`, selected, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-[85%] mx-auto flex justify-center items-start flex-col my-10">
      <div className="relative flex justify-between items-center w-full">
        <Heading title={`Upload Marks`} />
      </div>
      {!studentData && (
        <>
          <div className="mt-10 w-full flex justify-evenly items-center gap-x-6">
            <div className="w-full">
              <label htmlFor="StudedntId" className="leading-7 text-base ">
                Nhập mã sinh viên
              </label>
              <input
                type="number"
                id="StudedntId"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.StudedntId}
                onChange={(e) =>
                  setSelected({ ...selected, StudedntId: e.target.value })
                }
              ></input>
            </div>
            <div className="w-full">
              <label htmlFor="CourseId" className="leading-7 text-base ">
                Nhập mã môn học
              </label>
              <input
                type="number"
                id="CourseId"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.CourseId}
                onChange={(e) =>
                  setSelected({ ...selected, CourseId: e.target.value })
                }
              ></input>
            </div>
            <div className="w-full">
              <label htmlFor="Score" className="leading-7 text-base ">
                Nhập Điểm
              </label>
              <input
                type="number"
                id="Score"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.Score}
                onChange={(e) =>
                  setSelected({ ...selected, Score: e.target.value })
                }
              ></input>
            </div>
            <div className="w-full">
              <button
                className="bg-blue-50 px-4 py-2 mt-8 mx-auto rounded border-2 border-blue-500 text-black"
                onClick={addScoreHandle}
              >
                Thêm Điểm
              </button>
            </div>
            <div className="w-full"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Score;
