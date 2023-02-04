import { ZoomMtg } from '@zoomus/websdk';
import axios from 'axios';
import React from 'react';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.7/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const Zoom: React.FC = () => {

  //replace with meeting number from zoom meeting
  const meetingNumber = 99999999999;

  //'passWord' field accepts either 'pwd' field from meeting link
  //or 'Passcode' from meeting invite
  //if this is left blank, will bring up a prompt for Passcode
  const passWord = '';

  const getSignature = async (e) => {
    console.log('getting signature');
    e.preventDefault();
    const msg = {
      meetingNumber,
      role: 0,
    };
    const response = await axios.post('/api/zoom', msg);
    await startMeeting(response.data.signature);
  };

  const startMeeting = async (signature) => {
    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: 'http://localhost:2121',
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber,
          userName: 'React',
          sdkKey: process.env.NEXT_PUBLIC_ZOOM_SDK_KEY,
          userEmail: '',
          passWord,
          tk: '',
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });

      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <button onClick={getSignature}>
        Zoom
      </button>
    </>
  );
};

export default Zoom;
