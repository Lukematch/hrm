<template>
  <a-layout class="body">
    <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    class="sider">
      <Menu :collapsed="collapsed"/>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
        v-else
        class="trigger"
        @click="() => (collapsed = !collapsed)"
        />
        <div class="avatar">
          <Avatar/>
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <RouterView />
      <!-- <Home/> -->
      </a-layout-content>
      <a-layout-footer class="footer">
        <Footer/>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang='ts'>
import { RouterView } from 'vue-router';
import Menu from '@/components/Menu/index.vue'
import Footer from '@/components/Footer/index.vue'
import Avatar from '@/components/Avatar/index.vue'
import { ref, onMounted, watch } from 'vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
// import Home from '@/views/Home/index.vue'

const collapsed = ref<boolean>(false);
const screenWidth = ref(document.body.clientWidth)


onMounted(() => {
  window.onresize = () => {
    return (() => {
      const winScreenWidth = document.body.clientWidth
      screenWidth.value = winScreenWidth
      // console.log(screenWidth.value);
    })()
  }
}),
watch(screenWidth,(val:any)=>{
  // console.log(screenWidth.value);
  if(screenWidth.value<=1100){
    // console.log(val);
    screenWidth.value = val
    setTimeout(() => {
      collapsed.value = true
    }, 500);
    // console.log('@');
    }else{
      // console.log(val);
    screenWidth.value = val
    setTimeout(() => {
      collapsed.value = false
    }, 500);
    }
})
watch(collapsed,(val:any)=>{
  let header = document.getElementsByClassName('header')[0]
  let content = document.getElementsByClassName('content')[0]
  let footer = document.getElementsByClassName('footer')[0]
  if(val === true) {
  // console.log(content);
  // @ts-ignore
  header.style.marginLeft = '100px'
  // @ts-ignore
  header.style.width = '94%'
  // @ts-ignore
  content.style.marginLeft ='100px'
  // @ts-ignore
  footer.style.marginLeft = '100px'
//   console.log(header?.style, content?.style,footer?.style);

      // getstyle('.header')['margin-left'] = '80px'
      // window.get('.content')['margin-left'] ='80px'
      // getstyle('.footer')['margin-left'] = '80px'
  } else {
  // @ts-ignore
  header.style.marginLeft = '215px'
  // @ts-ignore
  header.style.width = '87%'
  // @ts-ignore
  content.style.marginLeft ='215px'
  // @ts-ignore
  footer.style.marginLeft = '215px'
  }
})



</script>

<style scoped>
@media screen and (max-width: 860px){
  .body{
    width: 800px;
  }
}
.sider{
  background: rgba(255, 255, 255, 0.2);
  margin: 10px;
  width: auto;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  /* margin-top: 10px; */
}
.header{
  margin-left: 215px;
  display:inline-block;
  background-color: #dde8ed;
  /* width: 85%; */
  filter:brightness(0.95);
  position: fixed;
  z-index: 1;
  overflow-y: hidden;
  width: 87%;
  .avatar{
    margin-right: 20px;
    float: right;
    display: flex;
    align-items: center;
  }
  .trigger {
    font-size: 18px;
    margin-left: -35px;
    cursor: pointer;
    transition: color 0.3s;
  }
}
  /* @media screen and (max-width: 860px){
    .content{
    background-color: #f5f1f1;
    width: 85%;
    overflow-x: scroll;
    filter:brightness(0.95);
  }
} */
.content{
  margin-top: 64px;
  margin-left: 215px;
  background-color: #f5f1f1;
  /* width: 85%; */
  /* overflow: auto; */
  filter:brightness(0.95);
}
.footer{
  margin-left: 215px;
  display: flex;
  background-color: #e9e4e4;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 200;
}
</style>