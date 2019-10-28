import {createStackNavigator,createAppContainer} from 'react-navigation'
import Home from "./src/screens/home"
import Cart from './src/screens/cart'
import ProductList from './src/screens/productList'
import Search from './src/screens/search'
import Product from './src/screens/product'
import Walkthrough from './src/screens/walkthrough'
import Login from './src/screens/login'
import Signup from './src/screens/signup'
import Contact from './src/screens/contact'
import Policy from './src/screens/policy'
import Checkout from './src/screens/checkout'
import Splash from './src/screens/splash'
import Profile from './src/screens/profile'
import Subscriptions from './src/screens/subscriptions'
import OrderDetails from './src/screens/orderDetails'
import ProductDetails from './src/components/productDetails/productDetails';

const AppStackNavigator = createStackNavigator({
    SplashScreen : {
      screen : Splash,
      navigationOptions : {
        header : null
      }
    },
    WalkthroughScreen :{
        screen : Walkthrough,
        navigationOptions: {
          header: null
        }
      },

      HomeScreen :{
        screen : Home,
        navigationOptions: {
          header: null
        }
      },
      ProfileScreen : {
        screen : Profile
      },
      ProductListScreen : {
        screen : ProductList
      },
      CartScreen : {
        screen : Cart,

      },
      SearchScreen : {
        screen : Search,
        navigationOptions: {
          header: null
        }
      },
      ProductDetailsScreen : {
        screen : Product
      },
      SignupScreen : {
        screen : Signup,
        navigationOptions : {
          header  : null
        }
      },
      LoginScreen : {
        screen : Login,
        navigationOptions : {
          header  : null
        }
      },
      ContactScreen : {
        screen : Contact
      },
      SubscriptionsScreen : {
        screen : Subscriptions
      },
      PolicyScreen : {
        screen : Policy
      },
      CheckoutScreen : {
        screen : Checkout
      },
      OrderDetailsScreen : {
        screen : OrderDetails
      }
    })  

const AppContainer = createAppContainer(AppStackNavigator);



export default AppContainer

