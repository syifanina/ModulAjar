// Animasi titik-titik (typing effect) di akhir kalimat
const dotsElement = document.getElementById('dots');
let dotsCount = 0;

function animateDots() {
    dotsCount = (dotsCount + 1) % 4;
    let dotsText = "";
    for (let i = 0; i < dotsCount; i++) {
        dotsText += ".";
    }
    dotsElement.textContent = dotsText;
}

// Menjalankan animasi setiap 500ms
setInterval(animateDots, 500);

// Log tambahan di konsol untuk pengecekan
console.log("Halaman pemeliharaan Bu Syifa sedang berjalan...");
