document.addEventListener("DOMContentLoaded", function() {
    
    // 1. FITUR DARK MODE
    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Cek preferensi di Local Storage saat halaman dimuat
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Logika ketika tombol ditekan (jika tombol tersedia di halaman)
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            // Simpan preferensi ke Local Storage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 2. FITUR ACTIVE LINK INDICATOR
    // Membaca URL saat ini
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.action-buttons .btn');
    
    navLinks.forEach(link => {
        // Jika atribut href pada tombol cocok dengan URL yang sedang dibuka
        if (link.getAttribute('href').includes(currentPath.split('/').pop())) {
            link.classList.add('active');
        }
    });

    console.log("Fungsi Dark Mode & Active Link berhasil dimuat.");
});