import { getCurrentUser } from '../services/userService';
import { User } from '../models/user';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';

interface GetCurrentUserAction {
    type: typeof GET_CURRENT_USER,
    payload: User
}

export type UserActionTypes = GetCurrentUserAction

export const getCurrentUserAction = () => (dispatch: any) => {
    return getCurrentUser().then(res => {
        dispatch({
            type: GET_CURRENT_USER,
            payload: res.data
        })
        
        return res.data;
    });
};