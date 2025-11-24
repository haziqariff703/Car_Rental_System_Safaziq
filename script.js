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
    // ... keep other cars
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
                <span class="badge rounded-pill ${car.status === 'Available' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} px-3 py-2">
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
const chartElement = document.getElementById('rentalChart');
if (chartElement) {
    var options = {
        series: [{
            name: 'Revenue (RM)',
            type: 'column',
            data: [4400, 5050, 4140, 6710, 2270, 4130, 7010, 5200, 6100]
        }, {
            name: 'Rentals Count',
            type: 'line',
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22]
        }],
        chart: {
            height: 350,
            type: 'line',
            fontFamily: 'sans-serif',
            toolbar: { show: false }
        },
        stroke: { width: [0, 4] },
        title: { text: 'Revenue vs Rental Frequency (2025)' },
        dataLabels: { enabled: true, enabledOnSeries: [1] },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        colors: ['#0d6efd', '#fd7e14'], // Bootstrap Primary Blue & Orange
        yaxis: [{ title: { text: 'Revenue (RM)' } }, { opposite: true, title: { text: 'Rentals Count' } }]
    };

    var chart = new ApexCharts(document.querySelector("#rentalChart"), options);
    chart.render();
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

// --- 6. Sidebar Toggle Logic ---
const toggleButton = document.getElementById("menu-toggle");
const wrapper = document.getElementById("wrapper");

if (toggleButton && wrapper) {
    toggleButton.onclick = function () {
        wrapper.classList.toggle("sb-sidenav-toggled");
    };
}
