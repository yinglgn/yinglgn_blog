import axios from '@/libs/api.request'

export const getCategoryData = ( url = '' ) => {
  return axios.request({
    url: `/category${url}`,
    method: 'get'
  })
}

export const getCategoryById = ( id ) => {
  return axios.request({
    url: `/category/${id}`,
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

export const editCategoryData = ( formData ) => {
  return axios.request({
    url: `/category`,
    method: 'put',
    data: formData
  })
}

export const delCategory = ( id ) => {
  return axios.request({
    url: `/category/${id}`,
    method: 'delete',
  })
}