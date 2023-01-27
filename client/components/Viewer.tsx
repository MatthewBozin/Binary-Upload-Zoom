import * as IVSPlayer from 'amazon-ivs-player';
import wasmWorkerPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js';
import wasmBinaryPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm';
import axios from 'axios';
import React from 'react';

const Viewer: React.FC = () => {
  const outputRef = React.useRef<HTMLVideoElement | null>(null);
  console.log(IVSPlayer);

  const joinBroadcast = async () => {
    if (IVSPlayer.isPlayerSupported) {
      const response = await axios.get('/api/stream/stream');
      const player = IVSPlayer.create({
        wasmBinary: '/assets/amazon-ivs-wasmworker.min.wasm',
        wasmWorker: '/assets/amazon-ivs-wasmworker.min.js',
      });

      player.attachHTMLVideoElement(outputRef.current!);
      player.load(response.data.playbackUrl);
      player.play();
      console.log('called play');
    }
  };

  return (
    <div>
      <button onClick={joinBroadcast}>Join</button>
      <video ref={outputRef}></video>
    </div>
  );
};

export default Viewer;
