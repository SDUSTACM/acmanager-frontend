import Services from './service';
import router from 'umi/router';
import { userInfo } from 'os';

export default {
  namespace: 'setting',
  state: {
    profile: null,
  },
  reducers: {
    setUserProfile(state, { payload: data }) {
      return { ...state, profile: data };
    },
  },
  effects: {
    *update_profile({ payload: { nick, class_name } }, { call, put }) {
      try {
          yield call(Services.update_user_profile, { nick, class_name });
      } catch (e){
          console.log(e);
      }
    },
    *profile({}, { call, put }) {
      try {
          const { nick, class_name, username, is_confirm } = yield call(Services.get_user_profile);
          yield put({ type: 'setUserProfile', payload: { nick, class_name, username, is_confirm } });
      } catch (e){
          console.log(e);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/setting/profile') {
          dispatch({ type: 'profile' });
        }
      });
    },
  },
};