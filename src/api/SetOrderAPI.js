import * as setOrderMock from "mock/setOrderMock";
import axios from "axios";

const useMock = process.env.REACT_APP_USE_MOCK_API === "true";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/set-order',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const submitVehicleSearch = (formData) => {
    console.log(useMock);
    if (useMock === true) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(setOrderMock.fetchVehicleList);
            }, 1000);
        })
    } else {
        return api.post(`vehicle/search?officeID=${formData.officeID}&startTime=${1}&endTime=${2}`, null).then(response => {
            return response.data;
        });
    }
}

export const getOfficeList = () => {
    if (useMock === true) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(setOrderMock.fetchOfficeList);
            }, 1000);
        })
    } else {
        return api.get('office-list').then(response => {
            return response.data;
        });
    }
}

export const reserveVehicle = (formData, token) => {
    if (useMock === true) {
        // return new Promise(resolve => {
        //     setTimeout(() => {
        //         resolve(1);
        //     }, 5000);
        // })
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("conflict");
            }, 1000);
        })
    } else {
        console.log(token);
        const url = `vehicle/reserve?vehicleID=${formData.vehicleID}&customerID=1&startDate=${encodeURIComponent(formData.startTime)}&endDate=${encodeURIComponent(formData.endTime)}&pickupAddressID=${formData.pickupAddressID}&dropoffAddressID=${formData.dropoffAddressID}`;
        return api.post(url, formData, {
            baseURL: 'http://localhost:8080/api/v1/set-order',
            headers: {
                'Content-Type': 'application/json',
                'Token': token
            }
        }).then(response => {
            console.log(response);
            return Promise.resolve(response.data);
        }).catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
    }
}

export const validateCoupon = (couponCode, token) => {
    if (useMock === true) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(setOrderMock.fetchCoupon);
            }, 2000);
        })
    } else {
        return api.post(`check-coupon?couponCode=${couponCode}`, couponCode, {
            baseURL: 'http://localhost:8080/api/v1/order/vehicle',
            headers: {
                'Content-Type': 'application/json',
                'Token': token
            },
        }).then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
                return Promise.reject(error);
            }
        );
    }
}


export const usualPayment = (formData, token) => {
    if (useMock === true) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(setOrderMock.fetchUsualPayment);
            }, 2000);
        })
    } else {
        return api.post('payment', formData, {
            baseURL: 'http://localhost:8080/api/v1/order/vehicle',
            headers: {
                'Content-Type': 'application/json',
                'Token': token
            }
        }).then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}

export const tryToGetCorpInfo = (token) => {
    if (useMock === true) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(setOrderMock.fetchCorpInfo);
            }, 500);
        })
    } else {
        return api.get('check-corp', {
            baseURL: 'http://localhost:8080/api/v1/order/vehicle',
            headers: {
                'Content-Type': 'application/json',
                'Token': token
            }
        }).then(response => {
            console.log(response)
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}


export const cropPayment = (formData, token) => {
    if (useMock === true) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(setOrderMock.fetchCorpPayment);
            }, 2000);
        })
    } else {
        return api.post('payment-corp', formData, {
            baseURL: 'http://localhost:8080/api/v1/order/vehicle',
            headers: {
                'Content-Type': 'application/json',
                'Token': token
            }
        }).then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}