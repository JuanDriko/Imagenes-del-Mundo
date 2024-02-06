import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';


createApp(App)
  .use(router)
  .mount('#app')