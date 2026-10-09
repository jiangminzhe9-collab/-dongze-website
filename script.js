const characters = [
  {
    src: "/assets/paperbag.webp",
    name: "Paperbag Original",
    nameZh: "紙袋原創",
    zh: "以紙張摺痕、簡單眼神與街頭穿搭，建立東澤紙袋角色的原創設計語言。",
    en: "Paper folds, expressive eyes and streetwear define the original design language of DONGZE paperbag characters."
  },
  {
    src: "/assets/budget.webp",
    name: "Office Heroes",
    nameZh: "Office Heroes",
    zh: "辦公用品武器化與社畜黑色幽默，串聯加班、預算、全勤等職場角色。本圖為 Budget Freezer 系列代表作品。",
    en: "Office supplies become weapons in a world of workplace dark humor. Budget Freezer is shown as a representative character."
  },
  {
    src: "/assets/dongze-cat.png",
    name: "DONGZE Cat",
    nameZh: "東澤紙袋貓",
    zh: "圓滾滾的紙袋貓，將貓咪的日常與角色造型，延伸成療癒故事與周邊概念。",
    en: "A round, lovable paperbag cat brings everyday feline life into comforting stories and merchandise concepts."
  },
  {
    src: "/assets/paperbag-outsider.webp",
    name: "Paperbag Outsider",
    nameZh: "紙袋怪客",
    zh: "以紙袋頭、刺青與街頭穿搭，呈現帶點搞怪的角色個性；四視圖展示造型與設計細節。",
    en: "Paperbag heads, tattoos and streetwear bring a playful outsider personality to life. The turnaround sheet shows the character from four angles."
  },
  {
    src: "/assets/garden-cat.png",
    name: "Garden Cat",
    nameZh: "花園貓",
    zh: "花園主題貓咪，把植物與日常小趣味，化成可以收藏的角色故事。",
    en: "A garden-themed cat turns plants and everyday little pleasures into collectible character stories."
  },
  {
    src: "/assets/ramen-cat.png",
    name: "Ramen Cat",
    nameZh: "拉麵貓",
    zh: "拉麵主題貓咪，結合美食與圓滾滾的造型，發展角色故事與周邊概念。",
    en: "A ramen-themed cat combines food and a round, lovable silhouette for character stories and merchandise concepts."
  }
];

let english = false;
let current = 0;
let selectionVersion = 0;
const cache = new Map();

// 更新現有縮圖，並加入花園貓與拉麵貓。
const rail = document.querySelector(".thumbnail-rail");

characters.forEach((item, index) => {
  let button = rail.querySelector(
    `.character-thumb[data-character="${index}"]`
  );

  if (!button) {
    button = document.createElement("button");
    button.type = "button";
    button.className = "character-thumb";
    button.dataset.character = String(index);
    button.setAttribute("aria-pressed", "false");

    const canvas = document.createElement("canvas");
    canvas.className = "protected-art";
    canvas.setAttribute("role", "img");

    const label = document.createElement("span");

    button.append(canvas, label);
    rail.append(button);
  }

  button.type = "button";
  button.setAttribute("aria-label", `查看${item.nameZh}`);

  const canvas = button.querySelector("canvas");
  canvas.dataset.art = item.src;
  canvas.setAttribute("aria-label", item.nameZh);

  const label = button.querySelector("span");
  label.dataset.zh = item.nameZh;
  label.dataset.en = item.name;
  label.textContent = item.nameZh;
});

function loadArt(src) {
  if (!cache.has(src)) {
    const pending = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Image unavailable"));
      img.src = src;
    });

    cache.set(src, pending);
    pending.catch(() => cache.delete(src));
  }

  return cache.get(src);
}

function paintArtwork(canvas, img, maxSize = 1200) {
  const scale = Math.min(
    1,
    maxSize / Math.max(img.naturalWidth, img.naturalHeight)
  );

  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);

  canvas.getContext("2d").drawImage(
    img, 0, 0, canvas.width, canvas.height
  );
}

function updateCaption() {
  const item = characters[current];

  document.querySelector("#character-name").textContent =
    english ? item.name : item.nameZh;

  document.querySelector("#series-title").textContent =
    english ? item.name + " Collection" : item.nameZh + "系列";

  document.querySelector("#character-number").textContent =
    `${String(current + 1).padStart(2, "0")} / ${String(characters.length).padStart(2, "0")}`;

  document.querySelector("#character-description").textContent =
    item[english ? "en" : "zh"];

  document.querySelector("#dialog-caption").textContent =
    item.name + " · © DONGZE";

  const label = english ? item.name : item.nameZh;
  document.querySelector("#gallery-canvas")
    .setAttribute("aria-label", label);
  document.querySelector("#dialog-canvas")
    .setAttribute("aria-label", label);
}

async function selectCharacter(index, scroll = false) {
  if (!characters[index]) return;

  current = index;
  const ticket = ++selectionVersion;
  updateCaption();

  document.querySelectorAll(".character-thumb").forEach(button => {
    const selected = Number(button.dataset.character) === index;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  const canvas = document.querySelector("#gallery-canvas");
  canvas.getContext("2d").clearRect(
    0, 0, canvas.width, canvas.height
  );

  const status = document.querySelector("#gallery-status");
  status.hidden = false;
  status.textContent = english
    ? "Loading artwork…"
    : "圖片載入中…";

  if (scroll) {
    document.querySelector("#gallery-stage").scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start"
    });
  }

  try {
    const img = await loadArt(characters[index].src);
    if (ticket !== selectionVersion) return;

    paintArtwork(canvas, img);
    status.hidden = true;
  } catch {
    if (ticket !== selectionVersion) return;

    status.textContent = english
      ? "Image unavailable. Select the thumbnail to retry."
      : "圖片暫時無法載入，請再點一次縮圖。";
  }
}

document.querySelectorAll(".character-thumb").forEach(button => {
  button.addEventListener("click", () => {
    selectCharacter(Number(button.dataset.character), true);
  });
});

document.querySelector("#language").addEventListener("click", () => {
  english = !english;
  document.documentElement.lang = english ? "en" : "zh-Hant";

  document.querySelectorAll("[data-zh]").forEach(el => {
    el.innerHTML = el.dataset[english ? "en" : "zh"];
  });

  const button = document.querySelector("#language");
  button.textContent = english ? "中文" : "EN";
  button.setAttribute(
    "aria-label",
    english ? "切換繁體中文" : "Switch to English"
  );

  document.querySelectorAll(".character-thumb").forEach(thumb => {
    const item = characters[Number(thumb.dataset.character)];
    thumb.setAttribute(
      "aria-label",
      english ? `View ${item.name}` : `查看${item.nameZh}`
    );
  });

  document.title = english
    ? "DONGZE | Original Characters, Art Toys & Digital Stories"
    : "東澤文創 DONGZE｜原創角色・藝術玩具・數位創作";

  updateCaption();

  const status = document.querySelector("#gallery-status");
  if (!status.hidden) selectCharacter(current);
});

const dialog = document.querySelector("#design-dialog");

document.querySelector("#show-design").addEventListener(
  "click",
  async () => {
    const ticket = selectionVersion;

    try {
      const img = await loadArt(characters[current].src);
      if (ticket !== selectionVersion) return;

      paintArtwork(document.querySelector("#dialog-canvas"), img);
      updateCaption();
      if (!dialog.open) dialog.showModal();
    } catch {
      if (ticket === selectionVersion) selectCharacter(current);
    }
  }
);

document.querySelector("#close-dialog").addEventListener(
  "click",
  () => dialog.close()
);

dialog.addEventListener("click", event => {
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();

    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    ) {
      dialog.close();
    }
  }
});

document.querySelectorAll("canvas").forEach(canvas => {
  canvas.addEventListener("contextmenu", event => event.preventDefault());
  canvas.addEventListener("dragstart", event => event.preventDefault());
});

document.querySelectorAll(".protected-art").forEach(async canvas => {
  try {
    paintArtwork(
      canvas,
      await loadArt(canvas.dataset.art),
      canvas.closest(".character-thumb") ? 360 : 1200
    );
  } catch {
    canvas.setAttribute(
      "aria-label",
      "圖片暫時無法載入 / Image unavailable"
    );
  }
});

selectCharacter(0);
