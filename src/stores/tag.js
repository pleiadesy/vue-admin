import { defineStore } from "pinia";
import { ref } from 'vue'

export const useTagStore = defineStore('tag', () => {
  const tags = ref([{
    path: '/home',
    name: 'home',
    label: '首页',
    icon: 'home'
  }])

  // 切换菜单时往tag中添加内容
  const checkMenu = (newTag) => {
    //检查是否已经存在tag
    const index = tags.value.findIndex(item => item.name === newTag.name)
    index === -1 ? tags.value.push(newTag) : ''
  }

  // 移除tag
  const removeTag = (value) => {
    tags.value = tags.value.filter(item => item.name !== value.name)
  }

  return {
    tags,
    checkMenu,
    removeTag
  }
})
