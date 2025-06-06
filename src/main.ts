import 'flyonui/flyonui';
import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import './style.css';

createApp(App).use(router).mount('#app');
