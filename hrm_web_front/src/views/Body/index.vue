<template>
  <top class="top">
    <Menu/>
  </top>
  <main class="main">
    <RouterView />
    <!-- <Home/> -->
  </main>
  <footer class="footer">
    <Footer/>
  </footer>
</template>

<script setup lang='ts'>
import { RouterView } from 'vue-router';
import Menu from '@/components/Menu/index.vue'
import Footer from '@/components/Footer/index.vue'
// import Home from '@/views/Home/index.vue'

</script>

<style scoped>
@media screen and (max-width: 880px) {
  .main{
    width: 880px;
  }
}
.main{
  margin-top: 70px;
  background-color: #f5f1f1;
}
.footer{
  display: flex;
  height: 40px;
  background-color: #f5f1f1;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 200;
}
</style>