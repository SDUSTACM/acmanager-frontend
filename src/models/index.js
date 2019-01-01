import Services from '../services';
import router from 'umi/router';
import { message } from 'antd';
import { userInfo } from 'os';

export default {
  namespace: 'user',
  state: {
    username: null,
    roles: [],
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
    setUserSession(state, { payload: { username, nick, roles }}) {
      return { ...state, username, nick, roles };
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
          // TODO: 更加精细的错误处理          
          message.error("登录失败，请检查用户名或者密码是否有误，或者网络连接是否有效。");
          yield put({ type: 'setUserLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    },
    *register({ payload: { username, password, profile } }, { call, put }) {
      try {
          console.log(username, password, profile );
          yield call(Services.register, { username, password, profile });
          router.push('/');
      } catch (e){
          console.log(e);
          // yield put({ type: 'setUserLoginState', payload: { username, login_state: 0, message: e.message } });
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
        const { username, nick, roles } = yield call(Services.session);
        yield put({ type: 'setUserSession', payload: { username, nick, roles } });
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