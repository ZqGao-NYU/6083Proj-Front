import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Divider, Flex, Form, Input, message, Tooltip} from "antd";
import VehicleInfoCard from "./component/VehicleInfoCard";
import dayjs from "dayjs";
import PaymentMethodSelection from "./component/PaymentMethodSelection";
import {cropPayment, tryToGetCorpInfo, usualPayment, validateCoupon} from "../../api/SetOrderAPI";
import {ExclamationCircleOutlined} from "@ant-design/icons";

const Checkout = () => {
    const {
        vehicleID, startTime, endTime, totalPrice,
        imgUrl, make, type, dailyRate, overMileFee, officeLabel, invoiceId
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
    const [isCorpCustomer, setIsCorpCustomer] = useState(false);
    const [isUsingCorpDiscount, setIsUsingCorpDiscount] = useState(false);
    const [isSettingPayment, setIsSettingPayment] = useState(false);
    const [isUsingCoupon, setIsUsingCoupon] = useState(false);
    const [corpDiscount, setCorpDiscount] = useState(0);
    const [payFinished, setPayFinished] = useState(false);
    const handleChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    const token = sessionStorage.getItem('token');

    function toValidateCoupon() {
        setIsSettingCoupon(true);
        validateCoupon(couponCode, token).then(res => {
            message.success('Coupon Code Valid');
            setDiscount(res.data);
            setIsSettingCoupon(false);
            setIsUsingCoupon(true);
            setIsUsingCorpDiscount(false);
        }).catch(() => {
            message.error('Invalid Coupon Code or Expired');
            setIsSettingCoupon(false);
        });
    }

    function toCheckOut() {
        setIsSettingPayment(true);
        if (isUsingCorpDiscount) {
            const res = {
                ...form.getFieldsValue(),
                payMethod: paymentMethod,
                corpDiscount: corpDiscount,
                invoiceId: invoiceId
            }
            console.log(res)
            cropPayment(res, token).then(() => {
                message.success('Payment Success');
                setIsSettingPayment(false);
            }).catch(err => {
                message.error('Payment Failed');
                setIsSettingPayment(false);
            });
        } else {
            const res = {
                ...form.getFieldsValue(),
                payMethod: paymentMethod,
                couponCode: couponCode,
                invoiceId: invoiceId
            }
            usualPayment(res, token).then(() => {
                message.success('Payment Success');
                // setIsSetting(false);
            }).catch(err => {
                message.error('Payment Failed');
                setIsSettingPayment(false);
            });
        }
        setPayFinished(true);


    }

    useEffect(() => {
        // Get customer type
        tryToGetCorpInfo(token).then(res => {
            setIsUsingCorpDiscount(true);
            setDiscount(res.data.discount);
            setIsCorpCustomer(true);
            setCorpDiscount(res.data.discount);
        }).catch(() => {
            // User is not a corporate customer
        })

    }, [])

    function resetCorpDiscount() {
        setIsUsingCorpDiscount(true);
        setIsUsingCoupon(false);
        setDiscount(corpDiscount);
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
                    <Flex vertical={true} style={{minHeight:'125vh'}}>
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
                                        <h3>Rental ({timeDiff} day)</h3>
                                        <Flex justify={"space-evenly"}>
                                            <h2>Total Price</h2>
                                            <h2>${totalPrice}</h2>
                                        </Flex>

                                </Flex>

                            </Flex>
                            <Divider/>
                            <Flex align={"center"}>
                                <h2>Discount&Coupon</h2>
                                {isCorpCustomer && (
                                    <Tooltip title="Please note that you can't use both corporate discount and coupon discount at the same time.">
                                        <ExclamationCircleOutlined/>
                                    </Tooltip>
                                    )
                                }
                            </Flex>

                            <Flex gap={"large"}>
                                <Input
                                    placeholder="Enter your coupon code"
                                    maxLength={9}
                                    showCount={true}
                                    style={{width: '50%'}}
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <Button type="primary" onClick={toValidateCoupon} loading={isSettingCoupon} disabled={payFinished}>Apply</Button>
                                {isUsingCoupon && isCorpCustomer && (
                                    <Button onClick={resetCorpDiscount}>Still want to use Corp Discount?</Button>
                                )}
                            </Flex>
                            {discount > 0 && (
                                <>
                                    <Divider/>
                                    <Flex gap={"large"}>
                                        <h3>Discount: </h3>
                                        <h3>${(totalPrice * (Number(discount)) / 100).toFixed(2)}
                                            {isUsingCorpDiscount && "(Corp)"}
                                            {isUsingCoupon && "(Coupon)"}
                                        </h3>
                                    </Flex>
                                    <Flex>
                                        <h2>Final Price</h2>
                                        <h2>${(totalPrice * (1 - Number(discount) / 100)).toFixed(2)}</h2>
                                    </Flex>
                                </>

                            )}
                        </Flex>
                        <Divider/>
                        <Button type="primary" size="large" disabled={isSettingCoupon || isSettingPayment || payFinished}
                                onClick={toCheckOut} loading={isSettingPayment}>Checkout</Button>

                    </Flex>
                </div>

            </Flex>

        </div>
    )
};

export default Checkout;
