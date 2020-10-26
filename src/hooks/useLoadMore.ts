import { Ref, computed, onMounted } from 'vue'
import { Store } from 'vuex'
import { IGlobalState } from '@/store'
import _ from 'lodash'

export function useLoadMore (refreshElm: Ref<null | HTMLElement>, store: Store<IGlobalState>, type: string) {
  let element: HTMLElement

  function _loadMore () {
    const containerHeight = element.clientHeight
    const scrollTop = element.scrollTop
    const scrollHeight = element.scrollHeight

    if (containerHeight + scrollTop + 20 >= scrollHeight) {
      store.dispatch(type)
    }
  }

  onMounted(() => {
    element = refreshElm.value as HTMLElement
    element.addEventListener('scroll', _.debounce(_loadMore, 200))
  })

  const isloading = computed(() => store.state.home.lessons.loading)
  const hasMore = computed(() => store.state.home.lessons.hasMore)

  return {
    isloading,
    hasMore
  }
}
