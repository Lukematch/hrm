<template>
  <div class="menu-wrapper">
    <div class="menu-wrapper-left"
    @click="onHome()">
      <img src="/hrm.png"/>
      <h1>HRM-F前台</h1>
    </div>
    <a-menu
    class="a-menu-demo"
    v-model:selectedKeys="current"
    mode="horizontal"
    :items="items"
    @click="onClick($event)"
    />
    <div class="menu-wrapper-right">
      <!-- <a-avatar class="avatar"
      :size="45"
      /> -->
      <a-dropdown class="dropdown">
        <template #overlay>
          <a-menu @click="handleMenuClick($event)">
            <a-menu-item key="1">
              个人中心
            </a-menu-item>
            <a-menu-item key="2">
              退出系统
            </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          {{ user?.name }}
          <DownOutlined />
        </a-button>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { h, ref } from 'vue';
import { SettingOutlined, HomeFilled, UserOutlined, ProjectOutlined, CarryOutOutlined, CommentOutlined } from '@ant-design/icons-vue';
import { MenuProps, message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { Employee } from '@/types/eployee.ts';

const router:any = useRouter();
const current = ref<string[]>(router.name);

const userJson = localStorage.getItem('user')
const user:Employee = JSON.parse(userJson!)


const items = ref<MenuProps['items']>([
  {
    key: 'home',
    icon: () => h(HomeFilled),
    label: '首页',
    title: '首页',
  },
  {
    key: 'user',
    icon: () => h(UserOutlined),
    label: '个人中心',
    title: '个人中心',
  },
  {
    key: 'attendance',
    icon: () => h(CarryOutOutlined),
    label: '考勤中心',
    title: '考勤中心',
  },
  {
    key: 'train',
    icon: () => h(ProjectOutlined),
    label: '培训学习',
    title: '培训学习',
    children: [
      {
        label: '培训内容',
        key: 'culture',
      },
      {
        label: '培训中心',
        key: 'training',
      },
    ],
  },
  {
    key: 'workbench',
    icon: () => h(SettingOutlined),
    label: '工作台',
    title: '工作台',
    children: [
      {
        label: '工资查询',
        key: 'salary',
      },
      {
        label: '调动申请',
        key: 'transfer',
      },
      {
        label: '工作项提交',
        key: 'jobs',
      },
    ],
  },
  {
    key: 'wechat',
    icon: () => h(CommentOutlined),
    label: '意见反馈',
    title: '意见反馈',
  },
]);
const onClick = (e:any)=>{
  // console.log('click',e);
  router.push('/'+e.key)
  current.value = e.key
  // console.log('/'+e.key);
}
const onHome = ()=>{
  router.push('/home')
  current.value = ['home'];
}
const handleMenuClick = (e:any)=>{
  // console.log(e);
  switch(e.key){
    case '1':
      message.loading('正在跳转',1)
      router.push('/user')
      current.value = ['user']
      break
    case '2':
      message.success('退出成功')
      router.push('/login')
      break
    default:
      break
  }
}

</script>

<style scoped>
.menu-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background: #f8f8f8;
  z-index:1000;
  background:rgba(0,0,0,0.0);
  backdrop-filter: blur(5px);
  width: '100%';
  display: flex;
  border-bottom: 1px solid #dcdfe6;
  .menu-wrapper-left {
    display: flex;
    margin-top: 10px;
    margin-right: 20px;
    align-items: center;
    cursor: pointer;
    img {
      margin-left: 20px;
      margin-right: 20px;
      width: 40px;
    }
    h1 {
      margin-top: 10px;
      width: 100px;
      font-size: 18px;
      color: #002140;
      font-weight: 400;
    }
    h1:hover {
      color: rgb(22, 200, 200);
    }
  }
  .a-menu-demo {
    width: 60%;
    margin: 10px 0 0 20px;
    line-height: 70px;
    background:rgba(0,0,0,0.0);
    backdrop-filter: blur(5px);
  }
  .menu-wrapper-right {
    margin-top: 10px;
    display: flex;
    align-items: center;
    margin-left: 8%;
    .avatar {
      margin-right: 10px;
    }
    .dropdown {
      margin-right: 10px;
    }
  }
}
</style>