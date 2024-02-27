import portfolioObj from "./portfolio-items.js";

const createMarkUp = (obj) => {
  return obj
    .map(({ preview, original, description }) => {
      return `<li class="portfolio__item">
        <a
          class="portfolio__link"
          href="#"
        >
          <img
            loading = "lazy"
            class="portfolio__image"
            src=${preview}
            data-source=${original}
            alt=${description}
          />
        </a>
      </li>
      `;
    })
    .join("");
};

const refs = {
  gallery: document.querySelector(".portfolio__list"),
  modal: document.querySelector(".lightbox"),
  imgLBox: document.querySelector(".lightbox__image"),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lBoxOverlay: document.querySelector(".lightbox__overlay"),
};

const portfolioEl = createMarkUp(portfolioObj);
refs.gallery.insertAdjacentHTML("afterbegin", portfolioEl);
refs.gallery.addEventListener("click", onClick);

const imgSrcs = portfolioObj.map((e) => e.original);
const imgAlts = portfolioObj.map((e) => e.description);

function onClick(e) {
  e.preventDefault();
  const imgSource = e.target.dataset.source;

  if (!imgSource) {
    return;
  }
  openModalWindow(e.target);
  closeModalWindow();
}

function openModalWindow(trg) {
  refs.modal.classList.add("is-open");

  refs.imgLBox.src = trg.dataset.source;
  refs.imgLBox.alt = trg.alt;

  window.addEventListener("keydown", onArrowClick);
}

function onArrowClick(e) {
  let currentSrcIndex = imgSrcs.indexOf(refs.imgLBox.src);
  let lastSrcIndex = imgSrcs.indexOf(imgSrcs[imgSrcs.length - 1]);
  let currentAltIndex = imgAlts.indexOf(refs.imgLBox.alt);
  let lastAltIndex = imgAlts.indexOf(imgAlts[imgAlts.length - 1]);

  if (e.code === "ArrowRight") {
    currentSrcIndex =
      currentSrcIndex !== lastSrcIndex ? currentSrcIndex + 1 : 0;
    currentAltIndex =
      currentAltIndex !== lastAltIndex ? currentAltIndex + 1 : 0;
  } else if (e.code === "ArrowLeft") {
    currentSrcIndex =
      currentSrcIndex !== 0 ? currentSrcIndex - 1 : lastSrcIndex;
    currentAltIndex =
      currentAltIndex !== 0 ? currentAltIndex - 1 : lastAltIndex;
  }

  setAttributes(currentSrcIndex, currentAltIndex);
}

function setAttributes(src, alt) {
  refs.imgLBox.src = imgSrcs[src];
  refs.imgLBox.alt = imgAlts[alt];
}

function closeModalWindow() {
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

  refs.imgLBox.src = "";
  refs.imgLBox.alt = "";
}
