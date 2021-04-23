/**
 * @argument Request
 * @argument Response
 *
 * @param Dto as Request
 * @returns Response
 */
export default interface IUseCase<Request, Response> {
     /**
      * @param Dto: as request
      * @returns Promise<Response>
      */
     execute: (request: Request) => Promise<Response>;
}

export { IUseCase };
