document.addEventListener('DOMContentLoaded', () => {
    console.log("Web PPT Initialized");
    
    // Quiz Modal Logic
    const openQuizBtns = document.querySelectorAll('.open-quiz-btn');
    const closeQuizBtn = document.getElementById('close-quiz-btn');
    const quizModal = document.getElementById('quiz-modal');

    if (closeQuizBtn && quizModal) {
        closeQuizBtn.addEventListener('click', () => {
            quizModal.classList.remove('active');
        });

        // Close when clicking outside the modal content
        quizModal.addEventListener('click', (e) => {
            if (e.target === quizModal) {
                quizModal.classList.remove('active');
            }
        });
    }

    // Interactive Flow Logic
    const flowBtns = document.querySelectorAll('.flow-btn');
    const flowInfoText = document.getElementById('flow-info-text');

    if (flowBtns.length > 0 && flowInfoText) {
        flowBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                flowBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const info = btn.getAttribute('data-info');
                flowInfoText.textContent = info;
            });
        });
    }

    // Digestive Flow Buttons (Slide 3)
    const digestiveBtns = document.querySelectorAll('.digestive-btn');
    const digestiveInfoPanel = document.getElementById('digestive-flow-info');

    if (digestiveBtns.length > 0 && digestiveInfoPanel) {
        digestiveBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                digestiveBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const info = btn.getAttribute('data-info');
                digestiveInfoPanel.innerHTML = `<p><strong>${btn.textContent}:</strong><br>${info.split(': ').slice(1).join(': ')}</p>`;
            });
        });
    }

    // Circulatory Flow Buttons (Slide 4 - Systemic)
    const circulatoryRedBtns = document.querySelectorAll('.circulatory-red-btn');
    const circulatoryBlueBtns = document.querySelectorAll('.circulatory-blue-btn');

    function makeFlowGroup(btns) {
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    if (circulatoryRedBtns.length > 0) makeFlowGroup(circulatoryRedBtns);
    if (circulatoryBlueBtns.length > 0) makeFlowGroup(circulatoryBlueBtns);

    // Excretory Flow Buttons (Slide 5)
    const excretoryBtns = document.querySelectorAll('.excretory-btn');
    const excretoryInfoPanel = document.getElementById('excretory-flow-info');

    if (excretoryBtns.length > 0 && excretoryInfoPanel) {
        excretoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                excretoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const info = btn.getAttribute('data-info');
                excretoryInfoPanel.innerHTML = `<p><strong>${btn.textContent}:</strong><br>${info}</p>`;
            });
        });
    }
    

    // Quiz Data & Logic
    const quizDataNervous = [
        {
            question: "1. What are the two main parts that make up the Central Nervous System (CNS)?",
            options: ["A. Brain and Heart", "B. Brain and Spinal Cord", "C. Sensory and Motor Nerves", "D. Cerebrum and Cerebellum"],
            correct: 1, // Index 1 is B
            explanation: "Sistem saraf pusat (Central Nervous System) terdiri dari dua organ utama, yaitu otak sebagai pusat komando dan sumsum tulang belakang sebagai jalur utama lalu lintas sinyal."
        },
        {
            question: "2. Which part of the brain is known as 'The Thinker' and is responsible for memory, learning, and voluntary movements?",
            options: ["A. Cerebellum", "B. Brainstem", "C. Cerebrum", "D. Spinal Cord"],
            correct: 2,
            explanation: "Cerebrum atau otak besar adalah bagian otak yang mengatur aktivitas yang disadari dan tingkat tinggi, seperti berpikir, mengingat, belajar, dan berbicara."
        },
        {
            question: "3. If you are balancing on a bicycle, which part of your brain is working the hardest to keep you from falling?",
            options: ["A. Cerebellum", "B. Cerebrum", "C. Brainstem", "D. Sensory Nerves"],
            correct: 0,
            explanation: "Cerebellum atau otak kecil berfungsi khusus untuk mengatur koordinasi gerak otot, postur, dan menjaga keseimbangan tubuh (misalnya saat bersepeda atau berdiri satu kaki)."
        },
        {
            question: "4. Breathing and heartbeat are automatic functions that keep you alive. Which part of the brain controls them?",
            options: ["A. Motor Nerves", "B. Cerebrum", "C. Cerebellum", "D. Brainstem"],
            correct: 3,
            explanation: "Brainstem atau batang otak mengendalikan fungsi-fungsi otomatis (tidak disadari) yang sangat vital bagi kelangsungan hidup, seperti pernapasan, detak jantung, dan pencernaan."
        },
        {
            question: "5. In the nervous pathway, what do we call the initial event from the outside environment, such as touching a hot pan?",
            options: ["A. Response", "B. Receptor", "C. Stimulus", "D. Motor"],
            correct: 2,
            explanation: "Stimulus adalah kejadian atau rangsangan awal dari lingkungan sekitar (maupun dari dalam tubuh) yang memicu sistem saraf untuk bereaksi, contohnya panas, dingin, atau suara keras."
        },
        {
            question: "6. Which part of your body is responsible for detecting the stimulus (like feeling the heat on your skin)?",
            options: ["A. Receptor", "B. Central Nervous System", "C. Effector", "D. Muscle"],
            correct: 0,
            explanation: "Receptor (reseptor) adalah bagian tubuh, seperti ujung saraf pada kulit atau indra lainnya, yang bertugas mendeteksi rangsangan (stimulus) pertama kali."
        },
        {
            question: "7. What is the specific job of the Sensory Neuron?",
            options: ["A. To send commands from the brain to the muscles", "B. To process information and make a decision", "C. To send the message from the receptor to the Central Nervous System", "D. To pump blood to the brain"],
            correct: 2,
            explanation: "Sensory Neuron (Saraf Sensorik) bertugas seperti kurir satu arah yang khusus mengantarkan pesan atau 'rasa' dari reseptor menuju ke pusat kendali (Sistem Saraf Pusat)."
        },
        {
            question: "8. After the brain decides what action to take, which 'messenger' brings the command back to your muscles to move?",
            options: ["A. Sensory Neuron", "B. Motor Neuron", "C. Receptor", "D. Spinal Cord"],
            correct: 1,
            explanation: "Setelah otak memproses informasi, Motor Neuron (Saraf Motorik) bertugas membawa perintah dari otak/sumsum tulang belakang menuju ke otot agar tubuh bisa bergerak/merespons."
        },
        {
            question: "9. Look at this signal flow: Stimulus ➔ Receptor ➔ Sensory Neuron ➔ [ ? ] ➔ Motor Neuron ➔ Response. Which part is missing in the blank?",
            options: ["A. Central Nervous System", "B. Muscle", "C. Endocrine Gland", "D. Blood Flow"],
            correct: 0,
            explanation: "Sesuai urutan alur sinyal (Signal Flow), setelah pesan dibawa oleh saraf sensorik, pesan tersebut harus masuk dan diproses terlebih dahulu di Central Nervous System sebelum diteruskan ke saraf motorik."
        },
        {
            question: "10. What is the final step in the nervous pathway where your body actually reacts (e.g., pulling your hand away)?",
            options: ["A. Stimulus", "B. Processing", "C. Receptor", "D. Response"],
            correct: 3,
            explanation: "Response adalah tahap paling akhir dari alur kerja sistem saraf, yaitu berupa tindakan, reaksi, atau tanggapan tubuh terhadap rangsangan (seperti refleks menarik tangan)."
        }
    ];

    const quizDataRespiratory = [
        {
            question: "1. What is the primary function of the respiratory system?",
            options: ["A. To pump blood throughout the body", "B. To break down food into nutrients", "C. To take in oxygen (O₂) and release carbon dioxide (CO₂)", "D. To control body movements and thoughts"],
            correct: 2,
            explanation: "Fungsi utama sistem pernapasan adalah mengambil O₂ untuk energi dan membuang CO₂ sebagai sisa metabolisme."
        },
        {
            question: "2. Which part of the respiratory system contains tiny hairs (cilia) and mucus to trap dust and germs?",
            options: ["A. Alveoli", "B. Nose", "C. Diaphragm", "D. Bronchioles"],
            correct: 1,
            explanation: "Hidung dilapisi rambut halus (silia) dan lendir (mucus) yang berfungsi menyaring debu, kotoran, dan kuman dari udara."
        },
        {
            question: "3. What is the common name for the Trachea?",
            options: ["A. Voice box", "B. Food pipe", "C. Windpipe", "D. Air sac"],
            correct: 2,
            explanation: "Windpipe adalah sebutan lain untuk Trachea (tenggorokan)."
        },
        {
            question: "4. Which organ contains the vocal cords that allow us to speak and make sounds?",
            options: ["A. Pharynx", "B. Larynx", "C. Trachea", "D. Bronchus"],
            correct: 1,
            explanation: "Larynx atau voice box (kotak suara) berisi pita suara (vocal cords) untuk menghasilkan suara."
        },
        {
            question: "5. What happens to the air as it passes through the Pharynx?",
            options: ["A. Gas exchange takes place immediately", "B. It is pumped into the bloodstream", "C. It passes through the throat toward the larynx", "D. It is turned into carbon dioxide"],
            correct: 2,
            explanation: "Pharynx (faring/tenggorokan atas) berfungsi sebagai saluran persimpangan yang mengalirkan udara dari rongga hidung menuju larynx."
        },
        {
            question: "6. Which branched tubes direct air from the trachea into each lung?",
            options: ["A. Alveoli", "B. Diaphragm", "C. Capillaries", "D. Bronchi (Bronchus)"],
            correct: 3,
            explanation: "Bronchus (jamak: Bronchi) adalah dua cabang utama dari trakea yang mengarahkan udara masuk ke paru-paru kanan dan kiri."
        },
        {
            question: "7. Where does the actual gas exchange (O₂ enters the blood, CO₂ leaves the blood) take place?",
            options: ["A. Trachea", "B. Larynx", "C. Alveoli (Air Sacs)", "D. Bronchioles"],
            correct: 2,
            explanation: "Alveoli (kantong udara) adalah tempat terjadinya pertukaran oksigen dan karbon dioksida dengan pembuluh darah kapiler."
        },
        {
            question: "8. What happens to the diaphragm during Inhalation (breathing in)?",
            options: ["A. It relaxes and moves up", "B. It contracts and moves down", "C. It stays still and shrinks", "D. It expands and pushes air out"],
            correct: 1,
            explanation: "Saat menghirup napas (inhalation), otot diafragma berkontraksi dan bergerak turun sehingga rongga dada membesar."
        },
        {
            question: "9. What is the correct airflow pathway when you inhale (breathe in)?",
            options: ["A. Nose ➔ Pharynx ➔ Larynx ➔ Trachea ➔ Bronchus ➔ Bronchioles ➔ Alveoli", "B. Nose ➔ Trachea ➔ Larynx ➔ Pharynx ➔ Alveoli ➔ Bronchus", "C. Alveoli ➔ Bronchioles ➔ Bronchus ➔ Trachea ➔ Larynx ➔ Nose", "D. Nose ➔ Larynx ➔ Pharynx ➔ Bronchus ➔ Trachea ➔ Alveoli"],
            correct: 0,
            explanation: "Urutan alur masuknya udara yang benar dimulai dari hidung, melewati faring, laring, trakea, bronkus, bronkiolus, hingga sampai di alveolus."
        },
        {
            question: "10. During Exhalation (breathing out), what happens to the chest cavity and lungs?",
            options: ["A. The chest cavity expands and pulls air in", "B. The rib cage moves up and out", "C. The diaphragm contracts and moves down", "D. The chest cavity shrinks and pushes air out"],
            correct: 3,
            explanation: "Saat menghembuskan napas (exhalation), otot diafragma berelaksasi (menaik), membuat rongga dada mengecil dan mendorong udara keluar."
        }
    ];

    const quizDataDigestive = [
        {
            question: "1. What is the main function of the digestive system?",
            options: ["A. To transport oxygen throughout the body", "B. To break down food into nutrients for energy and growth", "C. To pump blood to all organs", "D. To filter blood and produce urine"],
            correct: 1,
            explanation: "Fungsi utama sistem pencernaan adalah memecah makanan menjadi nutrisi yang siap diserap tubuh untuk energi dan pertumbuhan, serta membuang sisa makanan."
        },
        {
            question: "2. Where does mechanical digestion begin when teeth chew food into smaller pieces?",
            options: ["A. Stomach", "B. Esophagus", "C. Mouth", "D. Small Intestine"],
            correct: 2,
            explanation: "Pencernaan mekanis dimulai di mulut saat gigi mengunyah makanan menjadi potongan-potongan kecil."
        },
        {
            question: "3. What is the name of the wave-like muscle contractions that push food down through the Esophagus?",
            options: ["A. Filtration", "B. Inhalation", "C. Peristalsis", "D. Augmentation"],
            correct: 2,
            explanation: "Peristalsis (gerak peristaltik) adalah gerakan meremas/gelombang otot pada esofagus untuk mendorong makanan turun ke lambung."
        },
        {
            question: "4. Which organ churns food and mixes it with strong acid and enzymes to break down proteins?",
            options: ["A. Liver", "B. Stomach", "C. Large Intestine", "D. Gallbladder"],
            correct: 1,
            explanation: "Lambung (Stomach) mengaduk makanan dan mencampurnya dengan asam lambung serta enzim untuk meremas dan memecah protein."
        },
        {
            question: "5. Which organ produces bile to help break down fats?",
            options: ["A. Liver", "B. Pancreas", "C. Stomach", "D. Esophagus"],
            correct: 0,
            explanation: "Hati (Liver) berfungsi menghasilkan cairan empedu (bile) yang berguna untuk memecah lemak."
        },
        {
            question: "6. What is the main role of the Gallbladder in the digestive system?",
            options: ["A. To produce digestive enzymes", "B. To absorb water from food waste", "C. To store bile until it is needed", "D. To chew food into smaller pieces"],
            correct: 2,
            explanation: "Kantung empedu (Gallbladder) bertugas menyimpan cairan empedu yang dihasilkan hati sebelum dialirkan ke usus halus."
        },
        {
            question: "7. Where does most of the chemical digestion and nutrient absorption into the bloodstream happen?",
            options: ["A. Large Intestine", "B. Stomach", "C. Small Intestine", "D. Rectum"],
            correct: 2,
            explanation: "Usus halus (Small Intestine) adalah tempat utama terjadinya pencernaan kimiawi secara lengkap dan penyerapan nutrisi ke dalam pembuluh darah."
        },
        {
            question: "8. What is the primary job of the Large Intestine?",
            options: ["A. To absorb water and salts from unabsorbed food waste", "B. To produce bile for fat breakdown", "C. To churn food using strong stomach acid", "D. To absorb proteins directly into muscles"],
            correct: 0,
            explanation: "Usus besar (Large Intestine) menyerap air dan garam/mineral dari sisa-sisa makanan yang tidak dicerna hingga membentuk feses padat."
        },
        {
            question: "9. What is the correct order of the food pathway through the digestive tract?",
            options: ["A. Mouth ➔ Esophagus ➔ Stomach ➔ Small Intestine ➔ Large Intestine ➔ Rectum ➔ Anus", "B. Mouth ➔ Stomach ➔ Esophagus ➔ Large Intestine ➔ Small Intestine ➔ Anus", "C. Esophagus ➔ Mouth ➔ Stomach ➔ Small Intestine ➔ Rectum ➔ Anus", "D. Mouth ➔ Esophagus ➔ Small Intestine ➔ Stomach ➔ Large Intestine ➔ Anus"],
            correct: 0,
            explanation: "Urutan alur makanan yang benar dimulai dari mulut, melewati kerongkongan, lambung, usus halus, usus besar, rektum, dan dikeluarkan melalui anus."
        },
        {
            question: "10. Which part of the digestive system temporarily stores solid waste (stool) before it leaves the body?",
            options: ["A. Pancreas", "B. Liver", "C. Rectum", "D. Esophagus"],
            correct: 2,
            explanation: "Rektum (Rectum) adalah saluran penampungan sementara bagi kotoran/feses sebelum dikeluarkan melalui anus."
        }
    ];

    // Circulatory quiz data
    const quizDataCirculatory = [
        {
            question: "1. What is the primary function of the circulatory system?",
            options: ["A. To digest food and absorb nutrients", "B. To pump and transport blood carrying oxygen and nutrients to cells", "C. To control body posture and balance", "D. To filter air before it reaches the lungs"],
            correct: 1,
            explanation: "Fungsi utama sistem peredaran darah adalah memompa serta mengalirkan darah yang membawa oksigen, nutrisi, dan hormon ke seluruh tubuh."
        },
        {
            question: "2. Which blood vessels carry oxygen-rich blood AWAY from the heart to the rest of the body?",
            options: ["A. Veins", "B. Capillaries", "C. Arteries", "D. Alveoli"],
            correct: 2,
            explanation: "Pembuluh darah Arteri membawa darah kaya oksigen keluar / menjauhi (away) dari jantung menuju ke seluruh tubuh."
        },
        {
            question: "3. What component of blood is responsible for carrying oxygen throughout the body?",
            options: ["A. White Blood Cells (WBC)", "B. Platelets", "C. Plasma", "D. Red Blood Cells (RBC)"],
            correct: 3,
            explanation: "Sel darah merah (Red Blood Cells) mengandung hemoglobin yang mengikat dan mengangkut oksigen ke seluruh tubuh."
        },
        {
            question: "4. How many main chambers does the human heart have?",
            options: ["A. 2", "B. 3", "C. 4", "D. 6"],
            correct: 2,
            explanation: "Jantung manusia memiliki 4 ruang utama: Right Atrium, Right Ventricle, Left Atrium, dan Left Ventricle."
        },
        {
            question: "5. Which heart chamber receives fresh, oxygen-rich blood directly coming back from the lungs?",
            options: ["A. Right Atrium", "B. Left Atrium", "C. Right Ventricle", "D. Left Ventricle"],
            correct: 1,
            explanation: "Serambi kiri (Left Atrium) menerima darah yang baru selesai mengikat oksigen segar dari paru-paru."
        },
        {
            question: "6. What is the main function of the heart valves?",
            options: ["A. To pump oxygen directly into the cells", "B. To stop red blood cells from producing waste", "C. To keep blood flowing in one direction and prevent backflow", "D. To mix oxygen-rich blood with oxygen-poor blood"],
            correct: 2,
            explanation: "Katup jantung (valves) berfungsi memastikan darah mengalir searah dan mencegah darah mengalir kembali ke ruang sebelumnya."
        },
        {
            question: "7. Look at the simplified diagram: [ Right Ventricle ] ➔ [ 1. ??? ] ➔ [ Lungs ] ➔ [ 2. ??? ] ➔ [ Left Atrium ]. Which blood vessels fill in numbers 1 and 2 correctly for Pulmonary Circulation?",
            options: ["A. 1: Aorta | 2: Veins", "B. 1: Pulmonary Artery | 2: Pulmonary Vein", "C. 1: Capillaries | 2: Aorta", "D. 1: Pulmonary Vein | 2: Pulmonary Artery"],
            correct: 1,
            explanation: "Peredaran darah kecil (Pulmonary Circulation): darah dari bilik kanan (RV) mengalir melalui Pulmonary Artery menuju paru-paru, lalu kembali melalui Pulmonary Vein ke serambi kiri (LA)."
        },
        {
            question: "8. Look at the diagram: (A) Entire Body Cells ➔ (B) Veins ➔ (C) Left Ventricle ➔ (D) Aorta & Arteries ➔ (E) Right Atrium. What is the correct flow order for Systemic Circulation?",
            options: ["A. (C) ➔ (D) ➔ (A) ➔ (B) ➔ (E)", "B. (E) ➔ (A) ➔ (B) ➔ (D) ➔ (C)", "C. (C) ➔ (B) ➔ (A) ➔ (D) ➔ (E)", "D. (D) ➔ (C) ➔ (E) ➔ (B) ➔ (A)"],
            correct: 0,
            explanation: "Peredaran darah besar (Systemic Circulation): LV (C) ➔ Aorta & Arteries (D) ➔ Entire Body (A) ➔ Veins (B) ➔ Right Atrium (E)."
        },
        {
            question: "9. Where in the circulatory system does the actual exchange of oxygen, nutrients, and waste take place between blood and body cells?",
            options: ["A. Aorta", "B. Capillaries", "C. Veins", "D. Heart Valves"],
            correct: 1,
            explanation: "Kapiler (Capillaries) adalah pembuluh darah terkecil dan tertipis tempat terjadinya pertukaran nutrisi, oksigen, dan zat sisa dengan sel-sel tubuh."
        },
        {
            question: "10. What happens during Pulmonary Circulation (Peredaran Darah Kecil)?",
            options: ["A. Oxygen-rich blood is pumped to the legs and arms", "B. Oxygen-poor blood is pumped to the lungs to drop off CO₂ and pick up O₂", "C. Nutrients from food are absorbed into the large intestine", "D. White blood cells are pumped to fight infections in the stomach"],
            correct: 1,
            explanation: "Peredaran darah kecil bertugas membawa darah kaya CO₂ ke paru-paru untuk melepaskan CO₂ dan mengambil O₂ segar."
        }
    ];

    // Excretory quiz data
    const quizDataExcretory = [
        {
            question: "1. What is the main function of the excretory system?",
            options: ["A. To take in oxygen and release carbon dioxide", "B. To filter waste, excess water, and toxins from the blood", "C. To pump blood and transport nutrients to cells", "D. To break down solid food into basic nutrients"],
            correct: 1,
            explanation: "Fungsi utama sistem ekskresi (ginjal) adalah menyaring zat sisa metabolisme, kelebihan air, dan racun dari darah untuk dikeluarkan dalam bentuk urine."
        },
        {
            question: "2. Which blood vessel carries blood containing waste into the kidneys for filtering?",
            options: ["A. Vena Cava", "B. Renal Vein", "C. Renal Artery", "D. Pulmonary Vein"],
            correct: 2,
            explanation: "Arteri ginjal (Renal Artery) bertugas membawa darah yang mengandung zat sisa dari Aorta masuk ke dalam ginjal untuk disaring."
        },
        {
            question: "3. What are the tiny filtering units inside the kidneys that clean the blood and form urine called?",
            options: ["A. Alveoli", "B. Nephrons", "C. Neurons", "D. Villi"],
            correct: 1,
            explanation: "Nefron (Nephrons) adalah jutaan unit penyaring mikroskopis di dalam ginjal yang menyaring darah, menyerap kembali zat berguna, dan menghasilkan urine."
        },
        {
            question: "4. What is the role of the Ureters in the excretory system?",
            options: ["A. To store urine temporarily before release", "B. To filter out urea directly from the stomach", "C. To carry urine from the kidneys down to the bladder", "D. To pump clean blood back into the heart"],
            correct: 2,
            explanation: "Ureter adalah dua saluran pipa yang menyalurkan urine dari ginjal menuju ke kantung kemih (bladder)."
        },
        {
            question: "5. Which of the following shows the correct path of urine from creation to excretion?",
            options: ["A. Kidney ➔ Ureter ➔ Bladder ➔ Urethra", "B. Bladder ➔ Kidney ➔ Urethra ➔ Ureter", "C. Urethra ➔ Bladder ➔ Ureter ➔ Kidney", "D. Kidney ➔ Urethra ➔ Bladder ➔ Ureter"],
            correct: 0,
            explanation: "Alur pembentukan dan pengeluaran urine yang benar dimulai dari ginjal (Kidney), mengalir lewat saluran Ureter, ditampung di kantung kemih (Bladder), dan dikeluarkan melalui Urethra."
        }
    ];

    let currentQuizData = quizDataNervous;

    let currentQuestionIndex = 0;
    let score = 0;
    let answerRevealed = false;

    // Elements
    const quizProgress = document.getElementById('quiz-progress');
    const quizQuestionContainer = document.getElementById('quiz-question-container');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizFeedbackIcon = document.getElementById('quiz-feedback-icon');
    const quizFeedbackText = document.getElementById('quiz-feedback-text');
    const quizExplanation = document.getElementById('quiz-explanation');
    const quizNextBtn = document.getElementById('quiz-next-btn');
    const quizResult = document.getElementById('quiz-result');
    const quizScore = document.getElementById('quiz-score');
    const quizRestartBtn = document.getElementById('quiz-restart-btn');

    function loadQuestion() {
        answerRevealed = false;
        quizFeedback.classList.add('hidden');
        quizOptions.innerHTML = '';
        
        const currentQ = currentQuizData[currentQuestionIndex];
        quizProgress.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuizData.length}`;
        quizQuestion.textContent = currentQ.question;

        currentQ.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.addEventListener('click', () => checkAnswer(index, btn));
            quizOptions.appendChild(btn);
        });
    }

    function checkAnswer(selectedIndex, selectedBtn) {
        if (answerRevealed) return;
        answerRevealed = true;

        const currentQ = currentQuizData[currentQuestionIndex];
        const optionsBtns = document.querySelectorAll('.quiz-option');
        
        // Disable all buttons
        optionsBtns.forEach(btn => btn.disabled = true);

        if (selectedIndex === currentQ.correct) {
            selectedBtn.classList.add('correct');
            score++;
            quizFeedbackText.textContent = "✅ Correct!";
            quizFeedback.className = "correct-feedback";
        } else {
            selectedBtn.classList.add('incorrect');
            optionsBtns[currentQ.correct].classList.add('correct');
            quizFeedbackText.textContent = "❌ Incorrect";
            quizFeedback.className = "incorrect-feedback";
        }

        quizExplanation.innerHTML = `<strong>Pembahasan:</strong> ${currentQ.explanation}`;
        quizFeedback.classList.remove('hidden');

        if (currentQuestionIndex === currentQuizData.length - 1) {
            quizNextBtn.textContent = "See Results ➔";
        }
    }

    if (quizNextBtn) {
        quizNextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        });
    }

    function showResults() {
        quizProgress.classList.add('hidden');
        quizQuestionContainer.classList.add('hidden');
        quizFeedback.classList.add('hidden');
        
        quizResult.classList.remove('hidden');
        quizScore.textContent = score;
    }

    if (quizRestartBtn) {
        quizRestartBtn.addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;
            quizResult.classList.add('hidden');
            quizProgress.classList.remove('hidden');
            quizQuestionContainer.classList.remove('hidden');
            loadQuestion();
        });
    }

    // Initialize quiz when opening the modal for the first time
    if (openQuizBtns.length > 0) {
        openQuizBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const quizType = btn.getAttribute('data-quiz');
                
                if (quizType === 'nervous') {
                    currentQuizData = quizDataNervous;
                } else if (quizType === 'respiratory') {
                    currentQuizData = quizDataRespiratory;
                } else if (quizType === 'digestive') {
                    currentQuizData = quizDataDigestive;
                } else if (quizType === 'circulatory') {
                    currentQuizData = quizDataCirculatory;
                } else if (quizType === 'excretory') {
                    currentQuizData = quizDataExcretory;
                }

                currentQuestionIndex = 0;
                score = 0;
                
                quizResult.classList.add('hidden');
                quizProgress.classList.remove('hidden');
                quizQuestionContainer.classList.remove('hidden');
                quizFeedback.classList.add('hidden');
                
                loadQuestion();
                quizModal.classList.add('active');
            });
        });
    }
    // Slide Navigation Logic
    const navBtns = document.querySelectorAll('.nav-btn');
    const slides = document.querySelectorAll('.slide');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active-slide');
            });
            
            // Show target slide
            const targetSlide = document.getElementById(targetId);
            if (targetSlide) {
                targetSlide.classList.add('active-slide');
                // Scroll to top when changing slides
                window.scrollTo(0, 0);
            }
        });
    });
});
