import { axios } from '.';

/** Gets current user, also checks that an access token is still valid by making a request */
export const loadCurrentUser = () => axios.get('/users/me/');