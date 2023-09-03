import { toggleWindow } from "./modalToggle.js";
import { postsArr, updateArr } from "../app/getPosts.js";
import { usersArr } from "../app/getUsers.js";
import { formPostTitle, formPostBody, newsList } from "./variables.js";
import { createPosts } from "./createPosts.js";

let editPost = [];
let postId = 0;
let postsArrEdit = [];
async function handlePostClick(event) {
  event.preventDefault();
  const target = event.target;
  if (target.className.includes("icon__delete")) {
    postId = target.parentElement.parentElement.dataset.postid;
    try {
      await fetch(`https://ajax.test-danit.com/api/json/posts/${postId}`, {
        method: "DELETE",
      });
      postsArrEdit = postsArr.filter((post) => post.id !== Number(postId));
      newsList.innerHTML = "";
      createPosts(postsArrEdit, usersArr);
      updateArr(postsArrEdit);
    } catch (e) {
      console.log(e);
    }
  } else if (target.className.includes("icon__edit")) {
    toggleWindow(".modalWindow");
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
}

async function saveChanges(event) {
  event.preventDefault();

  const editedPost = {
    body: formPostBody.value,
    id: editPost[0].id,
    title: formPostTitle.value,
    userId: editPost[0].userId,
  };
  try {
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
    toggleWindow(".modalWindow");
    postsArrEdit = postsArr.filter((post) => post.id !== Number(postId));
    postsArrEdit.unshift(editedPost);
    newsList.innerHTML = "";
    createPosts(postsArrEdit, usersArr);
    updateArr(postsArrEdit);
  } catch {}
}

function closeWindowEditPost(event) {
  event.preventDefault();
  toggleWindow(".modalWindow");
}

export { handlePostClick, saveChanges, closeWindowEditPost };
