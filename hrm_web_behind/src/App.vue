<template>
  <ConfigProvider
  :locale="zhCN"
  :theme="{
      token: {
        colorPrimary: 'rgb(22,200,200)',
      },
    }"
  >
    <RouterView />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
import { RouterView } from 'vue-router';
import zhCN from 'ant-design-vue/es/locale/zh_CN.js';


</script>


<style scoped>

</style>
