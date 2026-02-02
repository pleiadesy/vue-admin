<script setup>
  import { onMounted, ref, nextTick } from 'vue'
  import { getUserDataApi, deleteUserApi, addUserApi, updateUserApi } from '@/api/user'
  import timeFormat from '@/utils/timeFormat'
  // 表单标签
  const tableLabel = ref([
    {
    prop: "name",
    label: "姓名",
    },
    {
    prop: "age",
    label: "年龄",
    },
    {
    prop: "genderText",
    label: "性别",
    },
    {
    prop: "birth",
    label: "出生日期",
    width: 200,
    },
    {
    prop: "addr",
    label: "地址",
    width: 400,
    }
  ])

  const formData = ref({
    searchWord: ''
  })
  const paramsData = ref({
    name: '',
    page: 1
  })

  // 用户数据
  const tableData = ref([])
  // 数据条数
  const dataCount = ref(0)
  const getTableData = async () => {
    const res = await getUserDataApi(paramsData.value)
    tableData.value = res.data.data.list.map(item => {
      return {
        ...item,
        genderText: item.gender == 1 ? '男' : '女'
      }
    })
    dataCount.value = res.data.data.count
  }

  // 搜索功能
  const handleSearch = () => {
    paramsData.value.name = formData.value.searchWord
    getTableData()
  }

  // 分页功能
  const handleChangePage = (page) => {
    paramsData.value.page = page
    getTableData()
  }

  // 删除用户
  const deleteUser = async (id) => {
    ElMessageBox.confirm(
      '确定要删除此条数据吗',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(async () => {
      await deleteUserApi(id)
      ElMessage.success('删除成功')
      // 删除成功后刷新数据
      getTableData()
    })
  }

  // 新增用户
  const dialogVisible = ref(false)  // 是否显示新增用户的对话框
  const action = ref('add') // 显示’新增用户‘ / ’编辑用户‘
  const formUser = ref({})
  const userForm = ref('')
  // 表单验证规则
  const rules = ref({
    name: [{required: true, message: '请填写姓名', trigger: 'blur'}],
    age: [{required: true, message: '请填写年龄', trigger: 'blur'},
      {type: 'number', message: '年龄必须是数字'}
    ],
    gender: [{required: true, message: '请填写性别', trigger: 'change'}],
    birth: [{required: true, message: '请填写出生日期', trigger: 'blur'}],
    addr: [{required: true, message: '请填写地址', trigger: 'blur'}]
  })
  // 提交表单
  const onSubmit =  () => {
    // 提交前进行验证
    userForm.value.validate( async (valid) => {
      if(valid) {
        try {
          // 格式化时间
          formUser.value.birth = timeFormat(formUser.value.birth)
          // 如果是新增，调用新增用户的接口
          if(action.value === 'add') {
            await addUserApi(formUser.value)
            ElMessage.success('新增用户成功')
          } else {
            // 修改用户信息
            await updateUserApi(formUser.value)
            ElMessage.success('修改用户信息成功')
          }
          dialogVisible.value = false
          // 重置表单
          userForm.value.resetFields()
          // 刷新数据
          getTableData()
        } catch (error) {
          ElMessage.error('新增用户失败：' + (error.message || '未知错误'))
        }
      } else {
        ElMessage.warning('请完善各项信息')
        return false
      }
    })
  }

  // 编辑用户信息
  const handleUpdateUser = (userData) => {
    action.value = 'edit'
    dialogVisible.value = true
    nextTick(() => {
      Object.assign(formUser.value, {...userData, gender: '' + userData.gender})
    })
  }

  const handleClose = () => {
    dialogVisible.value = false // 关闭对话框
    // 重置表单
    userForm.value.resetFields()
  }


  onMounted(() => {
    getTableData()
  })
</script>

<template>
  <div class="user-header">
    <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    <el-form :inline="true" :model="formData">
      <el-form-item>
        <el-input placeholder="请输入" v-model="formData.searchWord" @keyup.enter.prevent="handleSearch"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleUpdateUser(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pageination"
      background layout="prev, pager, next"
      :total="dataCount"
      @current-change="handleChangePage"
    />
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
    <el-form :inline="true"  :model="formUser" :rules="rules" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="性别" prop="gender">
            <el-select  v-model="formUser.gender" placeholder="请选择">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="请输入"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
        >
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<style lang="less" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}
.table {
  position: relative;
  height: 520px;
  .pageination {
    position: absolute;
    right: 10px;
    bottom: 30px;
  }
}
.select-clearn {
  display: flex;
}
</style>
