/**
 * Script for Wujud Zat Interactive Website
 */

// Function to handle navigation between slides (menus)
function navigateTo(targetId) {
    // 1. Hide all slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // 2. Show the target slide
    const targetSlide = document.getElementById(targetId);
    if (targetSlide) {
        targetSlide.classList.add('active');
    }

    // 3. Scroll to top (useful for mobile)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add some interactive sound effects (optional future enhancement)
// We can attach click listeners to all buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Placeholder for click sound
            // let clickSound = new Audio('click.mp3');
            // clickSound.play();
        });
    });

    // Handle card click for mobile (to force flip if hover is not working)
    // On mobile, the CSS already stacks them, but this adds a fun interaction if needed.
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function () {
            this.classList.toggle('flipped');
        });
    });
});

// ==============================================
// DIAGRAM ANIMATION LOGIC
// ==============================================
let currentAnimationId = null;
let particleTimeout = null;

function playAnimation(pathId, labelName, energy) {
    // Cancel previous animation if any
    if (currentAnimationId) {
        window.cancelAnimationFrame(currentAnimationId);
    }
    if (particleTimeout) {
        clearTimeout(particleTimeout);
    }

    const path = document.getElementById(pathId);
    const particle = document.getElementById('anim-particle');
    const msg = document.getElementById('anim-message');
    const energyInfoBox = document.getElementById('energy-info');
    const energyIcon = document.getElementById('energy-icon');
    const energyText = document.getElementById('energy-text');

    if (!path || !particle) return;

    // Reset all paths
    document.querySelectorAll('.diagram-path').forEach(p => {
        p.classList.remove('active');
        p.setAttribute('marker-end', 'url(#arrowhead)');
    });

    // Highlight current path
    path.classList.add('active');
    path.setAttribute('marker-end', 'url(#arrowhead-active)');

    // Show message
    msg.textContent = "✨ Peristiwa: " + labelName + " ✨";
    msg.classList.add('show');

    // Show energy info
    if (energyInfoBox && energy) {
        if (energy === 'memerlukan') {
            energyInfoBox.className = 'energy-info memerlukan';
            energyIcon.innerHTML = '<i class="fa-solid fa-fire"></i>';
            energyText.textContent = 'Memerlukan Energi Panas';
        } else if (energy === 'melepaskan') {
            energyInfoBox.className = 'energy-info melepaskan';
            energyIcon.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
            energyText.textContent = 'Melepaskan Energi Panas';
        }
        energyInfoBox.style.display = 'flex';
    } else if (energyInfoBox) {
        energyInfoBox.style.display = 'none';
    }

    // Prepare animation
    const pathLength = path.getTotalLength();
    particle.style.opacity = 1;

    let start = null;
    const duration = 1500; // 1.5 seconds duration for the particle to travel

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const ratio = Math.min(progress / duration, 1);

        // Get the coordinates along the SVG path
        const pt = path.getPointAtLength(ratio * pathLength);
        particle.setAttribute('cx', pt.x);
        particle.setAttribute('cy', pt.y);

        if (progress < duration) {
            currentAnimationId = window.requestAnimationFrame(step);
        } else {
            // Finished
            currentAnimationId = null;
            particleTimeout = setTimeout(() => {
                particle.style.opacity = 0; // Fade out particle
            }, 1000);
        }
    }

    currentAnimationId = window.requestAnimationFrame(step);
}

// ==============================================
// QUIZ GAME LOGIC
// ==============================================

const quizData = {
    1: [
        {
            question: "Pernyataan berikut yang benar mengenai zat adalah ....",
            options: [
                "A. sesuatu yang menempati ruang dan memilki bentuk",
                "B. sesuatu yang menempati ruang dan memiliki massa",
                "C. sesuatu yang menempati ruang, memiliki massa dan memiliki volume",
                "D. sesuatu yang menempati ruang, memiliki massa, dan memiliki bentuk"
            ],
            correctIndex: 1, // B
            explanation: "Zat atau materi memiliki dua ciri utama: menempati ruang (mempunyai volume) dan memiliki massa."
        },
        {
            question: "Es batu yang dipanaskan akan berubah menjadi air. Dari peristiwa tersebut diketahui bahwa sifat zat cair adalah ....",
            options: [
                "A. bentuk tetap, volume berubah",
                "B. bentuk berubah, volume tetap",
                "C. bentuk dan volume berubah",
                "D. bentuk dan volume tetap"
            ],
            correctIndex: 1, // B
            explanation: "Air adalah benda cair. Kalau kita tuang air dari botol ke mangkok, bentuknya pasti berubah mengikuti mangkoknya. Tapi, jumlah (volume) airnya tidak bertambah atau berkurang, tetap sama."
        },
        {
            question: "Batu memiliki sifat ....",
            options: [
                "A. susunan molekulnya teratur",
                "B. letak molekul penyusunnya berjauhan",
                "C. molekul-molekul penyusunnya dapat bergerak bebas",
                "D. molekul-molekul penyusunnya terikat dengan lemah"
            ],
            correctIndex: 0, // A
            explanation: "Batu adalah benda padat. Di dalam benda padat, partikel-partikel penyusunnya berbaris sangat rapat, rapi, dan teratur. Makanya batu sangat keras."
        },
        {
            question: "Perhatikan gambar susunan partikel di bawah ini!<br><br>Dari gambar tersebut, susunan molekul kaca, minyak dan asap berturut-turut adalah ....",
            hasImage: true,
            options: [
                "A. 1, 2 dan 3",
                "B. 2, 3 dan 1",
                "C. 2, 1 dan 3",
                "D. 3, 2 dan 1"
            ],
            correctIndex: 2, // C
            explanation: "Kaca adalah benda padat (Gambar 2 partikelnya sangat rapat). Minyak adalah benda cair (Gambar 1 partikelnya agak renggang). Asap adalah gas (Gambar 3 partikelnya sangat berjauhan)."
        },
        {
            question: "Zat berikut yang tergolong zat padat adalah ....",
            options: [
                "A. bensin, air raksa, dan minyak tanah",
                "B. udara, oksigen, dan karbondioksida",
                "C. gula, es, dan pasir",
                "D. hand sanitizer, sirup, dan es serut"
            ],
            correctIndex: 2, // C
            explanation: "Gula, es, dan pasir wujudnya selalu tetap dan tidak mengalir seperti air. Pilihan A dan D kebanyakan benda cair, sedangkan pilihan B adalah benda gas."
        },
        {
            question: "Pernyataan yang benar mengenai partikel penyusun garam adalah ...",
            options: [
                "A. bentuknya berubah-ubah, letak partikelnya diam",
                "B. bentuknya teratur, dan letak partikelnya berubah-ubah",
                "C. bentuknya tetap, letak partikelnya berjauhan dan teratur",
                "D. bentuknya tetap, letak partikelnya berdekatan dan teratur"
            ],
            correctIndex: 3, // D
            explanation: "Garam adalah benda padat. Bentuknya pasti tetap, tidak berubah sendiri. Partikel di dalamnya juga tersusun sangat berdekatan dan rapi."
        },
        {
            question: "Benda-benda berikut yang termasuk ke dalam zat cair adalah...",
            options: [
                "A. Papan tulis, meja, dan kursi",
                "B. Sirup, darah, dan jus buah",
                "C. Kaca, udara, dan uap",
                "D. Oksigen, uap, dan asap"
            ],
            correctIndex: 1, // B
            explanation: "Ketiga benda ini wujudnya cair karena basah, bisa tumpah, mengalir, dan bentuknya akan selalu mengikuti wadahnya."
        },
        {
            question: "Perhatikan sifat-sifat zat berikut.<br>1. Ikatan antar partikel sangat lemah.<br>2. Jarak antar partikel berjauhan.<br>3. Bentuk dan volumenya tidak tetap.<br>Berdasarkan data di atas, Zat yang memiliki sifat-sifat tersebut adalah...",
            options: [
                "A. air",
                "B. pasir pantai",
                "C. kertas",
                "D. asap pabrik"
            ],
            correctIndex: 3, // D
            explanation: "Sifat-sifat yang disebutkan (partikel berjauhan dan menyebar ke mana-mana) adalah ciri benda gas. Asap pabrik adalah satu-satunya benda gas dari pilihan tersebut."
        },
        {
            question: "Ihsan mendata zat-zat sebagai berikut:<br>1. Gula, 2. Lilin, 3. Bensin, 4. Kapur, 5. Aluminium, 6. Minyak.<br>Dari zat-zat di atas, yang bukan zat padat dan gas adalah ....",
            options: [
                "A. 1) dan 2)",
                "B. 1) dan 4)",
                "C. 3) dan 6)",
                "D. 5) dan 6)"
            ],
            correctIndex: 2, // C
            explanation: "Yang ditanya 'bukan zat padat dan bukan gas', berarti zat cair. Dari daftar, yang bentuknya cair hanyalah Bensin (nomor 3) dan Minyak (nomor 6)."
        },
        {
            question: "Parfum dari kejauhan dapat tercium baunya oleh hidung kita karena ....",
            options: [
                "A. partikel gas bergerak",
                "B. partikel gas tidak bergerak",
                "C. hidung dapat mencium baru dari jarak jauh",
                "D. partikel gas memiliki gaya tarik yang sangat kuat"
            ],
            correctIndex: 0, // A
            explanation: "Wangi parfum menyebar lewat udara (benda gas). Partikel gas sangat bebas berterbangan dan bergerak ke segala arah sampai terhirup."
        }
    ],
    2: [
        {
            question: "Garam yang larut dalam air dapat berubah kembali menjadi garam padat dengan cara ...",
            options: [
                "A. pengembunan",
                "B. penguapan",
                "C. pendinginan",
                "D. pengasapan"
            ],
            correctIndex: 1, // B
            explanation: "Kalau air garam dipanaskan, airnya akan menguap dan hilang, menyisakan butiran garam padat. Ini cara petani garam di pinggir laut!"
        },
        {
            question: "Perubahan bentuk gas menjadi padat disebut....",
            options: [
                "A. menyublim",
                "B. deposisi",
                "C. menguap",
                "D. mencair"
            ],
            correctIndex: 1, // B
            explanation: "Perubahan wujud dari benda gas langsung menjadi benda padat disebut deposisi (atau mengkristal)."
        },
        {
            question: "Saat terjadinya hujan ada perubahan wujud dari awan menjadi titik-titik hujan. Perubahan wujud ini terjadi karena proses ...",
            options: [
                "A. penguapan",
                "B. pengembunan",
                "C. pembekuan",
                "D. pembusukan"
            ],
            correctIndex: 1, // B
            explanation: "Awan berisi uap air (gas). Saat udara dingin, uap air ini berubah wujud menjadi titik-titik air (cair). Proses ini disebut mengembun."
        },
        {
            question: "Contoh dari penyubliman adalah ...",
            options: [
                "A. es",
                "B. kamper",
                "C. air mendidih",
                "D. gula"
            ],
            correctIndex: 1, // B
            explanation: "Menyublim adalah perubahan padat langsung menjadi gas. Kamper padat mengecil dan habis karena berubah menjadi gas wangi di udara."
        },
        {
            question: "Benda di bawah ini yang mengalami perubahan wujud jika dipanaskan adalah ...",
            options: [
                "A. air dan kerikil",
                "B. kayu dan plastik",
                "C. margarin dan aspal",
                "D. besi dan kayu"
            ],
            correctIndex: 2, // C
            explanation: "Margarin dan aspal awalnya padat. Tapi kalau terkena panas, keduanya akan sangat mudah meleleh atau mencair."
        },
        {
            question: "Benda padat dapat berubah menjadi benda gas. Benda di bawah ini yang dapat berubah seperti pernyataan tersebut adalah ....",
            options: [
                "A. es batu",
                "B. batu apung",
                "C. kamper",
                "D. batu karang"
            ],
            correctIndex: 2, // C
            explanation: "Sama seperti soal sebelumnya, kamper adalah benda padat yang bisa langsung menjadi gas (menyublim) tanpa harus meleleh jadi cair dulu."
        },
        {
            question: "Besi yang dipanaskan secara terus- menerus akan berubah seperti bubur. Perubahan wujud tersebut dinamakan dengan ...",
            options: [
                "A. Mencair",
                "B. Melebur",
                "C. Menguap",
                "D. Menyublim"
            ],
            correctIndex: 1, // B
            explanation: "Proses perubahan benda logam yang sangat keras seperti besi dari padat menjadi cair kental karena panas ekstrim sering disebut melebur."
        },
        {
            question: "Contoh perubahan wujud gas mejadi padat adalah ....",
            options: [
                "A. kapur barus yang disimpan di lemari lama kelamaan habis",
                "B. gas iodium yang didinginkan dalam tabung reaksi",
                "C. semprong lampu menjadi hitam",
                "D. terjadinya bunga es di kulkas"
            ],
            correctIndex: 3, // D
            explanation: "Bunga es di dinding freezer kulkas berasal dari uap air (gas) yang sangat kedinginan dan langsung berubah menjadi kristal-kristal es (padat)."
        },
        {
            question: "Pada proses pengelasan logam terjadi peristiwa ....",
            options: [
                "A. pelelehan",
                "B. pembekuan",
                "C. penguapan",
                "D. penyubliman"
            ],
            correctIndex: 0, // A
            explanation: "Panas las membuat ujung logam yang padat menjadi leleh/cair sesaat (pelelehan) agar bisa menempel kuat dengan logam lainnya."
        },
        {
            question: "Peristiwa perubahan wujud yang paling tepat adalah ....",
            options: [
                "A. Es batu yang dipanaskan = Menyublim",
                "B. Tetes air di atas daun pada pagi hari = Menguap",
                "C. Uap air menjadi salju = Mengkristal",
                "D. Kapur barus lama-kelamaan akan habis = Menguap"
            ],
            correctIndex: 2, // C
            explanation: "Hanya pilihan C yang benar (gas jadi padat = mengkristal/deposisi). Es harusnya mencair, embun pagi itu mengembun, dan kapur barus itu menyublim."
        }
    ],
    3: [
        {
            question: "Semua yang memiliki massa dan menempati ruang disebut ....",
            options: [
                "A. materi / zat",
                "B. energi",
                "C. berat",
                "D. gas"
            ],
            correctIndex: 0,
            explanation: "Di dalam pelajaran sains, segala sesuatu di sekeliling kita yang menempati ruang (punya volume) dan bisa ditimbang (punya massa/berat) disebut materi atau zat."
        },
        {
            question: "Zat yang memiliki gaya tarik menarik antar partikel yang sangat kuat adalah...",
            options: [
                "A. Padat",
                "B. Cair",
                "C. Gas",
                "D. Udara"
            ],
            correctIndex: 0,
            explanation: "Benda padat sangat keras dan bentuknya tidak mudah berubah karena partikel-partikel di dalamnya saling berpegangan dengan sangat kuat dan rapat."
        },
        {
            question: "Pernyataan berikut ini yang tidak benar mengenai sifat gas...",
            options: [
                "A. Gaya tarik menarik antar partikel sangat lemah",
                "B. Jarak partikel berjauhan",
                "C. Gerak partikel bebas dan acak",
                "D. Bentuk dan volume tetap"
            ],
            correctIndex: 3,
            explanation: "Sifat utama gas adalah bentuk dan ukurannya (volume) selalu berubah-ubah menyesuaikan wadahnya. Jadi, pernyataan bahwa bentuk dan volumenya tetap itu salah."
        },
        {
            question: "Perhatikan sifat benda berikut:<br>1. Susunan sangat rapat, bergetar di tempat.<br>3. Volume dan bentuk tetap.<br><br>Perhatikan sifat lainnya:<br>2. Mudah berubah bentuk dan volume.<br>4. Gaya tarik antar molekul sangat lemah.<br><br>Sifat zat padat dan gas berturut-turut ditunjukkan oleh nomor ....",
            options: [
                "A. 1), 2) dan 2), 5)",
                "B. 1), 3) dan 2), 4)",
                "C. 1), 4) dan 3), 5)",
                "D. 1), 3) dan 4), 5)"
            ],
            correctIndex: 1,
            explanation: "Zat padat ditunjukkan oleh nomor 1 dan 3. Zat gas ditunjukkan oleh nomor 2 dan 4."
        },
        {
            question: "Perhatikan peristiwa berikut:<br>1. kayu terbakar menjadi arang<br>2. sayur menjadi basi<br>3. air laut menjadi garam<br>4. besi berkarat<br>Perubahan kimia ditunjukkan oleh kelompok nomor ....",
            options: [
                "A. 1), 2), dan 3)",
                "B. 1), 2), dan 4)",
                "C. 1), 3), dan 4)",
                "D. 2), 3), dan 4)"
            ],
            correctIndex: 1,
            explanation: "Perubahan kimia menghasilkan zat baru (kayu jadi arang, sayur basi, besi berkarat). Air laut menjadi garam hanya menguap (perubahan fisika)."
        },
        {
            question: "Manakah hubungan peristiwa perubahan wujud zat yang sesuai?<br>1. es dipanaskan jadi air (mencair)<br>3. uap didinginkan jadi air (mengembun)<br>5. lilin cair didinginkan jadi keras (membeku)",
            options: [
                "A. 1, 3, 5",
                "B. 2, 3, 4",
                "C. 3, 5, 2",
                "D. 4, 3, 2"
            ],
            correctIndex: 0,
            explanation: "Es mencair (1), uap mengembun (3), dan cairan membeku (5) adalah pasangan yang benar."
        },
        {
            question: "Terjadinya hujan dari kumpulan awan di langit merupakan contoh perubahan wujud...",
            options: [
                "A. Menguap",
                "B. Mengkristal",
                "C. Melebur",
                "D. Mengembun"
            ],
            correctIndex: 3,
            explanation: "Awan berisi uap air (gas). Saat udara dingin, uap air ini berubah menjadi titik-titik air (cair) yang disebut mengembun."
        },
        {
            question: "Contoh perubahan wujud dari padat menjadi gas adalah ....",
            options: [
                "A. bunga es dalam freezer kulkas",
                "B. rumput laut yang direndam menjadi cair",
                "C. gas yang keluar dari knalpot mobil",
                "D. kapur barus di lemari pakaian menjadi wangi"
            ],
            correctIndex: 3,
            explanation: "Kapur barus adalah benda padat yang bisa langsung berubah menjadi gas wangi (menyublim)."
        },
        {
            question: "Manakah dari peristiwa berikut yang menunjukkan zat dapat memiliki tiga wujud (padat, cair, gas)?",
            options: [
                "A. es dipanaskan hingga mendidih",
                "B. balon ditiup hingga menggembung",
                "C. lilin mainan dipanaskan hingga mencair",
                "D. ban sepeda dipompa hingga meledak"
            ],
            correctIndex: 0,
            explanation: "Es (padat) jika dipanaskan akan mencair (cair), dan jika dipanaskan terus hingga mendidih akan menjadi uap air (gas)."
        },
        {
            question: "Pada bagan perubahan wujud, panah yang mengarah dari wujud <b>GAS</b> langsung menuju ke wujud <b>PADAT</b> melambangkan peristiwa ....",
            options: [
                "A. mencair",
                "B. menguap",
                "C. membeku",
                "D. mengkristal"
            ],
            correctIndex: 3,
            explanation: "Perubahan wujud dari benda gas langsung menjadi benda padat disebut mengkristal atau deposisi."
        }
    ],
    4: [
        {
            question: "Perhatikan tabel sifat benda berikut:<br>1. Bentuk berubah, Volume tetap, Gaya agak kuat<br>3. Bentuk tetap, Volume tetap, Gaya sangat kuat<br>5. Bentuk berubah, Volume berubah, Gaya sangat lemah<br><br>Sifat fisik benda gas, benda padat, dan benda cair berturut-turut ditunjukkan oleh nomor ....",
            options: [
                "A. 1, 2, dan 4",
                "B. 4, 3, dan 1",
                "C. 5, 3, dan 1",
                "D. 5, 3, dan 4"
            ],
            correctIndex: 2,
            explanation: "Gas (5): bentuk dan volume berubah-ubah. Padat (3): bentuk dan volume tetap. Cair (1): bentuk berubah mengikuti wadah namun volume tetap."
        },
        {
            question: "Berdasarkan skema, wujud zat dan perubahan wujud zat yang benar ditunjukkan oleh pilihan ....",
            options: [
                "A. Gas, Cair, Mengkristal (Melepaskan kalor), Membeku (Menerima kalor)",
                "B. Cair, Gas, Membeku (Melepaskan kalor), Mengkristal (Melepaskan kalor)",
                "C. Cair, Gas, Mengkristal (Menerima kalor), Membeku (Menerima kalor)",
                "D. Gas, Cair, Membeku (Menerima kalor), Mengkristal (Melepaskan kalor)"
            ],
            correctIndex: 1,
            explanation: "Padat yang melebur menjadi Cair. Padat menyublim menjadi Gas. Cair ke Padat disebut Membeku (melepas kalor). Gas ke padat disebut Mengkristal (melepas kalor)."
        },
        {
            question: "Pasangan yang tepat antara peristiwa dan jenis perubahannya ditunjukkan oleh nomor ....<br>1) Kertas dibuat origami (Kimia)<br>2) Irisan apel menjadi cokelat (Fisik)<br>3) Beras ketan difermentasi jadi tapai (Fisika)<br>4) Telur bebek dibuat telur asin (Kimia)<br>5) Kapur barus menyublim (Fisika)<br>6) Susu dibuat jadi keju (Kimia)",
            options: [
                "A. 1), 2), dan 3)",
                "B. 1), 4), dan 6)",
                "C. 2), 3), dan 5)",
                "D. 4), 5), dan 6)"
            ],
            correctIndex: 3,
            explanation: "Origami (Fisika), apel cokelat (Kimia), tapai (Kimia). Yang benar adalah telur asin (Kimia), kapur barus (Fisika), dan susu jadi keju (Kimia)."
        },
        {
            question: "Jika segelas air sirop dipindahkan dari satu tempat ke tempat yang lain, maka volumenya tetap tetapi bentuknya berubah sesuai bentuk tempatnya yang baru. Hal ini disebabkan oleh ....",
            options: [
                "A. jarak antar molekul renggang (tolak menolak kuat)",
                "B. ukuran partikel sangat kecil (hanya bergetar di tempat)",
                "C. jarak antar partikel sangat rapat (bergerak bebas)",
                "D. gaya tarik antar molekul agak lemah (bebas tapi terbatas)"
            ],
            correctIndex: 3,
            explanation: "Sifat zat cair adalah letaknya berdekatan namun tidak serapat padat. Gaya tariknya agak lemah sehingga bebas bergerak (mengalir) tetapi tetap bergerombol terbatas (volume tetap)."
        },
        {
            question: "Harits mengamati benda yang memiliki sifat-sifat berikut!<br>1. Susunan molekul tidak teratur.<br>2. Letak molekul berdekatan.<br>3. Dapat berpindah tempat.<br><br>Berdasarkan sifat-sifat zat yang disebutkan, benda yang diamati Harits adalah ....",
            options: [
                "A. air",
                "B. asap",
                "C. pensil",
                "D. penggaris"
            ],
            correctIndex: 0,
            explanation: "Molekul tidak teratur & letak berdekatan adalah sifat zat cair. Di antara pilihan, yang merupakan zat cair hanyalah air."
        }
    ],
    5: [
        {
            question: "<b>Membantu Ibu Membuat Es Lilin</b><br>Pada siang hari yang terik, Ani membantu ibunya membuat es lilin rasa mangga. Ibu merebus larutan jus mangga dan gula hingga mendidih, lalu mendinginkannya. Setelah dingin, larutan tersebut dimasukkan ke dalam plastik-plastik kecil. Ani kemudian memasukkan semua plastik berisi cairan tersebut ke dalam freezer. Setelah ditunggu 4 jam, cairan jus berubah menjadi es lilin yang padat dan segar.<br><br>Perubahan wujud benda yang terjadi saat cairan es lilin berubah menjadi padat di dalam freezer adalah ....",
            options: [
                "A. mencair",
                "B. membeku",
                "C. menguap",
                "D. menyublim"
            ],
            correctIndex: 1,
            explanation: "Perubahan wujud dari zat cair menjadi zat padat akibat pelepasan kalor (penurunan suhu atau didinginkan) disebut dengan proses membeku."
        },
        {
            question: "Wira melakukan percobaan melelehkan 250 gram mentega di atas wajan panas.<br><br>Jika merujuk pada Hukum Kekekalan Massa yang menyatakan bahwa perubahan wujud tidak mengubah total massa suatu benda, berapa massa total mentega cair yang dihasilkan setelah mentega tersebut mencair sempurna?",
            options: [
                "A. 150 gram",
                "B. 200 gram",
                "C. 250 gram",
                "D. 300 gram"
            ],
            correctIndex: 2,
            explanation: "Sesuai Hukum Kekekalan Massa, perubahan wujud zat dari padat ke cair tidak akan mengubah total massanya. Jadi massa mentega cair akan tetap 250 gram."
        },
        {
            question: "Peristiwa yang terjadi di pagi hari daun-daun nampak basah, hal ini merupakan peristiwa ....",
            options: [
                "A. membeku",
                "B. mengembun",
                "C. menyublim",
                "D. menguap"
            ],
            correctIndex: 1,
            explanation: "Daun-daun basah di pagi hari terjadi karena uap air (gas) di udara terkena suhu dingin dan berubah menjadi titik-titik air (cair) yang menempel pada daun. Peristiwa gas ke cair ini disebut mengembun."
        },
        {
            question: "<b>Perhatikan teks di bawah ini!</b><br>Salah satu peristiwa menyublim bisa terjadi pada kapur barus. Kapur barus atau kamper merupakan zat padat berbentuk lilin putih yang agak transparan... Zat-zat yang terkandung di dalam kapur barus ini bisa berubah wujud menjadi gas ketika didiamkan beberapa saat di suhu ruangan. Hal itu mengakibatkan berkurangnya massa kapur barus, sehingga ukurannya turut mengecil... Ia akan langsung berubah wujud dari padat menjadi gas tanpa mencair terlebih dahulu.<br><br>Penyebab mengecilnya massa dari kapur barus karena peristiwa menyublim adalah ....",
            options: [
                "A. karena terjadi proses mencair pada kapur barus",
                "B. karena suhu ruangan meningkat sehingga massa kapur barus mengecil",
                "C. karena zat-zat yang terkandung dalam kapur barus bisa berubah wujud menjadi gas",
                "D. karena kapur barus mengeluarkan bau"
            ],
            correctIndex: 2,
            explanation: "Berdasarkan teks, zat-zat dalam kapur barus bisa langsung berubah wujud dari padat menjadi gas ketika didiamkan di suhu ruangan, yang menyebabkan massa dan ukurannya mengecil."
        },
        {
            question: "Berdasarkan teks tentang kapur barus di atas, pernyataan yang <b>tidak sesuai</b> dengan bacaan tersebut adalah ....",
            options: [
                "A. kapur barus mengalami penyubliman",
                "B. kapur barus terbuat dari Naftalena dan Paradichlorobenzene",
                "C. ukuran massa kapur barus dapat berkurang",
                "D. kapur barus berubah wujud dari padat menjadi cair"
            ],
            correctIndex: 3,
            explanation: "Teks menyatakan: 'Ia akan langsung berubah wujud dari padat menjadi gas tanpa mencair terlebih dahulu.' Jadi pilihan D sangat bertentangan dengan teks."
        },
        {
            question: "Sebuah mentega sedang dipanaskan di atas wajan hingga meleleh.<br>Peristiwa yang terjadi seperti tampak pada gambar (mentega yang dipanaskan) tersebut disebut ....",
            options: [
                "A. menguap",
                "B. membeku",
                "C. mencair",
                "D. mengkristal"
            ],
            correctIndex: 2,
            explanation: "Mentega adalah benda padat yang sedang dipanaskan. Akibat menerima panas (kalor), mentega padat tersebut berubah wujud menjadi benda cair (mencair)."
        },
        {
            question: "<b>Pasangkan Kegiatan dan Perubahan Wujudnya!</b><br>1. Memanaskan mentega<br>2. Pembuatan garam<br>3. Memanaskan es krim<br>4. Mendinginkan cokelat<br><br><b>Pilihan:</b> A. mencair, B. membeku, C. menguap, D. mencair<br><br>Pasangan yang tepat antara kegiatan dengan perubahan wujud benda adalah ....",
            options: [
                "A. 1-C, 2-C, 3-D, 4-B",
                "B. 1-B, 2-A, 3-D, 4-C",
                "C. 1-D, 2-C, 3-A, 4-B",
                "D. 1-C, 2-D, 3-A, 4-B"
            ],
            correctIndex: 2,
            explanation: "Memanaskan mentega = mencair (D/A). Garam = menguap (C). Memanaskan es krim = mencair (A/D). Mendinginkan cokelat = membeku (B). Pasangan yang paling tepat adalah C (1-D, 2-C, 3-A, 4-B)."
        },
        {
            question: "Perhatikan pernyataan-pernyataan berikut.<br>1. Meletakkan es batu di suhu ruang<br>2. Membuka botol sanitizer<br>3. Menyimpan cairan agar-agar<br>4. Memanaskan air di dalam panci<br><br>Perubahan wujud zat yang <b>menghasilkan gas</b> ditunjukkan oleh nomor ....",
            options: [
                "A. (1) dan (2)",
                "B. (2) dan (3)",
                "C. (2) dan (4)",
                "D. (3) dan (4)"
            ],
            correctIndex: 2,
            explanation: "Sanitizer yang terbuka akan menguap jadi gas (2). Air yang dipanaskan mendidih juga akan menguap jadi gas (4). Es batu mencair (1) dan agar-agar membeku (3)."
        },
        {
            question: "Sebuah panci berisi air yang sedang dipanaskan di atas kompor terlihat mengeluarkan kepulan uap/asap putih ke atas.<br><br>Peristiwa yang terjadi seperti tampak pada deskripsi tersebut disebut . . . .",
            options: [
                "A. menyublim",
                "B. mengembun",
                "C. menguap",
                "D. mengkristal"
            ],
            correctIndex: 2,
            explanation: "Suhu panas menyebabkan benda cair (air di dalam panci) berubah wujud menjadi benda gas (kepulan uap air yang naik ke atas). Proses ini dinamakan menguap."
        },
        {
            question: "Di pagi hari, terdapat titik-titik air di atas permukaan daun hijau.<br><br>Peristiwa yang terjadi di pagi hari seperti tersebut, merupakan peristiwa . . . .",
            options: [
                "A. membeku",
                "B. mengembun",
                "C. menyublim",
                "D. menguap"
            ],
            correctIndex: 1,
            explanation: "Embun pagi terjadi ketika uap air (berwujud gas) bersentuhan dengan permukaan daun yang bersuhu lebih dingin. Uap air tersebut melepaskan kalor dan berubah wujud menjadi titik-titik air (cair)."
        },
        {
            question: "<b>Mengamati Embun Pagi dan Kapur Barus</b><br>Budi mengamati dua peristiwa:<br>I. Pagi hari, timbul titik-titik air di luar gelas es teh manis.<br>II. Kapur barus di lemari lama-kelamaan mengecil dan habis.<br><br>Manakah pernyataan yang <b>benar</b>?<br>1) Timbulnya embun pada gelas es merupakan proses mengembun.<br>2) Uap air di sekitar gelas mengalami pelepasan panas (kalor) sehingga menempel jadi titik air.<br>3) Kapur barus mencair menjadi zat cair terlebih dahulu sebelum habis.<br>4) Kapur barus mengalami mengkristal (gas menjadi padat).<br><br>Pernyataan yang benar ditunjukkan oleh nomor ....",
            options: [
                "A. 1 dan 2",
                "B. 1 dan 3",
                "C. 2 dan 4",
                "D. 3 dan 4"
            ],
            correctIndex: 0,
            explanation: "Pernyataan 1 dan 2 benar (mengembun karena pelepasan kalor). Pernyataan 3 salah karena kapur barus menyublim tanpa mencair. Pernyataan 4 salah karena menyublim itu padat ke gas, bukan mengkristal."
        },
        {
            question: "Sebuah permukaan benda tampak diselimuti oleh kristal es atau bunga es yang tebal.<br><br>Pernyataan yang <b>benar</b> tentang perubahan wujud benda tersebut adalah . . . .<br>1) Perubahan wujud dari air menjadi gas<br>2) Terjadi perubahan menguap<br>3) Perubahan wujud dari gas menjadi padat<br>4) Terjadi perubahan mengkristal",
            options: [
                "A. 1 dan 2",
                "B. 1 dan 3",
                "C. 2 dan 4",
                "D. 3 dan 4"
            ],
            correctIndex: 3,
            explanation: "Bunga es terjadi ketika uap air (gas) bersentuhan dengan permukaan sangat dingin, sehingga langsung berubah menjadi padat (es) tanpa mencair. Proses ini dinamakan mengkristal/deposisi (pernyataan 3 dan 4 benar)."
        },
        {
            question: "Tampak bongkahan benda padat putih di atas sendok yang mengeluarkan asap pekat/gas (es kering atau dry ice).<br><br>Pernyataan yang <b>benar</b> tentang perubahan benda tersebut adalah . . . .<br>1) Terjadi perubahan wujud menyublim<br>2) Perubahan wujud dari gas menjadi padat<br>3) Perubahan dari zat gas menjadi cair terjadi<br>4) Perubahan dari zat padat menjadi gas",
            options: [
                "A. 1 dan 2",
                "B. 1 dan 4",
                "C. 2 dan 3",
                "D. 3 dan 4"
            ],
            correctIndex: 1,
            explanation: "Benda padat (es kering) sedang berubah wujud menjadi gas (keluar asap tebal). Perubahan wujud langsung dari padat ke gas dinamakan peristiwa menyublim (pernyataan 1 dan 4 benar)."
        },
        {
            question: "Tampak sebuah gelas berisi air panas. Uap panasnya naik ke atas dan membentuk titik-titik air pada bagian bawah tutup gelas.<br><br>Pernyataan yang <b>benar</b> terkait peristiwa di atas adalah . . . .<br>1) Perubahan dari zat gas menjadi cair<br>2) Terjadi perubahan wujud mengkristal<br>3) Perubahan dari zat padat menjadi cair<br>4) Terjadi perubahan wujud mengembun",
            options: [
                "A. 1 dan 2",
                "B. 1 dan 4",
                "C. 2 dan 3",
                "D. 3 dan 4"
            ],
            correctIndex: 1,
            explanation: "Uap air panas (gas) naik menyentuh tutup gelas yang lebih dingin, melepaskan panas dan berubah menjadi titik air (cair). Peristiwa gas ke cair ini dinamakan mengembun (pernyataan 1 dan 4 benar)."
        },
        {
            question: "Isilah titik-titik berikut!<br><br>Proses penguapan terjadi melalui ________ kalor. Menguap adalah proses perubahan wujud benda dari air menjadi ________.",
            options: [
                "A. melepaskan dan padat",
                "B. melepaskan dan gas",
                "C. membutuhkan dan padat",
                "D. membutuhkan dan gas"
            ],
            correctIndex: 3,
            explanation: "Penguapan adalah peristiwa perubahan wujud benda dari air menjadi gas melalui penyerapan atau proses yang membutuhkan kalor."
        },
        {
            question: "Isilah titik-titik berikut!<br><br>Titik-titik air embun yang terbentuk di permukaan tutup panci adalah akibat dari proses ketika ________ yang keluar dari dalam panci bertemu dengan udara yang suhunya ________ di sekitarnya.",
            options: [
                "A. zat cair dan lebih rendah",
                "B. zat cair dan lebih tinggi",
                "C. uap air dan lebih rendah",
                "D. uap air dan lebih tinggi"
            ],
            correctIndex: 2,
            explanation: "Yang keluar saat air direbus adalah uap air. Uap panas ini akan mengembun menjadi titik-titik air saat bersentuhan dengan udara yang suhunya lebih rendah (lebih dingin)."
        },
        {
            question: "Perhatikan gambar kapur barus berikut!<br><br>Isilah titik-titik berikut!<br>Perubahan kapur barus yang tercium wangi oleh kita disebut peristiwa ________.<br>Perubahan wujud yang terjadi adalah dari ________ menjadi ________.",
            options: [
                "A. Mencair | Padat menjadi cair",
                "B. Menyublim | Gas menjadi padat",
                "C. Menyublim | Padat menjadi gas",
                "D. Menguap | Cair menjadi gas"
            ],
            correctIndex: 2,
            explanation: "Kapur barus (padat) yang dibiarkan di ruang terbuka akan menyebar di udara jadi gas (wanginya tercium). Peristiwa perubahan dari padat langsung ke gas ini disebut menyublim."
        },
        {
            question: "Perhatikan gambar baju yang sedang dijemur!<br><br>Isilah titik-titik berikut!<br>Perubahan wujud dari air yang ada di baju (benda cair) menjadi uap di udara disebut ________.<br>Air yang terdapat di dalam baju basah tersebut bisa berubah wujud karena ________ kalor dari matahari.",
            options: [
                "A. Menguap | Menerima (Menyerap)",
                "B. Menguap | Melepaskan",
                "C. Mengembun | Menerima (Menyerap)",
                "D. Mengembun | Melepaskan"
            ],
            correctIndex: 0,
            explanation: "Proses berubahnya air (cair) menjadi uap air (gas) disebut menguap. Pakaian basah menjadi kering karena air di dalamnya menyerap/menerima kalor (panas) dari matahari sehingga menguap."
        }
    ],
    6: [
        {
            question: "What is a disease?",
            options: [
                "A. a type of weather",
                "B. a kind of toy",
                "C. something that makes people or animals sick",
                "D. a type of food"
            ],
            correctIndex: 2,
            explanation: "Disease berarti penyakit, yaitu suatu kondisi yang membuat tubuh manusia, hewan, atau tumbuhan menjadi sakit dan tidak berfungsi dengan normal."
        },
        {
            question: "Tiny living things that can cause diseases are called ...",
            options: [
                "A. nutrients",
                "B. organs",
                "C. germs",
                "D. muscles"
            ],
            correctIndex: 2,
            explanation: "Makhluk hidup mikroskopis yang menjadi penyebab penyakit menular disebut kuman (germs), seperti bakteri atau virus."
        },
        {
            question: "Which of the following is an example of an infectious disease?",
            options: [
                "A. Flu",
                "B. broken leg",
                "C. Tooth cavity from eating too much sugar",
                "D. Muscle pain after running"
            ],
            correctIndex: 0,
            explanation: "Flu adalah contoh penyakit menular (infectious disease) yang disebabkan oleh virus. Pilihan lainnya adalah cedera fisik atau masalah kesehatan yang tidak menular."
        },
        {
            question: "How can flu or cold germs spread from one person to another?",
            options: [
                "A. Through the air when someone coughs or sneezes",
                "B. By reading a book together",
                "C. By looking at a sick person",
                "D. By sleeping early"
            ],
            correctIndex: 0,
            explanation: "Kuman flu sangat mudah menular melalui udara lewat percikan cairan (droplet) saat penderita batuk atau bersin."
        },
        {
            question: "What happens to a plant's leaves when it has an infectious plant disease?",
            options: [
                "A. They always produce more fruits",
                "B. They may droop, turn yellow, or get brown spots",
                "C. They turn bright blue",
                "D. They grow much faster"
            ],
            correctIndex: 1,
            explanation: "Tanaman yang terkena penyakit biasanya menunjukkan gejala fisik seperti layu (droop), daun menguning (turn yellow), atau muncul bercak cokelat (brown spots)."
        },
        {
            question: "Which of these is a sign of a sick animal?",
            options: [
                "A. Eating healthily and running actively",
                "B. Having shiny fur and clear eyes",
                "C. Being inactive, loss of appetite, or coughing",
                "D. Sleeping normally at night"
            ],
            correctIndex: 2,
            explanation: "Hewan yang sedang sakit biasanya akan menunjukkan perilaku menurun. Gejala umumnya meliputi lesu (inactive), tidak mau makan (loss of appetite), atau batuk (coughing)."
        },
        {
            question: "What is the most effective way to prevent germs from entering our body after playing outside?",
            options: [
                "A. Wiping hands on clothes",
                "B. Washing hands with soap and clean water",
                "C. Drinking cold water",
                "D. Rubbing hands together"
            ],
            correctIndex: 1,
            explanation: "Cara paling efektif dan terbukti secara medis untuk membunuh kuman di tangan setelah beraktivitas adalah mencuci tangan menggunakan sabun dan air mengalir."
        },
        {
            question: "Why do doctors give us medicine when we are sick?",
            options: [
                "A. To make the disease stronger",
                "B. To help our body feel better and kill germs",
                "C. To prevent us from sleeping",
                "D. To change our blood color"
            ],
            correctIndex: 1,
            explanation: "Tujuan utama pemberian obat adalah untuk meredakan gejala agar tubuh terasa lebih nyaman dan mematikan kuman penyebab penyakit."
        },
        {
            question: "What is the main purpose of a vaccine?",
            options: [
                "A. To cure a toothache instantly",
                "B. To give our body immunity against specific diseases",
                "C. To feed the body with vitamins",
                "D. To repair broken bones"
            ],
            correctIndex: 1,
            explanation: "Vaksin berfungsi untuk melatih sistem kekebalan tubuh agar mengenali dan kebal (immunity) terhadap penyakit atau virus tertentu sebelum tubuh benar-benar terinfeksi."
        },
        {
            question: "Which of these is a non-infectious condition?",
            options: [
                "A. Chickenpox",
                "B. Covid-19",
                "C. Asthma",
                "D. measles"
            ],
            correctIndex: 2,
            explanation: "Asma adalah penyakit kronis pada saluran pernapasan yang tidak disebabkan oleh infeksi kuman/virus, sehingga tidak menular (non-infectious). Pilihan lainnya adalah penyakit menular."
        },
        {
            question: "Read the table below about common diseases and answer the question.<br><br>Based on the table, Lanika has itchy red spots on her skin and a fever. Her illness can easily spread to her classmates. What disease does Sarah most likely have?",
            options: [
                "A. Influenza",
                "B. Asthma",
                "C. Chickenpox",
                "D. Food Poisoning"
            ],
            correctIndex: 2,
            explanation: "Berdasarkan gejala yang dialami (bintik merah gatal dan demam), kondisi tersebut paling cocok dengan gejala cacar air (chickenpox) yang juga merupakan penyakit menular."
        },
        {
            question: "A farmer recorded health conditions of crops and animals in his farm.<br><br>Which of the following conclusions are VALID based on the table?<br>1) Tomato plants in Field A show physical signs of plant disease<br>2) Chickens in Barn D are healthy because they eat less food.<br>3) Loss of appetite and inactivity can be signs of illness in animals.<br>4) Corn plants in Field B need medicine immediately.",
            options: [
                "A. 1 and 2",
                "B. 1 and 3",
                "C. 2 and 4",
                "D. 3 and 4"
            ],
            correctIndex: 1,
            explanation: "(1) Tanaman tomat di Ladang A terbukti berpenyakit dengan gejala daun menguning dan layu. (3) Ayam di Kandang D berstatus sakit dengan gejala tidak aktif dan hilang nafsu makan, membuktikan hal itu adalah tanda penyakit."
        },
        {
            question: "A health study observed 100 vaccinated children and 100 unvaccinated children over one year to see how many caught the measles virus:<br>• Group A (Vaccinated - 100 children): 5 children caught measles.<br>• Group B (Unvaccinated - 100 children): 40 children caught measles.<br><br>Which statements correctly interpret this data?<br>1) Vaccinated children were significantly less likely to catch measles.<br>2) 5 more children caught measles in the unvaccinated group compared to the vaccinated group.<br>3) Vaccines guarantee that 100% of children will never catch any illness.<br>4) Vaccines help reduce the spread of infectious diseases in a population.",
            options: [
                "A. 1 and 2",
                "B. 1 and 4",
                "C. 2 and 3",
                "D. 3 and 4"
            ],
            correctIndex: 1,
            explanation: "(1) Data membuktikan anak yang divaksin tertular jauh lebih sedikit dibanding yang tidak divaksin. (4) Penurunan angka penularan membuktikan bahwa vaksin efektif menekan penyebaran penyakit."
        },
        {
            question: "Look at the table below showing how the number of bacteria on unwashed hands increases over time at room temperature.<br><br>Based on the table, which of the following statements are CORRECT?<br>1) The number of bacteria doubles every 20 minutes.<br>2) After 60 minutes, there are 800 bacteria on unwashed hands.<br>3) At 80 minutes, if the pattern continues, the estimated number of bacteria will be 1.400.<br>4) Washing hands at minute 40 will increase the number of bacteria.",
            options: [
                "A. 1 and 2",
                "B. 1 and 3",
                "C. 2 and 4",
                "D. 3 and 4"
            ],
            correctIndex: 0,
            explanation: "(1) Berdasarkan tabel, jumlah bakteri selalu dikali dua (berlipat ganda) setiap interval 20 menit (100 -> 200 -> 400 -> 800). (2) Sesuai data, pada menit ke-60 jumlah bakteri persis berada di angka 800."
        },
        {
            question: "Last week, Grade 4 at SD Harapan had a flu outbreak. Influenza is an infectious disease caused by a virus that spreads easily through coughs and sneezes.<br><br>There are 30 students in Grade 4. On Monday, 3 students got sick with the flu and stayed home. On Tuesday, 3 more students got infected. By Wednesday, 6 additional students showed symptoms and couldn't attend school.<br><br>To prevent the virus from spreading further, the school doctor advised all students to wash their hands frequently with soap, wear masks, and get a flu vaccine. By Friday, thanks to these preventive measures, no new students fell sick, and some students began to recover.<br><br>Based on the text above, select the correct statements below:<br>1) Washing hands with soap and wearing masks are effective ways to prevent the spread of the flu virus.<br>2) By Wednesday, a total of 12 students in Grade 4 had caught the flu.<br>3) More than 50% of the total students in Grade 4 got sick by Wednesday.<br>4) Influenza is a non-infectious disease that cannot spread from one person to another.",
            options: [
                "A. 1 and 2",
                "B. 1 and 3",
                "C. 2 and 4",
                "D. 3 and 4"
            ],
            correctIndex: 0,
            explanation: "(1) Teks menyatakan bahwa anjuran mencuci tangan dan memakai masker membuat tidak ada siswa baru yang jatuh sakit. (2) Total siswa yang sakit hingga hari Rabu dijumlahkan dari: 3 (Senin) + 3 (Selasa) + 6 (Rabu) = 12 siswa."
        }
    ]
};

let currentLevel = 1;
let currentQuestionIndex = 0;
let lives = 2;
let score = 0;

function startQuiz(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById('quiz-level-selection').style.display = 'none';
    document.getElementById('quiz-playground').style.display = 'block';
    document.getElementById('result-modal').style.display = 'none';

    loadQuestion();
}

function exitQuiz() {
    document.getElementById('quiz-playground').style.display = 'none';
    document.getElementById('quiz-level-selection').style.display = 'block';
}

function loadQuestion() {
    const qData = quizData[currentLevel][currentQuestionIndex];
    lives = 2;
    updateLivesUI();

    document.getElementById('current-q-num').textContent = currentQuestionIndex + 1;
    document.getElementById('total-q-num').textContent = quizData[currentLevel].length;
    document.getElementById('quiz-progress-fill').style.width = `${((currentQuestionIndex) / quizData[currentLevel].length) * 100}%`;

    document.getElementById('question-text').innerHTML = `${currentQuestionIndex + 1}. ${qData.question}`;
    document.getElementById('explanation-modal').style.display = 'none';

    const imgContainer = document.getElementById('question-image');
    if (qData.hasImage) {
        // Build particle visuals for Q4
        imgContainer.style.display = 'block';
        imgContainer.innerHTML = `
            <div class="particle-box" data-label="Gambar 1">
                ${generateParticles(15, 10, 70)}
            </div>
            <div class="particle-box" data-label="Gambar 2">
                ${generateParticles(36, 10, 80)}
            </div>
            <div class="particle-box" data-label="Gambar 3">
                ${generateParticles(5, 5, 85)}
            </div>
        `;
    } else {
        imgContainer.style.display = 'none';
    }

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = opt;
        btn.onclick = () => checkAnswer(idx, btn);
        optionsContainer.appendChild(btn);
    });
}

function generateParticles(count, minPos, maxPos) {
    let html = '';
    for (let i = 0; i < count; i++) {
        if (count > 20) {
            // Tightly packed grid
            let row = Math.floor(i / 6);
            let col = i % 6;
            html += `<div class="p-dot" style="top: ${8 + row * 14}px; left: ${5 + col * 14}px;"></div>`;
        } else {
            // Random scatter
            let t = Math.floor(Math.random() * (maxPos - minPos)) + minPos;
            let l = Math.floor(Math.random() * (maxPos - minPos)) + minPos;
            html += `<div class="p-dot" style="top: ${t}px; left: ${l}px;"></div>`;
        }
    }
    return html;
}

function checkAnswer(selectedIndex, btnElement) {
    const qData = quizData[currentLevel][currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');

    if (selectedIndex === qData.correctIndex) {
        // Benar
        btnElement.classList.add('correct');
        score += 10;
        showExplanation("Hebat! Jawabanmu Benar 🎉", qData.explanation);
        disableAllOptions();
    } else {
        // Salah
        lives--;
        updateLivesUI();
        btnElement.classList.add('wrong');

        if (lives > 0) {
            // Kesempatan kedua
            setTimeout(() => {
                btnElement.classList.remove('wrong');
                btnElement.disabled = true; // disable this wrong option
                btnElement.style.opacity = '0.5';
            }, 800);
        } else {
            // Kesempatan habis
            options[qData.correctIndex].classList.add('correct');
            showExplanation("Oops! Jawabanmu Belum Tepat 😢", qData.explanation);
            disableAllOptions();
        }
    }
}

function updateLivesUI() {
    let hearts = "";
    for (let i = 0; i < lives; i++) hearts += "❤️ ";
    if (lives === 0) hearts = "💔";
    document.getElementById('lives-count').textContent = hearts;
}

function disableAllOptions() {
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
}

function showExplanation(title, text) {
    setTimeout(() => {
        document.getElementById('exp-title').textContent = title;
        document.getElementById('exp-text').textContent = text;
        document.getElementById('explanation-modal').style.display = 'block';
    }, 500);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[currentLevel].length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('explanation-modal').style.display = 'none';
    document.getElementById('quiz-progress-fill').style.width = `100%`;
    document.getElementById('result-modal').style.display = 'block';
    document.getElementById('final-score').textContent = score;
}
