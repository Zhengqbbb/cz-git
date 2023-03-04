export class APIError extends Error {
  public code: number

  constructor(message: string, code: number) {
    super(message)
    this.name = 'APIError'
    this.code = code
  }
}
