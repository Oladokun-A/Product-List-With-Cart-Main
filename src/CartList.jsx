import cancelImg from "./assets/images/icon-remove-item.svg"
import noneImg from "./assets/images/illustration-empty-cart.svg"
function CartList({cartItems, onRemoveItem}){
    
    return(
        <div className="cart-list">
            {cartItems.length === 0 ? (
                <div className="empty-cart-container">
                    <img src={noneImg} alt="Empty cart illustration" className="empty-cart" />
                    <p className="empty-cart-text">Your added items will appear here</p>
                </div>
            ) : (
                cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <div className="cart-item-info">
                            <h4>{item.name}</h4>
                            <div className="cart-item-details">
                                <p className="cart-item-details-amount">{item.amount}x</p>
                                <p className="cart-item-details-price">@ ${item.price.toFixed(2)}</p>
                                <p className="cart-item-details-total">${item.total}</p>
                            </div>
                        </div>
                        <img src={cancelImg} alt="remove order" className="remove-item" onClick={() => onRemoveItem(index)} />
                        
                    </div>
                ))
            )}
        </div>
    )
}
export default CartList
/*<div>
                <h4>{props.name}</h4>
                <div>
                    <p>{props.amount}x</p>
                    <p>{props.price}</p>
                    <p>{props.total}</p>
                </div>
            </div>
            <div>
                <img src={cancelImg} alt="remove order" />
            </div> */