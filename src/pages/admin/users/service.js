import request from "../../../utils/request";
const Cookies = require("js-cookie");
function get_user_list() {
    return request(`/api/admin/users`);
}
function update_user({id, username, nick, class_name, roles }) {
    let csrftoken = Cookies.get('csrftoken');
    return request(`/api/admin/users/${id}/`, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({username, nick, class_name, roles })
    })
}
export default {
    get_user_list,
    update_user,
}