const express = require("express");
const router = express.Router();
const Scores = require("../models/Other/Scores");
const Subject = require("../models/Other/Subject");
const StudentDetails = require("../models/Students/StudentDetails");



router.post("/getScores", async (req, res) => {
  try {
    // in this case: req.body = enrollmentNo, branch
    const studedntId = req.body.enrollmentNo

    let score = await Scores.aggregate([
      {
        $match: {
          StudedntId: studedntId
        }
      },
      // {
      //   $lookup: {
      //     from: 'student details',
      //     localField: 'StudedntId',
      //     foreignField: 'enrollmentNo',
      //     as: 'student'
      //   }
      // },
      {
        $lookup: {
          from: 'subjects', // Collection name for items
          localField: 'CourseId',
          foreignField: 'CourseId',
          as: 'subject'
        }
      },
      // {
      //   $unwind: '$student'
      // },
      {
        $unwind: '$subject'
      },
      {
        $project: {
          _id: 0,
          StudedntId: 1,
          CourseId: 1,
          Score: 1,
          Name: '$subject.Name',
          College: '$subject.College',
          Type: '$subject.Type',
          // Student: '$student.name'
        }
      }
    ]).exec();

    // let Score = await Scores.find(req.body).sort({ _id: -1 });
    if (!score) {
      return res
        .status(400)
        .json({ success: false, message: "Scores Not Available" });
    }
    const data = {
      success: true,
      message: "Scores Loaded!",
      score,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/getAllScores", async (req, res) => {
  try {
    let score = await Scores.aggregate([
      // {
      //   $match: {
      //     score: { $gte: parseInt(minScore) } 
      //   }
      // },
      {
        $lookup: {
          from: 'student details',
          localField: 'StudedntId',
          foreignField: 'enrollmentNo',
          as: 'student'
        }
      },
      {
        $lookup: {
          from: 'subjects', // Collection name for items
          localField: 'code_subject',
          foreignField: 'code',
          as: 'subject'
        }
      },
      {
        $unwind: '$student'
      },
      {
        $unwind: '$subject'
      },
      {
        $project: {
          _id: 0,
          enrollmentNo: 1,
          code_subject: 1,
          score: 1,
          name_subject: '$subject.name',
          branch_student: '$student.branch'
        }
      }
    ]).exec();

    if (!score) {
      return res
        .status(400)
        .json({ success: false, message: "Scores Not Available" });
    }
    const data = {
      success: true,
      message: "All Scores Loaded!",
      score,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


router.post("/addScores", async (req, res) => {
  const { StudedntId, CourseId, Score } = req.body;
  console.log(req.body)
  try {
    await Scores.create(req.body);
    const data = {
      success: true,
      message: "Scores Added!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.put("/updateScores/:id", async (req, res) => {
  const id = req.params.id;
  const { score } = req.body;
  try {
    let updateScores = await Scores.findByIdAndUpdate(req.params.id, { score });
    if (!updateScores) {
      return res
        .status(400)
        .json({ success: false, message: "No Score Available!" });
    }
    res.json({
      success: true,
      message: "Score Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


router.delete("/deleteScores/:id", async (req, res) => {
  try {
    let Score = await Scores.findByIdAndDelete(req.params.id);
    if (!Score) {
      return res
        .status(400)
        .json({ success: false, message: "No Scores Data Exists!" });
    }
    const data = {
      success: true,
      message: "Scores Deleted!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// s-------------------------------------------------
// router.get("/getDelete", async (req, res) => {
//   try {
//     await Monhoc.updateMany({}, { $unset: { Grade: 1 } })
//     return res
//       .status(400)
//       .json({ success: false, message: "delete success!" });

//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });

module.exports = router;
