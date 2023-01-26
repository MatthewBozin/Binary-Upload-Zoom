import { ObjectId } from 'bson';
import { RequestHandler } from 'express';
import { BadRequestError, NotFoundError } from 'express-response-errors';

import { getStreamInfo, endStream, startStream } from 'server/lib/ivs';

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

export const getStream: RequestHandler = async (req, res) => {
  const stream = await req.db.Streams.findOne({ _id: new ObjectId(req.params.id) });
  if (stream === null) {
    throw new NotFoundError('No stream found for provided id.');
  }
  const info = await getStreamInfo(stream.arn);
  res.json({ playbackUrl: info.channel.channel.playbackUrl });
};

export const deleteStream: RequestHandler = async (req, res) => {
  const stream = await req.db.Streams.findOne({ _id:  new ObjectId(req.params.id) });

  await endStream(stream.arn);
  await req.db.Streams.findOneAndDelete({ _id: new ObjectId(req.params.id) });

  res.status(204);
};
