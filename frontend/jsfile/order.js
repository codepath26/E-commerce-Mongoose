let orderdata = document.getElementById('order-data') 
document.addEventListener('DOMContentLoaded' , adddata);
async function adddata(e){

  let orders = await axios.get('http://localhost:4000/orders');
 let products = orders.data;
 console.log(products)
  if(orders.data.length <= 0){
    orderdata.innerHTML = ` <h1>Nothing there!</h1>`
  }
  else{
    products.forEach(order =>{
      orderdata.innerHTML +=` <li class='list-unstyled'><h3> Order : #${order._id} </h3> </li><ul> `
      if(order.products.length === 0){  
        orderdata.innerHTML += `<li class='list-unstyled'> <h5>Nothing In Products</h5> </li></ul> `
      }else{
        let items = order.products;
        items.forEach(item =>{ 
          orderdata.innerHTML += ` <li class='list-unstyled'> <h5>${item.product.title}(${item.quantity})</h5> </li></ul> `}) 
        }
  })


 }

}
      