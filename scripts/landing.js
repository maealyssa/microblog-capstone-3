/* Landing Page JavaScript */

"use strict";

window.onload = () => {
    const form = document.getElementById("login");

    form.onsubmit = e => {
        e.preventDefault();

        const username = document.getElementById("inputUserName").value;
        const password = document.getElementById("inputPassword").value;

        login({ username, password });
        document.getElementById("loginButton").disabled = true;
    }
}