// Particles.js Configuration
const particlesJS = window.particlesJS // Declare the particlesJS variable
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#00ff88",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00ff88",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
})

// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)"
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)"
  }
})

// Animate skill bars on scroll
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-progress")
      skillBars.forEach((bar) => {
        const width = bar.getAttribute("data-width")
        bar.style.width = width + "%"
      })
    }
  })
}, observerOptions)

const skillsSection = document.querySelector(".skills")
if (skillsSection) {
  observer.observe(skillsSection)
}

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

// Observe elements for animation
document.querySelectorAll(".project-card, .skill-category, .contact-method").forEach((el) => {
  animateOnScroll.observe(el)
})

// EmailJS Configuration
const emailjs = window.emailjs // Declare the emailjs variable
;(() => {
  emailjs.init("YOUR_PUBLIC_KEY") // Reemplaza con tu clave pública de EmailJS
})()

// Contact form handling with EmailJS
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault()

    const submitBtn = this.querySelector('button[type="submit"]')
    const formStatus = document.getElementById("formStatus") || createFormStatus()
    const formData = new FormData(this)

    // Disable submit button and show loading
    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
    showFormStatus("Enviando mensaje...", "loading")

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        "YOUR_SERVICE_ID", // Reemplaza con tu Service ID
        "YOUR_TEMPLATE_ID", // Reemplaza con tu Template ID
        {
          from_name: formData.get("name"),
          from_email: formData.get("email"),
          message: formData.get("message"),
          to_email: "paterninamercadomateo8@gmail.com",
        },
      )

      if (result.status === 200) {
        showFormStatus("¡Mensaje enviado exitosamente! Te responderé pronto.", "success")
        this.reset()

        // Add success animation
        contactForm.style.transform = "scale(1.02)"
        setTimeout(() => {
          contactForm.style.transform = "scale(1)"
        }, 200)
      }
    } catch (error) {
      console.error("Error sending email:", error)
      showFormStatus("Error al enviar el mensaje. Por favor, intenta de nuevo o contáctame directamente.", "error")
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje'
    }
  })
}

// Create form status element if it doesn't exist
function createFormStatus() {
  const formStatus = document.createElement("div")
  formStatus.id = "formStatus"
  formStatus.className = "form-status"
  contactForm.appendChild(formStatus)
  return formStatus
}

// Show form status with animation
function showFormStatus(message, type) {
  const formStatus = document.getElementById("formStatus") || createFormStatus()
  formStatus.textContent = message
  formStatus.className = `form-status ${type} show`

  // Hide after 5 seconds for success/error messages
  if (type !== "loading") {
    setTimeout(() => {
      formStatus.classList.remove("show")
    }, 5000)
  }
}

// Enhanced project cards animation
const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("animate-in")
        }, index * 200)
      }
    })
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  },
)

// Observe project cards for staggered animation
document.querySelectorAll(".project-card").forEach((card) => {
  projectObserver.observe(card)
})

// Add dynamic hover effects to project cards
document.querySelectorAll(".project-card").forEach((card, index) => {
  card.addEventListener("mouseenter", function () {
    // Add subtle rotation based on card position
    const rotation = index % 2 === 0 ? "rotateY(5deg)" : "rotateY(-5deg)"
    this.style.transform = `translateY(-15px) rotateX(5deg) ${rotation}`

    // Add glow effect to nearby cards
    const allCards = document.querySelectorAll(".project-card")
    allCards.forEach((otherCard, otherIndex) => {
      if (Math.abs(index - otherIndex) === 1) {
        otherCard.style.boxShadow = "0 5px 15px rgba(0, 255, 136, 0.1)"
      }
    })
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = ""

    // Remove glow from nearby cards
    document.querySelectorAll(".project-card").forEach((otherCard) => {
      otherCard.style.boxShadow = ""
    })
  })
})

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "var(--primary-color)" : "var(--secondary-color)"};
        color: var(--bg-primary);
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroSubtitle = document.querySelector(".hero-subtitle")
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent
    typeWriter(heroSubtitle, originalText, 150)
  }
})

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Add glitch effect to random elements occasionally
function addRandomGlitch() {
  const elements = document.querySelectorAll(".project-title, .category-title")
  const randomElement = elements[Math.floor(Math.random() * elements.length)]

  if (randomElement) {
    randomElement.style.animation = "glitch 0.3s ease-in-out"
    setTimeout(() => {
      randomElement.style.animation = ""
    }, 300)
  }
}

// Trigger random glitch effect every 10 seconds
setInterval(addRandomGlitch, 10000)

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Console easter egg
console.log(`
    ╔══════════════════════════════════════╗
    ║                                      ║
    ║        ¡Hola, desarrollador!         ║
    ║                                      ║
    ║   Si estás viendo esto, significa    ║
    ║   que tienes curiosidad por el       ║
    ║   código. ¡Me gusta eso!             ║
    ║                                      ║
    ║   Contacta conmigo si quieres        ║
    ║   colaborar en algún proyecto.       ║
    ║                                      ║
    ║   - Mateo Paternina                  ║
    ║                                      ║
    ╚══════════════════════════════════════╝
`)
