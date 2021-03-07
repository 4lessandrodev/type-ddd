export interface IUseCase<Request, Response> {
  execute: (request: Request) => Promise<Response>;
}
