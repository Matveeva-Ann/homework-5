class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  createUserCard() {
    const followersList = document.querySelector(".followers__list");
    followersList.insertAdjacentHTML(
      "beforeend",
      `
       <li class="followers__item">
         <img src="./img/1c5u578iilxfi4m4dvc4q810q.svg" alt="" class="followers__img">
         <div class="followers__info">
           <p class="follow__name">${this.name}</p>
           <p class="follow__mail">${this.email}</p>
         </div>
       </li>
      `
    );
  }
}

export {User};