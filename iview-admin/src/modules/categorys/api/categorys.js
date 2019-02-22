import axios from '@/libs/api.request'

export const getCategoryData = ( url = '' ) => {
  return axios.request({
    url: `/category${url}`,
    method: 'get'
  })
}

export const addCategoryData = ( formData ) => {
  return axios.request({
    url: `/category`,
    method: 'post',
    data: formData
  })
}
