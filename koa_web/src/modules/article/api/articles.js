import axios from '@/libs/api.request'

export const getArticle = ( url = '' ) => {
  return axios.request({
    url: `/articles${url}`,
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

export const getArticleDetail = ( id ) => {
  return axios.request({
    url: `/articles/${id}`,
    method: 'get'
  })
}
