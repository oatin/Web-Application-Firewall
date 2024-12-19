const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// โหลดข้อมูลจาก database.json
const dbPath = path.join(__dirname, '../database.json');
let db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// แสดงฟอร์มให้ User เพิ่มลิงก์
router.get('/', (req, res) => {
    res.render('index');  // ใช้ EJS ในการ render หน้า index.ejs
});

// เพิ่ม URL ของ User
router.post('/add', (req, res) => {
    const userURL = req.body.url;
    const userId = `user_${Date.now()}`;

    // บันทึกข้อมูลใน Database
    db[userId] = { url: userURL };
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    // ใช้ res.render เพื่อ render หน้า EJS
    res.render('adduser', { userURL, userId });
});

// Route สำหรับตรวจสอบก่อน Redirect
router.get('/verify/:userId', (req, res) => {
    const userId = req.params.userId;

    if (db[userId]) {
        res.render("verification.ejs");
    } else {
        res.status(404).send('User not found.');
    }
});

// Redirect หลังการตรวจสอบ
router.get('/redirect/:userId', (req, res) => {
    const userId = req.params.userId;

    if (db[userId]) {
        res.redirect(db[userId].url);
    } else {
        res.status(404).send('User not found.');
    }
});

module.exports = router;
