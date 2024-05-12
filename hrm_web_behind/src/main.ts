import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale.js';
import 'dayjs/locale/zh-cn.js';
import * as echarts from 'echarts';
import relativeTime from 'dayjs/plugin/relativeTime.js';


import App from './App.vue'
import  router  from './router/index.ts'
import axios from 'axios'

const app = createApp(App)

dayjs.locale('zh-cn');
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.updateLocale('zh-cn', {
  weekStart: 0,
});

app.config.globalProperties.$http = axios;
app.config.globalProperties.$echarts = echarts;

app.use(Antd)
app.use(router)
app.use(createPinia())

app.mount('#app')
