<template>
  <div class="home-header">
    <img src="https://img.yzcdn.cn/vant/logo.png"
      alt="">
    <van-dropdown-menu>
      <van-dropdown-item :modelValue="category"
        :options="options"
        @change="change" />
    </van-dropdown-menu>
  </div>
</template>

<script lang="ts">
import { GATEGORY_TYPES } from '@/typings/home'
import { defineComponent, PropType, reactive, toRefs } from 'vue'

export default defineComponent({
  props: {
    category: {
      type: Number as PropType<GATEGORY_TYPES>
    }
  },
  emits: ['set-current-gategory'],
  setup (props, context) {
    const state = reactive({
      options: [
        { text: '全部课程', value: GATEGORY_TYPES.ALL },
        { text: 'react课程', value: GATEGORY_TYPES.REACT },
        { text: 'vue课程', value: GATEGORY_TYPES.VUE },
        { text: 'node课程', value: GATEGORY_TYPES.NODE }
      ]
    })

    function change (value: GATEGORY_TYPES) {
      context.emit('set-current-gategory', value)
    }

    return {
      ...toRefs(state),
      change
    }
  }
})
</script>

<style lang="scss">
.home-header {
  height: 65px;
  background: #001938;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  img {
    height: 50px;
  }
}
</style>
