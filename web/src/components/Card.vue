<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex ai-center "
    :class="{'border-bottom':!plain,'pb-3':!plain}">
      <i class="fa " :class="`fa-${icon}`"></i>
      <div class="fs-xxl flex-1 px-2">
        <strong>{{title}}</strong></div>
      <i class="fa fa-ellipsis-h pt-1" v-if="!plain"></i>
    </div>

    <div class="card-body pt-3">
      <slot>
        <!-- 插槽 -->


      </slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String, required: true
    },
    icon: {
      type: String, required: true
    },
    plain: {
      type: Boolean
    },
  }
};
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';

.card{
    border-bottom: 1px solid $border-color;
}
</style>



