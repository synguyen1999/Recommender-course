import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Heading from "../../../components/Heading";
import { baseApiURL } from "../../../baseUrl";
import Table from "react-bootstrap/Table";
const Scores = () => {
  const { userData } = useSelector((state) => state);

  const [listCourse, setListCourse] = useState([]);

  const calculateAverage = (listCourse) => {
    const totalScores = listCourse.reduce(
      (total, item) => total + item.Score,
      0
    );
    const average = totalScores / listCourse.length || 0; // Handle division by zero
    return average.toFixed(2); // Round to 2 decimal places
  };
  const average = calculateAverage(listCourse);
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
        console.log(response);
        if (response.data) {
          setListCourse(response.data.score);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  }, []);

  return (
    // <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
    //   <Heading title={`Scores`} />
    //   <div className="mt-14 w-full flex gap-20">
    //     <div className="customize-table" style={{}}>
    <>
      <div className="px-2 pb-4">
        <div>
          <h5>Số môn đã học: {listCourse.length}</h5>
        </div>
        <div>
          <h5>Điểm trung bình: {average}</h5>
        </div>
      </div>
      <div>
        <b>Bảng điểm</b>
      </div>
      <Table striped bordered hover>
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

            {/* <th>Sửa/Xóa</th> */}
          </tr>
        </thead>
        <tbody>
          {listCourse &&
            listCourse.map((item, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{index + 1}</td>
                  <td>{item.CourseId}</td>
                  <td>{item.Name}</td>

                  <td>{item.Score}</td>

                  {/* <td>
                        <button
                          className="btn btn-warning mx-3"
                          onClick={() => {
                            handleEditScore(item);
                          }}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDeleteScore(item);
                          }}
                        >
                          Xóa
                        </button>
                      </td> */}
                </tr>
              );
            })}
        </tbody>
      </Table>

      {/* </div>
      </div>
    </div> */}
    </>
  );
};

export default Scores;
