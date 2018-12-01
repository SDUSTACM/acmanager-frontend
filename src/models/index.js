import Services from '../services';
import router from 'umi/router';
import { userInfo } from 'os';

export default {
  namespace: 'user',
  state: {
    username: null,
    role: null,
    login_state: null,
    message: null,
  },
  reducers: {
    setUserLoginState(state, { payload: { username, role, login_state, message } }) {
      console.log(state);
      login_state = login_state || 1;
      message = message || "登录成功";
      return { ...state, username, role, login_state, message };
    },
    setUserSession(state, { payload: { username, nick }}) {
      return { ...state, username, nick };
    }
  },
  effects: {
    *login({ payload: { username, password } }, { call, put }) {
      try {
          console.log(username, password);
          const { role } = yield call(Services.login, { username, password });
          yield put({ type: 'setUserLoginState', payload: { username, role } });
          router.push('/');
      } catch (e){
          console.log(e);
          yield put({ type: 'setUserLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    },
    *logout({}, { call, put }) {
      try {
          yield call(Services.logout);
          yield put({ type: 'setUserLoginState', payload: { username: null, role: null, login_state: 0 } });
          router.push('/');
      } catch (e){
          console.log(e);
      }
    },
    *session({}, {call, put }) {
      try {
        const { username, nick } = yield call(Services.session);
        yield put({ type: 'setUserSession', payload: { username, nick } });
        // router.push('/');
    } catch (e){
        console.log(e);
        // yield put({ type: 'user/setUserSession', payload: { message: e.message } });
    }
    }
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname, query }) => {
  //       if (pathname === '/users') {
  //         dispatch({ type: 'user/session', payload: query });
  //       }
  //     });
  //   },
  // },
};