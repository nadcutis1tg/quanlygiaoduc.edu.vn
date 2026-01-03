// Schedule Management Module - AI-Powered Timetable
const Schedule = {
    currentWeek: 1,
    viewMode: 'class', // 'class', 'teacher', 'room'

    render() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="schedule-page">
                <div class="page-header">
                    <h1>📅 Thời khóa biểu Thông minh</h1>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="Schedule.uploadFile()">
                            <i class="fas fa-upload"></i> Upload Excel
                        </button>
                        <button class="btn btn-secondary" onclick="Schedule.exportSchedule()">
                            <i class="fas fa-download"></i> Xuất TKB
                        </button>
                        <button class="btn btn-primary" onclick="Schedule.autoGenerate()">
                            <i class="fas fa-magic"></i> AI Xếp lịch tự động
                        </button>
                    </div>
                </div>

                <!-- AI Optimization Banner -->
                <div class="ai-insights-banner">
                    <div class="insight-icon">🤖</div>
                    <div class="insight-content">
                        <h3>AI phát hiện 15 xung đột có thể tối ưu</h3>
                        <p>Giảm xung đột lịch học, tối ưu phòng học và giảm thời gian di chuyển giảng viên</p>
                        <button class="btn-link" onclick="Schedule.optimizeNow()">
                            Tối ưu ngay →
                        </button>
                    </div>
                </div>

                <!-- View Mode Selector -->
                <div class="view-mode-selector">
                    <button class="mode-btn ${this.viewMode === 'class' ? 'active' : ''}" 
                            onclick="Schedule.changeViewMode('class')">
                        <i class="fas fa-users"></i> Theo lớp
                    </button>
                    <button class="mode-btn ${this.viewMode === 'teacher' ? 'active' : ''}" 
                            onclick="Schedule.changeViewMode('teacher')">
                        <i class="fas fa-chalkboard-teacher"></i> Theo giảng viên
                    </button>
                    <button class="mode-btn ${this.viewMode === 'room' ? 'active' : ''}" 
                            onclick="Schedule.changeViewMode('room')">
                        <i class="fas fa-door-open"></i> Theo phòng học
                    </button>
                </div>

                <!-- Filters -->
                <div class="filters-section">
                    <select id="schedule-filter" onchange="Schedule.filterSchedule(this.value)">
                        ${this.getFilterOptions()}
                    </select>
                    <select onchange="Schedule.changeWeek(this.value)">
                        <option value="1">Tuần 1</option>
                        <option value="2">Tuần 2</option>
                        <option value="3">Tuần 3</option>
                        <option value="4">Tuần 4</option>
                    </select>
                    <button class="btn btn-secondary" onclick="Schedule.manualEdit()">
                        <i class="fas fa-edit"></i> Xếp tay
                    </button>
                </div>

                <!-- Timetable -->
                <div class="timetable-container">
                    ${this.renderTimetable()}
                </div>

                <!-- Conflicts & Warnings -->
                <div class="conflicts-section">
                    <h3>⚠️ Xung đột & Cảnh báo</h3>
                    <div class="conflicts-list">
                        ${this.renderConflicts()}
                    </div>
                </div>

                <!-- Statistics -->
                <div class="schedule-stats">
                    <div class="stat-card">
                        <h4>📊 Thống kê</h4>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">Tổng tiết học:</span>
                                <span class="stat-value">450</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Phòng học sử dụng:</span>
                                <span class="stat-value">45/50</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Giảng viên tham gia:</span>
                                <span class="stat-value">120</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Xung đột:</span>
                                <span class="stat-value warning">15</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getFilterOptions() {
        const options = {
            'class': `
                <option value="">Chọn lớp</option>
                <option value="10A">Lớp 10A</option>
                <option value="10B">Lớp 10B</option>
                <option value="11A">Lớp 11A</option>
            `,
            'teacher': `
                <option value="">Chọn giảng viên</option>
                <option value="GV001">GS. Nguyễn Văn A</option>
                <option value="GV002">PGS. Trần Thị B</option>
                <option value="GV003">TS. Lê Văn C</option>
            `,
            'room': `
                <option value="">Chọn phòng học</option>
                <option value="P301">Phòng 301</option>
                <option value="P302">Phòng 302</option>
                <option value="LAB1">Lab 1</option>
            `
        };
        return options[this.viewMode];
    },

    renderTimetable() {
        const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        const periods = ['1-2', '3-4', '5-6', '7-8', '9-10'];

        return `
            <table class="timetable">
                <thead>
                    <tr>
                        <th class="period-header">Tiết</th>
                        ${days.map(day => `<th>${day}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${periods.map((period, pIndex) => `
                        <tr>
                            <td class="period-cell">${period}</td>
                            ${days.map((day, dIndex) => {
                                const lesson = this.getLesson(dIndex, pIndex);
                                return `
                                    <td class="lesson-cell ${lesson.conflict ? 'conflict' : ''}" 
                                        onclick="Schedule.editLesson(${dIndex}, ${pIndex})">
                                        ${lesson.content}
                                    </td>
                                `;
                            }).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    getLesson(dayIndex, periodIndex) {
        // Sample data - would come from database
        const lessons = [
            { day: 0, period: 0, subject: 'Toán', teacher: 'GV001', room: 'P301', conflict: false },
            { day: 0, period: 1, subject: 'Văn', teacher: 'GV002', room: 'P302', conflict: false },
            { day: 1, period: 0, subject: 'Anh', teacher: 'GV003', room: 'P303', conflict: true },
            { day: 2, period: 2, subject: 'Lý', teacher: 'GV004', room: 'LAB1', conflict: false },
        ];

        const lesson = lessons.find(l => l.day === dayIndex && l.period === periodIndex);
        
        if (lesson) {
            return {
                content: `
                    <div class="lesson-info">
                        <div class="lesson-subject">${lesson.subject}</div>
                        <div class="lesson-teacher">${lesson.teacher}</div>
                        <div class="lesson-room">${lesson.room}</div>
                    </div>
                `,
                conflict: lesson.conflict
            };
        }

        return {
            content: '<div class="empty-lesson">+</div>',
            conflict: false
        };
    },

    renderConflicts() {
        const conflicts = [
            {
                type: 'room',
                severity: 'high',
                message: 'Phòng 301 bị trùng lịch: Lớp 10A và 10B cùng tiết 3-4 thứ 3',
                suggestion: 'Chuyển lớp 10B sang phòng 302'
            },
            {
                type: 'teacher',
                severity: 'high',
                message: 'GV Nguyễn Văn A dạy 2 lớp cùng giờ: 10A và 11B',
                suggestion: 'Đổi giờ dạy lớp 11B sang tiết 5-6'
            },
            {
                type: 'student',
                severity: 'medium',
                message: 'Lớp 10A có 2 môn học cùng tiết',
                suggestion: 'Điều chỉnh thời khóa biểu lớp 10A'
            }
        ];

        return conflicts.map(conflict => `
            <div class="conflict-item ${conflict.severity}">
                <div class="conflict-icon">
                    ${conflict.type === 'room' ? '🚪' : conflict.type === 'teacher' ? '👨‍🏫' : '👨‍🎓'}
                </div>
                <div class="conflict-content">
                    <div class="conflict-message">${conflict.message}</div>
                    <div class="conflict-suggestion">
                        💡 Đề xuất: ${conflict.suggestion}
                    </div>
                </div>
                <button class="btn-icon" onclick="Schedule.resolveConflict('${conflict.type}')">
                    <i class="fas fa-check"></i>
                </button>
            </div>
        `).join('');
    },

    changeViewMode(mode) {
        this.viewMode = mode;
        this.render();
    },

    filterSchedule(value) {
        console.log('Filter schedule:', value);
    },

    changeWeek(week) {
        this.currentWeek = week;
        this.render();
    },

    editLesson(dayIndex, periodIndex) {
        const modal = `
            <div class="modal-overlay" onclick="Schedule.closeModal()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>✏️ Chỉnh sửa tiết học</h2>
                        <button onclick="Schedule.closeModal()">✕</button>
                    </div>
                    <div class="modal-body">
                        <form onsubmit="Schedule.saveLesson(event)">
                            <div class="form-group">
                                <label>Môn học</label>
                                <select required>
                                    <option value="">Chọn môn học</option>
                                    <option value="toan">Toán</option>
                                    <option value="van">Văn</option>
                                    <option value="anh">Tiếng Anh</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Giảng viên</label>
                                <select required>
                                    <option value="">Chọn giảng viên</option>
                                    <option value="GV001">GV001 - Nguyễn Văn A</option>
                                    <option value="GV002">GV002 - Trần Thị B</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Phòng học</label>
                                <select required>
                                    <option value="">Chọn phòng</option>
                                    <option value="P301">P301</option>
                                    <option value="P302">P302</option>
                                    <option value="LAB1">LAB1</option>
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" onclick="Schedule.closeModal()">
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
        document.body.insertAdjacentHTML('beforeend', modal);
    },

    closeModal() {
        document.querySelector('.modal-overlay')?.remove();
    },

    saveLesson(event) {
        event.preventDefault();
        alert('Đã lưu thay đổi!');
        this.closeModal();
        this.render();
    },

    autoGenerate() {
        if (confirm('AI sẽ tự động xếp thời khóa biểu dựa trên các ràng buộc. Tiếp tục?')) {
            // Show loading
            const loading = `
                <div class="loading-overlay">
                    <div class="loading-content">
                        <div class="loader"></div>
                        <p>🤖 AI đang xếp thời khóa biểu...</p>
                        <p class="loading-detail">Đang phân tích ràng buộc và tối ưu hóa...</p>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', loading);

            // Simulate AI processing
            setTimeout(() => {
                document.querySelector('.loading-overlay')?.remove();
                alert('✅ Đã xếp thời khóa biểu thành công!\n\n📊 Kết quả:\n- Giảm 15 xung đột\n- Tối ưu phòng học 20%\n- Giảm di chuyển GV 30%');
                this.render();
            }, 3000);
        }
    },

    optimizeNow() {
        alert('Đang tối ưu hóa thời khóa biểu...');
    },

    uploadFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xlsx,.xls,.csv';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const analysis = await AIEngine.analyzeUploadedFile(file);
                alert(`File đã phân tích:\n- ${analysis.detectedSheets.length} sheets\n- Độ tin cậy: ${analysis.confidence * 100}%`);
            }
        };
        input.click();
    },

    exportSchedule() {
        alert('Xuất thời khóa biểu ra Excel');
    },

    manualEdit() {
        alert('Chế độ xếp tay: Click vào ô để thêm/sửa tiết học');
    },

    resolveConflict(type) {
        alert(`Giải quyết xung đột ${type}`);
    }
};
