import request from "../utils/request";
const Cookies = require("js-cookie");
function login({ username, password }) {
    let csrftoken = Cookies.get('csrftoken');
    // let headers = new Headers();
    // headers.append();
    // headers.append();
    return request(`/api/login/`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken': csrftoken
        },   
        body: JSON.stringify({username, password})
    });
}
function session() {
    return request(`api/session/`);
}
function logout() {
    return request(`api/logout/`);
}
function register({ username, password,  }) {
    return request(`api/register/`, {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });
}
export default {
    login,
    session,
    logout
};