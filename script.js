const characters = [
  {
    "src": "/assets/paperbag.png",
    "name": "Paperbag Original",
    "nameZh": "紙袋原創",
    "group": "paper",
    "zh": "以紙張摺痕、簡單眼神與街頭穿搭，建立東澤紙袋角色的原創設計語言。",
    "en": "Paper folds, expressive eyes and streetwear define the original design language of DONGZE paperbag characters."
  },
  {
    "src": "/assets/paperbag-outsider.png",
    "name": "Paperbag Outsider",
    "nameZh": "紙袋怪客",
    "group": "paper",
    "zh": "以紙袋頭、刺青與街頭穿搭，呈現帶點搞怪的角色個性；四視圖展示造型與設計細節。",
    "en": "Paperbag heads, tattoos and streetwear bring a playful outsider personality to life. The turnaround sheet shows the character from four angles."
  },
  {
    "src": "/assets/budget.png",
    "name": "Office Heroes",
    "nameZh": "Office Heroes",
    "group": "office",
    "zh": "辦公用品武器化與社畜黑色幽默，串聯加班、預算、全勤等職場角色。本圖為 Budget Freezer 系列代表作品。",
    "en": "Office supplies become weapons in a world of workplace dark humor. Budget Freezer is shown as a representative character."
  },
  {
    "src": "/assets/dongze-cat.png",
    "name": "Ze · DONGZE Cat",
    "nameZh": "阿澤｜東澤紙袋貓",
    "group": "cats",
    "roleZh": "嘴硬心軟的街區守護者",
    "roleEn": "The quietly caring neighborhood guardian",
    "zh": "穿著黑色東澤帽Ｔ，表情酷酷的，卻最見不得朋友受委屈。擅長修理東西，夢想開一間讓大家自由創作的工作室。",
    "en": "Behind his serious expression, Ze is always first to help. He fixes things and dreams of opening a studio where his friends can create freely.",
    "flawZh": "什麼都自己扛，連求助都說成「借你練習一下」。",
    "flawEn": "He takes on too much and struggles to ask for help.",
    "quoteZh": "我只是剛好路過。",
    "quoteEn": "I just happened to be passing by.",
    "sex": "male"
  },
  {
    "src": "/assets/garden-cat.png",
    "name": "Sprout · Garden Cat",
    "nameZh": "芽芽｜花園貓",
    "group": "cats",
    "roleZh": "溫柔有主見的園藝師",
    "roleEn": "A gentle gardener with a firm backbone",
    "zh": "經營街角的小花園，記得每株植物的脾氣，也記得朋友的心事。夢想把街上的空地變成四季都能開花的地方。",
    "en": "Sprout knows every plant’s quirks and every friend’s worries. She dreams of turning the street’s empty spaces into gardens that bloom all year.",
    "flawZh": "捨不得放棄枯苗，家裡擠滿「正在搶救」的盆栽。",
    "flawEn": "She cannot give up on a struggling plant; rescue pots fill her home.",
    "quoteZh": "慢慢長，也是在往前。",
    "quoteEn": "Growing slowly is still moving forward.",
    "sex": "female"
  },
  {
    "src": "/assets/ramen-cat.png",
    "name": "Maru · Ramen Cat",
    "nameZh": "阿丸｜拉麵貓",
    "group": "cats",
    "roleZh": "容易慌張的深夜拉麵店老闆",
    "roleEn": "The easily flustered late-night ramen cook",
    "zh": "訂單一多就手忙腳亂，但對湯頭非常認真。店裡是大家忙完一天的聚集地，他用一碗熱麵表達關心。",
    "en": "Maru gets flustered when orders pile up, but takes his broth seriously. His late-night shop brings everyone together over a comforting bowl.",
    "flawZh": "太容易答應客製要求，把菜單搞得很複雜。",
    "flawEn": "He says yes to too many custom orders.",
    "quoteZh": "先吃一碗，再想辦法。",
    "quoteEn": "Have a bowl first. We’ll figure it out.",
    "sex": "male"
  },
  {
    "src": "/assets/skate-cat.png",
    "name": "Ollie · Skate Cat",
    "nameZh": "阿溜｜滑板貓",
    "group": "cats",
    "roleZh": "笑瞇瞇的街頭玩家",
    "roleEn": "The cheerful street skater",
    "zh": "穿著破洞綠帽Ｔ，看似什麼都不在乎，其實最怕朋友不開心，總會拉大家出門散心。",
    "en": "In his worn green hoodie, Ollie seems carefree, but notices when friends feel down and takes them out for an adventure.",
    "flawZh": "成功前先吹牛，最後偷偷練到半夜。",
    "flawEn": "He boasts before landing a trick, then practices secretly until midnight.",
    "quoteZh": "摔倒可以，飲料不能灑。",
    "quoteEn": "I can fall. My drink can’t.",
    "sex": "male"
  },
  {
    "src": "/assets/chef-cat.png",
    "name": "Butter · Chef Cat",
    "nameZh": "奶油｜主廚貓",
    "group": "cats",
    "roleZh": "嘴上嫌麻煩的料理完美主義者",
    "roleEn": "The grumpy culinary perfectionist",
    "zh": "對食材、溫度和擺盤都很挑剔。嘴上嫌客人麻煩，卻記得每個人的口味。",
    "en": "Butter is exacting about ingredients, temperature and presentation. He complains about customers but remembers everyone’s favorite flavors.",
    "flawZh": "聽不得「還好」，會為了一句評語重做整晚。",
    "flawEn": "An “it’s okay” review can keep him cooking all night.",
    "quoteZh": "可以隨便吃，不能隨便做。",
    "quoteEn": "Eat casually. Cook carefully.",
    "sex": "male"
  },
  {
    "src": "/assets/painter-cat.png",
    "name": "Dottie · Painter Cat",
    "nameZh": "點點｜畫家貓",
    "group": "cats",
    "roleZh": "把日常畫成奇想的創作者",
    "roleEn": "The imaginative everyday storyteller",
    "zh": "腦袋裡永遠有新點子，擅長把普通日常畫成奇妙故事。紙袋上的色彩，就是她每天的心情紀錄。",
    "en": "Dottie turns ordinary days into colorful stories. The paint on her paper bag is a diary of her changing moods.",
    "flawZh": "總覺得還能再加一筆，因此常常趕不上交稿。",
    "flawEn": "There is always one more brushstroke, and deadlines slip by.",
    "quoteZh": "這不是弄髒，是還沒畫完。",
    "quoteEn": "It’s not a mess. It’s unfinished.",
    "sex": "female"
  },
  {
    "src": "/assets/pizza-cat.png",
    "name": "Peppo · Pizza Cat",
    "nameZh": "佩佩｜披薩貓",
    "group": "cats",
    "roleZh": "表情厭世但可靠的披薩店員",
    "roleEn": "The dependable pizza shop pessimist",
    "zh": "討厭客人催單，更討厭披薩送到時已經冷掉。嘴上抱怨，卻總替大家收拾爛攤子。",
    "en": "Peppo hates being rushed, and hates cold deliveries even more. He complains while quietly sorting out everyone’s problems.",
    "flawZh": "不擅長拒絕朋友，每次都說是最後一次幫忙。",
    "flawEn": "He cannot say no to friends, despite calling every favor the last one.",
    "quoteZh": "我臉臭，披薩是熱的。",
    "quoteEn": "Grumpy face. Hot pizza.",
    "sex": "male"
  },
  {
    "src": "/assets/aria-cat.png",
    "name": "Aria · Ragdoll Cat",
    "nameZh": "雅雅｜布偶貓",
    "group": "cats",
    "roleZh": "從容優雅的服裝設計師",
    "roleEn": "The poised fashion designer",
    "zh": "藍眼睛、蓬鬆長毛與精緻紙袋，搭配奶油白外套及深藍百褶裙。溫柔從容，擅長把平凡材質變成優雅設計。",
    "en": "With blue eyes, soft fur and a carefully crafted paper bag, Aria turns humble materials into elegant designs. Her calm manner is matched by a keen eye for detail.",
    "flawZh": "對細節很挑剔，最受不了別人坐皺剛熨好的衣服。",
    "flawEn": "She is particular about details, especially freshly pressed clothes being creased.",
    "quoteZh": "優雅，從照顧每個細節開始。",
    "quoteEn": "Elegance begins with care for every detail.",
    "sex": "female"
  }
];

let english = false;
let current = 3;
let selectionVersion = 0;
const cache = new Map();

const rail = document.querySelector(".thumbnail-rail");
rail.replaceChildren();
characters.forEach((item, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "character-thumb";
  button.dataset.character = String(index);
  button.hidden = item.group !== "cats";
  button.setAttribute("aria-pressed", "false");
  button.setAttribute("aria-label", `查看${item.nameZh}`);
  const canvas = document.createElement("canvas");
  canvas.className = "protected-art";
  canvas.dataset.art = item.src;
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", item.nameZh);
  const label = document.createElement("span");
  label.dataset.zh = item.nameZh;
  label.dataset.en = item.name;
  label.textContent = item.nameZh;
  button.append(canvas, label);
  rail.append(button);
});
let activeGroup = "cats";
document.querySelectorAll(".collection-filter").forEach(button => {
  button.addEventListener("click", () => {
    activeGroup = button.dataset.group;
    document.querySelectorAll(".collection-filter").forEach(tab => {
      const selected = tab === button;
      tab.classList.toggle("selected", selected);
      tab.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll(".character-thumb").forEach(thumb => {
      thumb.hidden = characters[Number(thumb.dataset.character)].group !== activeGroup;
    });
    rail.scrollLeft = 0;
    selectCharacter(characters.findIndex(item => item.group === activeGroup));
  });
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
    item.roleZh ? (english ? item.roleEn : item.roleZh) : (english ? item.name + " Collection" : item.nameZh + "系列");

  document.querySelector("#character-number").textContent =
    `${String(characters.filter(c => c.group === item.group).indexOf(item) + 1).padStart(2, "0")} / ${String(characters.filter(c => c.group === item.group).length).padStart(2, "0")}`;

  document.querySelector("#character-description").textContent =
    item[english ? "en" : "zh"];

  const profile = document.querySelector("#character-profile");
  profile.hidden = !item.roleZh;
  if (item.roleZh) {
    document.querySelector("#character-gender").textContent = english
      ? (item.sex === "female" ? "Female" : "Male")
      : (item.sex === "female" ? "女生" : "男生");
    document.querySelector("#character-flaw").textContent = item[english ? "flawEn" : "flawZh"];
    document.querySelector("#character-quote").textContent = item[english ? "quoteEn" : "quoteZh"];
  }

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

selectCharacter(3);
