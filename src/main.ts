import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
createApp(App).mount('#app');
console.log(import.meta.env.VITE_TITLE);
console.log(process.env);
