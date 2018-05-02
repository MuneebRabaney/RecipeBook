import Console from '../console-debug'
import Api from './blueprint'

class Themosis extends Api {
  
  static endpoint = 'http://themosis.sandbox.local/cms/wp-admin/admin-ajax.php'
  
  constructor() {
    super()
  }

  /**
  * sets a Getter for the headers 
  * neerded by the API
  *  
  * @return: Object
  **/
  static get headers() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
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
  static async get(params) {
    return super.get(params)
  }

  /**
  * Performs a POST request
  * 
  * @route: String 
  * @params: Object
  *  
  * @return: Object
  **/
  static async post(params) {
    return super.post(params)
  }

}

export default Themosis
