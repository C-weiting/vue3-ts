import axios from '.'
import { GATEGORY_TYPES } from '@/typings/home'

export const getSlider = <T>() => {
  return axios.get<T>('/slider/list')
}

export const getLessons = <T>(category: GATEGORY_TYPES, offset = 0, limit = 5) => {
  return axios.get<T>(`/lesson/list?category=${category}&offset=${offset}&limit=${limit}`)
}
