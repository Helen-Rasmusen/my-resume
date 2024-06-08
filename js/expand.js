const refs = {
  expandWrappers: document.querySelectorAll(".expand__wrapper"),
  expandBtns: document.querySelectorAll(".expand__btn"),
  contextAll: document.querySelectorAll(".expand__context"),
};

refs.expandWrappers.forEach((wrapper, inx) =>
  wrapper.addEventListener("click", function () {
    const isOpen = refs.expandBtns[inx].classList.contains("expand__btn-open");
    if (isOpen) {
      refs.expandBtns[inx].classList.remove("expand__btn-open");
      refs.contextAll[inx].classList.add("animate__fadeOut");

      refs.contextAll[inx].classList.remove("animate__fadeIn");
      setTimeout(() => {
        refs.contextAll[inx].classList.add("is-hidden");
      }, 250);
    } else {
      refs.expandBtns[inx].classList.add("expand__btn-open");
      refs.contextAll[inx].classList.remove("is-hidden");
      refs.contextAll[inx].classList.add("animate__fadeIn");
      refs.contextAll[inx].classList.remove("animate__fadeOut");
    }
  })
);
