// Students Management Module
const Students = {
    students: [],

    render() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="students-page">
                <div class="page-header">
                    <h1>👨‍🎓 Quản lý Học viên</h1>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="Students.importData()">
                            <i class="fas fa-file-import"></i> Import Excel
                        </button>
                        <button class="btn btn-primary" onclick="Students.addNew()">
                            <i class="fas fa-plus"></i> Thêm học viên
                        </button>
                    </div>
                </div>

                <!-- AI Insights -->
                <div class="ai-insights-banner">
                    <div class="insight-icon">🤖</div>
                    <div class="insight-content">
                        <h3>AI Phát hiện: 85 sinh viên có nguy cơ bỏ học</h3>
                        <p>Dựa trên phân tích điểm số, tham gia và hành vi, AI đã xác định 85 sinh viên cần hỗ trợ đặc biệt</p>
                        <button class="btn-link" onclick="Students.showAtRiskStudents()">
                            Xem danh sách chi tiết →
                        </button>
                    </div>
                </div>

                <!-- Filters -->
                <div class="filters-section">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm theo tên, mã SV..." 
                               onkeyup="Students.search(this.value)">
                    </div>
                    <select onchange="Students.filterByClass(this.value)">
                        <option value="">Tất cả lớp</option>
                        <option value="10A">Lớp 10A</option>
                        <option value="10B">Lớp 10B</option>
                        <option value="11A">Lớp 11A</option>
                    </select>
                    <select onchange="Students.filterByStatus(this.value)">
                        <option value="">Tất cả trạng thái</option>
                        <option value="active">Đang học</option>
                        <option value="at-risk">Có nguy cơ</option>
                        <option value="excellent">Xuất sắc</option>
                    </select>
                </div>

                <!-- Stats Cards -->
                <div class="stats-row">
                    <div class="stat-mini">
                        <div class="stat-value">15,200</div>
                        <div class="stat-label">Tổng sinh viên</div>
                    </div>
                    <div class="stat-mini success">
                        <div class="stat-value">1,850</div>
                        <div class="stat-label">Xuất sắc</div>
                    </div>
                    <div class="stat-mini warning">
                        <div class="stat-value">85</div>
                        <div class="stat-label">Có nguy cơ</div>
                    </div>
                    <div class="stat-mini info">
                        <div class="stat-value">92%</div>
                        <div class="stat-label">Tỷ lệ tham gia</div>
                    </div>
                </div>

                <!-- Students Table -->
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th><input type="checkbox" onclick="Students.selectAll(this)"></th>
                                <th>Mã SV</th>
                                <th>Họ và tên</th>
                                <th>Lớp</th>
                                <th>GPA</th>
                                <th>Tham gia</th>
                                <th>Trạng thái</th>
                                <th>AI Risk</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="students-table-body">
                            ${this.renderStudentsTable()}
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="pagination">
                    <button onclick="Students.previousPage()">← Trước</button>
                    <span>Trang 1 / 152</span>
                    <button onclick="Students.nextPage()">Sau →</button>
                </div>
            </div>
        `;
    },

    renderStudentsTable() {
        const sampleStudents = [
            { id: 'SV001', name: 'Nguyễn Văn A', class: '10A', gpa: 3.8, attendance: 95, status: 'excellent', risk: 'LOW' },
            { id: 'SV002', name: 'Trần Thị B', class: '10A', gpa: 3.2, attendance: 88, status: 'active', risk: 'LOW' },
            { id: 'SV003', name: 'Lê Văn C', class: '10B', gpa: 1.8, attendance: 65, status: 'at-risk', risk: 'HIGH' },
            { id: 'SV004', name: 'Phạm Thị D', class: '11A', gpa: 3.9, attendance: 98, status: 'excellent', risk: 'LOW' },
            { id: 'SV005', name: 'Hoàng Văn E', class: '11A', gpa: 2.5, attendance: 75, status: 'active', risk: 'MEDIUM' }
        ];

        return sampleStudents.map(student => `
            <tr>
                <td><input type="checkbox"></td>
                <td>${student.id}</td>
                <td>
                    <div class="student-info">
                        <img src="https://via.placeholder.com/40" alt="${student.name}">
                        <span>${student.name}</span>
                    </div>
                </td>
                <td>${student.class}</td>
                <td><span class="gpa-badge ${student.gpa >= 3.5 ? 'high' : student.gpa >= 2.5 ? 'medium' : 'low'}">${student.gpa}</span></td>
                <td>${student.attendance}%</td>
                <td><span class="status-badge ${student.status}">${this.getStatusText(student.status)}</span></td>
                <td><span class="risk-badge ${student.risk.toLowerCase()}">${student.risk}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="Students.view('${student.id}')" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon" onclick="Students.edit('${student.id}')" title="Chỉnh sửa">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon danger" onclick="Students.delete('${student.id}')" title="Xóa">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    getStatusText(status) {
        const statusMap = {
            'excellent': 'Xuất sắc',
            'active': 'Đang học',
            'at-risk': 'Có nguy cơ'
        };
        return statusMap[status] || status;
    },

    addNew() {
        alert('Mở form thêm sinh viên mới');
    },

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xlsx,.xls,.csv';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const analysis = await AIEngine.analyzeUploadedFile(file);
                this.showImportPreview(analysis);
            }
        };
        input.click();
    },

    showImportPreview(analysis) {
        alert(`File đã phân tích:\n- ${analysis.detectedSheets.length} sheets\n- Tổng ${analysis.autoMapping.lecturers + analysis.autoMapping.courses + analysis.autoMapping.rooms} records\n- Độ tin cậy: ${analysis.confidence * 100}%`);
    },

    showAtRiskStudents() {
        alert('Hiển thị danh sách 85 sinh viên có nguy cơ bỏ học với đề xuất hỗ trợ từ AI');
    },

    view(id) {
        alert(`Xem chi tiết sinh viên ${id}`);
    },

    edit(id) {
        alert(`Chỉnh sửa sinh viên ${id}`);
    },

    delete(id) {
        if (confirm(`Bạn có chắc muốn xóa sinh viên ${id}?`)) {
            alert(`Đã xóa sinh viên ${id}`);
        }
    },

    search(query) {
        console.log('Searching for:', query);
    },

    filterByClass(className) {
        console.log('Filter by class:', className);
    },

    filterByStatus(status) {
        console.log('Filter by status:', status);
    },

    selectAll(checkbox) {
        const checkboxes = document.querySelectorAll('#students-table-body input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = checkbox.checked);
    },

    previousPage() {
        console.log('Previous page');
    },

    nextPage() {
        console.log('Next page');
    }
};
