/**
 * Saurabh Raut Portfolio - Main JavaScript
 * Interactive functionality: Project rendering, filtering, navbar scroll spy,
 * mobile drawer toggle, copy to clipboard, and contact handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================================================
  // Project Data (Exact 6 projects from index.html with authentic links)
  // ============================================================================
  const PROJECTS = [
    {
      id: "supermarket-sales",
      category: "analytics",
      tag: "IBM SkillsBuild Project",
      title: "Supermarket Sales Analytics Dashboard",
      description: "Comprehensive end-to-end analytics dashboard analyzing branch revenue trends, customer ratings, gross income, product line performance, and payment methods with rich data visualizations.",
      tools: ["Python", "Streamlit", "Pandas", "Plotly", "EDA"],
      github: "https://github.com/Saurabhraut24/supermarket-sales-analytics",
      demo: "https://supermarket-sales-analytics-hq5hhidaobpoagh5r2byrf.streamlit.app/",
      demoLabel: "Live Streamlit App"
    },
    {
      id: "email-classifier",
      category: "ai",
      tag: "Infosys Springboard 6.0",
      title: "AI-Powered Smart Email Classifier for Enterprises",
      description: "Enterprise-grade intelligent email classification and priority triage pipeline utilizing fine-tuned DistilBERT models with high F1-score evaluation and FastAPI endpoints.",
      tools: ["DistilBERT", "NLP", "FastAPI", "Transformers", "PyTorch"],
      github: "", // Kept unlinked as per specific instruction
      demo: "",   // Kept unlinked as per specific instruction
      note: "Internal enterprise project (Evaluation & API integration completed)."
    },
    {
      id: "image-colorization",
      category: "ai",
      tag: "Computer Vision & Deep Learning",
      title: "Image Restoration & Colorization Tool",
      description: "AI-driven image processing web app that restores damaged, degraded, or monochrome vintage photos using deep convolutional colorization models and OpenCV enhancement filters.",
      tools: ["Python", "Streamlit", "OpenCV", "Deep Learning", "NumPy"],
      github: "https://github.com/Saurabhraut24/Image-Restoration-Colorization-System",
      demo: "https://image-restoration-colorization-system.streamlit.app/",
      demoLabel: "Live Demo"
    },
    {
      id: "co2-dashboard",
      category: "analytics",
      tag: "Tableau & 1M1B Green Skills",
      title: "CO2 Footprint Reduction Dashboard",
      description: "Executive sustainability dashboard featuring carbon footprint KPI metrics, reduction trend curves, participant leaderboard rankings, and dynamic multi-dimensional filters.",
      tools: ["Tableau", "Data Analytics", "KPI Dashboards", "Data Viz"],
      github: "",
      demo: "https://public.tableau.com/app/profile/saurabh.raut5322/viz/CO2_Reduction_Dashboard/COFootprintReductionDashboard?publish=yes",
      demoLabel: "Live Tableau Viz"
    },
    {
      id: "smart-lighting",
      category: "iot",
      tag: "IoT & Embedded Systems",
      title: "IoT-Based Smart Lighting Control using ESP32 & MQTT",
      description: "Smart automation system controlling 26 WS2812 addressable RGB LEDs through a Node-RED responsive dashboard over HiveMQ MQTT broker, validated via Wokwi ESP32 hardware simulation.",
      tools: ["ESP32", "MQTT", "Node-RED", "Wokwi Simulation", "C++"],
      github: "https://github.com/Saurabhraut24/IoT-Based-Smart-Lighting-Control-using-ESP32-and-MQTT",
      demo: "https://wokwi.com/projects/477145959232628737",
      demoLabel: "Wokwi Simulation"
    },
    {
      id: "emergency-guardian",
      category: "ai",
      tag: "AI & Mission-Critical Web",
      title: "AI Emergency Guardian",
      description: "High-reliability emergency assistance web platform featuring multilingual voice recognition (English, Hindi, Marathi) for rapid medical, disaster, and crisis guidance.",
      tools: ["React", "Vite", "Web Speech API", "AI Voice", "Render"],
      github: "https://github.com/Saurabhraut24/AI-Emergency-Assistant-Guardian-AI",
      demo: "https://ai-emergency-assistant-guardian-ai.onrender.com/",
      demoLabel: "Live Web App"
    }
  ];

  // SVG Icons
  const GITHUB_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`;
  const EXTERNAL_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;
  const LOCK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;

  // Helper to escape HTML safely
  const escapeHTML = (str) => {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  };

  // ============================================================================
  // Render Projects Function
  // ============================================================================
  const projectGrid = document.getElementById('project-grid');
  
  function renderProjects(filter = 'all') {
    if (!projectGrid) return;
    
    const filtered = filter === 'all' 
      ? PROJECTS 
      : PROJECTS.filter(p => p.category === filter);

    projectGrid.innerHTML = filtered.map((p, index) => {
      const formattedIndex = String(index + 1).padStart(2, '0');
      
      let actionButtons = '';
      if (p.demo) {
        actionButtons += `
          <a class="btn btn-primary btn-sm" href="${p.demo}" target="_blank" rel="noopener noreferrer">
            ${EXTERNAL_ICON}
            <span>${p.demoLabel || 'Live Demo'}</span>
          </a>
        `;
      }
      if (p.github) {
        actionButtons += `
          <a class="btn btn-outline btn-sm" href="${p.github}" target="_blank" rel="noopener noreferrer">
            ${GITHUB_ICON}
            <span>GitHub Code</span>
          </a>
        `;
      }
      if (p.note) {
        actionButtons += `
          <div class="project-note">
            ${LOCK_ICON}
            <span>${escapeHTML(p.note)}</span>
          </div>
        `;
      }

      return `
        <article class="project-card" data-category="${p.category}">
          <div class="card-header-meta">
            <span class="project-badge">${escapeHTML(p.tag)}</span>
            <span class="project-index">PROJ_${formattedIndex}</span>
          </div>
          <h3>${escapeHTML(p.title)}</h3>
          <p class="description">${escapeHTML(p.description)}</p>
          <div class="project-tools">
            ${p.tools.map(tool => `<span class="tool-tag">${escapeHTML(tool)}</span>`).join('')}
          </div>
          <div class="project-actions">
            ${actionButtons}
          </div>
        </article>
      `;
    }).join('');
  }

  // Initial render of all projects
  renderProjects('all');

  // Project Filter Tabs Handling
  const projectFilterButtons = document.querySelectorAll('.project-filters .filter-btn');
  projectFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter') || 'all';
      renderProjects(filterValue);
    });
  });

  // ============================================================================
  // Skills Filtering
  // ============================================================================
  const skillCards = document.querySelectorAll('.skill-category-card');
  const skillFilterButtons = document.querySelectorAll('.skills-filter-nav .filter-btn');

  skillFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-skill-filter');

      skillCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-skill-cat') === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ============================================================================
  // Header Navbar Scroll & ScrollSpy
  // ============================================================================
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow effect on scroll
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active link update
    let currentSection = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // ============================================================================
  // Mobile Drawer Toggle
  // ============================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // ============================================================================
  // Copy to Clipboard Buttons
  // ============================================================================
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const textToCopy = button.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = button.innerHTML;
          button.innerHTML = `<span>Copied!</span>`;
          button.style.borderColor = '#F97316';
          button.style.color = '#F97316';

          setTimeout(() => {
            button.innerHTML = originalText;
            button.style.borderColor = '';
            button.style.color = '';
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      }
    });
  });

  // ============================================================================
  // Back to Top Button
  // ============================================================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================================================
  // Interactive Contact Form Handling
  // ============================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      if (formStatus) {
        formStatus.textContent = "Sending your message...";
        formStatus.className = "form-status success";
        formStatus.style.display = "block";
      }

      const formData = new FormData(contactForm);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
      .then((res) => {
        if (res.ok) {
          formStatus.textContent = "Thank you! Your message has been received.";
          contactForm.reset();
        } else {
          throw new Error("Fallback to mailto");
        }
      })
      .catch(() => {
        const mailtoUrl = `mailto:saurabhraut24505@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent("Sender: " + name + " (" + email + ")\n\n" + message)}`;
        window.location.href = mailtoUrl;
        formStatus.textContent = "Thank you! Opening your email client to dispatch...";
        contactForm.reset();
      });
    });
  }
});

