import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Divider, Flex, Form, Input, message} from "antd";
import VehicleInfoCard from "./component/VehicleInfoCard";
import dayjs from "dayjs";
import PaymentMethodSelection from "./component/PaymentMethodSelection";
import {usualPayment, validateCoupon} from "../../api/SetOrderAPI";

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
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isSettingCoupon, setIsSettingCoupon] = useState(false);
    const [isUsingCustomerDiscount, setIsUsingCustomerDiscount] = useState(false);
    const [isSettingPayment, setIsSettingPayment] = useState(false);
    const handleChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    function toValidateCoupon() {
        setIsSettingCoupon(true);
        validateCoupon(couponCode).then(res => {
            message.success('Coupon Code Valid');
            setDiscount(res.data);
            setIsSettingCoupon(false);
        }).catch(err => {
            message.error('Invalid Coupon Code or Expired');
            setIsSettingCoupon(false);
        });
    }

    function toCheckOut() {
        setIsSettingPayment(true);
        if (isUsingCustomerDiscount) {
            // TODO: use customer discount
        } else {
            const res = {
                ...form.getFieldsValue(),
                payMethod: paymentMethod,
                couponCode: couponCode,
            }
            usualPayment(res).then(res => {
                message.success('Payment Success');
                // setIsSetting(false);
            }).catch(err => {
                message.error('Payment Failed');
                setIsSettingPayment(false);
            });
        }


    }

    return (
        <div className="checkout">
            <Flex justify={"space-evenly"}>
                <div className="payment-case">
                    <h1>Payment</h1>
                    <PaymentMethodSelection handleChange={handleChange}/>
                    <Form form={form} name="payment-info" className="payment-info">
                        <Divider/>
                        {
                                paymentMethod === 'credit-card' && (
                                <Form.Item name="cardNo">
                                    <Input placeholder="Card Number" maxLength={16} showCount={true}/>
                                </Form.Item>
                            )
                        }
                        {
                            paymentMethod === 'cash' && (
                                <Form.Item name="cash">
                                    <h2>Please contact the agents at any of our offices  </h2>
                                </Form.Item>
                            )
                        }
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
                            <Flex>
                                <Flex vertical={true} gap={"small"} align={"flex-start"} flex={3}>
                                        <h2>Rental ({timeDiff} day)</h2>
                                        <Flex justify={"space-evenly"}>
                                            <h3>Total Price</h3>
                                            <h3>${totalPrice}</h3>
                                        </Flex>
                                        {discount > 0 && (
                                            <>
                                                <Flex justify={"space-evenly"}>
                                                    <h3>Discount: </h3>
                                                    <h3>${(totalPrice * (Number(discount)) / 100).toFixed(2)}</h3>
                                                </Flex>
                                                <Divider/>
                                                <Flex>
                                                    <h2>Final Price</h2>
                                                    <h2>${(totalPrice * (1 - Number(discount) / 100)).toFixed(2)}</h2>
                                                </Flex>
                                            </>

                                        )}
                                </Flex>

                            </Flex>

                            <h2>Discount&Coupon</h2>
                            <Flex justify={"space-evenly"}>
                                <Input
                                    placeholder="Enter your coupon code"
                                    maxLength={9}
                                    showCount={true}
                                    style={{width: '50%'}}
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <Button type="primary" onClick={toValidateCoupon} loading={isSettingCoupon}>Apply</Button>
                            </Flex>
                        </Flex>
                        <Divider/>
                        <Button type="primary" size="large" block disabled={isSettingCoupon || isSettingPayment}
                                onClick={toCheckOut} loading={isSettingPayment}>Checkout</Button>

                    </Flex>
                </div>

            </Flex>

        </div>
    )
};

export default Checkout;
