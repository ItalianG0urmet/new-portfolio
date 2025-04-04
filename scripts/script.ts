document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("selectstart", (event: Event) => {
    event.preventDefault();
  });
  document.addEventListener("contextmenu", (event: Event) => {
    event.preventDefault();
  });
  document.addEventListener("dragstart", (event: Event) => {
    event.preventDefault();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  function createSpark(x: number, y: number): void {
    const spark: HTMLDivElement = document.createElement("div");
    spark.classList.add("spark");
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    document.body.appendChild(spark);
    setTimeout(() => {
      spark.remove();
    }, 800);
  }

  document.addEventListener("mousemove", (event: MouseEvent) => {
    if (event.buttons === 1) {
      createSpark(event.clientX, event.clientY);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const terminal = document.getElementById("terminal") as HTMLDivElement;
  const lines: string[] = [
    "System initialization...",
    "Loading data...",
    "Starting services...",
    "Checking user's cool level...",
    "the user is cool enough to enter",
  ];
  let currentLine = 0;

  function typeLine(text: string, callback: () => void): void {
    let i = 0;
    const lineElement: HTMLDivElement = document.createElement("div");
    terminal.appendChild(lineElement);
    const cursorSpan: HTMLSpanElement = document.createElement("span");
    cursorSpan.classList.add("cursor");
    lineElement.appendChild(cursorSpan);

    function typeChar(): void {
      if (i < text.length) {
        lineElement.textContent = text.substring(0, i + 1);
        lineElement.appendChild(cursorSpan);
        i++;
        setTimeout(typeChar, 10);
      } else {
        lineElement.removeChild(cursorSpan);
        setTimeout(callback, 500);
      }
    }
    typeChar();
  }

  function startTyping(): void {
    if (currentLine < lines.length) {
      typeLine(lines[currentLine], () => {
        currentLine++;
        startTyping();
      });
    } else {
      const overlay = document.getElementById(
        "loadingOverlay"
      ) as HTMLDivElement;
      overlay.classList.add("tv-off");
      overlay.addEventListener("animationend", () => {
        overlay.style.display = "none";
        (document.getElementById("content") as HTMLDivElement).style.display =
          "block";
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
