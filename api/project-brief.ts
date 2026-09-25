import { handleMailRequest } from '../src/server/mail/handler';

export default { fetch: (request: Request) => handleMailRequest(request, 'brief') };
