import { RequestHandler } from 'express';

import { startStream } from 'server/lib/ivs';

export const postStream: RequestHandler = async (req, res) => {
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
