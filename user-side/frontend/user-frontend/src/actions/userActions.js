import axios from 'axios';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (loginData) => {
  return (dispatch) => {
      dispatch(loginRequest());
      axios.post('http://localhost:8000/api/login', loginData).then(response => {

      if(response.data.status=='success'){
        localStorage.setItem('token', response.data.token);
        const userData = { first_name: response.data.user.first_name,
                           last_name: response.data.user.last_name,
                           id: response.data.user.id,
                           email: response.data.user.email,
                           image_url:response.data.user.image_url};
       
        dispatch(loginSuccess(userData));
        window.location.href='/'
      }
      
      else{
      dispatch(loginFailure(response.data.message));
      }
      }).catch(error => {
        dispatch(loginFailure(error.response.data.message));
      });
}
};
