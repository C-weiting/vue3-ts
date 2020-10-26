<template>
  <van-swipe v-if="sliderList.length">
    <van-swipe-item v-for="slider in sliderList" :key="slider.url">
      <img :src="slider.url" class="slider-item-img" alt="">
    </van-swipe-item>
  </van-swipe>
</template>

<script lang='ts'>
import { IGlobalState } from '@/store'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import * as Types from '@/store/action-types'

export default defineComponent({
  async setup () {
    const store = useStore<IGlobalState>()
    const sliderList = computed(() => store.state.home.sliders)

    if (sliderList.value.length === 0) {
      await store.dispatch(`home/${Types.SET_SLIDER_LIST}`)
    }

    return {
      sliderList
    }
  }
})
</script>

<style lang="scss">
.slider-item-img {
  width: 100%;
}
</style>
