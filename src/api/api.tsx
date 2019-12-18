import axios from "axios";
import { AsyncStorage } from 'react-native';

//const baseUrl = "http://192.168.0.126:8184/api/v1";
//const baseUrl = "http://10.1.21.77:8184/api/v1";
//const baseUrl = "http://192.168.43.206/api/v1";
 const baseUrl = "https://manas-rental-serverapp.herokuapp.com/api/v1"

axios.interceptors.request.use(async function (config) {
    let token = "";
    try {
        const value = await AsyncStorage.getItem('Token');
        if (value !== null) {
            token = value
        }
    } catch (error) {
    }

    if (token != null) {
        config.headers.Authorization = `Token ${token}`;
    }

    return config;
}, function (err) {
    return Promise.reject(err);
});

export class Api {
    constructor() { }

    makeUrl = (endpoint: string) => {
        return `${baseUrl}${endpoint}`
    }

    signIn = async (email: String, password: String) => {
        let url = this.makeUrl("/login").replace("/api/v1", "");
        return axios.post(url, {
            email: email,
            password: password
        })
    }

    signUp = async (firstName: String, lastName: String, email: String, password: String, mobile: String) => {
        let url = this.makeUrl("/signup").replace("/api/v1", "");
        return axios.post(url, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            mobile: mobile
        })
    }

    getProductList = async (productType: String) => {
        let url = this.makeUrl("/product/" + (productType.toLowerCase()))
        return axios.get(url)
    }

    getProduct = async (productId) => {
        let url = this.makeUrl('/product/' + productId)
        return axios.get(url)
    }

    getProductBySearch = async (searchKey) => {
        let url = this.makeUrl("/product/search/" + searchKey)
        return axios.get(url)
    }

    getCartItemCount = async () => {
        let url = this.makeUrl("/cart/getCartItemCount")
        return axios.post(url);

    }
    getTrendingProducts = async (count) => {
        let url = this.makeUrl("/trendingProduct/" + count)
        return axios.get(url)
    }
    addProductToCart = async (productId, duration) => {
        let url = this.makeUrl("/cart/addProduct")
        return axios.patch(url, {
            "duration": duration,
            "productId": productId

        })
    }

    increaseCartItemQuantity = async (productId, duration) => {
        let url = this.makeUrl("/cart/increaseQuantity")
        return axios.patch(url, {
            duration: duration,
            productId: productId
        })
    }

    decreaseCartItemQuantity = async (productId, duration) => {
        let url = this.makeUrl("/cart/decreaseQuantity")
        return axios.patch(url, {
            duration: duration,
            productId: productId
        })
    }

    removeCartItem = async (productId, duration) => {
        let url = this.makeUrl('/cart/removeProduct')
        return axios.patch(url, {
            duration: duration,
            productId: productId
        })
    }

    getCart = async () => {
        let url = this.makeUrl("/cart")
        return axios.get(url);
    }
    getUserToken = async () => {
        let userToken = ''
        try {
            const value = await AsyncStorage.getItem('userToken');
            if (value !== null) {
                userToken = value
                return value;
            }
        } catch (error) {
        }
        return null
    };

    saveToAsyncStorage = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (error) {
        }

    }

    removeFromAsyncStorage = async (key) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch (error) {
        }
    }

    getUser = async () => {
        let url = this.makeUrl("/user")
        return axios.post(url);
    }

    updateUserProfile = async (firstName, lastName, mobile) => {
        let url = this.makeUrl("/user/update")
        return axios.post(url, {
            firstName: firstName,
            lastName: lastName,
            mobile: mobile
        })
    }

    getSearchHistory = async () => {
        let url = this.makeUrl('/productSearchHistory');
        return axios.get(url);
    }

    deleteFromSearchHistory = async (searchKey) => {
        let url = this.makeUrl('/productSearchHistory/remove')
        return axios.post(url, searchKey)
    }

    getProductTitleBySearch = async (searchKey) => {
        let url = this.makeUrl('/product/keyPressSearch/' + searchKey)
        return axios.get(url)
    }

    updateDeliveryAddress = async (deliveryAddress) => {
        let deliveryAddressToString = deliveryAddress.name + "randSplit" + deliveryAddress.mobile + "randSplit" + deliveryAddress.address + "randSplit" + deliveryAddress.pincode + "randSplit" + deliveryAddress.city
        let url = this.makeUrl("/user/updateAddress")
        return axios.post(url,deliveryAddressToString)
    }

    createOrder = async (payload) =>{
        let url = this.makeUrl("/order/create")
        return axios.post(url,payload)
    }

    getAllOrders = async () => {
        let url = this.makeUrl("/order")
        return axios.get(url)
    }
}