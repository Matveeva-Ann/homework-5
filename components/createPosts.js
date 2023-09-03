import { PostCards } from '../classes/postCard.js';

function createPosts(postsArr, usersArr) {
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

export {createPosts};