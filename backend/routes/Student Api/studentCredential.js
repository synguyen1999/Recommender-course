const express = require("express");
const router = express.Router();
const studentCredential = require("../../models/Students/StudentCredentials");

router.post("/login", async (req, res) => {
  let { loginid, password } = req.body;
  try {
    let user = await studentCredential.findOne({ loginid });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Sai tài khoản" });
    }
    if (password !== user.password) {
      return res
        .status(400)
        .json({ success: false, message: "Sai mật khẩu" });
    }
    const data = {
      success: true,
      message: "Đăng nhập thành công!",
      loginid: user.loginid,
      id: user.id,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  let { loginid, password } = req.body;
  try {
    let user = await studentCredential.findOne(req.body);
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Id sinh viên đã tồn tại",
      });
    }
    user = await studentCredential.create({
      loginid,
      password,
    });
    const data = {
      success: true,
      message: "Thêm mới thành công!",
      loginid: user.loginid,
      id: user.id,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    let user = await studentCredential.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Sinh viên không tồn tại!",
      });
    }
    const data = {
      success: true,
      message: "Cập nhật thành công!",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let user = await studentCredential.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User Exists!",
      });
    }
    const data = {
      success: true,
      message: "Deleted Successfull!",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
