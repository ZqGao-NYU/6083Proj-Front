import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Divider, Flex, Form, Input} from "antd";
import VehicleInfoCard from "./component/VehicleInfoCard";
import dayjs from "dayjs";
import PaymentMethodSelection from "./component/PaymentMethodSelection";

const Checkout = () => {
    const {
        vehicleID, startTime, endTime, totalPrice,
        imgUrl, make, type, dailyRate, overMileFee, officeLabel, officeID
    } = useParams();
    const vehicle = {
        vehicleID: vehicleID,
        startTime: startTime,
        endTime: endTime,
        totalPrice: totalPrice,
        overMileFee: overMileFee,
        imgUrl: imgUrl,
        make: make,
        type: type,
        dailyRate: dailyRate
    }
    let startTimeDayjs = dayjs(startTime);
    let endTimeDayjs = dayjs(endTime);
    const timeDiff = endTimeDayjs.diff(startTimeDayjs, 'day', true);
    const [form] = Form.useForm();
    const [paymentMethod, setPaymentMethod] = useState('credit-card');

    const handleChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <div className="checkout">
            <Flex justify={"space-evenly"}>
                <div className="payment-case">
                    <h1>Payment</h1>
                    <PaymentMethodSelection handleChange={handleChange}/>
                    <Form form={form} name="payment-info" className="payment-info">
                        <Divider/>
                        <Form.Item name="card_number">
                            <Input placeholder="Card Number"/>
                        </Form.Item>
                        <Form.Item name="card_holder">
                            <Input placeholder="Card Holder"/>
                        </Form.Item>
                        <Flex justify={"space-between"}>
                            <Form.Item name="expiration_date">
                                <Input placeholder="Expiration Date"/>
                            </Form.Item>
                            <Form.Item name="cvv">
                                <Input placeholder="CVV"/>
                            </Form.Item>
                        </Flex>
                    </Form>
                </div>
                <div className="payment-vehicle-card">
                    <Flex vertical={true}>
                        <VehicleInfoCard selectedVehicle={vehicle}/>
                        <Divider/>
                        <Flex vertical={true} gap="large">
                            <Flex vertical={true} gap="large">
                                <Flex justify="space-between">
                                    <span><strong>Pickup at: </strong> {officeLabel}</span>
                                    <span><strong>{startTimeDayjs.format('YYYY-MM-DD HH:mm')}</strong></span>
                                </Flex>
                                <Flex justify="space-between">
                                    <span><strong>Return at: </strong> {officeLabel}</span>
                                    <span><strong>{endTimeDayjs.format('YYYY-MM-DD HH:mm')}</strong></span>
                                </Flex>

                            </Flex>
                            <Flex justify={"space-evenly"}>
                                <h2>Rental ({timeDiff} day)</h2>
                                <h2>Total Price</h2>
                                <h2>${totalPrice}</h2>
                            </Flex>
                        </Flex>
                        <Button type="primary" size="large" block>Checkout</Button>

                    </Flex>
                </div>

            </Flex>

        </div>
    )
};

export default Checkout;
