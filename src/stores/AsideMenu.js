import { defineStore } from "pinia";
import { ref } from "vue";

export const useAsideMenuStore = defineStore('asideMenu', () => {
  // 侧边栏是否收起
  const isCollapse = ref(false)

  // 修改侧边栏收起状态
  const changeIsCollapse = () => {
    isCollapse.value = !isCollapse.value
  }
  return {
    isCollapse,
    changeIsCollapse
  }
})
