<script setup>
import UploadFile from '../../components/UploadFile.vue'
import { ref } from 'vue'
import { uploadBig, mergeBig, cancelUpload } from '../../api/upload'
import { LimitRequest } from '../../utils/index'

const limitRequest = new LimitRequest(3)
const fileChange = ({ chunks, hash }) => {
  // console.log('123', chunks)
  chunks.forEach((chunk, index) => {
    const formData = new FormData()
    formData.append('file', chunk.file)
    formData.append('hash', hash)
    formData.append('chunkIndex', index)
    formData.append('chunkHash', chunk.hash)
    limitRequest.addRequest(uploadBig(formData))
  })
  limitRequest.onFinish(() => {
    mergeFile(hash)
  })
}

const mergeFile = async (hash) => {
  await mergeBig({
    hash,
    fileName: '测试.exe',
    suffix: 'exe',
    totalSlice: 5,
  })
}
</script>

<template>
  <div class="upload">
    <UploadFile @fileChange="fileChange"></UploadFile>
  </div>
</template>

<style lang="less" scoped></style>
