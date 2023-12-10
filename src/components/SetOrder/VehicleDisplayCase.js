import React from 'react';
import {List} from "antd";
import './SetOrderStyle.css';
import { useNavigate } from 'react-router-dom';
import ReserveVehicle from "./ReserveVehicle";


const VehicleDisplayCase = ({vehicleList, vehicleLoading}) => {
    const navigate = useNavigate();
    const [openReserveModal, setOpenReserveModal] = React.useState(false);
    const [selectedVehicle, setSelectedVehicle] = React.useState(null);
    const toReserveVehicle = (vehicle) => {
        setOpenReserveModal(true);
        setSelectedVehicle(vehicle);
    }

    return (
        <React.StrictMode>
            <div className="vehicleDisplayCase">
                <h1>Choose a car</h1>
                <List
                    loading={vehicleLoading}
                    itemLayout="vertical"
                    dataSource={vehicleList}
                    renderItem = {(item, index) => (
                        <div onClick={() => {toReserveVehicle(item)}} className="vehicle-item">
                            <List.Item
                                key={index}
                                extra={
                                    <>
                                        <h3>${`${item.dailyRate}/day`}</h3>
                                        ${`${item.overMileFee}/mile over 500 miles`}
                                    </>
                                }
                            >
                                <List.Item.Meta
                                    avatar={<img src={item.imgUrl} alt=""/>}
                                    title={item.make}
                                    description={'TBA'}
                                />
                            </List.Item>
                        </div>
                    )}
                />
                <ReserveVehicle
                    openReserveModal={openReserveModal}
                    setOpenReserveModal={setOpenReserveModal}
                    selectedVehicle={selectedVehicle}
                />
            </div>
        </React.StrictMode>
    )
}

export default VehicleDisplayCase;