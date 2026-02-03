<script setup>
 import { useTagStore } from '@/stores/tag'
 import { useRoute, useRouter } from 'vue-router'
 const route = useRoute()
 const router = useRouter()
 const tagStore = useTagStore()

//  关闭标签
const handleClose = (tag) => {
  // 如果关闭的是当前页面的tag,返回到上一个tag
  if(tag.name === route.name) {
    const index = tagStore.tags.findIndex(item => item.name === tag.name)
    router.push(tagStore.tags[index - 1].path)
  }
  tagStore.removeTag(tag)
}

</script>

<template>
 <div class="tags">
   <el-tag
    v-for="item in tagStore.tags" :key="item.name"
    :closable="item.name !== 'home'"
    :effect="route.name === item.name ? 'dark' : 'plain'"
    @click="router.push(item.path)"
    @close="handleClose(item)"
    >{{ item.label }}</el-tag>
 </div>
</template>

<style lang="less" scoped>
.tags{
  margin: 20px 0 0 20px;
}
.el-tag{
  margin-right: 10px;
}
</style>
