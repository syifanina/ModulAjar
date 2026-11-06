/* Lesson content is in index.html. This file controls steps and both quizzes. */
'use strict';

// Each character has its own column, so decimal points and carried digits align.
function column(a, b, operation, result, carry = '', exchange = '') {
  // Pad trailing zeros so every numeric decimal point stays in the same column.
  const places = Math.max(...[a, b, result].map(value => (value.split('.')[1] || '').length));
  if (places) {
    const padDecimal = value => /^\d+(\.\d+)?$/.test(value)
      ? value.split('.')[0] + '.' + (value.split('.')[1] || '').padEnd(places, '0')
      : value;
    a = padDecimal(a); b = padDecimal(b); result = padDecimal(result);
  }
  const width = Math.max(a.length, b.length, result.length);
  const digits = value => value.padStart(width, ' ').split('');
  const replacements = exchange ? exchange.split(',') : [];
  const row = (value, sign, className = '', strike = false) =>
    `<tr class="${className}"><td>${sign}</td>${digits(value).map((digit, i) => `<td${strike && replacements[i] ? ' class="changed"' : ''}>${digit === ' ' ? '&nbsp;' : digit}</td>`).join('')}</tr>`;
  let top = '';
  if (exchange) top = `<tr class="carry"><td></td>${Array.from({ length: width }, (_, i) => `<td>${replacements[i] || ''}</td>`).join('')}</tr>`;
  else if (carry) top = row(carry, '', 'carry');
  return `<table class="column" aria-label="Vertical calculation"><tbody>${top}${row(a, '', '', true)}${row(b, operation)}${row(result, '', 'rule')}</tbody></table>`;
}

const lessonArticles = [...document.querySelectorAll('.lesson-content article')];
let lessonIndex = 0;
let stepIndex = 0;
function renderLesson() {
  const lesson = lessonArticles[lessonIndex];
  const steps = [...lesson.children];
  const step = steps[stepIndex];
  document.getElementById('lesson-number').textContent = `LESSON 0${lessonIndex + 1}`;
  document.getElementById('lesson-title').textContent = lesson.dataset.title;
  document.getElementById('lesson-intro').textContent = lesson.dataset.intro;
  document.getElementById('lesson-translation').textContent = lesson.dataset.id;
  document.getElementById('step-count').textContent = `Step ${stepIndex + 1} of ${steps.length}`;
  document.getElementById('step-text').innerHTML = step.querySelector('p').innerHTML;
  document.getElementById('step-translation').textContent = step.querySelector('small').textContent;
  const data = step.dataset;
  document.getElementById('worked-example').innerHTML = data.view === 'place'
    ? `<div class="place-grid">${['Ten-thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'].map((label, i) => `<div class="place-cell ${4 - i === Number(data.active) ? 'active' : ''}"><small>${label}</small><strong>${'46785'[i]}</strong></div>`).join('')}</div>`
    : column(data.a, data.b, data.op, data.result, data.carry, data.exchange);
  document.getElementById('previous-step').disabled = stepIndex === 0;
  document.getElementById('next-step').disabled = stepIndex === steps.length - 1;
  document.getElementById('step-dots').innerHTML = steps.map((_, i) => `<i class="${i === stepIndex ? 'current' : ''}"></i>`).join('');
}
document.querySelectorAll('[data-lesson]').forEach(button => button.addEventListener('click', () => {
  lessonIndex = Number(button.dataset.lesson);
  stepIndex = 0;
  document.querySelectorAll('[data-lesson]').forEach(item => {
    item.classList.toggle('selected', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  renderLesson();
}));
document.getElementById('previous-step').addEventListener('click', () => { if (stepIndex > 0) { stepIndex--; renderLesson(); } });
document.getElementById('next-step').addEventListener('click', () => { if (stepIndex < lessonArticles[lessonIndex].children.length - 1) { stepIndex++; renderLesson(); } });
document.querySelectorAll('[data-panel]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.panel').forEach(panel => { panel.hidden = panel.id !== button.dataset.panel; });
  document.querySelectorAll('[data-panel]').forEach(tab => {
    tab.classList.toggle('active', tab === button);
    tab.setAttribute('aria-pressed', String(tab === button));
  });
}));

// Answers are explicitly stored; solution calculations are also shown vertically.
// A calculation is [top number, bottom number, operation, result].
const wholeQuestions = [
  {
    "text": "Find the sum of 47 and 36.",
    "idText": "Tentukan jumlah 47 dan 36.",
    "a": "47",
    "b": "36",
    "op": "+",
    "answer": 83.0,
    "hint": "Sum means the total: add the two numbers. Carry 1 ten from the ones.",
    "idHint": "Sum berarti jumlah: tambahkan kedua bilangan. Simpan 1 puluhan dari satuan.",
    "explanation": "Sum means the total: add the two numbers. Carry 1 ten from the ones. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Sum berarti jumlah: tambahkan kedua bilangan. Simpan 1 puluhan dari satuan. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Whole numbers"
  },
  {
    "text": "Work out: 92 − 58.",
    "idText": "Hitung: 92 − 58.",
    "a": "92",
    "b": "58",
    "op": "−",
    "answer": 34.0,
    "hint": "Exchange 1 ten so that you have 12 ones.",
    "idHint": "Tukar 1 puluhan sehingga tersedia 12 satuan.",
    "explanation": "Exchange 1 ten so that you have 12 ones. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Tukar 1 puluhan sehingga tersedia 12 satuan. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Whole numbers"
  },
  {
    "text": "Add 268 and 157.",
    "idText": "Jumlahkan 268 dan 157.",
    "a": "268",
    "b": "157",
    "op": "+",
    "answer": 425.0,
    "hint": "The ones total 15. Include the carried ten when adding the tens.",
    "idHint": "Jumlah satuan 15. Sertakan simpanan saat menjumlahkan puluhan.",
    "explanation": "The ones total 15. Include the carried ten when adding the tens. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Jumlah satuan 15. Sertakan simpanan saat menjumlahkan puluhan. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Whole numbers"
  },
  {
    "text": "Find the difference between 704 and 286.",
    "idText": "Tentukan selisih antara 704 dan 286.",
    "a": "704",
    "b": "286",
    "op": "−",
    "answer": 418.0,
    "hint": "Difference means the gap: subtract the smaller number from the larger. Exchange across the zero.",
    "idHint": "Difference berarti selisih: kurangi bilangan besar dengan bilangan kecil. Tukar melewati nol.",
    "explanation": "Difference means the gap: subtract the smaller number from the larger. Exchange across the zero. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Difference berarti selisih: kurangi bilangan besar dengan bilangan kecil. Tukar melewati nol. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Whole numbers"
  },
  {
    "text": "Calculate the total of 3,675 and 2,848.",
    "idText": "Hitung jumlah 3.675 dan 2.848.",
    "a": "3675",
    "b": "2848",
    "op": "+",
    "answer": 6523.0,
    "hint": "Total asks you to combine both amounts using addition.",
    "idHint": "Total meminta kamu menggabungkan kedua jumlah dengan penjumlahan.",
    "explanation": "Total asks you to combine both amounts using addition. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Total meminta kamu menggabungkan kedua jumlah dengan penjumlahan. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Whole numbers"
  },
  {
    "text": "Subtract 2,786 from 5,002.",
    "idText": "Kurangi 5.002 dengan 2.786.",
    "a": "5002",
    "b": "2786",
    "op": "−",
    "answer": 2216.0,
    "hint": "Subtract from means start with 5,002. Exchange across both zeros.",
    "idHint": "Subtract from berarti mulai dari 5.002. Tukar melewati kedua nol.",
    "explanation": "Subtract from means start with 5,002. Exchange across both zeros. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Subtract from berarti mulai dari 5.002. Tukar melewati kedua nol. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Whole numbers"
  },
  {
    "text": "Work out: 46,785 + 28,647.",
    "idText": "Hitung: 46.785 + 28.647.",
    "a": "46785",
    "b": "28647",
    "op": "+",
    "answer": 75432.0,
    "hint": "Include each carried 1 as you move towards the ten-thousands column.",
    "idHint": "Sertakan setiap simpanan 1 hingga kolom puluh ribuan.",
    "explanation": "Include each carried 1 as you move towards the ten-thousands column. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Sertakan setiap simpanan 1 hingga kolom puluh ribuan. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Whole numbers"
  },
  {
    "text": "How much greater is 80,003 than 46,728?",
    "idText": "Berapa selisih 80.003 dibandingkan 46.728?",
    "a": "80003",
    "b": "46728",
    "op": "−",
    "answer": 33275.0,
    "hint": "How much greater asks for a difference, so subtract. Exchange across the zeros.",
    "idHint": "How much greater menanyakan selisih, jadi kurangi. Tukar melewati nol.",
    "explanation": "How much greater asks for a difference, so subtract. Exchange across the zeros. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "How much greater menanyakan selisih, jadi kurangi. Tukar melewati nol. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Whole numbers"
  }
];
const decimalQuestions = [
  {
    "text": "Find the sum of 2.4 and 1.3.",
    "idText": "Tentukan jumlah 2.4 dan 1.3.",
    "a": "2.4",
    "b": "1.3",
    "op": "+",
    "answer": 3.7,
    "hint": "Sum means add. Align the decimal points before adding the tenths.",
    "idHint": "Sum berarti tambah. Sejajarkan titik desimal sebelum menjumlahkan persepuluhan.",
    "explanation": "Sum means add. Align the decimal points before adding the tenths. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Sum berarti tambah. Sejajarkan titik desimal sebelum menjumlahkan persepuluhan. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Decimals"
  },
  {
    "text": "Work out: 8.6 − 3.2.",
    "idText": "Hitung: 8.6 − 3.2.",
    "a": "8.6",
    "b": "3.2",
    "op": "−",
    "answer": 5.4,
    "hint": "Subtract tenths from tenths and ones from ones.",
    "idHint": "Kurangi persepuluhan dengan persepuluhan, satuan dengan satuan.",
    "explanation": "Subtract tenths from tenths and ones from ones. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Kurangi persepuluhan dengan persepuluhan, satuan dengan satuan. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Decimals"
  },
  {
    "text": "Add 4.75 and 2.68.",
    "idText": "Jumlahkan 4.75 dan 2.68.",
    "a": "4.75",
    "b": "2.68",
    "op": "+",
    "answer": 7.43,
    "hint": "13 hundredths becomes 1 tenth and 3 hundredths. Remember the carry into the ones too.",
    "idHint": "13 perseratusan menjadi 1 persepuluhan dan 3 perseratusan. Perhatikan juga simpanan ke satuan.",
    "explanation": "13 hundredths becomes 1 tenth and 3 hundredths. Remember the carry into the ones too. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "13 perseratusan menjadi 1 persepuluhan dan 3 perseratusan. Perhatikan juga simpanan ke satuan. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Decimals"
  },
  {
    "text": "Find the difference between 9.20 and 4.65.",
    "idText": "Tentukan selisih antara 9.20 dan 4.65.",
    "a": "9.20",
    "b": "4.65",
    "op": "−",
    "answer": 4.55,
    "hint": "Subtract to find the gap. Exchange a tenth for hundredths, then a one for tenths.",
    "idHint": "Kurangi untuk mencari selisih. Tukar persepuluhan ke perseratusan, lalu satuan ke persepuluhan.",
    "explanation": "Subtract to find the gap. Exchange a tenth for hundredths, then a one for tenths. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Kurangi untuk mencari selisih. Tukar persepuluhan ke perseratusan, lalu satuan ke persepuluhan. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Decimals"
  },
  {
    "text": "Calculate the total of 12.7 and 3.85.",
    "idText": "Hitung jumlah 12.7 dan 3.85.",
    "a": "12.7",
    "b": "3.85",
    "op": "+",
    "answer": 16.55,
    "hint": "Write 12.7 as 12.70 to align hundredths; the value stays the same.",
    "idHint": "Tulis 12.7 menjadi 12.70 agar perseratusan sejajar; nilainya tetap.",
    "explanation": "Write 12.7 as 12.70 to align hundredths; the value stays the same. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Tulis 12.7 menjadi 12.70 agar perseratusan sejajar; nilainya tetap. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Decimals"
  },
  {
    "text": "Subtract 4.76 from 10.00.",
    "idText": "Kurangi 10.00 dengan 4.76.",
    "a": "10.00",
    "b": "4.76",
    "op": "−",
    "answer": 5.24,
    "hint": "Start with 10.00. Exchange across the zeros to get 9 ones, 9 tenths and 10 hundredths.",
    "idHint": "Mulai dari 10.00. Tukar hingga menjadi 9 satuan, 9 persepuluhan, dan 10 perseratusan.",
    "explanation": "Start with 10.00. Exchange across the zeros to get 9 ones, 9 tenths and 10 hundredths. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Mulai dari 10.00. Tukar hingga menjadi 9 satuan, 9 persepuluhan, dan 10 perseratusan. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Decimals"
  },
  {
    "text": "Increase 28.95 by 16.8.",
    "idText": "Tambahkan 16.8 pada 28.95.",
    "a": "28.95",
    "b": "16.8",
    "op": "+",
    "answer": 45.75,
    "hint": "Increase by means add. Write 16.8 as 16.80 first.",
    "idHint": "Increase by berarti tambah. Tulis 16.8 menjadi 16.80 dahulu.",
    "explanation": "Increase by means add. Write 16.8 as 16.80 first. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Increase by berarti tambah. Tulis 16.8 menjadi 16.80 dahulu. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Decimals"
  },
  {
    "text": "How much greater is 100.5 than 67.85?",
    "idText": "Berapa selisih 100.5 dibandingkan 67.85?",
    "a": "100.5",
    "b": "67.85",
    "op": "−",
    "answer": 32.65,
    "hint": "Find the difference by subtracting. Use 100.50 and exchange across the zero in the ones.",
    "idHint": "Cari selisih dengan pengurangan. Gunakan 100.50 dan tukar melewati nol pada satuan.",
    "explanation": "Find the difference by subtracting. Use 100.50 and exchange across the zero in the ones. Work from right to left, including any carried or exchanged digits. The completed calculation is shown below.",
    "idExplanation": "Cari selisih dengan pengurangan. Gunakan 100.50 dan tukar melewati nol pada satuan. Hitung dari kanan ke kiri dengan memperhatikan simpanan atau penukaran. Perhitungan lengkap ditampilkan di bawah.",
    "level": "Decimals"
  }
];
const storyQuestions = [
  {
    "level": "Word problems",
    "text": "Mia has 48 stickers. Her friend gives her 27 more. How many stickers does Mia have now?",
    "idText": "Mia memiliki 48 stiker. Temannya memberikan 27 lagi. Berapa stiker Mia sekarang?",
    "unit": "stickers",
    "calculations": [
      [
        "48",
        "27",
        "+",
        "75"
      ]
    ],
    "answer": 75.0,
    "hint": "Add because Mia receives more stickers and her collection grows.",
    "idHint": "Tambahkan karena Mia menerima stiker lagi sehingga jumlahnya bertambah.",
    "explanation": "Add because Mia receives more stickers and her collection grows. Follow the calculation below; for two steps, use the first result in the next step.",
    "idExplanation": "Tambahkan karena Mia menerima stiker lagi sehingga jumlahnya bertambah. Ikuti perhitungan di bawah; untuk dua langkah, gunakan hasil pertama pada langkah berikutnya."
  },
  {
    "level": "Word problems",
    "text": "A school has 350 sheets of paper. Pupils use 178 sheets. How many sheets remain?",
    "idText": "Sekolah memiliki 350 lembar kertas. Murid memakai 178 lembar. Berapa lembar yang tersisa?",
    "unit": "sheets",
    "calculations": [
      [
        "350",
        "178",
        "−",
        "172"
      ]
    ],
    "answer": 172.0,
    "hint": "Subtract because the used sheets are taken out of the original amount.",
    "idHint": "Kurangi karena kertas yang dipakai diambil dari jumlah awal.",
    "explanation": "Subtract because the used sheets are taken out of the original amount. Follow the calculation below; for two steps, use the first result in the next step.",
    "idExplanation": "Kurangi karena kertas yang dipakai diambil dari jumlah awal. Ikuti perhitungan di bawah; untuk dua langkah, gunakan hasil pertama pada langkah berikutnya."
  },
  {
    "level": "Word problems",
    "text": "Team Blue collects 2,845 bottle caps. Team Pink collects 1,978. How many caps do they collect altogether?",
    "idText": "Tim Biru mengumpulkan 2.845 tutup botol dan Tim Merah Muda 1.978. Berapa jumlah semuanya?",
    "unit": "bottle caps",
    "calculations": [
      [
        "2845",
        "1978",
        "+",
        "4823"
      ]
    ],
    "answer": 4823.0,
    "hint": "Altogether asks for both groups combined, so add.",
    "idHint": "Altogether meminta jumlah kedua kelompok digabungkan, jadi tambahkan.",
    "explanation": "Altogether asks for both groups combined, so add. Follow the calculation below; for two steps, use the first result in the next step.",
    "idExplanation": "Altogether meminta jumlah kedua kelompok digabungkan, jadi tambahkan. Ikuti perhitungan di bawah; untuk dua langkah, gunakan hasil pertama pada langkah berikutnya."
  },
  {
    "level": "Word problems",
    "text": "A stadium has 45,000 seats. There are 28,675 spectators. How many seats are empty?",
    "idText": "Stadion memiliki 45.000 kursi. Ada 28.675 penonton. Berapa kursi yang kosong?",
    "unit": "seats",
    "calculations": [
      [
        "45000",
        "28675",
        "−",
        "16325"
      ]
    ],
    "answer": 16325.0,
    "hint": "Subtract occupied seats from all seats to find the unoccupied part.",
    "idHint": "Kurangi seluruh kursi dengan kursi yang ditempati untuk mencari bagian yang kosong.",
    "explanation": "Subtract occupied seats from all seats to find the unoccupied part. Follow the calculation below; for two steps, use the first result in the next step.",
    "idExplanation": "Kurangi seluruh kursi dengan kursi yang ditempati untuk mencari bagian yang kosong. Ikuti perhitungan di bawah; untuk dua langkah, gunakan hasil pertama pada langkah berikutnya."
  },
  {
    "level": "Word problems",
    "text": "A red ribbon is 3.75 m long and a blue ribbon is 2.60 m long. What is their combined length?",
    "idText": "Pita merah panjangnya 3.75 m dan pita biru 2.60 m. Berapa panjang gabungannya?",
    "unit": "metres",
    "calculations": [
      [
        "3.75",
        "2.60",
        "+",
        "6.35"
      ]
    ],
    "answer": 6.35,
    "hint": "Combined length means join the two lengths, so add.",
    "idHint": "Panjang gabungan berarti menggabungkan kedua panjang, jadi tambahkan.",
    "explanation": "Combined length means join the two lengths, so add. Follow the calculation below; for two steps, use the first result in the next step.",
    "idExplanation": "Panjang gabungan berarti menggabungkan kedua panjang, jadi tambahkan. Ikuti perhitungan di bawah; untuk dua langkah, gunakan hasil pertama pada langkah berikutnya."
  },
  {
    "level": "Word problems",
    "text": "A jug holds 5.00 litres of juice. Lina pours out 1.85 litres. How much juice is left?",
    "idText": "Teko berisi 5.00 liter jus. Lina menuangkan 1.85 liter keluar. Berapa liter yang tersisa?",
    "unit": "litres",
    "calculations": [
      [
        "5.00",
        "1.85",
        "−",
        "3.15"
      ]
    ],
    "answer": 3.15,
    "hint": "Subtract because pouring juice out reduces the amount in the jug.",
    "idHint": "Kurangi karena menuangkan jus keluar mengurangi isi teko.",
    "explanation": "Subtract because pouring juice out reduces the amount in the jug. Follow the calculation below; for two steps, use the first result in the next step.",
    "idExplanation": "Kurangi karena menuangkan jus keluar mengurangi isi teko. Ikuti perhitungan di bawah; untuk dua langkah, gunakan hasil pertama pada langkah berikutnya."
  },
  {
    "level": "Word problems",
    "text": "Amir walks 4.25 km and Siti walks 3.68 km. How much farther does Amir walk?",
    "idText": "Amir berjalan 4.25 km dan Siti 3.68 km. Berapa km lebih jauh Amir berjalan?",
    "unit": "kilometres",
    "calculations": [
      [
        "4.25",
        "3.68",
        "−",
        "0.57"
      ]
    ],
    "answer": 0.57,
    "hint": "Compare the distances: subtract the shorter distance from the longer. Nothing is removed; subtraction also measures a gap.",
    "idHint": "Bandingkan jaraknya: kurangi jarak yang lebih jauh dengan yang lebih dekat. Pengurangan juga dapat mencari selisih meskipun tidak ada yang diambil.",
    "explanation": "Compare the distances: subtract the shorter distance from the longer. Nothing is removed; subtraction also measures a gap. Follow the calculation below; for two steps, use the first result in the next step.",
    "idExplanation": "Bandingkan jaraknya: kurangi jarak yang lebih jauh dengan yang lebih dekat. Pengurangan juga dapat mencari selisih meskipun tidak ada yang diambil. Ikuti perhitungan di bawah; untuk dua langkah, gunakan hasil pertama pada langkah berikutnya."
  },
  {
    "level": "Word problems",
    "text": "A library has 1,250 books. It receives 375 books, then lends out 248. How many books remain in the library?",
    "idText": "Perpustakaan memiliki 1.250 buku, menerima 375 buku, lalu meminjamkan 248. Berapa buku yang tersisa?",
    "unit": "books",
    "calculations": [
      [
        "1250",
        "375",
        "+",
        "1625"
      ],
      [
        "1625",
        "248",
        "−",
        "1377"
      ]
    ],
    "answer": 1377.0,
    "hint": "First add because receiving increases the number of books. Then subtract because lending removes books from the library.",
    "idHint": "Pertama tambah karena menerima menambah buku. Lalu kurangi karena buku yang dipinjamkan keluar dari perpustakaan.",
    "explanation": "First add because receiving increases the number of books. Then subtract because lending removes books from the library. Follow the calculation below; for two steps, use the first result in the next step.",
    "idExplanation": "Pertama tambah karena menerima menambah buku. Lalu kurangi karena buku yang dipinjamkan keluar dari perpustakaan. Ikuti perhitungan di bawah; untuk dua langkah, gunakan hasil pertama pada langkah berikutnya."
  },
  {
    "level": "Word problems",
    "text": "Noah has $20. He buys a notebook for $4.75 and a pen for $2.60. How much money remains?",
    "idText": "Noah memiliki $20. Ia membeli buku seharga $4.75 dan pena $2.60. Berapa uang yang tersisa?",
    "unit": "dollars",
    "calculations": [
      [
        "20.00",
        "4.75",
        "−",
        "15.25"
      ],
      [
        "15.25",
        "2.60",
        "−",
        "12.65"
      ]
    ],
    "answer": 12.65,
    "hint": "Subtract each cost because each purchase reduces the money Noah has. You can also add the prices first, then subtract that total from $20.",
    "idHint": "Kurangi setiap harga karena pembelian mengurangi uang Noah. Kamu juga boleh menjumlahkan harga dahulu, lalu menguranginya dari $20.",
    "explanation": "Subtract each cost because each purchase reduces the money Noah has. You can also add the prices first, then subtract that total from $20. Follow the calculation below; for two steps, use the first result in the next step.",
    "idExplanation": "Kurangi setiap harga karena pembelian mengurangi uang Noah. Kamu juga boleh menjumlahkan harga dahulu, lalu menguranginya dari $20. Ikuti perhitungan di bawah; untuk dua langkah, gunakan hasil pertama pada langkah berikutnya."
  },
  {
    "level": "Word problems",
    "text": "A tank contains 25 litres of water. Another 8.75 litres is added, then 12.5 litres is used. How many litres remain?",
    "idText": "Tangki berisi 25 liter air. Ditambahkan 8.75 liter, lalu digunakan 12.5 liter. Berapa liter yang tersisa?",
    "unit": "litres",
    "calculations": [
      [
        "25.00",
        "8.75",
        "+",
        "33.75"
      ],
      [
        "33.75",
        "12.50",
        "−",
        "21.25"
      ]
    ],
    "answer": 21.25,
    "hint": "Add the water poured in because the amount grows. Subtract the water used because the amount decreases. Write whole litres with decimal zeros to align the columns.",
    "idHint": "Tambahkan air yang masuk karena jumlah bertambah. Kurangi air yang digunakan karena jumlah berkurang. Tambahkan nol desimal pada bilangan bulat agar kolom sejajar.",
    "explanation": "Add the water poured in because the amount grows. Subtract the water used because the amount decreases. Write whole litres with decimal zeros to align the columns. Follow the calculation below; for two steps, use the first result in the next step.",
    "idExplanation": "Tambahkan air yang masuk karena jumlah bertambah. Kurangi air yang digunakan karena jumlah berkurang. Tambahkan nol desimal pada bilangan bulat agar kolom sejajar. Ikuti perhitungan di bawah; untuk dua langkah, gunakan hasil pertama pada langkah berikutnya."
  }
];
const challengeQuestions = [
  {level:'Build confidence',text:'Find the missing number (?).',idText:'Temukan bilangan yang hilang (?).',a:'?',b:'27',op:'+',result:'65',answer:38,hint:'Use subtraction to undo addition.',idHint:'Gunakan pengurangan sebagai kebalikan penjumlahan.',explanation:'Subtract 27 from the total of 65 to find the missing starting number.',idExplanation:'Kurangi 65 dengan 27 untuk menemukan bilangan awal.',calculations:[['65','27','−','38']]},
  {level:'Build confidence',text:'Find the missing number (?).',idText:'Temukan bilangan yang hilang (?).',a:'90',b:'?',op:'−',result:'46',answer:44,hint:'Subtract the result from the starting number.',idHint:'Kurangi bilangan awal dengan hasilnya.',explanation:'The amount removed is the difference between 90 and 46.',idExplanation:'Bilangan pengurang adalah selisih antara 90 dan 46.',calculations:[['90','46','−','44']]},
  {level:'Build confidence',text:'Find the missing decimal (?).',idText:'Temukan bilangan desimal yang hilang (?).',a:'2.50',b:'?',op:'+',result:'4.00',answer:1.5,hint:'Think: how much more is needed to reach 4.00?',idHint:'Berapa lagi yang diperlukan untuk mencapai 4.00?',explanation:'Subtract 2.50 from 4.00. The missing number is 1.50.',idExplanation:'Kurangi 4.00 dengan 2.50. Bilangan yang hilang adalah 1.50.',calculations:[['4.00','2.50','−','1.50']]},
  {level:'Build confidence',text:'Rafi has 24 pencils. He gets 18 more, then gives away 15. How many pencils remain?',idText:'Rafi memiliki 24 pensil, mendapat 18 lagi, lalu memberikan 15. Berapa pensil yang tersisa?',answer:27,unit:'pencils',hint:'Add first, then subtract.',idHint:'Jumlahkan dahulu, kemudian kurangi.',explanation:'Rafi has 42 pencils after receiving more. Giving away 15 leaves 27.',idExplanation:'Setelah menerima pensil, ada 42. Setelah memberikan 15, tersisa 27.',calculations:[['24','18','+','42'],['42','15','−','27']]},
  {level:'Build confidence',text:'Lina has $10.00. She buys a notebook for $2.50 and a pen for $1.75. How much money remains?',idText:'Lina memiliki $10.00. Ia membeli buku $2.50 dan pena $1.75. Berapa uang yang tersisa?',answer:5.75,unit:'dollars',hint:'Subtract each price from her money, one at a time.',idHint:'Kurangi uangnya dengan harga barang satu per satu.',explanation:'After the notebook, $7.50 remains. After the pen, $5.75 remains.',idExplanation:'Setelah membeli buku tersisa $7.50. Setelah membeli pena tersisa $5.75.',calculations:[['10.00','2.50','−','7.50'],['7.50','1.75','−','5.75']]}
];

// Accept English-style numbers, including correctly grouped thousands.
function parseAnswer(raw) {
  const value = raw.trim();
  if (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value)) return null;
  const number = Number(value.replace(/,/g, ''));
  return Number.isFinite(number) ? number : null;
}
// Practice starts with a normal question and an empty working area.
// These fields are scratch work; only the final answer is scored.
function practiceWorkspace(question, prefix) {
  const calculations = question.calculations || [[question.a, question.b, question.op, String(question.answer)]];
  const placeNames = [
    ['Ones', 'Satuan'], ['Tens', 'Puluhan'], ['Hundreds', 'Ratusan'],
    ['Thousands', 'Ribuan'], ['Ten-thousands', 'Puluh ribuan']
  ];
  return `<div class="practice-workspace"><p><strong>Put each digit in its place.</strong></p>
    <p class="translation" lang="id">Isi satu angka di setiap kotak sesuai nilai tempatnya. Kotak kecil di atas untuk menyimpan atau menukar. Kotak yang tidak digunakan boleh kosong.</p>
    <div class="working-steps">${calculations.map((calculation, step) => {
      const numbers = [calculation[0], calculation[1], calculation[3]];
      const wholePlaces = Math.max(5, ...numbers.map(n => n.split('.')[0].length));
      const decimalPlaces = Math.max(...numbers.map(n => (n.split('.')[1] || '').length));
      const places = Array.from({length: wholePlaces}, (_, i) => placeNames[wholePlaces - i - 1]);
      if (decimalPlaces) places.push(null, ['Tenths', 'Persepuluhan'], ['Hundredths', 'Perseratusan']);
      const cells = (row, label, regroup = false) => places.map((place, i) => {
        if (!place) return `<td class="decimal-separator" aria-hidden="true">${regroup ? '' : '.'}</td>`;
        return `<td><input id="${prefix}-${step}-${row}-${i}" class="digit-box${regroup ? ' regroup-box' : ''}" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="${regroup ? 2 : 1}" autocomplete="off" aria-label="Step ${step + 1}, ${label}, ${place[0]} / ${place[1]}"></td>`;
      }).join('');
      return `<fieldset class="blank-column"><legend>${calculations.length > 1 ? `Step ${step + 1}` : 'Your working'} <span lang="id">· ${calculations.length > 1 ? `Langkah ${step + 1}` : 'Cara hitungmu'}</span></legend>
        <div class="place-table-scroll" tabindex="0" role="region" aria-label="Place-value working grid, step ${step + 1}"><table class="place-input-table"><thead><tr><th scope="col"><span class="visually-hidden">Operation</span></th>${places.map(place => place ? `<th scope="col">${place[0]}<small lang="id">${place[1]}</small></th>` : '<th class="decimal-separator"><span class="visually-hidden">Decimal point</span></th>').join('')}</tr></thead>
        <tbody><tr class="regroup-row"><th scope="row"><span class="visually-hidden">Carrying or exchanging</span></th>${cells('regroup', 'carrying or exchanging', true)}</tr>
        <tr><th scope="row"><span class="visually-hidden">First number</span></th>${cells('top', 'first number')}</tr>
        <tr><th scope="row"><select class="working-operation" aria-label="Step ${step + 1}: operation / Operasi"><option value="">?</option><option value="+">+</option><option value="−">−</option></select></th>${cells('bottom', 'second number')}</tr>
        <tr class="working-result"><th scope="row"><span class="visually-hidden">Result</span></th>${cells('result', 'result')}</tr></tbody></table></div>
      </fieldset>`;
    }).join('')}</div><p class="translation">Copy your final result into the answer box below. Only the final answer is scored.<br><span lang="id">Salin hasil akhir ke kotak jawaban di bawah. Yang dinilai hanya jawaban akhir.</span></p></div>`;
}

// Transparent drawing layers stay attached to each saved question.
// Pointer Events support a mouse, a finger, and a tablet stylus without libraries.
function enableWorkingInk(workspace, storageKey) {
  const toolbar = document.createElement('div');
  toolbar.className = 'ink-tools';
  toolbar.innerHTML = `<div class="ink-buttons" role="group" aria-label="Drawing tools">
    <button type="button" class="button secondary active" data-ink="type" aria-pressed="true">⌨ Isi Kotak</button>
    <button type="button" class="button secondary" data-ink="pen" aria-pressed="false">✎ Pena</button>
    <button type="button" class="button secondary" data-ink="eraser" aria-pressed="false">Penghapus</button>
    <button type="button" class="button secondary" data-ink="undo" disabled>↶ Undo</button>
    <button type="button" class="button secondary" data-ink="clear" disabled>Hapus Semua</button>
    </div><p class="translation ink-status" role="status">Type in the boxes, or select Pen to draw.<br><span lang="id">Pilih Pena untuk mencoret dengan jari atau stylus. Gunakan Isi Kotak untuk mengetik atau menggeser tabel.</span></p>`;
  workspace.prepend(toolbar);
  const storageStatus = document.createElement('p');
  storageStatus.className = 'translation ink-save-status';
  storageStatus.setAttribute('role', 'status');
  toolbar.appendChild(storageStatus);
  let restored = [];
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (!Array.isArray(saved)) throw new Error('Invalid saved ink');
    // Ignore malformed data rather than allowing it to interrupt the quiz.
    restored = saved.filter(stroke => Number.isInteger(stroke.layer) && stroke.layer >= 0
      && typeof stroke.erase === 'boolean' && Array.isArray(stroke.points) && stroke.points.length > 0
      && stroke.points.every(p => p && Number.isFinite(p.x) && Number.isFinite(p.y)));
    storageStatus.textContent = 'Ink saves automatically in this browser. / Coretan disimpan otomatis di browser ini, termasuk setelah refresh. Hapus Semua menghapus coretan soal ini.';
  } catch (error) {
    storageStatus.textContent = 'Saved ink could not be loaded. / Coretan tersimpan tidak dapat dimuat. Browser mungkin membatasi penyimpanan.';
  }
  let mode = 'type';
  let history = [];
  const layers = [];
  function saveInk() {
    try {
      const strokes = history.map(stroke => ({
        layer: layers.findIndex(layer => layer.canvas === stroke.canvas),
        erase: stroke.erase, points: stroke.points
      }));
      if (strokes.length) localStorage.setItem(storageKey, JSON.stringify(strokes));
      else localStorage.removeItem(storageKey);
      storageStatus.textContent = 'Ink saved on this device. / Coretan tersimpan di perangkat ini; tetap ada setelah refresh. Hapus Semua menghapus coretan soal ini.';
    } catch (error) {
      storageStatus.textContent = 'Ink could not be saved. / Coretan belum tersimpan: penyimpanan browser penuh atau diblokir. Jangan refresh jika ingin mempertahankannya.';
    }
  }
  const undo = toolbar.querySelector('[data-ink="undo"]');
  const clear = toolbar.querySelector('[data-ink="clear"]');
  const syncButtons = () => { undo.disabled = clear.disabled = history.length === 0; };
  workspace.querySelectorAll('.place-input-table').forEach(table => {
    // Wrap inside the scrolling region so ink moves with the place-value boxes.
    const surface = document.createElement('div');
    surface.className = 'ink-surface';
    table.parentNode.insertBefore(surface, table);
    surface.appendChild(table);
    const canvas = document.createElement('canvas');
    canvas.className = 'ink-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    surface.appendChild(canvas);
    const context = canvas.getContext('2d');
    let activeStroke = null;
    let pointerId = null;
    function redraw() {
      const bounds = surface.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(bounds.width * ratio);
      canvas.height = Math.round(bounds.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.lineCap = context.lineJoin = 'round';
      for (const stroke of history.filter(item => item.canvas === canvas)) {
        context.globalCompositeOperation = stroke.erase ? 'destination-out' : 'source-over';
        context.strokeStyle = context.fillStyle = '#2459a6';
        context.lineWidth = stroke.erase ? 24 : 3;
        const points = stroke.points.map(p => ({x: p.x * bounds.width, y: p.y * bounds.height}));
        context.beginPath();
        if (points.length === 1) {
          context.arc(points[0].x, points[0].y, context.lineWidth / 2, 0, Math.PI * 2);
          context.fill();
        } else {
          context.moveTo(points[0].x, points[0].y);
          points.slice(1).forEach(p => context.lineTo(p.x, p.y));
          context.stroke();
        }
      }
    }
    function point(event) {
      const bounds = canvas.getBoundingClientRect();
      return {x: (event.clientX - bounds.left) / bounds.width, y: (event.clientY - bounds.top) / bounds.height};
    }
    canvas.addEventListener('pointerdown', event => {
      if (mode === 'type' || pointerId !== null || !event.isPrimary || event.button !== 0) return;
      event.preventDefault();
      pointerId = event.pointerId;
      canvas.setPointerCapture(pointerId);
      activeStroke = {canvas, erase: mode === 'eraser', points: [point(event)]};
      history.push(activeStroke);
      syncButtons();
      redraw();
    });
    canvas.addEventListener('pointermove', event => {
      if (event.pointerId !== pointerId || !activeStroke) return;
      event.preventDefault();
      activeStroke.points.push(point(event));
      redraw();
    });
    function finish(event) {
      if (event.pointerId !== pointerId) return;
      if (canvas.hasPointerCapture(pointerId)) canvas.releasePointerCapture(pointerId);
      activeStroke = null;
      pointerId = null;
      saveInk();
    }
    canvas.addEventListener('pointerup', finish);
    canvas.addEventListener('pointercancel', finish);
    canvas.addEventListener('lostpointercapture', finish);
    const observer = new ResizeObserver(redraw);
    observer.observe(surface);
    layers.push({canvas, redraw, observer});
  });
  history = restored.filter(stroke => layers[stroke.layer]).map(stroke => ({
    canvas: layers[stroke.layer].canvas, erase: stroke.erase, points: stroke.points
  }));
  layers.forEach(layer => layer.redraw());
  syncButtons();
  // Save an unfinished stroke too if the page is refreshed while drawing.
  window.addEventListener('pagehide', saveInk);
  toolbar.addEventListener('click', event => {
    const button = event.target.closest('[data-ink]');
    if (!button) return;
    const action = button.dataset.ink;
    if (action === 'undo' || action === 'clear') {
      if (action === 'undo') history.pop();
      else history = [];
      layers.forEach(layer => layer.redraw());
      syncButtons();
      saveInk();
      return;
    }
    mode = action;
    toolbar.querySelectorAll('[aria-pressed]').forEach(item => {
      item.setAttribute('aria-pressed', String(item.dataset.ink === mode));
      item.classList.toggle('active', item.dataset.ink === mode);
    });
    layers.forEach(({canvas}) => {
      canvas.classList.toggle('drawing', mode !== 'type');
      canvas.classList.toggle('erasing', mode === 'eraser');
    });
    toolbar.querySelector('.ink-status').textContent = mode === 'type'
      ? 'Typing mode / Mode isi kotak: ketik angka atau geser tabel. Coretan tetap tersimpan.'
      : mode === 'pen' ? 'Pen mode / Mode pena: coret di atas kotak dengan jari atau stylus. Pilih Isi Kotak untuk mengetik.'
      : 'Eraser mode / Mode penghapus: usap coretan yang ingin dihapus. Angka ketikan tidak terhapus.';
  });
  return () => {
    window.removeEventListener('pagehide', saveInk);
    layers.forEach(layer => layer.observer.disconnect());
  };
}

function createGame(containerId, questions, isChallenge = false, quizTitle = 'Practice quiz') {
  const container = document.getElementById(containerId);
  // Keep place-value cells numeric; regrouping cells may hold 10–19.
  container.addEventListener('input', event => {
    if (!event.target.classList.contains('digit-box')) return;
    event.target.value = event.target.value.replace(/[^0-9]/g, '').slice(0, event.target.maxLength);
  });
  let index = 0;
  let score = 0;
  // Keep each question's actual DOM nodes, including drafts and event handlers.
  let savedQuestions = [];
  let inkCleanups = [];
  let answered = new Set();
  function updateNavigation() {
    const completed = answered.size;
    container.querySelector('.game-meta>span:last-child').textContent = `Question ${index + 1} / ${questions.length} · Score ${score}`;
    container.querySelector('[data-action="previous"]').disabled = index === 0;
    container.querySelector('[data-action="next"]').disabled = index === questions.length - 1 && completed < questions.length;
    container.querySelector('.navigation-note').textContent = completed < questions.length
      ? `${completed} / ${questions.length} checked. You can skip and return. Check every question to see your result. / Boleh lewati dan kembali. Periksa semua soal untuk melihat hasil.`
      : 'All questions checked. View your result on the last question. / Semua soal sudah diperiksa. Lihat hasil pada soal terakhir.';
    const progress = container.querySelector('.progress');
    progress.setAttribute('aria-valuenow', String(completed));
    progress.querySelector('span').style.width = `${completed / questions.length * 100}%`;
  }
  function render() {
    if (savedQuestions[index]) {
      container.replaceChildren(savedQuestions[index]);
      updateNavigation();
      return;
    }
    let attempted = false;
    let checked = false;
    let reviewing = false;
    const q = questions[index];
    container.innerHTML = `<article class="game-card"><div class="game-meta"><span class="pill">${q.level}</span><span>Question ${index + 1} / ${questions.length} · Score ${score}</span></div><div class="progress" role="progressbar" aria-label="Questions completed" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${index}"><span style="width:${index / questions.length * 100}%"></span></div><h3>${q.text || (isChallenge ? 'Work out the answer.' : `Work out: ${q.a} ${q.op} ${q.b} = ?`)}</h3><p class="translation" lang="id">${q.idText || 'Hitung hasilnya.'}</p>${isChallenge ? (q.a ? `<div class="worked-example">${column(q.a,q.b,q.op,q.result || '?')}</div>` : '') : practiceWorkspace(q, containerId)}<form novalidate><label class="answer-label" for="${containerId}-answer">Your answer${q.unit ? ` (${q.unit})` : ''}<span class="translation" lang="id"> · Jawabanmu</span></label><input class="answer-input" id="${containerId}-answer" type="text" inputmode="decimal" autocomplete="off" aria-describedby="${containerId}-note"><p class="input-note" id="${containerId}-note">Use a dot for decimals (5.75). Thousands commas are optional (1,250 or 1250). Enter numbers only.<br><span lang="id">Gunakan titik untuk desimal. Koma ribuan opsional. Masukkan angka saja.</span></p><div class="game-actions"><button class="button" type="submit" data-action="check">Check Answer</button><button class="button secondary" type="button" data-action="hint">Hint</button><button class="button secondary" type="button" data-action="retry" hidden>Try Again</button></div></form><div class="hint" hidden role="status"></div><div class="feedback" hidden aria-live="polite"></div><p class="score-note">1 point for a correct first answer. Hints are welcome; retries help you learn.<br><span lang="id">1 poin untuk jawaban pertama yang benar. Petunjuk boleh digunakan; coba ulang untuk berlatih.</span></p><div class="question-navigation"><button class="button secondary" type="button" data-action="previous">← Previous Question</button><button class="button" type="button" data-action="next">${index === questions.length - 1 ? 'See Result' : 'Next Question →'}</button></div><p class="navigation-note translation" aria-live="polite"></p></article>`;
    const workspace = container.querySelector('.practice-workspace');
    if (workspace) {
      // Include the question content so edited/reordered questions do not inherit unrelated ink.
      const inkKey = `little-steps:ink:v1:${location.pathname}:${containerId}:${JSON.stringify([q.text, q.a, q.b, q.op, q.answer, q.calculations])}`;
      inkCleanups.push(enableWorkingInk(workspace, inkKey));
    }
    const input = container.querySelector('.answer-input');
    const feedback = container.querySelector('.feedback');
    const check = container.querySelector('[data-action="check"]');
    const retry = container.querySelector('[data-action="retry"]');
    const next = container.querySelector('[data-action="next"]');
    container.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      if (checked) return;
      const answer = parseAnswer(input.value);
      feedback.hidden = false;
      if (answer === null) {
        feedback.className = 'feedback error';
        feedback.innerHTML = '<strong>Please enter a number using the format above.</strong><p class="translation" lang="id">Masukkan angka sesuai format di atas.</p>';
        input.setAttribute('aria-invalid','true');
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      const correct = Math.abs(answer - q.answer) < 0.000000001;
      if (correct && !attempted) score++;
      attempted = true;
      answered.add(index);
      checked = true;
      updateNavigation();
      input.disabled = true;
      check.disabled = true;
      retry.hidden = correct;
      next.hidden = false;
      container.querySelector('.game-meta>span:last-child').textContent = `Question ${index + 1} / ${questions.length} · Score ${score}`;
      feedback.className = `feedback ${correct ? 'correct' : 'error'}`;
      if (correct) feedback.innerHTML = `<strong>${reviewing ? 'Yes! You worked through it.' : 'Correct! Nicely done.'}</strong><p class="translation" lang="id">Benar! Kerja bagus.${reviewing ? ' Latihan ulang tidak menambah poin.' : ''}</p>`;
      else {
        const calculations = q.calculations || [[q.a,q.b,q.op,String(q.answer)]];
        feedback.innerHTML = `<strong>Let's work through it. The answer is ${q.answer}${q.unit ? ` ${q.unit}` : ''}.</strong><p>${q.explanation}</p><p class="translation" lang="id">${q.idExplanation}</p>${calculations.map(c => column(...c)).join('')}<p>Try Again to practise this question, or continue.</p><p class="translation" lang="id">Coba lagi untuk berlatih soal ini, atau lanjutkan.</p>`;
      }
    });
    container.querySelector('[data-action="hint"]').addEventListener('click', () => {
      const hint = container.querySelector('.hint');
      hint.hidden = !hint.hidden;
      hint.innerHTML = `<strong>Hint:</strong> ${q.hint}<p class="translation" lang="id">${q.idHint}</p>`;
    });
    retry.addEventListener('click', () => {
      reviewing = true;
      checked = false;
      input.disabled = false;
      input.value = '';
      check.disabled = false;
      feedback.hidden = true;
      retry.hidden = true;
      next.hidden = false;
      input.focus();
    });
    container.querySelector('[data-action="previous"]').addEventListener('click', () => {
      if (index === 0) return;
      index--;
      render();
      container.querySelector('h3').focus();
    });
    next.addEventListener('click', () => {
      if (index === questions.length - 1) {
        if (answered.size === questions.length) showResult();
        return;
      }
      index++;
      render();
      container.querySelector('h3').focus();
    });
    container.querySelector('h3').setAttribute('tabindex', '-1');
    savedQuestions[index] = container.firstElementChild;
    updateNavigation();
  }

  function showResult() {
    container.innerHTML = `<article class="game-card result"><div class="result-symbol">✦</div><p class="eyebrow">${isChallenge ? 'MINI CHALLENGE' : quizTitle.toUpperCase()} COMPLETE</p><h3 tabindex="-1">You kept going. That's progress!</h3><div class="result-score">${score}<span style="font-size:25px"> / ${questions.length}</span></div><p>Correct on the first attempt</p><p class="translation" lang="id">Jawaban benar pada percobaan pertama</p><p>${score === questions.length ? 'Excellent work! You are ready to explain your methods to your tutor.' : 'Review the lessons with your tutor, then try again to build confidence.'}</p><p class="translation" lang="id">${score === questions.length ? 'Hebat! Coba jelaskan caramu kepada guru les.' : 'Pelajari kembali bersama guru les, lalu coba lagi agar lebih percaya diri.'}</p><button class="button" data-action="restart">${isChallenge ? 'Restart Challenge' : 'Restart Quiz'}</button></article>`;
    container.querySelector('h3').focus();
    container.querySelector('[data-action="restart"]').addEventListener('click', () => {
      inkCleanups.forEach(cleanup => cleanup());
      inkCleanups = [];
      index = 0; score = 0; savedQuestions = []; answered = new Set();
      render(); container.querySelector('.answer-input').focus();
    });
  }
  render();
}
renderLesson();
// Each category owns its progress; switching categories preserves answers and scores.
createGame('whole-game', wholeQuestions, false, 'Whole numbers');
createGame('decimal-game', decimalQuestions, false, 'Decimals');
createGame('story-game', storyQuestions, false, 'Mixed word problems');
document.querySelectorAll('[data-quiz-group]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.quiz-group').forEach(group => { group.hidden = group.id !== button.dataset.quizGroup; });
  document.querySelectorAll('[data-quiz-group]').forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
}));
createGame('challenge-game', challengeQuestions, true);
