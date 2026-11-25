(() => {
  "use strict";

  // Helper pecahan susun tegak (wajib untuk semua pecahan)
  function frac(num, den, extraClass = "") {
    return `<span class="frac ${extraClass}" aria-label="${num} per ${den}"><span class="frac-num">${num}</span><span class="frac-den">${den}</span></span>`;
  }

  const CHAPTERS = [
    {
      id: 1,
      icon: "123",
      shortTitle: "Bab 1",
      title: "Bilangan Cacah sampai 10.000",
      subtitle: "Nilai angka, penyusunan bilangan, pengurutan & uang saku"
    },
    {
      id: 2,
      icon: "&#9968;",
      shortTitle: "Bab 2",
      title: "Nilai Tempat & Nilai Angka",
      subtitle: "Selisih nilai angka, urutan bilangan, tabel gunung & tabungan"
    },
    {
      id: 3,
      icon: "&times; :",
      shortTitle: "Bab 3",
      title: "Operasi Hitung Bilangan",
      subtitle: "Perkalian susun, porogapit bersisa & soal cerita seru"
    },
    {
      id: 4,
      icon: frac(1, 2),
      shortTitle: "Bab 4",
      title: "Pecahan",
      subtitle: "Membandingkan, menyederhanakan & pecahan senilai"
    },
    {
      id: 5,
      icon: "cm",
      shortTitle: "Bab 5",
      title: "Kelipatan, Faktor & Pengukuran Panjang",
      subtitle: "Faktor persekutuan, kelipatan, tabel faktor & tangga satuan"
    }
  ];

  // Bank Soal Lengkap (25 Soal, 5 Bab)
  const QUESTIONS = [
    // ================= BAB 1 =================
    {
      id: 1,
      chapter: 1,
      type: "pg",
      typeLabel: "PG Tunggal",
      prompt: "Selisih nilai angka 8 pada bilangan <strong>8.840</strong> adalah....",
      options: [
        { key: "a", html: "7.200" },
        { key: "b", html: "8.800" },
        { key: "c", html: "0" },
        { key: "d", html: "16" }
      ],
      answer: "a",
      hint: "Cek nilai tempat masing-masing angka 8 (ribuan dan ratusan), lalu kurangkan.",
      explanation: "Angka 8 pertama bernilai <strong>8.000</strong> (ribuan), angka 8 kedua bernilai <strong>800</strong> (ratusan). Selisihnya = 8.000 &minus; 800 = <strong>7.200</strong>."
    },
    {
      id: 2,
      chapter: 1,
      type: "pg",
      typeLabel: "PG Tunggal",
      prompt: "Pak Amin mempunyai peternakan ayam. Di kandang pertama terdapat <strong>1.000</strong> butir telur. Pada kandang kedua terdapat <strong>60</strong> butir telur, dan di kandang ketiga terdapat <strong>500</strong> butir telur. Seluruh jumlah telur Pak Amin berjumlah....",
      options: [
        { key: "a", html: "1.065" },
        { key: "b", html: "1.506" },
        { key: "c", html: "1.056" },
        { key: "d", html: "1.560" }
      ],
      answer: "d",
      hint: "Susun penjumlahan berdasarkan nilai tempat: ribuan + ratusan + puluhan.",
      explanation: "1.000 + 500 + 60 = <strong>1.560</strong> butir telur."
    },
    {
      id: 3,
      chapter: 1,
      type: "tf",
      typeLabel: "PG Kompleks - Benar/Salah",
      prompt: "Ibu membeli barang-barang dengan mendapatkan diskon yaitu celana sebesar <strong>Rp8.069</strong>, kaos sebesar <strong>Rp8.096</strong>, tas sebesar <strong>Rp7.306</strong>, dan kemeja sebesar <strong>Rp7.063</strong>. Tentukan <strong>Benar</strong> atau <strong>Salah</strong> untuk setiap pernyataan berikut:",
      statements: [
        { id: "s1", text: "Diskon yang paling sedikit adalah kemeja.", answer: "Benar" },
        { id: "s2", text: "Urutan diskon dari yang terbesar adalah celana, kaos, tas, kemeja.", answer: "Salah" },
        { id: "s3", text: "Urutan diskon dari yang terkecil adalah kemeja, tas, celana, kaos.", answer: "Benar" }
      ],
      hint: "Bandingkan mulai dari angka ribuan, lalu ratusan, lalu puluhan.",
      explanation: "Urutan dari terkecil ke terbesar adalah <strong>Rp7.063</strong> (kemeja), <strong>Rp7.306</strong> (tas), <strong>Rp8.069</strong> (celana), <strong>Rp8.096</strong> (kaos). Jadi pernyataan 1 Benar, pernyataan 2 Salah (seharusnya kaos dulu sebelum celana), dan pernyataan 3 Benar."
    },
    {
      id: 4,
      chapter: 1,
      type: "short",
      typeLabel: "Isian Singkat",
      prompt: "Diketahui bilangan empat angka. Angka <strong>5</strong> menempati nilai ratusan. Angka <strong>3</strong> menempati nilai satuan. Angka <strong>7</strong> menempati nilai ribuan. Angka <strong>1</strong> menempati nilai puluhan. Bilangan yang terbentuk adalah.... <em>(Gunakan tanda titik ribuan)</em>",
      placeholder: "Contoh: 1.234",
      answer: "7.513",
      validator: (val) => normalizeNumberDot(val) === "7.513",
      hint: "Urutkan posisi dari depan ke belakang: Ribuan &minus; Ratusan &minus; Puluhan &minus; Satuan.",
      explanation: "Ribuan (7) + Ratusan (5) + Puluhan (1) + Satuan (3) = <strong>7.513</strong>."
    },
    {
      id: 5,
      chapter: 1,
      type: "multi",
      typeLabel: "Isian Multi-Input",
      prompt: "Uang saku Salma terdiri atas <strong>2 lembar Rp5.000</strong> dan <strong>3 lembar Rp1.000</strong>. Uang saku Alya terdiri atas <strong>2 lembar Rp5.000</strong> dan <strong>4 keping Rp500</strong>. Sedangkan uang saku Rara terdiri atas <strong>5 lembar Rp2.000</strong> dan <strong>3 keping Rp500</strong>.",
      fields: [
        { id: "f1", label: "Uang saku Salma", prefix: "Rp", placeholder: "00.000", answer: "13.000", type: "money" },
        { id: "f2", label: "Uang saku Alya", prefix: "Rp", placeholder: "00.000", answer: "12.000", type: "money" },
        { id: "f3", label: "Uang saku Rara", prefix: "Rp", placeholder: "00.000", answer: "11.500", type: "money" },
        { id: "f4", label: "Uang saku paling besar adalah milik", prefix: "", placeholder: "Nama", answer: "Salma", type: "text" },
        { id: "f5", label: "Uang saku paling sedikit adalah milik", prefix: "", placeholder: "Nama", answer: "Rara", type: "text" }
      ],
      hint: "Kalikan jumlah lembar/keping dengan nilai masing-masing uang, lalu jumlahkan.",
      explanation: "Salma = 10.000 + 3.000 = <strong>Rp13.000</strong>; Alya = 10.000 + 2.000 = <strong>Rp12.000</strong>; Rara = 10.000 + 1.500 = <strong>Rp11.500</strong>. Paling besar milik <strong>Salma</strong> dan paling sedikit milik <strong>Rara</strong>."
    },

    // ================= BAB 2 =================
    {
      id: 6,
      chapter: 2,
      type: "pg",
      typeLabel: "PG Tunggal",
      prompt: "Selisih nilai angka 7 pada bilangan <strong>4.877</strong> adalah....",
      options: [
        { key: "a", html: "0" },
        { key: "b", html: "77" },
        { key: "c", html: "14" },
        { key: "d", html: "63" }
      ],
      answer: "d",
      hint: "Angka 7 menempati nilai tempat puluhan dan satuan.",
      explanation: "Nilai angka 7 puluhan = <strong>70</strong>, nilai angka 7 satuan = <strong>7</strong>. Selisihnya = 70 &minus; 7 = <strong>63</strong>."
    },
    {
      id: 7,
      chapter: 2,
      type: "pg",
      typeLabel: "PG Tunggal",
      prompt: "Disajikan angka-angka <strong>1, 2, 4, dan 8</strong>. Urutan angka-angka dari yang terkecil ke yang terbesar berdasarkan kumpulan angka-angka tersebut adalah....",
      options: [
        { key: "a", html: "8.412, 8.421, 8.214, 8.241, 8.124, 8.142" },
        { key: "b", html: "8.124, 8.142, 8.214, 8.241, 8.412, 8.421" },
        { key: "c", html: "8.142, 8.124, 8.241, 8.214, 8.421, 8.412" },
        { key: "d", html: "8.421, 8.412, 8.241, 8.214, 8.142, 8.124" }
      ],
      answer: "b",
      hint: "Karena ribuan semuanya 8, bandingkan angka ratusannya mulai dari yang terkecil (1, lalu 2, lalu 4).",
      explanation: "Urutan dari terkecil: <strong>8.124 &lt; 8.142 &lt; 8.214 &lt; 8.241 &lt; 8.412 &lt; 8.421</strong>."
    },
    {
      id: 8,
      chapter: 2,
      type: "pg_multi",
      typeLabel: "PG Kompleks - Pilih 2 Jawaban",
      requiredCount: 2,
      prompt: "Pernyataan yang tepat untuk bilangan <strong>3.458</strong> adalah.... <em>(Pilih 2 jawaban)</em>",
      options: [
        { key: "a", html: "jumlah nilai angka 5 dan 8 pada bilangan tersebut adalah 58" },
        { key: "b", html: "jumlah nilai angka 5 dan 8 pada bilangan tersebut adalah 13" },
        { key: "c", html: "selisih nilai angka 5 dan 8 pada bilangan tersebut adalah 3" },
        { key: "d", html: "selisih nilai angka 5 dan 8 pada bilangan tersebut adalah 42" }
      ],
      answer: ["a", "d"],
      hint: "Nilai angka 5 adalah 50 dan nilai angka 8 adalah 8. Hitung jumlah dan selisihnya.",
      explanation: "Jumlah = 50 + 8 = <strong>58</strong> (opsi a benar). Selisih = 50 &minus; 8 = <strong>42</strong> (opsi d benar)."
    },
    {
      id: 9,
      chapter: 2,
      type: "match",
      typeLabel: "Menjodohkan / Dropdown Tabel",
      prompt: "Perhatikan tabel ketinggian gunung berikut, lalu pasangkan setiap keterangan dengan nama gunung yang tepat:",
      visualHtml: `
        <table class="data-table">
          <thead>
            <tr>
              <th>Nama Gunung</th>
              <th>Ketinggian</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Gunung Merapi</td><td>2.968 mdpl</td></tr>
            <tr><td>Gunung Merbabu</td><td>3.145 mdpl</td></tr>
            <tr><td>Gunung Latimojong</td><td>3.340 mdpl</td></tr>
            <tr><td>Gunung Sumbing</td><td>3.371 mdpl</td></tr>
            <tr><td>Gunung Sanggar</td><td>3.564 mdpl</td></tr>
          </tbody>
        </table>
      `,
      choices: [
        "Gunung Merapi",
        "Gunung Merbabu",
        "Gunung Latimojong",
        "Gunung Sumbing",
        "Gunung Sanggar"
      ],
      rows: [
        { id: "m1", label: "1. Gunung tertinggi", answer: "Gunung Sanggar" },
        { id: "m2", label: "2. Gunung yang paling rendah", answer: "Gunung Merapi" },
        { id: "m3", label: "3. Gunung dengan bentuk panjang 3.000 + 300 + 40 + 0", answer: "Gunung Latimojong" },
        { id: "m4", label: "4. Gunung dengan nilai tempat puluhan angka 7", answer: "Gunung Sumbing" },
        { id: "m5", label: "5. Gunung setinggi tiga ribu seratus empat puluh lima", answer: "Gunung Merbabu" }
      ],
      hint: "Cocokkan satu per satu dengan melihat angka ribuan, ratusan, dan puluhan pada tabel.",
      explanation: "Sanggar tertinggi (3.564 mdpl), Merapi terendah (2.968 mdpl), Latimojong = 3.340, Sumbing puluhannya 7 (3.371), dan Merbabu = 3.145."
    },
    {
      id: 10,
      chapter: 2,
      type: "short",
      typeLabel: "Isian Singkat",
      prompt: "Sabrina menabung setiap hari untuk membeli Al Qur'an baru. Ia telah memiliki <strong>dua lembar uang lima puluh ribu rupiah</strong> dan <strong>lima lembar uang dua ribu rupiah</strong>. Sabrina membeli Al Qur'an seharga <strong>Rp107.000</strong>. Sisa uang Sabrina sekarang adalah.... <em>(Tulis dengan Rp, contoh: Rp1.500)</em>",
      placeholder: "Contoh: Rp1.500",
      answer: "Rp3.000",
      validator: (val) => normalizeRupiah(val) === "rp3.000",
      hint: "Hitung dulu total seluruh uang Sabrina, lalu kurangi dengan harga Al Qur'an.",
      explanation: "Total uang = (2 &times; Rp50.000) + (5 &times; Rp2.000) = Rp100.000 + Rp10.000 = Rp110.000. Sisa = Rp110.000 &minus; Rp107.000 = <strong>Rp3.000</strong>."
    },

    // ================= BAB 3 =================
    {
      id: 11,
      chapter: 3,
      type: "pg",
      typeLabel: "PG Tunggal",
      prompt: "Perhatikan perkalian susun ke bawah berikut: <strong>208 &times; 5 = 1.0A0</strong>. Nilai <strong>A</strong> untuk perkalian tersebut adalah....",
      visualHtml: `
        <div class="col-mult-box" aria-label="208 dikali 5 sama dengan 1.0A0">
          <div class="col-mult-row">2 0 8</div>
          <div class="col-mult-row">5</div>
          <div class="col-mult-line"><span class="col-mult-op">&times;</span></div>
          <div class="col-mult-row">1.0<span class="mystery-digit">A</span>0</div>
        </div>
      `,
      options: [
        { key: "a", html: "0" },
        { key: "b", html: "4" },
        { key: "c", html: "5" },
        { key: "d", html: "9" }
      ],
      answer: "b",
      hint: "Hitung 8 &times; 5 = 40 (tulis 0, simpan 4), lalu hitung 0 &times; 5 ditambah simpanan 4.",
      explanation: "208 &times; 5 = <strong>1.040</strong>, sehingga nilai <strong>A</strong> yang menempati puluhan adalah <strong>4</strong>."
    },
    {
      id: 12,
      chapter: 3,
      type: "pg",
      typeLabel: "PG Tunggal",
      prompt: "Hasil <strong>737 : 3</strong> akan mempunyai sisa....",
      options: [
        { key: "a", html: "242" },
        { key: "b", html: "2" },
        { key: "c", html: "245" },
        { key: "d", html: "4" }
      ],
      answer: "b",
      hint: "Gunakan pembagian bersusun (porogapit) di papan coret-coretan kanan.",
      explanation: "737 : 3 = 245 dengan sisa <strong>2</strong> (karena 3 &times; 245 = 735, dan 737 &minus; 735 = <strong>2</strong>)."
    },
    {
      id: 13,
      chapter: 3,
      type: "short",
      typeLabel: "Isian Singkat",
      prompt: "Pak Ahmad mempunyai perkebunan jeruk yang sangat luas. Pada hari Senin hasil panen <strong>3.483</strong> buah jeruk. Pada hari Selasa hasil panen <strong>2.672</strong> buah jeruk. Ternyata dari hasil panen tersebut <strong>429</strong> buah jeruk busuk, sehingga tidak bisa dijual ke pasar. Buah jeruk yang bisa dijual Pak Ahmad ke pasar adalah.... <em>(Angka saja dengan titik ribuan)</em>",
      placeholder: "Contoh: 1.234",
      answer: "5.726",
      validator: (val) => normalizeNumberDot(val) === "5.726",
      hint: "Jumlahkan panen hari Senin dan Selasa terlebih dahulu, lalu kurangi dengan jeruk yang busuk.",
      explanation: "Total panen = 3.483 + 2.672 = 6.155. Jeruk layak jual = 6.155 &minus; 429 = <strong>5.726</strong> buah."
    },
    {
      id: 14,
      chapter: 3,
      type: "short",
      typeLabel: "Isian Singkat",
      prompt: "Bu Aisyah memiliki <strong>6 dus</strong> minuman, setiap dus berisi <strong>48 botol</strong>. Bu Aisyah memasukkan <strong>10 botol</strong> minuman tersebut ke dalam kulkas. Jumlah minuman yang masih ada di dalam dus ada ... botol. <em>(Angka saja)</em>",
      placeholder: "Angka saja",
      answer: "278",
      validator: (val) => normalizePlainInt(val) === "278",
      hint: "Kalikan jumlah dus dengan isi per dus, kemudian kurangi botol yang dipindah ke kulkas.",
      explanation: "Total minuman = 6 &times; 48 = 288 botol. Sisa di dalam dus = 288 &minus; 10 = <strong>278</strong> botol."
    },
    {
      id: 15,
      chapter: 3,
      type: "short",
      typeLabel: "Isian Singkat",
      prompt: "Pak Dodi mempunyai persediaan hadiah di kelasnya, yaitu <strong>4 pak pensil</strong> dan <strong>3 pak penghapus</strong>. Jika setiap pak berisi <strong>27 pensil</strong> dan <strong>12 penghapus</strong>. Jumlah pensil dan penghapus seluruhnya adalah.... <em>(Angka saja)</em>",
      placeholder: "Angka saja",
      answer: "144",
      validator: (val) => normalizePlainInt(val) === "144",
      hint: "Hitung masing-masing jumlah pensil dan jumlah penghapus, lalu jumlahkan keduanya.",
      explanation: "Pensil = 4 &times; 27 = 108; Penghapus = 3 &times; 12 = 36. Total seluruhnya = 108 + 36 = <strong>144</strong>."
    },

    // ================= BAB 4 =================
    {
      id: 16,
      chapter: 4,
      type: "pg",
      typeLabel: "PG Tunggal",
      prompt: `Aldo, Azhar, dan Wawan diberi roti oleh Bu Guru. Aldo mendapat ${frac(7, 10)} bagian, Azhar mendapat ${frac(5, 10)} bagian, dan Wawan ${frac(3, 10)} bagian. Berapa bagian yang harus ditambahkan agar bolu Wawan lebih banyak dari Azhar namun lebih sedikit dari Aldo?`,
      visualHtml: `
        <div class="fraction-bars-wrap">
          <div class="fraction-bar-row">
            <span>Aldo (${frac(7, 10)})</span>
            <div class="fraction-strip">${Array.from({ length: 10 }, (_, i) => `<div class="fraction-cell ${i < 7 ? "filled-blue" : ""}"></div>`).join("")}</div>
          </div>
          <div class="fraction-bar-row">
            <span>Azhar (${frac(5, 10)})</span>
            <div class="fraction-strip">${Array.from({ length: 10 }, (_, i) => `<div class="fraction-cell ${i < 5 ? "filled-slate" : ""}"></div>`).join("")}</div>
          </div>
          <div class="fraction-bar-row">
            <span>Wawan (${frac(3, 10)})</span>
            <div class="fraction-strip">${Array.from({ length: 10 }, (_, i) => `<div class="fraction-cell ${i < 3 ? "filled-amber" : ""}"></div>`).join("")}</div>
          </div>
        </div>
      `,
      options: [
        { key: "a", html: frac(2, 10) },
        { key: "b", html: frac(3, 10) },
        { key: "c", html: frac(4, 10) },
        { key: "d", html: frac(5, 10) }
      ],
      answer: "b",
      hint: `Cari pecahan di antara ${frac(5, 10)} dan ${frac(7, 10)}, lalu kurangi dengan bagian awal Wawan (${frac(3, 10)}).`,
      explanation: `Pecahan di antara ${frac(5, 10)} dan ${frac(7, 10)} adalah ${frac(6, 10)}. Tambahan yang dibutuhkan Wawan = ${frac(6, 10)} &minus; ${frac(3, 10)} = <strong>${frac(3, 10)}</strong>.`
    },
    {
      id: 17,
      chapter: 4,
      type: "pg_multi",
      typeLabel: "PG Kompleks - Pilih 2 Jawaban",
      requiredCount: 2,
      prompt: `Nilai <strong>P</strong> dan <strong>Q</strong> yang tepat agar terbentuk pecahan senilai ${frac(2, 4, "frac-lg")} = ${frac("P", 8, "frac-lg")} = ${frac(6, "Q", "frac-lg")} adalah.... <em>(Pilih 2 jawaban)</em>`,
      options: [
        { key: "a", html: "P = 4" },
        { key: "b", html: "P = 6" },
        { key: "c", html: "Q = 10" },
        { key: "d", html: "Q = 12" }
      ],
      answer: ["a", "d"],
      hint: "Perhatikan pengali pada penyebut (4 ke 8 dikali 2) dan pengali pada pembilang (2 ke 6 dikali 3).",
      explanation: "Untuk P: penyebut 4 &times; 2 = 8, maka P = 2 &times; 2 = <strong>4</strong>. Untuk Q: pembilang 2 &times; 3 = 6, maka Q = 4 &times; 3 = <strong>12</strong>."
    },
    {
      id: 18,
      chapter: 4,
      type: "pg_multi",
      typeLabel: "PG Kompleks - Pilih 2 Jawaban",
      requiredCount: 2,
      prompt: "Ibu membuat kue dan dipotong menjadi <strong>20 bagian</strong>. Ibu memberikan <strong>12 bagian</strong> kepada Zaza. Kue yang dimiliki ibu sekarang ada .... bagian. <em>(Pilih 2 jawaban)</em>",
      visualHtml: `
        <div class="cake-grid-wrap">
          <div class="cake-grid">
            ${Array.from({ length: 20 }, (_, i) => `<div class="cake-piece ${i < 12 ? "given" : ""}"></div>`).join("")}
          </div>
          <div class="cake-legend">
            <span class="legend-item"><span class="legend-swatch given"></span> Diberikan ke Zaza (12 bagian)</span>
            <span class="legend-item"><span class="legend-swatch"></span> Sisa kue ibu</span>
          </div>
        </div>
      `,
      options: [
        { key: "a", html: frac(12, 20) },
        { key: "b", html: frac(8, 20) },
        { key: "c", html: frac(2, 10) },
        { key: "d", html: frac(2, 5) }
      ],
      answer: ["b", "d"],
      hint: "Hitung sisa kue ibu terlebih dahulu, lalu sederhanakan pecahannya dengan membagi pembilang dan penyebut dengan angka yang sama.",
      explanation: `Sisa kue = ${frac("20 &minus; 12", 20)} = <strong>${frac(8, 20)}</strong>. Jika disederhanakan (dibagi 4), ${frac(8, 20)} senilai dengan <strong>${frac(2, 5)}</strong>.`
    },
    {
      id: 19,
      chapter: 4,
      type: "compare",
      typeLabel: "Dropdown Perbandingan (<, >, =)",
      prompt: "Tentukan tanda pembanding yang tepat (<strong>&lt;</strong>, <strong>&gt;</strong>, atau <strong>=</strong>) untuk pecahan berikut:",
      items: [
        { id: "c1", left: [4, 6], right: [6, 9], answer: "=" },
        { id: "c2", left: [7, 9], right: [3, 5], answer: ">" },
        { id: "c3", left: [1, 6], right: [1, 8], answer: ">" }
      ],
      hint: "Gunakan perkalian silang atau sederhanakan pecahan untuk membandingkan.",
      explanation: `${frac(4, 6)} dan ${frac(6, 9)} sama-sama senilai dengan ${frac(2, 3)} (<strong>=</strong>); 7 &times; 5 = 35 &gt; 3 &times; 9 = 27 (<strong>&gt;</strong>); pembilang sama 1, penyebut 6 lebih kecil dari 8 sehingga nilainya lebih besar (<strong>&gt;</strong>).`
    },
    {
      id: 20,
      chapter: 4,
      type: "frac_fill",
      typeLabel: "Isian Multi-Input",
      prompt: "Isilah titik-titik pada pecahan susun berikut agar menjadi pecahan senilai:",
      items: [
        { id: "ff1", leftNum: 3, leftDen: 4, rightNum: 6, rightDen: null, answer: "8" },
        { id: "ff2", leftNum: 2, leftDen: 3, rightNum: null, rightDen: 24, answer: "16" },
        { id: "ff3", leftNum: 3, leftDen: 7, rightNum: null, rightDen: 28, answer: "12" },
        { id: "ff4", leftNum: 18, leftDen: null, rightNum: 3, rightDen: 5, answer: "30" },
        { id: "ff5", leftNum: 6, leftDen: 9, rightNum: 42, rightDen: null, answer: "63" }
      ],
      hint: "Kalikan atau bagilah pembilang dan penyebut dengan bilangan yang sama.",
      explanation: `${frac(3, 4)} (&times;2) = <strong>${frac(6, 8)}</strong>; ${frac(2, 3)} (&times;8) = <strong>${frac(16, 24)}</strong>; ${frac(3, 7)} (&times;4) = <strong>${frac(12, 28)}</strong>; ${frac(3, 5)} (&times;6) = <strong>${frac(18, 30)}</strong>; ${frac(6, 9)} (&times;7) = <strong>${frac(42, 63)}</strong>.`
    },

    // ================= BAB 5 =================
    {
      id: 21,
      chapter: 5,
      type: "pg",
      typeLabel: "PG Tunggal",
      prompt: "Semua faktor persekutuan dari <strong>20</strong> dan <strong>36</strong> adalah....",
      options: [
        { key: "a", html: "1, 2, 4" },
        { key: "b", html: "1, 2, 3" },
        { key: "c", html: "2, 4, 6" },
        { key: "d", html: "2, 3, 6" }
      ],
      answer: "a",
      hint: "Tuliskan semua faktor dari 20 dan 36 di papan coret-coretan, lalu lingkari angka yang sama.",
      explanation: "Faktor 20 = {1, 2, 4, 5, 10, 20}; Faktor 36 = {1, 2, 3, 4, 6, 9, 12, 18, 36}. Faktor persekutuannya adalah <strong>1, 2, 4</strong>."
    },
    {
      id: 22,
      chapter: 5,
      type: "pg",
      typeLabel: "PG Tunggal",
      prompt: "Kelipatan 6 <strong>antara</strong> 20 dan 36 adalah....",
      options: [
        { key: "a", html: "26, 30" },
        { key: "b", html: "26, 30, 36" },
        { key: "c", html: "24, 30" },
        { key: "d", html: "24, 30, 36" }
      ],
      answer: "c",
      hint: "Hati-hati dengan kata \"antara\", artinya bilangan batas (20 dan 36) tidak ikut disertakan.",
      explanation: "Kelipatan 6 = 6, 12, 18, 24, 30, 36. Yang berada di antara 20 dan 36 adalah <strong>24 dan 30</strong>."
    },
    {
      id: 23,
      chapter: 5,
      type: "pg_multi",
      typeLabel: "PG Kompleks - Pilih 3 Jawaban",
      requiredCount: 3,
      prompt: "Perhatikan tabel faktor perkalian dari 30 berikut. Bilangan yang tepat untuk mengisi faktor yang kosong adalah.... <em>(Pilih 3 jawaban)</em>",
      visualHtml: `
        <table class="factor-table" aria-label="Tabel Faktor Perkalian 30">
          <thead>
            <tr><th colspan="2">Faktor dari 30 (&times;)</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td><span class="factor-blank">...</span></td></tr>
            <tr><td>2</td><td><span class="factor-blank">...</span></td></tr>
            <tr><td>3</td><td>10</td></tr>
            <tr><td><span class="factor-blank">...</span></td><td>6</td></tr>
          </tbody>
        </table>
      `,
      options: [
        { key: "a", html: "5" },
        { key: "b", html: "15" },
        { key: "c", html: "20" },
        { key: "d", html: "30" }
      ],
      answer: ["a", "b", "d"],
      hint: "Cari pasangan bilangan yang jika dikalikan hasilnya 30.",
      explanation: "1 &times; <strong>30</strong> = 30; 2 &times; <strong>15</strong> = 30; <strong>5</strong> &times; 6 = 30. Jadi jawabannya <strong>5, 15, dan 30</strong>."
    },
    {
      id: 24,
      chapter: 5,
      type: "pg",
      typeLabel: "PG Tunggal",
      prompt: "Hitunglah: <strong>45 hm &minus; 20 dam = ... m</strong>",
      options: [
        { key: "a", html: "25" },
        { key: "b", html: "250" },
        { key: "c", html: "4.000" },
        { key: "d", html: "4.300" }
      ],
      answer: "d",
      hint: "Ubah semua satuan ke meter (m) terlebih dahulu. Dari hm ke m turun 2 tangga (&times;100), dari dam ke m turun 1 tangga (&times;10).",
      showUnitLadder: ["hm", "dam", "m"],
      explanation: "45 hm = 4.500 m; 20 dam = 200 m. Hasilnya = 4.500 &minus; 200 = <strong>4.300 m</strong>."
    },
    {
      id: 25,
      chapter: 5,
      type: "pg",
      typeLabel: "PG Tunggal",
      prompt: "Sebuah jalan raya sepanjang <strong>40 dam</strong> akan ditanami bunga-bunga. Panjang jalan yang telah selesai ditanami bunga adalah <strong>1.500 dm</strong>. Sisa jalan yang belum ditanami bunga dalam meter adalah....",
      options: [
        { key: "a", html: "250" },
        { key: "b", html: "350" },
        { key: "c", html: "1.000" },
        { key: "d", html: "1.550" }
      ],
      answer: "a",
      hint: "Ubah 40 dam ke meter (turun 1 tangga, &times;10) dan 1.500 dm ke meter (naik 1 tangga, :10).",
      showUnitLadder: ["dam", "m", "dm"],
      explanation: "40 dam = 400 m; 1.500 dm = 150 m. Sisa jalan = 400 m &minus; 150 m = <strong>250 m</strong>."
    }
  ];

  // Normalizer helpers
  function normalizeNumberDot(raw) {
    const cleaned = String(raw || "").trim().replace(/\s+/g, "");
    const digitsOnly = cleaned.replace(/\./g, "");
    if (/^\d+$/.test(digitsOnly)) {
      return Number(digitsOnly).toLocaleString("id-ID");
    }
    return cleaned;
  }

  function normalizePlainInt(raw) {
    return String(raw || "").trim().replace(/\s+/g, "").replace(/\./g, "");
  }

  function normalizeRupiah(raw) {
    let s = String(raw || "").trim().toLowerCase().replace(/\s+/g, "");
    s = s.replace(/,00$/, "");
    if (s.startsWith("rp")) {
      const num = s.slice(2).replace(/\./g, "");
      if (/^\d+$/.test(num)) {
        return "rp" + Number(num).toLocaleString("id-ID");
      }
      return s;
    }
    return s;
  }

  function renderUnitLadder(highlightUnits = []) {
    const units = ["km", "hm", "dam", "m", "dm", "cm", "mm"];
    const rows = units
      .map((u, idx) => {
        const isHi = highlightUnits.includes(u);
        return `
          <div class="ladder-row" style="padding-left: ${idx * 18}px;">
            <span class="ladder-box ${isHi ? "highlight" : ""}">${u}</span>
            ${idx < units.length - 1 ? '<span class="ladder-note">&darr; &times;10</span>' : ""}
          </div>
        `;
      })
      .join("");

    return `
      <div class="ladder-visual">
        <div class="ladder-title">Tangga Satuan Panjang</div>
        <div class="ladder-steps">${rows}</div>
        <div class="ladder-rules">
          <span>Turun 1 tangga: &times; 10</span>
          <span>Naik 1 tangga: : 10</span>
        </div>
      </div>
    `;
  }

  const STORAGE_KEY = "math4_asas_state_v1";

  function loadPersistedState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function persistState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          unlockedMaxChapter: state.unlockedMaxChapter,
          answers: state.answers,
          checked: state.checked,
          scratchpads: state.scratchpads
        })
      );
    } catch {
      // Abaikan jika localStorage penuh atau tidak tersedia
    }
  }

  const savedPersist = loadPersistedState();

  // Application State
  const state = {
    view: "home", // "home" | "chapters" | "quiz" | "report"
    currentChapter: 1,
    currentQId: 1,
    unlockedMaxChapter: savedPersist?.unlockedMaxChapter || 1,
    answers: savedPersist?.answers || {},
    checked: savedPersist?.checked || {},
    hintsOpen: {},
    scratchpads: savedPersist?.scratchpads || {} // { [qId]: dataURL }
  };

  // DOM Elements
  const chapterPillsEl = document.getElementById("chapter-pills");
  const headerScoreChip = document.getElementById("header-score-chip");
  const btnHome = document.getElementById("btn-home");
  const btnChapters = document.getElementById("btn-chapters");
  const btnReport = document.getElementById("btn-report");

  const viewHome = document.getElementById("view-home");
  const viewChapters = document.getElementById("view-chapters");
  const viewQuiz = document.getElementById("view-quiz");
  const viewReport = document.getElementById("view-report");

  const chapterListEl = document.getElementById("chapter-list");
  const unlockedCountText = document.getElementById("unlocked-count-text");
  const btnGoReportHome = document.getElementById("btn-go-report-home");

  const quizChapterTag = document.getElementById("quiz-chapter-tag");
  const quizChapterTitle = document.getElementById("quiz-chapter-title");
  const questionDots = document.getElementById("question-dots");
  const questionNumber = document.getElementById("question-number");
  const questionTypeBadge = document.getElementById("question-type-badge");
  const questionBody = document.getElementById("question-body");
  const questionVisual = document.getElementById("question-visual");
  const answerArea = document.getElementById("answer-area");
  const btnHint = document.getElementById("btn-hint");
  const btnCheck = document.getElementById("btn-check");
  const hintBox = document.getElementById("hint-box");
  const hintContent = document.getElementById("hint-content");
  const hintVisual = document.getElementById("hint-visual");
  const explanationBox = document.getElementById("explanation-box");
  const resultBanner = document.getElementById("result-banner");
  const explanationContent = document.getElementById("explanation-content");

  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const btnBackChapters = document.getElementById("btn-back-chapters");

  const reportSummaryCard = document.getElementById("report-summary-card");
  const reportChapterList = document.getElementById("report-chapter-list");
  const btnRetryWrong = document.getElementById("btn-retry-wrong");
  const btnReportChapters = document.getElementById("btn-report-chapters");
  const btnResetAll = document.getElementById("btn-reset-all");

  // Helpers
  function getQuestionsForChapter(chapterId) {
    return QUESTIONS.filter((q) => q.chapter === chapterId);
  }

  function getQuestionById(qId) {
    return QUESTIONS.find((q) => q.id === qId);
  }

  function getChapterStats(chapterId) {
    const qs = getQuestionsForChapter(chapterId);
    let checkedCount = 0;
    let correctCount = 0;
    let wrongCount = 0;
    qs.forEach((q) => {
      const res = state.checked[q.id];
      if (res) {
        checkedCount++;
        if (res.isCorrect) correctCount++;
        else wrongCount++;
      }
    });
    return { total: qs.length, checkedCount, correctCount, wrongCount };
  }

  function getTotalScore() {
    let correct = 0;
    let checked = 0;
    QUESTIONS.forEach((q) => {
      if (state.checked[q.id]) {
        checked++;
        if (state.checked[q.id].isCorrect) correct++;
      }
    });
    return { correct, checked, total: QUESTIONS.length };
  }

  function updateUnlockProgress() {
    // Hitung bab tertinggi yang terbuka secara berurutan (1 -> 2 -> 3 -> 4 -> 5)
    let unlocked = 1;
    for (let ch = 1; ch < CHAPTERS.length; ch++) {
      const stats = getChapterStats(ch);
      if (stats.checkedCount === stats.total) {
        unlocked = ch + 1;
      } else {
        break;
      }
    }
    if (unlocked > state.unlockedMaxChapter) {
      state.unlockedMaxChapter = unlocked;
    }
  }

  function isChapterUnlocked(chapterId) {
    return chapterId <= state.unlockedMaxChapter;
  }

  const workspaceEl = document.getElementById("workspace");
  const mobilePaneSwitch = document.getElementById("mobile-pane-switch");
  const scratchpadTitleEl = document.getElementById("scratchpad-title");

  let activeScratchQId = null;
  let hasDrawnOnCanvas = false;
  const scratchHistory = {}; // { [qId]: string[] }

  // Navigation
  function setView(viewName, chapterId = null, qId = null) {
    // Simpan coret-coretan soal yang sedang aktif sebelum berpindah halaman/soal
    if (state.view === "quiz" && activeScratchQId !== null) {
      saveCurrentScratchpad();
    }

    state.view = viewName;
    if (chapterId !== null) state.currentChapter = chapterId;
    if (qId !== null) state.currentQId = qId;

    const showScratchpad = viewName === "quiz";
    workspaceEl.classList.toggle("no-scratchpad", !showScratchpad);
    mobilePaneSwitch.classList.toggle("hidden", !showScratchpad);
    if (!showScratchpad) {
      workspaceEl.classList.remove("mobile-show-scratch");
      document.querySelectorAll(".mobile-tab").forEach((t) => {
        t.classList.toggle("active", t.dataset.pane === "quiz");
      });
    }

    viewHome.classList.toggle("hidden", viewName !== "home");
    viewChapters.classList.toggle("hidden", viewName !== "chapters");
    viewQuiz.classList.toggle("hidden", viewName !== "quiz");
    viewReport.classList.toggle("hidden", viewName !== "report");

    renderTopNav();
    if (viewName === "home") renderHome();
    else if (viewName === "chapters") renderChapters();
    else if (viewName === "quiz") {
      renderQuiz();
      requestAnimationFrame(() => loadScratchpadForQuestion(state.currentQId));
    } else if (viewName === "report") renderReport();

    document.getElementById("left-panel").scrollTop = 0;
  }

  function openChapter(chapterId, targetQId = null) {
    if (!isChapterUnlocked(chapterId)) {
      alert(`Selesaikan semua soal di Bab ${chapterId - 1} terlebih dahulu untuk membuka Bab ${chapterId}.`);
      return;
    }
    const qs = getQuestionsForChapter(chapterId);
    const firstQ = targetQId ? getQuestionById(targetQId) : qs[0];
    setView("quiz", chapterId, firstQ.id);
  }

  // Render Top Navigation
  function renderTopNav() {
    const { correct, checked, total } = getTotalScore();
    headerScoreChip.textContent = `${correct}/${total}`;

    const homeScoreEl = document.getElementById("home-total-score");
    if (homeScoreEl) homeScoreEl.textContent = String(correct);
    if (btnGoReportHome) btnGoReportHome.classList.toggle("hidden", checked === 0);

    btnHome.classList.toggle("active", state.view === "home");
    btnChapters.classList.toggle("active", state.view === "chapters");
    btnReport.classList.toggle("active", state.view === "report");

    chapterPillsEl.innerHTML = CHAPTERS.map((ch) => {
      const stats = getChapterStats(ch.id);
      const unlocked = isChapterUnlocked(ch.id);
      const isActive = state.view === "quiz" && state.currentChapter === ch.id;

      let statusCls = "";
      if (!unlocked) {
        statusCls = "locked";
      } else if (stats.checkedCount === stats.total && stats.correctCount === stats.total) {
        statusCls = "chapter-done";
      } else if (stats.checkedCount > 0 && stats.correctCount < stats.checkedCount) {
        statusCls = "chapter-needs-work";
      }

      return `
        <button type="button" class="nav-pill ${isActive ? "active" : ""} ${statusCls}" data-chapter="${ch.id}" ${!unlocked ? "disabled" : ""} title="${unlocked ? ch.title : "Terkunci: selesaikan Bab " + (ch.id - 1) + " dulu"}">
          ${!unlocked ? "&#128274; " : ""}${ch.shortTitle}
        </button>
      `;
    }).join("");

    chapterPillsEl.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        openChapter(Number(btn.dataset.chapter));
      });
    });
  }

  function renderHome() {
    const { correct, checked } = getTotalScore();
    const homeScoreEl = document.getElementById("home-total-score");
    if (homeScoreEl) homeScoreEl.textContent = String(correct);
    if (btnGoReportHome) btnGoReportHome.classList.toggle("hidden", checked === 0);
  }

  // Render Pilihan Bab (Bab 1 -> Bab 5, Sequential Unlock)
  function renderChapters() {
    unlockedCountText.textContent = String(state.unlockedMaxChapter);

    chapterListEl.innerHTML = CHAPTERS.map((ch) => {
      const qs = getQuestionsForChapter(ch.id);
      const stats = getChapterStats(ch.id);
      const unlocked = isChapterUnlocked(ch.id);

      let badgeText = "Siap Dikerjakan";
      let badgeCls = "";
      if (!unlocked) {
        badgeText = "Terkunci";
      } else if (stats.checkedCount === stats.total && stats.correctCount === stats.total) {
        badgeText = `Tuntas &#9733; (${stats.correctCount}/5)`;
        badgeCls = "status-perfect";
      } else if (stats.checkedCount === stats.total) {
        badgeText = `Selesai (${stats.correctCount}/5)`;
        badgeCls = stats.wrongCount > 0 ? "status-error" : "status-perfect";
      } else if (stats.checkedCount > 0) {
        badgeText = `Progres ${stats.checkedCount}/5`;
        badgeCls = "status-progress";
      }

      const dotsHtml = qs
        .map((q) => {
          const res = state.checked[q.id];
          const cls = res ? (res.isCorrect ? "correct" : "wrong") : "";
          return `<span class="mini-dot ${cls}" title="Soal ${q.id}"></span>`;
        })
        .join("");

      const actionHtml = unlocked
        ? `<button type="button" class="btn ${stats.checkedCount === 0 ? "btn-primary" : "btn-outline"} open-chapter-btn" data-chapter="${ch.id}">
            ${stats.checkedCount > 0 ? "Buka " + ch.shortTitle : "Mulai " + ch.shortTitle + " &rarr;"}
          </button>`
        : `<span class="chapter-lock-note">&#128274; Selesaikan Bab ${ch.id - 1} dulu</span>`;

      return `
        <div class="chapter-card ${unlocked ? "" : "is-locked"}">
          <div class="chapter-card-left">
            <span class="chapter-icon-badge" aria-hidden="true">${unlocked ? ch.icon : "&#128274;"}</span>
            <div class="chapter-info">
              <div class="pos-card-top">
                <span class="pos-number">Bab ${ch.id} &bull; 5 Soal</span>
                <span class="pos-status-badge ${badgeCls}">${badgeText}</span>
              </div>
              <h3>${ch.title}</h3>
              <p>${ch.subtitle}</p>
              <div class="pos-mini-dots">${dotsHtml}</div>
            </div>
          </div>
          <div class="chapter-card-right">
            ${actionHtml}
          </div>
        </div>
      `;
    }).join("");

    chapterListEl.querySelectorAll(".open-chapter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        openChapter(Number(btn.dataset.chapter));
      });
    });
  }

  // Render Quiz View
  function renderQuiz() {
    const ch = CHAPTERS.find((c) => c.id === state.currentChapter);
    const chQuestions = getQuestionsForChapter(state.currentChapter);
    const q = getQuestionById(state.currentQId);
    const checkedState = state.checked[q.id] || null;
    const chStats = getChapterStats(state.currentChapter);

    quizChapterTag.textContent = ch.shortTitle;
    quizChapterTitle.textContent = ch.title;

    questionDots.innerHTML = chQuestions
      .map((cq, idx) => {
        const res = state.checked[cq.id];
        const cls = [
          "q-dot",
          cq.id === q.id ? "current" : "",
          res ? (res.isCorrect ? "correct" : "wrong") : ""
        ]
          .filter(Boolean)
          .join(" ");
        return `<button type="button" class="${cls}" data-qid="${cq.id}" title="Soal ${cq.id}">${idx + 1}</button>`;
      })
      .join("");

    questionDots.querySelectorAll(".q-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        setView("quiz", state.currentChapter, Number(dot.dataset.qid));
      });
    });

    questionNumber.textContent = `Soal ${q.id} dari ${QUESTIONS.length}`;
    questionTypeBadge.textContent = q.typeLabel;
    questionBody.innerHTML = q.prompt;

    if (q.visualHtml) {
      questionVisual.innerHTML = q.visualHtml;
      questionVisual.classList.remove("hidden");
    } else {
      questionVisual.innerHTML = "";
      questionVisual.classList.add("hidden");
    }

    renderAnswerControls(q, checkedState);

    // Hint box
    const isHintOpen = Boolean(state.hintsOpen[q.id]);
    hintBox.classList.toggle("hidden", !isHintOpen);
    hintContent.innerHTML = q.hint;
    if (q.showUnitLadder) {
      hintVisual.innerHTML = renderUnitLadder(q.showUnitLadder);
      hintVisual.classList.remove("hidden");
    } else {
      hintVisual.innerHTML = "";
      hintVisual.classList.add("hidden");
    }
    btnHint.innerHTML = `<span class="btn-icon" aria-hidden="true">&#128161;</span> ${isHintOpen ? "Tutup Petunjuk" : "Petunjuk"}`;

    // Explanation box
    if (checkedState) {
      explanationBox.classList.remove("hidden");
      resultBanner.className = `result-banner ${checkedState.isCorrect ? "is-correct" : "is-wrong"}`;
      resultBanner.textContent = checkedState.isCorrect
        ? "Hebat! Jawaban kamu sudah benar!"
        : "Hampir tepat! Yuk pelajari langkahnya di bawah bareng guru.";
      explanationContent.innerHTML = q.explanation;
    } else {
      explanationBox.classList.add("hidden");
    }

    // Footer navigation buttons
    const isLastInChapter = q.id === chQuestions[chQuestions.length - 1].id;
    btnPrev.disabled = q.id === 1;
    if (q.id === QUESTIONS.length) {
      btnNext.textContent = "Lihat Rapor Diagnostik →";
    } else if (isLastInChapter) {
      btnNext.textContent =
        chStats.checkedCount === chStats.total
          ? `Lanjut ke Bab ${state.currentChapter + 1} →`
          : `Selesaikan Bab ${state.currentChapter} →`;
    } else {
      btnNext.textContent = "Soal Berikutnya →";
    }
  }

  function renderAnswerControls(q, checkedState) {
    const saved = state.answers[q.id];
    answerArea.innerHTML = "";

    if (q.type === "pg") {
      q.options.forEach((opt) => {
        const isSelected = saved === opt.key;
        let stateCls = "";
        if (checkedState) {
          if (opt.key === q.answer) stateCls = "state-correct";
          else if (isSelected && opt.key !== q.answer) stateCls = "state-wrong";
        }
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `option-btn ${isSelected ? "selected" : ""} ${stateCls}`;
        btn.innerHTML = `<span class="option-key">${opt.key}</span><span>${opt.html}</span>`;
        btn.addEventListener("click", () => {
          state.answers[q.id] = opt.key;
          delete state.checked[q.id];
          renderQuiz();
        });
        answerArea.appendChild(btn);
      });
    } else if (q.type === "pg_multi") {
      const selectedList = Array.isArray(saved) ? saved : [];
      const note = document.createElement("div");
      note.className = "helper-note";
      note.textContent = `Ceklis ${q.requiredCount} jawaban yang menurutmu paling tepat.`;
      answerArea.appendChild(note);

      q.options.forEach((opt) => {
        const isSelected = selectedList.includes(opt.key);
        let stateCls = "";
        if (checkedState) {
          const isKey = q.answer.includes(opt.key);
          if (isKey && isSelected) stateCls = "state-correct";
          else if (!isKey && isSelected) stateCls = "state-wrong";
          else if (isKey && !isSelected) stateCls = "state-correct";
        }
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `option-btn ${isSelected ? "selected" : ""} ${stateCls}`;
        btn.innerHTML = `<span class="option-check">${isSelected ? "&#10003;" : ""}</span><span class="option-key">${opt.key}</span><span>${opt.html}</span>`;
        btn.addEventListener("click", () => {
          const current = Array.isArray(state.answers[q.id]) ? [...state.answers[q.id]] : [];
          const idx = current.indexOf(opt.key);
          if (idx >= 0) current.splice(idx, 1);
          else current.push(opt.key);
          state.answers[q.id] = current;
          delete state.checked[q.id];
          renderQuiz();
        });
        answerArea.appendChild(btn);
      });
    } else if (q.type === "tf") {
      const savedMap = saved && typeof saved === "object" ? saved : {};
      q.statements.forEach((st, idx) => {
        const chosen = savedMap[st.id] || "";
        let rowCls = "";
        if (checkedState) {
          rowCls = chosen === st.answer ? "row-correct" : "row-wrong";
        }
        const row = document.createElement("div");
        row.className = `statement-row ${rowCls}`;
        row.innerHTML = `
          <div><strong>${idx + 1}.</strong> ${st.text}</div>
          <div class="tf-buttons">
            <button type="button" class="tf-btn ${chosen === "Benar" ? "selected" : ""}" data-val="Benar">Benar</button>
            <button type="button" class="tf-btn ${chosen === "Salah" ? "selected" : ""}" data-val="Salah">Salah</button>
          </div>
        `;
        row.querySelectorAll(".tf-btn").forEach((b) => {
          b.addEventListener("click", () => {
            const nextMap = { ...(state.answers[q.id] || {}), [st.id]: b.dataset.val };
            state.answers[q.id] = nextMap;
            delete state.checked[q.id];
            renderQuiz();
          });
        });
        answerArea.appendChild(row);
      });
    } else if (q.type === "short") {
      const val = typeof saved === "string" ? saved : "";
      let inputCls = "";
      if (checkedState) {
        inputCls = checkedState.isCorrect ? "input-correct" : "input-wrong";
      }
      const wrap = document.createElement("div");
      wrap.className = "text-input-wrap";
      const input = document.createElement("input");
      input.type = "text";
      input.className = `text-input ${inputCls}`;
      input.placeholder = q.placeholder || "Ketik jawabanmu...";
      input.value = val;
      input.addEventListener("input", (e) => {
        state.answers[q.id] = e.target.value;
        if (state.checked[q.id]) {
          delete state.checked[q.id];
          explanationBox.classList.add("hidden");
          input.classList.remove("input-correct", "input-wrong");
          renderTopNav();
        }
      });
      wrap.appendChild(input);
      answerArea.appendChild(wrap);
    } else if (q.type === "multi") {
      const savedMap = saved && typeof saved === "object" ? saved : {};
      q.fields.forEach((field) => {
        const val = savedMap[field.id] || "";
        const fieldStatus = checkedState && checkedState.details ? checkedState.details[field.id] : null;
        const rowCls = fieldStatus === true ? "row-correct" : fieldStatus === false ? "row-wrong" : "";
        const row = document.createElement("div");
        row.className = `multi-input-row ${rowCls}`;
        row.innerHTML = `
          <span>${field.label}</span>
          <div class="text-input-wrap">
            ${field.prefix ? `<strong>${field.prefix}</strong>` : ""}
            <input type="text" class="text-input compact-input" placeholder="${field.placeholder}" value="${escapeAttr(val)}" />
          </div>
        `;
        const inp = row.querySelector("input");
        inp.addEventListener("input", (e) => {
          const nextMap = { ...(state.answers[q.id] || {}), [field.id]: e.target.value };
          state.answers[q.id] = nextMap;
          if (state.checked[q.id]) {
            delete state.checked[q.id];
            row.classList.remove("row-correct", "row-wrong");
            explanationBox.classList.add("hidden");
            renderTopNav();
          }
        });
        answerArea.appendChild(row);
      });
    } else if (q.type === "match") {
      const savedMap = saved && typeof saved === "object" ? saved : {};
      q.rows.forEach((r) => {
        const val = savedMap[r.id] || "";
        const rowStatus = checkedState && checkedState.details ? checkedState.details[r.id] : null;
        const rowCls = rowStatus === true ? "row-correct" : rowStatus === false ? "row-wrong" : "";
        const row = document.createElement("div");
        row.className = `match-row ${rowCls}`;
        const optionsHtml = [`<option value="">-- Pilih Gunung --</option>`]
          .concat(q.choices.map((c) => `<option value="${c}" ${val === c ? "selected" : ""}>${c}</option>`))
          .join("");
        row.innerHTML = `
          <span>${r.label}</span>
          <select class="select-input">${optionsHtml}</select>
        `;
        row.querySelector("select").addEventListener("change", (e) => {
          const nextMap = { ...(state.answers[q.id] || {}), [r.id]: e.target.value };
          state.answers[q.id] = nextMap;
          delete state.checked[q.id];
          renderQuiz();
        });
        answerArea.appendChild(row);
      });
    } else if (q.type === "compare") {
      const savedMap = saved && typeof saved === "object" ? saved : {};
      q.items.forEach((item, idx) => {
        const val = savedMap[item.id] || "";
        const rowStatus = checkedState && checkedState.details ? checkedState.details[item.id] : null;
        const rowCls = rowStatus === true ? "row-correct" : rowStatus === false ? "row-wrong" : "";
        const row = document.createElement("div");
        row.className = `compare-row ${rowCls}`;
        row.innerHTML = `
          <strong>${idx + 1}.</strong>
          <div class="compare-expr">
            ${frac(item.left[0], item.left[1], "frac-lg")}
            <select class="select-input compare-select" aria-label="Tanda pembanding nomor ${idx + 1}">
              <option value="">...</option>
              <option value="<" ${val === "<" ? "selected" : ""}>&lt;</option>
              <option value="=" ${val === "=" ? "selected" : ""}>=</option>
              <option value=">" ${val === ">" ? "selected" : ""}>&gt;</option>
            </select>
            ${frac(item.right[0], item.right[1], "frac-lg")}
          </div>
          ${rowStatus === true ? '<span class="row-badge ok">Benar</span>' : rowStatus === false ? `<span class="row-badge no">Kunci: ${item.answer}</span>` : ""}
        `;
        row.querySelector("select").addEventListener("change", (e) => {
          const nextMap = { ...(state.answers[q.id] || {}), [item.id]: e.target.value };
          state.answers[q.id] = nextMap;
          delete state.checked[q.id];
          renderQuiz();
        });
        answerArea.appendChild(row);
      });
    } else if (q.type === "frac_fill") {
      const savedMap = saved && typeof saved === "object" ? saved : {};
      q.items.forEach((item, idx) => {
        const val = savedMap[item.id] || "";
        const rowStatus = checkedState && checkedState.details ? checkedState.details[item.id] : null;
        const rowCls = rowStatus === true ? "row-correct" : rowStatus === false ? "row-wrong" : "";
        const inpCls = rowStatus === true ? "input-correct" : rowStatus === false ? "input-wrong" : "";

        const makeSlotFrac = (num, den) => {
          const numHtml = num === null
            ? `<input type="text" inputmode="numeric" class="frac-input-field ${inpCls}" value="${escapeAttr(val)}" placeholder="?" aria-label="Pembilang nomor ${idx + 1}" />`
            : num;
          const denHtml = den === null
            ? `<input type="text" inputmode="numeric" class="frac-input-field ${inpCls}" value="${escapeAttr(val)}" placeholder="?" aria-label="Penyebut nomor ${idx + 1}" />`
            : den;
          return `<span class="frac frac-lg"><span class="frac-num">${numHtml}</span><span class="frac-den">${denHtml}</span></span>`;
        };

        const row = document.createElement("div");
        row.className = `frac-fill-row ${rowCls}`;
        row.innerHTML = `
          <strong>${idx + 1}.</strong>
          ${makeSlotFrac(item.leftNum, item.leftDen)}
          <span class="frac-eq-sign">=</span>
          ${makeSlotFrac(item.rightNum, item.rightDen)}
          ${rowStatus === true ? '<span class="row-badge ok">Benar</span>' : rowStatus === false ? `<span class="row-badge no">Kunci: ${item.answer}</span>` : ""}
        `;
        const inp = row.querySelector("input");
        inp.addEventListener("input", (e) => {
          const nextMap = { ...(state.answers[q.id] || {}), [item.id]: e.target.value };
          state.answers[q.id] = nextMap;
          if (state.checked[q.id]) {
            delete state.checked[q.id];
            row.classList.remove("row-correct", "row-wrong");
            inp.classList.remove("input-correct", "input-wrong");
            const badge = row.querySelector(".row-badge");
            if (badge) badge.remove();
            explanationBox.classList.add("hidden");
            renderTopNav();
          }
        });
        answerArea.appendChild(row);
      });
    }
  }

  function escapeAttr(str) {
    return String(str).replace(/"/g, "&quot;");
  }

  // Evaluate Current Question
  function checkCurrentQuestion() {
    const q = getQuestionById(state.currentQId);
    const ans = state.answers[q.id];
    let isCorrect = false;
    let details = null;

    if (q.type === "pg") {
      if (!ans) {
        alert("Pilih salah satu jawaban terlebih dahulu ya.");
        return;
      }
      isCorrect = ans === q.answer;
    } else if (q.type === "pg_multi") {
      const list = Array.isArray(ans) ? [...ans].sort() : [];
      if (list.length === 0) {
        alert(`Pilih ${q.requiredCount} jawaban terlebih dahulu ya.`);
        return;
      }
      const target = [...q.answer].sort();
      isCorrect = list.length === target.length && list.every((v, i) => v === target[i]);
    } else if (q.type === "tf") {
      const map = ans || {};
      const allFilled = q.statements.every((st) => map[st.id] === "Benar" || map[st.id] === "Salah");
      if (!allFilled) {
        alert("Tentukan Benar atau Salah untuk semua pernyataan dulu ya.");
        return;
      }
      isCorrect = q.statements.every((st) => map[st.id] === st.answer);
    } else if (q.type === "short") {
      if (!ans || !String(ans).trim()) {
        alert("Isi jawabanmu terlebih dahulu ya.");
        return;
      }
      isCorrect = q.validator(ans);
    } else if (q.type === "multi") {
      const map = ans || {};
      const allFilled = q.fields.every((f) => String(map[f.id] || "").trim() !== "");
      if (!allFilled) {
        alert("Lengkapi semua kolom isian terlebih dahulu ya.");
        return;
      }
      details = {};
      isCorrect = true;
      q.fields.forEach((f) => {
        const userRaw = String(map[f.id] || "").trim();
        let ok = false;
        if (f.type === "money") {
          const cleanUser = userRaw.toLowerCase().replace(/^rp\s*/i, "");
          ok = normalizeNumberDot(cleanUser) === f.answer;
        } else {
          ok = userRaw.toLowerCase() === f.answer.toLowerCase();
        }
        details[f.id] = ok;
        if (!ok) isCorrect = false;
      });
    } else if (q.type === "match") {
      const map = ans || {};
      const allFilled = q.rows.every((r) => Boolean(map[r.id]));
      if (!allFilled) {
        alert("Pasangkan semua keterangan gunung terlebih dahulu ya.");
        return;
      }
      details = {};
      isCorrect = true;
      q.rows.forEach((r) => {
        const ok = map[r.id] === r.answer;
        details[r.id] = ok;
        if (!ok) isCorrect = false;
      });
    } else if (q.type === "compare") {
      const map = ans || {};
      const allFilled = q.items.every((it) => Boolean(map[it.id]));
      if (!allFilled) {
        alert("Pilih tanda perbandingan untuk ketiga baris terlebih dahulu ya.");
        return;
      }
      details = {};
      isCorrect = true;
      q.items.forEach((it) => {
        const ok = map[it.id] === it.answer;
        details[it.id] = ok;
        if (!ok) isCorrect = false;
      });
    } else if (q.type === "frac_fill") {
      const map = ans || {};
      const allFilled = q.items.every((it) => String(map[it.id] || "").trim() !== "");
      if (!allFilled) {
        alert("Isi semua kotak pecahan yang kosong terlebih dahulu ya.");
        return;
      }
      details = {};
      isCorrect = true;
      q.items.forEach((it) => {
        const ok = normalizePlainInt(map[it.id]) === it.answer;
        details[it.id] = ok;
        if (!ok) isCorrect = false;
      });
    }

    state.checked[q.id] = { isCorrect, details };
    updateUnlockProgress();
    persistState();
    renderTopNav();
    renderQuiz();
  }

  // Render Diagnostic Report
  function renderReport() {
    const { correct, checked, total } = getTotalScore();
    const pct = Math.round((correct / total) * 100);

    let summaryText = "Ayo mulai kerjakan soal di tiap bab untuk melihat hasil diagnostik.";
    if (checked > 0 && correct === total) {
      summaryText = "Luar biasa! Semua 25 soal sudah benar. Siswa siap menghadapi ASAS Matematika.";
    } else if (checked > 0) {
      summaryText = `Sudah diperiksa ${checked} dari ${total} soal. Bab bertanda kuning/merah disarankan untuk diulang bersama guru.`;
    }

    reportSummaryCard.innerHTML = `
      <div class="report-top">
        <div>
          <span class="eyebrow">Rapor Diagnostik Akhir</span>
          <h2 style="margin:0 0 4px;">Ringkasan Skor Per Bab</h2>
          <p style="margin:0; color: var(--text-muted); font-size:0.92rem;">${summaryText}</p>
        </div>
        <div class="report-big-score">
          <span class="score-number">${correct}</span>
          <span class="score-total">/ ${total} (${pct}%)</span>
        </div>
      </div>
      <div class="report-progress-bar">
        <div class="report-progress-fill" style="width: ${pct}%;"></div>
      </div>
    `;

    let hasWrongOrUnfinishedChapter = false;

    reportChapterList.innerHTML = CHAPTERS.map((ch) => {
      const qs = getQuestionsForChapter(ch.id);
      const stats = getChapterStats(ch.id);
      const unlocked = isChapterUnlocked(ch.id);

      let scoreCls = "warn";
      let statusLabel = unlocked ? "Perlu Penguatan" : "Belum Dibuka";
      if (stats.checkedCount === stats.total && stats.correctCount === stats.total) {
        scoreCls = "perfect";
        statusLabel = "Tuntas";
      } else if (stats.wrongCount > 0 || stats.checkedCount < stats.total) {
        hasWrongOrUnfinishedChapter = true;
        if (stats.wrongCount >= 2 || (stats.checkedCount === stats.total && stats.correctCount <= 3)) {
          scoreCls = "need-repeat";
          statusLabel = "Perlu Diulang";
        }
      }

      const chipsHtml = qs
        .map((q) => {
          const res = state.checked[q.id];
          const cls = res ? (res.isCorrect ? "ok" : "err") : "";
          const mark = res ? (res.isCorrect ? "&#10003;" : "&#10007;") : "&bull;";
          return `<button type="button" class="report-q-chip ${cls}" data-chapter="${ch.id}" data-qid="${q.id}" ${!unlocked ? "disabled" : ""}>No. ${q.id} ${mark}</button>`;
        })
        .join("");

      return `
        <div class="report-pos-item">
          <div class="report-pos-head">
            <div class="report-pos-title">Bab ${ch.id}: ${ch.title}</div>
            <span class="report-pos-score ${scoreCls}">
              ${stats.correctCount}/${stats.total} &bull; ${statusLabel}
            </span>
          </div>
          <div class="report-q-chips">${chipsHtml}</div>
        </div>
      `;
    }).join("");

    reportChapterList.querySelectorAll(".report-q-chip:not(:disabled)").forEach((chip) => {
      chip.addEventListener("click", () => {
        openChapter(Number(chip.dataset.chapter), Number(chip.dataset.qid));
      });
    });

    btnRetryWrong.disabled = !hasWrongOrUnfinishedChapter;
  }

  function retryWrongChapters() {
    const targetChapters = CHAPTERS.filter((ch) => {
      if (!isChapterUnlocked(ch.id)) return false;
      const stats = getChapterStats(ch.id);
      return stats.correctCount < stats.total;
    });

    if (targetChapters.length === 0) {
      alert("Semua bab yang sudah terbuka mendapat nilai sempurna 5/5!");
      return;
    }

    let firstWrongQId = null;
    let firstTargetChapter = targetChapters[0].id;

    targetChapters.forEach((ch) => {
      const qs = getQuestionsForChapter(ch.id);
      qs.forEach((q) => {
        const res = state.checked[q.id];
        if (!res || !res.isCorrect) {
          if (firstWrongQId === null) {
            firstWrongQId = q.id;
            firstTargetChapter = ch.id;
          }
          delete state.answers[q.id];
          delete state.checked[q.id];
          delete state.hintsOpen[q.id];
        }
      });
    });

    persistState();
    openChapter(firstTargetChapter, firstWrongQId);
  }

  // Event Listeners
  btnHome.addEventListener("click", () => setView("home"));
  btnChapters.addEventListener("click", () => setView("chapters"));
  btnReport.addEventListener("click", () => setView("report"));

  document.getElementById("btn-start-app").addEventListener("click", () => setView("chapters"));
  btnGoReportHome.addEventListener("click", () => setView("report"));
  btnBackChapters.addEventListener("click", () => setView("chapters"));
  btnReportChapters.addEventListener("click", () => setView("chapters"));
  btnRetryWrong.addEventListener("click", retryWrongChapters);

  btnResetAll.addEventListener("click", () => {
    if (!confirm("Reset semua jawaban dan coretan lalu mulai ulang dari Bab 1?")) return;
    state.answers = {};
    state.checked = {};
    state.hintsOpen = {};
    state.unlockedMaxChapter = 1;
    state.scratchpads = {};
    Object.keys(scratchHistory).forEach((k) => delete scratchHistory[k]);
    activeScratchQId = null;
    persistState();
    setView("home");
  });

  btnHint.addEventListener("click", () => {
    const qId = state.currentQId;
    state.hintsOpen[qId] = !state.hintsOpen[qId];
    renderQuiz();
  });

  btnCheck.addEventListener("click", checkCurrentQuestion);

  btnPrev.addEventListener("click", () => {
    if (state.currentQId <= 1) return;
    const prevQ = getQuestionById(state.currentQId - 1);
    if (!isChapterUnlocked(prevQ.chapter)) return;
    setView("quiz", prevQ.chapter, prevQ.id);
  });

  btnNext.addEventListener("click", () => {
    const currentQ = getQuestionById(state.currentQId);
    const chQuestions = getQuestionsForChapter(state.currentChapter);
    const isLastInChapter = currentQ.id === chQuestions[chQuestions.length - 1].id;

    if (state.currentQId >= QUESTIONS.length) {
      setView("report");
      return;
    }

    if (isLastInChapter) {
      const stats = getChapterStats(state.currentChapter);
      if (stats.checkedCount < stats.total) {
        const firstUnchecked = chQuestions.find((q) => !state.checked[q.id]);
        alert(`Yuk cek jawaban semua 5 soal di Bab ${state.currentChapter} dulu agar Bab ${state.currentChapter + 1} terbuka!`);
        if (firstUnchecked) {
          setView("quiz", state.currentChapter, firstUnchecked.id);
        }
        return;
      }
    }

    const nextQ = getQuestionById(state.currentQId + 1);
    setView("quiz", nextQ.chapter, nextQ.id);
  });

  // Mobile pane switcher
  document.querySelectorAll(".mobile-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".mobile-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const showScratch = tab.dataset.pane === "scratch";
      workspaceEl.classList.toggle("mobile-show-scratch", showScratch);
      if (showScratch) {
        requestAnimationFrame(() => loadScratchpadForQuestion(state.currentQId));
      }
    });
  });

  // =========================================================================
  // KANVAS CORET-CORETAN DIGITAL PER HALAMAN SOAL (Tersimpan Otomatis)
  // =========================================================================
  const canvasStage = document.getElementById("canvas-stage");
  const canvas = document.getElementById("scratch-canvas");
  const ctx = canvas.getContext("2d");
  const toggleGrid = document.getElementById("toggle-grid");
  const btnClearCanvas = document.getElementById("btn-clear-canvas");
  const btnUndoCanvas = document.getElementById("btn-undo-canvas");
  const toolBtns = document.querySelectorAll(".tool-btn[data-tool]");

  let currentTool = "pen";
  let currentColor = "#0F172A";
  let isDrawing = false;
  let lastPoint = null;
  const MAX_HISTORY = 25;

  function getHistoryForActive() {
    if (activeScratchQId === null) return [];
    if (!scratchHistory[activeScratchQId]) scratchHistory[activeScratchQId] = [];
    return scratchHistory[activeScratchQId];
  }

  function saveSnapshot() {
    if (canvas.width === 0 || canvas.height === 0 || activeScratchQId === null) return;
    const stack = getHistoryForActive();
    if (stack.length >= MAX_HISTORY) stack.shift();
    stack.push(canvas.toDataURL("image/png"));
  }

  function saveCurrentScratchpad() {
    if (activeScratchQId === null || canvas.width === 0 || canvas.height === 0) return;
    if (state.scratchpads[activeScratchQId] !== undefined || hasDrawnOnCanvas) {
      state.scratchpads[activeScratchQId] = canvas.toDataURL("image/png");
      persistState();
    }
  }

  function ensureCanvasSized() {
    const rect = canvasStage.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;

    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    const targetW = Math.floor(rect.width * dpr);
    const targetH = Math.floor(rect.height * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    return rect;
  }

  function loadScratchpadForQuestion(qId) {
    if (scratchpadTitleEl) {
      scratchpadTitleEl.textContent = `Papan Hitung — Soal ${qId}`;
    }
    const rect = ensureCanvasSized();
    activeScratchQId = qId;
    if (!rect) return;

    ctx.clearRect(0, 0, rect.width, rect.height);
    const savedDataUrl = state.scratchpads[qId];
    hasDrawnOnCanvas = Boolean(savedDataUrl);

    if (savedDataUrl) {
      const img = new Image();
      img.onload = () => {
        if (activeScratchQId !== qId) return;
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = savedDataUrl;
    }
  }

  function resizeCanvas() {
    if (state.view !== "quiz" || activeScratchQId === null) return;
    const rect = canvasStage.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const tempImg = canvas.width > 0 && canvas.height > 0 ? canvas.toDataURL("image/png") : null;
    ensureCanvasSized();
    if (tempImg && hasDrawnOnCanvas) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        state.scratchpads[activeScratchQId] = canvas.toDataURL("image/png");
        persistState();
      };
      img.src = tempImg;
    }
  }

  function getPoint(e) {
    const rect = canvasStage.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  canvas.addEventListener("pointerdown", (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.preventDefault();
    saveSnapshot();
    canvas.setPointerCapture(e.pointerId);
    isDrawing = true;
    hasDrawnOnCanvas = true;
    lastPoint = getPoint(e);

    ctx.save();
    if (currentTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 22;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = e.pointerType === "pen" ? 2.4 : 2.8;
    }
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(lastPoint.x + 0.01, lastPoint.y + 0.01);
    ctx.stroke();
    ctx.restore();
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const nextPoint = getPoint(e);

    ctx.save();
    if (currentTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 22;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = e.pointerType === "pen" ? 2.4 : 2.8;
    }
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(nextPoint.x, nextPoint.y);
    ctx.stroke();
    ctx.restore();

    lastPoint = nextPoint;
  });

  function stopDrawing(e) {
    if (!isDrawing) return;
    isDrawing = false;
    lastPoint = null;
    if (e && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
    saveCurrentScratchpad();
  }

  canvas.addEventListener("pointerup", stopDrawing);
  canvas.addEventListener("pointercancel", stopDrawing);

  toolBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      toolBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentTool = btn.dataset.tool;
      if (btn.dataset.color) currentColor = btn.dataset.color;
    });
  });

  toggleGrid.addEventListener("change", () => {
    canvasStage.classList.toggle("show-grid", toggleGrid.checked);
  });

  btnClearCanvas.addEventListener("click", () => {
    saveSnapshot();
    const rect = canvasStage.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    hasDrawnOnCanvas = false;
    if (activeScratchQId !== null) {
      delete state.scratchpads[activeScratchQId];
      persistState();
    }
  });

  btnUndoCanvas.addEventListener("click", () => {
    const stack = getHistoryForActive();
    if (stack.length === 0) return;
    const prevDataUrl = stack.pop();
    const rect = canvasStage.getBoundingClientRect();
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
      if (activeScratchQId !== null) {
        state.scratchpads[activeScratchQId] = canvas.toDataURL("image/png");
        hasDrawnOnCanvas = true;
        persistState();
      }
    };
    img.src = prevDataUrl;
  });

  window.addEventListener("resize", resizeCanvas);

  // Initial render
  setView("home");
})();
