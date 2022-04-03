import axios from 'axios';

const API_URL = 'http://localhost:8080/api/superheros/';

class Superhero {
  getAll() {
    return axios.get(API_URL + 'getAll');
  }
  
  getById(id) {
    return axios.get(API_URL + `getById?id=${id}`);
  }
  
  deleteById(id) {
    return axios.delete(API_URL + `deleteById?id=${id}`);
  }

  new(superheros) {
    return axios.post(API_URL + 'new', superheros);
  }
  
  update(superheros) {
    return axios.put(API_URL + 'update', superheros);
  }
}

export default new Superhero();
