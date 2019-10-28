import axios from "axios";
import {AsyncStorage} from 'react-native';

const baseUrl = "http://192.168.0.126:8184/api/v1";
//const baseUrl = "http://192.168.43.206/api/v1";

axios.interceptors.request.use( async function(config) {
    let token = "";
    try {
        const value = await AsyncStorage.getItem('Token');
        if (value !== null) {
          // We have data!!
          token = value
        }
      } catch (error) {
        // Error retrieving data
      }
  
    if ( token != null ) {
      config.headers.Authorization = `Token ${token}`;
    }
  
    return config;
  }, function(err) {
    return Promise.reject(err);
});

export class Api {
    constructor(){}

    
    makeUrl = (endpoint : string) => {
        return `${baseUrl}${endpoint}`
    }

    signIn = async (email:String, password:String) =>{
        let url = this.makeUrl("/login").replace("/api/v1","");
        return axios.post(url,{
            email : email,
            password : password
        })
    }

    signUp = async (firstName : String, lastName : String, email : String, password : String,mobile:String) => {
        let url =this.makeUrl("/signup")
        return axios.post(url,{
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
            mobile : mobile
        })
    }

    getProductList = async (productType : String) => {
        let url = this.makeUrl("/product/"+(productType.toLowerCase()))
        return axios.get(url)
    }

    getProduct = async (productId) => {
        let url = this.makeUrl('/product/'+productId)
        return axios.get(url)
    }

    getProductBySearch = async (searchKey) => {
        let url = this.makeUrl("/product/search/"+searchKey)
        console.log(url)
        return axios.get(url)
    }

    getCartItemCount = async() => {
        let url = this.makeUrl("/cart/getCartItemCount")
        return axios.post(url);
       
    }

    addProductToCart = async (productId,duration) => {
        let url = this.makeUrl("/cart/addProduct")
        return axios.patch(url,{
                "duration": duration,
                "productId": productId
              
        })
    }

    increaseCartItemQuantity = async(productId,duration) => {
        let url = this.makeUrl("/cart/increaseQuantity")
        return axios.patch(url,{
            duration : duration,
            productId : productId
        })
    }

    decreaseCartItemQuantity = async(productId,duration) => {
        let url = this.makeUrl("/cart/decreaseQuantity")
        return axios.patch(url,{
            duration : duration,
            productId : productId
        })
    }

    removeCartItem = async (productId, duration) => {
        let url = this.makeUrl('/cart/removeProduct')
        return axios.patch(url,{
            duration : duration,
            productId : productId
        })
    }

    getCart = async() => {
        let url = this.makeUrl("/cart")
        return axios.post(url);
    }
    getUserToken =async () => {
        let userToken = ''
        try {
            const value = await AsyncStorage.getItem('userToken');
            if (value !== null) {
                userToken = value
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

    removeFromAsyncStorage = async (key) => {
        try{
            await AsyncStorage.removeItem(key)
        }catch(error){
            console.log(error)
        }
    }
    
    getUser = async() => {
        let url = this.makeUrl("/user")
        return axios.post( url);
    }

    updateUserProfile = async(firstName,lastName,mobile) => {
        let url = this.makeUrl("/user/update")
        console.log(url)
        return axios.post(url,{
            firstName : firstName,
            lastName : lastName,
            mobile : mobile
        })
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
