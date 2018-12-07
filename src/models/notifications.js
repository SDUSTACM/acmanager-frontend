import Services from '../services';
export default {
  namespace: 'notifications',
  state: {
    data: [],
  },
  reducers: {
    setNotificationList(state, { payload: { data } }) {
      return { ...state, data };
    },

  },
  effects: {
    *get({ }, { call, put }) {
      try {
          const {all_list} = yield call(Services.get_notifications, {});
          yield put({ type: 'setNotificationList', payload: { data:all_list } });
      } catch (e){
          console.log(e);
      }
    },
    *audit({payload : { identifier, username, is_approve }}, {call, put }) {
      try {
        yield call(Services.audit_application, {identifier, username, is_approve});
        alert("操作成功");
      } catch (e){
          console.log(e);
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