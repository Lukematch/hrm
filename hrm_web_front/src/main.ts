import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale.js';
import 'dayjs/locale/zh-cn.js';
import axios from 'axios';

import App from './App.vue'
import  router  from './router/index.ts'
import { createPinia } from 'pinia';
'pinia'
import relativeTime from 'dayjs/plugin/relativeTime.js';


const app = createApp(App)

dayjs.locale('zh-cn');
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.updateLocale('zh-cn', {
  weekStart: 0,
});

app.config.globalProperties.$http = axios;

app.use(Antd)
app.use(router)
app.use(createPinia())

app.mount('#app')
