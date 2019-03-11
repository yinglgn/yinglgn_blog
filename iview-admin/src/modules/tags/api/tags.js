import axios from '@/libs/api.request'

export const getTagData = ( url = '' ) => {
  return axios.request({
    url: `/tag${url}`,
    method: 'get'
  })
}

export const getTagById = ( id ) => {
  return axios.request({
    url: `/tag/${id}`,
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

export const editTagData = ( formData ) => {
  return axios.request({
    url: `/tag`,
    method: 'put',
    data: formData
  })
}

export const delTag = ( id ) => {
  return axios.request({
    url: `/tag/${id}`,
    method: 'delete',
  })
}
