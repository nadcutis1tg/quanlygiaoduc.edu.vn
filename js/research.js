// Research Management Module
const Research = {
    render() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="research-page">
                <div class="page-header">
                    <h1>🔬 Quản lý Nghiên cứu Khoa học</h1>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="Research.createProject()">
                            <i class="fas fa-plus"></i> Tạo đề tài mới
                        </button>
                    </div>
                </div>

                <!-- AI Research Assistant -->
                <div class="ai-insights-banner">
                    <div class="insight-icon">🤖</div>
                    <div class="insight-content">
                        <h3>AI đề xuất: 5 tạp chí phù hợp cho bài báo của bạn</h3>
                        <p>Dựa trên phân tích nội dung và impact factor</p>
                        <button class="btn-link" onclick="Research.viewRecommendations()">
                            Xem đề xuất →
                        </button>
                    </div>
                </div>

                <!-- Stats -->
                <div class="stats-row">
                    <div class="stat-mini">
                        <div class="stat-value">156</div>
                        <div class="stat-label">Đề tài đang thực hiện</div>
                    </div>
                    <div class="stat-mini success">
                        <div class="stat-value">42</div>
                        <div class="stat-label">Bài báo Q1 năm nay</div>
                    </div>
                    <div class="stat-mini info">
                        <div class="stat-value">85 tỷ</div>
                        <div class="stat-label">Kinh phí nghiên cứu</div>
                    </div>
                    <div class="stat-mini warning">
                        <div class="stat-value">18</div>
                        <div class="stat-label">Bằng sáng chế</div>
                    </div>
                </div>

                <!-- Projects List -->
                <div class="projects-section">
                    <h3>📋 Đề tài nghiên cứu</h3>
                    <div class="projects-grid">
                        ${this.renderProjects()}
                    </div>
                </div>
            </div>
        `;
    },

    renderProjects() {
        const projects = [
            {
                id: 'DT001',
                title: 'Ứng dụng AI trong chẩn đoán ung thư',
                pi: 'GS. Nguyễn Văn A',
                budget: 3200000000,
                progress: 65,
                status: 'active'
            },
            {
                id: 'DT002',
                title: 'Nghiên cứu blockchain trong giáo dục',
                pi: 'PGS. Trần Thị B',
                budget: 2500000000,
                progress: 45,
                status: 'active'
            }
        ];

        return projects.map(p => `
            <div class="project-card">
                <h4>${p.title}</h4>
                <p>Chủ nhiệm: ${p.pi}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${p.progress}%"></div>
                </div>
                <p>${p.progress}% hoàn thành</p>
            </div>
        `).join('');
    },

    createProject() {
        alert('Tạo đề tài nghiên cứu mới');
    },

    viewRecommendations() {
        alert('Xem đề xuất tạp chí từ AI');
    }
};

// Attendance Module
const Attendance = {
    render() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="attendance-page">
                <h1>✅ Điểm danh & Đánh giá</h1>
                <p>Module đang được phát triển...</p>
            </div>
        `;
    }
};

// Reports Module
const Reports = {
    render() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="reports-page">
                <h1>📊 Báo cáo & Phân tích</h1>
                <p>Module đang được phát triển...</p>
            </div>
        `;
    },

    generate() {
        alert('Tạo báo cáo mới');
    }
};

// Notifications Module
const Notifications = {
    render() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="notifications-page">
                <h1>🔔 Hệ thống Thông báo</h1>
                <p>Module đang được phát triển...</p>
            </div>
        `;
    }
};

// LMS Module
const LMS = {
    render() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="lms-page">
                <h1>💻 Lớp học Online</h1>
                <p>Module đang được phát triển...</p>
            </div>
        `;
    }
};
