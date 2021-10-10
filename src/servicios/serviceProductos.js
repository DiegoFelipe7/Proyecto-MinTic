const serviceProductos = async () => {
  const response = await fetch("http://localhost:3001/api/products");
  const data = await response.json();
  return data;
};

export default serviceProductos;