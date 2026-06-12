//LOGIN LOGIC
const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginContainer.classList.add('hidden');
    dashboardContainer.classList.remove('hidden');
});

document.getElementById('logout-btn').addEventListener('click', () => {
    if(confirm("Apakah Anda yakin ingin logout?")) location.reload();
});


//MODAL & CANVAS CONTROL
const modal = document.getElementById('modal-overlay');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal');
const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
let drawing = false;

// Buka Modal (Mode Tambah)
openModalBtn.onclick = () => {
    document.getElementById('edit-index').value = ""; // Reset mode edit
    document.getElementById('modal-title').innerText = "Formulir Entri Data";
    document.getElementById('crud-form').reset();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    modal.classList.remove('modal-hidden');
};

//Tutup Modal
closeModalBtn.onclick = () => modal.classList.add('modal-hidden');

//Logika Menggambar di Canvas
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
});

document.getElementById('clear-canvas').onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height);


//CRUD LOGIC (CREATE, UPDATE, DELETE)
const crudForm = document.getElementById('crud-form');
const tableBody = document.getElementById('table-body');

crudForm.onsubmit = (e) => {
    e.preventDefault();
    
    const editIndex = document.getElementById('edit-index').value;
    const nama = document.getElementById('input-nama').value;
    const files = document.getElementById('input-files').files;
    const signatureImg = canvas.toDataURL();
    const fileText = files.length > 0 ? `${files.length} File(s)` : "No File";

    if (editIndex === "") {
        // MODE: TAMBAH DATA BARU
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${Math.floor(Math.random() * 1000)}</td>
            <td>${nama}</td>
            <td>${fileText}</td>
            <td><img src="${signatureImg}" style="height:40px;"></td>
            <td class="no-print">
                <button class="btn-edit" onclick="editRow(this)">Edit</button>
                <button class="btn-danger" onclick="this.closest('tr').remove()">Hapus</button>
            </td>
        `;
        tableBody.appendChild(row);
    } else {
        // MODE: UPDATE DATA LAMA
        const targetRow = document.getElementById('data-table').rows[editIndex];
        targetRow.cells[1].innerText = nama;
        targetRow.cells[2].innerText = fileText;
        targetRow.cells[3].innerHTML = `<img src="${signatureImg}" style="height:40px;">`;
    }

    modal.classList.add('modal-hidden');
};

// Fungsi Edit: Memindahkan data tabel ke form modal
function editRow(btn) {
    const row = btn.closest('tr');
    document.getElementById('edit-index').value = row.rowIndex;
    document.getElementById('input-nama').value = row.cells[1].innerText;
    document.getElementById('modal-title').innerText = "Edit Data Terpilih";
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Reset signature saat edit
    modal.classList.remove('modal-hidden');
}


//EXPORT FUNCTIONS
function exportExcel() {
    let table = document.getElementById("data-table").cloneNode(true);
    // Hapus kolom aksi sebelum export
    for (let row of table.rows) { row.deleteCell(-1); }
    
    const url = 'data:application/vnd.ms-excel,' + encodeURIComponent(table.outerHTML);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Laporan_Data.xls";
    link.click();
}

function exportPDF() { window.print(); }
function printData() { window.print(); }