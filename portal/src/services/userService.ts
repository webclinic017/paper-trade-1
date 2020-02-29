import { axios } from '.';

/** Gets current user, also checks that an access token is still valid by making a request */
export const getCurrentUser = () : Promise<any> => axios.get('/users/me/');