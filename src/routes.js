import SetOrder from "./components/SetOrder/SetOrder";
import Login from  "./components/Login/Login"
import Register from "./components/Login/Register";
import MyOrder from "./components/MyOrder/MyOrder";
import MyOrderDetail from "./components/MyOrder/MyOrderDetail";
import Reset from "./components/Login/Reset";

const routes = [
    { path: '/login', component: Login },
    { path: '/reset', component: Reset },
    { path: '/register', component: Register },
    { path: '/set_order', component: SetOrder },
    { path: '/my-order', component: MyOrder },
    { path: '/my-order-detail/:orderId', component: MyOrderDetail },
]

export default routes;