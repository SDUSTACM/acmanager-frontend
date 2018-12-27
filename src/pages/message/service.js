import request from "../../utils/request";
const Cookies = require("js-cookie");
function get_application_message() {
    // let csrftoken = Cookies.get('csrftoken');
    return request(`/api/notifications/`, {
        method: "get",
        headers: {
            "content-type": "application/json",
            // "X-CSRFToken": csrftoken
        },
        // body: JSON.stringify({username, nick, class_name})
    })
}
export default {
    get_application_message,
}