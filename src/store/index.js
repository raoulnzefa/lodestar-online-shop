import { createStore } from 'vuex'
import { productsModule } from '@/store/modules/productsModule';
import { cartModule } from '@/store/modules/cartModule';
import { searchModule } from '@/store/modules/searchModule';


export default createStore({
  modules: {
    products: productsModule,
    cart: cartModule,
    search: searchModule
  }
})
