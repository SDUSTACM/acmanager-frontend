import Services from '../services';
import router from 'umi/router';
import { userInfo } from 'os';

export default {
  namespace: 'nav',
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
        if (pathname === '/trainings') {
          dispatch({ type: 'setSelectItemId', payload: { select_id: '2'} });
        }
      });
    },
  },
};