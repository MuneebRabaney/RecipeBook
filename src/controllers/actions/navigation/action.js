// Action Types
class NavigationAction {
  static OPEN = 'OPEN'
  static CLOSE = 'CLOSE'

  static open() {
    return {
      type: this.OPEN
    }
  }

  static close() {
    return {
      type: this.CLOSE
    }
  }

  static toggle({ active }) {
    return active ? this.open() : this.close()
  }
}

export default NavigationAction
