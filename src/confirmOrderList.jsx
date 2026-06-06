
function ConfirmOrderList({ cartItems }) {
    
    return (
        <div className="confirm-order-list">
            {cartItems.map((item, index) => (
                <div key={index} className="confirm-order-item">
                    <div className="confirm-order-item-info">
                        <img src={item.image} alt="confirmed-order-image" className="confirmed-order-image" />
                        <div className="confirm-order-item-details">
                            <h4 className="confirm-order-item-name">{item.name}</h4>
                            <div className="confirm-order-item-details-inner">
                                <p className="confirm-order-items-details-amount">{item.amount}x</p>
                                <p className="confirm-order-items-details-price">@ ${item.price.toFixed(2)}</p>   
                            </div> 
                        </div>
                        <p className="confirm-order-items-details-total">${item.total}</p>
                    </div>
                    
                </div>
            ))}
        </div>
    );
}
export default ConfirmOrderList