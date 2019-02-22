import axios from '@/libs/api.request'

export const getTagData = ( url = '' ) => {
  return axios.request({
    url: `/tag${url}`,
    method: 'get'
  })
}

export const addTagData = ( formData ) => {
  return axios.request({
    url: `/tag`,
    method: 'post',
    data: formData
  })
}
