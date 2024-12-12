import React from 'react';
import { Row, Col, Card, ListGroup, Form } from 'react-bootstrap';
import fourBoxImage from '../images/four_boxBodyIn_0.png';
import sixBoxImage from '../images/six_boxBodyIn_0.png';
import nineBoxImage from '../images/nine_boxBodyIn_0.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import 'animate.css';

//製作一個客製化禮盒頁面
//使用者可以在這個頁面上選擇禮盒的規格
//使用者可以在這個頁面上選擇禮盒的內容

//使用者可以在這個頁面上選擇禮盒的卡片

//第一步 選擇禮盒大小 分為三種 4格 6格 9格
//第二步 選擇禮盒內容 分為三種 4格 6格 9格 點選商品後可以加入禮盒
//再次點選商品可以取消加入禮盒

//第三步 選擇禮盒卡片 讓使用者決定要不要加入卡片

//第四步 確認禮盒內容 顯示禮盒內容 顯示禮盒包裝 顯示禮盒卡片 確認禮盒內容後 加入購物車

//第五步 確認購物車內容 顯示禮盒內容 顯示禮盒包裝 顯示禮盒卡片 顯示禮盒總價 確認購物車內容後 結帳

//第六步 結帳 顯示禮盒內容 顯示禮盒包裝 顯示禮盒卡片 顯示禮盒總價 顯示結帳資訊 確認結帳資訊後 進入付款頁面

//第七步 付款 顯示禮盒內容 顯示禮盒包裝 顯示禮盒卡片 顯示禮盒總價 顯示結帳資訊 顯示付款方式 確認付款方式後 進入付款頁面

//開始寫程式碼
// 第一步
// 製作一個禮盒大小的選擇區域
// 製作一個禮盒內容的選擇區域
// 製作一個禮盒卡片的選擇區域
// 製作一個禮盒內容確認區域
// 製作一個購物車內容確認區域
// 製作一個結帳資訊確認區域
// 製作一個付款方式確認區域

export default function CustomizedGiftBox() {
  const [selectedBox, setSelectedBox] = useState('null');
  const [showNextButton, setShowNextButton] = useState(false);
  const handleBoxChange = (option) => {
    setSelectedBox(option);
    setShowNextButton(true);
    console.log(selectedBox);
    // 點選禮盒後 添加 動畫
  };

  return (
    <div>
      <Row>
        <Col md={12}>
          <h4 className="text-center mb-3">選擇禮盒規格</h4>
          <Row>
            {/* //新增區域 放置下一步按鈕 */}
            <Col className="text-center m-5">
              {/* 根据 showNextButton 的状态显示下一步按钮 靠右 */}
              {/* 幫我把showNextButton放到畫面右邊 */}

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
            </Col>
          </Row>

          <Row>
            <Col className="text-center">
              <p>四格小資組合</p>
              <p>NT$480</p>
              <label>
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={fourBoxImage}
                    alt="禮盒大小"
                    height="200vh"
                    onClick={() => handleBoxChange('four')}
                    className={`box-image ${
                      selectedBox === 'four'
                        ? 'animate__animated animate__pulse animate__infinite infinite'
                        : ''
                    }`}
                  />
                  <Form.Check
                    type="radio"
                    label="四格小資組合  NT$480"
                    price="480"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    style={{ display: 'none' }}
                  />
                </div>
              </label>
            </Col>
            <Col className="text-center">
              <p>六格普通組合</p>
              <p>NT$680</p>
              <label>
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={sixBoxImage}
                    alt="禮盒大小"
                    height="200vh"
                    onClick={() => handleBoxChange('six')}
                    className={`box-image ${
                      selectedBox === 'six'
                        ? 'animate__animated animate__pulse animate__infinite infinite'
                        : ''
                    }`}
                  />

                  <Form.Check
                    type="radio"
                    label="六格小資組合  NT$680"
                    price="680"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    style={{ display: 'none' }}
                  />
                </div>
              </label>
            </Col>
            <Col className="text-center">
              <p>九格富翁組合</p>
              <p>NT$880</p>
              <label>
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={nineBoxImage}
                    alt="禮盒大小"
                    height="270vh"
                    onClick={() => handleBoxChange('nine')}
                    className={`box-image ${
                      selectedBox === 'nine'
                        ? 'animate__animated animate__pulse animate__infinite infinite'
                        : ''
                    }`}
                  />

                  <Form.Check
                    type="radio"
                    label="九格小資組合  NT$880"
                    price="880"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    style={{ display: 'none' }}
                  />
                </div>
              </label>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
