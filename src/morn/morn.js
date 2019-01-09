export class ApplicationException extends Error {}

export class ApplicationMessage {}

export class ExceptionProcessor {
  interpreters = [];
  interpreter(interpreter) {
    if (!(interpreter instanceof ExceptionInterpreter)) { throw new Error('') }
    if (this.interpreters.includes(interpreter)) return false
    this.interpreters.push(interpreter)
  }
}

export class ExceptionInterpreter {}
