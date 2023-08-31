const usersUrl = "https://ajax.test-danit.com/api/json/users";
const postUrl = "https://ajax.test-danit.com/api/json/posts";

let usersArr = [];
let postsArr = [];
const newsList = document.querySelector(".post__list");
const cross = document.querySelector(".cross");
const addPostCross = document.querySelector(".addPost__cross");
const formPostBtn = document.querySelector(".formPost__btn");
const formPostTitle = document.querySelector(".formPost__title");
const formPostBody = document.querySelector(".formPost__body");
const asideBtnPost = document.querySelector(".aside_btnPost");
const formAddPostBtn = document.querySelector(".formAddPost__btn");

class PostCards {
  constructor(title, body, userName, userEmail, postId) {
    this.title = title;
    this.body = body;
    this.userName = userName;
    this.userEmail = userEmail;
    this.postId = postId;
  }

  createPostCard() {
    newsList.insertAdjacentHTML(
      "beforeend",
      `
        <li class="post__item" data-postId=${this.postId}>
          <img src="./img/1621072663Y40bs.jpg" alt="" class="post__itemImg">
          <div class="post_author">
            <span class="post__authorName">${this.userName}</span>
            <span class="post__authorEmail">${this.userEmail}</span>
          </div>
          <h3 class="post__title">${this.title}</h3>
          <p>${this.body}</p>
          <div class="icons">
            <div class="icon__delete icon"></div>
            <div class="icon__edit icon"></div>
            <div class="icon__like icon"></div>
          </div>
        </li>
      `
    );
  }
}

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

async function getUsers() {
  const responseUsers = await (await fetch(usersUrl)).json();
  usersArr = responseUsers;
  console.log(usersArr);
  responseUsers.forEach((userItem) => {
    const user = new User(userItem.name, userItem.email);
    user.createUserCard();
  });
}
getUsers();

async function getPosts() {
  const responsePosts = await (await fetch(postUrl)).json();
  postsArr = responsePosts;
  createPosts(responsePosts);
}
getPosts();

function createPosts(postsArr) {
  postsArr.forEach((postElem) => {
    const user = usersArr.find((user) => {
      return user.id === postElem.userId;
    });
    const post = new PostCards(
      postElem.title,
      postElem.body,
      user.name,
      user.email,
      postElem.id
    );
    post.createPostCard();
  });
}

// ========== DELETE, EDIT post ==========
let postId = "";
let editPost = [];

newsList.addEventListener("click", async function (event) {
  event.preventDefault();
  const target = event.target;
  if (target.className.includes("icon__delete")) {
    const postId = target.parentElement.parentElement.dataset.postid;
    const responseDel = await fetch(
      `https://ajax.test-danit.com/api/json/posts/${postId}`,
      {
        method: "DELETE",
      }
    );
    if (responseDel.ok) {
      postsArr = postsArr.filter((post) => {
        return Number(post.id) !== Number(postId);
      });
      newsList.innerHTML = "";
      createPosts(postsArr);
    }
  }

  else if (target.className.includes("icon__edit")) {
    toggleModalWindow();
    postId = target.parentElement.parentElement.dataset.postid;

    editPost = postsArr.filter((post) => post.id === Number(postId));
    const editPostAuthor = usersArr.filter(
      (user) => user.id === Number(postId)
    );

    formPostTitle.value = editPost[0].title;

    formPostBody.value = editPost[0].body;
    const formPostAutorName = document.querySelector(".formPost__AutorName");
    formPostAutorName.value = editPostAuthor[0].name;
    const formPostAutorEmail = document.querySelector(".formPost__AutorEmail");
    formPostAutorEmail.value = editPostAuthor[0].email;
  }

});


formPostBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const editedPost = {
    body: formPostBody.value,
    id: editPost[0].id,
    title: formPostTitle.value,
    userId: editPost[0].userId,
  };
  const responseEdit = await fetch(
    `https://ajax.test-danit.com/api/json/posts/${postId}`,
    {
      method: "PUT",
      body: JSON.stringify(editedPost),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (responseEdit.ok) {
    toggleModalWindow();
    postsArr = postsArr.filter((post) => {
      return Number(post.id) !== Number(postId);
    });
    postsArr.unshift(editedPost);
    newsList.innerHTML = "";
    createPosts(postsArr);
  }
});

cross.addEventListener("click", (event) => {
  event.preventDefault();
  toggleModalWindow();
});

function toggleModalWindow() {
  const modalWindow = document.querySelector(".modalWindow");
  modalWindow.classList.toggle("displayFlex");
}

// ========== ADD post ==========

asideBtnPost.addEventListener("click", (event) => {
  event.preventDefault();
  toggleAddPostWindow();
});

addPostCross.addEventListener("click", (event) => {
  event.preventDefault();
  toggleAddPostWindow();
});

function toggleAddPostWindow() {
  const modalAddPost = document.querySelector(".modalAddPost");
  modalAddPost.classList.toggle("displayFlex");
}

formAddPostBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const formAddPostTitle = document.querySelector(".formAddPost__title");
  const formAddPostBody = document.querySelector(".formAddPost__body");
  const formAddPostAutorName = document.querySelector(
    ".formAddPost__AutorName"
  );
  const formAddPostAutorEmail = document.querySelector(
    ".formAddPost__AutorEmail"
  );
  const idNewPost = Math.round(Math.random() * 900 + 100);

  const newUser = {
    email: formAddPostAutorEmail.value,
    id: idNewPost,
    name: formAddPostAutorName.value,
  };
  const newPost = {
    body: formAddPostBody.value,
    id: idNewPost,
    title: formAddPostTitle.value,
    userId: idNewPost,
  };

  // const responsePosts = await fetch(
  //   "http://ajax.test-danit.com/api/json/posts/",
  //   {
  //     method: "POST",
  //     body: JSON.stringify(newPost),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // const responseUsers = await fetch(
  //   "http://ajax.test-danit.com/api/json/users/",
  //   {
  //     method: "POST",
  //     body: JSON.stringify(newUser),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  usersArr.push(newUser);
  postsArr.unshift(newPost);
  toggleAddPostWindow();
  newsList.innerHTML = "";
  createPosts(postsArr);
});


// ========== Сode for styles ==========

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
clickStyleAside();

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
clickStyleNewsCategories();








// ========== All functionality is organized using functions ==========

// let usersArr = [];

// async function getUsers() {
//   const responseUsers = await (await fetch(usersUrl)).json();
//   console.log(responseUsers);
//   usersArr = responseUsers;
//   responseUsers.map((user) => {
//     createUserCard(user);
//   });
// }

// getUsers();

// async function getPosts() {
//   const responsePosts = await (await fetch(postUrl)).json();
//   usersArr.map((user) => {
//     const postById = responsePosts.filter((post) => post.userId === user.id);
//     postById.map((post) => {
//       createPostCard(post, user);
//     });
//   });
// }
// getPosts();

// function createUserCard(user) {
//   const followersList = document.querySelector(".followers__list");
//   followersList.insertAdjacentHTML(
//     "beforeend",
//     `
//    <li class="followers__item">
//      <img src="./img/1c5u578iilxfi4m4dvc4q810q.svg" alt="" class="followers__img">
//      <div class="followers__info">
//        <p class="follow__name">${user.name}</p>
//        <p class="follow__mail">${user.email}</p>
//      </div>
//    </li>
//   `
//   );
// }

// function createPostCard(post, user) {
//   const newsList = document.querySelector(".post__list");
//   newsList.insertAdjacentHTML(
//     "beforeend",
//     `
//       <li class="post__item">
//         <img src="./img/1621072663Y40bs.jpg" alt="" class="post__itemImg">
//         <div class="post_author">
//           <span class="post__authorName">${user.name}</span>
//           <span class="post__authorEmail">${user.email}</span>
//         </div>
//         <h3 class="post__title">${post.title}</h3>
//         <p>${post.body}</p>
//       </li>
//   `
//   );
// }
