import cartImg from "./assets/images/icon-add-to-cart.svg"
import removeImg from "./assets/images/icon-decrement-quantity.svg"
import addImg from "./assets/images/icon-increment-quantity.svg"
import { useState } from "react"
import CartList from "./CartList"
function Order(props) {
    const {orderName, price, sendData, description, image, orderStatus} = props
    
    const[amount, setAmount] = useState(0)
    function addToCart(){
        
        setAmount(1)
        sendData(description, 1, price, true, image)
    }
    function decreaseOrder(){
        const newAmount = amount > 1 ? amount - 1 : 1
        setAmount(newAmount)
        sendData(description, newAmount, price, orderStatus, image)
    }
    function increaseOrder(){
        const newAmount = amount + 1
        setAmount(newAmount)
        sendData(description, newAmount, price, orderStatus, image)
    }
    function handleKeyDown(event) {
        switch (event.key) {
            case "Enter":
                if (orderStatus) {
                    decreaseOrder();
                }
                break;
            case "d":
                if (orderStatus) {
                    decreaseOrder();
                }
                break;
            case "i":
                if (orderStatus) {
                    increaseOrder();
                }
                break;
            case "ArrowDown":                
                if (orderStatus) {
                    decreaseOrder();
                }
                break;
            case "ArrowUp":
                if (orderStatus) {
                    increaseOrder();
                }
                break;
             default:
                break;
        }
    }
    
    return(
        <div>
            <div className="order">
                <div className="order-image-container" >
                    <img src={image} alt="Order-image" className="order-image" style={{borderColor: orderStatus ? "hsl(14, 86%, 42%)" : "transparent"}} />
                    {!orderStatus?(
                        <button className="addBut" onClick ={addToCart} onKeyDown={handleKeyDown}>
                            <img src={cartImg} alt="Add to Cart" className="cart-icon" />
                            <p className="add-to-cart">Add to Cart</p>
                        </button>
                    ):(
                        <div className="quantity-container" >
                            <button className="quantity-button" onKeyDown={handleKeyDown}>
                                <img src={removeImg} alt="Remove from Cart" className="quantity-icon" onClick={decreaseOrder} />
                            </button>
                            <p className="quantity">{amount}</p>
                            <button className="quantity-button" onKeyDown={handleKeyDown}>
                                <img src={addImg} alt="Add to Cart" className="quantity-icon" onClick={increaseOrder} />
                            </button>
                        </div>
                    )}
                </div>
                <div className="order-info">
                    <p className="order-name">{orderName}</p>
                    <p className="order-description">{description}</p>
                    <p className="order-price">${price.toFixed(2)}</p>
                </div>
            </div>
           
        </div>

    )
}


export default Order;

/*
<div>
                
                <CartList items={[
                    { name: "Classic Tiramisu", amount: 1, price: 5.50, total: 5.50 },
                    { name: "Vanilla Bean Crème Brûlée", amount: 4, price: 7.00, total: 28.00 },
                    { name: "Vanilla Panna Cotta", amount: 1, price: 6.50, total: 6.50 }
                ]} />
                <div>
                    <p>Order Total</p>
                    <h3>$46.50</h3>
                </div>
                <div>
                    <img src={treeImg} alt="carbon neutral icon" />
                    <p>This is a <b>carbon-neutral</b> delivery</p>
                    
                </div>
                <button>Confirm Order</button>
            </div>*/