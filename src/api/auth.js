import {get,post} from './request'
 

// register
export const registerAsClient = (data) => {
  return post('/auth/registerAsClient', data)
}
export const registerAsPsychologist = (data) => {
  return post('/auth/registerAsPsychologist', data)
}

export const login = (data) => {
  return post('/auth/login', data)
}