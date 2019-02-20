import Services from '../services/announcement';
import router from 'umi/router';
import { message } from 'antd';
import { userInfo } from 'os';

export default {
  namespace: 'announcement',
  state: {
    announcement_list: [],
    announcement: {
      "title": "title",
      "user": "user",
      "create_time": "create_time",
      "content": "content"
    },
  },
  reducers: {
    set_announcement(state, { payload: { announcement } }) {
      return { ...state, announcement };
    },
    set_announcement_list(state, { payload: { announcement_list } }) {
      return { ...state, announcement_list };
    },
  },
  effects: {
    *get_announcement({ payload: {id} }, { call, put }) {
      try {
          const announcement = yield call(Services.get_announcement, { id });
          yield put({ type: 'set_announcement', payload: { announcement } });
      } catch (e){
          console.log(e);
        //   yield put({ type: 'set_userLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    },
    *update_announcement({ payload: { id, title, content } }, { call, put }) {
      try {
          yield call(Services.update_announcement, { id, title, content });
          router.push(`/admin/announcements/`)
      } catch (e){
          console.log(e);
        //   yield put({ type: 'set_userLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    },
    *delete_announcement({ payload: { id } }, { call, put }) {
      try {
        yield call(Services.delete_announcement, { id });
        router.push(`/admin/announcements/`)
      } catch (e){
          console.log(e);
        //   yield put({ type: 'set_userLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    },
    *create_announcement({ payload: { title, content } }, { call, put }) {
      try {
        yield call(Services.create_announcement, { title, content });
        router.push(`/admin/announcements/`)
      } catch (e){
          console.log(e);
        //   yield put({ type: 'set_userLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    },
    *get_announcement_list({ }, { call, put }) {
      try {
          const announcement_list = yield call(Services.get_announcement_list);
          yield put({ type: 'set_announcement_list', payload: { announcement_list } });
      } catch (e){
          console.log(e);
        //   yield put({ type: 'set_userLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // return history.listen(({ pathname, query }) => {
      //   if (pathname.startsWith('/announcement/')) {
      //     dispatch({ type: 'get_announcement_list' });
      //   }
      // });
    },
  },
};