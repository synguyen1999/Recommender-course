import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Heading from "../../../components/Heading";
import { baseApiURL } from "../../../baseUrl";
import { baseFlaskApiURL } from "../../../baseUrl";
import Table from "react-bootstrap/Table";
import { BiArrowBack } from "react-icons/bi";
import ModalPredict from "../../../components/ModalPredict";
const Courses = () => {
  const { userData } = useSelector((state) => state);

  const [listCourse, setListCourse] = useState();
  const [branch, setBranch] = useState();

  const [subject, setSubject] = useState();
  const [nameCourse, setNameCourse] = useState();

  const [file, setFile] = useState();
  const [selected, setSelected] = useState({
    branch: "",
    // type: "",
  });
  const [dataCouresPredict, setDataCouresPredict] = useState();

  const [modalShow, setModalShow] = useState(false);

  const resetValueHandler = () => {
    setListCourse();
  };

  const getBranchHandler = () => {
    axios
      .get(`${baseApiURL()}/branch/getBranch`)
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const loadCourseHandle = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/subject/getSubjectWithCollege`,
        { College: selected.branch },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data) {
          console.log(response.data.subject);
          setListCourse(response.data.subject);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const handlePredict = (item) => {
    console.log(baseFlaskApiURL(), "API flask");
    console.log(baseApiURL(), "API nodejs");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        "https://demo-flask123-3234b5d194ca.herokuapp.com/predict",
        // `${baseFlaskApiURL()}/predict`,
        {
          id: userData.enrollmentNo,
          courseId: item.CourseId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          setDataCouresPredict(response.data);
          setNameCourse(item.Name);
          setModalShow(true);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    getBranchHandler();
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      {/* <div className="w-[85%] mx-auto flex justify-center items-start flex-col my-10"> */}
      <div className="w-full ">
        <div className="w-full flex justify-center items-center">
          {listCourse && (
            <button
              className="flex justify-center items-center mb-4 border-2 border-red-500 px-3 py-2 rounded text-red-500"
              onClick={resetValueHandler}
            >
              <span className="mr-2">
                <BiArrowBack className="text-red-500" />
              </span>
              Close
            </button>
          )}
        </div>
        {!listCourse && (
          <>
            <div className="mt-10 w-full flex justify-evenly items-center gap-x-6">
              <div className="w-full">
                <label htmlFor="branch" className="leading-7 text-base ">
                  Chọn Trường
                </label>
                <select
                  id="branch"
                  className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                  value={selected.branch}
                  onChange={(e) =>
                    setSelected({ ...selected, branch: e.target.value })
                  }
                >
                  <option defaultValue>-- Trường --</option>
                  {branch &&
                    branch.map((branch, index) => {
                      return (
                        <option
                          value={branch.name}
                          key={`${branch.name}-${index}`}
                        >
                          {branch.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="w-full">
                <button
                  className="bg-blue-50 px-4 py-2 mt-8 mx-auto rounded border-2 border-blue-500 text-black"
                  onClick={loadCourseHandle}
                >
                  Tìm kiếm môn học
                </button>
              </div>
              <div className="w-full"></div>
            </div>
          </>
        )}
        {listCourse && listCourse.length !== 0 && (
          <>
            <div className="table-container">
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>
                      <div className="sort-header">
                        <span>Mã môn học</span>
                      </div>
                    </th>
                    <th>Tên môn học</th>
                    <th>Trường</th>
                    <th>Giới thiệu</th>
                    {/* <th>Sửa/Xóa</th> */}
                  </tr>
                </thead>
                <tbody>
                  {listCourse.map((item, index) => {
                    return (
                      <tr key={`user-${index}`}>
                        <td>{index + 1}</td>
                        <td>{item.CourseId}</td>
                        <td>{item.Name}</td>
                        <td>{item.College}</td>
                        <td>{item.Introduction}</td>
                        <td>
                          <button
                            className="btn btn-warning mx-3"
                            onClick={() => {
                              handlePredict(item);
                            }}
                          >
                            Dự Đoán
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </div>
      {/* </div> */}
      {dataCouresPredict && (
        <ModalPredict
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={dataCouresPredict.predict}
          name={nameCourse}
        />
      )}
    </>
  );
};

export default Courses;
