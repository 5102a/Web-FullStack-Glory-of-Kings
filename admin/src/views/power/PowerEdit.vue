<template>
  <div class="about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ id ? '编辑' : '新建' }}权限</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 权限分配 -->
      <el-form-item label="关联菜单">
        <el-button type="primary" @click="getPower">分配权限</el-button>
        <!-- 弹窗 -->
        <el-dialog title="【写权限在读权限开启后有效,非操作菜单没有写权限】" :visible.sync="isShow" width="50%" @close="saveMenu">
          <!-- 菜单权限树 -->
          <el-tree :data="menus" :default-checked-keys="nodes" show-checkbox default-expand-all node-key="name"
            ref="tree" highlight-current @check-change="click">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="node.level==3">
                读权限
                <el-switch v-model="data.read" active-color="#0af" inactive-color="#bbb"
                  @change="handleRead(data,node)">
                </el-switch>
                写权限
                <el-switch v-model="data.write" active-color="#0af" inactive-color="#bbb"
                  @change="handleWrite(data,node)">
                </el-switch>
              </span>
            </span>
          </el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button type="primary" @click="isShow = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
      <!-- 权限名 -->
      <el-form-item label="权限名">
        <el-input v-model="model.name"></el-input>
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
  data () {
    return {
      model: {},
      menus: [],
      nodes: [],
      isShow: false
    }
  },
  methods: {
    // 保存
    async save () {
      // console.log(this.model);
      
      if (this.id) {
        await this.$http.put(`rest/powers/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/powers', this.model)
      }
      this.$router.push('/powers/list')
      this.$message.success('保存成功')
    },
    //获取编辑菜单
    async fetch () {
      const res = await this.$http.get(`rest/powers/${this.id}`)
      this.model = res.data
      // console.log(res.data);
    },
    //合并重复项
    merge (a, b) {
      a.write = a.write || b.write
      a.read = a.read || b.read
      if (!a.children || !a.children.length) return
      for (let i in b.children) {
        this.merge(a.children[i], b.children[i])
      }
    },
    // 获取权限菜单
    async fetchGetMenus () {
      const resMenu = await this.$http.get(`rest/menus`)
      this.menus = resMenu.data.filter(i => {
        if (i.level == 1) return true
        return false
      })
      // console.log(this.menus);
    },
    // 清除末尾菜单的children项
    clearLastChild (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i].children||!arr[i].children.length) {
          delete arr[i].children
        } else {
          this.clearLastChild(arr[i].children)
        }
      }
    },
    // 开启弹窗
    async getPower () {
      if (this.id) {
        const resPower = await this.$http.put(`rest/powers/${this.id}`, this.model)
        this.nodes = resPower.data.nodes
        this.menus.forEach((n, x) => {
          resPower.data.children.forEach((i) => {
            if(i.name==n.name){
              this.menus.splice(x,1,i)
            }
          })
        })
        // console.log(this.menus);
      }
      this.clearLastChild(this.menus)
      this.isShow = true
    },
    // 同步后代字段
    collect (b, field) {
      const flag = b[field]
      if (b.children && b.children.length) {
        let ch = b.children
        for (let i = 0; i < ch.length; i++) {
          let pre = ch[i][field]
          ch[i][field] = pre || this.collect(ch[i], field)
        }
        b[field] = ch.some(child => {
          return this.collect(child, field)
        })
      }
      return b[field] || flag
    },
    // 关闭弹窗，保存数据
    saveMenu () {
      // console.log(this.menus);
      this.model.children = this.menus.filter(menu => {
        this.collect(menu, 'read')
        this.collect(menu, 'write')
        return menu.read
      })
      // console.log(this.model.children);
      // this.model.children = this.menus
      this.model.nodes = this.$refs.tree.getCheckedKeys()
    },
    // 节点点击
    click (data, s, c) {
      if (s) {
        data.read = true
        if (c && data.children && data.children.length) {
          data.children.forEach(i => {
            i.read = true
          })
        }
      } else {
        data.read = false
        this.handleRead(data)
      }
    },
    // 读权限开关
    handleRead (data, node) {
      if (node != undefined) {
        this.syncNode(data, node)
      }
      if (!data.read && data.write) {
        data.write = false
      }
    },
    // 写权限开关
    handleWrite (data, node) {
      if (node != undefined) {
        this.syncNode(data, node)
      }
      if (!data.read && data.write) {
        data.write = false
        this.$message.warning('请先开启读权限')
      }
    },
    // 开关同步节点状态
    syncNode (data, node) {
      if (data.read) {
        const arrget = this.$refs.tree.getCheckedKeys()
        if (arrget.length) {
          this.$refs.tree.setChecked(node.key, true)
        } else {
          this.$refs.tree.setCheckedKeys([node.key])
        }
      } else {
        const arrget = this.$refs.tree.getCheckedKeys()
        if (arrget.length) {
          this.$refs.tree.setChecked(node.key, false)
        } else {
          this.$refs.tree.setCheckedKeys([])
        }
      }
    }
  },
  created () {
    this.id && this.fetch()
    this.fetchGetMenus()
  }
}
</script>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>