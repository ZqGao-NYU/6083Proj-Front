import './App.css';
import {Button, ColorPicker, ConfigProvider, Divider, Input, Space} from "antd";
import {Route, Routes} from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Login/Register"
import Reset from "./components/Login/Reset"
import SetOrder from "./components/SetOrder/SetOrder";
import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Main from './components/Main/Main';
import MyOrder from "./components/MyOrder/MyOrder";
import MyOrderDetail from "./components/MyOrder/MyOrderDetail";
import ReserveVehicle from "./components/SetOrder/ReserveVehicle";
import Checkout from "./components/SetOrder/Checkout";

function App() {
    const [primary, setPrimary] = React.useState('#520396');
    return (
        <div>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: primary,
                    },
                    components: {
                        Card: {
                            headerFontSize: 20,
                            headerFontSizeSM: 18,
                        }
                    }
                }}
            >
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/reset" element={<Reset/>}/>
                    <Route path="/set-order" element={<SetOrder/>}/>
                    <Route path="/my-order" element={<MyOrder/>}/>
                    <Route path="/my-order-detail/:orderId" element={<MyOrderDetail/>}/>
                    <Route path="/set-order/reserve-vehicle/check-out/:vehicleID/:startTime/:endTime/:totalPrice/:imgUrl/:make/:type/:dailyRate/:overMileFee/:officeLabel/:invoiceId"
                           element={<Checkout/>}/>
                </Routes>
                <Footer/>
            </ConfigProvider>

        </div>


    );
}

export default App;
