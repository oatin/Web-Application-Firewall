const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// ตั้งค่า view engine เป็น EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // ระบุที่อยู่ของไฟล์ EJS

// ใช้ body-parser
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// เรียกใช้ Route
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
