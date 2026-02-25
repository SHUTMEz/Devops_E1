# คู่มือผู้ใช้และผู้ดูแลระบบ (ย่อ)

## ผู้ใช้ทั่วไป (Evaluatee)
1. สมัครสมาชิกที่ `/api/auth/register`
2. ล็อกอินที่ `/api/auth/login`
3. ตรวจผลประเมินตนเองผ่าน endpoint ที่ระบบกำหนด

## ผู้ประเมิน (Evaluator)
1. ล็อกอินด้วยบัญชี evaluator
2. เข้าดูรายการผลใน assignment ของตน
3. ส่งผลผ่าน `PATCH /api/task2/results/:id/submit`

## ผู้ดูแลระบบ (Admin)
1. จัดการผู้ใช้/รอบประเมิน/assignment
2. สร้าง assignment ผ่าน `POST /api/task4/assignments`
3. ดูรายงาน normalized ผ่าน `GET /api/task3/reports/normalized`
4. ดูความคืบหน้าแยกแผนกผ่าน `GET /api/task5/reports/progress`

## ข้อจำกัด
- การ submit ผลแบบ yes/no = yes ต้องแนบหลักฐานก่อน
- การสร้าง assignment ซ้ำในรอบเดียวกันไม่อนุญาต

## Checklist ความครบถ้วน
- [x] สมัครสมาชิกและล็อกอิน
- [x] ควบคุมสิทธิ์ตามบทบาท
- [x] บังคับหลักฐานสำหรับตัวชี้วัดแบบ yes/no
- [x] กันข้อมูล assignment ซ้ำ
- [x] มี health endpoint และเอกสาร OpenAPI
