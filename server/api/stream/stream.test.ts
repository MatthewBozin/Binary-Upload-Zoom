import { CreateChannelCommandOutput } from '@aws-sdk/client-ivs';

import * as ivsLib from 'server/lib/ivs';
import TestServer from 'server/test/server';
import { User } from 'shared/user';

describe('stream router', () => {
  let server: TestServer;

  //simulating two users with different perms
  const host: User = {
    id: '123',
    username: 'host#123',
  };
  const viewer: User = {
    id: '456',
    username: 'viewer#123',
  };

  const mockedStartStreamResponse = {
    channel: {
      arn: 'arn_123',
      ingestEndpoint: 'stream.com',
    },
    streamKey: { value: 'sk_123' },
  } as CreateChannelCommandOutput;

  beforeAll(async () => {
    server = new TestServer();
    await server.init('stream-api');
    //making sure there is a host in the db
    //since there is middleware checking if there is a host
    await server.db.AllowedHosts.insertOne({
      discordId: host.id,
      username: host.username,
    });

    //hijacks startStream method in ivslib
    //and returns mockResolvedValue when it is called
    jest.spyOn(ivsLib, 'startStream').mockResolvedValue(mockedStartStreamResponse);
  });

  afterAll(async () => {
    await server.destroy();
    //resets mocks once done, because test suites should be independent
    jest.restoreAllMocks();
  });

  describe('POST /', () => {
    it('should error if not logged in', async () => {
      server.logout();
      const res = await server.exec.post('/api/stream/');
      expect(res.status).toBe(401);
    });

    it('should error if the user is not a host', async () => {
      server.login(viewer);
      const res = await server.exec.post('/api/stream/');
      expect(res.status).toBe(403);
    });

    it('should return the created channel arn, stream key, and create a db entry', async () => {
      server.login(host);
      const res = await server.exec.post('/api/stream/');

      expect(res.status).toBe(200);
      expect(res.body.ingestEndpoint).toBe(mockedStartStreamResponse.channel.ingestEndpoint);
      expect(res.body.streamKey).toBe(mockedStartStreamResponse.streamKey.value);

      const stream = await server.db.Streams.findOne({ createdBy: host.id });

      expect(res.body.streamId).toEqual(String(stream._id));
    });
  });
});
