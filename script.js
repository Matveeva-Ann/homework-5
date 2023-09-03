
import { getUsers } from './app/getUsers.js';
import { getPosts } from './app/getPosts.js';
import { clickStyleAside, clickStyleNewsCategories} from './styles/styles.js';
import { asideBtnPost, addPostCross, formAddPostBtn, formAddPost, newsList, formPostBtn, cross} from './components/variables.js';
import { toggleWindow } from './components/modalToggle.js';
import { addPost, checkValid } from './components/addPost.js';
import { handlePostClick, saveChanges, closeWindowEditPost } from './components/deleteEditPost.js';

getUsers();
getPosts();

asideBtnPost.addEventListener("click", (event) => {
  event.preventDefault();
  toggleWindow(".modalAddPost");
});

addPostCross.addEventListener("click", (event) => {
  event.preventDefault();
  toggleWindow(".modalAddPost");
});

formAddPostBtn.addEventListener("click", addPost);
formAddPost.addEventListener('input', checkValid);
newsList.addEventListener("click", handlePostClick);
formPostBtn.addEventListener("click", saveChanges);
cross.addEventListener("click", closeWindowEditPost);


// ========== styles ==========
clickStyleAside();
clickStyleNewsCategories();