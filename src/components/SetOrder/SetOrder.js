import React, {createContext} from 'react';
import RentForm from "./RentForm";
import VehicleDisplayCase from "./VehicleDisplayCase";
import {Flex} from "antd";
import DefaultDisplayCase from "./DefaultDisplayCase";
import {useVehicleData} from "./Hooks/useVehicleData";


export const SearchDataContext = createContext();

const SetOrder = () => {
    const { showResult, loadingVehicle, vehicleList, fetchData } = useVehicleData();
    const [searchData, setSearchData] = React.useState(null);
    return (
        <SearchDataContext.Provider value={{searchData, setSearchData}}>
            <div className='main-content'>
                <Flex justify={"start"} aligh="start" style={{paddingTop: 25}}>
                    <RentForm fetchData={fetchData}/>
                    {showResult ? <VehicleDisplayCase vehicleList = {vehicleList} vehicleLoading = {loadingVehicle}/> : <DefaultDisplayCase/>}
                </Flex>
            </div>
        </SearchDataContext.Provider>
    )
}

export default SetOrder;