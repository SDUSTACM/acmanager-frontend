import request from "../../utils/request";

const Cookies = require("js-cookie");
function get_solve_statistic_list() {
    return request(`/api/crawl/solve_count/`);
}
function get_solve_statistic_detail(username) {
    return request(`/api/crawl/solve_count/${username}`);
}
function crawl_oj_data(username) {
    return request(`/api/crawl/solve_list/all/${username}`);
}
export default {
    get_solve_statistic_list,
    get_solve_statistic_detail,
    crawl_oj_data
}