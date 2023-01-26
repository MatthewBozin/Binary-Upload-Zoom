import { RequestHandler } from 'express';
import { NotFoundError } from 'express-response-errors';

import { getStreamInfo, startStream } from 'server/lib/ivs';

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

export const getStream: RequestHandler = async (req, res) => {
  try {
    const stream = await req.db.Streams.findOne({ _id: req.params.id });
    if (stream === null) {
      throw new NotFoundError('No stream found for provided id.');
    }
    const info = await getStreamInfo(stream.arn);
    res.json({ playbackUrl: info.channel.channel.playbackUrl });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteStream: RequestHandler = (req, res) => {
  res.json({ message: 'This is a test!' });
};
