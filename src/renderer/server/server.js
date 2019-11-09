import axios from 'axios'
const services = axios.create({
	baseURL: "http://localhost:3000", //公共路径
});

export default services;