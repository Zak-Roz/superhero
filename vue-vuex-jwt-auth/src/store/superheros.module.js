import Superhero from '../services/superheros.service';

export const superheros = {

  namespaced: true,
  actions: {
    getAll() {
      return Superhero.getAll();
    },

    getById(_, id) {
      return Superhero.getById(id);
    },
    
    deleteById(_, id) {
      return Superhero.deleteById(id);
    },

    new(_, data) {
      return Superhero.new(data).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    
    update(_, data) {
      return Superhero.update(data).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
  },
};
