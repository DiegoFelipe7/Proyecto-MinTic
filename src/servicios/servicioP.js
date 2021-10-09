const serviceP = async (data) => {
    /*const response = await fetch("http://localhost:3001/api/products", {method:'POST', data});
    const r = await response.json();
    console.log(r, "serP");*/
    const r = new Request("http://localhost:3001/api/products", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    
    // pass request object to `fetch()`
    fetch(r)
        .then(res => res.json())
        .then(res => console.log(res));
    return r;
  };
  
  export default serviceP;