import portfolioObj from "./portfolio-items.js";

const createMarkUp = (obj) => {
  return obj
    .map(({ id, preview, original, description }) => {
      return `<li class="portfolio__item">
          <img
            loading = "lazy"
            class="portfolio__image"
            src=${preview}
            data-source=${original}
            data-id=${id}
            alt=${description}
          />
      </li>
      `;
    })
    .join("");
};

const refs = {
  gallery: document.querySelector(".portfolio__list"),
  modal: document.querySelector(".lightbox"),
  imgLBox: document.querySelector(".lightbox__image"),
  linkLBox: document.querySelector(".lightbox__link"),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
  leftBtn: document.querySelector('button[data-action="move-left"]'),
  rightBtn: document.querySelector('button[data-action="move-right"]'),
  lBoxOverlay: document.querySelector(".lightbox__overlay"),
  body: document.body,
};

const portfolioEl = createMarkUp(portfolioObj);
refs.gallery.insertAdjacentHTML("afterbegin", portfolioEl);
refs.gallery.addEventListener("click", onClick);

const imgIds = portfolioObj.map((e) => e.id);
const imgSrcs = portfolioObj.map((e) => e.original);
const imgAlts = portfolioObj.map((e) => e.description);

function onClick(e) {
  e.preventDefault();
  const imgSource = e.target.dataset.source;

  if (!imgSource) {
    return;
  }
  openModalWindow(e.target);
  addCloseListeners();
}

function openModalWindow(trg) {
  refs.modal.classList.add("is-open");
  refs.body.classList.add("_lock");
  refs.imgLBox.src = trg.dataset.source;
  refs.imgLBox.alt = trg.alt;
  refs.imgLBox.dataset["id"] = trg.dataset["id"];
  refs.linkLBox.href = trg.dataset.source;

  refs.leftBtn.addEventListener("click", onStepLeft);
  refs.rightBtn.addEventListener("click", onStepRight);
  window.addEventListener("keydown", onArrowClick);
}

function onArrowClick(e) {
  if (e.code === "ArrowRight") {
    stepImg(1);
  } else if (e.code === "ArrowLeft") {
    stepImg(-1);
  }
}

function stepImg(delta) {
  let currentSrcIndex = imgIds.indexOf(refs.imgLBox.dataset["id"]);
  currentSrcIndex = mod(currentSrcIndex + delta, imgSrcs.length);
  setAttributes(currentSrcIndex);
}

function onStepLeft() {
  stepImg(-1);
}
function onStepRight() {
  stepImg(1);
}
function setAttributes(index) {
  refs.imgLBox.dataset["id"] = imgIds[index];
  refs.imgLBox.src = imgSrcs[index];
  refs.imgLBox.alt = imgAlts[index];
  refs.linkLBox.href = imgSrcs[index];
}

function addCloseListeners() {
  refs.closeBtn.addEventListener("click", onModalCloseClick);
  refs.lBoxOverlay.addEventListener("click", onModalCloseClick);
  window.addEventListener("keydown", onEscClick);
}

function onEscClick(e) {
  if (e.code !== "Escape") {
    return;
  }
  onModalCloseClick();
}

function onModalCloseClick() {
  refs.modal.classList.remove("is-open");
  window.removeEventListener("keydown", onArrowClick);
  window.removeEventListener("keydown", onEscClick);
  refs.closeBtn.removeEventListener("click", onModalCloseClick);
  refs.lBoxOverlay.removeEventListener("click", onModalCloseClick);
  refs.body.classList.remove("_lock");
  refs.leftBtn.removeEventListener("click", onStepLeft);
  refs.rightBtn.removeEventListener("click", onStepRight);
  refs.imgLBox.src = "";
  refs.imgLBox.alt = "";
}

function mod(x, n) {
  return ((x % n) + n) % n;
}
