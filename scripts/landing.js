/* Landing Page JavaScript */

"use strict";

window.onload = () => {
    const loginBtn = document.getElementById("login");
    const inputUser = document.getElementById("inputUserName").value;
    const inputPassword = document.getElementById("inputPassword").value;

    loginBtn.onsubmit = () => {
        const loginData = {
            username: inputUser,
            password: inputPassword,
        }

        loginBtn.disabled = true;
        
        login(loginData);
    }
}