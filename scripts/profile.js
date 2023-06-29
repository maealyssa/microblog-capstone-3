"use strict"

const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem('login-data'));
    return user ? user.username : null;
}

const fetchPostsFromUser = async () => {
    try {
        const resp = await fetch(`https://microbloglite.herokuapp.com/api/posts?username=${getCurrentUser()}`, {
            headers: { Authorization: `Bearer ${getLoginData().token}` }
        });
        return resp.json();
    } catch(err) {
        console.log(err);
        return [];
    }
};

const displayPosts = async () => {
    const posts = await fetchPostsFromUser();
    posts.reverse();

    const postsFeed = document.getElementById('postsFeed');

    for (const { createdAt, likes, text, username } of posts) {
        const postCard = document.createElement('div');
        postCard.className = 'card mb-3'; 
        postCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${username}</h5>
                <p class="card-text">${text}</p>
                <p class="card-text">
                    <small class="text-muted">${new Date(createdAt).toLocaleString()}</small>
                </p>
                <p class="card-text">${likes.length} likes</p>
            </div>
        `;
        postsFeed.appendChild(postCard);
    }
};

const fetchUsers = async () => {
    try {
        const resp = await fetch('https://microbloglite.herokuapp.com/api/users' ,{
            headers: { Authorization: `Bearer ${getLoginData().token}` }
        });
        return resp.json();
    } catch(err) {
        console.log(err);
        return [];
    }
};

const displayUsers = async () => {
    const users = await fetchUsers();
    const usersColumn = document.getElementsByClassName('rightColumn')[0];

    for (const {username} of users) {
        const userCard = document.createElement('div');
        userCard.className = 'card my-2';
        userCard.innerHTML = `
            <div class="d-flex align-items-center">
                <img class="rounded-circle mr-3" src="images/stockImage.jpg" style="width: 50px; height: 50px;">
                <h5 class="m-0">${username}</h5>
            </div>
        `;
        usersColumn.appendChild(userCard);
    }
};

const submitPost = async () => {
  const postBody = document.getElementById('postBody').value;
  const data = {
    text: postBody,
    username: getCurrentUser(),
  };
  try {
    await fetch('https://microbloglite.herokuapp.com/api/posts',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getLoginData().token}` 
      },
      body: JSON.stringify(data)
    });
    window.location.href = 'profile.html';
  } catch(err) {
    console.log(err);
    alert('something went wrong while posting')
  };
}

window.onload = () => {
    displayPosts();
    displayUsers();
};