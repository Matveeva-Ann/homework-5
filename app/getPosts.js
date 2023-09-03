import { createPosts } from '../components/createPosts.js';
import { usersArr } from '../app/getUsers.js';

const postUrl = "https://ajax.test-danit.com/api/json/posts";
let postsArr = [];

async function getPosts() {
  const responsePosts = await (await fetch(postUrl)).json();
  postsArr = responsePosts.slice();
  createPosts(responsePosts, usersArr);
}

function updateArr(newPostsArr){
  postsArr = newPostsArr;
}

export {getPosts, postsArr, updateArr}; 