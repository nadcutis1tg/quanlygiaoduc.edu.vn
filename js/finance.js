// Finance Management Module
const Finance = {
    currentView: 'overview',

    render() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="finance-page">
                <div class="page-header">
                    <h1>💰 Quản lý Tài chính</h1>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="Finance.exportReport()">
                            <i class="fas fa-file-export"></i> Xuất báo cáo
                        </button>
                        <button class="btn btn-primary" onclick="Finance.createInvoice()">
                            <i class="fas fa-plus"></i> Tạo hóa đơn
                        </button>
                    </div>
                </div>

                <!-- AI Financial Advisor -->
                <div class="ai-insights-banner">
                    <div class="insight-icon">🤖</div>
                    <div class="insight-content">
                        <h3>AI Dự báo: Doanh thu tháng tới tăng 12%</h3>
                        <p>Dựa trên xu hướng 6 tháng qua và kế hoạch tuyển sinh</p>
                        <button class="btn-link" onclick="Finance.viewForecast()">
                            Xem chi tiết →
                        </button>
                    </div>
                </div>

                <!-- Financial Overview -->
                <div class="financial-overview">
                    <div class="overview-card revenue">
                        <div class="card-icon">📈</div>
                        <div class="card-content">
                            <h3>Tổng thu</h3>
                            <div class="amount">450 tỷ VNĐ</div>
                            <div class="change positive">+12% so với kỳ trước</div>
                        </div>
                    </div>
                    <div class="overview-card expense">
                        <div class="card-icon">📉</div>
                        <div class="card-content">
                            <h3>Tổng chi</h3>
                            <div class="amount">420 tỷ VNĐ</div>
                            <div class="change negative">+5% so với kỳ trước</div>
                        </div>
                    </div>
                    <div class="overview-card profit">
                        <div class="card-icon">💎</div>
                        <div class="card-content">
                            <h3>Lợi nhuận</h3>
                            <div class="amount">30 tỷ VNĐ</div>
                            <div class="change positive">Tỷ suất: 6.7%</div>
                        </div>
                    </div>
                    <div class="overview-card collection">
                        <div class="card-icon">💳</div>
                        <div class="card-content">
                            <h3>Tỷ lệ thu</h3>
                            <div class="amount">92%</div>
                            <div class="change positive">Đúng hạn</div>
                        </div>
                    </div>
                </div>

                <!-- View Tabs -->
                <div class="view-tabs">
                    <button class="tab-btn ${this.currentView === 'overview' ? 'active' : ''}" 
                            onclick="Finance.changeView('overview')">
                        Tổng quan
                    </button>
                    <button class="tab-btn ${this.currentView === 'tuition' ? 'active' : ''}" 
                            onclick="Finance.changeView('tuition')">
                        Học phí
                    </button>
                    <button class="tab-btn ${this.currentView === 'expenses' ? 'active' : ''}" 
                            onclick="Finance.changeView('expenses')">
                        Chi phí
                    </button>
                    <button class="tab-btn ${this.currentView === 'salary' ? 'active' : ''}" 
                            onclick="Finance.changeView('salary')">
                        Lương
                    </button>
                    <button class="tab-btn ${this.currentView === 'reports' ? 'active' : ''}" 
                            onclick="Finance.changeView('reports')">
                        Báo cáo
                    </button>
                </div>

                <!-- Content Area -->
                <div class="finance-content">
                    ${this.renderViewContent()}
                </div>
            </div>
        `;
    },

    renderViewContent() {
        switch(this.currentView) {
            case 'tuition':
                return this.renderTuitionView();
            case 'expenses':
                return this.renderExpensesView();
            case 'salary':
                return this.renderSalaryView();
            case 'reports':
                return this.renderReportsView();
            default:
                return this.renderOverviewView();
        }
    },

    renderOverviewView() {
        return `
            <div class="overview-content">
                <!-- Charts -->
                <div class="charts-section">
                    <div class="chart-card">
                        <h3>📊 Doanh thu & Chi phí theo tháng</h3>
                        <canvas id="revenueChart"></canvas>
                    </div>
                    <div class="chart-card">
                        <h3>🥧 Cơ cấu chi phí</h3>
                        <canvas id="expenseChart"></canvas>
                    </div>
                </div>

                <!-- Recent Transactions -->
                <div class="transactions-section">
                    <h3>💳 Giao dịch gần đây</h3>
                    <div class="transactions-list">
                        ${this.renderTransactions()}
                    </div>
                </div>
            </div>
        `;
    },

    renderTuitionView() {
        return `
            <div class="tuition-content">
                <div class="tuition-stats">
                    <div class="stat-box">
                        <h4>Tổng học phí</h4>
                        <div class="value">450 tỷ VNĐ</div>
                    </div>
                    <div class="stat-box">
                        <h4>Đã thu</h4>
                        <div class="value success">414 tỷ VNĐ</div>
                    </div>
                    <div class="stat-box">
                        <h4>Còn nợ</h4>
                        <div class="value warning">36 tỷ VNĐ</div>
                    </div>
                    <div class="stat-box">
                        <h4>Quá hạn</h4>
                        <div class="value danger">5 tỷ VNĐ</div>
                    </div>
                </div>

                <!-- Payment Methods -->
                <div class="payment-methods">
                    <h3>💳 Phương thức thanh toán</h3>
                    <div class="methods-grid">
                        <div class="method-card">
                            <i class="fas fa-university"></i>
                            <span>Chuyển khoản</span>
                            <div class="percentage">65%</div>
                        </div>
                        <div class="method-card">
                            <i class="fas fa-mobile-alt"></i>
                            <span>Ví điện tử</span>
                            <div class="percentage">25%</div>
                        </div>
                        <div class="method-card">
                            <i class="fas fa-credit-card"></i>
                            <span>Thẻ</span>
                            <div class="percentage">8%</div>
                        </div>
                        <div class="method-card">
                            <i class="fas fa-money-bill"></i>
                            <span>Tiền mặt</span>
                            <div class="percentage">2%</div>
                        </div>
                    </div>
                </div>

                <!-- Outstanding Payments -->
                <div class="outstanding-section">
                    <h3>⚠️ Học phí chưa đóng</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Mã SV</th>
                                <th>Họ tên</th>
                                <th>Lớp</th>
                                <th>Số tiền</th>
                                <th>Hạn đóng</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.renderOutstandingPayments()}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderExpensesView() {
        return `
            <div class="expenses-content">
                <div class="expense-categories">
                    <div class="category-card">
                        <h4>👨‍🏫 Lương & Phúc lợi</h4>
                        <div class="amount">189 tỷ VNĐ</div>
                        <div class="percentage">45%</div>
                    </div>
                    <div class="category-card">
                        <h4>🏢 Thiết bị & CSVC</h4>
                        <div class="amount">105 tỷ VNĐ</div>
                        <div class="percentage">25%</div>
                    </div>
                    <div class="category-card">
                        <h4>🔬 NCKH</h4>
                        <div class="amount">63 tỷ VNĐ</div>
                        <div class="percentage">15%</div>
                    </div>
                    <div class="category-card">
                        <h4>📋 Hành chính</h4>
                        <div class="amount">42 tỷ VNĐ</div>
                        <div class="percentage">10%</div>
                    </div>
                    <div class="category-card">
                        <h4>🎯 Khác</h4>
                        <div class="amount">21 tỷ VNĐ</div>
                        <div class="percentage">5%</div>
                    </div>
                </div>

                <!-- Budget vs Actual -->
                <div class="budget-comparison">
                    <h3>📊 Ngân sách vs Thực tế</h3>
                    <canvas id="budgetChart"></canvas>
                </div>
            </div>
        `;
    },

    renderSalaryView() {
        return `
            <div class="salary-content">
                <div class="salary-summary">
                    <h3>💰 Tổng quỹ lương tháng này</h3>
                    <div class="total-salary">15.8 tỷ VNĐ</div>
                    <div class="salary-breakdown">
                        <div class="breakdown-item">
                            <span>Lương cơ bản:</span>
                            <span>12.5 tỷ</span>
                        </div>
                        <div class="breakdown-item">
                            <span>Phụ cấp:</span>
                            <span>2.1 tỷ</span>
                        </div>
                        <div class="breakdown-item">
                            <span>Thưởng:</span>
                            <span>1.2 tỷ</span>
                        </div>
                    </div>
                </div>

                <button class="btn btn-primary" onclick="Finance.processSalary()">
                    <i class="fas fa-calculator"></i> Tính lương tháng này
                </button>
            </div>
        `;
    },

    renderReportsView() {
        return `
            <div class="reports-content">
                <h3>📑 Báo cáo tài chính</h3>
                <div class="reports-grid">
                    <div class="report-card" onclick="Finance.generateReport('balance')">
                        <i class="fas fa-balance-scale"></i>
                        <h4>Bảng cân đối kế toán</h4>
                        <p>Tài sản, nợ phải trả, vốn chủ sở hữu</p>
                    </div>
                    <div class="report-card" onclick="Finance.generateReport('income')">
                        <i class="fas fa-chart-line"></i>
                        <h4>Báo cáo kết quả KD</h4>
                        <p>Doanh thu, chi phí, lợi nhuận</p>
                    </div>
                    <div class="report-card" onclick="Finance.generateReport('cashflow')">
                        <i class="fas fa-money-bill-wave"></i>
                        <h4>Lưu chuyển tiền tệ</h4>
                        <p>Dòng tiền vào, ra theo hoạt động</p>
                    </div>
                    <div class="report-card" onclick="Finance.generateReport('tax')">
                        <i class="fas fa-file-invoice-dollar"></i>
                        <h4>Báo cáo thuế</h4>
                        <p>Thuế GTGT, TNDN, TNCN</p>
                    </div>
                </div>
            </div>
        `;
    },

    renderTransactions() {
        const transactions = [
            { id: 'TX001', type: 'in', desc: 'Học phí SV Nguyễn Văn A', amount: 9000000, time: '10 phút trước' },
            { id: 'TX002', type: 'out', desc: 'Thanh toán thiết bị Lab', amount: 125000000, time: '1 giờ trước' },
            { id: 'TX003', type: 'in', desc: 'Học phí SV Trần Thị B', amount: 9000000, time: '2 giờ trước' },
            { id: 'TX004', type: 'out', desc: 'Lương tháng 11', amount: 1580000000, time: '1 ngày trước' }
        ];

        return transactions.map(tx => `
            <div class="transaction-item ${tx.type}">
                <div class="tx-icon">
                    ${tx.type === 'in' ? '💰' : '💸'}
                </div>
                <div class="tx-content">
                    <div class="tx-desc">${tx.desc}</div>
                    <div class="tx-time">${tx.time}</div>
                </div>
                <div class="tx-amount ${tx.type}">
                    ${tx.type === 'in' ? '+' : '-'}${this.formatCurrency(tx.amount)}
                </div>
            </div>
        `).join('');
    },

    renderOutstandingPayments() {
        const payments = [
            { id: 'SV001', name: 'Nguyễn Văn A', class: '10A', amount: 9000000, due: '15/12/2024', status: 'overdue' },
            { id: 'SV002', name: 'Trần Thị B', class: '10B', amount: 9000000, due: '20/12/2024', status: 'pending' },
            { id: 'SV003', name: 'Lê Văn C', class: '11A', amount: 9000000, due: '25/12/2024', status: 'pending' }
        ];

        return payments.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.class}</td>
                <td>${this.formatCurrency(p.amount)}</td>
                <td>${p.due}</td>
                <td>
                    <span class="status-badge ${p.status}">
                        ${p.status === 'overdue' ? 'Quá hạn' : 'Chưa đóng'}
                    </span>
                </td>
                <td>
                    <button class="btn-icon" onclick="Finance.sendReminder('${p.id}')">
                        <i class="fas fa-bell"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    },

    changeView(view) {
        this.currentView = view;
        this.render();
    },

    createInvoice() {
        alert('Tạo hóa đơn mới');
    },

    exportReport() {
        alert('Xuất báo cáo tài chính');
    },

    viewForecast() {
        alert('Xem dự báo tài chính chi tiết từ AI');
    },

    processSalary() {
        alert('Đang tính lương cho tất cả giảng viên...');
    },

    generateReport(type) {
        alert(`Tạo báo cáo: ${type}`);
    },

    sendReminder(studentId) {
        alert(`Gửi nhắc nhở đóng học phí cho ${studentId}`);
    }
};
