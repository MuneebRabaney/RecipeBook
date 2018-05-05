import Console from '../console-debug'
/**
* Factory base class for the API
*  
* @return: Class
* @author: Muneeb Rabaney
**/
class Api {

  /**
  * Performs a GET request
  * 
  * @route: String 
  * @params: Object
  *  
  * @return: Object
  **/
  static async get({ route = null, params = {} }, { single } = false) {
    Console.message({
      type: 'log',
      title: `Performing GET request ${params && 'with the below parameters'}`,
      result: params
    })

    try {
      let {
        data,
        success
      } = await this.request(route, { params }, { method: 'GET' }, single)
      if (success) return data
    } catch (error) {
      Console.message({
        type: 'error',
        title: `Failed to perform GET request`,
        result: error
      })
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
  static async post({ route = null, params = {} }, { single } = false) {
    Console.message({
      type: 'log',
      title: `Performing POST request ${params && 'with the below parameters'}`,
      result: params
    })

    try {
      let {
        data,
        success
      } = await this.request(route, { params }, { method: 'POST' }, single)
      if (success) return data
    } catch (error) {
      Console.message({
        type: 'error',
        title: `Failed to perform POST request`,
        result: error
      })
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
  static async request(route = null, { params = {} }, { method = '' }, single = false) {
    Console.message({
      type: 'log',
      title: 'Is this a single result set that we need returned from the request?',
      result: single ? 'Yes' : 'No'
    })
    
    let uri = `${this.endpoint}${route ? `/${route}` : ''}`
    let endpoint = this.modifyApiQueryEndpoint(uri, params)
    
    // Modifiy the endpoint if its a single object being called
    // from an ID. example {category}/{ID}
    // This is for the RMS API but needs to have a cleaner solution
    if (single) endpoint = `${uri}/${params.id}`
    
    let response = await fetch(endpoint, { ...this.headers, method })
    let result = await response.json()
    
    Console.message({
      type: 'log',
      title: 'Requested endpoint below',
      result: endpoint
    })
    Console.message({
      type: 'log',
      title: 'Endpoint responed with',
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
