/**
 * ASESMEN MATERI GAYA — PREMIUM PRESENTATION & QUIZ LOGIC
 * Mengontrol navigasi slide, kuis interaktif 15 soal, preload,
 * autoplay, keyboard, touch gestures, fullscreen, drawer, dan sintesis audio SFX.
 */

// === STATE MANAGEMENT ===
let currentSlide = 1;
const totalSlides = 12;
let isAutoplay = false;
let autoplayTimer = null;
const autoplayDuration = 5000; // 5 Detik per slide

// Touch swipe variables
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50; // Minimum swipe distance in pixels

// Quiz state variables
let quizActive = false;
let currentQuestionIndex = 0;
let quizScore = 0;
let isOptionSelected = false;

// === 15 PILIHAN GANDA MAGNET QUESTIONS DATABASE ===
const quizQuestions = [
    {
        id: 1,
        question: "Perhatikan teks berikut!\n\nSepulang sekolah, Arkan dan teman-temannya bermain di halaman rumah. Mereka membawa beberapa mainan, seperti bola, mobil-mobilan, dan plastisin. Arkan melihat Dito mendorong mobil-mobilan hingga bergerak cepat ke depan. Tidak lama kemudian, Sinta menendang bola yang diam hingga bola itu menggelinding ke arah pagar.\n\nDi sudut halaman, Rara sedang bermain plastisin. Ia menekan dan membentuk plastisin menjadi bentuk bunga. Plastisin yang semula bulat berubah menjadi bentuk baru sesuai keinginannya. Setelah itu, Bima menarik tali pada mainan kapal-kapalan sehingga kapal kecil itu bergerak di atas lantai.\n\nBerdasarkan cerita tersebut, kegiatan yang bukan termasuk gaya otot yang menyebabkan benda bergerak adalah ....",
        options: {
            A: "Dito mendorong mobil-mobilan",
            B: "Sinta menendang bola",
            C: "Rara membentuk plastisin menjadi bunga",
            D: "Bima menarik tali kapal-kapalan"
        },
        answer: "C",
        explanation: "Dito, Sinta, dan Bima menggunakan gaya otot yang menyebabkan benda bergerak. Rara juga menggunakan gaya otot, tetapi pengaruhnya adalah mengubah bentuk plastisin, bukan menyebabkan benda bergerak."
    },
    {
        id: 2,
        image: "assets/soal2.png",
        question: "Perhatikan gambar berikut!\n\nDi tempat pengolahan sampah, petugas ingin memisahkan benda-benda logam dari tumpukan sampah lainnya. Petugas menggunakan alat besar yang dapat menarik paku, besi, dan potongan baja tanpa harus menyentuhnya secara langsung.\n\nGaya yang dimanfaatkan oleh alat tersebut adalah ....",
        options: {
            A: "gravitasi",
            B: "gesek",
            C: "pegas",
            D: "magnet"
        },
        answer: "D",
        explanation: "Alat tersebut memanfaatkan gaya magnet untuk menarik paku, besi, dan potongan baja tanpa harus menyentuhnya secara langsung."
    },
    {
        id: 3,
        image: "assets/soal3.png",
        question: "Perhatikan gambar!\n\nPada Minggu pagi, Raka pergi ke taman bersama keluarganya. Di taman, banyak orang sedang berolahraga dan bermain. Ada seorang anak menarik mobil-mobilan dengan tali, seorang ayah mendorong stroller bayi, dan seorang pedagang mendorong gerobak dagangannya. Semua benda yang awalnya diam dapat bergerak karena menerima gaya berupa tarikan atau dorongan.\n\nInformasi yang tepat berdasarkan teks cerita di atas adalah ....",
        options: {
            A: "gaya tarik ditunjukkan ketika ayah mendorong stroller bayi",
            B: "gaya dorong ditunjukkan ketika anak menarik mobil-mobilannya",
            C: "gaya dorong ditunjukkan ketika pedagang mendorong gerobak dagangannya",
            D: "gaya tarik ditunjukkan ketika Raka sedang berjalan di taman"
        },
        answer: "C",
        explanation: "Gaya dorong ditunjukkan oleh pedagang yang mendorong gerobak dagangannya dan ayah yang mendorong stroller bayi. Sedangkan gaya tarik ditunjukkan oleh anak yang menarik mobil-mobilan dengan tali. Pilihan C adalah informasi yang tepat."
    },
    {
        id: 4,
        question: "Perhatikan teks berikut!\n\nNisa, Zahra, dan Hanif pulang menuju rumah. Mereka melewati perkampungan yang warganya bermata pencaharian sebagai pengrajin gerabah. Mereka mengamati cara membuat gerabah. Ternyata apa yang dilakukan pengrajin gerabah pun juga melibatkan gaya. Pengrajin gerabah memanfaatkan gaya untuk membuat guci. Pembuatan gerabah diawali dengan tanah liat yang dibasahi kemudian dibentuk sesuai keinginan, setelah selesai membentuk lalu dijemur di bawah panas matahari.\n\nBerdasarkan teks bacaan, para pengrajin di perkampungan Zahra menggunakan gaya menyebabkan perubahan ....",
        options: {
            A: "letak",
            B: "arah gerak",
            C: "bentuk",
            D: "posisi"
        },
        answer: "C",
        explanation: "Pengrajin gerabah menggunakan gaya untuk membentuk tanah liat menjadi guci. Jadi, gaya menyebabkan perubahan bentuk benda."
    },
    {
        id: 5,
        image: "assets/soal5.png",
        question: "Kesimpulan sesuai gambar adalah ....",
        options: {
            A: "semakin besar gaya yang diberikan pada gambar A, maka gerak akan semakin cepat",
            B: "semakin besar gaya yang diberikan pada gambar B, maka energi yang bekerja kecil",
            C: "semakin kecil gaya yang diberikan pada gambar B, semakin besar gaya tariknya",
            D: "semakin kecil gaya yang diberikan pada gambar C, maka gerak benda yang bekerja kecil"
        },
        answer: "A",
        explanation: "Gambar A menunjukkan anak mengayuh sepeda. Jika gaya otot saat mengayuh semakin besar, sepeda akan bergerak semakin cepat. Jadi, semakin besar gaya yang diberikan, maka gerak benda akan semakin cepat."
    },
    {
        id: 6,
        image: "assets/soal6.png",
        question: "Perhatikan pernyataan berikut!\n\nSeorang pemain sepak bola menggunakan sepatu yang bagian bawahnya memiliki gerigi kecil. Sepatu tersebut membuat pemain tidak mudah terpeleset saat berlari di lapangan.\n\nKesimpulan yang tepat berdasarkan peristiwa tersebut adalah ....",
        options: {
            A: "permukaan kasar dapat memperbesar gaya gesek",
            B: "permukaan kasar dapat memperkecil gaya gesek",
            C: "gaya gesek selalu merugikan manusia",
            D: "gaya gesek hanya terjadi pada benda diam"
        },
        answer: "A",
        explanation: "Gerigi pada sepatu membuat permukaan sepatu menjadi lebih kasar. Permukaan kasar memperbesar gaya gesek antara sepatu dan lapangan, sehingga pemain lebih kuat berpijak dan tidak mudah terpeleset."
    },
    {
        id: 7,
        image: "assets/soal7.png",
        question: "Perhatikan gambar dan teks berikut!\n\nTarik tambang adalah permainan klasik yang biasanya dimainkan saat acara HUT RI atau acara kumpul keluarga. Dalam permainan ini, dua tim berdiri di masing-masing ujung tali dan berusaha menarik tali sampai sebagian besar tali melewati garis tengah.\n\nTarik tambang dilakukan secara berkelompok serta membutuhkan kekuatan dan kekompakan para pemain. Untuk memenangkan permainan tersebut, diperlukan gaya otot berupa tarikan yang besar.\n\nSelain tarik tambang, permainan yang memerlukan gaya seperti pada teks adalah ....",
        options: {
            A: "bermain catur",
            B: "menyusun puzzle",
            C: "bermain tarik-menarik tali",
            D: "menonton pertandingan bola"
        },
        answer: "C",
        explanation: "Tarik tambang menggunakan gaya otot berupa gaya tarik. Permainan tarik-menarik tali juga menggunakan gaya yang sama, yaitu menarik benda atau tali menggunakan tenaga otot."
    },
    {
        id: 8,
        image: "assets/no8.png",
        question: "Perhatikan gambar berikut!\n\nSebuah bola digelindingkan pada tiga bidang miring dengan permukaan yang sama-sama dilapisi papan berserabut. Ketiga bidang miring memiliki bentuk seperti pada gambar.\n\nBerdasarkan gambar, bola yang paling cepat sampai di lantai terlebih dahulu terdapat pada ....",
        options: {
            A: "gambar 1, karena bidang miringnya tidak terlalu panjang",
            B: "gambar 2, karena bidang miringnya paling panjang sehingga bola bergerak paling lambat",
            C: "gambar 3, karena bidang miringnya paling curam sehingga bola lebih cepat bergerak turun",
            D: "gambar 1 dan gambar 2, karena keduanya memiliki kemiringan yang sama"
        },
        answer: "C",
        explanation: "Bola pada gambar 3 lebih cepat sampai di lantai karena bidang miringnya paling curam. Semakin curam bidang miring, bola akan lebih cepat bergerak turun karena pengaruh gaya gravitasi."
    },
    {
        id: 9,
        question: "Perhatikan teks berikut!\n\nBu Rina melakukan percobaan menggunakan magnet. Ia mendekatkan magnet pada beberapa benda, yaitu paku besi, klip kertas, aluminium foil, dan kertas. Paku besi dan klip kertas tertarik kuat oleh magnet, sedangkan aluminium foil tertarik sangat lemah.\n\nBerdasarkan sifat kemagnetannya, pernyataan yang tepat adalah ....",
        options: {
            A: "paku besi dan klip kertas termasuk paramagnetik, sedangkan aluminium foil termasuk feromagnetik",
            B: "paku besi dan klip kertas termasuk feromagnetik, sedangkan aluminium foil termasuk paramagnetik",
            C: "paku besi, klip kertas, dan aluminium foil semuanya termasuk benda nonmagnetik",
            D: "aluminium foil termasuk feromagnetik karena dapat ditarik magnet dengan kuat"
        },
        answer: "B",
        explanation: "Benda feromagnetik adalah benda yang ditarik magnet dengan kuat, contohnya besi dan baja. Paku besi dan klip kertas termasuk feromagnetik. Benda paramagnetik adalah benda yang ditarik magnet dengan lemah, contohnya aluminium."
    },
    {
        id: 10,
        image: "assets/soal10.png",
        question: "Perhatikan gambar berikut!\n\nZahra dan Nisa sedang bermain jungkat-jungkit di taman. Pada gambar, posisi papan yang diduduki Zahra berada lebih rendah, sedangkan posisi papan yang diduduki Nisa berada lebih tinggi.\n\nPerhatikan pernyataan berikut!\n\n1. Jungkat-jungkit dapat bergerak karena adanya gaya yang bekerja pada papan.\n2. Sisi papan yang diduduki Zahra bergerak turun karena gaya tekan pada sisi Zahra lebih besar.\n3. Posisi papan dikatakan seimbang jika kedua sisi papan berada pada ketinggian yang sama.\n4. Sisi papan yang diduduki Nisa lebih tinggi karena gaya tekan pada sisi Nisa lebih besar.\n\nPernyataan yang tepat berdasarkan gambar adalah ....",
        options: {
            A: "1, 2, dan 3",
            B: "1, 2, dan 4",
            C: "1, 3, dan 4",
            D: "2, 3, dan 4"
        },
        answer: "A",
        explanation: "Pernyataan 1 benar karena jungkat-jungkit bergerak akibat adanya gaya. Pernyataan 2 benar karena sisi Zahra turun berarti gaya tekan pada sisi Zahra lebih besar. Pernyataan 3 benar karena jungkat-jungkit seimbang jika posisi papan datar. Pernyataan 4 salah karena jika gaya tekan Nisa lebih besar, seharusnya sisi Nisa yang turun, bukan naik."
    },
    {
        id: 11,
        question: "Perhatikan teks berikut!\n\nSaat pelajaran IPAS, Bu Guru melakukan percobaan mendorong kotak di atas beberapa permukaan. Kotak pertama didorong di atas lantai keramik yang licin. Kotak kedua didorong di atas karpet. Kotak ketiga diberi roda kecil di bagian bawahnya. Hasilnya, kotak di atas karpet paling sulit bergerak, sedangkan kotak yang diberi roda paling mudah bergerak.\n\nPerhatikan pernyataan berikut!\n\n1. Gaya gesek membesar jika permukaan benda semakin kasar.\n2. Kotak yang diberi roda memiliki gaya gesek lebih kecil sehingga lebih mudah bergerak.\n3. Kotak di atas karpet mudah bergerak karena gaya geseknya kecil.\n4. Gaya gesek mengecil jika permukaan benda semakin kasar.\n\nPernyataan yang tepat berdasarkan teks adalah ....",
        options: {
            A: "1 dan 2",
            B: "1 dan 3",
            C: "2 dan 4",
            D: "3 dan 4"
        },
        answer: "A",
        explanation: "Pernyataan 1 benar karena permukaan kasar seperti karpet memperbesar gaya gesek. Pernyataan 2 benar karena roda dapat memperkecil gaya gesek sehingga kotak lebih mudah bergerak. Pernyataan 3 dan 4 salah."
    },
    {
        id: 12,
        image: "assets/penjelasan12.png",
        question: "Perhatikan teks berikut!\n\nSaat percobaan IPAS, Dika ingin membuat paku menjadi magnet. Ia mencoba tiga cara berikut.\n\n1. Menggosok paku dengan magnet secara satu arah dan berulang-ulang.\n2. Menempelkan paku pada magnet beberapa saat hingga paku dapat menarik klip kertas.\n3. Melilitkan kawat pada paku, lalu menghubungkan ujung kawat ke baterai.\n\nBerdasarkan teks tersebut, pasangan cara pembuatan magnet yang tepat adalah ....",
        options: {
            A: "1 = induksi, 2 = elektromagnet, 3 = gosokan",
            B: "1 = gosokan, 2 = induksi, 3 = elektromagnet",
            C: "1 = elektromagnet, 2 = gosokan, 3 = induksi",
            D: "1 = induksi, 2 = gosokan, 3 = elektromagnet"
        },
        answer: "B",
        explanation: "Pernyataan 1 adalah cara membuat magnet dengan gosokan (menggosok paku searah secara berulang-ulang). Pernyataan 2 adalah cara induksi (menempelkan benda magnetis pada magnet). Pernyataan 3 adalah cara elektromagnet (mengalirkan arus listrik melalui lilitan kawat)."
    },
    {
        id: 13,
        question: "Perhatikan teks bacaan berikut!\n\nUdin dan Hanif sedang bermain ketapel. Mereka menggunakan kerikil. Hanif menarik karet ketapel dengan kuat hingga karet ketapel menjadi panjang. Sedangkan Udin menariknya dengan tenaga yang biasa saja sehingga karet ketapelnya tidak lebih panjang dari milik Hanif.\n\nBerdasarkan teks tersebut, pernyataan yang tepat adalah ....",
        options: {
            A: "Kerikil dari ketapel Udin terlempar lebih jauh karena gaya pegasnya lebih kecil.",
            B: "Kerikil dari ketapel Hanif terlempar lebih jauh karena karet ditarik lebih kuat.",
            C: "Kerikil dari ketapel Udin dan Hanif terlempar sama jauh karena menggunakan kerikil.",
            D: "Kerikil dari ketapel Hanif terlempar lebih dekat karena karet ketapel menjadi panjang."
        },
        answer: "B",
        explanation: "Semakin kuat karet ketapel ditarik, semakin besar gaya pegas yang dihasilkan. Karena Hanif menarik karet lebih kuat, kerikil dari ketapel Hanif akan terlempar lebih jauh."
    },
    {
        id: 14,
        question: "Dina meletakkan magnet batang di bawah selembar kertas. Kemudian, ia menaburkan serbuk besi di atas kertas tersebut. Serbuk besi membentuk pola garis-garis di sekitar magnet.\n\nPola garis-garis tersebut menunjukkan adanya ....",
        options: {
            A: "gaya otot di sekitar magnet",
            B: "medan magnet di sekitar magnet",
            C: "gaya gesek antara kertas dan magnet",
            D: "gaya gravitasi yang menarik serbuk besi"
        },
        answer: "B",
        explanation: "Medan magnet adalah daerah di sekitar magnet yang masih dipengaruhi oleh gaya magnet. Serbuk besi membentuk pola karena mengikuti arah pengaruh gaya magnet di sekitar magnet."
    },
    {
        id: 15,
        question: "Perhatikan teks berikut!\n\nSaat pelajaran IPAS, Lani menggosokkan penggaris plastik ke rambutnya beberapa kali. Setelah itu, ia mendekatkan penggaris tersebut ke potongan kertas kecil. Ternyata, potongan kertas kecil tertarik dan menempel pada penggaris. Namun, ketika penggaris tidak digosokkan terlebih dahulu, potongan kertas tidak tertarik.\n\nBerdasarkan teks tersebut, pernyataan yang tepat adalah ....",
        options: {
            A: "penggaris dapat menarik kertas karena adanya gaya gravitasi",
            B: "penggaris yang digosok menghasilkan listrik statis sehingga dapat menarik potongan kertas",
            C: "potongan kertas menempel karena penggaris memiliki gaya pegas",
            D: "potongan kertas tertarik karena penggaris berubah menjadi magnet permanen"
        },
        answer: "B",
        explanation: "Penggaris plastik yang digosokkan ke rambut dapat memiliki muatan listrik statis. Muatan listrik statis inilah yang membuat penggaris dapat menarik potongan kertas kecil. Gaya ini bukan gaya magnet, karena kertas bukan benda yang tertarik kuat oleh magnet."
    },
    {
        id: 16,
        question: "Dina menaburkan serbuk besi di atas kertas yang diletakkan di atas magnet. Serbuk besi terlihat membentuk pola garis-garis di sekitar magnet. Daerah di sekitar magnet yang masih dipengaruhi oleh gaya magnet disebut ______.",
        answer: "medan magnet",
        explanation: "Medan magnet adalah daerah di sekitar magnet yang masih memiliki pengaruh gaya magnet. Serbuk besi dapat menunjukkan pola medan magnet karena tertarik mengikuti arah gaya magnet."
    },
    {
        id: 17,
        question: "Kutub utara magnet jika didekatkan dengan kutub utara magnet akan saling ....",
        answer: ["tolak-menolak", "saling menolak", "tolak menolak"],
        explanation: "Kutub magnet yang sejenis akan saling tolak-menolak. Jadi, kutub utara bertemu kutub utara akan saling menolak."
    },
    {
        id: 18,
        question: "Benda seperti kayu dan plastik tidak dapat ditarik magnet karena termasuk benda ______.",
        answer: ["nonmagnetis", "benda nonmagnetik", "benda tidak magnetis", "nonmagnetik", "tidak magnetis"],
        explanation: "Benda nonmagnetis adalah benda yang tidak dapat ditarik oleh magnet, contohnya kayu, plastik, kertas, dan kaca."
    },
    {
        id: 19,
        question: "Jika lantai terlalu licin, seseorang mudah terpeleset karena gaya geseknya terlalu ______.",
        answer: ["kecil", "lemah", "rendah", "kurang besar"],
        explanation: "Gaya gesek membantu kaki mencengkeram lantai. Jika gaya gesek terlalu kecil, kaki mudah tergelincir sehingga seseorang bisa terpeleset."
    },
    {
        id: 20,
        question: "Saat penggaris plastik tidak digosokkan ke rambut, potongan kertas kecil tidak tertarik. Hal ini menunjukkan bahwa gaya listrik statis muncul setelah benda ....",
        answer: ["digosok", "digosokkan", "bergesekan", "diberi gesekan"],
        explanation: "Gaya listrik statis dapat muncul setelah benda digosokkan dengan benda lain. Contohnya, penggaris plastik yang digosok ke rambut dapat menarik potongan kertas kecil."
    },
    {
        id: 21,
        question: "Bola yang sedang menggelinding ditahan dengan kaki hingga berhenti. Peristiwa ini membuktikan bahwa gaya dapat membuat benda bergerak menjadi ....",
        answer: ["berhenti", "diam"],
        explanation: "Gaya dapat mengubah keadaan gerak benda. Bola yang awalnya bergerak dapat berhenti ketika diberi gaya oleh kaki."
    },
    {
        id: 22,
        question: "Bola tenis yang dipukul raket ke arah samping berubah lintasannya. Peristiwa ini menunjukkan bahwa gaya dapat mengubah ... benda.",
        answer: ["arah gerak", "arah", "lintasan gerak"],
        explanation: "Saat bola dipukul raket, bola tidak hanya bergerak, tetapi juga berubah arah. Jadi, gaya dapat mengubah arah gerak benda."
    },
    {
        id: 23,
        question: "Karet gelang yang ditarik dapat kembali ke bentuk semula karena memiliki sifat ______.",
        answer: ["elastis", "lentur", "kenyal"],
        explanation: "Benda elastis dapat berubah bentuk ketika diberi gaya, lalu kembali ke bentuk semula setelah gaya dilepaskan. Contohnya karet gelang dan pegas."
    },
    {
        id: 24,
        question: "Magnet yang digunakan pada kompas biasanya berbentuk magnet ______.",
        answer: ["jarum", "magnet jarum"],
        explanation: "Kompas menggunakan magnet berbentuk jarum. Jarum magnet pada kompas dapat menunjuk arah utara dan selatan."
    },
    {
        id: 25,
        question: "Saat sepeda dikayuh lebih kuat, sepeda bergerak lebih cepat. Hal ini menunjukkan bahwa gaya dapat mengubah ______ benda.",
        answer: ["kecepatan", "kelajuan", "laju gerak"],
        explanation: "Semakin besar gaya yang diberikan saat mengayuh sepeda, gerak sepeda dapat menjadi lebih cepat. Jadi, gaya dapat mengubah kecepatan benda."
    },
    {
        id: 26,
        question: "Dina menekan plastisin dengan jari hingga plastisin berubah menjadi bentuk bunga.\n\nPengaruh gaya pada peristiwa tersebut adalah ....",
        dragOptions: ["Mengubah bentuk benda", "Mengubah warna benda", "Menghilangkan benda"],
        answer: "Mengubah bentuk benda",
        explanation: "Gaya yang diberikan oleh jari Dina mengubah bentuk plastisin bulat menjadi bentuk bunga."
    },
    {
        id: 27,
        question: "Sebuah paku dililit kawat, kemudian ujung kawat dihubungkan dengan baterai. Setelah itu, paku dapat menarik klip kertas.\n\nCara membuat magnet tersebut disebut ....",
        dragOptions: ["Elektromagnet", "Induksi", "Gosokan"],
        answer: "Elektromagnet",
        explanation: "Paku yang dialiri arus listrik searah (baterai) melalui kumparan kawat akan menghasilkan sifat magnetis. Cara ini disebut pembuatan magnet elektromagnet."
    },
    {
        id: 28,
        question: "Bu Guru mendekatkan magnet ke beberapa benda. Paku besi tertarik sangat kuat, sedangkan aluminium hanya tertarik sangat lemah.\n\nAluminium termasuk benda ....",
        dragOptions: ["Paramagnetik", "Feromagnetik", "Nonmagnetic", "Nonmagnetik"],
        answer: "Paramagnetik",
        explanation: "Benda paramagnetik adalah benda yang ditarik oleh magnet dengan sangat lemah, seperti aluminium dan platina."
    },
    {
        id: 29,
        question: "Saat hujan, lantai teras menjadi basah dan licin. Ibu meletakkan keset karet di depan pintu agar orang yang lewat tidak mudah terpeleset.\n\nKeset karet digunakan untuk memperbesar gaya ....",
        dragOptions: ["Gaya gesek", "Gaya magnet", "Gaya gravitasi"],
        answer: "Gaya gesek",
        explanation: "Keset karet memiliki permukaan yang kasar untuk memperbesar gaya gesek sehingga orang tidak mudah tergelincir atau terpeleset saat berjalan."
    },
    {
        id: 30,
        question: "Kertas lembaran dan kertas yang diremas dijatuhkan dari ketinggian yang sama. Kertas yang diremas lebih cepat sampai ke lantai karena hambatan udaranya lebih kecil.\n\nGaya yang menarik kedua kertas ke bawah adalah ....",
        dragOptions: ["Gaya gravitasi", "Gaya magnet", "Gaya listrik statis"],
        answer: "Gaya gravitasi",
        explanation: "Gaya gravitasi bumi menarik semua benda bermassa ke bawah (ke pusat bumi), sehingga kedua kertas jatuh ke lantai."
    }
];

// === WEB AUDIO API SYNTHESIZER FOR PREMIUM SFX ===
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Play simple click sound
function playClickSFX() {
    try {
        initAudio();
        if (!audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.08);

        gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
        console.warn("Audio Context blocked or not supported:", e);
    }
}

// Play soft swoosh sound for slide transitions
function playSwooshSFX() {
    try {
        initAudio();
        if (!audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(450, audioCtx.currentTime + 0.25);

        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {
        console.warn("Swoosh SFX error:", e);
    }
}

// Play cheerful double chime for correct answers
function playCorrectSFX() {
    try {
        initAudio();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;
        const freqs = [523.25, 659.25]; // C5 to E5 arpeggio

        freqs.forEach((freq, index) => {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            osc.type = 'sine';
            osc.frequency.value = freq;

            const start = now + index * 0.08;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.setValueAtTime(0.12, start);
            gainNode.gain.exponentialRampToValueAtTime(0.01, start + 0.3);

            osc.start(start);
            osc.stop(start + 0.35);
        });
    } catch (e) {
        console.warn("Correct SFX error:", e);
    }
}

// Play lower coarse buzzer sound for wrong answers
function playWrongSFX() {
    try {
        initAudio();
        if (!audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3 frequency
        osc.frequency.setValueAtTime(140, audioCtx.currentTime + 0.12); // drop down frequency

        gainNode.gain.setValueAtTime(0.18, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.32);
    } catch (e) {
        console.warn("Wrong SFX error:", e);
    }
}

// Play success victory chime for the End Screen
function playSuccessSFX() {
    try {
        initAudio();
        if (!audioCtx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Major triad chord arpeggio)
        const now = audioCtx.currentTime;

        notes.forEach((freq, index) => {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            osc.type = 'sine';
            osc.frequency.value = freq;

            const start = now + index * 0.12;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.setValueAtTime(0.1, start);
            gainNode.gain.exponentialRampToValueAtTime(0.01, start + 0.45);

            osc.start(start);
            osc.stop(start + 0.5);
        });
    } catch (e) {
        console.warn("Success SFX error:", e);
    }
}

// === PRELOADING SLIDES SYSTEM ===
document.addEventListener("DOMContentLoaded", () => {
    // Check if there is a save link parameter to restore
    checkSaveLinkOnLoad();

    // Preload slide images sequentially
    preloadSlides();

    // Generate navigation dots dynamically
    generateDots();

    // Generate slide drawer index items dynamically
    generateDrawerGrid();

    // Handle keyboard event listener
    document.addEventListener("keydown", handleKeyboard);

    // Handle Touch Gestures on Slides Wrapper
    const wrapper = document.getElementById("slidesWrapper");
    wrapper.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    wrapper.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    // Track Fullscreen Change events to update Fullscreen Toggle Button UI
    document.addEventListener("fullscreenchange", updateFullscreenButtonUI);
    document.addEventListener("webkitfullscreenchange", updateFullscreenButtonUI);

    // Load session state if it exists
    loadSessionState();
});

// Preloads all slide images by setting their real src
function preloadSlides() {
    for (let i = 1; i <= totalSlides; i++) {
        const slideEl = document.getElementById(`slide-${i}`);
        const imgEl = slideEl.querySelector("img");
        const src = imgEl.getAttribute("data-src");

        const tempImg = new Image();
        tempImg.src = src;

        tempImg.onload = () => {
            imgEl.src = src;
            imgEl.classList.add("loaded");
            const spinner = slideEl.querySelector(".slide-spinner");
            if (spinner) spinner.style.display = "none";
        };
    }
}

// === SCREEN AND TRANSITION FUNCTIONS ===

// Helper to automatically trigger Fullscreen mode on direct user click interactions
function requestFullscreenAutomatically() {
    const appContainer = document.getElementById("appContainer");
    if (!document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement) {

        if (appContainer.requestFullscreen) {
            appContainer.requestFullscreen().catch(err => {
                console.log("Auto-fullscreen blocked or not supported:", err);
            });
        } else if (appContainer.webkitRequestFullscreen) {
            appContainer.webkitRequestFullscreen();
        }
    }
}

// Transition from Welcome Cover to Slide Presentation Screen
function startPresentation() {
    playClickSFX();

    quizActive = false;

    const coverScreen = document.getElementById("screen-cover");
    const presentationScreen = document.getElementById("screen-presentation");

    coverScreen.style.opacity = "0";
    coverScreen.style.transition = "opacity 0.4s ease";

    setTimeout(() => {
        coverScreen.classList.remove("active");
        coverScreen.style.display = "none";

        presentationScreen.style.display = "flex";
        presentationScreen.classList.add("active");
        presentationScreen.style.opacity = "0";

        // Reflow for transition
        void presentationScreen.offsetWidth;

        presentationScreen.style.transition = "opacity 0.4s ease";
        presentationScreen.style.opacity = "1";

        // Go to first slide initially
        goToSlide(1, 'next');
    }, 400);
}

// Jump directly to a specific slide index with custom transition direction
function goToSlide(index, direction = 'next') {
    if (index < 1 || index > totalSlides) return;

    const oldSlide = document.getElementById(`slide-${currentSlide}`);
    const newSlide = document.getElementById(`slide-${index}`);

    if (oldSlide && currentSlide !== index) {
        // Apply direction transitions classes
        oldSlide.classList.remove("active", "prev", "next");
        if (direction === 'next') {
            oldSlide.classList.add("prev");
        } else {
            oldSlide.classList.add("next");
        }
    }

    if (newSlide) {
        newSlide.classList.remove("active", "prev", "next");
        newSlide.classList.add("active");

        // Trigger lazy-load check if not loaded yet
        const img = newSlide.querySelector("img");
        if (img && !img.src) {
            img.src = img.getAttribute("data-src");
            img.onload = () => {
                img.classList.add("loaded");
                const spinner = newSlide.querySelector(".slide-spinner");
                if (spinner) spinner.style.display = "none";
            };
        }
    }

    currentSlide = index;

    // Play transition sound effect
    if (direction) {
        playSwooshSFX();
    }

    // Update toolbar indicator and footer elements
    updateUIElements();

    saveSessionState();
}

// Move forward in slideshow
function nextSlide() {
    if (currentSlide < totalSlides) {
        goToSlide(currentSlide + 1, 'next');
    } else {
        // Last slide finished -> Show Completion End Screen Popup
        showEndScreen();
    }
}

// Move backward in slideshow
function prevSlide() {
    if (currentSlide > 1) {
        goToSlide(currentSlide - 1, 'prev');
    }
}

// Updates headers, footers, buttons state, progress fills, and indicators
function updateUIElements() {
    // 1. Slide progress numbers indicator
    const indicator = document.getElementById("slideIndicator");
    indicator.textContent = `Slide ${currentSlide} / ${totalSlides}`;

    // 2. Linear progress bar fill percent
    const progressPercent = (currentSlide / totalSlides) * 100;
    document.getElementById("progressBar").style.width = `${progressPercent}%`;

    // 3. Navigation buttons active states
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    prevBtn.disabled = (currentSlide === 1);

    if (currentSlide === totalSlides) {
        nextBtn.innerHTML = `Selesai <span class="btn-arrow">🏁</span>`;
        nextBtn.style.background = "linear-gradient(135deg, var(--north-red), var(--north-red-dark))";
        nextBtn.style.boxShadow = "0 4px 0 #B22222";
    } else {
        nextBtn.innerHTML = `Lanjut <span class="btn-arrow">➡️</span>`;
        nextBtn.style.background = "linear-gradient(135deg, var(--south-blue), var(--south-blue-dark))";
        nextBtn.style.boxShadow = "0 4px 0 #1D549C";
    }

    // 4. Update Navigation bottom dots indicator
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, idx) => {
        if (idx === currentSlide - 1) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });

    // 5. Update index drawer items active border
    const drawerCards = document.querySelectorAll(".drawer-card");
    drawerCards.forEach((card, idx) => {
        if (idx === currentSlide - 1) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
}

// Generates the bottom row circular navigation dots
function generateDots() {
    const container = document.getElementById("dotsIndicator");
    container.innerHTML = "";

    for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement("div");
        dot.className = `dot ${i === 1 ? 'active' : ''}`;
        dot.title = `Lompat ke Slide ${i}`;
        dot.onclick = () => {
            playClickSFX();
            const direction = i > currentSlide ? 'next' : 'prev';
            goToSlide(i, direction);
        };
        container.appendChild(dot);
    }
}

// Generates the Grid of slides thumbnails in the slide jumping drawer
function generateDrawerGrid() {
    const grid = document.getElementById("drawerGrid");
    grid.innerHTML = "";

    for (let i = 1; i <= totalSlides; i++) {
        const card = document.createElement("div");
        card.className = `drawer-card ${i === 1 ? 'active' : ''}`;
        card.onclick = () => {
            playClickSFX();
            const direction = i > currentSlide ? 'next' : 'prev';
            goToSlide(i, direction);
            toggleSlideDrawer(false);
        };

        // Thumbnail Image container
        const preview = document.createElement("div");
        preview.className = "drawer-card-preview";

        const img = document.createElement("img");
        img.src = `assets/slide${i}.png`;
        img.alt = `Slide ${i}`;

        preview.appendChild(img);

        // Slide Number Label
        const numLabel = document.createElement("div");
        numLabel.className = "drawer-card-num";
        numLabel.textContent = `Slide ${i}`;

        card.appendChild(preview);
        card.appendChild(numLabel);
        grid.appendChild(card);
    }
}

// === AUTOPLAY MODE LOGIC ===
function toggleAutoplay() {
    playClickSFX();
    const btn = document.getElementById("autoplayBtn");

    if (isAutoplay) {
        // Pause Autoplay
        isAutoplay = false;
        clearInterval(autoplayTimer);
        autoplayTimer = null;
        btn.classList.remove("active");
        btn.querySelector(".btn-icon").textContent = "▶️";
        btn.querySelector(".btn-lbl").textContent = "Autoplay";
    } else {
        // Start Autoplay
        isAutoplay = true;
        btn.classList.add("active");
        btn.querySelector(".btn-icon").textContent = "⏸️";
        btn.querySelector(".btn-lbl").textContent = "Jeda";

        // Trigger cycle transition interval
        autoplayTimer = setInterval(() => {
            if (currentSlide < totalSlides) {
                nextSlide();
            } else {
                // Loop presentation back to slide 1
                goToSlide(1, 'next');
            }
        }, autoplayDuration);
    }
}

// Stop Autoplay immediately when user manually interacts
function stopAutoplayIfRunning() {
    if (isAutoplay) {
        toggleAutoplay();
    }
}

// Helper to hijack navigation button clicks to stop autoplay
const originalPrevSlide = prevSlide;
prevSlide = function () {
    stopAutoplayIfRunning();
    originalPrevSlide();
};

const originalNextSlide = nextSlide;
nextSlide = function () {
    stopAutoplayIfRunning();
    originalNextSlide();
};

// === INTERACTIVE DRAWER AND MODAL TOGGLERS ===

// Show or hide Navigation Help instruction modal overlay
function toggleHelpModal(show) {
    playClickSFX();
    const helpModal = document.getElementById("helpModal");
    if (show) {
        stopAutoplayIfRunning();
        helpModal.classList.add("show");
    } else {
        helpModal.classList.remove("show");
    }
}

// Open or close Slide Jump bottom index drawer list
function toggleSlideDrawer(show) {
    playClickSFX();
    const drawer = document.getElementById("drawerOverlay");
    if (show) {
        stopAutoplayIfRunning();
        drawer.classList.add("show");
    } else {
        drawer.classList.remove("show");
    }
}

// Show Completion Success End Screen Overlay
function showEndScreen() {
    stopAutoplayIfRunning();
    playSuccessSFX();

    const endScreen = document.getElementById("endScreen");
    endScreen.classList.add("show");
}

// Restarts presentation back to Slide 1 and resets overlays
function restartPresentation() {
    playClickSFX();
    document.getElementById("endScreen").classList.remove("show");
    goToSlide(1, 'prev');
}

// === INTERACTIVE CONTROLS: KEYBOARD SHORTCUTS & TOUCH SWIPES ===

// Handle Keyboard Navigation Keydown events
function handleKeyboard(e) {
    // Ignore keyboard shortcuts when user is typing in inputs or textareas
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
        if (e.key === "Escape") {
            document.activeElement.blur();
        }
        return;
    }

    // If a modal or drawer is active, Escape will dismiss it
    if (e.key === "Escape") {
        document.getElementById("helpModal").classList.remove("show");
        document.getElementById("drawerOverlay").classList.remove("show");
        document.getElementById("explanationOverlay").classList.remove("show");
        return;
    }

    // Check if Quiz Screen is active
    if (quizActive) {
        switch (e.key) {
            case "ArrowRight":
                e.preventDefault();
                nextQuizQuestion();
                break;
            case "ArrowLeft":
                e.preventDefault();
                prevQuizQuestion();
                break;
        }

        switch (e.key.toUpperCase()) {
            case "A":
                e.preventDefault();
                selectOption("A");
                break;
            case "B":
                e.preventDefault();
                selectOption("B");
                break;
            case "C":
                e.preventDefault();
                selectOption("C");
                break;
            case "D":
                e.preventDefault();
                selectOption("D");
                break;
        }
        return;
    }

    // Only intercept presentation keys when the presentation screen is active
    const presentationActive = document.getElementById("screen-presentation").classList.contains("active");
    if (!presentationActive) return;

    switch (e.key) {
        case "ArrowRight":
        case " ": // Spacebar
            e.preventDefault();
            nextSlide();
            break;
        case "ArrowLeft":
            e.preventDefault();
            prevSlide();
            break;
        case "f":
        case "F":
            e.preventDefault();
            toggleFullscreen();
            break;
        case "a":
        case "A":
            e.preventDefault();
            toggleAutoplay();
            break;
        case "l":
        case "L":
            e.preventDefault();
            // Toggle slide drawer
            const drawerOpen = document.getElementById("drawerOverlay").classList.contains("show");
            toggleSlideDrawer(!drawerOpen);
            break;
        case "h":
        case "H":
            e.preventDefault();
            const helpOpen = document.getElementById("helpModal").classList.contains("show");
            toggleHelpModal(!helpOpen);
            break;
        case "q":
        case "Q":
            e.preventDefault();
            startQuizFromPresentation();
            break;
    }
}

// Handle Mobile Screen Touch Swipe gestures
function handleSwipe() {
    if (quizActive) return; // Disable swipe triggers during quiz screen

    const swipeDistance = touchEndX - touchStartX;

    // Swipe left (finger moves right to left) -> Go Next
    if (swipeDistance < -swipeThreshold) {
        nextSlide();
    }
    // Swipe right (finger moves left to right) -> Go Back
    else if (swipeDistance > swipeThreshold) {
        prevSlide();
    }
}

// === FULLSCREEN API CONTROLLER ===
function toggleFullscreen() {
    playClickSFX();
    const appContainer = document.getElementById("appContainer");

    if (!document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement) {

        // Open Screen Fullscreen
        if (appContainer.requestFullscreen) {
            appContainer.requestFullscreen();
        } else if (appContainer.webkitRequestFullscreen) { /* Safari */
            appContainer.webkitRequestFullscreen();
        } else if (appContainer.msRequestFullscreen) { /* IE11 */
            appContainer.msRequestFullscreen();
        }
    } else {
        // Exit Screen Fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Updates browser Fullscreen button emoji in Toolbar Header
function updateFullscreenButtonUI() {
    const btn = document.getElementById("fullscreenBtn");
    const isFull = document.fullscreenElement || document.webkitFullscreenElement;

    if (btn) {
        if (isFull) {
            btn.querySelector(".btn-icon").textContent = "🔽";
            btn.title = "Keluar Layar Penuh (F)";
        } else {
            btn.querySelector(".btn-icon").textContent = "📺";
            btn.title = "Layar Penuh (F)";
        }
    }
}


// =============================================
// INTERACTIVE QUIZ ENGINE CODES
// =============================================

// Database Siswa Kelas 4 (Bisa diedit oleh Guru sesuai nomor absen)
const studentDatabase = {
    "1": "Aaliesha Shofwatunnisa Ahmad",
    "2": "Adhyastha Prasraya Mahaputra",
    "3": "Agha Dzakwan Viero",
    "4": "Alby Kamil Ardhani",
    "5": "Arkan Rasyad Pahrul",
    "6": "Arkananta Mahardika",
    "7": "Aydan Alarries Adidaya",
    "8": "Ayra Salsabila Pratiwi",
    "9": "El Ghfani Putra Aji",
    "10": "Fienna Aleesha Hadiyanto",
    "11": "Ghaniya Kaisafara Adji",
    "12": "Hizba Zyd Hamizan Ahmad",
    "13": "Ibrahim Aqila Zulkarnain",
    "14": "Kahfi Anarghya Cansera",
    "15": "Keenan Athaya Rasyid",
    "16": "Khairy Abimanyu Pambudi",
    "17": "La Reina Meccafaeya Shevian",
    "18": "Mirza Rizky Ukail",
    "19": "Muhammad Anwar Pulungan",
    "20": "Muhammad Athar Al-Fatih",
    "21": "Naura Falisha Azzahra",
    "22": "Nayla Azalia Akbar",
    "23": "Olivina Putri Cahyono",
    "24": "Rafaeyza Razka Prasetya",
    "25": "Rafazaky Abizar Zulkarnain",
    "26": "Raihan Nursaad Wardhana",
    "27": "Raka Ghailan Prhadana",
    "28": "Sabria Nur Latifah",
    "29": "Syatira Mampis Tuasa",
    "30": "Thaliefya Azzahra",
    "31": "Yumna Adelina Faldi",
    "32": "Zavier Shafaras Azka",
    "33": "Syifa Sabrina"
};

let currentStudentName = "";
let currentStudentAbsen = "";

// Dynamic Name Lookup for Attendance Number Input
function handleAbsenLookup(value) {
    const num = value.trim();
    const badge = document.getElementById("absenNameBadge");
    const startBtn = document.getElementById("startQuizBtn");

    if (!num) {
        badge.textContent = "Belum mengisi nomor absen";
        badge.style.background = "#F1F4F8";
        badge.style.color = "#718096";
        startBtn.style.opacity = "0.5";
        startBtn.style.pointerEvents = "none";
        return;
    }

    const name = studentDatabase[num];
    if (name) {
        badge.textContent = `Nama: ${name} ✅`;
        badge.style.background = "#EBFDF3";
        badge.style.color = "var(--green-dark)";
        startBtn.style.opacity = "1";
        startBtn.style.pointerEvents = "all";
    } else {
        badge.textContent = "Nomor absen tidak terdaftar ❌";
        badge.style.background = "#FFF5F5";
        badge.style.color = "var(--north-red)";
        startBtn.style.opacity = "0.5";
        startBtn.style.pointerEvents = "none";
    }
}

function openAbsenModal() {
    document.getElementById("absenInput").value = "";
    const badge = document.getElementById("absenNameBadge");
    badge.textContent = "Belum mengisi nomor absen";
    badge.style.background = "#F1F4F8";
    badge.style.color = "#718096";

    const startBtn = document.getElementById("startQuizBtn");
    startBtn.style.opacity = "0.5";
    startBtn.style.pointerEvents = "none";

    document.getElementById("absenModal").classList.add("show");
    setTimeout(() => document.getElementById("absenInput").focus(), 100);
}

function closeAbsenModal() {
    playClickSFX();
    document.getElementById("absenModal").classList.remove("show");
}

function confirmAbsenAndStart() {
    playClickSFX();

    const num = document.getElementById("absenInput").value.trim();
    const name = studentDatabase[num];

    if (name) {
        currentStudentName = name;
        currentStudentAbsen = num;

        // Hide Absen Modal
        document.getElementById("absenModal").classList.remove("show");

        const coverScreen = document.getElementById("screen-cover");
        const presScreen = document.getElementById("screen-presentation");
        const quizScreen = document.getElementById("screen-quiz");

        // Route seamlessly from active screen
        if (coverScreen.classList.contains("active")) {
            coverScreen.style.opacity = "0";
            coverScreen.style.transition = "opacity 0.4s ease";
            setTimeout(() => {
                coverScreen.classList.remove("active");
                coverScreen.style.display = "none";
                launchQuizScreen(quizScreen);
            }, 400);
        } else if (presScreen.classList.contains("active")) {
            presScreen.style.opacity = "0";
            presScreen.style.transition = "opacity 0.4s ease";
            setTimeout(() => {
                presScreen.classList.remove("active");
                presScreen.style.display = "none";
                launchQuizScreen(quizScreen);
            }, 400);
        } else {
            launchQuizScreen(quizScreen);
        }
    }
}

function launchQuizScreen(quizScreen) {
    quizScreen.style.display = "flex";
    quizScreen.classList.add("active");
    quizScreen.style.opacity = "0";
    void quizScreen.offsetWidth;
    quizScreen.style.transition = "opacity 0.4s ease";
    quizScreen.style.opacity = "1";
    initQuizState();
}

// Launch the Quiz screen directly from the Cover welcome page
function startQuizDirectly() {
    playClickSFX();
    openAbsenModal();
}

// Jump from Slide presentation header toolbar directly into Quiz Screen
function startQuizFromPresentation() {
    stopAutoplayIfRunning();
    playClickSFX();
    openAbsenModal();
}

// Jump from Slide end popup directly into Quiz Screen
function startQuizFromEndScreen() {
    document.getElementById("endScreen").classList.remove("show");
    startQuizFromPresentation();
}

// Transition back from Quiz Screen to Cover Welcome Page
function goToMainMenu() {
    playClickSFX();
    quizActive = false;

    try {
        localStorage.removeItem("asesmen_gaya_session");
    } catch (e) { }

    const activeScreen = document.querySelector(".screen.active");
    const coverScreen = document.getElementById("screen-cover");

    if (activeScreen) {
        activeScreen.style.opacity = "0";
        activeScreen.style.transition = "opacity 0.4s ease";

        setTimeout(() => {
            activeScreen.classList.remove("active");
            activeScreen.style.display = "none";

            coverScreen.style.display = "flex";
            coverScreen.classList.add("active");
            coverScreen.style.opacity = "0";

            void coverScreen.offsetWidth;

            coverScreen.style.transition = "opacity 0.4s ease";
            coverScreen.style.opacity = "1";

            // Reset slides pointer state
            currentSlide = 1;
        }, 400);
    }
}

// Global ANBK Answer Trackers
let studentAnswers = Array(15).fill(null);
let isUnsureFlags = Array(15).fill(false);
let studentAttempts = Array(15).fill(0);

// Initialize active quiz parameters
function initQuizState() {
    quizActive = true;
    currentQuestionIndex = 0;
    quizScore = 0;

    // Reset answers and flags arrays
    studentAnswers = Array(quizQuestions.length).fill(null);
    isUnsureFlags = Array(quizQuestions.length).fill(false);
    studentAttempts = Array(quizQuestions.length).fill(0);

    document.getElementById("quizScoreText").textContent = "0";

    saveSessionState();

    renderNumberGrid();
    loadQuestion();
}

// Renders the 1-15 circular buttons in the navigator grid
function renderNumberGrid() {
    const grid = document.getElementById("quizNumberGrid");
    if (!grid) return;
    grid.innerHTML = "";

    for (let i = 0; i < quizQuestions.length; i++) {
        const btn = document.createElement("button");
        btn.className = "num-btn";
        btn.textContent = i + 1;

        // Apply styling states
        if (i === currentQuestionIndex) {
            btn.classList.add("active");
        }
        if (studentAnswers[i] !== null) {
            btn.classList.add("answered");
        }
        if (isUnsureFlags[i]) {
            btn.classList.add("unsure");
        }

        btn.onclick = () => {
            playClickSFX();
            jumpToQuestion(i);
        };

        grid.appendChild(btn);
    }
}

// Jumps directly to a specific question index
function jumpToQuestion(index) {
    if (index < 0 || index >= quizQuestions.length) return;
    currentQuestionIndex = index;
    saveSessionState();
    loadQuestion();
}

// Pulls and loads question node template details
function loadQuestion() {
    const qData = quizQuestions[currentQuestionIndex];

    // Set Header indicators
    document.getElementById("quizQuestionIndicator").textContent = `Soal ${currentQuestionIndex + 1} / ${quizQuestions.length}`;

    // Set Top progress bar fill percentage
    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById("progressBar").style.width = `${progressPercent}%`;

    // Handle Question Image
    const qImg = document.getElementById("quizQuestionImage");
    if (qData.image) {
        qImg.src = qData.image;
        qImg.style.display = "block";
    } else {
        qImg.src = "";
        qImg.style.display = "none";
    }

    // Inject Question text
    document.getElementById("quizQuestionText").textContent = qData.question;

    // Generate Options Cards in grid or Input Field for Isian
    const grid = document.getElementById("quizOptionsGrid");
    grid.innerHTML = "";

    const savedAnswer = studentAnswers[currentQuestionIndex];
    const isAnswered = savedAnswer !== null && savedAnswer !== undefined && savedAnswer.toString().trim() !== "";
    const correctAnsStr = qData.answer ? (Array.isArray(qData.answer) ? qData.answer[0].toString().trim().toLowerCase() : qData.answer.toString().trim().toLowerCase()) : "";

    if (qData.options) {
        Object.keys(qData.options).forEach(letter => {
            const card = document.createElement("div");
            card.className = "option-card";
            card.setAttribute("data-letter", letter);

            if (isAnswered) {
                const isThisStudentAnswer = savedAnswer.toString().toLowerCase() === letter.toLowerCase();
                const isThisCorrectAnswer = correctAnsStr === letter.toLowerCase();

                if (isThisCorrectAnswer) {
                    card.style.background = "#C6F6D5";
                    card.style.borderColor = "#48BB78";
                    card.style.color = "#22543D";
                } else if (isThisStudentAnswer) {
                    card.style.background = "#FED7D7";
                    card.style.borderColor = "#FC8181";
                    card.style.color = "#742A2A";
                } else {
                    card.style.opacity = "0.6";
                }

                if (isThisStudentAnswer) {
                    card.classList.add("selected");
                }
                // Lock option
                card.onclick = null;
                card.style.cursor = "default";
            } else {
                card.onclick = () => selectOption(letter);
            }

            const prefix = document.createElement("span");
            prefix.className = "option-prefix";
            prefix.textContent = letter;

            const text = document.createElement("span");
            text.className = "option-text";
            text.textContent = qData.options[letter];

            card.appendChild(prefix);
            card.appendChild(text);
            grid.appendChild(card);
        });
    } else if (qData.dragOptions) {
        // Drag and Drop hibrid (Drag & Drop + Click-to-Select) UI
        const container = document.createElement("div");
        container.className = "drag-drop-container";

        let stagedDragAnswer = savedAnswer || null;

        const dropZoneWrapper = document.createElement("div");
        dropZoneWrapper.style.display = "flex";
        dropZoneWrapper.style.gap = "12px";
        dropZoneWrapper.style.alignItems = "center";
        dropZoneWrapper.style.justifyContent = "center";
        dropZoneWrapper.style.width = "100%";

        // Drop Zone Box
        const dropZone = document.createElement("div");
        dropZone.className = "drop-zone";
        dropZone.style.flex = "1";

        if (savedAnswer) {
            dropZone.textContent = savedAnswer;
            dropZone.classList.add("filled");

            if (isAnswered) {
                const isCorrect = correctAnsStr === savedAnswer.toString().toLowerCase();
                dropZone.style.background = isCorrect ? "#C6F6D5" : "#FED7D7";
                dropZone.style.borderColor = isCorrect ? "#48BB78" : "#FC8181";
                dropZone.style.color = isCorrect ? "#22543D" : "#742A2A";
            }
        } else {
            dropZone.innerHTML = `<span class="drop-placeholder">👉 Taruh / Klik jawaban di sini 👈</span>`;
        }

        const submitDragBtn = document.createElement("button");
        submitDragBtn.type = "button";
        submitDragBtn.className = "isian-submit-btn";
        submitDragBtn.innerHTML = "✓";
        if (isAnswered) {
            submitDragBtn.disabled = true;
            submitDragBtn.style.opacity = "0.5";
            submitDragBtn.style.cursor = "not-allowed";
            submitDragBtn.style.boxShadow = "none";
            submitDragBtn.style.transform = "none";
        } else {
            submitDragBtn.onclick = () => {
                if (stagedDragAnswer) {
                    playClickSFX();
                    selectDragAnswer(stagedDragAnswer);
                }
            };
        }

        // Draggable Options List
        const optionsList = document.createElement("div");
        optionsList.className = "drag-options-list";

        const stageAnswer = (text) => {
            stagedDragAnswer = text;
            dropZone.textContent = text;
            dropZone.classList.add("filled");

            const allCards = optionsList.querySelectorAll('.drag-card');
            allCards.forEach(c => {
                if (c.textContent === text) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            });
        };

        if (!isAnswered) {
            // Handle drag & drop events
            dropZone.ondragover = (e) => {
                e.preventDefault();
                dropZone.classList.add("drag-over");
            };

            dropZone.ondragleave = () => {
                dropZone.classList.remove("drag-over");
            };

            dropZone.ondrop = (e) => {
                e.preventDefault();
                dropZone.classList.remove("drag-over");
                const text = e.dataTransfer.getData("text/plain");
                if (text) {
                    playClickSFX();
                    stageAnswer(text);
                }
            };

            // Clear answer on click of drop zone (to reset)
            dropZone.onclick = () => {
                if (stagedDragAnswer || studentAnswers[currentQuestionIndex]) {
                    playClickSFX();
                    stagedDragAnswer = null;
                    if (studentAnswers[currentQuestionIndex]) {
                        studentAnswers[currentQuestionIndex] = null;
                        saveSessionState();
                    }
                    loadQuestion();
                }
            };
        }

        qData.dragOptions.forEach(opt => {
            const dragCard = document.createElement("div");
            dragCard.className = "drag-card";
            dragCard.textContent = opt;

            if (isAnswered) {
                dragCard.draggable = false;
                dragCard.style.opacity = "0.5";
                dragCard.style.cursor = "default";

                if (savedAnswer === opt) {
                    dragCard.classList.add("selected");
                    dragCard.style.opacity = "1";
                }
            } else {
                dragCard.draggable = true;
                if (savedAnswer === opt) dragCard.classList.add("selected");

                dragCard.ondragstart = (e) => {
                    e.dataTransfer.setData("text/plain", opt);
                    dragCard.classList.add("dragging");
                };
                dragCard.ondragend = () => dragCard.classList.remove("dragging");
                dragCard.onclick = () => {
                    playClickSFX();
                    stageAnswer(opt);
                };
            }

            optionsList.appendChild(dragCard);
        });

        dropZoneWrapper.appendChild(dropZone);
        dropZoneWrapper.appendChild(submitDragBtn);
        container.appendChild(dropZoneWrapper);
        container.appendChild(optionsList);
        grid.appendChild(container);
    } else {
        // Isian Singkat (Fill-in-the-blank) input UI
        const container = document.createElement("div");
        container.className = "isian-container";

        const input = document.createElement("input");
        input.type = "text";
        input.className = "isian-input";
        input.placeholder = "Tulis jawabanmu di sini...";
        input.value = savedAnswer || "";

        const submitBtn = document.createElement("button");
        submitBtn.type = "button";
        submitBtn.className = "isian-submit-btn";
        submitBtn.innerHTML = "✓";

        if (isAnswered) {
            input.readOnly = true;
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.5";
            submitBtn.style.cursor = "not-allowed";
            submitBtn.style.boxShadow = "none";
            submitBtn.style.transform = "none";

            let isCorrect = false;
            if (Array.isArray(qData.answer)) {
                isCorrect = qData.answer.some(a => savedAnswer.toString().trim().toLowerCase() === a.toString().trim().toLowerCase());
            } else {
                isCorrect = savedAnswer.toString().trim().toLowerCase() === correctAnsStr;
            }
            input.style.background = isCorrect ? "#C6F6D5" : "#FED7D7";
            input.style.borderColor = isCorrect ? "#48BB78" : "#FC8181";
            input.style.color = isCorrect ? "#22543D" : "#742A2A";
        } else {
            const submitAnswer = () => {
                const val = input.value.trim();
                if (val) {
                    playClickSFX();
                    handleAnswerAttempt(val);
                }
            };

            submitBtn.onclick = submitAnswer;
            input.onkeydown = (e) => {
                if (e.key === 'Enter') submitAnswer();
            };
        }

        container.appendChild(input);
        container.appendChild(submitBtn);
        grid.appendChild(container);

        // Auto focus
        setTimeout(() => input.focus(), 100);
    }

    // Get footer control buttons
    const prevBtn = document.getElementById("quizPrevBtn");
    const nextBtn = document.getElementById("quizNextBtn");
    const submitBtn = document.getElementById("quizSubmitBtn");
    const unsureBtn = document.getElementById("quizUnsureBtn");

    // Back button state
    if (prevBtn) {
        prevBtn.disabled = (currentQuestionIndex === 0);
    }

    // Unsure (Ragu-Ragu) button styling highlight
    if (unsureBtn) {
        if (isUnsureFlags[currentQuestionIndex]) {
            unsureBtn.classList.add("active");
            unsureBtn.style.background = "#FFC738";
            unsureBtn.style.border = "3px solid var(--north-red)";
        } else {
            unsureBtn.classList.remove("active");
            unsureBtn.style.background = "var(--accent-gold)";
            unsureBtn.style.border = "none";
        }
    }

    // Show Selesai (Submit) button on the last question, otherwise show Lanjut (Next)
    if (currentQuestionIndex === quizQuestions.length - 1) {
        if (nextBtn) nextBtn.style.display = "none";
        if (submitBtn) submitBtn.style.display = "inline-block";
    } else {
        if (nextBtn) nextBtn.style.display = "inline-block";
        if (submitBtn) submitBtn.style.display = "none";
    }

    // ============================================
    // INSTANT FEEDBACK RENDERING (KJ & PEMBAHASAN)
    // ============================================
    const feedbackArea = document.getElementById("quizFeedbackArea");
    if (feedbackArea) {
        // Only show if answered AND it's not empty whitespace
        const currentAns = studentAnswers[currentQuestionIndex];
        const isAnswered = currentAns !== null && currentAns !== undefined && currentAns.toString().trim() !== "";

        if (isAnswered) {
            feedbackArea.style.display = "flex";
            const correctAnsStr = Array.isArray(qData.answer) ? qData.answer[0].toString().trim().toLowerCase() : qData.answer.toString().trim().toLowerCase();
            const correctAnsDisplay = Array.isArray(qData.answer) ? qData.answer.join(" / ") : qData.answer;
            const studentAnsStr = currentAns.toString().trim().toLowerCase();

            let isCorrect = false;
            if (Array.isArray(qData.answer)) {
                isCorrect = qData.answer.some(a => studentAnsStr === a.toString().trim().toLowerCase());
            } else {
                isCorrect = studentAnsStr === correctAnsStr;
            }

            // Lock options visually if desired, though we'll still allow changing
            // We just render the feedback box here
            feedbackArea.innerHTML = `
                <div style="margin-top: 10px; background: ${isCorrect ? '#F0FFF4' : '#FFF5F5'}; border: 2.5px solid ${isCorrect ? '#68D391' : '#FC8181'}; border-radius: 12px; padding: 16px; animation: fadeIn 0.3s ease;">
                    <div style="font-size: var(--fs-base); font-weight: 800; color: ${isCorrect ? '#22543D' : '#742A2A'}; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                        ${isCorrect ? '✅ Jawabanmu Benar!' : '❌ Jawabanmu Salah'}
                    </div>
                    <div style="padding: 10px; background: white; border: 1.5px solid #E2E8F0; border-radius: 8px; font-weight: 800; color: #2D3748; margin-bottom: 12px; font-size: var(--fs-sm);">
                        Kunci Jawaban: <span style="color: #48BB78;">${correctAnsDisplay}</span>
                    </div>
                    ${qData.explanation ? `
                    <div style="background: #EBF8FF; border-left: 4px solid #4299E1; border-radius: 6px; padding: 10px 14px;">
                        <span style="font-size: 0.8rem; font-weight: 900; color: #2B6CB0; display: block; margin-bottom: 4px;">💡 PEMBAHASAN:</span>
                        <p style="font-weight: 700; color: #2C5282; margin: 0; line-height: 1.5; font-size: var(--fs-sm);">${qData.explanation}</p>
                    </div>
                    ` : ""}
                </div>
            `;
        } else {
            feedbackArea.style.display = "none";
            feedbackArea.innerHTML = "";
        }
    }

    // Sync Navigator active/answered rings
    renderNumberGrid();
}

// Centralized answer handler to manage the "1 retry" logic
function handleAnswerAttempt(studentAnsStr) {
    const qData = quizQuestions[currentQuestionIndex];
    const correctAnsStr = qData.answer ? (Array.isArray(qData.answer) ? qData.answer[0].toString().trim().toLowerCase() : qData.answer.toString().trim().toLowerCase()) : "";

    let isCorrect = false;
    if (Array.isArray(qData.answer)) {
        isCorrect = qData.answer.some(a => studentAnsStr.toString().trim().toLowerCase() === a.toString().trim().toLowerCase());
    } else {
        isCorrect = studentAnsStr.toString().trim().toLowerCase() === correctAnsStr;
    }

    if (isCorrect) {
        if (typeof playCorrectSFX === "function") playCorrectSFX();
        else playClickSFX();

        studentAnswers[currentQuestionIndex] = studentAnsStr;
        saveSessionState();
        loadQuestion();
    } else {
        // Wrong answer
        studentAttempts[currentQuestionIndex] = (studentAttempts[currentQuestionIndex] || 0) + 1;

        if (studentAttempts[currentQuestionIndex] < 2) {
            if (typeof playWrongSFX === "function") playWrongSFX();
            else playClickSFX();

            // Show try again message without locking
            const feedbackArea = document.getElementById("quizFeedbackArea");
            if (feedbackArea) {
                feedbackArea.style.display = "flex";
                feedbackArea.innerHTML = `
                    <div style="margin-top: 10px; background: #FFF5F5; border: 2.5px solid #FC8181; border-radius: 12px; padding: 16px; animation: shake 0.4s ease;">
                        <div style="font-size: var(--fs-base); font-weight: 800; color: #742A2A; display: flex; align-items: center; gap: 8px;">
                            ❌ Jawaban belum tepat. Ayo coba 1 kali lagi! Semangat! 💪
                        </div>
                    </div>
                `;
            }
        } else {
            // Second attempt failed, lock and show correct answer
            if (typeof playWrongSFX === "function") playWrongSFX();
            else playClickSFX();

            studentAnswers[currentQuestionIndex] = studentAnsStr;
            saveSessionState();
            loadQuestion();
        }
    }
}

// Stores selected option letter (ANBK-style free selection)
function selectOption(letter) {
    handleAnswerAttempt(letter);
}

// Stores selected drag answer and triggers session auto-save
function selectDragAnswer(answer) {
    handleAnswerAttempt(answer);
}

// Toggles active question Unsure (Ragu-Ragu) flag
function toggleUnsureFlag() {
    playClickSFX();
    isUnsureFlags[currentQuestionIndex] = !isUnsureFlags[currentQuestionIndex];
    saveSessionState();
    loadQuestion();
}

// Navigates to the previous question
function prevQuizQuestion() {
    if (currentQuestionIndex > 0) {
        playClickSFX();
        currentQuestionIndex--;
        saveSessionState();
        loadQuestion();
    }
}

// Navigates to the next question
function nextQuizQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        playClickSFX();
        currentQuestionIndex++;
        saveSessionState();
        loadQuestion();
    }
}

// Triggers the submit confirmation modal showing stats
function checkSubmitQuiz() {
    playClickSFX();

    const answeredCount = studentAnswers.filter(ans => ans !== null).length;
    const unsureCount = isUnsureFlags.filter(flag => flag === true).length;

    document.getElementById("statAnswered").textContent = answeredCount;
    document.getElementById("statUnsure").textContent = unsureCount;

    document.getElementById("quizSubmitConfirmModal").classList.add("show");
}

// Closes the submit confirmation overlay
function closeSubmitConfirmModal() {
    playClickSFX();
    document.getElementById("quizSubmitConfirmModal").classList.remove("show");
}

// Evaluates the full quiz answers and updates scores at submission
function confirmSubmitQuiz() {
    playClickSFX();
    document.getElementById("quizSubmitConfirmModal").classList.remove("show");

    // Calculate score based on specific question types
    let rawScore = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
        const studentAns = studentAnswers[i] ? studentAnswers[i].toString().trim().toLowerCase() : "";

        let isCorrect = false;
        if (Array.isArray(quizQuestions[i].answer)) {
            isCorrect = quizQuestions[i].answer.some(ans => {
                return studentAns === ans.toString().trim().toLowerCase();
            });
        } else {
            const correctAns = quizQuestions[i].answer ? quizQuestions[i].answer.toString().trim().toLowerCase() : "";
            isCorrect = (studentAns === correctAns);
        }

        if (isCorrect) {
            // Scoring rules:
            // 1-15 (index 0-14): Pilihan Ganda = +1 point
            // 16-25 (index 15-24): Isian Singkat = +2 points
            // 26-30 (index 25-29): Drag & Drop = +3 points
            if (i < 15) {
                rawScore += 1;
            } else if (i < 25) {
                rawScore += 2;
            } else {
                rawScore += 3;
            }
        }
    }

    // Final score = total raw points * 2 (maximum 100 points)
    quizScore = rawScore * 2;
    document.getElementById("quizScoreText").textContent = quizScore;

    // Terminate active quiz status
    quizActive = false;

    // Automatically submit to Google Form in the background
    sendQuizToGoogleForm(true);

    try {
        localStorage.removeItem("asesmen_gaya_session");
    } catch (e) { }

    // Trigger success chime and show end screen
    showQuizEndScreen();
}

// Show the final quiz score report screen popup
function showQuizEndScreen() {
    playSuccessSFX();

    document.getElementById("quizFinalScore").textContent = `${quizScore} / 100 Poin ⭐`;

    // Pre-fill student name in reporting card
    const nameInput = document.getElementById("studentName");
    if (nameInput) {
        nameInput.value = currentStudentName ? `${currentStudentAbsen}. ${currentStudentName}` : "";
    }

    document.getElementById("quizEndScreen").classList.add("show");
}

// Reset quiz state and restart
function restartQuiz() {
    playClickSFX();
    document.getElementById("quizEndScreen").classList.remove("show");
    initQuizState();
}

// Prepares and builds Whatsapp score report URL links
function sendQuizToWhatsApp() {
    playClickSFX();
    const nameInput = document.getElementById("studentName");
    const name = nameInput.value.trim();

    if (!name) {
        alert("Silakan masukkan nama lengkapmu terlebih dahulu sebelum mengirim nilai! ✍️");
        nameInput.focus();
        return;
    }

    const message = `Halo Guru! 🏫\nSaya telah menyelesaikan Kuis Asesmen Materi Gaya.\n\n👤 Nama Lengkap: ${name}\n🏆 Skor Kuis: ${quizScore} / 100 Poin ⭐\n\nTerima kasih! 🧲`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

    window.open(waUrl, "_blank");
}

// Automated submission method to Google Form in the background (Robust HTML Form targeted to Iframe)
function sendQuizToGoogleForm(isAuto = false) {
    if (!isAuto) playClickSFX();

    if (!currentStudentName) {
        if (!isAuto) alert("Identitas nomor absen siswa belum terdaftar! Silakan ulangi kuis. ❌");
        return;
    }

    // Google Form Integration Configuration (Real values automatically populated)
    const formId = "1FAIpQLSe29D-r3jXIlh36PivkY4AeCzCncPuhek5lUDQQowrd4uq8fQ";
    const entryAbsen = "entry.1602438668";
    const entryNama = "entry.269432003";
    const entrySkor = "entry.70778439";

    const submitUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

    // Ensure hidden background iframe exists
    let iframe = document.getElementById("hidden_iframe");
    if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = "hidden_iframe";
        iframe.name = "hidden_iframe";
        iframe.style.display = "none";
        iframe.src = "about:blank";
        document.body.appendChild(iframe);
    }

    // Create hidden form element to POST data silently
    const hiddenForm = document.createElement("form");
    hiddenForm.method = "POST";
    hiddenForm.action = submitUrl;
    hiddenForm.target = "hidden_iframe"; // Send to the background iframe
    hiddenForm.style.display = "none";

    // Input 1: Absen
    const inputAbsen = document.createElement("input");
    inputAbsen.type = "hidden";
    inputAbsen.name = entryAbsen;
    inputAbsen.value = currentStudentAbsen;
    hiddenForm.appendChild(inputAbsen);

    // Input 2: Nama
    const inputNama = document.createElement("input");
    inputNama.type = "hidden";
    inputNama.name = entryNama;
    inputNama.value = currentStudentName;
    hiddenForm.appendChild(inputNama);

    // Input 3: Skor
    const inputSkor = document.createElement("input");
    inputSkor.type = "hidden";
    inputSkor.name = entrySkor;
    inputSkor.value = quizScore;
    hiddenForm.appendChild(inputSkor);

    // Submit form silently
    document.body.appendChild(hiddenForm);

    try {
        hiddenForm.submit();
        console.log("Background Google Form submission triggered.");
    } catch (e) {
        console.warn("Direct form submit error:", e);
    }

    // CRITICAL FIX: Do NOT remove the form element from DOM immediately.
    // Doing so synchronously causes modern browsers (Chrome/Safari) to abort the request.
    setTimeout(() => {
        if (document.body.contains(hiddenForm)) {
            document.body.removeChild(hiddenForm);
        }
    }, 2000);

    // Show success status on UI
    const statusText = document.getElementById("autoSubmitStatus");
    if (statusText) {
        statusText.style.display = "block";
        statusText.textContent = `✓ Nilai atas nama "${currentStudentName}" (Absen ${currentStudentAbsen}) berhasil terkirim otomatis ke Google Form Guru!`;
    }

    if (!isAuto) {
        alert(`🎉 Nilai atas nama "${currentStudentName}" (Absen ${currentStudentAbsen}) dengan Skor ${quizScore} BERHASIL dikirim otomatis ke Google Form Guru! Terima kasih! ✨`);
    } else {
        console.log("Automated background Google Form submission completed.");
    }
}

// === LOCAL STORAGE SESSION RECOVERY FUNCTIONS ===
function saveSessionState() {
    try {
        const state = {
            currentSlide: currentSlide,
            quizActive: quizActive,
            currentQuestionIndex: currentQuestionIndex,
            studentAnswers: studentAnswers,
            isUnsureFlags: isUnsureFlags,
            studentAttempts: studentAttempts,
            currentStudentName: currentStudentName,
            currentStudentAbsen: currentStudentAbsen
        };
        localStorage.setItem("asesmen_gaya_session", JSON.stringify(state));
    } catch (e) {
        console.warn("Could not save session state to localStorage:", e);
    }
}

function loadSessionState() {
    try {
        const saved = localStorage.getItem("asesmen_gaya_session");
        if (!saved) return;

        const state = JSON.parse(saved);

        // Restore student identity if it exists
        if (state.currentStudentName) {
            currentStudentName = state.currentStudentName;
            currentStudentAbsen = state.currentStudentAbsen;
        }

        // Restore slide presentation state
        if (state.currentSlide) {
            currentSlide = state.currentSlide;
        }

        // Restore quiz state
        if (state.quizActive) {
            quizActive = state.quizActive;
            currentQuestionIndex = state.currentQuestionIndex || 0;

            // Restore answers array
            if (state.studentAnswers && state.studentAnswers.length === quizQuestions.length) {
                studentAnswers = state.studentAnswers;
                isUnsureFlags = state.isUnsureFlags || Array(quizQuestions.length).fill(false);
                studentAttempts = state.studentAttempts || Array(quizQuestions.length).fill(0);
            } else {
                studentAnswers = Array(quizQuestions.length).fill(null);
                isUnsureFlags = Array(quizQuestions.length).fill(false);
                studentAttempts = Array(quizQuestions.length).fill(0);
            }

            // Seamlessly route to quiz screen if it was active
            const coverScreen = document.getElementById("screen-cover");
            const quizScreen = document.getElementById("screen-quiz");
            if (coverScreen && quizScreen) {
                coverScreen.classList.remove("active");
                coverScreen.style.display = "none";
                quizScreen.style.display = "flex";
                quizScreen.classList.add("active");
                quizScreen.style.opacity = "1";
            }

            renderNumberGrid();
            loadQuestion();
        } else if (state.currentSlide > 1) {
            // Restore to the saved slide in presentation
            const coverScreen = document.getElementById("screen-cover");
            const presentationScreen = document.getElementById("screen-presentation");
            if (coverScreen && presentationScreen) {
                coverScreen.classList.remove("active");
                coverScreen.style.display = "none";
                presentationScreen.style.display = "flex";
                presentationScreen.classList.add("active");
                presentationScreen.style.opacity = "1";
            }
            goToSlide(currentSlide, null); // Load silently without SFX transition
        }
    } catch (e) {
        console.warn("Could not load session state from localStorage:", e);
    }
}

// =============================================
// REVIEW PEMBAHASAN SCREEN
// =============================================

function openReviewScreen() {
    playClickSFX();

    // Hide quiz end overlay
    document.getElementById("quizEndScreen").classList.remove("show");

    // Hide quiz screen
    const quizScreen = document.getElementById("screen-quiz");
    if (quizScreen) {
        quizScreen.classList.remove("active");
        quizScreen.style.display = "none";
    }

    // Show review screen
    const reviewScreen = document.getElementById("screen-review");
    if (reviewScreen) {
        reviewScreen.style.display = "block";
        reviewScreen.classList.add("active");
        reviewScreen.scrollTop = 0;
    }

    renderReviewCards();
}

function closeReviewScreen() {
    playClickSFX();

    // Hide review screen
    const reviewScreen = document.getElementById("screen-review");
    if (reviewScreen) {
        reviewScreen.classList.remove("active");
        reviewScreen.style.display = "none";
    }

    // Show quiz end overlay again
    document.getElementById("quizEndScreen").classList.add("show");

    // Restore quiz screen
    const quizScreen = document.getElementById("screen-quiz");
    if (quizScreen) {
        quizScreen.style.display = "flex";
        quizScreen.classList.add("active");
    }
}

function renderReviewCards() {
    const container = document.getElementById("reviewQuestionsContainer");
    const summary = document.getElementById("reviewScoreSummary");
    if (!container) return;
    container.innerHTML = "";

    // Count correct answers
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    quizQuestions.forEach((q, i) => {
        const studentAns = studentAnswers[i];
        const studentAnsStr = studentAns !== null && studentAns !== undefined ? studentAns.toString().trim().toLowerCase() : null;

        let isCorrect = false;
        if (studentAnsStr !== null) {
            if (Array.isArray(q.answer)) {
                isCorrect = q.answer.some(a => studentAnsStr === a.toString().trim().toLowerCase());
            } else {
                isCorrect = studentAnsStr === q.answer.toString().trim().toLowerCase();
            }
        }

        if (studentAns === null || studentAns === undefined) unansweredCount++;
        else if (isCorrect) correctCount++;
        else wrongCount++;
    });

    // Render summary bar
    summary.innerHTML = `
        <div style="text-align:center;">
            <span style="font-size:1.4rem; font-weight:900; color:#2D3748;">Skor Akhir:</span>
            <span style="font-size:1.8rem; font-weight:900; color:#4A90E2; margin-left:8px;">${quizScore} / 100 Poin ⭐</span>
        </div>
        <div style="display:flex; gap:16px; flex-wrap:wrap; justify-content:center; margin-top:10px;">
            <span style="background:#C6F6D5; color:#22543D; padding:6px 16px; border-radius:20px; font-weight:800;">✅ Benar: ${correctCount}</span>
            <span style="background:#FED7D7; color:#742A2A; padding:6px 16px; border-radius:20px; font-weight:800;">❌ Salah: ${wrongCount}</span>
            <span style="background:#E2E8F0; color:#4A5568; padding:6px 16px; border-radius:20px; font-weight:800;">⬜ Kosong: ${unansweredCount}</span>
        </div>
    `;

    // Render each question card
    quizQuestions.forEach((q, i) => {
        const studentAns = studentAnswers[i];
        const studentAnsStr = studentAns !== null && studentAns !== undefined ? studentAns.toString().trim().toLowerCase() : null;
        const correctAnsStr = Array.isArray(q.answer) ? q.answer[0].toString().trim().toLowerCase() : q.answer.toString().trim().toLowerCase();
        const correctAnsDisplay = Array.isArray(q.answer) ? q.answer[0] : q.answer;

        let isCorrect = false;
        if (studentAnsStr !== null) {
            if (Array.isArray(q.answer)) {
                isCorrect = q.answer.some(a => studentAnsStr === a.toString().trim().toLowerCase());
            } else {
                isCorrect = studentAnsStr === correctAnsStr;
            }
        }

        const isUnanswered = studentAns === null || studentAns === undefined;

        // Card border color
        let cardBorderColor = isUnanswered ? "#CBD5E0" : isCorrect ? "#68D391" : "#FC8181";
        let cardBg = isUnanswered ? "#F7FAFC" : isCorrect ? "#F0FFF4" : "#FFF5F5";
        let statusIcon = isUnanswered ? "⬜" : isCorrect ? "✅" : "❌";
        let statusText = isUnanswered ? "Tidak Dijawab" : isCorrect ? "Benar" : "Salah";
        let statusColor = isUnanswered ? "#718096" : isCorrect ? "#22543D" : "#742A2A";
        let statusBg = isUnanswered ? "#EDF2F7" : isCorrect ? "#C6F6D5" : "#FED7D7";

        // Determine question type label
        let typeLabel = "";
        if (i < 15) typeLabel = "Pilihan Ganda";
        else if (i < 25) typeLabel = "Isian Singkat";
        else typeLabel = "Drag & Drop";

        // Build options HTML (only for multiple choice)
        let optionsHTML = "";
        if (q.options && i < 15) {
            Object.entries(q.options).forEach(([key, val]) => {
                const keyLower = key.toLowerCase();
                const isThisStudentAnswer = studentAnsStr === keyLower;
                const isThisCorrectAnswer = correctAnsStr === keyLower;

                let optBg = "white";
                let optBorder = "#E2E8F0";
                let optLabel = "";
                let optColor = "#2D3748";

                if (isThisCorrectAnswer) {
                    optBg = "#C6F6D5";
                    optBorder = "#48BB78";
                    optLabel = " ✅ KJ";
                    optColor = "#22543D";
                }
                if (isThisStudentAnswer && !isThisCorrectAnswer) {
                    optBg = "#FED7D7";
                    optBorder = "#FC8181";
                    optLabel = " ❌ Jawabanmu";
                    optColor = "#742A2A";
                }
                if (isThisStudentAnswer && isThisCorrectAnswer) {
                    optBg = "#C6F6D5";
                    optBorder = "#48BB78";
                    optLabel = " ✅ Benar!";
                    optColor = "#22543D";
                }

                optionsHTML += `
                    <div style="padding: 10px 14px; border: 2px solid ${optBorder}; border-radius: 8px; background: ${optBg}; font-weight: 800; color: ${optColor}; display: flex; justify-content: space-between; align-items: center;">
                        <span><b>${key}.</b> ${val}</span>
                        ${optLabel ? `<span style="font-size:0.8rem; white-space:nowrap; margin-left:8px;">${optLabel}</span>` : ""}
                    </div>
                `;
            });
        } else {
            // Isian singkat / drag & drop — show student answer vs correct answer
            const studentDisplayText = isUnanswered ? "<i style='color:#A0AEC0'>Tidak dijawab</i>" : `<b>${studentAns}</b>`;
            const correctDisplayText = Array.isArray(q.answer) ? q.answer.join(" / ") : q.answer;

            optionsHTML = `
                <div style="display:flex; flex-direction:column; gap:8px;">
                    <div style="padding:10px 14px; border:2px solid ${isCorrect ? '#48BB78' : isUnanswered ? '#CBD5E0' : '#FC8181'}; border-radius:8px; background:${isCorrect ? '#C6F6D5' : isUnanswered ? '#EDF2F7' : '#FED7D7'}; font-weight:800; color:${isCorrect ? '#22543D' : isUnanswered ? '#718096' : '#742A2A'};">
                        ✏️ Jawabanmu: ${studentDisplayText}
                    </div>
                    <div style="padding:10px 14px; border:2px solid #48BB78; border-radius:8px; background:#C6F6D5; font-weight:800; color:#22543D;">
                        ✅ Kunci Jawaban: <b>${correctDisplayText}</b>
                    </div>
                </div>
            `;
        }

        // Question text (preserve newlines)
        const questionText = q.question.replace(/\n/g, "<br>");

        const card = document.createElement("div");
        card.style.cssText = `background:${cardBg}; border:2.5px solid ${cardBorderColor}; border-radius:16px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.05); animation: fadeIn 0.3s ease;`;
        card.innerHTML = `
            <!-- Card header -->
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
                <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                    <span style="background:#667EEA; color:white; padding:4px 12px; border-radius:20px; font-size:0.82rem; font-weight:900;">Soal ${i + 1}</span>
                    <span style="background:#E2E8F0; color:#4A5568; padding:4px 10px; border-radius:20px; font-size:0.8rem; font-weight:800;">${typeLabel}</span>
                </div>
                <span style="background:${statusBg}; color:${statusColor}; padding:4px 12px; border-radius:20px; font-size:0.85rem; font-weight:900;">${statusIcon} ${statusText}</span>
            </div>

            <!-- Image (if any) -->
            ${q.image ? `<img src="${q.image}" alt="Gambar soal ${i + 1}" style="max-width:100%; border-radius:10px; margin-bottom:12px; border:2px solid #E2E8F0;">` : ""}

            <!-- Question text -->
            <p style="font-weight:700; color:#2D3748; font-size:var(--fs-base); line-height:1.65; margin:0 0 16px 0;">${questionText}</p>

            <!-- Options / Answer -->
            <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px;">
                ${optionsHTML}
            </div>

            <!-- Pembahasan box -->
            ${q.explanation ? `
            <div style="background:#EBF8FF; border-left:4px solid #4299E1; border-radius:8px; padding:12px 16px;">
                <span style="font-size:0.82rem; font-weight:900; color:#2B6CB0; display:block; margin-bottom:6px;">💡 PEMBAHASAN:</span>
                <p style="font-weight:700; color:#2C5282; margin:0; line-height:1.6; font-size:var(--fs-sm);">${q.explanation}</p>
            </div>
            ` : ""}
        `;
        container.appendChild(card);
    });
}



let lastFetchedClassScores = [];

// Open passcode popup
function openTeacherLogin() {
    playClickSFX();
    document.getElementById("teacherPasscodeInput").value = "";
    document.getElementById("teacherLoginModal").classList.add("show");
    setTimeout(() => {
        document.getElementById("teacherPasscodeInput").focus();
    }, 150);
}

// Close passcode popup
function closeTeacherLogin() {
    playClickSFX();
    document.getElementById("teacherLoginModal").classList.remove("show");
}

// Verify entered passcode
function verifyTeacherPasscode() {
    const code = document.getElementById("teacherPasscodeInput").value.trim();
    // Passcode: guru15 or 123
    if (code === "guru15" || code === "123") {
        playSuccessSFX();
        document.getElementById("teacherLoginModal").classList.remove("show");
        openTeacherPanel();
    } else {
        playClickSFX();
        alert("Sandi Keamanan Salah! Akses ditolak. ❌");
        document.getElementById("teacherPasscodeInput").value = "";
        document.getElementById("teacherPasscodeInput").focus();
    }
}

// Route to Teacher Panel Screen
function openTeacherPanel() {
    // Hide Cover Screen
    const coverScreen = document.getElementById("screen-cover");
    if (coverScreen) {
        coverScreen.classList.remove("active");
        coverScreen.style.display = "none";
    }

    // Show Teacher Panel Screen
    const teacherScreen = document.getElementById("screen-teacher");
    if (teacherScreen) {
        teacherScreen.style.display = "block";
        teacherScreen.classList.add("active");
    }

    // Fetch latest class scores automatically
    fetchClassScores();
}

// Close Teacher Panel and return to Cover
function closeTeacherPanel() {
    playClickSFX();

    // Hide Teacher Screen
    const teacherScreen = document.getElementById("screen-teacher");
    if (teacherScreen) {
        teacherScreen.classList.remove("active");
        teacherScreen.style.display = "none";
    }

    // Show Cover Screen
    const coverScreen = document.getElementById("screen-cover");
    if (coverScreen) {
        coverScreen.style.display = "flex";
        coverScreen.classList.add("active");
    }
}

// Fetches the published Google Sheets CSV data in the background
function fetchClassScores() {
    const refreshBtn = document.getElementById("teacherRefreshBtn");
    const refreshIcon = document.getElementById("refreshIconSpan");
    const statusBadge = document.getElementById("connectionStatusBadge");

    // Start spin animation & disable button
    if (refreshIcon) refreshIcon.classList.add("spinning");
    if (refreshBtn) refreshBtn.disabled = true;
    if (statusBadge) {
        statusBadge.textContent = "Status: Mengambil Data... 🔄";
        statusBadge.style.background = "#FEFCBF"; // Yellowish background
        statusBadge.style.color = "#B7791F";
    }

    // Google Sheets CSV Link (Real spreadsheet published link)
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSTUGG8HtvY3jhEBBSTbRwfUoApUX0N-3w-GCoBfb1nZa_yAtmo4xd9WLlADk0kD6hl0mKDmhkurv8r/pub?gid=1578870819&single=true&output=csv";

    fetch(csvUrl + "&t=" + new Date().getTime()) // Prevent cache
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.text();
        })
        .then(csvText => {
            console.log("Successfully fetched CSV data.");
            const parsedRows = parseCSVText(csvText);

            // Map raw rows to structured database
            lastFetchedClassScores = mapCSVToStudents(parsedRows);

            // Render to dashboard
            renderTeacherDashboard();

            if (statusBadge) {
                statusBadge.textContent = "Status: Terhubung & Sinkron ✅";
                statusBadge.style.background = "#C6F6D5"; // Green background
                statusBadge.style.color = "#22543D";
            }
        })
        .catch(err => {
            console.error("Error loading student scores:", err);
            if (statusBadge) {
                statusBadge.textContent = "Status: Gagal Sinkronisasi ❌";
                statusBadge.style.background = "#FED7D7"; // Red background
                statusBadge.style.color = "#742A2A";
            }
            alert("Gagal memuat rekap nilai siswa! Pastikan Google Sheet Anda sudah di-Publish ke Web sebagai format CSV (.csv) seperti di Panduan. ⚠️");

            // Fallback empty render
            lastFetchedClassScores = mapCSVToStudents([]);
            renderTeacherDashboard();
        })
        .finally(() => {
            // Stop spin animation & enable button
            setTimeout(() => {
                if (refreshIcon) refreshIcon.classList.remove("spinning");
                if (refreshBtn) refreshBtn.disabled = false;
            }, 500);
        });
}

// Parses raw CSV text safely handling comma delimiters and quotes
function parseCSVText(text) {
    const lines = text.split("\n");
    const rows = [];

    for (let i = 1; i < lines.length; i++) { // Skip header row
        const line = lines[i].trim();
        if (!line) continue;

        const cols = [];
        let cur = "";
        let insideQuotes = false;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                cols.push(cur.trim());
                cur = "";
            } else {
                cur += char;
            }
        }
        cols.push(cur.trim());
        rows.push(cols);
    }
    return rows;
}

// Maps parsed raw CSV rows to the master list of 33 class students
function mapCSVToStudents(rows) {
    const map = {};

    // Initialize master list from studentDatabase
    for (let num in studentDatabase) {
        map[num] = {
            absen: num,
            name: studentDatabase[num],
            completed: false,
            score: "-",
            timestamp: "-"
        };
    }

    // Parse Google Form structure: [Timestamp, Absen, Nama, Skor]
    // Absen is index 1, Name is index 2, Score is index 3
    rows.forEach(row => {
        if (row.length < 3) return; // Malformed row

        const timestamp = row[0] ? row[0].trim() : "-";
        const absenRaw = row[1] ? row[1].trim() : "";
        const nameRaw = row[2] ? row[2].trim() : "";
        const scoreRaw = row[3] ? row[3].trim() : "-";

        // Match by Absen Number first
        if (absenRaw && map[absenRaw]) {
            map[absenRaw].completed = true;
            map[absenRaw].score = scoreRaw;
            map[absenRaw].timestamp = timestamp;
        } else {
            // Fallback match: match by case-insensitive student name
            const searchName = nameRaw.toLowerCase().trim();
            for (let num in studentDatabase) {
                if (studentDatabase[num].toLowerCase().trim() === searchName) {
                    map[num].completed = true;
                    map[num].score = scoreRaw;
                    map[num].timestamp = timestamp;
                    break;
                }
            }
        }
    });

    // Convert map to flat array sorted by Absen Number
    return Object.values(map).sort((a, b) => parseInt(a.absen) - parseInt(b.absen));
}

// Renders lists and stats counters inside the dashboard
function renderTeacherDashboard() {
    const tableBody = document.getElementById("teacherTableBody");
    if (!tableBody) return;
    tableBody.innerHTML = "";

    let completedCount = 0;
    let totalScoreSum = 0;

    lastFetchedClassScores.forEach(student => {
        if (student.completed) {
            completedCount++;
            const numericScore = parseFloat(student.score);
            if (!isNaN(numericScore)) {
                totalScoreSum += numericScore;
            }
        }
    });

    // Update Stats
    const unsubmittedCount = 33 - completedCount;
    const averageScore = completedCount > 0 ? (totalScoreSum / completedCount).toFixed(1) : "0.0";

    document.getElementById("statSubmissions").textContent = `${completedCount} / 33`;
    document.getElementById("statUnsubmitted").textContent = `${unsubmittedCount} Siswa`;
    document.getElementById("statClassAverage").textContent = `${averageScore} Poin`;

    // Render default table matching search/filters
    filterTeacherTable();
}

// Handles instant client-side searching and filtering of student scores
function filterTeacherTable() {
    const tableBody = document.getElementById("teacherTableBody");
    if (!tableBody) return;
    tableBody.innerHTML = "";

    const searchVal = document.getElementById("teacherSearchInput").value.toLowerCase().trim();
    const filterVal = document.getElementById("teacherStatusFilter").value;

    lastFetchedClassScores.forEach(student => {
        // Search filter match
        const matchesSearch = student.name.toLowerCase().includes(searchVal) || student.absen.toString() === searchVal;

        // Status filter match
        let matchesStatus = true;
        if (filterVal === "completed") {
            matchesStatus = student.completed;
        } else if (filterVal === "unsubmitted") {
            matchesStatus = !student.completed;
        }

        if (matchesSearch && matchesStatus) {
            const tr = document.createElement("tr");
            tr.style.borderBottom = "1px solid #EDF2F7";

            // Status and styling elements
            let statusBadgeHtml = "";
            let scoreHtml = "";
            let rowBg = "white";

            if (student.completed) {
                statusBadgeHtml = `<span style="display: inline-block; background: #C6F6D5; color: #22543D; padding: 4px 10px; border-radius: 20px; font-weight: 800; font-size: 0.85rem;">Sudah ✅</span>`;
                scoreHtml = `<span style="font-weight: 900; color: #2B6CB0; font-size: 1.1rem;">${student.score}</span>`;
            } else {
                statusBadgeHtml = `<span style="display: inline-block; background: #FED7D7; color: #742A2A; padding: 4px 10px; border-radius: 20px; font-weight: 800; font-size: 0.85rem;">Belum ❌</span>`;
                scoreHtml = `<span style="color: #A0AEC0; font-weight: bold;">-</span>`;
                rowBg = "#FDFDFD";
            }

            tr.style.background = rowBg;

            tr.innerHTML = `
                <td style="padding: 12px 20px; text-align: center; font-weight: 800; color: #4A5568;">${student.absen}</td>
                <td style="padding: 12px 20px; font-weight: 800; color: #2D3748; text-align: left;">${student.name}</td>
                <td style="padding: 12px 20px; text-align: center;">${statusBadgeHtml}</td>
                <td style="padding: 12px 20px; text-align: center;">${scoreHtml}</td>
                <td style="padding: 12px 20px; text-align: center; color: #718096; font-size: 0.85rem; font-weight: bold;">${student.timestamp}</td>
            `;

            tableBody.appendChild(tr);
        }
    });

    // Show empty placeholder if no rows match filter/search
    if (tableBody.children.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td colspan="5" style="padding: 40px; text-align: center; font-weight: bold; color: #A0AEC0; font-size: 1rem;">
                🔍 Tidak ada data siswa yang cocok dengan filter pencarian.
            </td>
        `;
        tableBody.appendChild(tr);
    }
}

// === SAVE PROGRESS LINK LOGIC (COMPACT) ===
function openSaveModal() {
    playClickSFX();
    saveSessionState();
    const saved = localStorage.getItem("asesmen_gaya_session");
    if (!saved) { alert("Belum ada progress yang bisa disimpan!"); return; }

    // Compact encoding: only essential fields, URL-safe Base64
    const state = JSON.parse(saved);
    const compact = {
        n: state.currentStudentName || "",
        a: state.currentStudentAbsen || "",
        q: state.currentQuestionIndex || 0,
        ans: (state.studentAnswers || []).map(x => (x == null) ? '' : x).join(','),
        u: (state.isUnsureFlags || []).map(f => f ? '1' : '0').join(''),
        att: (state.studentAttempts || []).map(v => v || 0).join('')
    };
    const b64 = btoa(JSON.stringify(compact)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    const saveUrl = `${window.location.origin}${window.location.pathname}?s=${b64}`;

    document.getElementById("saveLinkInput").value = saveUrl;
    document.getElementById("saveProgressModal").classList.add("show");
}

function closeSaveModal() {
    playClickSFX();
    document.getElementById("saveProgressModal").classList.remove("show");
}

function copySaveLink() {
    playClickSFX();
    const input = document.getElementById("saveLinkInput");
    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value).then(() => {
        alert("Link berhasil disalin! 📋");
    });
}

function shareSaveLinkWA() {
    playClickSFX();
    const link = document.getElementById("saveLinkInput").value;
    const text = `Halo! Ini link untuk melanjutkan kuis Asesmen Gaya milikku. Klik link di bawah untuk langsung melanjutkan dari nomor terakhir:\n\n${link}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
}

function checkSaveLinkOnLoad() {
    const p = new URLSearchParams(window.location.search).get('s');
    if (!p) return;
    try {
        const compact = JSON.parse(atob(p.replace(/-/g, '+').replace(/_/g, '/')));
        const totalQ = quizQuestions.length;
        const ansParts = compact.ans ? compact.ans.split(',') : [];

        const expanded = {
            currentStudentName: compact.n || "",
            currentStudentAbsen: compact.a || "",
            currentQuestionIndex: parseInt(compact.q) || 0,
            quizActive: true,
            currentSlide: 1,
            studentAnswers: Array.from({ length: totalQ }, (_, i) => {
                const v = ansParts[i];
                return (v === undefined || v === '') ? null : v;
            }),
            isUnsureFlags: Array.from({ length: totalQ }, (_, i) =>
                compact.u ? compact.u[i] === '1' : false
            ),
            studentAttempts: Array.from({ length: totalQ }, (_, i) =>
                compact.att ? parseInt(compact.att[i]) || 0 : 0
            )
        };

        localStorage.setItem("asesmen_gaya_session", JSON.stringify(expanded));
        window.history.replaceState({}, document.title, window.location.pathname);

        setTimeout(() => {
            const coverScreen = document.getElementById("screen-cover");
            const quizScreen = document.getElementById("screen-quiz");
            if (coverScreen) { coverScreen.classList.remove("active"); coverScreen.style.display = "none"; }
            quizActive = true;
            if (quizScreen) { quizScreen.style.display = "flex"; quizScreen.classList.add("active"); }
            loadSessionState();
            loadQuestion();
            alert("✨ Progress belajarmu berhasil dimuat! Kamu bisa melanjutkan kuisnya sekarang.");
        }, 150);

    } catch (e) {
        console.warn("Invalid save link:", e);
        alert("Maaf, link simpan progress tidak valid atau rusak.");
    }
}
