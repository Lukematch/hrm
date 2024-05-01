<template>
  <div class="container">
    <a-card>
      <a-tabs
      v-model:activeKey="activeKey"
      tab-position="left"
      >
        <a-tab-pane
        class="tab-pane1"
        key="1"
        tab="调换岗位"
        >
          <a-card class="relieve">
            <a-form
            :modal="relieve"
            name="调换岗位"
            >
            </a-form>
            <a-button
            type="primary"
            >
              提交
            </a-button>
            <a-button
            style="margin-left: 10px;">
              重置
            </a-button>
          </a-card>
        </a-tab-pane>
        <a-tab-pane
        class="tab-pane1"
        key="2"
        tab="离职申请"
        >
          <a-card class="dimission">
            <a-form
            :model="dimission"
            name="离职"
            >
            </a-form>
            <a-button
            type="primary"
            >
              提交
            </a-button>
            <a-button
            style="margin-left: 10px;">
              重置
            </a-button>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';


const activeKey = ref('1');

const relieve = ref({

})

const dimission = ref({

})
</script>
  
<style scoped>
.container {
  padding: 30px;
}
</style>