<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)

const rainInfo = {
  width: 0,
  height: 0,
}
const fontSize = 12
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const drops = []

const draw = () => {
  const ctx = canvas.value.getContext('2d')
  ctx.fillStyle = 'rgba(0,0,0,.09)'
  ctx.fillRect(0, 0, rainInfo.width, rainInfo.height)
  ctx.fillStyle = 'rgba(0, 250, 0, .9)'
  ctx.font = `${fontSize}px 微软雅黑`
  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)]
    ctx.fillText(text, i * fontSize, drops[i].y)
    drops[i].y += fontSize
    if (drops[i].y > rainInfo.height) {
      drops[i].y =
        -(Math.random() * rainInfo.height) + Math.random() * 5 * fontSize
      drops[i].alpha = 1
    }
  }
}

const init = () => {
  rainInfo.width = canvas.value.width = window.innerWidth
  rainInfo.height = canvas.value.height = window.innerHeight
  const cols = Math.floor(rainInfo.width / fontSize)
  for (let i = 0; i < cols; i++) {
    drops[i] = {
      y: -(Math.random() * rainInfo.height) + Math.random() * 5 * fontSize,
      alpha: 1,
    }
  }
  draw()
  setInterval(() => {
    draw()
  }, 60)
}
onMounted(() => {
  init()
})
</script>

<template>
  <div class="rain">
    <canvas id="rain" ref="canvas"></canvas>
  </div>
</template>

<style lang="less" scoped>
.rain {
  width: 100%;
  height: 100vh;
  background-color: #000;
  canvas {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
}
</style>
