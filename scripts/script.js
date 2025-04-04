document.addEventListener("DOMContentLoaded", function () {
  document.body.style.overflow = "hidden";
  
  document.addEventListener("selectstart", function (event) {
    event.preventDefault();
  });
  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });
  document.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });
});
document.addEventListener("DOMContentLoaded", function () {
  function createSpark(x, y) {
    var spark = document.createElement("div");
    spark.classList.add("spark");
    spark.style.left = "".concat(x, "px");
    spark.style.top = "".concat(y, "px");
    document.body.appendChild(spark);
    setTimeout(function () {
      spark.remove();
    }, 800);
  }
  document.addEventListener("mousemove", function (event) {
    if (event.buttons === 1) {
      createSpark(event.clientX, event.clientY);
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var terminal = document.getElementById("terminal");
  var lines = [
    "System initialization...",
    "Loading modules...",
    "Starting services...",
    "Optimizing interfaces...",
    "Checking user's cool level...",
    "access granted: user is cool enough to enter",
    "Welcome to my portfolio!"
  ];
  
  var animationCompleted = false;
  
  function skipAnimation() {
    if (animationCompleted) return;
    
    var highestId = window.setTimeout(() => {}, 0);
    for (var i = 0; i < highestId; i++) {
      window.clearTimeout(i);
    }
    
    terminal.innerHTML = "";
    lines.forEach((text, index) => {
      var lineElement = document.createElement("div");
      lineElement.classList.add("terminal-line");
      
      if (index === lines.length - 1) {
        lineElement.classList.add("terminal-welcome");
      } else if (index === lines.length - 2) {
        lineElement.classList.add("terminal-access");
      } else {
        lineElement.classList.add("terminal-prompt");
      }
      
      lineElement.textContent = text;
      terminal.appendChild(lineElement);
    });
    
    setTimeout(() => {
      completeAnimation();
    }, 300);
  }
  
  function completeAnimation() {
    animationCompleted = true;
    var overlay = document.getElementById("loadingOverlay");
    overlay.classList.add("tv-off");
    overlay.addEventListener("animationend", function () {
      overlay.style.display = "none";
      if (document.getElementById("content")) {
        document.getElementById("content").style.display = "block";
      }
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeydown);
    });
  }
  
  var currentLine = 0;
  function typeLine(text, callback) {
    var i = 0;
    var lineElement = document.createElement("div");
    lineElement.classList.add("terminal-line");
    
    if (currentLine === lines.length - 1) {
      lineElement.classList.add("terminal-welcome");
    } else if (currentLine === lines.length - 2) {
      lineElement.classList.add("terminal-access");
    } else {
      lineElement.classList.add("terminal-prompt");
    }
    
    terminal.appendChild(lineElement);
    var cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");
    lineElement.appendChild(cursorSpan);
    function typeChar() {
      if (i < text.length) {
        if (Math.random() > 0.98) {
          setTimeout(typeChar, 50 + Math.random() * 100);
          return;
        }
        
        lineElement.textContent = text.substring(0, i + 1);
        lineElement.appendChild(cursorSpan);
        i++;
        setTimeout(typeChar, 10 + Math.random() * 20);
      } else {
        lineElement.removeChild(cursorSpan);
        setTimeout(callback, 150 + (currentLine * 30));
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
      setTimeout(() => {
        completeAnimation();
      }, 300);
    }
  }
  
  function handleKeydown(event) {
    if (event.key === "Enter" && !animationCompleted) {
      skipAnimation();
    }
  }
  
  document.addEventListener("keydown", handleKeydown);
  
  setTimeout(() => {
    startTyping();
  }, 400);
  
  var skipMessage = document.createElement("div");
  skipMessage.classList.add("skip-message");
  skipMessage.textContent = "Press Enter to skip";
  document.getElementById("loadingOverlay").appendChild(skipMessage);
});

document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("click", function () {
    this.classList.toggle("active");

    document.querySelectorAll(".skill-card").forEach((otherCard) => {
      if (otherCard !== this) otherCard.classList.remove("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const flipCards = document.querySelectorAll(".flip-card-inner");
  flipCards.forEach((card) => {
    card.addEventListener("click", function () {
      card.classList.toggle("flipped");
    });
  });
});
