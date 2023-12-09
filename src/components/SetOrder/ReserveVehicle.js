import React, {useEffect} from 'react';
import {Button, Card, Divider, Flex, List, Modal,} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {rentalPolicy} from "static/textContent";
import {SearchDataContext} from "./SetOrder";
import {useNavigate} from "react-router-dom";
// import {useParams} from 'react-router-dom';


const svgStyle = {
    width: 13,
    height: 13
}


const ReserveVehicle = ({openReserveModal, setOpenReserveModal, selectedVehicle}) => {
    // const {vehicleID} = useParams();
    const {searchData, setSearchData} = React.useContext(SearchDataContext);
    const navigate = useNavigate();


    const handleCancel = () => {
        setOpenReserveModal(false);
    }
    const handleReserve = () => {
        navigate(`/set-order/reserve-vehicle/check-out/${selectedVehicle.vehicleID}/${searchData.rentRange[0].format('YYYY-MM-DD HH')}/${searchData.rentRange[1].format('YYYY-MM-DD HH')}`);
    }
    const {rentRange, officeID} = searchData;
    const timeDiff = rentRange && Math.round(rentRange[1].diff(rentRange[0], 'day', true));
    return (
        <Modal open={openReserveModal}
               onCancel={handleCancel}
               width={"80vh"}
               footer={[
                   <Button key="back" onClick={handleCancel}>
                       Cancel
                   </Button>,
                   <Button key="Reserve" type="primary" onClick={handleReserve}>
                       Reserve
                   </Button>,

               ]}
        >
            <h1>Reserve Vehicle</h1>
            {openReserveModal && selectedVehicle && (
                <Flex vertical={true}>
                    <Card
                        bordered={false}
                        className="vehicle-reserve-card"
                    >
                        <Card.Meta
                            avatar={<img src={selectedVehicle.imgUrl} alt=""/>}
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
                    <h2>Reservation Details</h2>
                    {rentRange && officeID && (
                        <Flex vertical={true} gap="large">
                            <Flex justify="space-between">
                                <span><strong>Pickup at: </strong> {officeID.label}</span>
                                <span><strong>{rentRange[0].format('MMMM D, YYYY')}</strong></span>
                            </Flex>
                            <Flex justify="space-between">
                                <span><strong>Return at: </strong> {officeID.label}</span>
                                <span><strong>{rentRange[1].format('MMMM D, YYYY')}</strong></span>
                            </Flex>

                        </Flex>

                    )}
                    <Divider/>
                    <h2>Rental Policy</h2>
                    <List dataSource={rentalPolicy}
                          itemLayout="horizontal"
                          renderItem={(item, index) => {
                              return (
                                  <List.Item key={index}>
                                      <List.Item.Meta
                                          title={item.title}
                                          description={item.description}
                                      />
                                  </List.Item>
                              )
                          }}
                    />
                    <Divider/>
                    <h2>Fare Estimate</h2>
                    <Flex justify="space-between">
                        <span>Rental ({timeDiff} day)</span>
                        <span>${selectedVehicle.dailyRate * timeDiff}</span>
                    </Flex>
                    <Flex justify="space-between">
                        <span>Taxes and Fees</span>
                        <span>${selectedVehicle.dailyRate * timeDiff * 0.1}</span>
                    </Flex>
                    <Divider/>
                    <Flex justify="space-between">
                        <span><strong>Total</strong></span>
                        <span><strong>${selectedVehicle.dailyRate * timeDiff * 1.1}</strong></span>
                    </Flex>
                </Flex>
            )}
        </Modal>
    )

}

export default ReserveVehicle;
