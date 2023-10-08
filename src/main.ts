import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import print from 'vue3-print-nb'
createApp(App).use(store).use(print).use(router).mount("#app");
