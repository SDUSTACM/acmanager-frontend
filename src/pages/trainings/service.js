import request from "../../utils/request";

const Cookies = require("js-cookie");
function get_training_list() {
    return request(`/api/trainings`);
}
function update_user({id, username, nick, class_name}) {
    let csrftoken = Cookies.get('csrftoken');
    return request(`/api/trainings/users/${id}/`, {
        method: "put",
        headers: {
            "content-type": "application/json",
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({username, nick, class_name})
    })
}
export default {
    get_training_list,
    // update_user,
}