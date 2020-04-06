<template>
  <div class="about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ id ? '编辑' : '新建' }}管理员</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 角色分配 -->
      <el-form-item label="扮演角色">
        <el-select v-model="model.role" multiple clearable>
          <el-option
            v-for="role in roleCate"
            :key="role._id"
            :label="role.power + '级角色：' + role.name"
            :value="role._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 用户名 -->
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <!-- 描述 -->
      <el-form-item label="描述">
        <el-input v-model="model.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        role: []
      },
      roleCate: []
    }
  },
  methods: {
    async save() {
      // console.log(this.model)
      if (!this.model.password) {
        this.$router.push('/admin_users/list')
      }
      this.model.password = this.$sha256(this.model.password)
      if (this.id) {
        await this.$http.put(`rest/admin_users/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/admin_users', this.model)
      }
      this.$router.push('/admin_users/list')
      this.$message.success('保存成功')
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
    },
    // 获取角色列表
    async fetchGetRoles() {
      const res = await this.$http.get(`rest/roles`)
      this.roleCate = res.data
    }
  },
  created() {
    this.fetchGetRoles()
    this.id && this.fetch()
  }
}
</script>
