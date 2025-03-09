//TTSPayload.js

import { fetchTTS, playAudioFile } from './TTS';

export async function textToSpeech(query) {
    const localUri = await fetchTTS(query, 'am_michael');
    if (localUri) {
      await playAudioFile(localUri);
    }
  }