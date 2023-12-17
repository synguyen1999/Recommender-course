const connectToMongo = require("./Database/db");
const express = require("express");
const app = express();
connectToMongo();
const port = process.env.PORT || 5000;
var cors = require("cors");

app.use(cors());
app.use(express.json()); //to convert request data to json

// Credential Apis
app.use("/api/student/auth", require("./routes/Student Api/studentCredential"));
app.use("/api/admin/auth", require("./routes/Admin Api/adminCredential"));
// Details Apis
app.use("/api/student/details", require("./routes/Student Api/studentDetails"));
app.use("/api/admin/details", require("./routes/Admin Api/adminDetails"));
// Other Apis
app.use("/api/material", require("./routes/material"));
app.use("/api/notice", require("./routes/notice"));
app.use("/api/subject", require("./routes/subject"));

app.use("/api/scores", require("./routes/scores"));
app.use("/api/branch", require("./routes/branch"));

app.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});
