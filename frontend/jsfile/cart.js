const cartList = document.getElementById('cart');
const displaycart = document.getElementById('displaycart');
const orderNowButton = document.getElementById('orderNowButton');
let item = document.getElementById('data');
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
// console.log(productId);
document.addEventListener('DOMContentLoaded',fetchdata)
async function fetchdata (e){
  console.log(productId)
  if(productId){
    await  axios.post(`http://localhost:4000/cart`,{ productId:productId})
  };
  let products = await axios.get(`http://localhost:4000/cart`);
  if(products.data.length == 0){
    displaycart.innerHTML = `<h1 style="font-weigth : 'bold">Nothing In The Cart</h1>`
  }else{
    const cartItems = products.data;
    console.log(cartItems)
    cartItems.forEach(item => {
      const cartItem = document.createElement('li');
      cartItem.className = 'list-group-item d-flex justify-content-between';
      cartItem.innerHTML += `
      ${item.productId.title}
      <span>${item.quantity}</span>
      <input type="hidden" id="productId" name="productId" value = ${item.productId._id}>
      <button class="btn btn-danger btn-sm delete-button">Delete</button>
      `;
      cartList.appendChild(cartItem);
    });
    // Add event listener to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', removeCartItem);
    });
    
    async  function removeCartItem(event) {
      let li = event.target.parentNode
      let item = document.getElementById('productId')
      let id = item.value
      const listItem = event.target.closest('.list-group-item');
      await axios.post('http://localhost:4000/cart-delete-item',{
        productId : id,
      })
      cartList.removeChild(listItem);
    }
    
    // Add event listener to "Order Now" button
    orderNowButton.addEventListener('click', placeOrder);
    
    async function placeOrder() {
      try{
        await axios.post('http://localhost:4000/create-order')
        window.location.href ='../htmlFile/order.html';
        cartList.innerHTML = '';
      }catch(err){
        console.log(err);
      }
    }
  }
}
  
    

    