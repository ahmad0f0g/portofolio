document.addEventListener("DOMContentLoaded", function() {
    
    // =========================================
    // 1. FITUR DARK MODE (Local Storage)
    // =========================================
    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;
    
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // =========================================
    // 2. FITUR SCROLLSPY (Intersection Observer API)
    // =========================================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    // Pengaturan jarak sensor gulir (menyesuaikan tinggi navbar)
    const observerOptions = {
        root: null,
        rootMargin: '-65px 0px -70% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hapus penanda aktif dari semua link
                navItems.forEach(item => item.classList.remove('active'));
                
                // Tambahkan penanda aktif hanya pada seksi yang sedang terlihat
                const activeId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-item[href="#${activeId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        observer.observe(sec);
    });

    console.log("Single Page Application siap dijalankan.");
});