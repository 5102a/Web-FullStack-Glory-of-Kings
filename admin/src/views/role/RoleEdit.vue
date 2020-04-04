<template>
  <div class="about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ id ? '编辑' : '新建' }}角色</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 角色分配 -->
      <el-form-item label="角色下级">
        <el-select v-model="model.children" placeholder="可选多个下级" multiple>
          <el-option v-for="role in roleCate" :key="role._id" :label="role.name" :value="role._id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="角色权限等级">
        <el-select v-model="model.power" placeholder="1级最高" clearable>
          <el-option v-for="level in powerLevel" :key="level" :label="'等级:' + level" :value="level">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理菜单">
        <!-- <el-select v-model="model.manage" placeholder="管理菜单项(多选)" clearable multiple>
          <el-option
            v-for="menu in menus"
            :key="menu._id"
            :label="'管理菜单: ' + menu.name"
            :value="menu._id"
          >
          </el-option>
        </el-select> -->
        <el-cascader placeholder="管理菜单项(多选)" v-model="model.manage" :options="menus" :props="{emitPath:false,multiple: true,label:'name',value:'_id'}"
          expandTrigger="hover"  clearable></el-cascader>
      </el-form-item>

      <el-form-item label="角色名">
        <el-input v-model="model.name" placeholder="请输入角色名"></el-input>
      </el-form-item>
      <!-- <el-form-item label="角色编号" >
        <el-input v-model="model.id" placeholder="(可选)格式:xyy x为等级 yy为此等级下的角色序号"></el-input>
      </el-form-item> -->
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
  data () {
    return {
      model: {},
      roleCate: [],
      powerLevel: [1, 2, 3],
      menus: []
    }
  },
  methods: {
    async save () {
      // console.log(this.model)

      if (this.id) {
        await this.$http.put(`rest/roles/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/roles', this.model)
      }
      // // console.log('saveend')
      this.$router.push('/roles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/roles/${this.id}`)
      this.model = res.data
    },
    async fetchGetRoles () {
      const res = await this.$http.get(`rest/roles`)
      this.roleCate = res.data
    },
    async fetchGetMenus () {
      const res = await this.$http.get(`rest/menus`)

      this.menus = res.data.filter(i => {
        if (i.level == 1) return true
        return false
      })
      this.clearLastChild(this.menus)
      // console.log(this.menus);

    },
    clearLastChild (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children.length == 0) {
          delete arr[i].children
        } else {
          this.clearLastChild(arr[i].children)
        }
      }
    }
  },
  created () {
    this.fetchGetRoles()
    this.fetchGetMenus()
    this.id && this.fetch()
  }
}
</script>
