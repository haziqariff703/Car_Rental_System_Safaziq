// --- 1. Authentication Logic (Same as before) ---

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
            // Show Bootstrap alert by removing d-none
            document.getElementById('errorMsg').classList.remove('d-none');
        }
    });
}

function logout() {
    localStorage.removeItem('crs_auth');
    window.location.href = 'index.html';
}

// 1. Update Dummy Data with 'image' property
// Ensure you put city.jpg and myvi.jpg in the same folder
const carData = [
    { id: 'C001', model: 'Perodua Myvi', type: 'Compact', price: 'RM 60', status: 'Available', image: 'myvi.jpg' },
    { id: 'C002', model: 'Honda City', type: 'Sedan', price: 'RM 120', status: 'Rented', image: 'city.jpg' },
    { id: 'C003', model: 'Proton X50', type: 'SUV', price: 'RM 150', status: 'Available', image: 'x50.jpg' },
    { id: 'C004', model: 'Toyota Vios', type: 'Sedan', price: 'RM 130', status: 'Maintenance', image: 'vios.jpg' },
    { id: 'C005', model: 'Mazda CX-5', type: 'SUV', price: 'RM 180', status: 'Available', image: 'cx5.jpg' },
    { id: 'C006', model: 'Nissan Almera', type: 'Sedan', price: 'RM 110', status: 'Rented', image: 'almera.jpg' },
    { id: 'C007', model: 'Hyundai Tucson', type: 'SUV', price: 'RM 170', status: 'Available', image: 'tucson.jpg' },
    { id: 'C008', model: 'Ford Fiesta', type: 'Compact', price: 'RM 70', status: 'Available', image: 'fiesta.jpg' },
    {id : 'C009', model: 'Volkswagen Polo', type: 'Compact', price: 'RM 80', status: 'Rented', image: 'polo.jpg' },
    {id : 'C010', model: 'Kia Sportage', type: 'SUV', price: 'RM 160', status: 'Maintenance', image: 'sportage.jpg' },
    {id : 'C011', model: 'Chevrolet Malibu', type: 'Sedan', price: 'RM 140', status: 'Available', image: 'malibu.jpg' },
    {id : 'C012', model: 'Subaru Forester', type: 'SUV', price: 'RM 175', status: 'Rented', image: 'forester.jpg' },
    {id : 'C013', model: 'Audi A3', type: 'Sedan', price: 'RM 200', status: 'Available', image: 'audi_a3.jpg' },
    {id : 'C014', model: 'BMW X1', type: 'SUV', price: 'RM 220', status: 'Available', image: 'bmw_x1.jpg' },
];

const carsTable = document.getElementById('carsTableBody');
if (carsTable) {
    carsTable.innerHTML = carData.map(car => `
        <tr>
            <td class="ps-4">
                <div class="d-flex align-items-center">
                    <img src="${car.image}" class="rounded-3 me-3" style="width: 60px; height: 40px; object-fit: cover;">
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

// --- 4. ApexCharts (Same as before) ---
// No changes needed here as ApexCharts is independent of CSS framework
// --- ApexCharts Configuration ---

// --- 1. Revenue Chart (Financial Insight) ---
const revenueChartEl = document.querySelector("#revenueChart");
if (revenueChartEl) {
    const revenueOptions = {
        // Meaningful Data: Realistic fluctuations (e.g., dips in Feb, peaks in June/Aug)
        series: [{
            name: 'Net Income',
            data: [12500, 9800, 14200, 16500, 19200, 24500, 22100, 26000, 21000]
        }],
        chart: {
            type: 'area', // Area charts imply volume/growth better than bars
            height: 350,
            fontFamily: 'Inter, sans-serif',
            toolbar: { show: false }, // Cleaner UI
            zoom: { enabled: false }
        },
        colors: ['#4f46e5'], // Matches your 'Indigo' primary theme
        fill: {
            type: 'gradient', // Adds "Mesmerizing" visual polish
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.6,
                opacityTo: 0.1,
                stops: [0, 90, 100]
            }
        },
        dataLabels: { enabled: false },
        stroke: {
            curve: 'smooth', // Smooth lines look more modern
            width: 3
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            // Usability: Formats numbers to currency (RM) so users know what they are looking at
            labels: {
                formatter: function (value) {
                    return "RM " + (value / 1000).toFixed(1) + "k";
                }
            }
        },
        grid: {
            borderColor: '#f1f5f9', // Subtle grid lines for readability
            strokeDashArray: 4,
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: function (val) {
                    return "RM " + val // Usability: Tooltip shows exact currency
                }
            }
        }
    };
    new ApexCharts(revenueChartEl, revenueOptions).render();
}

// --- 2. Fleet Status Chart (Operational Insight) ---
const statusChartEl = document.querySelector("#statusChart");
if (statusChartEl) {
    const statusOptions = {
        // Meaningful Data: 8 Available, 4 Rented, 2 Maintenance (Total 14)
        series: [8, 4, 2], 
        labels: ['Available', 'On Rental', 'Maintenance'],
        chart: {
            type: 'donut',
            height: 320,
            fontFamily: 'Inter, sans-serif',
        },
        // Usability: Color Coding (Green=Good, Orange=Warning, Red=Bad)
        colors: ['#10b981', '#f59e0b', '#ef4444'], 
        plotOptions: {
            pie: {
                donut: {
                    size: '75%', // Thinner ring looks more elegant
                    labels: {
                        show: true,
                        name: { show: true, fontSize: '14px', color: '#64748b' },
                        value: { 
                            show: true, 
                            fontSize: '24px', 
                            fontWeight: 700, 
                            color: '#1e293b',
                            formatter: function (val) {
                                return val + " Cars"
                            }
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Availability',
                            color: '#64748b',
                            formatter: function (w) {
                                // Meaningful: Calculates percentage of available cars
                                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                const available = w.globals.seriesTotals[0];
                                return Math.round((available / total) * 100) + "%";
                            }
                        }
                    }
                }
            }
        },
        dataLabels: { enabled: false },
        legend: { 
            position: 'bottom',
            markers: { radius: 12 } // Usability: Rounded markers match your UI
        }
    };
    new ApexCharts(statusChartEl, statusOptions).render();
}
// --- 5. Simple Search Filter ---
function filterTable() {
    const input = document.getElementById("searchInput");
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

// --- 6. Sidebar Toggle / Mobile Overlay ---
function initSidebarToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar-wrapper');
    if (!menuToggle || !sidebar) return;

    // Wrap any stray text nodes in the link into a span.menu-label (so CSS can hide/show labels)
    const links = sidebar.querySelectorAll('.list-group-item');
    links.forEach(link => {
        if (link.querySelector('.menu-label')) return; // already processed
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

    const isMobile = () => window.innerWidth < 768;

    // Focus management helpers for accessibility
    const mainContent = document.getElementById('page-content-wrapper');
    let previousActiveElement = null;
    let focusTrapHandler = null;

    function getFocusableElements(container) {
        const selectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';
        return Array.from(container.querySelectorAll(selectors)).filter(el => el.offsetParent !== null);
    }

    function enableFocusTrap(container) {
        const focusable = getFocusableElements(container);
        if (!focusable.length) return;
        focusTrapHandler = function (e) {
            if (e.key !== 'Tab') return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', focusTrapHandler);
    }

    function disableFocusTrap() {
        if (focusTrapHandler) {
            document.removeEventListener('keydown', focusTrapHandler);
            focusTrapHandler = null;
        }
    }

    function openOverlay() {
        document.body.classList.add('sb-sidenav-open');
        let bd = document.getElementById('sidebar-backdrop');
        if (!bd) {
            bd = document.createElement('div');
            bd.id = 'sidebar-backdrop';
            bd.className = 'sidebar-backdrop';
            bd.setAttribute('role', 'button');
            bd.setAttribute('aria-hidden', 'false');
            bd.setAttribute('tabindex', '-1');
            bd.addEventListener('click', closeOverlay);
            document.body.appendChild(bd);
        }
        // mark main content hidden to screen readers
        try { if (mainContent) mainContent.setAttribute('aria-hidden', 'true'); } catch (e) {}
        // save previous focus and move focus into the sidebar
        previousActiveElement = document.activeElement;
        try {
            const focusable = getFocusableElements(sidebar);
            if (focusable.length) focusable[0].focus();
            else sidebar.setAttribute('tabindex', '-1'), sidebar.focus();
        } catch (e) {}
        // enable focus trap inside sidebar
        enableFocusTrap(sidebar);
        // update toggle ARIA
        try { menuToggle.setAttribute('aria-expanded', 'true'); } catch(e){}
    }

    function closeOverlay() {
        document.body.classList.remove('sb-sidenav-open');
        const bd = document.getElementById('sidebar-backdrop');
        if (bd) bd.remove();
        // remove aria-hidden from main content
        try { if (mainContent) mainContent.removeAttribute('aria-hidden'); } catch (e) {}
        // restore focus
        try { if (previousActiveElement) previousActiveElement.focus(); } catch (e) {}
        previousActiveElement = null;
        // disable focus trap
        disableFocusTrap();
        // update toggle ARIA
        try { menuToggle.setAttribute('aria-expanded', 'false'); } catch(e){}
    }

    menuToggle.addEventListener('click', function (e) {
        if (isMobile()) {
            if (document.body.classList.contains('sb-sidenav-open')) closeOverlay();
            else openOverlay();
        } else {
            // desktop: toggle compact icons-only state
            const collapsed = document.body.classList.toggle('sb-sidenav-collapsed');
            // ensure aria-expanded is false in desktop collapsed state
            try { menuToggle.setAttribute('aria-expanded', 'false'); } catch(e){}
        }
    });

    // Close overlay on ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('sb-sidenav-open')) {
            closeOverlay();
        }
    });

    // Close overlay when clicking a sidebar link (mobile)
    sidebar.addEventListener('click', function (e) {
        if (isMobile() && e.target.closest('.list-group-item')) closeOverlay();
    });
}

// initialize sidebar toggle behavior
initSidebarToggle();

