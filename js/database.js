// Database Module - Dữ liệu thực tế đầy đủ
const Database = {
    // Danh sách sinh viên theo lớp
    students: [],
    teachers: [],
    classes: [],
    schedules: [],
    finances: [],
    research: [],
    notifications: [],

    // Initialize database
    init() {
        this.initClasses();
        this.initStudents();
        this.initTeachers();
        this.initSchedules();
        this.initFinances();
        this.initResearch();
        this.initNotifications();
    },

    // Khởi tạo danh sách lớp
    initClasses() {
        this.classes = [
            { id: 'L001', name: '10A1', grade: 10, totalStudents: 0, homeroom: 'GV001' },
            { id: 'L002', name: '10A2', grade: 10, totalStudents: 0, homeroom: 'GV002' },
            { id: 'L003', name: '10A3', grade: 10, totalStudents: 0, homeroom: 'GV003' },
            { id: 'L004', name: '11A1', grade: 11, totalStudents: 0, homeroom: 'GV004' },
            { id: 'L005', name: '11A2', grade: 11, totalStudents: 0, homeroom: 'GV005' },
            { id: 'L006', name: '12A1', grade: 12, totalStudents: 0, homeroom: 'GV006' }
        ];
    },

    // Khởi tạo danh sách sinh viên
    initStudents() {
        const firstNames = ['An', 'Bình', 'Châu', 'Dũng', 'Hà', 'Hương', 'Khoa', 'Linh', 'Minh', 'Nam', 'Phương', 'Quân', 'Thảo', 'Tú', 'Vy'];
        const lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Phan', 'Vũ', 'Đặng', 'Bùi', 'Đỗ'];
        const middleNames = ['Văn', 'Thị', 'Minh', 'Hoàng', 'Thanh', 'Thu', 'Hữu', 'Đức'];
        
        let studentId = 1;
        
        this.classes.forEach(classInfo => {
            const studentsPerClass = 15; // 15 sinh viên mỗi lớp
            
            for (let i = 0; i < studentsPerClass; i++) {
                const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
                const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
                const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
                const fullName = `${lastName} ${middleName} ${firstName}`;
                
                const gpa = (Math.random() * 2 + 2).toFixed(2); // GPA từ 2.0 - 4.0
                const attendance = Math.floor(Math.random() * 30 + 70); // 70-100%
                
                let status = 'active';
                if (gpa < 2.5 || attendance < 75) status = 'at-risk';
                if (gpa >= 3.5 && attendance >= 90) status = 'excellent';
                
                this.students.push({
                    id: `SV${String(studentId).padStart(3, '0')}`,
                    name: fullName,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&color=fff`,
                    class: classInfo.name,
                    classId: classInfo.id,
                    email: `${this.removeAccents(fullName).toLowerCase().replace(/\s/g, '')}@student.edu.vn`,
                    phone: `09${Math.floor(Math.random() * 100000000)}`,
                    dateOfBirth: `200${6 + classInfo.grade - 10}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                    address: `${Math.floor(Math.random() * 500) + 1} Đường ${['Láng', 'Giải Phóng', 'Nguyễn Trãi', 'Cầu Giấy'][Math.floor(Math.random() * 4)]}, Hà Nội`,
                    parentName: `${lastName} ${middleNames[Math.floor(Math.random() * middleNames.length)]} ${['Anh', 'Bình', 'Cường', 'Dũng'][Math.floor(Math.random() * 4)]}`,
                    parentPhone: `098${Math.floor(Math.random() * 10000000)}`,
                    parentEmail: `phuhuyn${studentId}@gmail.com`,
                    enrollmentDate: `202${4 - (classInfo.grade - 10)}-09-01`,
                    gpa: parseFloat(gpa),
                    attendance: attendance,
                    credits: (classInfo.grade - 10) * 30 + Math.floor(Math.random() * 20),
                    status: status,
                    grades: this.generateGrades(),
                    attendanceHistory: this.generateAttendanceHistory(attendance),
                    behaviorNotes: this.generateBehaviorNotes(),
                    socialInteractions: {
                        friendsCount: Math.floor(Math.random() * 20) + 5,
                        groupParticipation: Math.floor(Math.random() * 5) + 1,
                        isolationScore: Math.random() * 0.5
                    },
                    financialStatus: {
                        tuitionPaid: Math.random() > 0.2,
                        hasDebt: Math.random() < 0.2,
                        scholarshipEligible: gpa >= 3.5,
                        totalPaid: 15000000,
                        totalDue: Math.random() < 0.2 ? 5000000 : 0
                    },
                    healthData: this.generateHealthData(),
                    activities: this.generateActivities(),
                    goals: this.generateGoals()
                });
                
                studentId++;
            }
            
            classInfo.totalStudents = studentsPerClass;
        });
    },

    generateGrades() {
        const subjects = ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa', 'Sinh', 'Sử', 'Địa', 'GDCD', 'Tin học', 'Thể dục'];
        const trends = ['up', 'down', 'stable'];
        
        return subjects.map(subject => ({
            subject: subject,
            score: (Math.random() * 4 + 6).toFixed(1),
            trend: trends[Math.floor(Math.random() * trends.length)],
            semester: 1,
            year: 2024
        }));
    },

    generateAttendanceHistory(attendanceRate) {
        const history = [];
        const statuses = ['present', 'absent', 'late'];
        const weights = attendanceRate >= 90 ? [0.9, 0.05, 0.05] : attendanceRate >= 75 ? [0.75, 0.15, 0.1] : [0.65, 0.25, 0.1];
        
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const rand = Math.random();
            let status = 'present';
            if (rand < weights[2]) status = 'late';
            else if (rand < weights[1] + weights[2]) status = 'absent';
            
            history.push({
                date: date.toISOString().split('T')[0],
                status: status
            });
        }
        
        return history;
    },

    generateBehaviorNotes() {
        const positiveNotes = [
            'Tham gia tích cực vào bài thảo luận',
            'Giúp đỡ bạn học yếu',
            'Hoàn thành bài tập đúng hạn',
            'Tham gia hoạt động ngoại khóa',
            'Có tinh thần trách nhiệm cao'
        ];
        
        const negativeNotes = [
            'Nộp bài tập trễ',
            'Vắng học không phép',
            'Quên mang sách giáo khoa',
            'Gây mất trật tự trong lớp',
            'Không tập trung trong giờ học'
        ];
        
        const notes = [];
        const noteCount = Math.floor(Math.random() * 5) + 2;
        
        for (let i = 0; i < noteCount; i++) {
            const isPositive = Math.random() > 0.4;
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 60));
            
            notes.push({
                id: i + 1,
                date: date.toISOString().split('T')[0],
                note: isPositive ? positiveNotes[Math.floor(Math.random() * positiveNotes.length)] : negativeNotes[Math.floor(Math.random() * negativeNotes.length)],
                type: isPositive ? 'positive' : 'negative',
                teacher: `Giáo viên ${['Toán', 'Văn', 'Anh', 'Lý'][Math.floor(Math.random() * 4)]}`
            });
        }
        
        return notes;
    },

    generateHealthData() {
        return {
            physical: {
                score: Math.floor(Math.random() * 30) + 70,
                status: ['excellent', 'good', 'fair'][Math.floor(Math.random() * 3)],
                lastCheckup: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            },
            mental: {
                score: Math.floor(Math.random() * 30) + 60,
                status: ['excellent', 'good', 'fair'][Math.floor(Math.random() * 3)],
                concerns: Math.random() > 0.7 ? ['Stress học tập'] : []
            },
            sleep: {
                average: (Math.random() * 2 + 6).toFixed(1),
                recommended: 8,
                quality: ['excellent', 'good', 'fair'][Math.floor(Math.random() * 3)]
            },
            exercise: {
                frequency: Math.floor(Math.random() * 5),
                recommended: 4,
                activities: ['Bóng đá', 'Bơi lội', 'Chạy bộ'].slice(0, Math.floor(Math.random() * 3) + 1)
            }
        };
    },

    generateActivities() {
        const activities = [
            { name: 'CLB Robotics', role: 'Thành viên' },
            { name: 'Đội tuyển Olympic Tin học', role: 'Đội trưởng' },
            { name: 'CLB Tiếng Anh', role: 'Thành viên' },
            { name: 'Đội tuyển Toán', role: 'Thành viên' },
            { name: 'Tình nguyện Mùa hè Xanh', role: 'Tình nguyện viên' }
        ];
        
        const count = Math.floor(Math.random() * 3);
        return activities.slice(0, count).map((act, i) => ({
            id: i + 1,
            ...act,
            joined: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            hours: Math.floor(Math.random() * 50) + 10,
            achievements: Math.random() > 0.5 ? ['Giải ' + ['nhất', 'nhì', 'ba'][Math.floor(Math.random() * 3)] + ' cấp trường'] : []
        }));
    },

    generateGoals() {
        const goals = [
            { title: 'Nâng GPA lên 3.5', category: 'academic', priority: 'high' },
            { title: 'Tham gia đầy đủ các buổi học', category: 'attendance', priority: 'high' },
            { title: 'Hoàn thành dự án Khoa học', category: 'academic', priority: 'medium' }
        ];
        
        return goals.slice(0, Math.floor(Math.random() * 3) + 1).map((goal, i) => ({
            id: i + 1,
            ...goal,
            deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            progress: Math.floor(Math.random() * 100),
            status: Math.random() > 0.8 ? 'completed' : 'in-progress'
        }));
    },

    removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    },

    // Methods
    getStudent(id) {
        return this.students.find(s => s.id === id);
    },

    getAllStudents() {
        return this.students;
    },

    getStudentsByClass(className) {
        return this.students.filter(s => s.class === className);
    },

    getClassAverage(className) {
        const students = this.getStudentsByClass(className);
        if (students.length === 0) return { gpa: 0, attendance: 0, totalStudents: 0 };
        
        const avgGPA = students.reduce((sum, s) => sum + s.gpa, 0) / students.length;
        const avgAttendance = students.reduce((sum, s) => sum + s.attendance, 0) / students.length;
        
        return {
            gpa: avgGPA,
            attendance: avgAttendance,
            totalStudents: students.length
        };
    },

    updateStudent(id, data) {
        const index = this.students.findIndex(s => s.id === id);
        if (index !== -1) {
            this.students[index] = { ...this.students[index], ...data };
            this.saveToLocalStorage();
            return this.students[index];
        }
        return null;
    },

    addStudent(student) {
        const newId = `SV${String(this.students.length + 1).padStart(3, '0')}`;
        const newStudent = {
            id: newId,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random&color=fff`,
            grades: this.generateGrades(),
            attendanceHistory: [],
            behaviorNotes: [],
            socialInteractions: { friendsCount: 0, groupParticipation: 0, isolationScore: 0 },
            financialStatus: { tuitionPaid: false, hasDebt: false, scholarshipEligible: false, totalPaid: 0, totalDue: 15000000 },
            healthData: this.generateHealthData(),
            activities: [],
            goals: [],
            status: 'active',
            ...student
        };
        this.students.push(newStudent);
        this.saveToLocalStorage();
        return newStudent;
    },

    deleteStudent(id) {
        const index = this.students.findIndex(s => s.id === id);
        if (index !== -1) {
            this.students.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    },

    saveToLocalStorage() {
        try {
            localStorage.setItem('edumanager_students', JSON.stringify(this.students));
            localStorage.setItem('edumanager_teachers', JSON.stringify(this.teachers));
            localStorage.setItem('edumanager_schedules', JSON.stringify(this.schedules));
            localStorage.setItem('edumanager_finances', JSON.stringify(this.finances));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    },

    loadFromLocalStorage() {
        try {
            const students = localStorage.getItem('edumanager_students');
            const teachers = localStorage.getItem('edumanager_teachers');
            const schedules = localStorage.getItem('edumanager_schedules');
            const finances = localStorage.getItem('edumanager_finances');
            
            if (students) this.students = JSON.parse(students);
            if (teachers) this.teachers = JSON.parse(teachers);
            if (schedules) this.schedules = JSON.parse(schedules);
            if (finances) this.finances = JSON.parse(finances);
            
            return true;
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return false;
        }
    }
};

// Initialize database khi load trang
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        const loaded = Database.loadFromLocalStorage();
        if (!loaded || Database.students.length === 0) {
            Database.init();
            Database.saveToLocalStorage();
        }
    });
}

// Khởi tạo giáo viên
Database.initTeachers = function() {
    const teacherNames = [
        { name: 'Nguyễn Thị Lan', subject: 'Toán' },
        { name: 'Trần Văn Nam', subject: 'Văn' },
        { name: 'Lê Thị Hoa', subject: 'Anh' },
        { name: 'Phạm Minh Tuấn', subject: 'Lý' },
        { name: 'Hoàng Thu Hương', subject: 'Hóa' },
        { name: 'Vũ Đức Anh', subject: 'Sinh' },
        { name: 'Đặng Thị Mai', subject: 'Sử' },
        { name: 'Bùi Văn Hùng', subject: 'Địa' },
        { name: 'Đỗ Thị Linh', subject: 'GDCD' },
        { name: 'Phan Minh Khoa', subject: 'Tin học' },
        { name: 'Ngô Văn Thắng', subject: 'Thể dục' }
    ];

    this.teachers = teacherNames.map((t, i) => ({
        id: `GV${String(i + 1).padStart(3, '0')}`,
        name: t.name,
        subject: t.subject,
        email: `${this.removeAccents(t.name).toLowerCase().replace(/\s/g, '')}@teacher.edu.vn`,
        phone: `091${Math.floor(Math.random() * 10000000)}`,
        classes: this.classes.slice(0, Math.floor(Math.random() * 3) + 2).map(c => c.name),
        experience: Math.floor(Math.random() * 15) + 5,
        degree: ['Cử nhân', 'Thạc sĩ', 'Tiến sĩ'][Math.floor(Math.random() * 3)],
        performance: (Math.random() * 2 + 3).toFixed(1),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=random&color=fff`
    }));
};

// Khởi tạo thời khóa biểu
Database.initSchedules = function() {
    const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
    const periods = ['Tiết 1', 'Tiết 2', 'Tiết 3', 'Tiết 4', 'Tiết 5'];
    const subjects = ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa', 'Sinh', 'Sử', 'Địa', 'GDCD', 'Tin học', 'Thể dục'];
    
    this.schedules = [];
    
    this.classes.forEach(classInfo => {
        days.forEach((day, dayIndex) => {
            periods.forEach((period, periodIndex) => {
                const subject = subjects[Math.floor(Math.random() * subjects.length)];
                const teacher = this.teachers.find(t => t.subject === subject);
                
                this.schedules.push({
                    id: `SCH${this.schedules.length + 1}`,
                    classId: classInfo.id,
                    className: classInfo.name,
                    day: day,
                    dayIndex: dayIndex,
                    period: period,
                    periodIndex: periodIndex,
                    subject: subject,
                    teacherId: teacher ? teacher.id : 'GV001',
                    teacherName: teacher ? teacher.name : 'Chưa phân công',
                    room: `P${Math.floor(Math.random() * 20) + 101}`,
                    startTime: `${7 + periodIndex}:00`,
                    endTime: `${7 + periodIndex + 1}:00`
                });
            });
        });
    });
};

// Khởi tạo tài chính
Database.initFinances = function() {
    this.finances = [];
    const currentYear = 2024;
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    
    months.forEach(month => {
        const tuitionIncome = this.students.length * 1500000; // 1.5tr/sinh viên
        const otherIncome = Math.floor(Math.random() * 50000000) + 20000000;
        const totalIncome = tuitionIncome + otherIncome;
        
        const salaryExpense = this.teachers.length * 8000000; // 8tr/giáo viên
        const facilityExpense = Math.floor(Math.random() * 30000000) + 10000000;
        const otherExpense = Math.floor(Math.random() * 20000000) + 5000000;
        const totalExpense = salaryExpense + facilityExpense + otherExpense;
        
        this.finances.push({
            id: `FIN${month}${currentYear}`,
            month: month,
            year: currentYear,
            date: `${currentYear}-${month}-01`,
            income: {
                tuition: tuitionIncome,
                other: otherIncome,
                total: totalIncome
            },
            expense: {
                salary: salaryExpense,
                facility: facilityExpense,
                other: otherExpense,
                total: totalExpense
            },
            profit: totalIncome - totalExpense,
            description: `Báo cáo tài chính tháng ${month}/${currentYear}`
        });
    });
};

// Khởi tạo nghiên cứu khoa học
Database.initResearch = function() {
    const topics = [
        'Ứng dụng AI trong giáo dục',
        'Phương pháp dạy học tích cực',
        'Đánh giá năng lực học sinh',
        'Công nghệ trong lớp học',
        'Phát triển tư duy sáng tạo',
        'Giáo dục STEM',
        'Học tập trực tuyến',
        'Quản lý lớp học hiệu quả'
    ];
    
    this.research = topics.map((topic, i) => ({
        id: `RES${String(i + 1).padStart(3, '0')}`,
        title: topic,
        author: this.teachers[Math.floor(Math.random() * this.teachers.length)].name,
        authorId: this.teachers[Math.floor(Math.random() * this.teachers.length)].id,
        status: ['Đang thực hiện', 'Hoàn thành', 'Đã xuất bản'][Math.floor(Math.random() * 3)],
        startDate: `2024-${String(Math.floor(Math.random() * 6) + 1).padStart(2, '0')}-01`,
        progress: Math.floor(Math.random() * 100),
        journal: ['Tạp chí Giáo dục', 'Tạp chí Khoa học', 'Tạp chí Đại học'][Math.floor(Math.random() * 3)],
        abstract: `Nghiên cứu về ${topic.toLowerCase()} trong bối cảnh giáo dục hiện đại...`,
        keywords: ['giáo dục', 'công nghệ', 'đổi mới'],
        citations: Math.floor(Math.random() * 50)
    }));
};

// Khởi tạo thông báo
Database.initNotifications = function() {
    this.notifications = [
        {
            id: 'NOT001',
            title: 'Họp phụ huynh học kỳ I',
            content: 'Thông báo tổ chức họp phụ huynh vào ngày 15/12/2024',
            type: 'event',
            priority: 'high',
            date: '2024-12-01',
            read: false,
            target: 'all'
        },
        {
            id: 'NOT002',
            title: 'Lịch thi học kỳ I',
            content: 'Lịch thi học kỳ I năm học 2024-2025 đã được công bố',
            type: 'academic',
            priority: 'high',
            date: '2024-11-20',
            read: false,
            target: 'students'
        },
        {
            id: 'NOT003',
            title: 'Cập nhật hệ thống',
            content: 'Hệ thống sẽ bảo trì vào 2h sáng ngày 10/12/2024',
            type: 'system',
            priority: 'medium',
            date: '2024-12-05',
            read: true,
            target: 'all'
        }
    ];
};

// Methods cho Teachers
Database.getAllTeachers = function() {
    return this.teachers;
};

Database.getTeacher = function(id) {
    return this.teachers.find(t => t.id === id);
};

Database.addTeacher = function(teacher) {
    const newId = `GV${String(this.teachers.length + 1).padStart(3, '0')}`;
    const newTeacher = {
        id: newId,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=random&color=fff`,
        classes: [],
        experience: 0,
        degree: 'Cử nhân',
        performance: 0,
        ...teacher
    };
    this.teachers.push(newTeacher);
    this.saveToLocalStorage();
    return newTeacher;
};

Database.updateTeacher = function(id, data) {
    const index = this.teachers.findIndex(t => t.id === id);
    if (index !== -1) {
        this.teachers[index] = { ...this.teachers[index], ...data };
        this.saveToLocalStorage();
        return this.teachers[index];
    }
    return null;
};

Database.deleteTeacher = function(id) {
    const index = this.teachers.findIndex(t => t.id === id);
    if (index !== -1) {
        this.teachers.splice(index, 1);
        this.saveToLocalStorage();
        return true;
    }
    return false;
};

// Methods cho Schedules
Database.getSchedulesByClass = function(className) {
    return this.schedules.filter(s => s.className === className);
};

Database.addSchedule = function(schedule) {
    const newSchedule = {
        id: `SCH${this.schedules.length + 1}`,
        ...schedule
    };
    this.schedules.push(newSchedule);
    this.saveToLocalStorage();
    return newSchedule;
};

Database.updateSchedule = function(id, data) {
    const index = this.schedules.findIndex(s => s.id === id);
    if (index !== -1) {
        this.schedules[index] = { ...this.schedules[index], ...data };
        this.saveToLocalStorage();
        return this.schedules[index];
    }
    return null;
};

Database.deleteSchedule = function(id) {
    const index = this.schedules.findIndex(s => s.id === id);
    if (index !== -1) {
        this.schedules.splice(index, 1);
        this.saveToLocalStorage();
        return true;
    }
    return false;
};

// Methods cho Finances
Database.getAllFinances = function() {
    return this.finances;
};

Database.getFinancesByYear = function(year) {
    return this.finances.filter(f => f.year === year);
};

Database.addFinance = function(finance) {
    const newFinance = {
        id: `FIN${finance.month}${finance.year}`,
        ...finance
    };
    this.finances.push(newFinance);
    this.saveToLocalStorage();
    return newFinance;
};

// Methods cho Research
Database.getAllResearch = function() {
    return this.research;
};

Database.getResearch = function(id) {
    return this.research.find(r => r.id === id);
};

Database.addResearch = function(research) {
    const newId = `RES${String(this.research.length + 1).padStart(3, '0')}`;
    const newResearch = {
        id: newId,
        status: 'Đang thực hiện',
        progress: 0,
        citations: 0,
        ...research
    };
    this.research.push(newResearch);
    this.saveToLocalStorage();
    return newResearch;
};

Database.updateResearch = function(id, data) {
    const index = this.research.findIndex(r => r.id === id);
    if (index !== -1) {
        this.research[index] = { ...this.research[index], ...data };
        this.saveToLocalStorage();
        return this.research[index];
    }
    return null;
};

Database.deleteResearch = function(id) {
    const index = this.research.findIndex(r => r.id === id);
    if (index !== -1) {
        this.research.splice(index, 1);
        this.saveToLocalStorage();
        return true;
    }
    return false;
};

// Methods cho Notifications
Database.getAllNotifications = function() {
    return this.notifications;
};

Database.getUnreadNotifications = function() {
    return this.notifications.filter(n => !n.read);
};

Database.markNotificationAsRead = function(id) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
        notification.read = true;
        this.saveToLocalStorage();
        return true;
    }
    return false;
};

Database.addNotification = function(notification) {
    const newId = `NOT${String(this.notifications.length + 1).padStart(3, '0')}`;
    const newNotification = {
        id: newId,
        date: new Date().toISOString().split('T')[0],
        read: false,
        ...notification
    };
    this.notifications.push(newNotification);
    this.saveToLocalStorage();
    return newNotification;
};

// Methods cho Messages (Communication)
Database.getMessages = function(studentId) {
    // Mock messages for now - in real app, this would fetch from backend
    const student = this.getStudent(studentId);
    if (!student) return [];
    
    return [
        {
            id: 1,
            from: 'Giáo viên Toán',
            to: student.parentName || 'Phụ huynh',
            subject: 'Thông báo về kết quả học tập',
            content: `${student.name} đã có tiến bộ đáng kể trong môn Toán. Điểm kiểm tra gần nhất đạt 8.5.`,
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            read: true
        },
        {
            id: 2,
            from: 'Giáo viên chủ nhiệm',
            to: student.parentName || 'Phụ huynh',
            subject: 'Lịch họp phụ huynh',
            content: 'Kính mời quý phụ huynh tham dự buổi họp vào ngày 20/12/2024 lúc 14:00 tại phòng 301.',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            read: false
        },
        {
            id: 3,
            from: 'Phòng Tài chính',
            to: student.parentName || 'Phụ huynh',
            subject: 'Thông báo học phí',
            content: 'Học phí học kỳ II đã đến hạn thanh toán. Vui lòng thanh toán trước ngày 15/12/2024.',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            read: false
        }
    ];
};

// Methods cho Goals
Database.updateGoal = function(studentId, goalId, data) {
    const student = this.getStudent(studentId);
    if (!student) return null;
    
    const goalIndex = student.goals.findIndex(g => g.id === goalId);
    if (goalIndex !== -1) {
        student.goals[goalIndex] = { ...student.goals[goalIndex], ...data };
        this.updateStudent(studentId, { goals: student.goals });
        return student.goals[goalIndex];
    }
    return null;
};

Database.addGoal = function(studentId, goal) {
    const student = this.getStudent(studentId);
    if (!student) return null;
    
    const newId = student.goals.length > 0 ? Math.max(...student.goals.map(g => g.id)) + 1 : 1;
    const newGoal = {
        id: newId,
        status: 'in-progress',
        progress: 0,
        ...goal
    };
    
    student.goals.push(newGoal);
    this.updateStudent(studentId, { goals: student.goals });
    return newGoal;
};

Database.deleteGoal = function(studentId, goalId) {
    const student = this.getStudent(studentId);
    if (!student) return false;
    
    const goalIndex = student.goals.findIndex(g => g.id === goalId);
    if (goalIndex !== -1) {
        student.goals.splice(goalIndex, 1);
        this.updateStudent(studentId, { goals: student.goals });
        return true;
    }
    return false;
};

// Methods cho Activities
Database.updateActivity = function(studentId, activityId, data) {
    const student = this.getStudent(studentId);
    if (!student) return null;
    
    const activityIndex = student.activities.findIndex(a => a.id === activityId);
    if (activityIndex !== -1) {
        student.activities[activityIndex] = { ...student.activities[activityIndex], ...data };
        this.updateStudent(studentId, { activities: student.activities });
        return student.activities[activityIndex];
    }
    return null;
};

Database.addActivity = function(studentId, activity) {
    const student = this.getStudent(studentId);
    if (!student) return null;
    
    const newId = student.activities.length > 0 ? Math.max(...student.activities.map(a => a.id)) + 1 : 1;
    const newActivity = {
        id: newId,
        joined: new Date().toISOString().split('T')[0],
        hours: 0,
        achievements: [],
        ...activity
    };
    
    student.activities.push(newActivity);
    this.updateStudent(studentId, { activities: student.activities });
    return newActivity;
};

Database.deleteActivity = function(studentId, activityId) {
    const student = this.getStudent(studentId);
    if (!student) return false;
    
    const activityIndex = student.activities.findIndex(a => a.id === activityId);
    if (activityIndex !== -1) {
        student.activities.splice(activityIndex, 1);
        this.updateStudent(studentId, { activities: student.activities });
        return true;
    }
    return false;
};
