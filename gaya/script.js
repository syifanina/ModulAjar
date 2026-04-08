const TOTAL = 7;
let current = 0;

const slides = Array.from(document.querySelectorAll('.slide'));
const counter = document.getElementById('counter');

function goTo(index) {
  if (index < 0 || index >= TOTAL) return;

  // Exit current
  const cur = slides[current];
  cur.classList.remove('active');
  cur.classList.add('exit');
  setTimeout(() => cur.classList.remove('exit'), 420);

  // Enter next
  current = index;
  const next = slides[current];
  next.style.transform = 'translateX(70px)';
  next.style.opacity = '0';
  next.style.visibility = 'visible';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      next.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      next.style.transform = 'translateX(0)';
      next.style.opacity = '1';
    });
  });
  setTimeout(() => {
    next.style.transition = '';
    next.style.transform = '';
    next.style.opacity = '';
    next.style.visibility = '';
    next.classList.add('active');
  }, 420);

  if (counter) counter.textContent = `${current + 1} / ${TOTAL}`;
}

// Keyboard support
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
});
