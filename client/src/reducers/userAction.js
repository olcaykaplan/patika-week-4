import { USER_LIST } from '../utils/constant';

var DEFAULT_STATE = {
  userList: [],
};

const userActionReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case USER_LIST:
      return {
        ...state,
        userList: action.data && action.data,
      };
    default:
      return state;
  }
};
export default userActionReducer;
