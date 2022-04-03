import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
  getById(id) {
    return axios.get(API_URL + `getById?id=${id}`);
  }
  
  updatePass(user) {
    return axios.put(API_URL + 'updatePass', {
      login: user.login,
      password: user.password,
      oldPassword: user.oldPassword,
    });
  }
  
  forgotPass(user) {
    return axios.put(API_URL + 'forgotPass', {
      login: user.login,
      password: user.password,
      code: user.code,
    });
  }
}

export default new UserService();
