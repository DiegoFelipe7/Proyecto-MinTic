const callApi = async (url, options = {}) => {
  options.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const response = await fetch("http://localhost:3001/api" + url, options);
  const data = await response.json();
  return data;
    
};
  
const api = {
  products: {
    list() {
      return callApi("/products");
    },
    getById(value) {
      return callApi("/products/entire/"+value);
    },
    create(value) {
      return callApi("/products",{
        method: "POST",
        body: JSON.stringify(value),
      });
    },
    edit(value) {
      return callApi("/products/"+value._id, {
        method: "PUT",
        body: JSON.stringify(value),
      });
    },
    delete(value){
      return callApi("/products/"+value, {
        method: "DELETE",
      });
    }
  },
  categorias: {
    list() {
      return callApi("/categoria");
    },
    getById(value) {
      return callApi("/categoria/"+value);
    }
  },
  ventas: {
    list() {
      return callApi("/ventas");
    },
    create(value) {
      return callApi("/ventas",{
        method: "POST",
        body: JSON.stringify(value),
      });
    },
    getById(value) {
      return callApi("/ventas/"+value);
    },
    edit(value) {
      return callApi("/ventas/"+value._id, {
        method: "PUT",
        body: JSON.stringify(value),
      });
    },
    delete(value){
      return callApi("/ventas/"+value, {
        method: "DELETE",
      });
    }
  },
  Usuarios:{
    list(){
      return callApi("/Usuarios");
    },
    create(value) {
      return callApi("/Usuarios",{
        method: "POST",
        body: JSON.stringify(value),
      });
    },
      getById(value) {
      return callApi("/Usuarios/"+value);
    },
  },
};
  
  export default api;
  