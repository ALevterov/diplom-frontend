interface IErrorBig {
  response: {
    data: {
      message: string
    }
  }
}
interface IErrorSmall {
  message: string
}

export type IError = IErrorBig | IErrorSmall
