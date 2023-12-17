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
const Recommend = () => {
  const { userData } = useSelector((state) => state);
  const [listCourse, setListCourse] = useState();
  const [branch, setBranch] = useState();
  const [selected, setSelected] = useState({
    branch: "",
  });
  const [modalShow, setModalShow] = useState(false);

  const [allCoursesId, setAllCoursesId] = useState([]);

  const [studiedCoursesId, setStudiedCoursesId] = useState([]);
  const [studiedCourses, setStudiedCourses] = useState([]);

  const [notStudiedId, setNotStudiedId] = useState([]);

  const [numOfRecommend, setNumOfRecommend] = useState("3");
  const [listCourseRecommends, setlistCourseRecommends] = useState();

  const resetValueHandler = () => {
    setlistCourseRecommends();
  };

  const found = (CourseId) =>
    listCourse.find((obj) => {
      return obj.CourseId == CourseId;
    });

  const handlelistCourseNeedPredict = (listCourse) => {
    let needPredict = [];
    if (listCourse && studiedCourses) {
      const studiedCoursesID = studiedCourses.map((item) => item.CourseId);
      listCourse.forEach((course) => {
        if (!studiedCoursesID.includes(course.CourseId)) {
          needPredict.push(course.CourseId);
        }
      });
    }
    return needPredict;
  };

  // getBranchHandler
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

  // lọc môn với trường
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
          const data = response.data.subject;

          const extractedCourses = data.map((course) => course.CourseId);
          setAllCoursesId(extractedCourses);
          const arr = handlelistCourseNeedPredict(data);
          setNotStudiedId(arr);
          setListCourse(data);
          handleRecommend(arr);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };
  // get recommend from model
  const handleRecommend = (listCourseIdNeedPredict) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        // "https://demo-flask123-3234b5d194ca.herokuapp.com/recommend",
        `${baseFlaskApiURL()}/recommend`,
        {
          user_id: userData.enrollmentNo,
          listCourseId: listCourseIdNeedPredict,
          numOfRecommend: numOfRecommend,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        const recommendations = response.data.recommendations;
        if (response && recommendations) {
          setModalShow(true);
          setlistCourseRecommends(recommendations);
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

  // lấy điểm đã học
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        // `http://localhost:8000/api/scores/getScores`,
        `${baseApiURL()}/scores/getScores`,
        { enrollmentNo: userData.enrollmentNo },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data) {
          const data = response.data.score;
          const extractedStudiedCourses = data.map((course) => course.CourseId);
          setStudiedCoursesId(extractedStudiedCourses);
          setStudiedCourses(response.data.score);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="w-full flex justify-center">
          {listCourseRecommends && (
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
        {!listCourseRecommends && (
          <>
            <div className="mt-10 w-full flex justify-evenly items-center gap-x-6">
              <div className="items-center justify-evenly w-full">
                <label htmlFor="branch" className="leading-7 text-base ">
                  Chọn Trường
                </label>
                <select
                  id="branch"
                  className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                  value={selected.branch || ""}
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

              <div className="w-[40%]">
                <label htmlFor="semester" className="leading-7 text-sm ">
                  Số Môn Đề xuất
                </label>
                <select
                  id="semester"
                  className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                  value={numOfRecommend}
                  onChange={(e) => setNumOfRecommend(e.target.value)}
                >
                  <option defaultValue>-- Select --</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              {/* đề xuất */}
              <div className="w-full">
                <button
                  className="bg-blue-50 px-4 py-2 mt-8 mx-auto rounded border-2 border-blue-500 text-black"
                  onClick={loadCourseHandle}
                >
                  Đề Xuất
                </button>
              </div>
              <div className="w-full"></div>
            </div>
          </>
        )}
        {listCourseRecommends && listCourseRecommends.length !== 0 && (
          <>
            <Table striped bordered hover className="w-[90%]">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>
                    <div className="sort-header">
                      <span>Mã Môn học</span>
                    </div>
                  </th>
                  <th>Tên môn học</th>
                  <th>Điểm</th>
                </tr>
              </thead>
              <tbody>
                {listCourseRecommends &&
                  listCourseRecommends.length > 0 &&
                  listCourseRecommends.map((item, index) => {
                    const course = found(item[1]);
                    return (
                      <tr key={`user-${index}`}>
                        <td>{index + 1}</td>
                        <td>{item[1]}</td>
                        {course && course.Name && <td>{course.Name}</td>}
                        <td>{item[3]}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </>
  );
};

export default Recommend;
