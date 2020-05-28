import { combineReducers } from "redux";

import user from "./user_reducer";
import chats from "./chat_reducer";

//in reducers, I will combine all reducers to one reducer object
const rootReducer = combineReducers({
  user,
  chats,
});

export default rootReducer;
