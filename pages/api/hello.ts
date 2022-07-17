// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import logger from '../../logger/logger'

const onlypino = require('pino')()


type Data = {
  name: string
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

  logger.info(data, "Handled response. Logged with pino-logflare.")


  //const child = onlypino.child({ a: 'property' })
  // child.info('hello child!')
  res.status(200).json({ name: 'John Doe' })

}
