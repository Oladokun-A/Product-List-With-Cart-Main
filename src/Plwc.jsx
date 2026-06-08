import Order from "./Order"
import Image1 from "./assets/images/image-waffle-desktop.jpg"
import Image2 from "./assets/images/image-creme-brulee-desktop.jpg"
import Image3 from "./assets/images/image-macaron-desktop.jpg"
import Image4 from "./assets/images/image-tiramisu-desktop.jpg"
import Image5 from "./assets/images/image-baklava-desktop.jpg"
import Image6 from "./assets/images/image-meringue-desktop.jpg"
import Image7 from "./assets/images/image-cake-desktop.jpg"
import Image8 from "./assets/images/image-brownie-desktop.jpg"
import Image9 from "./assets/images/image-panna-cotta-desktop.jpg"
import CartList from "./CartList"
import treeImg from "./assets/images/icon-carbon-neutral.svg"
import confirmImg from "./assets/images/icon-order-confirmed.svg"
import { useState } from "react"
import ConfirmOrderList from "./confirmOrderList"
import {useRef} from "react"
import cancelImg from "./assets/images/icon-remove-item.svg"
function Plwc(){
    const[cartItems, setCartItems] = useState([])
    const[order, setOrder] = useState(false)
    const[open, setIsOpen] = useState(false)
    const totalAmount = cartItems.reduce((sum, item) => sum + item.amount, 0)

    const cartRef = useRef(null)
    function scrollToCart(){
        cartRef.current?.focus()
    }
    function closeInstructions(){
        const instructions = document.querySelector(".instructions")
        instructions.style.display = "none"
    }
    const isInCart = (orderName) => {
        return cartItems.some(item => item.name === orderName)
    }
    function closeConfirmation(){
        setIsOpen(false)
        setCartItems([])
        setOrder(false)
    }
    function handleRemoveItem(index, order){
        const updatedItems = [...cartItems]
        updatedItems.splice(index, 1)
        setCartItems(updatedItems)
        setOrder(false)
    }
    function Modal({isOpen, onClose, children}){
        if(!isOpen) return null
        return(
            <div className="confirmation-modal">
                <div className="confirmation-content">
                    {children}
                    
                </div>
            </div>
        )
    }
    function handleAddToCart(orderName, amount, price, order, image){
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.name === orderName)
            if(existingItemIndex >= 0){
                const updatedItems = [...prevItems]
                updatedItems[existingItemIndex] = {...updatedItems[existingItemIndex], amount, total: (amount * price).toFixed(2), image }
                return updatedItems
                
                
            } else {
                return [...prevItems, { name: orderName, amount, price, total: (amount * price).toFixed(2), order, image }]
                
            }
        })
    }    
    return(
        <>
            <div className="app-container" tabIndex={0} onKeyDown={(e) => {
                if (e.key === "c") {
                    scrollToCart();
                }
            }}>
            <div className="order-section">
                <h1 className="order-title">Desserts</h1>
                <div className="order-container">
                    <Order image={Image1} orderName= "Waffle" description="Waffle with Berries" price= {6.50} sendData={handleAddToCart} orderStatus={isInCart("Waffle with Berries")} />
                    <Order image={Image2} orderName= "Crème Brûlée" description="Vanilla Bean Crème Brûlée" price= {7.00} sendData={handleAddToCart} orderStatus={isInCart("Vanilla Bean Crème Brûlée")} />
                    <Order image={Image3} orderName= "Macaron" description="Macaron Mix of Five" price= {8.00} sendData={handleAddToCart} orderStatus={isInCart("Macaron Mix of Five")} />
                    <Order image={Image4} orderName= "Tiramisu" description="Classic Tiramisu" price= {5.50} sendData={handleAddToCart} orderStatus={isInCart("Classic Tiramisu")} />
                    <Order image={Image5} orderName= "Baklava" description="Pistachio Baklava" price= {4.00} sendData={handleAddToCart} orderStatus={isInCart("Pistachio Baklava")} />
                    <Order image={Image6} orderName= "Pie" description="Lemon Meringue Pie" price= {5.00} sendData={handleAddToCart} orderStatus={isInCart("Lemon Meringue Pie")} />
                    <Order image={Image7} orderName= "Cake" description="Red Velvet Cake" price= {4.50} sendData={handleAddToCart} orderStatus={isInCart("Red Velvet Cake")} />
                    <Order image={Image8} orderName= "Brownie" description="Salted Caramel Brownie" price= {4.50} sendData={handleAddToCart} orderStatus={isInCart("Salted Caramel Brownie")} />
                    <Order image={Image9} orderName= "Panna Cotta" description="Vanilla Panna Cotta" price= {6.50} sendData={handleAddToCart} orderStatus={isInCart("Vanilla Panna Cotta")} />
                </div>
            </div>
            <div className="cart-container" ref={cartRef} tabIndex={0}>
                <h3 className="cart-title">Your Cart ({totalAmount}) </h3>
                <CartList cartItems={cartItems} onRemoveItem={handleRemoveItem} />
                <div className="order-summary" style={{display: cartItems.length > 0 ? "flex" : "none", flexDirection: "column", marginTop: "20px"    }}>
                    <div className="order-total">
                        <p className="order-total-text">Order Total</p>
                        <h3 className="order-total-amount">${cartItems.reduce((total, item) => total + parseFloat(item.total), 0).toFixed(2)}</h3>
                    </div>
                    <div className="carbon-neutral">
                        <img src={treeImg} alt="carbon neutral icon" className="carbon-neutral-icon" />
                        <p className="carbon-neutral-text">This is a <b>carbon-neutral</b> delivery</p>
                    </div>
                    <button className="confirm-order" onClick={() => setIsOpen(true)}>
                        Confirm Order
                    </button>
                    
                </div>
                
            </div>
            
        </div>
        <Modal isOpen={open} onClose={() => setIsOpen(false)} className="confirmation-modal">
                <div className="confirmation-content">
                    <img src={confirmImg} alt="confirm order icon" className="confirm-order-icon" />
                    <h2 className="confirm-order-text">Order Confirmed</h2>
                    <p className="confirm-order-description">We hope you enjoy your food!</p>
                    <div className="confirm-order-summary">
                        <ConfirmOrderList cartItems={cartItems} />
                        <div className="confirm-order-total">
                            <p className="confirm-order-total-text">Order Total</p>
                            <h3 className="confirm-order-total-amount">${cartItems.reduce((total, item) => total + parseFloat(item.total), 0).toFixed(2)}</h3>  
                        </div>
                        
                    </div>
                    <button className="close-confirmation" onClick={closeConfirmation}>Start New Order</button>
                </div>
        </Modal>
        <div className="instructions">
            <div className="instructions-content">
                <div className="instructions-header">
                    <h3>Instructions</h3>
                    <img src={cancelImg} alt="" onClick={closeInstructions} className="cancel-instructions" tabIndex={0}  onKeyDown={closeInstructions} />
                </div>
                
                <p>1. Add items to your cart by clicking the "Add to Cart" button.</p>
                <p>2. Review your cart and make any necessary changes.</p>
                <p>3. Click "Confirm Order" to place your order.</p>
            </div>
        </div>
        </>

        
    )
}

export default Plwc

