<template>
  <div class="about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ id ? '编辑' : '新建' }}菜单</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级菜单">
        <el-select v-model="model.parent" clearable>
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="子级菜单">
        <el-select v-model="model.children" placeholder="请选择直接子集" clearable multiple>
          <el-option
            v-for="item in childrens"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单分级">
        <el-select v-model="model.level" placeholder="1级最高" clearable>
          <el-option
            v-for="le in levels"
            :key="le"
            :label="le + '级菜单'"
            :value="le"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称">
        <el-input v-model="model.name" placeholder="左侧菜单显示名"></el-input>
      </el-form-item>
      <el-form-item label="菜单路由">
        <el-input v-model="model.index" placeholder="如 /items/create"></el-input>
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
      model: {},
      parents: [],
      childrens: [],
      levels: [1, 2, 3]
    }
  },
  methods: {
    async save() {

      if (this.id) {
        await this.$http.put(`rest/menus/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/menus', this.model)
      }
      // console.log(res)
      this.$router.push('/menus/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/menus/${this.id}`)
      this.model = res.data
      // console.log(res.data);
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/menus`)
      // console.log(res.data);
      this.parents = res.data
      this.childrens = res.data
      
    }
  },
  created() {
    this.fetchParents()
    this.id && this.fetch()
  }
}
</script>
