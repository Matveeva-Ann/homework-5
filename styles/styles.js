
function clickStyleAside() {
  const asideList = document.querySelector(".aside__list");
  const asideLink = document.querySelectorAll(".aside__link");
  asideList.addEventListener("click", function (event) {
    event.preventDefault();
    const target = event.target;
    for (let i = 0; i < asideLink.length; i++) {
      asideLink[i].classList.remove("aside__link--active");
    }
    target.classList.add("aside__link--active");
  });
}

function clickStyleNewsCategories() {
  const newsCategories = document.querySelector(".news__categories");
  const newsCategoriesItem = document.querySelectorAll(".news__categoriesItem");
  newsCategories.addEventListener("click", function (event) {
    event.preventDefault();
    const targetParent = event.target.parentElement;
    for (let i = 0; i < newsCategoriesItem.length; i++) {
      newsCategoriesItem[i].classList.remove("news__categoriesItem--active");
    }
    targetParent.classList.add("news__categoriesItem--active");
  });
}

export {clickStyleAside, clickStyleNewsCategories};