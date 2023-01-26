import { RequestHandler } from 'express';
import { BadRequestError } from 'express-response-errors';

import { startStream } from 'server/lib/ivs';

export const postStream: RequestHandler = async (req, res) => {
  const existing = await req.db.Streams.findOne({
    createdBy: req.user.id,
  });

  if (existing) {
    throw new BadRequestError('You already have a stream running');
  }

  const { channel, streamKey } = await startStream();

  //object returned contains insertedId param, consumed below
  const stream = await req.db.Streams.insertOne({
    arn: channel.arn,
    createdBy: req.user.id,
  });

  res.json({
    ingestEndpoint: channel.ingestEndpoint,
    streamKey: streamKey.value,
    streamId: stream.insertedId,
  });
};

export const getStream: RequestHandler = (req, res) => {
  res.json({ message: 'This is a test!' });
};

export const deleteStream: RequestHandler = (req, res) => {
  res.json({ message: 'This is a test!' });
};
