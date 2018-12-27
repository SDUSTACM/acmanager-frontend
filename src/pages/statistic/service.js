import request from "../../utils/request";

const Cookies = require("js-cookie");
function get_solve_statistic_list() {
    return request(`/api/crawl/solve_count/`);
}
export default {
    get_solve_statistic_list,
    // update_user,
}