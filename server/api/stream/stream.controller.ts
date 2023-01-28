import { ObjectId } from 'bson';
import { RequestHandler } from 'express';
import { BadRequestError, NotFoundError } from 'express-response-errors';

import { getStreamInfo, endStream } from 'server/lib/ivs';
import { StartStreamResponse } from 'shared/http';

export const postStream: RequestHandler<void, StartStreamResponse> = async (req, res) => {
  const stream = await req.db.Streams.findOne();

  if (stream) {
    res.json({
      ingestEndpoint: stream.ingestEndpoint,
      streamKey: stream.streamKey,
      streamId: String(stream._id),
    });
  }
};

export const getStream: RequestHandler = async (req, res) => {
  const stream = await req.db.Streams.findOne({ _id: new ObjectId(req.params.id) });
  if (stream === null) {
    throw new NotFoundError('No stream found for provided id.');
  }
  const info = await getStreamInfo(stream.arn);
  res.json({ playbackUrl: info.channel.channel.playbackUrl });
};

export const getActiveStream: RequestHandler = async (req, res) => {
  const stream = await req.db.Streams.findOne();
  if (stream === null) {
    throw new NotFoundError('No stream found for provided id.');
  }
  res.json({ playbackUrl: stream.playbackUrl });
};

export const deleteStream: RequestHandler = async (req, res) => {
  const stream = await req.db.Streams.findOne({ createdBy: req.user.id });

  if (!stream) {
    throw new BadRequestError('There is no active stream');
  }

  await endStream(stream.arn);

  res.status(204);
};
