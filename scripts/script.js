document.addEventListener("DOMContentLoaded", function () {
  document.body.style.overflow = "hidden";

  ["selectstart", "contextmenu", "dragstart"].forEach((eventType) => {
    document.addEventListener(eventType, (e) => e.preventDefault());
  });

  initTerminal();

  initSparks();
});

function initSparks() {
  function createSpark(x, y) {
    const spark = document.createElement("div");
    spark.classList.add("spark");
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 800);
  }

  document.addEventListener("mousemove", function (event) {
    if (event.buttons === 1) {
      createSpark(event.clientX, event.clientY);
    }
  });
}

function initTerminal() {
  const terminal = document.getElementById("terminal");
  const lines = [
    "System initialization...",
    "Loading modules...",
    "Starting services...",
    "Optimizing interfaces...",
    "Checking user's cool level...",
    "access granted: user is cool enough to enter",
    "Welcome to my portfolio!",
  ];

  let animationCompleted = false;

  function skipAnimation() {
    if (animationCompleted) return;

    const highestId = window.setTimeout(() => {}, 0);
    for (let i = 0; i < highestId; i++) {
      window.clearTimeout(i);
    }

    terminal.innerHTML = "";
    lines.forEach((text, index) => {
      const lineEl = document.createElement("div");
      lineEl.classList.add("terminal-line");

      if (index === lines.length - 1) {
        lineEl.classList.add("terminal-welcome");
      } else if (index === lines.length - 2) {
        lineEl.classList.add("terminal-access");
      } else {
        lineEl.classList.add("terminal-prompt");
      }

      lineEl.textContent = text;
      terminal.appendChild(lineEl);
    });

    setTimeout(() => completeAnimation(), 300);
  }

  function completeAnimation() {
    animationCompleted = true;
    const overlay = document.getElementById("loadingOverlay");
    overlay.classList.add("tv-off");
    overlay.addEventListener("animationend", function () {
      overlay.style.display = "none";
      if (document.getElementById("content")) {
        document.getElementById("content").style.display = "block";
      }
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeydown);

      initScrollAnimations();
      checkInitialVisibility();
      initTabBehavior();
    });
  }

  let currentLine = 0;
  function typeLine(text, callback) {
    let i = 0;
    const lineEl = document.createElement("div");
    lineEl.classList.add("terminal-line");

    if (currentLine === lines.length - 1) {
      lineEl.classList.add("terminal-welcome");
    } else if (currentLine === lines.length - 2) {
      lineEl.classList.add("terminal-access");
    } else {
      lineEl.classList.add("terminal-prompt");
    }

    terminal.appendChild(lineEl);
    const cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");
    lineEl.appendChild(cursorSpan);

    function typeChar() {
      if (i < text.length) {
        if (Math.random() > 0.98) {
          setTimeout(typeChar, 50 + Math.random() * 100);
          return;
        }

        lineEl.textContent = text.substring(0, i + 1);
        lineEl.appendChild(cursorSpan);
        i++;
        setTimeout(typeChar, 10 + Math.random() * 20);
      } else {
        lineEl.removeChild(cursorSpan);
        setTimeout(callback, 150 + currentLine * 30);
      }
    }
    typeChar();
  }

  function startTyping() {
    if (currentLine < lines.length) {
      typeLine(lines[currentLine], function () {
        currentLine++;
        startTyping();
      });
    } else {
      setTimeout(() => completeAnimation(), 300);
    }
  }

  function handleKeydown(event) {
    if (event.key === "Enter" && !animationCompleted) {
      skipAnimation();
    }
  }

  document.addEventListener("keydown", handleKeydown);

  setTimeout(() => startTyping(), 400);

  const skipMessage = document.createElement("div");
  skipMessage.classList.add("skip-message");
  skipMessage.textContent = "Press Enter to skip";
  document.getElementById("loadingOverlay").appendChild(skipMessage);
}

function initScrollAnimations() {
  const elements = {
    hidden: document.querySelectorAll(".hidden"),
    fadeLeft: document.querySelectorAll(".fade-left"),
    fadeRight: document.querySelectorAll(".fade-right"),
    fadeScale: document.querySelectorAll(".fade-in-scale"),
    dividers: document.querySelectorAll(".fade-divider"),
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("hidden")) {
            entry.target.classList.add("fade-in");
          } else if (entry.target.classList.contains("fade-divider")) {
            entry.target.classList.add("show");
          } else if (
            entry.target.classList.contains("fade-left") ||
            entry.target.classList.contains("fade-right") ||
            entry.target.classList.contains("fade-in-scale")
          ) {
            entry.target.classList.add("show");
          }
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  Object.values(elements).forEach((elementGroup) =>
    elementGroup.forEach((el) => observer.observe(el))
  );
}

function checkInitialVisibility() {
  window.scrollTo(window.scrollX, window.scrollY + 1);
  setTimeout(() => {
    window.scrollTo(window.scrollX, window.scrollY - 1);
  }, 100);
}

function addCardEffects(selector) {
  return function (element) {
    element.addEventListener("mousemove", (e) => {
      const x = e.pageX - element.offsetLeft;
      const y = e.pageY - element.offsetTop;
      const highlight = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.07), transparent 80px)`;
      element.style.backgroundImage = highlight;
    });

    element.addEventListener("mouseleave", () => {
      element.style.backgroundImage = "none";
    });

    element.addEventListener("click", function () {
      if (selector === ".skill-card") {
        this.classList.toggle("active");
        document.querySelectorAll(selector).forEach((other) => {
          if (other !== this) other.classList.remove("active");
        });
      }

      this.style.backgroundColor = "rgba(40, 40, 40, 0.7)";
      setTimeout(() => {
        this.style.backgroundColor = "";
      }, 300);
    });
  };
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".skill-card")
    .forEach(addCardEffects(".skill-card"));
  document
    .querySelectorAll(".project-card")
    .forEach(addCardEffects(".project-card"));
});

function initTabBehavior() {
  const elements = {
    tab: document.querySelector(".tab"),
    text: document.querySelector(".tab-text"),
    icon: document.querySelector(".tab-icon"),
    left: document.querySelector(".tab-left"),
  };

  if (!elements.tab || !elements.text || !elements.icon) return;

  const sectionTitles = [
    { icon: "fa-home", text: "Welcome" },
    { icon: "fa-user-code", text: "About Me" },
    { icon: "fa-code", text: "Skills" },
    { icon: "fa-laptop-code", text: "Projects" },
  ];

  elements.text.textContent = sectionTitles[0].text;
  elements.icon.className = `fas ${sectionTitles[0].icon} tab-icon`;

  elements.left.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    elements.text.style.animation = "glitch 0.3s linear";
    setTimeout(() => {
      elements.text.style.animation = "";
    }, 300);
  });

  let lastScrollPos = 0;
  let currentSection = 0;

  window.addEventListener("scroll", () => {
    lastScrollPos = window.scrollY;
    const sections = document.querySelectorAll(".exp-page");
    let newSection = 0;

    if (window.scrollY < 10) {
      newSection = 0;
    } else {
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top < window.innerHeight / 2 &&
          rect.bottom > window.innerHeight / 2
        ) {
          newSection = index + 1;
        }
      });
    }

    if (newSection !== currentSection && newSection < sectionTitles.length) {
      currentSection = newSection;
      typeText(elements.text, sectionTitles[newSection].text);
      elements.icon.className = `fas ${sectionTitles[newSection].icon} tab-icon`;

      elements.tab.style.backgroundColor = "rgba(30, 30, 30, 0.85)";
      setTimeout(() => {
        elements.tab.style.backgroundColor = "";
      }, 300);
    }
  });

  function typeText(element, newText) {
    const currentText = element.textContent;
    let i = 0;

    const clearInterval = setInterval(() => {
      element.textContent = currentText.substring(
        0,
        currentText.length - i - 1
      );
      i++;

      if (i >= currentText.length) {
        clearInterval(clearInterval);
        i = 0;
        const typeInterval = setInterval(() => {
          element.textContent = newText.substring(0, i + 1);
          i++;

          if (i >= newText.length) {
            clearInterval(typeInterval);
          }
        }, 50);
      }
    }, 30);
  }
}
