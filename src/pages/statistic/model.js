import Services from './service';
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
    }
   },
  effects: {
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

          //   router.push('/');
      } catch (e){
          console.log(e);
        //   yield put({ type: 'set_userLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/statistic') {
          dispatch({ type: 'get_solve_statistic_list' });
        }
      });
    },
  },
};