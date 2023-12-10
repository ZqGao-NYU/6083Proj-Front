import React, {useEffect} from 'react';
import {Button, Card, Divider, Flex, List, message, Modal,} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {rentalPolicy} from "static/textContent";
import {SearchDataContext} from "./SetOrder";
import {useNavigate} from "react-router-dom";
import VehicleInfoCard from "./component/VehicleInfoCard";
import {reserveVehicle} from "api/SetOrderAPI";
// import {useParams} from 'react-router-dom';





const ReserveVehicle = ({openReserveModal, setOpenReserveModal, selectedVehicle}) => {
    // const {vehicleID} = useParams();
    const {searchData, setSearchData} = React.useContext(SearchDataContext);
    const navigate = useNavigate();
    const [isReserving, setIsReserving] = React.useState(false);

    const handleCancel = () => {
        setOpenReserveModal(false);
    }
    const handleReserve = () => {
        setIsReserving(true);
        const token = sessionStorage.getItem('token');
        const formData = {
            vehicleID: selectedVehicle.vehicleID,
            startTime: searchData.rentRange[0].format('YYYY-MM-DDTHH:MM:ss'),
            endTime: searchData.rentRange[1].format('YYYY-MM-DDTHH:MM:ss'),
            customerID: 0,
            pickupAddressID: searchData.officeID.value,
            dropoffAddressID: searchData.officeID.value

        }
        console.log(searchData);
        reserveVehicle(formData, token).then(res => {
            message.success('Reserve Successfully');
            handleCancel();
            setIsReserving(false);
        }).catch(err => {
            message.error('Reserve Failed');
            setIsReserving(false);

        })

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
                   <Button key="Reserve" type="primary" onClick={handleReserve} loading={isReserving}>
                       Reserve
                   </Button>,

               ]}
        >
            <h1>Reserve Vehicle</h1>
            {openReserveModal && selectedVehicle && (
                <Flex vertical={true}>
                    <VehicleInfoCard selectedVehicle={selectedVehicle}/>
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
                        <span><strong>${(selectedVehicle.dailyRate * timeDiff * 1.1).toFixed(2)}</strong></span>
                    </Flex>
                </Flex>
            )}
        </Modal>
    )

}

export default ReserveVehicle;
