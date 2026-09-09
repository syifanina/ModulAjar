document.addEventListener('DOMContentLoaded', () => {
    // ---- Slide Navigation ----
    const btnSlide1 = document.getElementById('btn-slide-1');
    const btnSlide2 = document.getElementById('btn-slide-2');
    const btnSlide3 = document.getElementById('btn-slide-3');

    const slide1 = document.getElementById('slide-1');
    const slide2 = document.getElementById('slide-2');
    const slide3 = document.getElementById('slide-3');

    function setActiveSlide(activeBtn, activeSlide) {
        [btnSlide1, btnSlide2, btnSlide3].forEach(btn => btn.classList.remove('active'));
        [slide1, slide2, slide3].forEach(slide => slide.classList.remove('active-slide'));

        activeBtn.classList.add('active');
        activeSlide.classList.add('active-slide');
    }

    btnSlide1.addEventListener('click', () => setActiveSlide(btnSlide1, slide1));
    btnSlide2.addEventListener('click', () => setActiveSlide(btnSlide2, slide2));
    btnSlide3.addEventListener('click', () => setActiveSlide(btnSlide3, slide3));

    // ---- Slide 1: Reveal Names ----
    const slide1Cards = document.querySelectorAll('#slide-1 .shape-card');
    slide1Cards.forEach(card => {
        card.addEventListener('click', function (e) {
            createRipple(e, this);
            this.classList.toggle('revealed');

            const labelSpan = this.querySelector('.shape-label');
            if (this.classList.contains('revealed')) {
                labelSpan.textContent = this.dataset.shape;
                labelSpan.style.animation = 'none';
                labelSpan.offsetHeight;
                labelSpan.style.animation = 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            } else {
                labelSpan.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    if (!this.classList.contains('revealed')) {
                        labelSpan.textContent = '';
                    }
                }, 300);
            }
        });
    });

    // ---- Slide 3: Formula & Animations ----
    const formulaCards = document.querySelectorAll('.formula-card');

    formulaCards.forEach(card => {
        const btnKeliling = card.querySelector('.btn-keliling');
        const btnLuas = card.querySelector('.btn-luas');
        const display = card.querySelector('.formula-display');
        const svgAnim = card.querySelector('.anim-svg');

        btnKeliling.addEventListener('click', () => {
            // Reset state
            btnLuas.classList.remove('active-luas');
            svgAnim.classList.remove('anim-luas');

            // Toggle Keliling
            if (btnKeliling.classList.contains('active-keliling')) {
                btnKeliling.classList.remove('active-keliling');
                svgAnim.classList.remove('anim-keliling');
                display.textContent = 'Pilih tombol di atas';
                display.style.color = 'var(--accent)';
            } else {
                btnKeliling.classList.add('active-keliling');
                svgAnim.classList.add('anim-keliling');
                display.textContent = card.dataset.keliling;
                display.style.color = '#ec4899'; // Pink

                // pop animation
                display.style.transform = 'scale(1.1)';
                setTimeout(() => display.style.transform = 'scale(1)', 200);
            }
        });

        btnLuas.addEventListener('click', () => {
            // Reset state
            btnKeliling.classList.remove('active-keliling');
            svgAnim.classList.remove('anim-keliling');

            // Toggle Luas
            if (btnLuas.classList.contains('active-luas')) {
                btnLuas.classList.remove('active-luas');
                svgAnim.classList.remove('anim-luas');
                display.textContent = 'Pilih tombol di atas';
                display.style.color = 'var(--accent)';
            } else {
                btnLuas.classList.add('active-luas');
                svgAnim.classList.add('anim-luas');
                display.textContent = card.dataset.luas;
                display.style.color = '#3b82f6'; // Blue

                // pop animation
                display.style.transform = 'scale(1.1)';
                setTimeout(() => display.style.transform = 'scale(1)', 200);
            }
        });
    });

    // ---- Utilities ----
    function createRipple(event, element) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;

        const rect = element.getBoundingClientRect();

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        const existingRipple = element.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        element.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600);
    }
});

// Dynamic keyframes for text
const style = document.createElement('style');
style.innerHTML = `
@keyframes popIn {
    0% { transform: scale(0.8) translateY(10px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
}
@keyframes fadeOut {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(10px); opacity: 0; }
}
`;
document.head.appendChild(style);
