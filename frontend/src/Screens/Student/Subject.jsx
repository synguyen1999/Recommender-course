import React, { useState } from "react";
import Heading from "../../components/Heading";
import Scores from "./Score/Scores";
import Course from "./Score/Courses";
import Recommend from "./Score/recommend";

// import AddStudent from "./Student/AddStudent";
// import EditStudent from "./Student/EditStudent";
const Subject = () => {
  const [selected, setSelected] = useState("Courses");
  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10 xxx">
      <div className="flex justify-between items-center w-full">
        <Heading title="Môn Học" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "Courses" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("Courses")}
          >
            Môn Học
          </button>
          <button
            className={`${
              selected === "Score" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("Score")}
          >
            Điểm
          </button>

          <button
            className={`${
              selected === "Recommend" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => setSelected("Recommend")}
          >
            Đề Xuất
          </button>
        </div>
      </div>
      {selected === "Score" && <Scores />}
      {selected === "Courses" && <Course />}
      {selected === "Recommend" && <Recommend />}
    </div>
  );
};

export default Subject;
