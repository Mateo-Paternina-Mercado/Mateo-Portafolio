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

// Epic Loader
let loaderProgress = 0
const loader = document.getElementById("epic-loader")
const progressBar = document.querySelector(".loader-progress")
const percentage = document.querySelector(".loader-percentage")
const tips = document.querySelectorAll(".tip")
let currentTip = 0

function updateLoader() {
  loaderProgress += Math.random() * 15 + 5
  if (loaderProgress > 100) loaderProgress = 100

  progressBar.style.width = loaderProgress + "%"
  percentage.textContent = Math.floor(loaderProgress) + "%"

  if (loaderProgress < 100) {
    setTimeout(updateLoader, 200 + Math.random() * 300)
  } else {
    setTimeout(() => {
      loader.classList.add("hidden")
      document.body.classList.add("loaded")
    }, 500)
  }
}

function rotateTips() {
  tips[currentTip].classList.remove("active")
  currentTip = (currentTip + 1) % tips.length
  tips[currentTip].classList.add("active")
}

// Start loader
setTimeout(updateLoader, 500)
setInterval(rotateTips, 2000)

// Matrix Mode
const matrixBtn = document.getElementById("matrix-btn")
let matrixMode = false

matrixBtn.addEventListener("click", toggleMatrixMode)

function toggleMatrixMode() {
  matrixMode = !matrixMode
  document.body.classList.toggle("matrix-mode", matrixMode)
  matrixBtn.classList.toggle("active", matrixMode)

  if (matrixMode) {
    createMatrixRain()
  } else {
    clearMatrixRain()
  }
}

function createMatrixRain() {
  const canvas = document.createElement("canvas")
  canvas.id = "matrix-canvas"
  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.zIndex = "-1"
  canvas.style.pointerEvents = "none"
  document.body.appendChild(canvas)

  const ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}"
  const matrixArray = matrix.split("")

  const fontSize = 10
  const columns = canvas.width / fontSize
  const drops = []

  for (let x = 0; x < columns; x++) {
    drops[x] = 1
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#00ff00"
    ctx.font = fontSize + "px monospace"

    for (let i = 0; i < drops.length; i++) {
      const text = matrixArray[Math.floor(Math.random() * matrixArray.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  const matrixInterval = setInterval(() => {
    if (!matrixMode) {
      clearInterval(matrixInterval)
      return
    }
    drawMatrix()
  }, 35)
}

function clearMatrixRain() {
  const matrixCanvas = document.getElementById("matrix-canvas")
  if (matrixCanvas) {
    matrixCanvas.remove()
  }
}

// Terminal
const terminal = document.getElementById("terminal")
const terminalInput = document.getElementById("terminal-input")
const terminalOutput = document.getElementById("terminal-output")
const openTerminalBtn = document.getElementById("open-terminal")

const commands = {
  help: () => `Comandos disponibles:
- about: Información sobre mí
- projects: Lista de proyectos
- skills: Mis habilidades técnicas
- contact: Información de contacto
- clear: Limpiar terminal
- matrix: Activar/desactivar modo Matrix
- game: Abrir juego Snake
- github: Ver perfil de GitHub
- blog: Ir a la sección blog
- exit: Cerrar terminal`,

  about: () => `Soy Mateo Paternina, desarrollador Full Stack apasionado por crear soluciones innovadoras.
Me especializo en JavaScript, React, Node.js y bases de datos.
¡Siempre buscando nuevos desafíos!`,

  projects: () => `Mis proyectos principales:
1. Dragon Ball Super D&D Character Creator - JavaScript, HTML5, CSS3
2. Proyecto Arcade - React, Node.js, MongoDB  
3. Concesionaria Virtual - Next.js, TypeScript, PostgreSQL`,

  skills: () => `Tecnologías que domino:
Frontend: HTML5, CSS3, JavaScript, React
Backend: Node.js, Python, MongoDB, PostgreSQL
Herramientas: Git, Docker, AWS, Figma`,

  contact: () => `¿Quieres contactarme?
📧 Email: paterninamercadomateo8@gmail.com
🐙 GitHub: github.com/Mateo-Paternina-Mercado
📷 Instagram: @matt.pame`,

  clear: () => "CLEAR",

  matrix: () => {
    toggleMatrixMode()
    return matrixMode ? "Modo Matrix activado 🟢" : "Modo Matrix desactivado ❌"
  },

  game: () => {
    openSnakeGame()
    return "Abriendo Snake Game... 🐍"
  },

  github: () => {
    window.open("https://github.com/Mateo-Paternina-Mercado", "_blank")
    return "Abriendo GitHub... 🚀"
  },

  blog: () => {
    document.getElementById("blog").scrollIntoView({ behavior: "smooth" })
    return "Navegando al blog... 📝"
  },

  exit: () => "EXIT",
}

openTerminalBtn.addEventListener("click", openTerminal)

function openTerminal() {
  terminal.classList.add("active")
  terminalInput.focus()
}

function closeTerminal() {
  terminal.classList.remove("active")
}

terminalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = terminalInput.value.trim().toLowerCase()
    const output =
      commands[command] || `Comando no encontrado: ${command}. Escribe 'help' para ver comandos disponibles.`

    // Add command to output
    const commandLine = document.createElement("div")
    commandLine.className = "terminal-line"
    commandLine.innerHTML = `<span class="terminal-prompt">mateo@portfolio:~$</span><span class="terminal-text">${terminalInput.value}</span>`
    terminalOutput.appendChild(commandLine)

    if (output === "CLEAR") {
      terminalOutput.innerHTML = ""
    } else if (output === "EXIT") {
      closeTerminal()
    } else {
      const outputLine = document.createElement("div")
      outputLine.className = "terminal-line"
      outputLine.innerHTML = `<span class="terminal-text">${output}</span>`
      terminalOutput.appendChild(outputLine)
    }

    terminalInput.value = ""
    terminalOutput.scrollTop = terminalOutput.scrollHeight
  }
})

// Close terminal with Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && terminal.classList.contains("active")) {
    closeTerminal()
  }
  if (e.key === "t" || e.key === "T") {
    if (!terminal.classList.contains("active")) {
      openTerminal()
    }
  }
  if (e.key === "m" || e.key === "M") {
    toggleMatrixMode()
  }
})

// Snake Game
const miniGame = document.getElementById("mini-game")
const gameCanvas = document.getElementById("game-canvas")
const gameScore = document.getElementById("game-score")
const playSnakeBtn = document.getElementById("play-snake")
const gameCloseBtn = document.getElementById("game-close")

const game = {
  canvas: gameCanvas,
  ctx: gameCanvas.getContext("2d"),
  snake: [{ x: 200, y: 200 }],
  direction: { x: 0, y: 0 },
  food: { x: 0, y: 0 },
  score: 0,
  running: false,
  paused: false,
}

playSnakeBtn.addEventListener("click", openSnakeGame)
gameCloseBtn.addEventListener("click", closeSnakeGame)

// Game controls - FIXED VERSION
document.addEventListener("keydown", (e) => {
  // Solo procesar controles si el juego está activo
  if (!miniGame.classList.contains("active")) return

  if (!game.running) return

  // Prevenir el comportamiento por defecto de las flechas
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
    e.preventDefault()
  }

  switch (e.key) {
    case "ArrowUp":
      if (game.direction.y === 0) game.direction = { x: 0, y: -20 }
      break
    case "ArrowDown":
      if (game.direction.y === 0) game.direction = { x: 0, y: 20 }
      break
    case "ArrowLeft":
      if (game.direction.x === 0) game.direction = { x: -20, y: 0 }
      break
    case "ArrowRight":
      if (game.direction.x === 0) game.direction = { x: 20, y: 0 }
      break
    case " ":
      game.paused = !game.paused
      break
  }
})

// Mejorar la función openSnakeGame para dar foco al juego
function openSnakeGame() {
  miniGame.classList.add("active")
  // Dar foco al canvas del juego
  gameCanvas.focus()
  gameCanvas.tabIndex = 0 // Hacer el canvas focuseable
  initGame()
}

// Mejorar la función closeSnakeGame
function closeSnakeGame() {
  miniGame.classList.remove("active")
  game.running = false
  // Remover el foco del canvas
  gameCanvas.blur()
}

// Agregar event listener específico al canvas del juego
gameCanvas.addEventListener("keydown", (e) => {
  if (!game.running) return

  // Prevenir el comportamiento por defecto
  e.preventDefault()
  e.stopPropagation()

  switch (e.key) {
    case "ArrowUp":
      if (game.direction.y === 0) game.direction = { x: 0, y: -20 }
      break
    case "ArrowDown":
      if (game.direction.y === 0) game.direction = { x: 0, y: 20 }
      break
    case "ArrowLeft":
      if (game.direction.x === 0) game.direction = { x: -20, y: 0 }
      break
    case "ArrowRight":
      if (game.direction.x === 0) game.direction = { x: 20, y: 0 }
      break
    case " ":
      game.paused = !game.paused
      break
  }
})

function initGame() {
  game.snake = [{ x: 200, y: 200 }]
  game.direction = { x: 20, y: 0 } // Cambiar para que empiece moviéndose
  game.score = 0
  game.running = true
  game.paused = false
  gameScore.textContent = game.score
  generateFood()
  gameLoop()
}

function generateFood() {
  game.food = {
    x: Math.floor(Math.random() * 20) * 20,
    y: Math.floor(Math.random() * 20) * 20,
  }
}

function gameLoop() {
  if (!game.running) return

  if (!game.paused) {
    update()
    draw()
  }

  setTimeout(gameLoop, 150)
}

function update() {
  const head = { x: game.snake[0].x + game.direction.x, y: game.snake[0].y + game.direction.y }

  // Check walls
  if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
    gameOver()
    return
  }

  // Check self collision
  for (const segment of game.snake) {
    if (head.x === segment.x && head.y === segment.y) {
      gameOver()
      return
    }
  }

  game.snake.unshift(head)

  // Check food
  if (head.x === game.food.x && head.y === game.food.y) {
    game.score += 10
    gameScore.textContent = game.score
    generateFood()
  } else {
    game.snake.pop()
  }
}

function draw() {
  // Clear canvas
  game.ctx.fillStyle = "#0a0a0a"
  game.ctx.fillRect(0, 0, 400, 400)

  // Draw snake
  game.ctx.fillStyle = "#00ff88"
  for (const segment of game.snake) {
    game.ctx.fillRect(segment.x, segment.y, 18, 18)
  }

  // Draw food
  game.ctx.fillStyle = "#ff0080"
  game.ctx.fillRect(game.food.x, game.food.y, 18, 18)
}

function gameOver() {
  game.running = false
  alert(`¡Game Over! Puntuación: ${game.score}`)
}

// Enhanced Parallax
function updateParallax() {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".parallax-element")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    const yPos = -(scrolled * speed)
    element.style.transform = `translateY(${yPos}px)`
  })
}

window.addEventListener("scroll", updateParallax)

// Section Transitions
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  },
  { threshold: 0.1 },
)

document.querySelectorAll("section").forEach((section) => {
  section.classList.add("section-transition")
  sectionObserver.observe(section)
})

// Lazy Loading
const lazyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded")
      lazyObserver.unobserve(entry.target)
    }
  })
})

document.querySelectorAll(".lazy-load").forEach((element) => {
  lazyObserver.observe(element)
})

// GitHub Stats Animation (simulated)
function animateGitHubStats() {
  const stats = [
    { id: "github-repos", target: 12 },
    { id: "github-commits", target: 156 },
    { id: "github-stars", target: 23 },
    { id: "github-followers", target: 8 },
  ]

  stats.forEach((stat) => {
    const element = document.getElementById(stat.id)
    let current = 0
    const increment = stat.target / 50

    const timer = setInterval(() => {
      current += increment
      if (current >= stat.target) {
        current = stat.target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current)
    }, 50)
  })
}

// Trigger GitHub stats animation when section is visible
const githubSection = document.getElementById("github-stats")
if (githubSection) {
  const githubObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateGitHubStats()
        githubObserver.unobserve(entry.target)
      }
    })
  })
  githubObserver.observe(githubSection)
}

// Keyboard shortcuts info
document.addEventListener("DOMContentLoaded", () => {
  console.log(`
    🎮 ATAJOS DE TECLADO:
    ⌨️  T - Abrir Terminal
    ⌨️  M - Modo Matrix
    ⌨️  ESC - Cerrar ventanas
    🐍 Flechas - Controlar Snake
    ⏸️  ESPACIO - Pausar juego
  `)
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
