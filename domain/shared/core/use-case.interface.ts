export default interface IUseCase<Request, Response> {
     execute: (request: Request) => Promise<Response>;
}

export { IUseCase };
