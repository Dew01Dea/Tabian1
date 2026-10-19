const express = require('express');
const app = express();

app.use(express.json());

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

let repairs = [
  { id: 1, name: 'นายธราเทพ สีทอง', major: 'IT', level: 'ปวส.1' },
  { id: 2, name: 'นางสาวสุภาพร ทองคำ', major: 'IT', level: 'ปวส.1' },
];
let nextId = 3;

// R: ดู level ทั้งหมด (รองรับ ?status=pending)
app.get('/students', (req, res) => {
  const { level } = req.query;
  if (level) {
    return res.json(repairs.filter((s) => s.level === level));
  }
  res.json(repairs);
});

// R: ดู 1 รายการ
app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const students = repairs.find((s) => s.id === id);
  if (!students) {
    return res.status(404).json({ message: 'ไม่พบข้อมูลนักศึกษาตนนี้' });
  }
  res.json(students);
});

// C: เพิ่ม
app.post('/students', (req, res) => {
  const { name, major ,level } = req.body;
  if (!name || !major || !level) {
    return res.status(400).json({ message: 'ต้องส่ง name, major และ level' });
  }
  const student = { id: nextId++, name, major, level };
  repairs.push(student);
  res.status(201).json(student);
});

// U: แก้ไข
app.put('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const students = repairs.find((s) => s.id === id);
  if (!students) {
    return res.status(404).json({ message: 'ไม่พบข้อมูลนักศึกษาตนนี้' });
  }
  const allowed = ['ปวส.1', 'ปวส.2', 'done'];
  if (req.body.level && !allowed.includes(req.body.level)) {
    return res.status(400).json({ message: 'ระดับชั้นต้องเป็น ปวส.1, ปวส.2 เท่านั้น' });
  }
  students.name = req.body.name ?? students.name;
  students.major = req.body.major ?? students.major;
  students.level = req.body.level ?? students.level;
  res.json(students);
});

// D: ลบ
app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = repairs.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'ไม่พบรายการแจ้งซ่อม' });
  }
  repairs.splice(index, 1);
  res.status(204).send();
});
 
app.get('/members/:id', (req, res) => {
    const id = Number(req.params.id);                  // /members/2 ได้ id = 2
    const member = members.find((m) => m.id === id);   // หาสมาชิกที่ id ตรงกัน
    if (!member) {                                     // ถ้าหาไม่พบ
        return res.status(404).json({ message: 'ไม่พบ ID สมาชิกที่ระบุ' });
    }
    res.json(member);
});

// ไม่ตรงกับ route ใดเลย
app.use((req, res) => {
  res.status(404).json({ message: `ไม่มี ${req.method} ${req.path} ในระบบ` });
});