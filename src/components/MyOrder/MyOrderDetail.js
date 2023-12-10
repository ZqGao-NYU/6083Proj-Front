import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Card, Row, Col, Table, message, Button} from 'antd';

import axios from 'axios';
const MyOrderDetail = () => {
    const { orderId , make, type} = useParams();
    const navigate = useNavigate();
    const [orderOne, setOrderOne] = useState(null);
    const [orderTwo, setOrderTwo] = useState(null);
    const [orderThree, setOrderThree] = useState(null);
    const api = axios.create({
        baseURL: 'http://localhost:8080/api/v1/order',
        headers: {
            'Content-Type': 'application/json',
            'Token': sessionStorage.getItem('token')
        }
    });
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                // Make a request to your backend API with the orderId
                const response = await api.get(`/detail/${orderId}`); // Update the API endpoint accordingly

                if
                (response.data.code === 200) {
                    setOrderOne(response.data.data.one);
                    setOrderTwo(response.data.data.two);
                    setOrderThree(response.data.data.three);
                } else {
                    message.error(response.data.message);
                    if(response.data.message === 'Please login.'){
                        navigate('/');
                    }
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        // Call the function to fetch data when the component mounts
        fetchOrderDetails();
    }, [orderId]); // Run the effect when orderId changes
    ;

    function toCheckout() {
        navigate(`/set-order/reserve-vehicle/check-out/
        ${orderOne.vehicleID}/${orderOne.pickupDate}/${orderOne.dropoffDate}/
        ${orderTwo.originalPrice}/
        ${encodeURIComponent(orderOne.imgUrl)}/
        ${orderOne.make}/
        ${orderOne.type}/
        ${orderOne.dailyRate}/
        ${orderOne.overMileFee}/
        ${orderOne.address}/
        ${orderTwo.invoiceId}`);
    }

    return (
        <Card title="Order Detail" style={{ margin: 50, marginBottom: 200, paddingBottom: 50 }}>
            <Row gutter={[16, 16]} justify="center">
                <Col span={10}>
                    <Row>
                        <Col span={8}>

                            {orderOne ? (
                                <img
                                    src={orderOne.imgUrl}
                                    alt="Order"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        marginLeft: '10px',
                                    }}
                                />
                            ) : (
                                <p>Loading order details...</p>
                            )}
                        </Col>
                        <Col span={16}>

                            <div>



                                {orderOne ? (
                                    <div>
                                        <p><strong>Address:</strong>&nbsp;&nbsp;  {orderOne.address} </p>
                                        <p><strong>Pickup Date:</strong>&nbsp;&nbsp;  {orderOne.pickupDate}</p>
                                        <p><strong>Start Odometer:</strong>&nbsp;&nbsp; {1445.6} </p>
                                        <p><strong>End Odometer:</strong> &nbsp;&nbsp; {1610.3}</p>
                                        <p><strong>Daily Odometer Limit:</strong> &nbsp;&nbsp;{500}</p>
                                    </div>
                                ) : (
                                    <p>Loading order details...</p>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={7}>
                    <div>
                        {orderTwo ? (
                            <div>
                                <p><strong>Invoice Date:</strong>&nbsp;&nbsp;  {orderTwo.invoiceDate} </p>
                                <p><strong>Total Amount:</strong> &nbsp;&nbsp; {orderTwo.originalPrice}</p>
                                <p><strong>Corp Discount:</strong> &nbsp;&nbsp; {orderTwo.corpDiscount}</p>
                                <p><strong>Coupon Discount:</strong>&nbsp;&nbsp; {orderTwo.couponDiscount} </p>
                                <p><strong>Invoice Amount:</strong> &nbsp;&nbsp; {orderTwo.finalPrice}</p>
                            </div>
                        ) : (
                            <p>Loading order details...</p>
                        )}

                    </div>
                </Col>
                <Col span={7}>
                    <div>
                        {orderThree ? (
                            <div>
                                <p><strong>Payment Method:</strong>&nbsp;&nbsp;  {orderThree.payMethod}</p>
                                <p><strong>Card Number:</strong>&nbsp;&nbsp; {orderThree.cardNo} </p>
                                <p><strong>Payment Date:</strong>&nbsp;&nbsp;  {orderThree.payDate}</p>
                                <p><strong>Payment Amount:</strong>&nbsp;&nbsp; {orderThree.payAmount} </p>
                            </div>

                        ) : (
                            <p>Loading order details...</p>
                        )}

                    </div>
                </Col>
                <Button type="primary" style={{ marginLeft: 50, marginTop: 50 }} onClick={toCheckout}>
                    Checkout
                </Button>
            </Row>
        </Card>
    );
};

export default MyOrderDetail;
