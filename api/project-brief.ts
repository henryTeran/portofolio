import { handleMailRequest } from '../src/server/mail/handler.js';

export default { fetch: (request: Request) => handleMailRequest(request, 'brief') };
