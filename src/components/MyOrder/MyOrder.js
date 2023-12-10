import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button,Card, Spin,message } from 'antd'; // Import Spin for loading indication
import axios from 'axios';

const MyOrder = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredOrder, setHoveredOrder] = useState(null);
    const api = axios.create({
        baseURL: 'http://localhost:8080/api/v1/order',
        headers: {
            'Content-Type': 'application/json',
            'Token': sessionStorage.getItem('token')
        }
    });
    console.log(sessionStorage.getItem('token'));

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orderList',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': sessionStorage.getItem('token')
                    }
                });

                if
                (response.data.code === 200) {
                    // Handle successful response, e.g., show success message
                    console.log(response);
                    setOrders(response.data.data);
                } else {
                    message.error(response.data.message);
                    if(response.data.message === 'Please login.'){
                        navigate('/');
                    }
                }

            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

    const handleDetail = (orderId) => {
        navigate(`/my-order-detail/${orderId}`);
    };

    const handleReorder = () => {
        navigate('/set-order');
    };

    return (
        <Card title="Order List" style={{margin: 50,marginBottom:200,paddingBottom: 50}}>
            <Row gutter={[16, 16]} justify="center" style={{ marginTop: 50 }}>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    orders.map((order) => (
                        <Col key={order.orderId} span={16}>
                            <div
                                style={{
                                    boxShadow: `0 4px 8px rgba(0, 0, 0, ${hoveredOrder === order.orderId ? '0.3' : '0.1'})`,
                                    borderRadius: '8px',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    // width: "500px",
                                    transform: hoveredOrder === order.orderId ? 'scale(1.05)' : 'scale(1)',
                                }}
                                onMouseEnter={() => setHoveredOrder(order.orderId)}
                                onMouseLeave={() => setHoveredOrder(null)}
                            >
                                <Row gutter={[16, 16]} align="middle" style={{
                                    height: 150,
                                    overflow: 'hidden',
                                    position: 'relative',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Col span={6}>
                                        <div
                                            style={{
                                                width: '90px',
                                                height: '90px',
                                            }}
                                        >
                                            <img
                                                src={order.imgUrl}
                                                alt="Order"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                    marginLeft: '60px',
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={12}   onClick={() => handleDetail(order.orderId)}>
                                        <p style={{ fontWeight: 1000, fontSize: 30 }}>{order.make} - {order.model}</p>
                                        <p style={{marginTop: -30}}>{order.invoiceDate} <strong style={{color: "red",marginLeft: 20}}>${order.finalPrice}</strong></p>
                                        <p ></p>
                                    </Col>
                                    <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button type="primary" style={{marginRight: 50}} onClick={() => handleReorder(order.orderId)}>
                                            ReOrder
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    ))
                )}
            </Row>
        </Card>
    );
};

export default MyOrder;