<template>
  <div>
    <van-card v-for="lesson in lessonList"
      :key="lesson.id"
      :price="lesson.price"
      :title="lesson.title"
      :thumb="lesson.poster">
      <template #tags>
        <van-tag plain
          type="danger">{{formatCategory(lesson.category)}}</van-tag>
      </template>
    </van-card>
  </div>
</template>

<script lang='ts'>
import { GATEGORY_TYPES, ILesson } from '@/typings/home'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    lessonList: {
      type: Array as PropType<ILesson[]>
    }
  },
  setup () {
    function formatCategory (type: GATEGORY_TYPES) {
      switch (type) {
        case 1:
          return 'react课程'
        case 2:
          return 'vue课程'
        case 3:
          return 'node课程'
        default:
          return '所有课程'
      }
    }

    return {
      formatCategory
    }
  }
})
</script>
