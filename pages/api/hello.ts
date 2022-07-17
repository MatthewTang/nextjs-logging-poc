// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const logger = require('pino')()


type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  logger.info('hello world')

  const child = logger.child({ a: 'property' })
  child.info('hello child!')
  res.status(200).json({ name: 'John Doe' })

}
