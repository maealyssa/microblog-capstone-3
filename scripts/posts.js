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
  posts.reverse();
  
  for (const { createdAt, likes, text, username } of posts)
    qS('#posts').innerHTML += `
      <div class="col-12">
        <div class="postBox container p-4">
          <div id="titleContainer">
            <h4 id="userTitle">@${username}</h4>
          </div>
          <br>
          <p class="lead text-center">${text}</p>
          <hr>
          <span class="text-muted"> <i class="fa fa-heart"></i> ${likes.length} Likes ${createdAt}</span>
        </div>
      </div>

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
