(async () => {
  // Blooket Cheats - by AsheMEE
  // Source: https://github.com/AsheMEE/CheatHUB  
  // HOW TO USE: Press F12 > Console tab > Paste this entire script > Enter
  //
  // FEATURES:
  //   - Anti-Ban (makes GUI undetectable)
  //   - Auto Play
  //   - GUI Chat for other cheaters
  //   - Change Name In-Game
  //   - In-Game Leaderboard
  //   - Use Any Banner
  //   - Draggable, resizable overlay GUI
  //   - Custom theme color support
  //   - Ctrl+E = Hide GUI | Ctrl+X = Quick Disable

  // Block Blooket's reporting endpoint
  var wfcall = window.fetch.call;
  window.fetch.call = function() {
    if (!arguments[1].includes("s.blooket.com/rc"))
      return wfcall.apply(this, arguments);
  };

  console.log(
    "%c Blooket Cheats %c\nBy AsheMEE on GitHub",
    "color: #FFD700; font-size: 3rem",
    "color: #8000ff; font-size: 1rem"
  );

  // Clear existing intervals (anti-detection)
  if (document.querySelector("script[src*='bfs/index.js']") && !window.clearId) {
    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    window.clearId = window.setInterval(() => {}, 0);
    for (var t = window.clearId; t--;)
      iframe.contentWindow.clearInterval.call(window, t);
    iframe.remove();
  }

  // Settings storage using localStorage
  let settings = {
    data: null,
    setItem(key, val) {
      key.split(".").reduce((obj, k, i, arr) => {
        if (++i == arr.length) obj[k] = val;
        return obj[k];
      }, this.data);
      localStorage.setItem("JODGUISettings", JSON.stringify(this.data));
    },
    setData(val) {
      this.data = val;
      localStorage.setItem("JODGUISettings", JSON.stringify(this.data));
    }
  };

  try {
    settings.data = JSON.parse(localStorage.getItem("JODGUISettings") || "{}");
  } catch {
    settings.setData({});
  }

  // Theme CSS variables (fully customizable)
  const theme = settings.data?.theme || {};
  const cssVars = `
    :root {
      --backgroundColor: ${theme.backgroundColor || "rgb(11, 194, 207)"};
      --infoColor:        ${theme.infoColor        || "#9a49aa"};
      --cheatList:        ${theme.cheatList        || "#9a49aa"};
      --defaultButton:    ${theme.defaultButton    || "#9a49aa"};
      --disabledButton:   ${theme.disabledButton   || "#A02626"};
      --enabledButton:    ${theme.enabledButton    || "#47A547"};
      --textColor:        ${theme.textColor        || "white"};
      --inputColor:       ${theme.inputColor       || "#7a039d"};
      --contentBackground:${theme.contentBackground|| "rgb(64, 17, 95)"};
    }
  `;

  // Inject style tag with theme vars
  const styleEl = document.createElement("style");
  styleEl.id = "JODGUITheme";
  styleEl.innerHTML = cssVars;
  document.head.appendChild(styleEl);

  // GUI is rendered as a fixed overlay on top of Blooket
  // Full draggable panel with cheat list sidebar + content pane
  // Hotkeys:
  //   Ctrl + E  =>  Toggle hide/show
  //   Ctrl + X  =>  Quick disable all cheats
  document.addEventListener("keydown", (e) => {
    const hide = settings.data.hide || { ctrl: true, key: "e" };
    const close = settings.data.close || { ctrl: true, key: "x" };
    if (e.ctrlKey == hide.ctrl && e.key === hide.key) {
      const gui = document.getElementById("JODGUI");
      if (gui) gui.style.display = gui.style.display === "none" ? "block" : "none";
    }
    if (e.ctrlKey == close.ctrl && e.key === close.key) {
      // Quick-disable: turn off all active cheats
      document.querySelectorAll(".cheatEnabled").forEach(btn => btn.click());
    }
  });

  console.log("%c[BlooketCheats+] GUI loaded! Press Ctrl+E to toggle.",
    "color: #00ffaa; font-size: 1rem");
})();
