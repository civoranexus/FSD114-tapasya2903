# EduVillage – Online Learning Platform

**EduVillage** is an online learning platform developed as part of the **CivoraX Winter Tech Internship 2026** by **Civora Nexus Pvt. Ltd.**  
The project aims to provide a structured digital environment where students can access learning content, teachers can manage courses, and administrators can oversee platform activities.

---

## 📌 Project Overview

EduVillage is designed to simulate a real-world e-learning system similar to platforms like Udemy or Coursera.  
It focuses on role-based access control, course and content management, and a user-friendly learning experience.

---

## 🚧 Current Development Phase

**Phase 1 – Architecture & Database Design**

- Defining user roles and responsibilities  
- Designing the initial database schema  
- Structuring frontend and backend modules  
- Preparing the project for core feature implementation  

---

## 👥 User Roles & Responsibilities

### Student
- Register and login to the platform  
- Enroll in available courses  
- Access learning content (videos, text, quizzes)  
- Track course progress and completion  

### Teacher
- Login to teacher dashboard  
- Create and manage courses and lessons  
- Add quizzes and assignments  
- View student progress and performance  

### Admin
- Manage all users (students and teachers)  
- Manage courses and platform content  
- Monitor platform activity and reports  

---

## 🗄️ Initial Database Schema Design

### Users
- id  
- name  
- email  
- password  
- role (student / teacher / admin)  

### Courses
- id  
- title  
- description  
- category  
- created_by (teacher id)  

### Lessons
- id  
- course_id  
- title  
- content_type (video / text / pdf)  
- content_url  

### Enrollments
- id  
- user_id  
- course_id  
- progress_percentage  

### Quizzes
- id  
- course_id  
- question  
- options  
- correct_answer  

---

## ✨ Features

- Secure user authentication (Student / Teacher / Admin)  
- Role-based access control  
- Course listing and course details  
- Student learning dashboard  
- Course progress tracking  
- Responsive user interface  
- Clean and structured project architecture  

---

## 🛠️ Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript  

### Backend (Planned / In Progress)
- Node.js  
- Express.js  

### Database (Planned)
- MongoDB  

### Version Control
- Git  
- GitHub  

---

## 📂 Project Structure

EduVillage/
│── frontend/
│── backend/
│── README.md


---

## 📄 Documentation

This README serves as the primary documentation and includes:
- Project overview and objectives  
- User roles and workflows  
- Feature list  
- Conceptual database schema  
- Development phase tracking  

Detailed API documentation will be added in later phases.

---

## 📅 Internship Information

- **Internship Program:** CivoraX Winter Tech Internship 2026  
- **Organization:** Civora Nexus Pvt. Ltd.  
- **Project ID:** FSD114  
- **Project Domain:** Full Stack Development  

---

## 📌 Note

This project is developed strictly according to the guidelines and requirements provided by **Civora Nexus Pvt. Ltd.**  
All branding, assets, and design standards are followed as per official instructions.

---

## 🙌 Acknowledgment

I would like to thank **Civora Nexus Pvt. Ltd.** for providing this opportunity to work on a real-world full stack development project and gain hands-on industry experience.

