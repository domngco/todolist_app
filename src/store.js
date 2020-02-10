import { createStore } from "redux";

const reducer = (state, action) => {
  if (action.type === "signup-successful") {
    return {
      ...state,
      loggedIn: true,
      username: action.username,
      userID: action.userID
    };
  }
  if (action.type === "login-successful") {
    return {
      ...state,
      loggedIn: true,
      username: action.username,
      userID: action.userID
    };
  }
  return state;
};

const store = createStore(
  reducer,
  { loggedIn: false, username: "", userID: "" },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
