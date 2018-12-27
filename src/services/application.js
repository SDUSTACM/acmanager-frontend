import request from "../utils/request";
const Cookies = require("js-cookie");
function application_confirm({ username, password }) {
    // let csrftoken = Cookies.get('csrftoken');
    // let headers = new Headers();
    // headers.append();
    // headers.append();
    return request(`/api/application/CONFIRM/`, {
        method: "GET",
        headers: {
            // 'content-type': 'application/json',
            // 'X-CSRFToken': csrftoken
        },   
    });
}

export default {
    application_confirm,
};