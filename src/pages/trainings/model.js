import Services from './service';
import router from 'umi/router';
import { userInfo } from 'os';

export default {
  namespace: 'trainings',
  state: {
    training_list: null
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