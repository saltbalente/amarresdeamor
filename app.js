document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('videoCham');
  const btn = document.getElementById('playPauseBtn');
  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.getElementById('mobileMenu');

  // Intentar reproducir automáticamente (algunos navegadores requieren muted)
  if (video) {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        if (btn) btn.textContent = '▶️';
      });
    }
  }

  if (btn && video) {
    btn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        btn.textContent = '⏸';
      } else {
        video.pause();
        btn.textContent = '▶️';
      }
    });
  }

  // Menú móvil solo en móviles
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });

    // Cerrar menú al hacer clic fuera del contenido
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // WhatsApp modal
  const waBtn = document.getElementById('whatsapp-btn');
  const waModal = document.getElementById('whatsapp-modal');
  const waClose = document.querySelector('.whatsapp-modal-close');
  if (waBtn && waModal && waClose) {
    waBtn.addEventListener('click', () => {
      waModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    waClose.addEventListener('click', () => {
      waModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    waModal.addEventListener('click', (e) => {
      if (e.target === waModal) {
        waModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Modales de servicios
  const btnsVerMas = document.querySelectorAll('.btn-vermas');
  const modales = [
    document.getElementById('modal-servicio-1'),
    document.getElementById('modal-servicio-2'),
    document.getElementById('modal-servicio-3'),
    document.getElementById('modal-servicio-4')
  ];
  btnsVerMas.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      if (modales[idx]) {
        modales[idx].classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  modales.forEach(modal => {
    if (!modal) return;
    const closeBtn = modal.querySelector('.modal-servicio-close');
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Modal de puntos físicos (mapa)
  const btnMapaModal = document.getElementById('btn-mapa-modal');
  const modalMapa = document.getElementById('modal-mapa');
  if (btnMapaModal && modalMapa) {
    btnMapaModal.addEventListener('click', () => {
      modalMapa.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    const closeBtn = modalMapa.querySelector('.modal-servicio-close');
    closeBtn.addEventListener('click', () => {
      modalMapa.classList.remove('open');
      document.body.style.overflow = '';
    });
    modalMapa.addEventListener('click', (e) => {
      if (e.target === modalMapa) {
        modalMapa.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Footer accordion
  function initFooterAccordion() {
    const btns = document.querySelectorAll('.footer-accordion-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        // Cierra todos los paneles
        btns.forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          b.nextElementSibling.style.maxHeight = null;
        });
        // Si no estaba abierto, abre este
        if (!expanded) {
          this.setAttribute('aria-expanded', 'true');
          this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 'px';
        }
      });
    });
  }
  initFooterAccordion();
});

// Fondo de partículas ligero
function initParticlesBG() {
  const canvas = document.getElementById('particles-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth;
  let h = window.innerHeight;
  let dpr = window.devicePixelRatio || 1;
  let particles = [];
  const PARTICLE_NUM = Math.min(60, Math.floor(w * h / 9000));
  const RADIUS = 2.2;
  const LINE_DIST = 110;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  function randomParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25
    };
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_NUM; i++) {
      particles.push(randomParticle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    // Líneas
    ctx.save();
    ctx.strokeStyle = 'rgba(212,175,55,0.18)';
    ctx.lineWidth = 1.1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < LINE_DIST) {
          ctx.globalAlpha = 1 - dist / LINE_DIST;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
    // Partículas
    ctx.save();
    ctx.fillStyle = 'rgba(212,175,55,0.38)';
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function update() {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
  }

  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  resize();
  createParticles();
  animate();
  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

initParticlesBG(); 