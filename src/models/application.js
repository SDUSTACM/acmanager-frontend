import Services from '../services/application';
import router from 'umi/router';
import { userInfo } from 'os';
import { message } from 'antd';

export default {
  namespace: 'application',
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
    *confirm({}, { call, put }) {
      try {
          yield call(Services.application_confirm, {});
          message.success('发送申请成功，请耐心等待审核结果!');
        //   yield put({ type: 'setUserLoginState', payload: { username, role } });
      } catch (e){
          console.log(e);
          message.success('发送失败！');
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