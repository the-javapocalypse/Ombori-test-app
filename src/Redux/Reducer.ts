import {combineReducers} from 'redux';
import AuthenticationReducer from "../Components/Screens/Authentication/Login/Reducer";
import SiderReducer from "../Components/Layout/Sider/Reducer";
import HeaderReducer from "../Components/Layout/Header/Reducer";
import GlobalReducer from "../Global/Reducer";

const RootReducer = combineReducers({
    sider: SiderReducer,
    header: HeaderReducer,
    global: GlobalReducer
})

export default RootReducer
