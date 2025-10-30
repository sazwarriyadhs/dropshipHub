import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  signin(email, password) {
    return axios
      .post(API_URL + 'signin', {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  signup(fullName, email, password) {
    return axios.post(API_URL + 'signup', {
      fullName,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
