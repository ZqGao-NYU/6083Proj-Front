import React from 'react';
import {Flex} from "antd";

const PaymentMethodSelection = ({handleChange}) => {
    return (
        <Flex justify={"space-evenly"}>
            <label className="payment-option">
                <input
                    type="radio"
                    name="payment-method"
                    value="credit-card"
                    onChange={handleChange}
                    defaultChecked={true}
                />
                <span>Credit Card</span>
                <img src={"/SetOrder/credit-card-svgrepo-com.svg"} alt=""/>
            </label>
            <label className="payment-option">
                <input
                    type="radio"
                    name="payment-method"
                    value="cash"
                    onChange={handleChange}
                />
                <span>Cash</span>
                <img src={"/SetOrder/cash-bill-svgrepo-com.svg"} alt=""/>
            </label>
            <label className="payment-option">
                <input
                    type="radio"
                    name="payment-method"
                    value="paypal"
                    onChange={handleChange}
                    disabled={true}
                />
                <span>Paypal</span>
                <img src={"/SetOrder/paypal-color-svgrepo-com.svg"} alt=""/>
            </label>
        </Flex>
    )
}

export default PaymentMethodSelection;