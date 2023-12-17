import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendar, HiOutlineSearch } from "react-icons/hi";
import toast from "react-hot-toast";

import { baseApiURL } from "../../baseUrl";
const Material = () => {
  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [material, setMaterial] = useState([]);

  const getSubjectByID = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/subject/getSubjectById`,
        { CourseId: Number(code) },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          const nameSubject = response.data.subject[0].Name;
          const courseId = response.data.subject[0].CourseId;
          setName(nameSubject);
          getSubjectMaterial(courseId);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  };

  const getSubjectMaterial = (courseId) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/material/getMaterial`,
        { subject: courseId },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          setMaterial(response.data.material);
        } else {
          toast.error("Chưa có tài liệu cho môn học này!");
          setMaterial();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <Heading title="Tài liệu" />
      <div className="w-full flex justify-center items-center flex-col">
        <div className="flex justify-center items-center w-[40%]">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="w-[60%] mb-4">
              <label htmlFor="code" className="leading-7 text-sm">
                Nhập mã môn học
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="code"
                  value={code || ""}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <button
                  onClick={getSubjectByID}
                  className="bg-blue-500 text-white py-2 px-2 text-2xl mx-2 rounded-sm"
                >
                  <HiOutlineSearch />
                </button>
              </div>
            </div>
            <label className="text-lg">{name}</label>
          </div>
        </div>
        <div className="mt-8 w-full">
          {material &&
            material.reverse().map((item, index) => {
              return (
                <div
                  key={index}
                  className="border-blue-500 border-2 w-full rounded-md shadow-sm py-4 px-6 relative mb-4"
                >
                  <p
                    className={`text-xl font-medium flex justify-start items-center ${
                      item.link && "cursor-pointer"
                    } group`}
                    onClick={() => item.link && window.open(item.link)}
                  >
                    {item.title}{" "}
                    {item.link && (
                      <span className="text-2xl group-hover:text-blue-500 ml-1">
                        <IoMdLink />
                      </span>
                    )}
                  </p>
                  {/* <p className="text-base font-normal mt-1">
                    {item.subject} - {item.faculty}
                  </p> */}
                  <p className="text-sm absolute top-4 right-4 flex justify-center items-center">
                    <span className="text-base mr-1">
                      <HiOutlineCalendar />
                    </span>{" "}
                    {item.createdAt.split("T")[0].split("-")[2] +
                      "/" +
                      item.createdAt.split("T")[0].split("-")[1] +
                      "/" +
                      item.createdAt.split("T")[0].split("-")[0] +
                      " " +
                      item.createdAt.split("T")[1].split(".")[0]}
                  </p>
                </div>
              );
            })}
          {material && material.length === 0 && (
            <p className="text-center">Chưa có tài liệu cho môn học!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Material;
