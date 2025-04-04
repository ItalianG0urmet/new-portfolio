document.addEventListener("DOMContentLoaded", function () {
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
    "Loading data...",
    "Starting services...",
    "Checking user's cool level...",
    "the user is cool enough to enter",
  ];
  var currentLine = 0;
  function typeLine(text, callback) {
    var i = 0;
    var lineElement = document.createElement("div");
    terminal.appendChild(lineElement);
    var cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");
    lineElement.appendChild(cursorSpan);
    function typeChar() {
      if (i < text.length) {
        lineElement.textContent = text.substring(0, i + 1);
        lineElement.appendChild(cursorSpan);
        i++;
        setTimeout(typeChar, 10);
      } else {
        lineElement.removeChild(cursorSpan);
        setTimeout(callback, 300);
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
      var overlay_1 = document.getElementById("loadingOverlay");
      overlay_1.classList.add("tv-off");
      overlay_1.addEventListener("animationend", function () {
        overlay_1.style.display = "none";
        document.getElementById("content").style.display = "block";
      });
    }
  }
  startTyping();
});

document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("click", function () {
    this.classList.toggle("active");

    document.querySelectorAll(".skill-card").forEach((otherCard) => {
      if (otherCard !== this) otherCard.classList.remove("active");
    });
  });
});
