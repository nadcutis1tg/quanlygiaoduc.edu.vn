// Teachers Management Module
const Teachers = {
    teachers: [],

    render() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="teachers-page">
                <div class="page-header">
                    <h1>👨‍🏫 Quản lý Giảng viên</h1>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="Teachers.exportData()">
                            <i class="fas fa-file-export"></i> Xuất Excel
                        </button>
                        <button class="btn btn-primary" onclick="Teachers.addNew()">
                            <i class="fas fa-plus"></i> Thêm giảng viên
                        </button>
                    </div>
                </div>

                <!-- AI Performance Insights -->
                <div class="ai-insights-banner">
                    <div class="insight-icon">🤖</div>
                    <div class="insight-content">
                        <h3>AI Phân tích: Top 10 giảng viên xuất sắc nhất tháng</h3>
                        <p>Dựa trên đánh giá sinh viên, kết quả học tập và công bố khoa học</p>
                        <button class="btn-link" onclick="Teachers.showTopPerformers()">
                            Xem bảng xếp hạng →
                        </button>
                    </div>
                </div>

                <!-- Stats Row -->
                <div class="stats-row">
                    <div class="stat-mini">
                        <div class="stat-value">850</div>
                        <div class="stat-label">Tổng giảng viên</div>
                    </div>
                    <div class="stat-mini success">
                        <div class="stat-value">125</div>
                        <div class="stat-label">Tiến sĩ</div>
                    </div>
                    <div class="stat-mini info">
                        <div class="stat-value">4.2/5</div>
                        <div class="stat-label">Đánh giá TB</div>
                    </div>
                    <div class="stat-mini warning">
                        <div class="stat-value">15</div>
                        <div class="stat-label">Cần đào tạo</div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="filters-section">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm giảng viên..." 
                               onkeyup="Teachers.search(this.value)">
                    </div>
                    <select onchange="Teachers.filterByDepartment(this.value)">
                        <option value="">Tất cả khoa</option>
                        <option value="cntt">Khoa CNTT</option>
                        <option value="kinh-te">Khoa Kinh tế</option>
                        <option value="ngoai-ngu">Khoa Ngoại ngữ</option>
                    </select>
                    <select onchange="Teachers.filterByDegree(this.value)">
                        <option value="">Tất cả trình độ</option>
                        <option value="gs">Giáo sư</option>
                        <option value="pgs">Phó giáo sư</option>
                        <option value="ts">Tiến sĩ</option>
                        <option value="ths">Thạc sĩ</option>
                    </select>
                </div>

                <!-- Teachers Grid -->
                <div class="teachers-grid">
                    ${this.renderTeachersGrid()}
                </div>

                <!-- Pagination -->
                <div class="pagination">
                    <button onclick="Teachers.previousPage()">← Trước</button>
                    <span>Trang 1 / 85</span>
                    <button onclick="Teachers.nextPage()">Sau →</button>
                </div>
            </div>
        `;
    },

    renderTeachersGrid() {
        const sampleTeachers = [
            {
                id: 'GV001',
                name: 'GS. Nguyễn Văn A',
                avatar: 'https://via.placeholder.com/150',
                department: 'Khoa CNTT',
                degree: 'Giáo sư',
                experience: 25,
                rating: 4.8,
                courses: 5,
                students: 250,
                publications: 45,
                salary: 35000000,
                status: 'active'
            },
            {
                id: 'GV002',
                name: 'PGS.TS. Trần Thị B',
                avatar: 'https://via.placeholder.com/150',
                department: 'Khoa Kinh tế',
                degree: 'Phó giáo sư',
                experience: 18,
                rating: 4.6,
                courses: 4,
                students: 180,
                publications: 32,
                salary: 28000000,
                status: 'active'
            },
            {
                id: 'GV003',
                name: 'TS. Lê Văn C',
                avatar: 'https://via.placeholder.com/150',
                department: 'Khoa CNTT',
                degree: 'Tiến sĩ',
                experience: 12,
                rating: 4.5,
                courses: 3,
                students: 150,
                publications: 18,
                salary: 22000000,
                status: 'active'
            },
            {
                id: 'GV004',
                name: 'ThS. Phạm Thị D',
                avatar: 'https://via.placeholder.com/150',
                department: 'Khoa Ngoại ngữ',
                degree: 'Thạc sĩ',
                experience: 8,
                rating: 4.3,
                courses: 6,
                students: 200,
                publications: 5,
                salary: 18000000,
                status: 'active'
            },
            {
                id: 'GV005',
                name: 'TS. Hoàng Văn E',
                avatar: 'https://via.placeholder.com/150',
                department: 'Khoa CNTT',
                degree: 'Tiến sĩ',
                experience: 15,
                rating: 4.7,
                courses: 4,
                students: 160,
                publications: 28,
                salary: 25000000,
                status: 'on-leave'
            },
            {
                id: 'GV006',
                name: 'PGS. Vũ Thị F',
                avatar: 'https://via.placeholder.com/150',
                department: 'Khoa Kinh tế',
                degree: 'Phó giáo sư',
                experience: 20,
                rating: 4.9,
                courses: 3,
                students: 120,
                publications: 38,
                salary: 30000000,
                status: 'active'
            }
        ];

        return sampleTeachers.map(teacher => `
            <div class="teacher-card">
                <div class="teacher-header">
                    <img src="${teacher.avatar}" alt="${teacher.name}" class="teacher-avatar">
                    <span class="teacher-status ${teacher.status}">
                        ${teacher.status === 'active' ? '🟢 Đang dạy' : '🟡 Nghỉ phép'}
                    </span>
                </div>
                <div class="teacher-body">
                    <h3>${teacher.name}</h3>
                    <p class="teacher-department">${teacher.department}</p>
                    <div class="teacher-badges">
                        <span class="badge degree">${teacher.degree}</span>
                        <span class="badge experience">${teacher.experience} năm</span>
                    </div>
                    <div class="teacher-rating">
                        <i class="fas fa-star"></i>
                        <span>${teacher.rating}/5.0</span>
                        <span class="rating-count">(${teacher.students} đánh giá)</span>
                    </div>
                    <div class="teacher-stats">
                        <div class="stat-item">
                            <i class="fas fa-book"></i>
                            <span>${teacher.courses} môn</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-users"></i>
                            <span>${teacher.students} SV</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-file-alt"></i>
                            <span>${teacher.publications} bài</span>
                        </div>
                    </div>
                    <div class="teacher-salary">
                        💰 ${this.formatCurrency(teacher.salary)}/tháng
                    </div>
                </div>
                <div class="teacher-footer">
                    <button class="btn-icon" onclick="Teachers.viewProfile('${teacher.id}')" title="Xem hồ sơ">
                        <i class="fas fa-user"></i>
                    </button>
                    <button class="btn-icon" onclick="Teachers.viewSchedule('${teacher.id}')" title="Xem lịch dạy">
                        <i class="fas fa-calendar"></i>
                    </button>
                    <button class="btn-icon" onclick="Teachers.viewPerformance('${teacher.id}')" title="Hiệu suất">
                        <i class="fas fa-chart-line"></i>
                    </button>
                    <button class="btn-icon" onclick="Teachers.edit('${teacher.id}')" title="Chỉnh sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    },

    addNew() {
        const modal = this.createTeacherModal();
        document.body.insertAdjacentHTML('beforeend', modal);
    },

    createTeacherModal() {
        return `
            <div class="modal-overlay" onclick="Teachers.closeModal()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>➕ Thêm giảng viên mới</h2>
                        <button onclick="Teachers.closeModal()">✕</button>
                    </div>
                    <div class="modal-body">
                        <form onsubmit="Teachers.submitForm(event)">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Họ và tên *</label>
                                    <input type="text" required placeholder="Nhập họ tên">
                                </div>
                                <div class="form-group">
                                    <label>Mã giảng viên *</label>
                                    <input type="text" required placeholder="GV001">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Email *</label>
                                    <input type="email" required placeholder="email@university.edu.vn">
                                </div>
                                <div class="form-group">
                                    <label>Số điện thoại</label>
                                    <input type="tel" placeholder="0123456789">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Khoa *</label>
                                    <select required>
                                        <option value="">Chọn khoa</option>
                                        <option value="cntt">Khoa CNTT</option>
                                        <option value="kinh-te">Khoa Kinh tế</option>
                                        <option value="ngoai-ngu">Khoa Ngoại ngữ</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Trình độ *</label>
                                    <select required>
                                        <option value="">Chọn trình độ</option>
                                        <option value="gs">Giáo sư</option>
                                        <option value="pgs">Phó giáo sư</option>
                                        <option value="ts">Tiến sĩ</option>
                                        <option value="ths">Thạc sĩ</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Kinh nghiệm (năm)</label>
                                    <input type="number" min="0" placeholder="0">
                                </div>
                                <div class="form-group">
                                    <label>Lương cơ bản (VNĐ)</label>
                                    <input type="number" min="0" placeholder="15000000">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Chuyên môn</label>
                                <textarea rows="3" placeholder="Mô tả chuyên môn, lĩnh vực nghiên cứu..."></textarea>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" onclick="Teachers.closeModal()">
                                    Hủy
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save"></i> Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    },

    closeModal() {
        document.querySelector('.modal-overlay')?.remove();
    },

    submitForm(event) {
        event.preventDefault();
        alert('Đã thêm giảng viên mới thành công!');
        this.closeModal();
        this.render();
    },

    viewProfile(id) {
        alert(`Xem hồ sơ chi tiết giảng viên ${id}`);
    },

    viewSchedule(id) {
        alert(`Xem lịch dạy của giảng viên ${id}`);
    },

    viewPerformance(id) {
        alert(`Xem báo cáo hiệu suất giảng viên ${id}`);
    },

    edit(id) {
        alert(`Chỉnh sửa thông tin giảng viên ${id}`);
    },

    exportData() {
        alert('Xuất dữ liệu giảng viên ra Excel');
    },

    showTopPerformers() {
        alert('Hiển thị bảng xếp hạng top 10 giảng viên xuất sắc');
    },

    search(query) {
        console.log('Searching teachers:', query);
    },

    filterByDepartment(dept) {
        console.log('Filter by department:', dept);
    },

    filterByDegree(degree) {
        console.log('Filter by degree:', degree);
    },

    previousPage() {
        console.log('Previous page');
    },

    nextPage() {
        console.log('Next page');
    }
};
