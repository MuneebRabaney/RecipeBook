/**
 * Class used for debugging purposes,
 * basically console logs with some
 * sugar
 *
 * @constructor null
 * @return mixed
*/
class Console {

  /**
   * Performs simple log results in the console
   *
   * @arg type:String 
   * @arg title:String 
   * @arg result:Mixed 
   * 
   * @return mixed
  */
  static message({ type, title, result }) {
    switch (type) {
      case 'log':
        return console.log(`\n${title}\n\n`, result, '\n\n')  
      case 'error':
        return console.error(`\n${title}\n\n`, result, '\n\n')
      case 'warning':
        return console.warning(`\n${title}\n\n`, result, '\n\n')
      default:
        throw new Error('Please supply a valid log type, below is a list of avaliable types: \n - log \n - error \n - warning')
    }
    
  }

}


export default Console