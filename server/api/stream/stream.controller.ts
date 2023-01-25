import { RequestHandler } from 'express';

import { startStream } from 'server/lib/ivs';

export const postStream: RequestHandler = async (req, res) => {
  const { channel, streamKey } = await startStream();
  res.json({
    ingestEndpoint: channel.ingestEndpoint,
    streamKey: streamKey.value,
  });
};

export const getStream: RequestHandler = (req, res) => {
  res.json({ message: 'This is a test!' });
};

export const deleteStream: RequestHandler = (req, res) => {
  res.json({ message: 'This is a test!' });
};
