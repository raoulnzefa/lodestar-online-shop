import { createStore } from 'vuex'
import { productsModule } from '@/store/modules/productsModule';
import { cartModule } from '@/store/modules/cartModule';


export default createStore({
  modules: {
    products: productsModule,
    cart: cartModule
  }
})
