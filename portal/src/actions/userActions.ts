import { loadCurrentUser } from '../services/userService';
import { IUser } from '../models/user';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';

interface loadCurrentUserAction {
    type: typeof GET_CURRENT_USER,
    payload: IUser
}

export type UserActionTypes = loadCurrentUserAction

export const loadCurrentUserAction = () => (dispatch: any) => {
    return loadCurrentUser().then(res => {
        dispatch({
            type: GET_CURRENT_USER,
            payload: res.data
        })
        
        return res.data;
    });
};