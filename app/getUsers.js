import { User } from '../classes/user.js';

const usersUrl = "https://ajax.test-danit.com/api/json/users";
let usersArr = []

async function getUsers() {
  const responseUsers = await (await fetch(usersUrl)).json();
  usersArr = responseUsers;
  usersArr.forEach((userItem) => {
    const user = new User(userItem.name, userItem.email);
    user.createUserCard();
  });
}

export {getUsers, usersArr};