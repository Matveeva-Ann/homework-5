import { toggleWindow } from './modalToggle.js';
import { usersArr } from '../app/getUsers.js';
import { postsArr } from '../app/getPosts.js';
import { newsList } from '../components/variables.js';
import { createPosts } from '../components/createPosts.js';
import { formAddPostBtn, formAddPost } from '../components/variables.js';

async function addPost (event) {
  event.preventDefault();
  const idNewPost = Math.round(Math.random() * 900 + 100);

  const newUser = {
    email: formAddPost.authorEmail.value,
    id: idNewPost,
    name: formAddPost.authorName.value,
  };
  const newPost = {
    body: formAddPost.body.value,
    id: idNewPost,
    title: formAddPost.title.value,
    userId: idNewPost,
  };
  const isFormValid = formAddPost.body.value !== '' && formAddPost.title.value !== '' && formAddPost.email.value !== '' && formAddPost.name.value !== '';

  if (isFormValid ){
    usersArr.push(newUser);
    postsArr.unshift(newPost);
    toggleWindow(".modalAddPost");
    newsList.innerHTML = "";
    createPosts(postsArr, usersArr);
    formAddPost.reset();
  }
};

function checkValid(){
  const isFormValid = formAddPost.body.value !== '' && formAddPost.title.value !== '' && formAddPost.email.value !== '' && formAddPost.name.value !== '';
  if (isFormValid ){
    formAddPostBtn.classList.remove('unfilled');
  }else{
    formAddPostBtn.classList.add('unfilled');
  }
}


export {addPost, checkValid};