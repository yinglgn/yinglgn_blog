import axios from '@/libs/api.request'

export const getArticleData = ( url = '' ) => {
  return axios.request({
    url: `/articles${url}`,
    method: 'get'
  })
}

export const getById = ( id ) => {
  return axios.request({
    url: `/articles/${id}`,
    method: 'get'
  })
}

export const addArticleData = ( formData ) => {
  return axios.request({
    url: `/articles`,
    method: 'post',
    data: formData
  })
}

export const editArticleData = ( formData ) => {
  return axios.request({
    url: `/articles`,
    method: 'put',
    data: formData
  })
}
