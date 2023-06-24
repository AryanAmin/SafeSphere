export const initialState = {
  user: null,
  loggedIn: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_LOGGED_IN: "SET_LOGGED_IN",
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_COMPLETED_ONBOARDING:
      return {
        ...state,
        loggedIn: action.loggedIn,
      };
    default:
      return state;
  }
};

export default reducer;
