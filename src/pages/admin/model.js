export default {
  namespace: 'admin',
  state: {
    select_id: '0',
  },
  reducers: {
    setSelectItemId(state, { payload: { select_id } }) {
      return { ...state, select_id };
    },
  },
  effects: {
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/admin/users') {
          dispatch({ type: 'setSelectItemId', payload: { select_id: '0' } });
        // } else if (pathname === '/setting/crawl') {
        //   dispatch({ type: 'setSelectItemId', payload: { select_id: '1' } });
        // } else if (pathname === '/setting/repassword') {
        //   dispatch({ type: 'setSelectItemId', payload: { select_id: '2' } });
        }
      });
    },
  },
};
