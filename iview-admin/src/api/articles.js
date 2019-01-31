import axios from '@/libs/api.request'

export const getArticleData = ( url = '' ) => {
  return axios.request({
    url: `/articles${url}`,
    method: 'get'
  })
}
