import Config from 'react-native-config'
import Console from './console-debug'
/**
* Class for making calls to the API
*  
* @return: Class
* @creater: Muneeb Rabaney
**/
class Api {
  // Default members
  static token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0NzQzODQ0MjYsImp0aSI6IjBVXC82eXg0Ykd6Y0RmTEZcL2xhTWxIeXZWSzhHVmVXUE12QUdWZnN2eTVIZz0iLCJpc3MiOiJsaXF1b3JpY2UtYXBpIiwibmJmIjoxNDc0Mzg0NDI2LCJleHAiOjE2MzIwNjQ0MjYsImRhdGEiOnsidHlwZSI6InN1YnNjcmliZXIiLCJpZCI6MX19.nnVF_ZMgymswctRFq7vyDb_HCAE1CAykQQ1HirZGAMFy4OLnFbinsVm5dTjbbTn_NkGAIirNil3KJ3HvJT2PaA'
  static endpoint = 'https://rms.knorrwhatsfordinner.co.za/api/v1'

  /**
  * sets a Getter for the headers 
  * neerded by the API
  *  
  * @return: Object
  **/
  static get headers() {
    return { 
      headers : {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }
    }
  }

  /**
  * Performs a GET request
  * 
  * @route: String 
  * @params: Object
  *  
  * @return: Object
  **/
  static async get(route = null, params = {}, { single } = false) {
    try {
      if (route) {
        let {
          data,
          success
        } = await this.request(route, { params }, { method: 'GET' }, single)
        if (success) return data
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
  * Performs a POST request
  * 
  * @route: String 
  * @params: Object
  *  
  * @return: Object
  **/
  static async post(route = null, params = {}, { single } = false) {
    Console.message({
      type: 'log',
      title: 'Performing POST request',
      result: params
    })

    try {
      if (route) {
        let {
          data,
          success
        } = await this.request(route, { params }, { method: 'POST' }, single)
        if (success) return data
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  /**
  * Submit a request to an endpoint
  * 
  * @route: String 
  * @params: Object
  * @verb: String
  *  
  * @return: Object
  **/ 
  static async request(route, { params }, { method }, single = false) {
    Console.message({
      title: 'Is Single',
      result: single
    })
    
    const uri = `${this.endpoint}/${route}`
    let endpoint = this.modifyApiQueryEndpoint(uri, params)
    if (single) endpoint = `${uri}/${params.id}`
    let response = await fetch(endpoint, { ...this.headers, method })
    let result = await response.json()
    
    Console.message({
      type: 'log',
      title: 'Requested Endpoint',
      result: endpoint
    })
    Console.message({
      type: 'log',
      title: 'Endpoint Response',
      result: result
    })

    return result
  }
  
  /**
  * Modifies the query endpoint before
  * a request for data is performed
  * 
  * @url: String
  * @params: Object
  *  
  * @return: String
  **/
  static modifyApiQueryEndpoint(url = false, params = {}) {
    if (url && typeof params === 'object') {
      let output = `${url}?`
      Object.keys(params).map((value, key, object) => {
        return output += `${value}=${params[value]}${object.length && '&'}`
      })
      return output.replace(/&$/, "")
    }
    return null
  }
}

export default Api
