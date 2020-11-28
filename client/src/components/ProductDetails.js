const ProductDetails = ({ product }) => {
    function handleEditClick() {
        console.log('edit');
    }
    function handleDeleteClick() {
        console.log('delete');
    }
    return (
        <div>
            <h1>Poduct Details</h1>
            <div>
                <img src="https://via.placeholder.com/450x200" alt="product image" />
            </div>
            <div>
                {/* Product information here */}
                <div>
                    <p>{product.name}</p>
                    <span>{product.rating}</span>
                    <p>{product.price}</p>
                </div>
                <div>
                    <p>{product.available ? 'avaible' : 'out of stock'}</p>
                </div>
            </div>
            <div>
                {/* Action button here */}
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
    );
}

export default ProductDetails;