/**
 * ==========================================================================
 * عدي معمر عيسى - ملف الجافاسكريبت التفاعلي (script.js)
 * التأثيرات: Typing Effect, Tech Canvas, Smooth Scroll, Skills Observer,
 * Form Validation, Mobile Menu, Project Modal
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. تأثير الكتابة الآلية (Typing Effect)
  initTypingEffect();

  // 2. شبكة الجزيئات والخطوط التقنية التفاعلية (Tech Canvas)
  initTechCanvas();

  // 3. شريط التنقل المتغير وقائمة الجوال (Navbar & Mobile Menu)
  initNavbar();

  // 4. مراقبة قسم المهارات وتحريك أشرطة التقدم (Skills Intersection Observer)
  initSkillsProgress();

  // 5. التحقق من نموذج التواصل ومعالجته (Contact Form Validation)
  initContactForm();

  // 6. زر العودة للأعلى (Back To Top Button)
  initBackToTop();
});

/* ==========================================================================
   1. تأثير الكتابة الآلية (Typing Effect)
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const phrases = [
    'أصمم وأطور مواقع ويب عصرية تجمع بين الجمال والأداء.',
    'واجهات تفاعلية متجاوبة بدقة متناهية لكافة الشاشات.',
    'كتابة أكواد نظيفة وسريعة وفق أحدث معايير الويب.',
    'تحويل أفكارك البرمجية إلى واقع رقمي متفوق.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // الانتظار بعد اكتمال الجملة
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   2. شبكة الجزيئات والخطوط التقنية التفاعلية (Tech Canvas)
   ========================================================================== */
function initTechCanvas() {
  const canvas = document.getElementById('techCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 65;
  const maxDistance = 120;

  let mouse = {
    x: null,
    y: null,
    radius: 140
  };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.8 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(6, 182, 212,' : 'rgba(124, 58, 237,';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // التفاعل مع حركة الماوس
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = dx / distance;
          const directionY = dy / distance;
          this.x -= directionX * force * 2;
          this.y -= directionY * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.7)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // ربط الجزيئات القريبة بخطوط شبكية خافتة
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. شريط التنقل المتغير وقائمة الجوال (Navbar & Mobile Menu)
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // مراقبة التمرير لتغيير خلفية الناف بار وتحديد القسم النشط
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // فتح وإغلاق القائمة في شاشات الجوال
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // إغلاق القائمة عند النقر على أي رابط
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   4. مراقبة قسم المهارات وتحريك أشرطة التقدم (Skills Intersection Observer)
   ========================================================================== */
function initSkillsProgress() {
  const skillCards = document.querySelectorAll('.skill-card');
  if (!skillCards.length) return;

  const observerOptions = {
    threshold: 0.3
  };

  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const percent = card.getAttribute('data-percent');
        const fillBar = card.querySelector('.progress-bar-fill');
        if (fillBar) {
          fillBar.style.width = `${percent}%`;
        }
        observer.unobserve(card);
      }
    });
  }, observerOptions);

  skillCards.forEach(card => skillsObserver.observe(card));
}

/* ==========================================================================
   5. التحقق من نموذج التواصل ومعالجته (Contact Form Validation)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submitBtn');
  const successAlert = document.getElementById('successAlert');

  // التحقق من صحة البريد الإلكتروني
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // إزالة رسائل الخطأ عند الكتابة
  [nameInput, emailInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.closest('.form-group').classList.remove('has-error');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    // فحص الاسم
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.closest('.form-group').classList.add('has-error');
      hasError = true;
    } else {
      nameInput.closest('.form-group').classList.remove('has-error');
    }

    // فحص البريد
    if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
      emailInput.closest('.form-group').classList.add('has-error');
      hasError = true;
    } else {
      emailInput.closest('.form-group').classList.remove('has-error');
    }

    // فحص الرسالة
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.closest('.form-group').classList.add('has-error');
      hasError = true;
    } else {
      messageInput.closest('.form-group').classList.remove('has-error');
    }

    if (hasError) return;

    // حالة الإرسال البرمجية
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>جاري إرسال الرسالة...</span>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      successAlert.style.display = 'flex';

      // إخفاء التنبيه بعد 6 ثوانٍ
      setTimeout(() => {
        successAlert.style.display = 'none';
      }, 6000);
    }, 1200);
  });
}

/* ==========================================================================
   6. زر العودة للأعلى (Back To Top Button)
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   7. تفاصيل المشاريع والنافذة المنبثقة (Project Modal)
   ========================================================================== */
const projectsData = {
  1: {
    title: 'منصة استوديو الويب الإبداعي',
    image: 'images/project1.jpg',
    tags: ['HTML5', 'CSS3 / Grid & Flex', 'JavaScript ES6+', 'UI/UX Design'],
    description: 'مشروع متكامل يمثل واجهة وكالة رقمية حديثة، يدمج بين التصميم المظلم ذو الطابع الغامض والتقني مع تأثيرات حركة متقنة وسلسة للغاية. يتميز بسرعة تحميل فائقة وتوافق كامل مع جميع الشاشات والأجهزة الذكية.',
    features: [
      'تصميم داكن فخم مع تدرجات نيون خافتة ومريحة للعين',
      'بنية HTML دلالية نظيفة مع دعم كامل لمحركات البحث',
      'تأثيرات حركية خفيفة بدون أي بطء في المتصفح',
      'تجربة تصفح تفاعلية مع معرض للأعمال السابقة'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/oday-moamer'
  },
  2: {
    title: 'متجر التقنية الحديثة للتجارة الإلكترونية',
    image: 'images/project2.jpg',
    tags: ['Modern CSS', 'JavaScript', 'Responsive UI', 'E-Commerce UX'],
    description: 'واجهة متجر إلكتروني متقدم متخصص في عرض أحدث المنتجات التقنية والأجهزة الذكية. صُمم بأسلوب عصري يركز على تسهيل عملية الشراء والتنقل بين المنتجات وتوفير تجربة مستخدم سلسة وخالية من التعقيد.',
    features: [
      'عرض شبكي ديناميكي لبطاقات المنتجات مع تأثيرات Hover ثلاثية الأبعاد',
      'سلة تسوق تفاعلية وفلترة للمنتجات بدون إعادة تحميل الصفحة',
      'توافق بنسبة 100% مع الهواتف الذكية والأجهزة اللوحية',
      'تصميم مريح يبرز تفاصيل كل منتج وأسعاره بوضوح'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/oday-moamer'
  },
  3: {
    title: 'لوحة تحكم سحابية لإدارة البيانات (SaaS Dashboard)',
    image: 'images/project3.jpg',
    tags: ['SaaS Design', 'JavaScript', 'Data Visualization', 'Clean Architecture'],
    description: 'واجهة لوحة تحكم سحابية متطورة مصممة لمراقبة مؤشرات الأداء الحيوية، وتتبع حركة البيانات والتحليلات الإحصائية لحظة بلحظة. تتميز بتنظيم عالي للمعلومات وتباين بصري دقيق يمنع إجهاد العين أثناء العمل لفترات طويلة.',
    features: [
      'مخططات بيانية تفاعلية وبطاقات قياس رقمية منسقة',
      'قائمة جانبية متجاوبة وقابلة للطي في الهواتف',
      'نظام ألوان داكن معاصر يحاكي أشهر لوحات التحكم العالمية',
      'كود برمجي معياري يسهل ربطه مع أي خادم أو API'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/oday-moamer'
  }
};

window.openProjectModal = function(id) {
  const project = projectsData[id];
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');

  const tagsHtml = project.tags.map(tag => `<span class="modal-tech-tag">${tag}</span>`).join('');
  const featuresHtml = project.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('');

  modalBody.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="modal-preview-img" onerror="this.src='images/project${id}.jpg'">
    <h3 class="modal-title">${project.title}</h3>
    <div class="modal-techs">${tagsHtml}</div>
    <p class="modal-description">${project.description}</p>
    <div class="modal-features">
      <h5>أهم مميزات المشروع:</h5>
      <ul>${featuresHtml}</ul>
    </div>
    <div class="modal-actions">
      <a href="https://wa.me/967782616979?text=${encodeURIComponent('مرحباً أستاذ عدي، أود الاستفسار حول مشروع ' + project.title)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <i class="fa-brands fa-whatsapp"></i>
        <span>طلب مشروع مماثل</span>
      </a>
      <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        <i class="fa-brands fa-github"></i>
        <span>عرض الكود في GitHub</span>
      </a>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// إغلاق النافذة المنبثقة عند الضغط على زر ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeProjectModal();
  }
});
