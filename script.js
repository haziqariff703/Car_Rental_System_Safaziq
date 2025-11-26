// --- 1. Authentication Logic ---

const isLoggedIn = localStorage.getItem('crs_auth');
const currentPage = window.location.pathname.split("/").pop();

if (!isLoggedIn && currentPage !== 'index.html' && currentPage !== '') {
    window.location.href = 'index.html';
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        if (user === 'admin' && pass === '1234') {
            localStorage.setItem('crs_auth', 'true');
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('errorMsg').classList.remove('d-none');
        }
    });
}

function logout() {
    localStorage.removeItem('crs_auth');
    window.location.href = 'index.html';
}

// --- 2. Dummy Data ---

const carData = [
    { id: 'C001', model: 'Perodua Myvi', type: 'Compact', price: 'RM 60', status: 'Available', image: 'myvi.jpg' },
    { id: 'C002', model: 'Honda City', type: 'Sedan', price: 'RM 120', status: 'Rented', image: 'city.jpg' },
    { id: 'C003', model: 'Proton X50', type: 'SUV', price: 'RM 150', status: 'Available', image: 'x50.jpg' },
    { id: 'C004', model: 'Toyota Vios', type: 'Sedan', price: 'RM 130', status: 'Maintenance', image: 'vios.jpg' },
    { id: 'C005', model: 'Mazda CX-5', type: 'SUV', price: 'RM 180', status: 'Available', image: 'cx5.jpg' },
    { id: 'C006', model: 'Nissan Almera', type: 'Sedan', price: 'RM 110', status: 'Rented', image: 'almera.jpg' },
    { id: 'C007', model: 'Hyundai Tucson', type: 'SUV', price: 'RM 170', status: 'Available', image: 'tucson.jpg' },
    { id: 'C008', model: 'Ford Fiesta', type: 'Compact', price: 'RM 70', status: 'Available', image: 'fiesta.jpg' },
    { id: 'C009', model: 'Volkswagen Polo', type: 'Compact', price: 'RM 80', status: 'Rented', image: 'polo.jpg' },
    { id: 'C010', model: 'Kia Sportage', type: 'SUV', price: 'RM 160', status: 'Maintenance', image: 'sportage.jpg' },
    { id: 'C011', model: 'Chevrolet Malibu', type: 'Sedan', price: 'RM 140', status: 'Available', image: 'malibu.jpg' },
    { id: 'C012', model: 'Subaru Forester', type: 'SUV', price: 'RM 175', status: 'Rented', image: 'forester.jpg' },
    { id: 'C013', model: 'Audi A3', type: 'Sedan', price: 'RM 200', status: 'Available', image: 'audi_a3.jpg' },
    { id: 'C014', model: 'BMW X1', type: 'SUV', price: 'RM 220', status: 'Available', image: 'bmw_x1.jpg' },
];

const carsTable = document.getElementById('carsTableBody');
if (carsTable) {
    carsTable.innerHTML = carData.map(car => `
        <tr>
            <td class="ps-4">
                <div class="d-flex align-items-center">
                    <img src="${car.image}" onerror="this.src='https://placehold.co/60x40?text=No+Img'" class="rounded-3 me-3" style="width: 60px; height: 40px; object-fit: cover;">
                    <div>
                        <div class="fw-bold text-dark">${car.model}</div>
                        <div class="small text-muted font-monospace">${car.id}</div>    
                    </div>
                </div>
            </td>
            <td class="text-muted">${car.type}</td>
            <td class="fw-bold text-primary">${car.price}</td>
            <td>
                <span class="badge rounded-pill ${car.status === 'Available' ? 'bg-success-subtle text-success' : car.status === 'Rented' ? 'bg-warning-subtle text-warning' : car.status === 'Maintenance' ? 'bg-danger-subtle text-danger' : ''} px-3 py-2">
                    ${car.status}
                </span>
            </td>
            <td class="text-end pe-4">
                <button class="btn btn-sm btn-light text-secondary"><i class="fas fa-edit"></i></button>
            </td>
        </tr>
    `).join('');
}

const rentalData = [
    { id: 'R1024', customer: 'Ali Bin Ahmad', car: 'Honda City', dates: '10 Oct - 12 Oct', total: 'RM 240', status: 'Paid' },
    { id: 'R1025', customer: 'Sarah Tan', car: 'Proton X50', dates: '15 Oct - 18 Oct', total: 'RM 540', status: 'Pending' },
    { id: 'R1026', customer: 'Muthu Kumar', car: 'Perodua Myvi', dates: '19 Oct - 20 Oct', total: 'RM 60', status: 'Paid' },
    { id: 'R1027', customer: 'Jenny Lo', car: 'Nissan Almera', dates: '21 Oct - 23 Oct', total: 'RM 140', status: 'Paid' },
    { id: 'R1028', customer: 'David Lee', car: 'Toyota Vios', dates: '25 Oct - 28 Oct', total: 'RM 390', status: 'Pending' }
];

const customerData = [
    { id: 'C-101', name: 'Ali Ahmad', email: 'ali@email.com', phone: '+6012-345 6789', joinDate: '12 Jan 2024', status: 'Verified', avatar: 'ali.jpeg' },
    { id: 'C-102', name: 'Sarah Tan', email: 'sarah@email.com', phone: '+6019-888 9999', joinDate: '15 Feb 2024', status: 'Pending', avatar: 'sarah.jpg' },
    { id: 'C-103', name: 'Muthu Kumar', email: 'muthu@email.com', phone: '+6017-777 6666', joinDate: '20 Mar 2024', status: 'Verified', avatar: 'https://ui-avatars.com/api/?name=Muthu+Kumar&background=random' },
    { id: 'C-104', name: 'Jenny Lo', email: 'jenny@email.com', phone: '+6012-222 3333', joinDate: '05 Apr 2024', status: 'Rejected', avatar: 'https://ui-avatars.com/api/?name=Jenny+Lo&background=random' },
    { id: 'C-105', name: 'David Lee', email: 'david@email.com', phone: '+6013-555 4444', joinDate: '10 May 2024', status: 'Verified', avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=random' }
];

// Render Customers Table
const customerTable = document.getElementById('customerTableBody');
if (customerTable) {
    customerTable.innerHTML = customerData.map(cust => `
        <tr>
            <td class="ps-4">
                <div class="d-flex align-items-center">
                    <img src="${cust.avatar}" class="rounded-circle me-3 shadow-sm" width="40" height="40">
                    <div>
                        <div class="fw-bold text-dark">${cust.name}</div>
                        <div class="small text-muted font-monospace">${cust.id}</div>
                    </div>
                </div>
            </td>
            <td>
                <div class="text-dark">${cust.email}</div>
                <div class="small text-muted">${cust.phone}</div>
            </td>
            <td class="text-muted">${cust.joinDate}</td>
            <td>
                <span class="badge rounded-pill px-3 py-2 
                    ${cust.status === 'Verified' ? 'bg-success-subtle text-success' : 
                      cust.status === 'Pending' ? 'bg-warning-subtle text-warning' : 
                      'bg-danger-subtle text-danger'}">
                    ${cust.status}
                </span>
            </td>
            <td class="text-end pe-4">
                <button class="btn btn-sm btn-light text-secondary hover-primary" title="Edit">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

const rentalsTable = document.getElementById('rentalsTableBody');
if (rentalsTable) {
    rentalsTable.innerHTML = rentalData.map(rent => `
        <tr>
            <td class="ps-4 fw-bold text-secondary">${rent.id}</td>
            <td>${rent.customer}</td>
            <td class="text-muted">${rent.car}</td>
            <td class="small">${rent.dates}</td>
            <td class="fw-bold">${rent.total}</td>
             <td>
                <span class="badge rounded-pill ${rent.status === 'Paid' ? 'bg-success' : 'bg-warning text-dark'}">
                    ${rent.status}
                </span>
            </td>
        </tr>
    `).join('');
}

// --- 4. ApexCharts Configuration ---

const revenueChartEl = document.querySelector("#revenueChart");
if (revenueChartEl) {
    const revenueOptions = {
        series: [{ name: 'Net Income', data: [12500, 9800, 14200, 16500, 19200, 24500, 22100, 26000, 21000] }],
        chart: { type: 'area', height: 350, fontFamily: 'Inter, sans-serif', toolbar: { show: false }, zoom: { enabled: false } },
        colors: ['#4f46e5'], 
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.6, opacityTo: 0.1, stops: [0, 90, 100] } },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], axisBorder: { show: false }, axisTicks: { show: false } },
        yaxis: { labels: { formatter: function (value) { return "RM " + (value / 1000).toFixed(1) + "k"; } } },
        grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
        tooltip: { theme: 'light', y: { formatter: function (val) { return "RM " + val } } }
    };
    new ApexCharts(revenueChartEl, revenueOptions).render();
}

const statusChartEl = document.querySelector("#statusChart");
if (statusChartEl) {
    const statusOptions = {
        series: [8, 4, 2], 
        labels: ['Available', 'On Rental', 'Maintenance'],
        chart: { type: 'donut', height: 320, fontFamily: 'Inter, sans-serif' },
        colors: ['#10b981', '#f59e0b', '#ef4444'], 
        plotOptions: { pie: { donut: { size: '75%', labels: { show: true, name: { show: true, fontSize: '14px', color: '#64748b' }, value: { show: true, fontSize: '24px', fontWeight: 700, color: '#1e293b', formatter: function (val) { return val + " Cars" } }, total: { show: true, showAlways: true, label: 'Availability', color: '#64748b', formatter: function (w) { const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0); const available = w.globals.seriesTotals[0]; return Math.round((available / total) * 100) + "%"; } } } } } },
        dataLabels: { enabled: false },
        legend: { position: 'bottom', markers: { radius: 12 } }
    };
    new ApexCharts(statusChartEl, statusOptions).render();
}

// --- 5. Simple Search Filter ---
function filterTable() {
    const input = document.getElementById("searchInput");
    if (!input) return; // Guard clause
    const filter = input.value.toUpperCase();
    const table = document.querySelector("table");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[0]; 
        if (td) {
            const txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// --- 6. Sidebar Toggle / Mobile Overlay (UPDATED) ---
function initSidebarToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar-wrapper');
    
    // [NEW] Select the profile section
    const sidebarProfile = document.querySelector('.sidebar-profile'); 

    if (!menuToggle || !sidebar) return;

    // 1. Wrap text nodes for hover effects (Legacy support)
    const links = sidebar.querySelectorAll('.list-group-item');
    links.forEach(link => {
        if (link.querySelector('.menu-label')) return; 
        const nodes = Array.from(link.childNodes);
        const labelSpan = document.createElement('span');
        labelSpan.className = 'menu-label';
        nodes.forEach(n => {
            if (n.nodeType === Node.TEXT_NODE && n.textContent.trim()) {
                labelSpan.appendChild(document.createTextNode(n.textContent.trim()));
                link.removeChild(n);
            }
        });
        if (labelSpan.textContent) link.appendChild(labelSpan);
    });

    // 2. Helper Functions
    const isMobile = () => window.innerWidth < 768;

    function openOverlay() {
        document.body.classList.add('sb-sidenav-open');
        let bd = document.getElementById('sidebar-backdrop');
        if (!bd) {
            bd = document.createElement('div');
            bd.id = 'sidebar-backdrop';
            bd.className = 'sidebar-backdrop';
            bd.addEventListener('click', closeOverlay);
            document.body.appendChild(bd);
        }
    }

    function closeOverlay() {
        document.body.classList.remove('sb-sidenav-open');
        const bd = document.getElementById('sidebar-backdrop');
        if (bd) bd.remove();
    }

    // 3. Main Toggle Logic (Reused by both Button and Profile)
    const toggleAction = () => {
        if (isMobile()) {
            if (document.body.classList.contains('sb-sidenav-open')) closeOverlay();
            else openOverlay();
        } else {
            // Desktop: Toggle the class on BODY (matches your CSS)
            document.body.classList.toggle('sb-sidenav-collapsed');
        }
    };

    // 4. Event Listener: Hamburger Button
    menuToggle.addEventListener('click', function (e) {
        e.preventDefault();
        toggleAction();
    });

    // 5. Event Listener: Profile Header (The feature you requested)
    if (sidebarProfile) {
        sidebarProfile.style.cursor = 'pointer'; // Visual cue
        sidebarProfile.addEventListener('click', function() {
            toggleAction();
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('sb-sidenav-open')) {
            closeOverlay();
        }
    });

    // Close overlay when clicking a link (mobile)
    sidebar.addEventListener('click', function (e) {
        if (isMobile() && e.target.closest('.list-group-item')) closeOverlay();
    });
}

// Initialize functionality
initSidebarToggle();

// --- 7. Theme Switcher Logic ---
function initThemeSwitcher() {
    const themeSelect = document.getElementById('themeSelect');
    const storedTheme = localStorage.getItem('crs_theme') || 'auto';

    const applyTheme = (theme) => {
        let effectiveTheme = theme;
        if (theme === 'auto') {
            effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-bs-theme', effectiveTheme);
    };

    applyTheme(storedTheme);
    if (themeSelect) {
        themeSelect.value = storedTheme;
        themeSelect.addEventListener('change', function() {
            const selectedTheme = this.value;
            localStorage.setItem('crs_theme', selectedTheme);
            applyTheme(selectedTheme);
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('crs_theme') === 'auto') {
            applyTheme('auto');
        }
    });
}
initThemeSwitcher();
