<template>
  <div style="height: 100%">
    <home-header :category="category"
      @set-current-gategory="setCurrentCategory"></home-header>
    <div class="home-container" ref="refreshElm">
      <Suspense>
        <template #default>
          <home-slider></home-slider>
        </template>
        <template #fallback>
          <div>loading</div>
        </template>
      </Suspense>
      <home-list :lessonList="lessonList"></home-list>
      <div v-if="isloading">加载中。。。。</div>
      <div v-if="!hasMore">到底了。。。。</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { IGlobalState } from '@/store'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { Store, useStore } from 'vuex'
import * as Types from '@/store/action-types'
import HomeList from './home-list.vue'
import HomeHeader from './home-header.vue'
import HomeSlider from './home-slider.vue'
import { GATEGORY_TYPES } from '@/typings/home'
import { useLoadMore } from '@/hooks/useLoadMore'

function useCategory (store: Store<IGlobalState>) {
  const category = computed(() => store.state.home.currentCategory)

  function setCurrentCategory (category: GATEGORY_TYPES) {
    store.commit(`home/${Types.SET_GATEGORY}`, category)
  }

  return {
    category,
    setCurrentCategory
  }
}

function useLessonList (store: Store<IGlobalState>) {
  const lessonList = computed(() => store.state.home.lessons.list)

  onMounted(() => {
    if (lessonList.value.length === 0) {
      store.dispatch(`home/${Types.SET_LESSON_LIST}`)
    }
  })

  return {
    lessonList
  }
}

export default defineComponent({
  components: {
    HomeList,
    HomeHeader,
    HomeSlider
  },
  setup () {
    const store = useStore<IGlobalState>()
    const { category, setCurrentCategory } = useCategory(store)
    const { lessonList } = useLessonList(store)
    const refreshElm = ref<null | HTMLElement>(null)
    const { isloading, hasMore } = useLoadMore(refreshElm, store, `home/${Types.SET_LESSON_LIST}`)

    return {
      category,
      setCurrentCategory,
      lessonList,
      refreshElm,
      isloading,
      hasMore
    }
  }
})
</script>

<style lang="scss" scoped>
.home-container {
  position: absolute;
  top: 65px;
  bottom: 50px;
  width: 100%;
  overflow-y: scroll;
}
</style>
