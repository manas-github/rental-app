import axios from "axios";
import {AsyncStorage} from 'react-native';

const baseUrl = "http://127.0.0.1:8083/api";

export class Api {
    constructor(){}

    makeUrl = (endpoint : string) => {
        return `${baseUrl}${endpoint}`
    }

    getUserToken =async () => {
        let userToken = ''
        try {
            const value = await AsyncStorage.getItem('userToken');
            if (value !== null) {
                userToken = value
                console.log(value);
                return value;
            }
        }catch (error){
            console.log(error)
            
        }
        return null
    };
    
    saveToAsyncStorage = async (key,value) => {
        try{
            await AsyncStorage.setItem(key,value)
        }catch(error){
            console.log("Error setting "+key)
            console.log("Error : "+error)
        }

    }

    removeFromAsyncStorage = async () => {
        try{
            await AsyncStorage.removeItem('userToken')
        }catch(error){
            console.log(error)
        }
    }

    userSignIn = async (payload: any) => {
        let result = false
        const url = this.makeUrl("/auth/login/")
        await axios
        .post(url, payload)
        .then(response => {
            const { token, user } = response.data;
            axios.defaults.headers.common.Authorization = `Token ${token}`;
            this.saveToAsyncStorage('userToken',token)
            result = true
        })
        .catch(error => {
            console.log("Error : "+error)
            result = false
        });   
        return result    
    }
    

    userLogout = async () => {
        const url = this.makeUrl("/auth/logout/")
        axios.defaults.headers.common.Authorization = `Token ${await this.getUserToken()}`;

        axios
        .get(url)
        .then(response => {
            this.removeFromAsyncStorage()
            axios.defaults.headers.common.Authorization = null
            return true
        })
        .catch(error =>  {
            console.log(error)
            return false
        });
    }

    userSignup = async (payload:any) => {
        let result = false;
        const url = this.makeUrl("/auth/register/")
        axios
        .post(url, payload)
        .then(response => {
        const { token, user } = response.data;
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        this.saveToAsyncStorage('userToken',token)
        result = true
        })
        .catch(error => {
            console.log(error) 
            result = false
        });
        return result
    } 
}
   


    //const csrfToken = cookies.get("csrftoken");
    // let headers = {
    //   "Content-Type": "application/json",
    //   "X-CSRFToken": csrfToken
    // };
//   //  const userToken = cookies.get("userToken");
//     if (userToken) {
//       headers["Authorization"] = `Token ${userToken}`;
//     }

 //   return headers;
  //};



// // const baseUrl =
// //   process.env.REACT_APP_BUILD === "prod"
// //     ? process.env.REACT_APP_API_ENDPOINT_PRODUCTION
// //     : process.env.REACT_APP_API_ENDPOINT_STAGING;

// export class Api {
//   constructor() {}

//   makeUrl = (endPoint: string) => {
//     return `${baseUrl}${endPoint}`;
//   };
//   getHeaders = () => {
//     const csrfToken = cookies.get("csrftoken");
//     let headers = {
//       "Content-Type": "application/json",
//       "X-CSRFToken": csrfToken
//     };
//     const userToken = cookies.get("userToken");
//     if (userToken) {
//       headers["Authorization"] = `Token ${userToken}`;
//     }

//     return headers;
//   };
//   userSignUp = (payload: any) => {
//     const url = this.makeUrl("/register/");
//     const csrfToken = cookies.get("csrftoken");
//     return axios
//       .post(url, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": csrfToken
//         }
//       })
//       .then(res => {
//         return res;
//       })
//       .catch(err => {
//         return false;
//       });
//   };
//   userSignIn = (payload: any) => {
//     const url = this.makeUrl("/login/");
//     const csrfToken = cookies.get("csrftoken");
//     return axios
//       .post(url, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": csrfToken
//         }
//       })
//       .then(res => {
//         cookies.set("userToken", res["data"]["token"], {
//           maxAge: 86400,
//           expires: new Date(+new Date() + 86400000)
//         });
//         return res;
//       })
//       .catch(err => {
//         return false;
//       });
//   };

//   googleLogin = (payload: any) => {
//     const url = this.makeUrl("/GoogleLogin/");
//     const csrfToken = cookies.get("csrftoken");
//     return axios
//       .post(url, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": csrfToken
//         }
//       })
//       .then(res => {
//         cookies.set("userToken", res["data"]["token"], {
//           maxAge: 86400,
//           expires: new Date(+new Date() + 86400000)
//         });
//         return res;
//       })
//       .catch(err => {
//         return false;
//       });
//   };

//   getUserDetails = () => {
//     const url = this.makeUrl("/user-details/");
//     const headers = this.getHeaders();
//     try {
//       return axios.get(url, { headers: { ...headers } });
//     } catch (error) {
//       return null;
//     }
//   };
//   saveUserAddress = async (addressObj: any) => {
//     const url = this.makeUrl("/user-addresses/");
//     const headers = this.getHeaders();
//     try {
//       const res = await axios.post(
//         url,
//         { ...addressObj },
//         { headers: { ...headers } }
//       );
//       if (res && res["data"]) {
//         return res;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       return null;
//     }
//   };
//   getUserAddress = (id: any) => {
//     const url = this.makeUrl(`/user-addresses/?user=${id}`);
//     const headers = this.getHeaders();
//     try {
//       return axios.get(url, { headers: { ...headers } });
//     } catch (error) {
//       return null;
//     }
//   };
//   getUserProfileSummary = (userId: any) => {
//     const url = this.makeUrl(`/view-profile/${userId}/`);
//     const headers = this.getHeaders();
//     try {
//       return axios.get(url, { headers: { ...headers } });
//     } catch (error) {
//       return null;
//     }
//   };
//   fetchProducts = () => {
//     const url = this.makeUrl("/products/");
//     return axios.get(url);
//   };
//   resetPassword = async (emailPswrdObj: any) => {
//     const url = this.makeUrl(`/forgot-password/`);
//     const headers = this.getHeaders();
//     try {
//       const res = await axios.post(
//         url,
//         { ...emailPswrdObj },
//         { headers: { ...headers } }
//       );
//       if (res["data"] && res["data"]["status"]) {
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       return false;
//     }
//   };
//   fetchCategories = () => {
//     const url = this.makeUrl("/categories/");
//     return axios.get(url);
//   };
//   fetchCategoryProducts = (id: number) => {
//     const url = this.makeUrl("/category-products/" + id + "/");
//     return axios.get(url);
//   };
//   fetchProduct = (id: number) => {
//     const url = this.makeUrl("/products/" + id + "/");
//     return axios.get(url);
//   };
//   fetchTrendingItem = () => {
//     const url = this.makeUrl("/trending-items/");
//     return axios.get(url);
//   };
//   fetchPackages = () => {
//     const url = this.makeUrl("/package-products/");
//     return axios.get(url);
//   };
//   fetchSelectedPackage = (packageId: any) => {
//     const url = this.makeUrl(`/package-products/${packageId}`);
//     return axios.get(url);
//   };
//   searchProduct = async (product: any) => {
//     const url = await this.makeUrl(`/search/${product}`);
//     return axios.get(url);
//   };
//   validatePincode = async (pincode: number) => {
//     const url = this.makeUrl("/pincode-delivery-status/");
//     const headers = this.getHeaders();
//     try {
//       const res = await axios.post(
//         url,
//         { pincode: pincode },
//         { headers: { ...headers } }
//       );
//       if (res["data"] && res["data"]["status"]) {
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       return false;
//     }
//   };
//   paymentResponse = async ({ payment_id, amount, amount_paisa }) => {
//     const orderId = cookies.get("orderId");
//     if (!orderId) {
//       return null;
//     }
//     const url = this.makeUrl("/response/");
//     const headers = this.getHeaders();
//     try {
//       const resp = await axios.post(
//         url,
//         { order_nr: orderId, payment_id, amount, amount_paisa },
//         {
//           headers: {
//             ...headers
//           }
//         }
//       );
//       cookies.remove("orderId");
//       return resp;
//     } catch (error) {
//       cookies.remove("orderId");
//       return null;
//     }
//   };
//   createOrder = async (paymentObj: any) => {
//     const url = this.makeUrl("/create-order/");
//     const headers = this.getHeaders();
//     try {
//       const resp = await axios.post(
//         url,
//         { ...paymentObj },
//         {
//           headers: {
//             ...headers
//           }
//         }
//       );
//       if (resp && resp.data && resp.data.order_nr) {
//         cookies.set("orderId", resp.data.order_nr);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       return false;
//     }
//   };
//   paymentStatus = async (orderId: any) => {
//     const url = this.makeUrl("/payment-status/");
//     const headers = this.getHeaders();
//     try {
//       const resp = await axios.post(
//         url,
//         { order_id: orderId },
//         {
//           headers: {
//             ...headers
//           }
//         }
//       );
//       return resp;
//     } catch (error) {
//       return null;
//     }
//   };
//   userDemoRequest = async (userDetailObj: any) => {
//     const url = this.makeUrl("/user-query/");
//     const headers = this.getHeaders();
//     try {
//       const resp = await axios.post(
//         url,
//         { ...userDetailObj },
//         {
//           headers: {
//             ...headers
//           }
//         }
//       );
//       return resp;
//     } catch (error) {
//       return null;
//     }
//   };

//   userBillHistory = async () => {
//     const url = this.makeUrl("/user-bill-history/");
//     const headers = this.getHeaders();
//     return axios.get(url, { headers: { ...headers } });
//   };
//   makeMonthlyPayment = async () => {
//     const orderId = cookies.get("orderId");
//     if (!orderId) {
//       return null;
//     }
//     const url = this.makeUrl("/make-monthly-payment/");
//     const headers = this.getHeaders();
//     try {
//       const resp = await axios.post(
//         url,
//         { order_id: orderId },
//         {
//           headers: {
//             ...headers
//           }
//         }
//       );
//       cookies.remove("orderId");
//       return resp;
//     } catch (error) {
//       return null;
//     }
//   };
//   createMonthlyPayment = async (paymentObj: any) => {
//     const url = this.makeUrl("/monthly-payment/response/");
//     const headers = this.getHeaders();
//     try {
//       const resp = await axios.post(
//         url,
//         { ...paymentObj },
//         {
//           headers: {
//             ...headers
//           }
//         }
//       );
//       if (resp && resp.data && resp.data.order_id) {
//         cookies.set("orderId", resp.data.order_id);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       return false;
//     }
//   };
//   checkCouponValidity = async couponCode => {
//     const url = this.makeUrl(`/validation-promocode/${couponCode}/`);
//     const headers = this.getHeaders();
//     try {
//       return axios.get(url, { headers: { ...headers } });
//     } catch (error) {
//       return null;
//     }
//   };
//   postUserDocs = async (docsObj, userId) => {
//     const url = this.makeUrl(`/user-docs/${userId}/`);
//     const headers = this.getHeaders();
//     try {
//       const resp = await axios.post(
//         url,
//         { ...docsObj },
//         {
//           headers: {
//             ...headers
//           }
//         }
//       );
//       if (resp && resp.data && resp.data.status) {
//         return true;
//       }
//       return false;
//     } catch (error) {
//       return false;
//     }
//   };
//   getUserDocs = userId => {
//     const url = this.makeUrl(`/get-user-docs/${userId}/`);
//     const headers = this.getHeaders();
//     try {
//       return axios.get(url, { headers: { ...headers } });
//     } catch (error) {
//       return null;
//     }
//   };
//   trackProduct = productId => {
//     const url = this.makeUrl(`/product-view/${productId}/`);
//     const headers = this.getHeaders();
//     try {
//       axios.post(url, {
//         headers: {
//           ...headers
//         }
//       });
//     } catch (error) {}
//   };
// }
