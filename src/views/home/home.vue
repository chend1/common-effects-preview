<script setup>
import { useRouter } from 'vue-router'
const effects = [
  {
    name: '代码雨',
    value: 'rain',
  },
  {
    name: '粒子动画',
    value: 'particle',
  },
  {
    name: '文件上传',
    value: 'upload',
  },
]

const router = useRouter()
const effectClick = (value) => {
  console.log(value);
  router.push({ name: value })
}
</script>

<template>
  <div class="home">
    <ul>
      <li v-for="effect in effects" :key="effect.value">
        <el-button type="primary" @click="effectClick(effect.value)">{{
          effect.name
        }}</el-button>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.home {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    display: flex;
    flex-wrap: wrap;
    li{
      margin-right: 10px;
    }
  }
}
</style>
