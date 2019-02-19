import request from "../utils/request";
const Cookies = require("js-cookie");
function get_announcement({ id }) {
    return request(`/api/announcements/${id}`, {
        method: "get",
        headers: {
            "content-type": "application/json",
        },
    })
}
function get_announcement_list() {
  return request(`/api/announcements/`, {
      method: "get",
      headers: {
          "content-type": "application/json",
      },
  })
}
function delete_announcement({ id }) {
    let csrftoken = Cookies.get('csrftoken');
    return request(`/api/announcements/${id}/`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": csrftoken
      },
  })
}
function update_announcement({ id, title, content }) {
    let csrftoken = Cookies.get('csrftoken');
    return request(`/api/announcements/${id}/`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({title, content})
    })
}
function create_announcement({ title, content }) {
    let csrftoken = Cookies.get('csrftoken');
    return request(`/api/announcements/`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({title, content})
    })
}
export default {
    get_announcement,
    update_announcement,
    get_announcement_list,
    delete_announcement,
    create_announcement
}