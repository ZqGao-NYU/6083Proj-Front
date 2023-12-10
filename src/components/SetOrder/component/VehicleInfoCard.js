import React from 'react';
import {Card, Flex} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {SearchDataContext} from "../SetOrder";


const svgStyle = {
    width: 13,
    height: 13
}

const VehicleInfoCard = ({selectedVehicle}) => {
    return (
        <Card
            bordered={false}
            className="vehicle-reserve-card"
            style={{
                boxShadow: "0 0 0 0",
            }}
        >
            <Card.Meta
                avatar={<img src={selectedVehicle.imgUrl} style={{width: 215, maxHeight: 150}} alt=""/>}
                title={
                    <Flex justify="space-between">
                        <span>{selectedVehicle.make}</span>
                        <span>${selectedVehicle.dailyRate}/day</span>
                    </Flex>
                }
                description={(<>
                    <Flex vertical={true} justify="space-evenly" gap="large">
                        <Flex justify="space-between">
                            <span>{selectedVehicle.type}</span>
                            <span><ExclamationCircleOutlined/>${selectedVehicle.overMileFee}/mile over 500 miles</span>
                        </Flex>
                        <Flex justify="space-evenly">
                                        <span><img src="/SetOrder/seat-pictogram-2-svgrepo-com.svg" alt=""
                                                   style={svgStyle}/>Seats 5</span>
                            <span><img src="/SetOrder/car-door-svgrepo-com.svg" alt="" style={svgStyle}/>Doors 4</span>
                            <span><img src="/SetOrder/trunk-svgrepo-com.svg" alt="" style={svgStyle}/>Large Bags 1</span>
                            <span><img src="/SetOrder/gear-svgrepo-com.svg" alt=""
                                       style={svgStyle}/>Auto</span>
                        </Flex>

                    </Flex>
                </>)}
            />
        </Card>

    )
}

export default VehicleInfoCard;