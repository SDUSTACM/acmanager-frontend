import request from "../../utils/request";
const Cookies = require("js-cookie");
function update_user_profile({ nick, class_name }) {
    let csrftoken = Cookies.get('csrftoken');
    return request(`/api/user/profile/`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken': csrftoken
        },   
        body: JSON.stringify({nick, class_name })
    });
}
function get_user_profile() {
    return request(`/api/user/profile/`);
}
export default {
    update_user_profile,
    get_user_profile,
};