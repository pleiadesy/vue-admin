import { defineStore } from "pinia";
import { ref } from "vue";

export const useAsideMenuStore = defineStore('asideMenu', () => {
  // 侧边栏菜单数据
  const menuList = ref([])
  // 侧边栏是否收起
  const isCollapse = ref(false)

  // 更新侧边菜单
  const updateMenuList = (val) => {
    menuList.value = val
  }

  // 修改侧边栏收起状态
  const changeIsCollapse = () => {
    isCollapse.value = !isCollapse.value
  }
  return {
    menuList,
    isCollapse,
    updateMenuList,
    changeIsCollapse
  }
}, {
  persist: true
})
