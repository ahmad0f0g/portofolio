import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'; // Injeksi JS untuk fungsionalitas Modal
import './style.css';

// 1. Tipe Primitive & Union
type StatusTugas = "Selesai" | "Belum";

// 2. Interface
interface Tugas {
    id: number;
    namaTugas: string;
    matakuliah: string;
    deadline: string;
    status: StatusTugas;
}

// 3. Generics untuk Local Storage (Syarat Penilaian Lanjutan)
function getStorage<T>(key: string, defaultValue: T): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}
function setStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

// 4. Array Berbasis Interface
let daftarTugas: Tugas[] = getStorage<Tugas[]>('dataTugas', []);

// DOM Elements - Form Tambah
const listTugas = document.getElementById('listTugas') as HTMLUListElement;
const btnTambah = document.getElementById('btnTambah') as HTMLButtonElement;
const inputNama = document.getElementById('inputNamaTugas') as HTMLInputElement;
const inputMatkul = document.getElementById('inputMatakuliah') as HTMLInputElement;
const inputDeadline = document.getElementById('inputDeadline') as HTMLInputElement;

// DOM Elements - Modal Edit
const editId = document.getElementById('editId') as HTMLInputElement;
const editNama = document.getElementById('editNama') as HTMLInputElement;
const editMatkul = document.getElementById('editMatkul') as HTMLInputElement;
const editDeadline = document.getElementById('editDeadline') as HTMLInputElement;
const btnSimpanEdit = document.getElementById('btnSimpanEdit') as HTMLButtonElement;

// Instansiasi Modal Bootstrap (Baris declare dihapus untuk mengatasi ts(2440))
const modalInstansi = new bootstrap.Modal(document.getElementById('modalEdit') as HTMLElement);

function renderTugas(): void {
    listTugas.innerHTML = '';
    daftarTugas.forEach(tugas => {
        const isSelesai = tugas.status === 'Selesai';
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center ${isSelesai ? 'list-group-item-success' : 'list-group-item-dark'}`;
        
        li.innerHTML = `
            <div class="text-start">
                <strong>${tugas.namaTugas}</strong> (${tugas.matakuliah})<br>
                <small class="text-muted">Deadline: ${new Date(tugas.deadline).toLocaleString('id-ID')}</small><br>
                <span class="badge ${isSelesai ? 'bg-success' : 'bg-danger'}">${tugas.status}</span>
            </div>
            <div>
                <button class="btn btn-sm btn-success me-1" onclick="toggleStatus(${tugas.id})">✔</button>
                <button class="btn btn-sm btn-warning me-1" onclick="bukaModalEdit(${tugas.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="hapusTugas(${tugas.id})">✖</button>
            </div>
        `;
        listTugas.appendChild(li);
    });
}

// Logika Tambah (Create)
btnTambah.addEventListener('click', () => {
    if (!inputNama.value || !inputMatkul.value || !inputDeadline.value) {
        alert("Harap isi seluruh field data tugas!");
        return;
    }
    const tugasBaru: Tugas = {
        id: Date.now(),
        namaTugas: inputNama.value,
        matakuliah: inputMatkul.value,
        deadline: inputDeadline.value,
        status: "Belum"
    };
    daftarTugas.push(tugasBaru);
    setStorage('dataTugas', daftarTugas);
    inputNama.value = ''; inputMatkul.value = ''; inputDeadline.value = '';
    renderTugas();
});

// Mengekspos fungsi global agar bisa dipanggil dari inline HTML onClick
(window as any).toggleStatus = (id: number) => {
    const index = daftarTugas.findIndex(t => t.id === id);
    if (index !== -1) {
        // Menggunakan tanda seru (!) untuk mengatasi ts(2532)
        daftarTugas[index]!.status = daftarTugas[index]!.status === "Selesai" ? "Belum" : "Selesai";
        setStorage('dataTugas', daftarTugas);
        renderTugas();
    }
};

(window as any).hapusTugas = (id: number) => {
    daftarTugas = daftarTugas.filter(t => t.id !== id);
    setStorage('dataTugas', daftarTugas);
    renderTugas();
};

(window as any).bukaModalEdit = (id: number) => {
    const tugas = daftarTugas.find(t => t.id === id);
    if (tugas) {
        editId.value = tugas.id.toString();
        editNama.value = tugas.namaTugas;
        editMatkul.value = tugas.matakuliah;
        editDeadline.value = tugas.deadline;
        modalInstansi.show();
    }
};

// Logika Simpan Update
btnSimpanEdit.addEventListener('click', () => {
    const id = parseInt(editId.value);
    const index = daftarTugas.findIndex(t => t.id === id);
    if (index !== -1) {
        // Menggunakan tanda seru (!) untuk mengatasi ts(2532)
        daftarTugas[index]!.namaTugas = editNama.value;
        daftarTugas[index]!.matakuliah = editMatkul.value;
        daftarTugas[index]!.deadline = editDeadline.value;
        setStorage('dataTugas', daftarTugas);
        renderTugas();
        modalInstansi.hide();
    }
});

// Render awal saat halaman dimuat
renderTugas();