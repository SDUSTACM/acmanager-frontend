import Services from '../services/trainings';
import router from 'umi/router';
import { userInfo } from 'os';

export default {
  namespace: 'trainings',
  state: {
    training_list: null,
    training_round_contest_list: [
      {
        id: 1,
        name: "比赛1",
        description: "这里是比赛1"
      }, 
      {
        id: 2,
        name: "比赛2",
        description: "这里是比赛2"
      }
    ],
    training_rounds_list: [
    ],
    training_stage_list: []
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
    set_training_list(state, { payload: { training_list }}) {
      return { ...state, training_list };
    }, 
    set_round_list(state, { payload: { training_rounds_list }}) {
      return { ...state, training_rounds_list };
    },
    set_training_stage_list(state, { payload: { training_stage_list }}) {
      return { ...state, training_stage_list };
    }
  },
  effects: {
    *get_training_list({  }, { call, put }) {
      try {
          const data = yield call(Services.get_training_list);
          yield put({ type: 'set_training_list', payload: { training_list: data } });
        //   router.push('/');
      } catch (e){
          console.log(e);
        //   yield put({ type: 'set_userLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    },
    *get_round_list({ payload: { training_id } }, { call, put }) {
      try {
          const data = yield call(Services.get_round_list, { training_id });
          yield put({ type: 'set_round_list', payload: { training_rounds_list: data } });
      } catch (e){
          console.log(e);
        //   yield put({ type: 'set_userLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    },
    *get_training_stage_list({ payload: { training_id } }, { call, put }) {
      try {
          const data = yield call(Services.get_training_stage_list, { training_id });
          yield put({ type: 'set_training_stage_list', payload: { training_stage_list: data } });
      } catch (e){
          console.log(e);
        //   yield put({ type: 'set_userLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    },
    

    *update({ payload: { id, username, nick, class_name }}, {call, put}) {
      try {
        console.log(id, username, nick, class_name);
        const data = yield call(Services.update_user, {id, username, nick, class_name} );
        yield put({ type: 'get_user_list'});
      //   router.push('/');
      } catch (e){
          console.log(e);
        //   yield put({ type: 'set_userLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/trainings') {
          dispatch({ type: 'get_training_list' });
        }
      });
    },
  },
};