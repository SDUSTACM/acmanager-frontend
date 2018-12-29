import Services from './service';
import router from 'umi/router';
import { userInfo } from 'os';
import { message } from 'antd';

export default {
  namespace: 'setting',
  state: {
    profile: null,
    oj_account_list: [],
    select_id: '0',
  },
  reducers: {
    setUserProfile(state, { payload: data }) {
      return { ...state, profile: data };
    },
    setOJAccountList(state, {payload: {data}}) {
      return { ...state, oj_account_list: data }
    },
    setSelectItemId(state, { payload: { select_id } }) {
      return { ...state, select_id };
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
    *get_oj_account({}, {call, put, select, take } ) {
      try {
        yield put({ type: 'user/session'});
        yield take('user/session/@@end');
        const username = yield select(state => state.user.username);
        const data = yield call(Services.get_oj_account, {username});
        console.log(data);
        yield put({ type: 'setOJAccountList', payload: { data } });
      } catch (e){
        console.log(e);
      }
    },
    *update_oj_account({ payload: { username, data } }, {call, put }) {
      try {
        yield call(Services.update_oj_account, { username, data });
        message.success('更新成功!');
        yield put({ type: 'setOJAccountList', payload: { data } });
        // yield put({ type: 'setUserProfile', payload: { nick, class_name, username, is_confirm } });
      } catch (e){
          console.log(e);
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/setting/crawl') {
          dispatch({ type: 'get_oj_account'});
        } else if (pathname === '/setting/profile') {
          dispatch({ type: 'profile'});
        }

        if (pathname === '/setting/profile') {
          dispatch({ type: 'setSelectItemId', payload: { select_id: '0' } });
        } else if (pathname === '/setting/crawl') {
          dispatch({ type: 'setSelectItemId', payload: { select_id: '1' } });
        } else if (pathname === '/setting/repassword') {
          dispatch({ type: 'setSelectItemId', payload: { select_id: '2' } });
        }
      });
    },
  },
};
