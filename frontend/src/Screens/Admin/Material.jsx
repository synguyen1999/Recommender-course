/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "../../firebase/config";
import { useSelector } from "react-redux";
import { baseApiURL } from "../../baseUrl";
const Material = () => {
  const [subject, setSubject] = useState();
  const [file, setFile] = useState();
  const [selected, setSelected] = useState({
    title: "",
    subject: "",
    link: "",
  });

  useEffect(() => {
    const uploadFileToStorage = async (file) => {
      toast.loading("Upload Material To Storage");
      const storageRef = ref(
        storage,
        `Material/${selected.subject}/${selected.title}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error);
          toast.dismiss();
          toast.error("Something Went Wrong!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.dismiss();
            setFile();
            toast.success("Material Uploaded To Storage");
            setSelected({ ...selected, link: downloadURL });
          });
        }
      );
    };
    file && uploadFileToStorage(file);
  }, [file]);

  const addMaterialHandler = () => {
    toast.loading("Adding Material");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/material/addMaterial`, selected, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setSelected({
            title: "",
            subject: "",
            link: "",
          });
        } else {
          console.log(response);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Upload Material`} />
      </div>
      <div className="w-full flex justify-evenly items-center mt-12">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="w-[80%] mt-2">
            <label htmlFor="title">Tên tài liệu</label>
            <input
              type="text"
              id="title"
              className="bg-blue-50 py-2 px-4 w-full mt-1"
              value={selected.title}
              onChange={(e) =>
                setSelected({ ...selected, title: e.target.value })
              }
            />
          </div>
          <div className="w-[80%] mt-2">
            <label htmlFor="subject">Mã môn học</label>
            <input
              value={selected.subject}
              name="subject"
              id="subject"
              onChange={(e) =>
                setSelected({ ...selected, subject: e.target.value })
              }
              className="bg-blue-50 py-2 px-4 w-full mt-1"
            ></input>
          </div>
          {!selected.link && (
            <label
              htmlFor="upload"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] mt-4 flex justify-center items-center cursor-pointer"
            >
              Tải tài liệu
              <span className="ml-2">
                <FiUpload />
              </span>
            </label>
          )}
          {selected.link && (
            <p
              className="px-2 border-2 border-blue-500 py-2 rounded text-base w-[80%] mt-4 flex justify-center items-center cursor-pointer"
              onClick={() => setSelected({ ...selected, link: "" })}
            >
              Bỏ chọn
              <span className="ml-2">
                <AiOutlineClose />
              </span>
            </p>
          )}
          <input
            type="file"
            name="upload"
            id="upload"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="bg-blue-500 text-white mt-8 px-4 py-2 rounded-sm"
            onClick={addMaterialHandler}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Material;
