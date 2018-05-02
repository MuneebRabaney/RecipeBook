import Console from '../console-debug'
import Api from './blueprint'

class Rms extends Api {
  // Default members
  static token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0NzQzODQ0MjYsImp0aSI6IjBVXC82eXg0Ykd6Y0RmTEZcL2xhTWxIeXZWSzhHVmVXUE12QUdWZnN2eTVIZz0iLCJpc3MiOiJsaXF1b3JpY2UtYXBpIiwibmJmIjoxNDc0Mzg0NDI2LCJleHAiOjE2MzIwNjQ0MjYsImRhdGEiOnsidHlwZSI6InN1YnNjcmliZXIiLCJpZCI6MX19.nnVF_ZMgymswctRFq7vyDb_HCAE1CAykQQ1HirZGAMFy4OLnFbinsVm5dTjbbTn_NkGAIirNil3KJ3HvJT2PaA'
  static endpoint = 'https://rms.knorrwhatsfordinner.co.za/api/v1'

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
  static async get(params, single = false) {
    return super.get(params, single)
  }

  /**
  * Performs a POST request
  * 
  * @route: String 
  * @params: Object
  *  
  * @return: Object
  **/
  static async post(params, single = false) {
    return super.post(params, single)
  }

}

export default Rms
