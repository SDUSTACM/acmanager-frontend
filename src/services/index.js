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
function register({ username, password, profile}) {
    let csrftoken = Cookies.get('csrftoken');

    return request(`api/register/`, {
        method: "post",
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken': csrftoken
        },   
        body: JSON.stringify({ username, password, profile })
    });
}
function audit_application({ identifier, username, is_approval }) {
    let csrftoken = Cookies.get('csrftoken');

    return request(`/api/application/`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken': csrftoken
        },   
        body: JSON.stringify({ identifier, username, is_approval })
    });
}
function get_notifications() {
    return request(`/api/notifications/`);
}
export default {
    login,
    session,
    logout,
    get_notifications,
    audit_application,
    register
};