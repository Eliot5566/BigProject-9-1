import React from 'react';
import { Row, Col } from 'react-bootstrap';

import fourBoxImage from '../images/four_boxBodyIn_0.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import logger from '../logger.js';
import GiftProducts from '../components/GiftProducts';
import { useReducer } from 'react';
import { useParams } from 'react-router-dom';
import fourOf1 from '../images/4格/1.png';
import fourOf2 from '../images/4格/2.png';
import fourOf3 from '../images/4格/3.png';
import fourOf4 from '../images/4格/4.png';

import 'animate.css';

//製作一個客製化禮盒頁面
//第二步 選擇禮盒內容 分為三種 4格 6格 9格 點選商品後可以加入禮盒
//再次點選商品可以取消加入禮盒

export default function SelectContentFour() {
  const [selectedBox, setSelectedBox] = useState('null');
  const [showNextButton, setShowNextButton] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  // const [selectedProduct, setSelectedProduct] = useState('null');
  const { boxType } = useParams(); // 获取URL参数

  const [selectedProductPosition, setSelectedProductPosition] = useState(null); // 用于跟踪所选产品的位置

  const [selectedProduct, setSelectedProduct] = useState(null); // 用于跟踪所选产品
  const [selectedBoxImages, setSelectedBoxImages] = useState([]); // 用于存储已选择产品的图像
  const selectedBoxCapacity = 4;
  const handleClearSelection = () => {
    setSelectedProduct(null);
    setShowNextButton(false);
    setSelectedBoxImages([]);
  };
  const handleProductSelect = (product, position) => {
    if (selectedBoxImages.length == selectedBoxCapacity) {
      window.alert('只能選擇4個商品');
    } else {
      // 否则，更新所选产品的位置信息和图像数组
      setSelectedProduct(product);
      setShowNextButton(true);
      setSelectedProductPosition(position);
      setSelectedBoxImages((prevImages) => [...prevImages, product.image]);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  //根據action.type來決定要做什麼事情
  const reducer = (state, action) => {
    switch (action.type) {
      //如果是FETCH_REQUEST，就回傳一個新的state，並且把loading設為true
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      //如果是FETCH_SUCCESS，就回傳一個新的state，並且把loading設為false，並且把products設為action.payload
      case 'FETCH_SUCCESS':
        //action.payload是從後端傳來的資料
        return { ...state, products: action.payload, loading: false };
      //如果是FETCH_FAIL，就回傳一個新的state，並且把loading設為false，並且把error設為action.payload
      case 'FETCH_FAIL':
        //action.payload是從後端傳來的錯誤訊息
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  //   const [products, setProducts] = useState([]);

  //使用useEffect來取得資料
  useEffect(() => {
    //定義一個async function，並且使用axios來取得資料
    const fetchData = async () => {
      //使用try catch來處理錯誤
      //dispatch是用來發送action的，這裡發送的是FETCH_REQUEST
      //dispatch({ type: 'FETCH_REQUEST' })，這裡的type是自己定義的，可以是任何字串
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        //使用axios來取得資料
        const result = await axios.get('/api/products');
        //如果成功，就發送FETCH_SUCCESS，並且把從後端取得的資料放到action.payload
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        //如果失敗，就發送FETCH_FAIL，並且把錯誤訊息放到action.payload
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      //   setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      {showNextButton && (
        <button className="btn btn-primary nbt">
          {' '}
          <Link
            to={`/select-content/${selectedBox}`}
            className="btn btn-primary nbt"
          >
            下一步
          </Link>
        </button>
      )}
      <Row>
        <Col md={12}>
          <h4 className="text-center mb-3">選擇禮盒內容</h4>

          <Row>
            <Col className="text-center">
              {/* <div className="box-container">
                <img src={fourOf1} className="box-image" alt="box" />
                <img src={fourOf2} className="box-image" alt="box" />
              </div>
              <div className="box-container">
                <img src={fourOf3} className="box-image" alt="box" />
                <img src={fourOf4} className="box-image" alt="box" />
              </div> */}
            </Col>
          </Row>
        </Col>
      </Row>
      {/* 在此处显示已选择产品的图像 */}
      <div className="selected-products">
        <h3>已選擇的商品 </h3>
        {selectedBoxImages.map((image, index) => (
          <img
            key={index}
            src={image}
            className={`selected-product-image ${
              index === selectedBoxImages.length - 1 ? 'top-image' : ''
            }`}
            alt="selected product"
          />
        ))}
      </div>
      {showNextButton && (
        <button className="btn btn-primary nbt" onClick={handleClearSelection}>
          清空选择
        </button>
      )}
      {/* 添加顯示產品區域 點選產品後 可以添加到禮盒格子中 */}
      {/* 產品資料從資料庫導入 */}

      {/* 添加产品区域 */}
      <div className="category-buttons">
        <button className="btn" onClick={() => handleCategoryChange('all')}>
          所有商品
        </button>
        <button className="btn" onClick={() => handleCategoryChange('銅鑼燒')}>
          銅鑼燒
        </button>
        <button className="btn" onClick={() => handleCategoryChange('饅頭')}>
          饅頭
        </button>
        <button className="btn" onClick={() => handleCategoryChange('大福')}>
          大福
        </button>
        <button className="btn" onClick={() => handleCategoryChange('羊羹')}>
          羊羹
        </button>
        <button className="btn" onClick={() => handleCategoryChange('水饅頭')}>
          水饅頭
        </button>
      </div>

      <Row>
        {products
          .filter((product) =>
            selectedCategory === 'all'
              ? true
              : product.category === selectedCategory
          )
          .map((product) => (
            <Col
              key={product.slug}
              sm={6}
              md={4}
              lg={3}
              className="mb-3 giftPitcure"
              onClick={() => handleProductSelect(product)}
            >
              <GiftProducts product={product} />
            </Col>
          ))}
      </Row>
    </div>
  );
}
