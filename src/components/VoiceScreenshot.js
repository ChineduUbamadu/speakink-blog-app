import { useEffect } from 'react';
import html2canvas from 'html2canvas';

const VoiceScreenshot = () => {
  useEffect(() => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();

    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.trim().toLowerCase();

      console.log('Voice Command:', command);

      if (command === 'ink') {
        takeScreenshot();
      }
    };

    recognition.onerror = function (event) {
      console.error('Speech recognition error', event.error);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, []);

  const takeScreenshot = () => {
    const content = document.body;
    html2canvas(content).then(canvas => {
      const link = document.createElement('a');
      link.download = `screenshot-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return null;
};

export default VoiceScreenshot;
