class ApplicationError extends Error {
  constructor(message) {
    super(message)
    this.name = ApplicationError.name
  }
}

class ApplicationMessage {}

class ErrorProcessor {
  /**
   * 唯一实例
   */
  static #instance
  /**
   * 异常解释器
   * @type {{}}
   */
  interpreters = {}
  constructor() {
    if (!ErrorProcessor.#instance) ErrorProcessor.#instance = this
    return ErrorProcessor.#instance
  }

  /**
   * 处理异常
   */
  process(name, error) {
    return this.interpreter(name).interpret(error)
  }

  /**
   * 获取异常解释器
   * @param name 名称
   * @return {*} 异常解释器
   */
  interpreter(name) {
    return this.interpreters[name]
  }

  /**
   * 注册异常解释器
   * @param name 名称
   * @param interpreter 解释器
   * @return {boolean}
   */
  registerInterpreter(name, interpreter) {
    if (!(interpreter instanceof ErrorInterpreter)) { throw new ApplicationError('解释器必须继承：' + ErrorInterpreter.name) }
    if (Object.keys(this.interpreters).includes(interpreter)) return false
    this.interpreters.push(interpreter)
  }
}

/**
 * 异常解释器
 */
class ErrorInterpreter {
  interpret() {}
}

export { ApplicationError, ApplicationMessage, ErrorProcessor }
