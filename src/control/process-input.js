import batch from 'batchflow';
import ProcessBody from '../control/event-context/process-body';
export default class ProcessInput {
    constructor(eventJobId, input, callback) {
        const resultInput = {};
        batch(input).sequential()
            .each((field, content, next) => {
                switch (field) {
                    case 'HEADER':
                    case 'header':
                        break;
                    case 'BODY':
                    case 'body':
                        new ProcessBody(eventJobId, context, (errBody, resultBody) => {
                            if (errBody) {
                                global.gdsLogger.logError(errBody);
                                callback(err);
                            } else {
                                resultInput.body = resultBody;
                                next();
                            }
                        });
                        break;
                    case 'PATH':
                    case 'path':
                        break;
                    case 'QUERY':
                    case 'query':
                        break;
                }
            }).end(() => {
                callback(undefined, resultInput);
            });
    }
}