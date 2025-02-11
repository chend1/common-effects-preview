<script setup>
import { ref, onMounted } from 'vue'
let particleArray = []
onMounted(() => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const mouse = {
    x: null,
    y: null,
    radius: 100,
  }

  window.addEventListener('mousemove', function (event) {
    mouse.x = event.x
    mouse.y = event.y
  })

  class Particle {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.size = 3
      this.baseX = this.x
      this.baseY = this.y
      this.density = Math.random() * 30 + 1
    }

    draw() {
      ctx.fillStyle = '#ff3b3b' // 粒子颜色（红色）
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    }

    update() {
      let dx = mouse.x - this.x
      let dy = mouse.y - this.y
      let distance = Math.sqrt(dx * dx + dy * dy)
      let forceDirectionX = dx / distance
      let forceDirectionY = dy / distance
      let maxDistance = mouse.radius
      let force = (maxDistance - distance) / maxDistance
      let directionX = forceDirectionX * force * this.density
      let directionY = forceDirectionY * force * this.density

      if (distance < mouse.radius) {
        this.x -= directionX
        this.y -= directionY
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX
          this.x -= dx / 10
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY
          this.y -= dy / 10
        }
      }
    }
  }

  function init() {
    particleArray = []
    const numParticles = 1000 // 粒子数量
    const scale = 15 // 控制爱心的大小
    const offsetX = canvas.width / 2 // 爱心中心的X坐标
    const offsetY = canvas.height / 2 // 爱心中心的Y坐标

    for (let i = 0; i < numParticles; i++) {
      const t = (i / numParticles) * 2 * Math.PI // 参数 t
      const x = 16 * Math.pow(Math.sin(t), 3) // 爱心公式的 x
      const y = -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      ) // 爱心公式的 y

      // 将爱心公式的结果缩放到合适的大小，并居中
      particleArray.push(new Particle(x * scale + offsetX, y * scale + offsetY))
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].draw()
      particleArray[i].update()
    }
    requestAnimationFrame(animate)
  }

  init()
  animate()

  window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
  })
})
</script>

<template>
  <div class="particle">
    <canvas id="canvas"></canvas>
  </div>
</template>

<style lang="less" scoped>
.particle {
  width: 100%;
  height: 100vh;
  background-color: #000;
}
</style>
