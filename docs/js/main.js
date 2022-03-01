const btnClose = document.querySelector('[aria-label="Close Menu"]');
const btnOpen = document.querySelector('[aria-label="Open Menu"]');
// mobile menu
btnClose.addEventListener("click", () => {
  document.querySelector('[aria-label="Menu"]').classList.add("hidden");
});

btnOpen.addEventListener("click", () => {
  document.querySelector('[aria-label="Menu"]').classList.remove("hidden");
});
