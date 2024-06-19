import { createApp } from 'vue';
import './styles.css';
import naive from 'naive-ui'
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(naive)
app.mount('#app');
