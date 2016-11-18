import batch from 'batchflow';
import ProcessBody from '../control/event-context/process-body';
export default class ProcessInput {
  constructor(eventJobId, input, callback) {
    try {
      const resultInput = {};
      batch(input).sequential()
        .each((field, content, next) => {
          switch (field) {
            case 'HEADER':
            case 'header':
              break;
            case 'BODY':
            case 'body':
              new ProcessBody(eventJobId, content, (errBody, resultBody) => {
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
    } catch (error) {
      global.gdsLogger.logError(error);
      callback({
        message: 'Failed processing input'
      });
    }

  }
}