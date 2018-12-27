import request from "../../utils/request";
const Cookies = require("js-cookie");
function get_application_message() {
    return request(`/api/message/`, {
        method: "get",
        headers: {
            "content-type": "application/json",
        },
    })
}
function send_verify_message({ id, status }) {
    let csrftoken = Cookies.get('csrftoken');
    return request(`/api/verify/${id}/`, {
        method: "post",
        headers: {
            "content-type": "application/json",
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({status})
    })
    return 
}
export default {
    get_application_message,
    send_verify_message,
}