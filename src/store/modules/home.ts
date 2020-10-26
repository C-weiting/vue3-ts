import { Module } from 'vuex'
import { GATEGORY_TYPES, IHomeState, ISlider, ILessons } from '@/typings/home'
import { IGlobalState } from '..'
import * as Types from '../action-types'
import { getSlider, getLessons } from '@/api/home'

const state: IHomeState = {
  currentCategory: GATEGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    hasMore: true,
    loading: false,
    offset: 0,
    limit: 6,
    list: []
  }
}

const home: Module<IHomeState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.SET_GATEGORY] (state, payload: GATEGORY_TYPES) {
      state.currentCategory = payload
    },
    [Types.SET_SLIDER_LIST] (state, payload: ISlider[]) {
      state.sliders = payload
    },
    [Types.SET_LOADING] (state, payload: boolean) {
      state.lessons.loading = payload
    },
    [Types.SET_LESSON_LIST] (state, payload: ILessons) {
      state.lessons.list = [...state.lessons.list, ...payload.list]
      state.lessons.hasMore = payload.hasMore
      state.lessons.offset = state.lessons.offset + payload.list.length
    }
  },
  actions: {
    async [Types.SET_SLIDER_LIST] ({ commit }) {
      const sliders = await getSlider<ISlider[]>()
      commit(Types.SET_SLIDER_LIST, sliders)
    },
    async [Types.SET_LESSON_LIST] ({ commit }) {
      if (!state.lessons.hasMore) {
        return
      }
      if (state.lessons.loading) {
        return
      }
      commit(Types.SET_LOADING, true)
      const lessons = await getLessons<ILessons>(state.currentCategory, state.lessons.offset, state.lessons.limit)
      commit(Types.SET_LESSON_LIST, lessons)
      commit(Types.SET_LOADING, false)
    }
  }
}

export default home
