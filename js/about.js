const refs = {
  expandBtns: document.querySelectorAll(".expand__btn"),
  contextAll: document.querySelectorAll(".expand__context"),
};

refs.expandBtns.forEach((btn, inx) =>
  btn.addEventListener("click", function () {
    const isOpen = btn.classList.contains("expand__btn-open");
    if (isOpen) {
      btn.classList.remove("expand__btn-open");
      refs.contextAll[inx].classList.add("animate__fadeOut");

      refs.contextAll[inx].classList.remove("animate__fadeIn");
      setTimeout(() => {
        refs.contextAll[inx].classList.add("is-hidden");
      }, 250);
    } else {
      btn.classList.add("expand__btn-open");
      refs.contextAll[inx].classList.remove("is-hidden");
      refs.contextAll[inx].classList.add("animate__fadeIn");
      refs.contextAll[inx].classList.remove("animate__fadeOut");
    }
  })
);
