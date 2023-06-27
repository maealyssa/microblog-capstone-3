"use strict";

const qS = document.querySelector.bind(document);

window.onload = async () => {
  // await register(); 
  displayPosts();
  qS('#logout').onclick = logout;
};

// temporary function just so I can register users for now
// const register = async () => {
//   fetch('https://microbloglite.herokuapp.com/api/users', {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       'username': 'malzahar', // temp values for testing
//       'fullName': 'user1',
//       'password': 'malzahar'
//     })
//   }).then(resp => console.log('POST RESP:', resp))
//     .catch(err => console.log('ERR:', err))
// };

const displayPosts = async () => {
  const posts = await fetchPosts();
  for (const { createdAt, likes, text, username } of posts)
    qS('#posts').innerHTML += `
      <div>
        <span>${username}</span>
        <span>${text}</span>
      </div>
      <div>
        <span>${createdAt}</span>
        <span>${likes.length}</span>
      </div>
      <br>
    `;
};

const fetchPosts = async () => {
  // console.log('getLoginData():', getLoginData())
  try {
    const resp = await fetch('https://microbloglite.herokuapp.com/api/posts', {
      headers: { Authorization: `Bearer ${getLoginData().token}` }
    });
    return resp.json();
  } catch(err) {
    console.log(err);
    return [];
  }
};
