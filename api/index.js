const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  res.json({ message: "สวัสดี Back-End!" });
});

// ข้อมูลนักศึกษา
let students = [
  {
    id: 1,
    name: "สมชาย ใจดี",
    major: "IT",
    level: "ปวส.1",
  },
  {
    id: 2,
    name: "สุนทร ใจดี",
    major: "IT",
    level: "ปวส.2",
  },
];
let nextId = 3;

// R: ดูทั้งหมด
app.get("/students", (req, res) => {
  const { level } = req.query;
  if (level) {
    return res.json(students.filter((s) => s.level === level));
  }
  res.json(students);
});

// R: ดู 1 รายการ
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "ไม่พบนักศึกษาที่ระบุ" });
  }
  res.json(student);
});

app.use(express.json());

// C: เพิ่ม
app.post("/students", (req, res) => {
  const { name, major, level } = req.body;
  if (!name || !major || !level) {
    return res.status(400).json({ message: "ต้องส่ง name, major และ level" });
  }
  const student = { id: nextId++, name, major, level };
  students.push(student);
  res.status(201).json(student);
});

// U: แก้ไข
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "ไม่พบนักศึกษาที่ระบุ" });
  }
  const allowed = ["pending", "doing", "done"];
  if (req.body.status && !allowed.includes(req.body.status)) {
    return res
      .status(400)
      .json({ message: "status ต้องเป็น pending, doing หรือ done" });
  }
  student.name = req.body.name ?? student.name;
  student.major = req.body.major ?? student.major;
  student.level = req.body.level ?? student.level;
  res.json(student);
});

// D: ลบ
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "ไม่พบนักศึกษาที่ระบุ" });
  }
  students.splice(index, 1);
  res.status(204).send();
});
 
// ไม่ตรงกับ route ใดเลย
app.use((req, res) => {
  res.status(404).json({ message: `ไม่มี ${req.method} ${req.path} ในระบบ` });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

const members = [
  { id: 1, name: "ดุรงค์กร สุวรรณประเสริฐ", role: "DevA" },
  { id: 2, name: "ธราเทพ สีทอง", role: "DevB" },
];

const project = {
  team: "Tabian",
  topic: "ระบบคิวรับบริการงานทะเบียน",
  problem: "นักศึกษาต้องรอคิวรับบริการงานทะเบียน และไม่ทราบลำดับคิวของตนเอง",
  users: ["นักศึกษา", "เจ้าหน้าที่ทะเบียน", "ผู้ดูแลระบบ"],
  members: members,
};

const ideas = {
  name: "ระบบทะเบียนของฉัน",
  problem: "นักศึกษาไม่ทราบลำดับคิวและระยะเวลารอรับบริการ",
  solution: "ระบบจองคิวและติดตามสถานะคิวออนไลน์",
  reporter: "นักศึกษา",
  location: "งานทะเบียน",
  status: "กำลังพัฒนา",
};

app.get("/project", (req, res) => {
  res.json(project);
});

app.get("/ideas", (req, res) => {
  res.json(ideas);
});

app.get("/members/:id", (req, res) => {
  const id = Number(req.params.id); // /members/2 ได้ id = 2
  const member = members.find((m) => m.id === id); // หาสมาชิกที่ id ตรงกัน
  if (!member) {
    // ถ้าหาไม่พบ
    return res.status(404).json({ message: "ไม่พบ ID สมาชิกที่ระบุ" });
  }
  res.json(member);
});
