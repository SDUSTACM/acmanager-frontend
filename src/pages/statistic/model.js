import Services from './service';
import { message } from 'antd';
import router from 'umi/router';
import { userInfo } from 'os';
function addItem(list_data_dict, oj_id, cur_item) {
  if (oj_id in list_data_dict) {
    list_data_dict[oj_id].push(cur_item);
  } else {
    list_data_dict[oj_id] = [cur_item];
  }
  return list_data_dict
}
export default {
  namespace: 'statistic',
  state: {
    solve_statistic_dict: {},
    solve_statistic_score_dict: {},
    solve_statistic_ave_score_dict: {},
    oj_id_to_title: {},
    detail: {},
    oj_list: [],
    summary: []
    // username: null,
    // role: null,
    // login_state: null,
    // message: null,
  },
  reducers: {
    // setUserLoginState(state, { payload: { username, role, login_state, message } }) {
    //   console.log(state);
    //   login_state = login_state || 1;
    //   message = message || "登录成功";
    //   return { ...state, username, role, login_state, message };
    // },
    set_solve_statistic_dict(state, { payload: { solve_statistic_dict, solve_statistic_columns, solve_statistic_score_dict, solve_statistic_ave_score_dict }}) {
      return { ...state, solve_statistic_dict, solve_statistic_columns, solve_statistic_score_dict, solve_statistic_ave_score_dict };
    },
    set_oj_id_to_title(state, { payload: { oj_id_to_title } }) {
      return { ...state, oj_id_to_title };
    },
    set_solve_statistic_summary(state, { payload: { summary }}) {
      return { ...state, summary: summary }
    },
    set_solve_statistic_solvedetail(state, { payload: { detail }}) {
      return { ...state, detail: detail }
    },
    set_solve_statistic_ojlist(state, { payload: { oj_list }}) {
      return { ...state, oj_list: oj_list }
    },

   },
  effects: {
    *crawl_oj_data( { payload: { username }}, { call, put }) {
      try {
        yield call(Services.crawl_oj_data, username);
        message.success("更新成功!");
      } catch(e) {
        message.error("更新失败!");
      }
    },
    *get_solve_statistic_person({ payload: {username}}, { call, put }) {
      try {
        const { data } = yield call(Services.get_solve_statistic_detail, username);
        const summary = data["summary"];
        const detail = data["detail"];
        let oj_list = [];
        for (let [key, value] of Object.entries(detail)) {
          oj_list.push({
            key: key,
            title: value.title
          });
          detail[key] = Object.values(value.sub).map((item, index) => {
            return {
              chap: item.title,
              problem: item.problem,
              solve_problem: item.solve_problem,
              scores: item.scores,
              total_score: item.total_score,
              average_score: item.average_score
            };
          });
        }
        yield put({type: "set_solve_statistic_summary", payload: { summary }})
        yield put({type: "set_solve_statistic_solvedetail", payload: { detail }})
        yield put({type: "set_solve_statistic_ojlist", payload: { oj_list }})
      } catch (e) {
        //
      }
    },
    *get_solve_statistic_list({  }, { call, put }) {
      try {
          const {data} = yield call(Services.get_solve_statistic_list);
          let oj_id_to_title = {};
          let list_data_dict = {};
          let solve_statistic_score_dict = {};
          let solve_statistic_ave_score_dict = {};
          for (let item of data) {
            for (let oj of item["detail"]) {
              let cur_item = {};
              const oj_id = oj["id"];
              addItem(list_data_dict, oj_id, {
                "username": item["username"],
                "class_name": item["class_name"],
                "nick": item["nick"],
                "count": oj["count"]
              });
              addItem(solve_statistic_score_dict, oj_id, {
                "username": item["username"],
                "class_name": item["class_name"],
                "nick": item["nick"],
                "count": oj["score"]
              });
              addItem(solve_statistic_ave_score_dict, oj_id, {
                "username": item["username"],
                "class_name": item["class_name"],
                "nick": item["nick"],
                "count": oj["average_score"]
              });
              oj_id_to_title[oj_id] = oj["title"];
            }
          }
          console.log(oj_id_to_title, list_data_dict);
          yield put({ type: 'set_solve_statistic_dict', payload: { solve_statistic_dict: list_data_dict, solve_statistic_score_dict, solve_statistic_ave_score_dict} });
          yield put({ type: 'set_oj_id_to_title', payload: { oj_id_to_title } });
      } catch (e){
          console.log(e);
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/statistic') {
          dispatch({ type: 'get_solve_statistic_list' });
        } else if (pathname.startsWith('/statistic')) {
          const username = pathname.substring(11);
          dispatch({ type: 'get_solve_statistic_person', payload: {username}});
        }
      });
    },
  },
};