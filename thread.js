const { Worker, isMainThread, parentPort } = require('node:worker_threads');
const port=5000
if (isMainThread) {
  app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
     })
  const worker = new Worker(__filename);
  worker.once('message', (message) => {
    console.log(message);  // Prints 'Hello, world!'.
  });
  worker.postMessage('Hello, world!');
} else {
  // When a message from the parent thread is received, send it back:
  parentPort.once('message', (message) => {
    parentPort.postMessage(message);
  });
}