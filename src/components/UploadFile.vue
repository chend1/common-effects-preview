<script setup>
import { ref } from 'vue'
import CryptoJs from 'crypto-js'
import encHex from 'crypto-js/enc-hex'

const props = defineProps({
  title: {
    type: String,
    default: '上传文件',
  },
  isSlice: {
    type: Boolean,
    default: false,
  },
  uploadInfo: {
    type: Object,
    default: () => {
      return {
        chunkSize: 1024 * 1024 * 30,
      }
    },
  },
})

const uploadFile = ref(null)
const uploadClick = () => {
  uploadFile.value.click()
}

const emits = defineEmits(['fileChange'])
const fileChange = async (e) => {
  console.log('e', e.target.files)
  // const work = new Worker()
  const chunks = await getUploadChunk(
    e.target.files[0],
    props.uploadInfo.chunkSize
  )
  // console.log('chunks', chunks)
  emits('fileChange', chunks)
  uploadFile.value.value = ''
}

// 获取分片上传的文件
const getUploadChunk = async (file, chunkSize) => {
  const alog = CryptoJs.algo.SHA256.create()
  const chunks = []
  let start = 0
  while (start < file.size) {
    const end = start + chunkSize
    const cur = end > file.size ? file.size : end
    const chunk = file.slice(start, cur)
    const hash = await getHash(chunk, alog)
    chunks.push({
      file: chunk,
      hash,
    })
    start += chunkSize
  }
  return {
    chunks,
    hash: encHex.stringify(alog.finalize()),
  }
}

// 根据文件生成hash
const getHash = async (file, alog) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = function ({ target }) {
      const content = target.result
      const hash = CryptoJs.algo.SHA256.create()
      const wordArray = CryptoJs.lib.WordArray.create(content)
      hash.update(wordArray)
      alog && alog.update(wordArray)
      resolve(encHex.stringify(hash.finalize()))
    }
    reader.readAsArrayBuffer(file)
  })
}
</script>

<template>
  <div class="upload-file">
    <div class="upload">
      <div class="btn" @click="uploadClick">上传文件</div>
      <input type="file" ref="uploadFile" @change="fileChange" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.upload-file {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload {
  position: relative;
  .btn {
    width: 160px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    color: #ccc;
  }
  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: -1;
  }
}
</style>
