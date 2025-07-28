//This is to select all the add to plate buttons
const addToPlate = document.querySelectorAll('.add-to-plate ');
console.log(addToPlate);

//This is to select all the items that will be displayed in the cart
const orderArea = document.getElementsByClassName('.order-area')
console.log(orderArea)
const cartItems = document.getElementById('cart-items')
const totalPrice = document.getElementById('total')
console.log(totalPrice)
let cart = {}
console.log(cart)
let total = 0

//THis will loop through 'each add to cart' button and set a click action
addToPlate.forEach( button => {
  button.addEventListener('click', ()=>{
    //console.log(button)
    const cartDisplays = button.parentElement; //This will get all elements in the same div as the button
    const foodName = cartDisplays.querySelector('.food-name').textContent;
    const foodPrice = parseInt(cartDisplays.querySelector('.food-price').textContent.replace ("N", "" ));
    const foodQty = cartDisplays.querySelector(".food-qty")
   

    //this will add or update cart
    if(cart[foodName]){
      cart[foodName].foodQty += 1
    }else{
      cart[foodName] ={
        foodPrice: foodPrice,
        foodQty: 1
      };
    }
    foodQty.value = cart[foodName].foodQty
   
    // console.log(cart)
    foodQty.addEventListener('change', () =>{
      if(cart[foodName]){
        cart[foodName].foodQty = parseInt(foodQty.value);

        updateCart()
      } })
    updateCart()
  })

})
function updateCart(){
  cartItems.innerHTML = " ";
  total = 0;
  for (let foodName in cart){
    const item= cart[foodName];
    const itemTotal = item.foodPrice * item.foodQty;
    total += itemTotal

    const orderedList = document.createElement('li');
    orderedList.textContent = `${foodName} *${item.foodQty} - N ${itemTotal}`
    cartItems.appendChild(orderedList)
  }
  totalPrice.textContent = total

}


//This is the function for the submit order button
const submitButton = document.getElementById('submit-order');
submitButton.addEventListener("click", function(){
  // alert("You have clicked the submit order button")
  const listB4submission =document.querySelectorAll('#cart-items li');
  // console.log(listB4submission)
  if(listB4submission.length === 0 ){
    alert("Select atleast one order");
  }
  else{ alert("Your Order has been submitted")}

  //this function clears the cart after submitting
  document.getElementById("cart-items").innerHTML = " ";
  total ="N0";
  document.getElementById("total").textContent = total

})

//this is to clear the cart
const resetCart =document.getElementById("restCart");
resetCart.addEventListener('click', ()=>{
  for (let key in cart){
    delete cart[key];
  }
  cartItems.innerHTML = "";
  total.innerHTML = '';

  //to reset all quantity inputs to 1
  document.querySelectorAll("food-qty").forEach(foodQty => {
    foodQty.value = 1
  });
  alert("Your order has been deleted")
})

