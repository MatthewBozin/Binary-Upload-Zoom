import IVSBroadcastClient, { AmazonIVSBroadcastClient} from 'amazon-ivs-web-broadcast';
import axios from 'axios';
import React from 'react';

import { StartStreamResponse } from 'shared/http';

async function handlePermissions() {
  let permissions = {
    audio: false,
    video: false,
  };
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});
    for (const track of stream.getTracks()) {
      track.stop();
    }
    permissions = { video: true, audio: true };
  } catch (err) {
    permissions = { video: true, audio: false };
    console.error(err.message);
  }
  // If we still don't have permissions after requesting them display the error message
  if (!permissions.video) {
    console.error('Failed to get video permissions.');
  } else if (!permissions.audio) {
    console.error('Failed to get audio permissions.');
  }
}

const Streamer: React.FC = () => {
  const [id, setId] = React.useState('none');
  //TODO: Save streamId for chatrooms
  const createStream = async () => {
    const response = await axios.post<StartStreamResponse>('/api/stream/');
    setId(response.data.streamId);
    // TODO: Save streamInfo to localhost for host to retrive their ongoing stream
    onStart(response.data);
  };
  const endStream = async () => {
    //stop broadcast
    clientRef.current?.delete();
    await axios.delete('/api/stream/');
    setId('none');
  };

  const clientRef = React.useRef<AmazonIVSBroadcastClient | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const onStart = async (response: StartStreamResponse) => {
    const streamConfig = IVSBroadcastClient.BASIC_LANDSCAPE;

    console.log(response.ingestEndpoint);

    clientRef.current = IVSBroadcastClient.create({
      // Enter the desired stream configuration
      streamConfig,
      // Enter the ingest endpoint from the AWS console or CreateChannel API
      ingestEndpoint: response.ingestEndpoint,
    });

    console.log(clientRef.current);
    await handlePermissions();

    clientRef.current.attachPreview(canvasRef.current!);

    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((d) => d.kind === 'videoinput');
    const audioDevices = devices.filter((d) => d.kind === 'audioinput');

    console.log(videoDevices, audioDevices);

    const cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: videoDevices[0].deviceId,
        width: {
          ideal: streamConfig.maxResolution.width,
          max: streamConfig.maxResolution.width,
        },
        height: {
          ideal: streamConfig.maxResolution.height,
          max: streamConfig.maxResolution.height,
        },
      },
    });
    const microphoneStream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: audioDevices[0].deviceId },
    });

    await clientRef.current.addVideoInputDevice(cameraStream, 'camera1', { index: 0 });
    await clientRef.current.addAudioInputDevice(microphoneStream, 'mic1');

    // this will probably live on the server?
    await clientRef.current.startBroadcast(response.streamKey);
    console.log('started broadcast');
  };

  return (
    <>
      <button onClick={createStream}>Stream</button>
      <canvas ref={canvasRef}></canvas>
      <button onClick={endStream}>End Stream</button>
      <div>Stream id: {id}</div>
    </>
  );
};

export default Streamer;

// Whitelist a user for host permission in Db
