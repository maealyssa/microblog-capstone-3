'use strict';

//calling to the base API
const apiBaseURL = "https://microbloglite.herokuapp.com";

//new user request
function newUser() {
    const un = document.getElementById('UserName').value;
    const fn = document.getElementById('fullName').value;
    const ps = document.getElementById('password').value;

    const requestBody = {
        username: un,
        fullName: fn,
        password: ps
    };

    //fetching from api
    fetch(apiBaseURL + '/api/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
    })
        .then(() => window.location.href = 'index.html')
        .catch(err => console.log(err))
};