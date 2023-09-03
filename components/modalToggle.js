function toggleWindow( btnClass ) {
  const modal = document.querySelector(btnClass);
  modal.classList.toggle("displayFlex");
}

export {toggleWindow};