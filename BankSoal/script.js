document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const subjectScreen = document.getElementById('subject-screen');
    const quizScreen = document.getElementById('quiz-screen');
    
    const startBtn = document.getElementById('start-btn');
    const backBtn = document.getElementById('back-btn');
    const backToSubjectBtn = document.getElementById('back-to-subject-btn');
    const subjectBtns = document.querySelectorAll('.subject-btn');

    // Pembahasan elements
    const pembahasanOverlay = document.getElementById('pembahasan-overlay');
    const pembahasanContent = document.getElementById('pembahasan-content');
    const pembahasanIcon = document.getElementById('pembahasan-icon');
    const closePembahasanBtn = document.getElementById('close-pembahasan-btn');

    // Quiz elements
    const quizContainer = document.getElementById('quiz-container');
    const currentScoreEl = document.getElementById('current-score');
    const quizTitle = document.getElementById('quiz-title');
    const quizCompletion = document.getElementById('quiz-completion');
    const finalScoreText = document.getElementById('final-score-text');
    const finishBtn = document.getElementById('finish-btn');

    let currentSubject = '';
    let score = 0;
    let questionsAnswered = 0;
    let currentQuestions = [];
    let currentQuizState = [];

    const LETTERS = ['A', 'B', 'C', 'D'];

    // --- DATA PLACEHOLDER ---
    // Nanti diganti dengan soal dari pengguna
    const pancasilaQuestions = [
        {
            q: "Saat kerja bakti membersihkan kelas, Raka melihat temannya hanya duduk dan tidak membantu. Sikap Raka yang paling sesuai dengan nilai Pancasila adalah ....",
            opts: ["membiarkan karena itu bukan urusannya", "memarahi temannya di depan kelas", "mengajak temannya membantu dengan baik-baik", "melaporkan temannya agar dihukum berat"],
            ans: 2,
            pembahasan: "Mengajak teman membantu dengan baik-baik menunjukkan sikap gotong royong dan saling mengingatkan tanpa menyakiti perasaan."
        },
        {
            q: "Di kelas 4 Bukhari akan dipilih ketua kelas. Ada dua calon yang sama-sama baik. Cara menentukan ketua kelas yang sesuai sila keempat Pancasila adalah ....",
            opts: ["memilih berdasarkan teman terdekat", "melakukan musyawarah atau pemungutan suara", "membiarkan guru memilih sendiri", "memilih siswa yang paling pintar saja"],
            ans: 1,
            pembahasan: "Musyawarah atau pemungutan suara sesuai dengan sila keempat Pancasila karena keputusan diambil bersama."
        },
        {
            q: "Shofwa membawa bekal lebih banyak. Ia melihat temannya tidak membawa makanan karena lupa. Sikap yang mencerminkan sila kedua Pancasila adalah ....",
            opts: ["membagi bekal dengan ikhlas", "makan di tempat tersembunyi", "mengejek temannya yang lupa membawa bekal", "menyuruh temannya membeli makanan sendiri"],
            ans: 0,
            pembahasan: "Membagi bekal dengan ikhlas menunjukkan sikap peduli dan kemanusiaan sesuai sila kedua Pancasila."
        },
        {
            q: "Warga kampung berbeda agama sedang membersihkan lingkungan bersama. Mereka tetap saling menghargai meskipun berbeda keyakinan. Sikap tersebut mencerminkan pengamalan sila ....",
            opts: ["pertama dan ketiga", "kedua dan kelima", "keempat dan kelima", "pertama dan keempat"],
            ans: 0,
            pembahasan: "Warga yang berbeda agama tetapi tetap bekerja sama menunjukkan pengamalan sila pertama dan ketiga, yaitu menghargai keyakinan serta menjaga persatuan."
        },
        {
            q: "Di sekolah, setiap siswa mendapat tugas piket secara bergiliran. Hal ini menunjukkan penerapan nilai Pancasila, terutama tentang ....",
            opts: ["keadilan dan tanggung jawab", "kemenangan dan kekuasaan", "kebebasan tanpa aturan", "persaingan antarteman"],
            ans: 0,
            pembahasan: "Tugas piket bergiliran menunjukkan keadilan karena semua siswa mendapat tanggung jawab yang sama."
        },
        {
            q: "Oliv berhak belajar dengan nyaman di kelas. Agar hak tersebut dapat terpenuhi, kewajiban Oliv adalah ....",
            opts: ["berbicara keras saat guru menjelaskan", "menjaga ketertiban selama pembelajaran", "menyuruh teman diam dengan marah", "belajar hanya saat ada ulangan"],
            ans: 1,
            pembahasan: "Agar semua siswa mendapat hak belajar dengan nyaman, setiap siswa wajib menjaga ketertiban kelas."
        },
        {
            q: "Ashta ingin menggunakan lapangan sekolah untuk bermain bola. Namun, lapangan sedang dipakai kelas lain untuk olahraga. Sikap Ashta sebaiknya ....",
            opts: ["tetap bermain karena ia juga punya hak", "menunggu giliran menggunakan lapangan", "mengusir kelas lain dari lapangan", "mengadu kepada kepala sekolah"],
            ans: 1,
            pembahasan: "Ashta tetap memiliki hak memakai lapangan, tetapi ia juga harus menghormati hak kelas lain dengan menunggu giliran."
        },
        {
            q: "Seorang siswa selalu menuntut haknya untuk mendapat nilai bagus, tetapi ia jarang belajar dan tidak mengerjakan tugas. Kesimpulan yang tepat adalah ....",
            opts: ["hak boleh didapat tanpa kewajiban", "kewajiban tidak penting bagi siswa", "hak dan kewajiban harus seimbang", "nilai bagus hanya bergantung pada guru"],
            ans: 2,
            pembahasan: "Hak dan kewajiban harus seimbang. Jika ingin mendapat nilai baik, siswa juga wajib belajar dan mengerjakan tugas."
        },
        {
            q: "Setelah menggunakan buku perpustakaan, Kahfi mengembalikannya dalam keadaan rapi dan tepat waktu. Sikap Kahfi menunjukkan ....",
            opts: ["pelaksanaan kewajiban sebagai pengguna perpustakaan", "pelanggaran hak teman lain", "keinginan mendapat hadiah", "sikap tidak peduli pada fasilitas sekolah"],
            ans: 0,
            pembahasan: "Mengembalikan buku tepat waktu dan rapi adalah kewajiban pengguna perpustakaan agar buku dapat dipakai teman lain."
        },
        {
            q: "Warga berhak menikmati lingkungan yang bersih. Kewajiban yang harus dilakukan warga adalah ....",
            opts: ["membuang sampah ke sungai", "membersihkan rumah sendiri saja", "menjaga kebersihan lingkungan bersama", "menunggu petugas kebersihan bekerja"],
            ans: 2,
            pembahasan: "Lingkungan bersih adalah hak warga, tetapi warga juga wajib menjaga kebersihan bersama."
        },
        {
            q: "Jika semua siswa hanya menuntut hak tetapi tidak melaksanakan kewajiban, maka yang mungkin terjadi adalah ....",
            opts: ["lingkungan sekolah semakin tertib", "kegiatan belajar menjadi terganggu", "semua siswa menjadi lebih disiplin", "sekolah menjadi lebih bersih"],
            ans: 1,
            pembahasan: "Jika siswa hanya menuntut hak tanpa melaksanakan kewajiban, kegiatan belajar akan terganggu dan sekolah menjadi tidak tertib."
        },
        {
            q: "Perhatikan ciri-ciri berikut!<br>- Rumah adat berbentuk seperti perahu.<br>- Berasal dari masyarakat Toraja.<br>- Atapnya melengkung ke atas.<br><br>Rumah adat tersebut berasal dari daerah ....",
            opts: ["Sumatera Barat", "Sulawesi Selatan", "Kalimantan Timur", "Papua"],
            ans: 1,
            pembahasan: "Rumah Tongkonan adalah rumah adat masyarakat Toraja yang berasal dari Sulawesi Selatan."
        },
        {
            q: "Rumah Tongkonan merupakan rumah adat khas masyarakat Toraja. Rumah adat ini berasal dari provinsi ....",
            opts: ["Sulawesi Selatan", "Jawa Tengah", "Bali", "Maluku"],
            ans: 0,
            pembahasan: "Rumah Tongkonan berasal dari Provinsi Sulawesi Selatan."
        },
        {
            q: "Perhatikan keterangan berikut!<br>Tarian ini menggunakan piring sebagai properti utama. Gerakannya lincah dan biasanya ditampilkan dalam acara adat atau penyambutan tamu.<br><br>Tarian tersebut berasal dari ....",
            opts: ["Sumatera Barat", "Sulawesi Utara", "Nusa Tenggara Timur", "Jawa Barat"],
            ans: 0,
            pembahasan: "Tari Piring menggunakan properti piring dan berasal dari Sumatera Barat."
        },
        {
            q: "Tari Piring adalah salah satu tarian daerah Indonesia. Tarian ini berasal dari provinsi ....",
            opts: ["Aceh", "Sumatera Barat", "Kalimantan Barat", "Sulawesi Selatan"],
            ans: 1,
            pembahasan: "Tari Piring merupakan tarian daerah dari Provinsi Sumatera Barat."
        },
        {
            q: "Pasangan budaya daerah dan asal daerah yang tepat adalah ....",
            opts: ["Rumah Tongkonan — Sumatera Barat", "Tari Piring — Sulawesi Selatan", "Rumah Tongkonan — Sulawesi Selatan", "Tari Piring — Papua"],
            ans: 2,
            pembahasan: "Pasangan yang tepat adalah Rumah Tongkonan berasal dari Sulawesi Selatan."
        },
        {
            q: "Di kelas 4 terdapat siswa dari berbagai suku. Saat diskusi kelompok, mereka memiliki kebiasaan berbicara yang berbeda. Sikap terbaik agar diskusi tetap berjalan baik adalah ....",
            opts: ["memaksa semua teman mengikuti kebiasaan kita", "menertawakan cara bicara teman", "saling menghargai dan mendengarkan pendapat", "hanya memilih teman yang satu daerah"],
            ans: 2,
            pembahasan: "Dalam keberagaman, sikap yang baik adalah saling menghargai dan mendengarkan pendapat agar kerja sama berjalan baik."
        },
        {
            q: "Keberagaman budaya di Indonesia dapat menjadi kekuatan bangsa apabila masyarakat ....",
            opts: ["merasa budaya sendiri paling baik", "saling menghargai dan bekerja sama", "menghindari teman yang berbeda suku", "menyamakan semua budaya daerah"],
            ans: 1,
            pembahasan: "Keberagaman dapat menjadi kekuatan jika masyarakat saling menghargai dan bekerja sama."
        },
        {
            q: "Akulturasi adalah percampuran dua budaya atau lebih yang menghasilkan budaya baru tanpa menghilangkan ciri budaya asli. Contoh akulturasi adalah ....",
            opts: ["menolak semua budaya dari daerah lain", "bangunan masjid yang memiliki bentuk atap seperti rumah tradisional", "menghapus semua budaya lama", "hanya memakai budaya luar negeri"],
            ans: 1,
            pembahasan: "Akulturasi adalah percampuran budaya tanpa menghilangkan budaya asli. Contohnya bangunan masjid yang memiliki atap seperti rumah tradisional."
        },
        {
            q: "Akulturasi dapat memperkaya budaya bangsa apabila masyarakat ....",
            opts: ["menerima budaya lain dengan tetap menjaga budaya sendiri", "meninggalkan semua budaya daerah", "memaksakan budaya sendiri kepada orang lain", "menolak setiap perbedaan budaya"],
            ans: 0,
            pembahasan: "Akulturasi memperkaya budaya bangsa jika masyarakat menerima budaya lain, tetapi tetap menjaga budaya sendiri."
        },
        {
            q: "Lagu “Satu Nusa Satu Bangsa” diciptakan oleh ....",
            opts: ["W.R. Supratman", "L. Manik", "Ibu Sud", "H. Mutahar"],
            ans: 1,
            pembahasan: "Lagu “Satu Nusa Satu Bangsa” diciptakan oleh L. Manik. Lagu ini mengandung makna persatuan dan cinta tanah air Indonesia."
        },
        {
            q: "Kongres Pemuda II tahun 1928 menghasilkan Sumpah Pemuda. Peristiwa ini penting bagi bangsa Indonesia karena ....",
            opts: ["menunjukkan semangat pemuda untuk bersatu sebagai bangsa Indonesia", "membuat setiap daerah berdiri sendiri", "mengajarkan bahwa perbedaan harus dihilangkan", "menunjukkan bahwa perjuangan hanya dilakukan oleh orang tua"],
            ans: 0,
            pembahasan: "Kongres Pemuda II tahun 1928 menghasilkan Sumpah Pemuda yang menunjukkan semangat pemuda untuk bersatu sebagai bangsa Indonesia."
        },
        {
            q: "Makna semboyan Bhinneka Tunggal Ika adalah ....",
            opts: ["berbeda-beda tetapi tetap satu", "semua daerah harus memiliki budaya yang sama", "perbedaan harus dihapuskan", "hanya satu suku yang boleh menonjol"],
            ans: 0,
            pembahasan: "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu. Artinya, perbedaan tidak boleh memecah persatuan."
        },
        {
            q: "Pembangunan di Indonesia yang tidak merata dapat menjadi faktor penghambat persatuan dan kesatuan karena ....",
            opts: ["semua daerah pasti merasa puas", "dapat menimbulkan rasa iri atau ketidakadilan antarwilayah", "membuat masyarakat semakin saling menghargai", "tidak berpengaruh terhadap kehidupan masyarakat"],
            ans: 1,
            pembahasan: "Pembangunan yang tidak merata dapat menimbulkan rasa tidak adil sehingga menjadi penghambat persatuan dan kesatuan."
        },
        {
            q: "Perbedaan antara persatuan dan kesatuan yang tepat adalah ....",
            opts: ["persatuan berarti proses bergabung, sedangkan kesatuan berarti keadaan sudah utuh dan tidak terpecah", "persatuan berarti bertengkar, sedangkan kesatuan berarti berbeda pendapat", "persatuan hanya berlaku di rumah, sedangkan kesatuan hanya berlaku di sekolah", "persatuan dan kesatuan tidak memiliki hubungan"],
            ans: 0,
            pembahasan: "Persatuan adalah proses bergabung, sedangkan kesatuan adalah keadaan sudah utuh dan tidak terpecah."
        },
        {
            q: "Pasal 29 ayat 1 UUD 1945 berbunyi, “Negara berdasar atas Ketuhanan Yang Maha Esa.” Makna pasal tersebut adalah ....",
            opts: ["Indonesia adalah negara yang berdasar pada nilai Ketuhanan", "semua warga negara harus memeluk agama yang sama", "warga negara tidak boleh beribadah", "hanya satu agama yang boleh dianut di Indonesia"],
            ans: 0,
            pembahasan: "Pasal 29 ayat 1 menjelaskan bahwa negara Indonesia berdasar pada nilai Ketuhanan Yang Maha Esa."
        },
        {
            q: "Pasal 29 ayat 2 UUD 1945 menjelaskan bahwa setiap penduduk Indonesia memiliki hak untuk ....",
            opts: ["memilih agama dan beribadah sesuai agama masing-masing", "memaksa teman mengikuti agama kita", "melarang orang lain beribadah", "mengejek agama yang berbeda"],
            ans: 0,
            pembahasan: "Pasal 29 ayat 2 menjamin kebebasan setiap penduduk untuk memeluk agama dan beribadah sesuai agama serta kepercayaannya."
        },
        {
            q: "Perbedaan yang tepat antara Pasal 29 ayat 1 dan Pasal 29 ayat 2 UUD 1945 adalah ....",
            opts: ["ayat 1 menjelaskan dasar Ketuhanan negara, ayat 2 menjamin kebebasan beragama", "ayat 1 menjelaskan kewajiban belajar, ayat 2 menjelaskan hak bermain", "ayat 1 menjelaskan persatuan, ayat 2 menjelaskan kerja bakti", "ayat 1 dan ayat 2 sama-sama melarang warga negara beribadah"],
            ans: 0,
            pembahasan: "Pasal 29 ayat 1 berisi dasar negara yang berlandaskan Ketuhanan Yang Maha Esa. Pasal 29 ayat 2 berisi jaminan kebebasan untuk memeluk agama dan beribadah."
        },
        {
            q: "Perhatikan daftar berikut!<br>- Islam<br>- Kristen<br>- Hindu<br>- Buddha<br><br>Urutan tempat ibadah yang sesuai dengan agama di atas adalah ....",
            opts: ["Masjid, Gereja, Pura, Wihara", "Gereja, Masjid, Wihara, Pura", "Pura, Masjid, Gereja, Wihara", "Wihara, Pura, Masjid, Gereja"],
            ans: 0,
            pembahasan: "Agama Islam beribadah di Masjid, Kristen beribadah di Gereja, Hindu beribadah di Pura, dan Buddha beribadah di Wihara."
        },
        {
            q: "Pasangan agama dan tempat ibadah yang tepat adalah ....",
            opts: ["Islam — Gereja", "Kristen — Masjid", "Hindu — Pura", "Buddha — Wihara"],
            ans: 2,
            pembahasan: "Tempat ibadah Hindu adalah Pura, sedangkan tempat ibadah Buddha adalah Wihara. Masjid adalah tempat ibadah agama Islam, sedangkan Gereja adalah tempat ibadah agama Kristen dan Katolik."
        },
        {
            type: "dnd",
            q: "Pasal 29 ayat 1 UUD 1945 berbunyi ....",
            opts: ["Negara berdasar atas Ketuhanan Yang Maha Esa.", "Negara menjamin setiap penduduk untuk memeluk agama masing-masing.", "Setiap warga negara wajib mengikuti upacara bendera."],
            ans: 0,
            pembahasan: "Pasal 29 ayat 1 menjelaskan bahwa negara Indonesia berdasar pada nilai Ketuhanan Yang Maha Esa."
        },
        {
            type: "dnd",
            q: "Pasal 29 ayat 2 UUD 1945 menjamin setiap penduduk untuk ....",
            opts: ["memeluk agama dan beribadah sesuai agamanya", "memilih ketua kelas dengan musyawarah", "menjaga kebersihan lingkungan sekolah"],
            ans: 0,
            pembahasan: "Pasal 29 ayat 2 menjelaskan bahwa setiap penduduk Indonesia memiliki hak untuk memeluk agama dan beribadah sesuai agama masing-masing."
        },
        {
            type: "dnd",
            q: "Tempat ibadah umat Hindu adalah ....",
            opts: ["Pura", "Masjid", "Gereja"],
            ans: 0,
            pembahasan: "Umat Hindu beribadah di Pura.<br>Jembatan hafalannya: Islam Masjid, Kristen Gereja, Katolik Gereja, Hindu Pura, Buddha Wihara, Konghucu Klenteng.<br>Jadi, kalau mendengar Hindu, ingat pasangannya Pura."
        },
        {
            type: "dnd",
            q: "Tempat ibadah umat Buddha adalah ....",
            opts: ["Wihara", "Klenteng", "Pura"],
            ans: 0,
            pembahasan: "Umat Buddha beribadah di Wihara.<br>Jembatan hafalannya: Islam Masjid, Kristen Gereja, Katolik Gereja, Hindu Pura, Buddha Wihara, Konghucu Klenteng.<br>Jadi, kalau mendengar Buddha, ingat pasangannya Wihara."
        },
        {
            type: "dnd",
            q: "Kongres Pemuda II tahun 1928 menghasilkan ....",
            opts: ["Sumpah Pemuda", "Proklamasi Kemerdekaan", "Dasar Negara Pancasila"],
            ans: 0,
            pembahasan: "Kongres Pemuda II tahun 1928 menghasilkan Sumpah Pemuda. Sumpah Pemuda menunjukkan semangat persatuan para pemuda Indonesia."
        }
    ];

    const bahasaQuestions = [
        {
            q: "Bacalah teks berikut untuk menjawab soal nomor 1–3!<br><br>Agha sangat suka bermain gim di tablet sepulang sekolah. Awalnya, ia hanya bermain selama 30 menit setelah mengerjakan PR. Namun, lama-kelamaan Agha bermain hingga berjam-jam, bahkan sering lupa beristirahat.<br><br>Suatu malam, Agha mengeluh matanya perih dan kepalanya terasa pusing. Ia juga merasa penglihatannya menjadi buram ketika membaca buku. Ibu menasihati Agha agar mengurangi waktu bermain tablet dan memberi jeda istirahat pada mata.<br><br>Sejak kejadian itu, Agha membuat aturan untuk dirinya sendiri. Ia hanya bermain tablet setelah tugas selesai dan tidak lebih dari 30 menit. Agha juga mulai membiasakan melihat benda jauh beberapa saat setelah menatap layar.<br><br>1. Mengapa teks tersebut termasuk teks narasi?",
            opts: ["karena menjelaskan cara menggunakan tablet dengan benar", "karena menceritakan peristiwa yang dialami tokoh secara berurutan", "karena menggambarkan tablet milik Agha secara rinci", "karena berisi daftar aturan bermain gim"],
            ans: 1,
            pembahasan: "Teks tersebut menceritakan kejadian yang dialami Agha dari awal suka bermain gim, mengalami keluhan mata, sampai akhirnya mengubah kebiasaannya."
        },
        {
            q: "Sikap Agha setelah mengalami mata perih menunjukkan bahwa Agha ....",
            opts: ["tidak peduli terhadap nasihat ibunya", "menyalahkan tablet karena membuat matanya sakit", "mampu belajar dari pengalaman dan mengubah kebiasaan", "tetap bermain tablet agar tidak merasa bosan"],
            ans: 2,
            pembahasan: "Agha membuat aturan bermain tablet dan memberi waktu istirahat untuk mata. Itu menunjukkan ia belajar dari kejadian yang dialaminya."
        },
        {
            q: "Pernyataan yang paling sesuai dengan isi teks adalah ....",
            opts: ["Agha sakit mata karena membaca buku terlalu lama setiap malam.", "Agha mengurangi penggunaan tablet setelah mengalami keluhan pada mata.", "Ibu melarang Agha menggunakan tablet untuk selamanya.", "Agha bermain tablet sebelum mengerjakan PR agar lebih semangat."],
            ans: 1,
            pembahasan: "Pada teks dijelaskan bahwa Agha mengurangi waktu bermain tablet setelah matanya perih dan penglihatannya buram."
        },
        {
            q: "Bacalah teks berikut untuk menjawab soal nomor 4–5!<br><br>Di kelas, Alby, Arkan, Nanta, dan Aydan mendapat tugas membuat poster tentang menjaga kesehatan tubuh. Arkan langsung ingin menggambar banyak makanan cepat saji karena menurutnya gambarnya terlihat menarik. Namun, Nanta mengingatkan bahwa isi poster harus sesuai dengan tema kesehatan.<br><br>Alby mengusulkan agar poster berisi ajakan makan makanan bergizi, minum air putih, berolahraga, dan tidur cukup. Aydan kemudian menambahkan gambar anak sedang mencuci tangan sebelum makan. Akhirnya, mereka sepakat membuat poster yang tidak hanya menarik, tetapi juga bermanfaat bagi teman-teman sekelas.<br><br>4. Keputusan kelompok tersebut menunjukkan bahwa mereka ....",
            opts: ["memilih gambar yang lucu walaupun tidak sesuai tema", "lebih mementingkan warna poster daripada isi poster", "mampu bekerja sama dan menyesuaikan isi poster dengan tema", "menolak semua pendapat yang diberikan oleh teman"],
            ans: 2,
            pembahasan: "Mereka berdiskusi, saling memberi masukan, lalu menyepakati isi poster yang sesuai dengan tema menjaga kesehatan."
        },
        {
            q: "Kalimat berikut yang termasuk kalimat transitif berdasarkan teks adalah ....",
            opts: ["Arkan langsung ingin menggambar.", "Nanta mengingatkan Arkan.", "Alby berbicara dengan teman-temannya.", "Aydan berdiri di depan kelas."],
            ans: 1,
            pembahasan: "Kalimat “Nanta mengingatkan Arkan” termasuk kalimat transitif karena memiliki objek, yaitu Arkan."
        },
        {
            q: "Saat mengikuti latihan pernapasan, Ayra diminta menarik napas perlahan, menenangkan pikiran, dan membuat tubuhnya tidak tegang. Kegiatan itu bertujuan untuk membuat tubuh mengalami pengenduran.<br><br>Kata yang memiliki arti pengenduran adalah ....",
            opts: ["infeksi", "relaksasi", "interaksi", "sosialisasi"],
            ans: 1,
            pembahasan: "Relaksasi berarti proses membuat tubuh atau pikiran menjadi lebih rileks, tidak tegang, atau mengalami pengenduran."
        },
        {
            q: "Setelah terlalu lama membaca buku di tempat yang kurang terang, penglihatan El menjadi buram. Ia kesulitan melihat tulisan kecil di papan tulis.<br><br>Makna kata buram pada kalimat tersebut adalah ....",
            opts: ["tidak jelas", "sangat terang", "berwarna-warni", "menjadi basah"],
            ans: 0,
            pembahasan: "Buram berarti tidak jelas atau tidak terang ketika dilihat."
        },
        {
            q: "Di sekolah Fienna, beberapa siswa mengalami batuk dan pilek secara bersamaan. Namun, penyakit itu hanya terjadi di kelasnya dan tidak menyebar ke banyak daerah.<br><br>Berdasarkan contoh tersebut, peristiwa itu belum dapat disebut pandemi karena ....",
            opts: ["hanya terjadi di lingkungan kecil dan tidak meluas ke banyak daerah", "penyakit batuk dan pilek tidak bisa menular kepada orang lain", "semua siswa pasti sembuh tanpa perlu menjaga kesehatan", "penyakit hanya dapat disebut pandemi jika terjadi di rumah sakit"],
            ans: 0,
            pembahasan: "Pandemi adalah wabah yang menyebar luas di banyak daerah atau negara. Jika hanya terjadi di satu kelas, belum termasuk pandemi."
        },
        {
            q: "Perhatikan kalimat berikut!<br><br>1. Ghaniya membaca buku cerita di perpustakaan.<br>2. Hizba berlari di halaman sekolah.<br>3. Ibra membawa botol minum.<br>4. Keenan tertawa dengan riang.<br><br>Kalimat yang termasuk kalimat transitif adalah ....",
            opts: ["1 dan 2", "1 dan 3", "2 dan 4", "3 dan 4"],
            ans: 1,
            pembahasan: "Kalimat transitif adalah kalimat yang memerlukan objek.<br>Kalimat “Ghaniya membaca buku cerita” memiliki objek buku cerita.<br>Kalimat “Ibra membawa botol minum” memiliki objek botol minum.<br><br>Sedangkan “Hizba berlari” dan “Keenan tertawa” termasuk kalimat intransitif karena tidak memerlukan objek."
        },
        {
            q: "Perhatikan kalimat berikut!<br><br>1. Ghaniya menulis cerita pendek.<br>2. Hizba tidur di kamar.<br>3. Ibra membeli pensil baru.<br>4. Keenan duduk di kursi.<br><br>Kalimat yang termasuk kalimat intransitif adalah ....",
            opts: ["1 dan 2", "1 dan 3", "2 dan 4", "3 dan 4"],
            ans: 2,
            pembahasan: "Kalimat intransitif adalah kalimat yang tidak memerlukan objek.<br>Kalimat “Hizba tidur di kamar” dan “Keenan duduk di kursi” tidak memiliki objek.<br><br>Sedangkan “Ghaniya menulis cerita pendek” dan “Ibra membeli pensil baru” termasuk kalimat transitif karena memiliki objek, yaitu cerita pendek dan pensil baru."
        },
        {
            q: "Bacalah teks berikut!<br><br>Dahulu, rakyat Mataram Lama sering berlayar ke arah timur melalui Laut Jawa. Jalur pelayaran mereka lurus ke timur hingga berhenti di sebuah pelabuhan. Pelabuhan itu diberi nama Lomboq yang berarti lurus. Lama-kelamaan, nama Lomboq dikenal menjadi Pulau Lombok.<br><br>Kesimpulan yang paling tepat berdasarkan teks tersebut adalah ....",
            opts: ["Pulau Lombok dinamai dari nama seorang ratu Mataram Lama", "nama Pulau Lombok berhubungan dengan jalur pelayaran rakyat Mataram Lama", "Pulau Lombok disebut Lomboq karena banyak perahu bercadik", "rakyat Mataram Lama berlayar ke timur untuk berperang"],
            ans: 1,
            pembahasan: "Nama Lomboq berarti lurus dan berhubungan dengan jalur pelayaran rakyat Mataram Lama yang lurus ke arah timur."
        },
        {
            q: "Ratu Pramudawardhani dikenal sebagai ahli pemerintahan, sedangkan Rakai Pikatan dikenal sebagai ahli perang.<br><br>Perbedaan keahlian kedua tokoh tersebut menunjukkan bahwa ....",
            opts: ["keduanya memiliki peran yang sama dalam kerajaan", "Ratu Pramudawardhani lebih kuat daripada Rakai Pikatan", "setiap tokoh dapat memiliki keahlian dan peran yang berbeda", "Rakai Pikatan tidak memiliki peran penting dalam kerajaan"],
            ans: 2,
            pembahasan: "Ratu Pramudawardhani ahli dalam pemerintahan, sedangkan Rakai Pikatan ahli dalam peperangan. Artinya, setiap tokoh memiliki keahlian yang berbeda."
        },
        {
            q: "Gempa vulkanik terjadi karena aktivitas gunung berapi. Saat gunung akan meletus, material panas dari dalam bumi dapat bergerak naik dan menyebabkan getaran.<br><br>Kata yang tepat untuk melengkapi kalimat “Gempa vulkanik terjadi akibat keluarnya ... dari perut bumi” adalah ....",
            opts: ["lahar", "lava", "magma", "api"],
            ans: 2,
            pembahasan: "Magma adalah batuan cair panas yang berada di dalam perut bumi. Jika sudah keluar ke permukaan bumi, magma disebut lava."
        },
        {
            q: "Gempa bumi terjadi saat batuan yang ada di dalam ... bumi mengalami tekanan dan menyebabkan ... bergesekan.<br><br>Kata yang tepat untuk melengkapi kalimat tersebut adalah ....",
            opts: ["tanah dan api", "lapisan dan tanah", "kerak dan lempengan", "lahar dan magma"],
            ans: 2,
            pembahasan: "Gempa bumi terjadi karena batuan di dalam kerak bumi mengalami tekanan sehingga lempengan bumi dapat bergesekan."
        },
        {
            q: "Bacalah teks berikut!<br><br>Dahulu, Jakarta bernama Sunda Kelapa. Setelah Pangeran Fatahillah berhasil merebut Sunda Kelapa, nama daerah itu diubah menjadi Jayakarta. Kemudian, pada masa VOC Belanda, Jayakarta diubah menjadi Batavia. Pada tahun 1942, Jepang mengubah nama Batavia menjadi Jakarta.<br><br>Urutan perubahan nama Jakarta yang tepat adalah ....",
            opts: ["Jakarta – Batavia – Jayakarta – Sunda Kelapa", "Sunda Kelapa – Jayakarta – Batavia – Jakarta", "Jayakarta – Sunda Kelapa – Jakarta – Batavia", "Batavia – Sunda Kelapa – Jayakarta – Jakarta"],
            ans: 1,
            pembahasan: "Berdasarkan teks, urutan nama Jakarta adalah Sunda Kelapa → Jayakarta → Batavia → Jakarta."
        },
        {
            q: "Perhatikan kalimat berikut!<br><br>Khairy tetap bersikap lugu saat menjelaskan kejadian sebenarnya. Ia berbicara apa adanya. Sementara itu, Mecca merasa pangling ketika melihat Mirza memakai kacamata baru karena wajahnya terlihat berbeda.<br><br>Makna kata lugu dan pangling yang tepat adalah ....",
            opts: ["lugu berarti jarang ditemukan, pangling berarti tiba-tiba", "lugu berarti apa adanya, pangling berarti tidak mengenal lagi", "lugu berarti rusak karena tua, pangling berarti cantik", "lugu berarti pandai, pangling berarti mempunyai kekuatan gaib"],
            ans: 1,
            pembahasan: "Kata lugu berarti bersahaja atau apa adanya. Kata pangling berarti tidak mengenal lagi karena terlihat berbeda."
        },
        {
            q: "Perhatikan tabel berikut!<br><br><table border='1' cellpadding='5' cellspacing='0' style='width:100%; text-align:left; border-collapse: collapse; margin-bottom:10px; border-color: #ddd;'><tr><th>Kosakata</th><th>Asal Daerah</th></tr><tr><td>molek</td><td>Batak</td></tr><tr><td>bijak</td><td>Minangkabau</td></tr><tr><td>ujug-ujug</td><td>Sunda</td></tr><tr><td>marawis</td><td>Madura</td></tr></table>Berdasarkan tabel tersebut, pasangan kosakata dan asal daerah yang tepat adalah ....",
            opts: ["molek dari Sunda dan bijak dari Batak", "ujug-ujug dari Jawa dan marawis dari Bali", "bijak dari Minangkabau dan molek dari Batak", "marawis dari Betawi dan ujug-ujug dari Madura"],
            ans: 2,
            pembahasan: "Berdasarkan materi, kata bijak berasal dari Minangkabau, sedangkan kata molek berasal dari Batak."
        },
        {
            q: "Perhatikan kalimat berikut!<br><br>Mirza menemukan tas lama di gudang. Tas itu terlihat butut karena bagian bawahnya robek. Namun, di dalam tas itu ada kain bermotif molek yang masih tampak indah.<br><br>Makna kata butut dan molek yang tepat adalah ....",
            opts: ["butut berarti rusak karena sudah tua, molek berarti elok atau cantik", "butut berarti tiba-tiba, molek berarti tidak mengenal lagi", "butut berarti sakti, molek berarti jarang ditemukan", "butut berarti pandai, molek berarti terus"],
            ans: 0,
            pembahasan: "Kata butut berarti rusak karena sudah tua atau rombeng. Kata molek berarti elok atau cantik."
        },
        {
            q: "Perhatikan kalimat berikut!<br><br>Para siswa-siswa, Anwar dan Athar, membawa bekal makanan sehat dari rumah.<br><br>Kalimat tersebut tidak efektif karena ....",
            opts: ["tidak memiliki subjek yang jelas", "menggunakan kata bermakna jamak secara berlebihan", "menggunakan kata yang maknanya berlawanan", "tidak memiliki keterangan tempat"],
            ans: 1,
            pembahasan: "Kata para sudah menunjukkan jumlah banyak, sehingga tidak perlu ditambah kata ulang siswa-siswa. Kalimat efektifnya: Anwar dan Athar membawa bekal makanan sehat dari rumah."
        },
        {
            q: "Kalimat berikut yang termasuk kalimat efektif adalah ....",
            opts: ["Wortel adalah merupakan makanan sehat yang dimakan Naura.", "Karena makan sembarangan, Nayla sakit perut.", "Bagi Eyza wajib membawa air putih ke sekolah.", "Sejak dari pagi Rafazaky membantu ibu menyiapkan sarapan."],
            ans: 1,
            pembahasan: "Kalimat “Karena makan sembarangan, Nayla sakit perut.” sudah jelas dan tidak menggunakan kata berlebihan.<br>Pilihan A tidak efektif karena adalah dan merupakan digunakan bersamaan.<br>Pilihan C tidak efektif karena kata bagi membuat subjek kurang jelas.<br>Pilihan D tidak efektif karena sejak dan dari memiliki makna yang sama."
        },
        {
            q: "Perhatikan kalimat berikut!<br><br>Biya menceritakan tentang pengalamannya membuat jus mangga.<br><br>Agar menjadi kalimat efektif, perbaikan yang tepat adalah ....",
            opts: ["Biya menceritakan pengalamannya membuat jus mangga.", "Biya menceritakan tentang pengalaman dirinya membuat jus mangga.", "Biya sedang menceritakan tentang pengalamannya membuat jus mangga.", "Biya menceritakan pengalaman tentang dirinya membuat jus mangga."],
            ans: 0,
            pembahasan: "Kata menceritakan sudah berarti menyampaikan cerita, sehingga kata tentang tidak perlu digunakan. Kalimat efektifnya: Biya menceritakan pengalamannya membuat jus mangga."
        },
        {
            q: "Bacalah cerita berikut untuk menjawab soal nomor 23–25!<br><br>Malin Kundang adalah anak dari seorang ibu yang hidup sederhana di tepi pantai. Suatu hari, Malin pergi merantau untuk mengubah nasib. Setelah bertahun-tahun, ia menjadi saudagar kaya dan kembali ke kampung halamannya dengan kapal besar.<br><br>Ibunya sangat bahagia melihat Malin pulang. Namun, Malin merasa malu mengakui ibunya yang sudah tua dan miskin. Ia menolak ibunya di hadapan banyak orang. Sang ibu sangat sedih, lalu berdoa agar Malin mendapat balasan atas perbuatannya. Tidak lama kemudian, badai besar datang dan kapal Malin hancur. Malin pun berubah menjadi batu.<br><br>23. Konflik utama dalam cerita Malin Kundang adalah ....",
            opts: ["Malin Kundang ingin membeli kapal besar untuk ibunya", "Malin Kundang malu dan tidak mau mengakui ibunya", "ibu Malin Kundang melarang anaknya pergi merantau", "Malin Kundang kehilangan harta saat berdagang"],
            ans: 1,
            pembahasan: "Konflik utama cerita terjadi ketika Malin Kundang durhaka karena malu mengakui ibunya sendiri."
        },
        {
            q: "Pesan moral yang paling tepat dari cerita Malin Kundang adalah ....",
            opts: ["kita harus bekerja keras agar menjadi orang kaya", "kita boleh melupakan keluarga setelah berhasil", "kita harus menghormati dan menyayangi orang tua", "kita harus memiliki kapal besar saat merantau"],
            ans: 2,
            pembahasan: "Cerita Malin Kundang mengajarkan bahwa seorang anak harus menghormati, menyayangi, dan tidak durhaka kepada orang tua."
        },
        {
            q: "Alur cerita Malin Kundang yang tepat adalah ....",
            opts: ["Malin menjadi batu → Malin merantau → Malin menolak ibunya → ibu Malin sedih", "Malin merantau → Malin menjadi kaya → Malin menolak ibunya → Malin mendapat hukuman", "ibu Malin berdoa → Malin menjadi kaya → Malin pergi merantau → Malin pulang", "Malin menolak ibunya → Malin hidup miskin → Malin merantau → Malin menjadi saudagar"],
            ans: 1,
            pembahasan: "Urutan cerita yang tepat adalah Malin pergi merantau, menjadi kaya, pulang tetapi menolak ibunya, lalu mendapat hukuman dan berubah menjadi batu."
        },
        {
            q: "Perhatikan kalimat berikut!<br><br>1. Raihan berhak mendapat hak yang sama saat belajar di kelas.<br>2. Ayah memperbaiki hak sepatu Syatira yang lepas.<br><br>Makna kata hak pada kalimat nomor 1 dan 2 adalah ....",
            opts: ["bagian bawah sepatu dan kewajiban", "sesuatu yang harus diterima dan bagian bawah sepatu", "kepala keluarga dan bagian buku", "bagian rumah dan sesuatu yang berbahaya"],
            ans: 1,
            pembahasan: "Pada kalimat 1, hak berarti sesuatu yang harus diterima. Pada kalimat 2, hak berarti bagian bawah sepatu."
        },
        {
            q: "Perhatikan kalimat berikut!<br><br>1. Fya menjadi kepala kelompok saat diskusi.<br>2. Yumna memakai topi untuk melindungi kepala dari panas.<br><br>Perbedaan makna kata kepala pada dua kalimat tersebut adalah ....",
            opts: ["kalimat 1 berarti pemimpin, kalimat 2 berarti bagian tubuh", "kalimat 1 berarti bagian tubuh, kalimat 2 berarti pemimpin", "kalimat 1 berarti halaman buku, kalimat 2 berarti tempat rapat", "kalimat 1 berarti bagian sepatu, kalimat 2 berarti sesuatu yang diterima"],
            ans: 0,
            pembahasan: "Pada kalimat 1, kepala berarti pemimpin. Pada kalimat 2, kepala berarti bagian tubuh."
        },
        {
            q: "Perhatikan kalimat berikut!<br><br>1. Murid-murid duduk rapat agar semua mendapat tempat.<br>2. Zavier mengikuti rapat bersama pengurus kelas.<br><br>Makna kata rapat yang tepat adalah ....",
            opts: ["kalimat 1 berarti pertemuan, kalimat 2 berarti berdekatan", "kalimat 1 berarti berdekatan, kalimat 2 berarti pertemuan", "kalimat 1 berarti halaman, kalimat 2 berarti bagian tubuh", "kalimat 1 berarti racun, kalimat 2 berarti mampu"],
            ans: 1,
            pembahasan: "Pada kalimat 1, rapat berarti berdekatan atau tidak renggang. Pada kalimat 2, rapat berarti pertemuan untuk membicarakan sesuatu."
        },
        {
            q: "Perhatikan kalimat berikut!<br><br>1. Raihan bisa menyelesaikan soal Bahasa Indonesia dengan teliti.<br>2. Syatira membaca buku tentang ular yang memiliki bisa berbahaya.<br><br>Kesimpulan yang tepat tentang kata bisa pada dua kalimat tersebut adalah ....",
            opts: ["kata bisa memiliki makna sama, yaitu racun ular", "kata bisa pada kalimat 1 berarti mampu, sedangkan kalimat 2 berarti racun", "kata bisa pada kalimat 1 berarti racun, sedangkan kalimat 2 berarti mampu", "kata bisa tidak termasuk homonim karena tulisannya berbeda"],
            ans: 1,
            pembahasan: "Kata bisa pada kalimat 1 berarti mampu. Kata bisa pada kalimat 2 berarti racun dari hewan tertentu, seperti ular."
        },
        {
            q: "Perhatikan kalimat berikut!<br><br>1. Fya menanam bunga di halaman rumah.<br>2. Yumna membaca cerita Malin Kundang pada halaman lima.<br>3. Zavier merasa malang karena bekalnya tertinggal di rumah.<br>4. Keluarga Raihan berlibur ke Kota Malang saat liburan sekolah.<br><br>Pasangan kalimat yang menunjukkan kata berhomonim adalah ....",
            opts: ["1 dan 2 saja", "3 dan 4 saja", "1 dan 2, serta 3 dan 4", "2 dan 3 saja"],
            ans: 2,
            pembahasan: "Kata halaman pada kalimat 1 berarti pekarangan rumah, sedangkan pada kalimat 2 berarti bagian dari buku. Kata malang pada kalimat 3 berarti bernasib tidak baik, sedangkan Malang pada kalimat 4 berarti nama kota."
        }
    ];

    const allModules = {
        'pancasila': { 
            title: "Pendidikan Pancasila", 
            data: pancasilaQuestions,
            formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScZhtIqMoqMbS55_05QqUjCRnQHtk6rg2Qwm0kEdwzYrsUYEQ/formResponse',
            formEntries: { name: 'entry.94952733', kelas: 'entry.890235646', mapel: 'entry.590451698', skor: 'entry.423935265' },
            sheetId: '18vvhGn5asjyhMTHcYD0cRczjznCgL1Yf9E8qNAIjvM8'
        },
        'ipas': { title: "IPAS", data: [] },
        'matematika': { title: "Matematika", data: [] },
        'bahasa': { 
            title: "Bahasa Indonesia", 
            data: bahasaQuestions,
            formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeglo97qQaYAEj7zXhy47PVK893FoKJLgpMFFlsbw7_CNwWhg/formResponse',
            formEntries: { name: 'entry.1801674969', kelas: 'entry.74748049', mapel: 'entry.340916712', skor: 'entry.1807799070' },
            sheetId: '1WyTj8-SyZ_enoWn296qLoEbBTNzo0qC34FiaAD3vR28'
        }
    };

    function switchScreen(hideScreen, showScreen) {
        hideScreen.classList.remove('active');
        showScreen.classList.add('active');
    }

    startBtn.addEventListener('click', () => {
        switchScreen(startScreen, subjectScreen);
    });

    backBtn.addEventListener('click', () => {
        switchScreen(subjectScreen, startScreen);
    });



    backToSubjectBtn.addEventListener('click', () => {
        switchScreen(quizScreen, subjectScreen);
    });

    finishBtn.addEventListener('click', () => {
        switchScreen(quizScreen, subjectScreen);
    });

    subjectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const subject = btn.getAttribute('data-subject');
            if (subject === 'pancasila' || subject === 'bahasa') {
                startQuiz(subject);
            } else {
                alert(`Mata pelajaran ${subject.toUpperCase()} dipilih! Modul soal belum tersedia. Kita tunggu ya.`);
            }
        });
    });

    function startQuiz(subject) {
        currentSubject = subject;
        const module = allModules[subject];
        quizTitle.textContent = `Kuis: ${module.title}`;
        
        currentQuestions = module.data;
        if (currentQuestions.length === 0) {
            alert('Soal belum tersedia untuk modul ini.');
            return;
        }

        score = 0;
        questionsAnswered = 0;
        currentScoreEl.textContent = score * 2;
        
        // Reset state
        currentQuizState = currentQuestions.map(() => ({ locked: false, correct: false, attempts: 0 }));
        
        quizCompletion.style.display = 'none';
        renderQuiz();
        switchScreen(subjectScreen, quizScreen);
    }

    function renderQuiz() {
        quizContainer.innerHTML = '';
        currentQuestions.forEach((q, qi) => {
            const card = document.createElement('div');
            card.className = 'q-card';
            card.id = `q-card-${qi}`;
            
            if (q.type === 'dnd') {
                let choicesHtml = q.opts.map((opt, oi) => 
                    `<div class="dnd-choice-item" id="dnd-choice-${qi}-${oi}" onclick="handleDnDClick(${qi}, ${oi})" draggable="true" ondragstart="handleDragStart(event, ${qi}, ${oi})">${opt}</div>`
                ).join('');
                
                card.innerHTML = `
                    <div class="q-header">
                        <span class="q-num-badge" id="q-badge-${qi}">${qi + 1}</span>
                        <div class="q-text">${q.q}</div>
                    </div>
                    <div class="dnd-container">
                        <div class="dnd-drop-zone" id="dnd-drop-${qi}" onclick="handleDropClick(${qi})" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event, ${qi})">
                            Tarik jawaban ke sini atau ketuk jawaban lalu ketuk kotak ini
                        </div>
                        <div class="dnd-choices" id="dnd-choices-${qi}">
                            ${choicesHtml}
                        </div>
                    </div>
                    <div class="q-feedback" id="q-fb-${qi}"></div>
                `;
            } else {
                let optionsHtml = q.opts.map((opt, oi) => 
                    `<button class="q-opt" id="q-opt-${qi}-${oi}" onclick="handleAnswer(${qi}, ${oi})">
                        <span class="opt-letter">${LETTERS[oi]}</span>
                        <span class="opt-text">${opt}</span>
                    </button>`
                ).join('');
                
                card.innerHTML = `
                    <div class="q-header">
                        <span class="q-num-badge" id="q-badge-${qi}">${qi + 1}</span>
                        <div class="q-text">${q.q}</div>
                    </div>
                    <div class="q-opts" id="q-opts-${qi}">
                        ${optionsHtml}
                    </div>
                    <div class="q-feedback" id="q-fb-${qi}"></div>
                `;
            }
            quizContainer.appendChild(card);
        });
    }

    // Expose function to global scope for onclick handlers
    window.handleAnswer = function(qi, oi) {
        const state = currentQuizState[qi];
        if (state.locked) return;
        
        state.attempts = (state.attempts || 0) + 1;
        
        const q = currentQuestions[qi];
        const isCorrect = (oi === q.ans);
        const fb = document.getElementById(`q-fb-${qi}`);
        const selectedBtn = document.getElementById(`q-opt-${qi}-${oi}`);
        
        if (isCorrect) {
            state.locked = true;
            questionsAnswered++;
            document.querySelectorAll(`#q-opts-${qi} .q-opt`).forEach(btn => btn.disabled = true);
            
            state.correct = true;
            score += 1;
            currentScoreEl.textContent = score * 2;
            
            selectedBtn.classList.add('opt-correct');
            fb.className = 'q-feedback fb-correct';
            fb.textContent = '✅ Benar! Hebat!';
            
            setTimeout(() => showPembahasan(q.pembahasan, true, qi), 500);
            addReviewButton(qi);
        } else {
            selectedBtn.classList.add('opt-wrong');
            
            if (state.attempts < 2) {
                fb.className = 'q-feedback fb-wrong';
                fb.textContent = '❌ Kurang tepat. Coba 1 kali lagi ya!';
                
                setTimeout(() => {
                    selectedBtn.classList.remove('opt-wrong');
                    selectedBtn.disabled = true; // disable this wrong option so they don't click it again
                    fb.textContent = '';
                }, 1200);
            } else {
                state.locked = true;
                questionsAnswered++;
                document.querySelectorAll(`#q-opts-${qi} .q-opt`).forEach(btn => btn.disabled = true);
                
                // Tunjukkan yang benar
                document.getElementById(`q-opt-${qi}-${q.ans}`).classList.add('opt-correct');
                
                fb.className = 'q-feedback fb-wrong';
                fb.textContent = '❌ Kesempatan habis.';
                
                setTimeout(() => showPembahasan(q.pembahasan, false, qi), 500);
                addReviewButton(qi);
            }
        }
    };

    let selectedDnDChoice = null;
    let draggedDnDChoice = null;

    window.handleDnDClick = function(qi, oi) {
        if (currentQuizState[qi].locked) return;
        
        // Deselect previous
        document.querySelectorAll('.dnd-choice-item').forEach(el => el.classList.remove('selected'));
        
        // Select new
        selectedDnDChoice = { qi, oi };
        document.getElementById(`dnd-choice-${qi}-${oi}`).classList.add('selected');
    };

    window.handleDropClick = function(qi) {
        if (currentQuizState[qi].locked) return;
        if (!selectedDnDChoice || selectedDnDChoice.qi !== qi) return;
        
        processDnDAnswer(qi, selectedDnDChoice.oi);
        selectedDnDChoice = null;
    };

    window.handleDragStart = function(event, qi, oi) {
        if (currentQuizState[qi].locked) {
            event.preventDefault();
            return;
        }
        draggedDnDChoice = { qi, oi };
    };

    window.handleDragOver = function(event) {
        event.preventDefault(); // Necessary to allow dropping
        event.currentTarget.classList.add('drag-over');
    };

    window.handleDragLeave = function(event) {
        event.currentTarget.classList.remove('drag-over');
    };

    window.handleDrop = function(event, qi) {
        event.preventDefault();
        event.currentTarget.classList.remove('drag-over');
        if (currentQuizState[qi].locked) return;
        
        if (draggedDnDChoice && draggedDnDChoice.qi === qi) {
            processDnDAnswer(qi, draggedDnDChoice.oi);
        }
        draggedDnDChoice = null;
    };

    function processDnDAnswer(qi, oi) {
        const state = currentQuizState[qi];
        if (state.locked) return;
        
        state.attempts = (state.attempts || 0) + 1;
        
        const q = currentQuestions[qi];
        const isCorrect = (oi === q.ans);
        const fb = document.getElementById(`q-fb-${qi}`);
        const dropZone = document.getElementById(`dnd-drop-${qi}`);
        
        if (isCorrect) {
            state.locked = true;
            questionsAnswered++;
            document.querySelectorAll(`#dnd-choices-${qi} .dnd-choice-item`).forEach(el => el.classList.add('hidden'));
            
            dropZone.textContent = q.opts[oi];
            dropZone.classList.add('dropped', 'correct-drop');
            
            state.correct = true;
            score += 4;
            currentScoreEl.textContent = score * 2;
            
            fb.className = 'q-feedback fb-correct';
            fb.textContent = '✅ Benar! Hebat!';
            
            setTimeout(() => showPembahasan(q.pembahasan, true, qi), 500);
            addReviewButton(qi);
        } else {
            if (state.attempts < 2) {
                dropZone.textContent = q.opts[oi];
                dropZone.classList.add('wrong-drop');
                
                fb.className = 'q-feedback fb-wrong';
                fb.textContent = '❌ Kurang tepat. Coba 1 kali lagi ya!';
                
                setTimeout(() => {
                    dropZone.classList.remove('wrong-drop');
                    dropZone.textContent = 'Tarik jawaban ke sini atau ketuk jawaban lalu ketuk kotak ini';
                    document.getElementById(`dnd-choice-${qi}-${oi}`).classList.add('hidden'); // Sembunyikan yang salah agar tak dipilih lagi
                    fb.textContent = '';
                }, 1200);
            } else {
                state.locked = true;
                questionsAnswered++;
                document.querySelectorAll(`#dnd-choices-${qi} .dnd-choice-item`).forEach(el => el.classList.add('hidden'));
                
                dropZone.textContent = q.opts[q.ans];
                dropZone.classList.add('dropped', 'wrong-drop');
                
                fb.className = 'q-feedback fb-wrong';
                fb.innerHTML = `❌ Kesempatan habis.<br>Jawaban benar: <b>${q.opts[q.ans]}</b>`;
                
                setTimeout(() => showPembahasan(q.pembahasan, false, qi), 500);
                addReviewButton(qi);
            }
        }
    }

    function addReviewButton(qi) {
        const badge = document.getElementById(`q-badge-${qi}`);
        if (!badge || badge.parentElement.querySelector('.review-btn')) return;
        const btn = document.createElement('button');
        btn.className = 'review-btn';
        btn.innerHTML = '📖 Pembahasan';
        btn.onclick = () => showPembahasan(currentQuestions[qi].pembahasan, currentQuizState[qi].correct, qi);
        badge.after(btn);
    }

    window.showPembahasan = function(html, isCorrect, qi) {
        pembahasanIcon.textContent = isCorrect ? '🌟' : '📖';
        pembahasanContent.innerHTML = html;
        pembahasanOverlay.classList.add('visible');
    };

    closePembahasanBtn.addEventListener('click', () => {
        pembahasanOverlay.classList.remove('visible');
        
        // Cek jika sudah selesai semua soal
        if (questionsAnswered >= currentQuestions.length) {
            quizCompletion.style.display = 'block';
            finalScoreText.textContent = score * 2;
            // Scroll to bottom
            quizCompletion.scrollIntoView({ behavior: 'smooth' });
        }
    });

    const sfSubmitBtn = document.getElementById('sf-submit-btn');
    const sfContainer = document.getElementById('sf-container');
    const sfSuccess = document.getElementById('sf-success');

    if (sfSubmitBtn) {
        sfSubmitBtn.addEventListener('click', () => {
            const name = document.getElementById('sf-name').value.trim();
            const kelas = document.getElementById('sf-class').value;

            if (!name || !kelas) {
                alert('Harap isi Nama dan Kelas terlebih dahulu! 😊');
                return;
            }

            sfSubmitBtn.disabled = true;
            sfSubmitBtn.textContent = 'Mengirim... ⏳';

            const moduleConfig = allModules[currentSubject];
            const FORM_URL = moduleConfig.formUrl;
            const entries = moduleConfig.formEntries;
            
            const body = new URLSearchParams();
            body.append(entries.name, name); // Nama
            body.append(entries.kelas, kelas); // Kelas
            body.append(entries.mapel, moduleConfig.title); // Mata Pelajaran
            body.append(entries.skor, (score * 2).toString()); // Skor

            fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body: body })
                .then(() => {
                    sfContainer.style.display = 'none';
                    sfSuccess.style.display = 'block';
                    document.getElementById('sf-final-report').innerHTML = `Hebat <strong>${name}</strong>!<br>Kamu mendapat skor akhir <strong>${score * 2}</strong>.`;
                    
                    // Show Leaderboard wrapper after success
                    const hofWrapper = document.getElementById('hof-wrapper');
                    if (hofWrapper) hofWrapper.style.display = 'block';
                })
                .catch(() => {
                    sfSubmitBtn.disabled = false;
                    sfSubmitBtn.textContent = 'Kirim Nilai 🚀';
                    alert('Ups! Ada masalah saat mengirim.');
                });
        });
    }

    const openLeaderboardBtn = document.getElementById('open-leaderboard-btn');
    const closeLeaderboardBtn = document.getElementById('close-leaderboard-btn');
    const leaderboardOverlay = document.getElementById('leaderboard-overlay');
    const unlockHofBtn = document.getElementById('unlock-hof-btn');

    if (unlockHofBtn) {
        unlockHofBtn.addEventListener('click', () => {
            const code = prompt("Masukkan kode untuk membuka Papan Skor:");
            if (code === "1801") {
                unlockHofBtn.style.display = 'none';
                loadHallOfFame(allModules[currentSubject].title, 'hof-grid', 'hof-container');
            } else if (code !== null) {
                alert("Kode salah! ❌");
            }
        });
    }

    if (openLeaderboardBtn) {
        openLeaderboardBtn.addEventListener('click', () => {
            const code = prompt("Masukkan kode rahasia guru:");
            if (code === "1801") {
                leaderboardOverlay.classList.add('visible');
                loadHallOfFame(allModules[currentSubject].title, 'overlay-hof-grid', 'overlay-hof-container');
            } else if (code !== null) {
                alert("Kode salah! ❌");
            }
        });
    }

    if (closeLeaderboardBtn) {
        closeLeaderboardBtn.addEventListener('click', () => {
            leaderboardOverlay.classList.remove('visible');
        });
    }

    const hofFilter = document.getElementById('hof-filter');
    if (hofFilter) {
        hofFilter.addEventListener('change', () => {
            loadHallOfFame(allModules[currentSubject].title, 'hof-grid', 'hof-container');
        });
    }

    const overlayHofFilter = document.getElementById('overlay-hof-filter');
    if (overlayHofFilter) {
        overlayHofFilter.addEventListener('change', () => {
            loadHallOfFame(allModules[currentSubject].title, 'overlay-hof-grid', 'overlay-hof-container');
        });
    }

    async function loadHallOfFame(targetSubject = null, gridId = 'hof-grid', containerId = 'hof-container') {
        const SHEET_ID = allModules[currentSubject].sheetId;
        const GID = '0';
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

        const grid = document.getElementById(gridId);
        const container = document.getElementById(containerId);
        if (!grid || !container) return;
        
        container.style.display = 'block';
        grid.innerHTML = '<div class="hof-loading">⏳ Memuat data teman-teman...</div>';

        const filterId = gridId === 'overlay-hof-grid' ? 'overlay-hof-filter' : 'hof-filter';
        const filterEl = document.getElementById(filterId);
        const targetClass = filterEl ? filterEl.value : 'All';

        try {
            const res = await fetch(url);
            const text = await res.text();
            const jsonStr = text.replace(/^[^(]+\(/, '').replace(/\);?\s*$/, '');
            const data = JSON.parse(jsonStr);
            const rows = data?.table?.rows;

            if (!rows || rows.length === 0) {
                grid.innerHTML = '<p class="hof-empty">Kamu yang pertama! Jadilah juara! 😊</p>';
                return;
            }

            grid.innerHTML = '';
            
            // Skip the first row if it's the header
            let startIndex = 0;
            if (rows[0] && rows[0].c && rows[0].c[0] && rows[0].c[0].v === 'Timestamp') {
                startIndex = 1;
            } else if (rows[0] && rows[0].c && rows[0].c[1] && typeof rows[0].c[1].v === 'string' && rows[0].c[1].v.toLowerCase().includes('nama')) {
                startIndex = 1;
            }
            
            let count = 0;
            for (let i = startIndex; i < rows.length; i++) {
                const row = rows[i];
                if (!row || !row.c) continue;
                
                // A(0): Timestamp, B(1): Nama, C(2): Kelas, D(3): Mapel, E(4): Skor
                const mapel = row.c[3]?.v ?? '';
                if (targetSubject && mapel.trim() !== targetSubject.trim()) {
                    continue; // Filter based on subject
                }

                const nama = row.c[1]?.v ?? '–';
                if (nama === '–') continue;
                
                const kelas = row.c[2]?.v ?? '';
                if (targetClass !== 'All' && kelas.trim() !== targetClass.trim()) {
                    continue; // Filter based on class
                }

                const skor = row.c[4]?.v ?? '';
                
                const card = document.createElement('div');
                card.className = 'hof-card';
                card.innerHTML = `
                    <div class="hof-info">
                        <div class="hof-name">${nama}</div>
                        <div class="hof-kelas">${kelas}</div>
                    </div>
                    <div class="hof-score">${skor}</div>
                `;
                grid.appendChild(card);
                count++;
            }
            
            if (count === 0) {
                grid.innerHTML = '<p class="hof-empty">Kamu yang pertama! Jadilah juara! 😊</p>';
            }
        } catch (e) {
            console.error(e);
            grid.innerHTML = '<p class="hof-empty">⚠️ Gagal memuat data teman-teman.</p>';
        }
    }

});
