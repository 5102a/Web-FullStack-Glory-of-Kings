<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2">
      <div class="iconfont icon-jiantou text-info"></div>
      <strong class="flex-1 text-info pl-2">
        {{ model.title }}
      </strong>
      <div class="text-grey fs-xs">
        2019-06-19
      </div>
    </div>

    <div v-html="model.body" class="px-3 body text-center"></div>
    <div class="px-3 border-top py-2">
      <div class="d-flex ai-center">
        <i class="iconfont icon-link"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>

      <div class="pt-2">
        <router-link
          class="py-1 "
          tag="div"
          v-for="item in model.related"
          :key="item._id"
          :to="`/articles/${item._id}`"
        >
          {{ item.title }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: null
    }
  },
  props: {
    id: { required: true }
  },
  watch:{
    id:'fetch',
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss">
.page-article {
  .body {
    img {
      width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
