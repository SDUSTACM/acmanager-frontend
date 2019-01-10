import Services from './service';
import router from 'umi/router';
import { userInfo } from 'os';
import { message } from 'antd';

export default {
  namespace: 'users',
  state: {
    user_list: null
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
    set_user_list(state, { payload: { user_list }}) {
      return { ...state, user_list };
    }
  },
  effects: {
    *get_user_list({  }, { call, put }) {
      try {
          const data = yield call(Services.get_user_list);
          console.log("####");
          console.log(data);
          yield put({ type: 'set_user_list', payload: { user_list: data } });
        //   router.push('/');
      } catch (e){
          console.log(e);
        //   yield put({ type: 'set_userLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    },

    *update({ payload: { id, username, nick, class_name, roles }}, {call, put}) {
      try {
        console.log(id, username, nick, class_name);
        const data = yield call(Services.update_user, {id, username, nick, class_name, roles} );
        yield put({ type: 'get_user_list'});
        message.success("修改成功");
        //   router.push('/');
      } catch (e){
        console.log(e);
        message.success("修改失败");
        //   yield put({ type: 'set_userLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/admin/users') {
          dispatch({ type: 'get_user_list' });
        }
      });
    },
  },
};