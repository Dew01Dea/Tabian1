const express = require('express');
const app = express();

app.get('/hello',(req, res) => {
    res.json({message: 'สวัสดี Back-End!'});
});

app.listen(3000,() => {
    console.log('Server is running on http://localhost:3000')
});

const members = [
    { id: 1, name: 'ดุรงค์กร สุวรรณประเสริฐ', role: 'DevA' },
    { id: 2, name: 'ธราเทพ สีทอง', role: 'DevB' },
];

const project = {
    team: 'Tabian',
    topic: 'ระบบคิวรับบริการงานทะเบียน',
    problem: 'นักศึกษาต้องรอคิวรับบริการงานทะเบียน และไม่ทราบลำดับคิวของตนเอง',
    users: ['นักศึกษา', 'เจ้าหน้าที่ทะเบียน', 'ผู้ดูแลระบบ'],
    members: members,
};

const ideas = {
    name: 'ระบบทะเบียนของฉัน',
    problem: 'นักศึกษาไม่ทราบลำดับคิวและระยะเวลารอรับบริการ',
    solution: 'ระบบจองคิวและติดตามสถานะคิวออนไลน์',
    reporter: 'นักศึกษา',
    location: 'งานทะเบียน',
    status: 'กำลังพัฒนา'
};

app.get('/project', (req, res) => {
    res.json(project);
});

app.get('/ideas', (req, res) => {
    res.json(ideas);
});

app.get('/members/:id', (req, res) => {
    const id = Number(req.params.id);                  // /members/2 ได้ id = 2
    const member = members.find((m) => m.id === id);   // หาสมาชิกที่ id ตรงกัน
    if (!member) {                                     // ถ้าหาไม่พบ
        return res.status(404).json({ message: 'ไม่พบ ID สมาชิกที่ระบุ' });
    }
    res.json(member);
});