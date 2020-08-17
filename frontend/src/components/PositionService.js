import axios from 'axios';
const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.0.150:8000';

export default class PositionService{


    getJobsThai() {
		let user_id = localStorage.getItem("id")
        const url = `${API_URL}/api/position/?user_id=${user_id}`;
        return axios.get(url).then(response => response.data);
    }
    getCustomersByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getCustomer(pk) {
		let user_id = localStorage.getItem("id")
        const url = `${API_URL}/api/position/${pk}/${user_id}`;
        return axios.get(url).then(response => response.data);
    }
    deleteCustomer(customer){
		let user_id = localStorage.getItem("id")
        const url = `${API_URL}/api/position/${customer.pk}/${user_id}`;
        return axios.delete(url);
    }
    createCustomer(customer){
        const url = `${API_URL}/api/position/`;
        return axios.post(url,customer);
    }
    updateCustomer(customer){
		let user_id = localStorage.getItem("id")
        const url = `${API_URL}/api/position/${customer.pk}/${user_id}`;
        return axios.put(url,customer);
    }
}