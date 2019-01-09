import { ApplicationMessage, ErrorInterpreter } from 'error'

class HttpErrorInterpreter extends ErrorInterpreter {
  interpret(error) {
    return new ApplicationMessage()
  }
}

export { HttpErrorInterpreter }
