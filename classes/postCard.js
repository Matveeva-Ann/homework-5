import { newsList } from '../components/variables.js';

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


export {PostCards};