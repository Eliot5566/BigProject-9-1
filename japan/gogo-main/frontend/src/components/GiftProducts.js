import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './product.css';
import './GiftProducts.css';

import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function GiftProducts(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <div className="gift-product">
      <img src={product.image} className="card-img-tops" alt={product.name} />
      <p className="product-name">{product.name}</p>
      {/* <strong className="product-price">{product.price}</strong> */}

      <Button onClick={() => addToCartHandler(product)}>+</Button>
    </div>
  );
}

export default GiftProducts;
