import axios from '@/libs/api.request'

export const getArticleData = ( url = '' ) => {
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
