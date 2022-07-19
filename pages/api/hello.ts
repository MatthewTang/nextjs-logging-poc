//

import { NextApiRequest, NextApiResponse } from "next"

// using pino-stackdriver
const stackdriver = require('pino-stackdriver')
const pinoms = require('pino-multi-stream')
// create the stackdriver destination stream
const credentials = {
  "private_key": process.env.GCP_PRIVATE_KEY_STRING!.replace(/\\n/g, '\n'),
  "client_email": process.env.GCP_CLIENT_EMAIL!,
}
const projectId = 'test-202116'
const writeStream = stackdriver.createWriteStream({ credentials, projectId })
// create pino loggger
const logger = pinoms({ streams: [{ stream: writeStream }] })



// using pinco/ pinco-logflare
// log some events logger.info('Informational message')
//logger.error(new Error('things got bad'), 'error message')
import logflarelogger from '../../logger/logger'
const onlypino = require('pino')()


type Data = {
  name: string
}



// using gc client lib directly to call logging api
// Imports the Google Cloud client library
const { Logging } = require('@google-cloud/logging');

async function quickstart(
  projectId = 'test-202116', // Your Google Cloud Platform project ID
  logName = 'my-log' // The name of the log to write to
) {
  // Creates a client
  const keyFilename = './test-202116-6925c5c8412f.json';
  const logging = new Logging({ projectId, keyFilename });

  // Selects the log to write to
  const log = logging.log(logName);

  // The data to write to the log
  const text = 'Hello, world!';

  // The metadata associated with the entry
  const metadata = {
    resource: { type: 'global' },
    // See: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
    severity: 'INFO',
  };

  // Prepares a log entry
  const entry = log.entry(metadata, text);

  async function writeLog() {
    // Writes the log entry
    await log.write(entry);
    console.log(`Logged: ${text}`);
  }
  writeLog();
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  //onlypino.info('hello world')


  const data = {
    request: {
      method: req.method,
      url: req.url,
      data: req.body,
    },
    response: {
      status: res.statusCode
    }
  }

  //const data = {
  //  hi: "hello world",
  //}

  // Logging to pino-logflare

  logger.info(data, "Handled response. Logged with pino-stackdriver")
  //console.log(credentials);
  logflarelogger.info(credentials, "logflare");
  onlypino.info(credentials, "only pino")
  //logger.info("hello");
  //console.log(data);
  //quickstart();

  const child = logger.child({ a: 'property' })
  child.info('hello child!')
  res.status(200).json({ name: 'John Doe' })

}
