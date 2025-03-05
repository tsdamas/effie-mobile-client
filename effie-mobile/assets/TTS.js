// TTS.js
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

// 1) Send TTS request, get WAV bytes, save locally, return local URI
export async function fetchTTS(query, voice) {
    try {
        const TTS_URL = ''; //replace with actual endpoint

        const response = await fetch(TTS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, voice }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`TTS request failed: ${response.status}, ${errorText}`);
        }

        //debugging messages, comment them out
        //console.log('TTS Content-Type:', response.headers.get('Content-Type'));

        const fullPath = await response.json();
        //console.log('TTS JSON data (string path):', fullPath);
        if (!fullPath) {
            throw new Error('No audioPath in TTS response.');
        }

        //get substring of path
        const startIndex = fullPath.indexOf('/tts_audio_files/');
        if (startIndex === -1) {
            throw new Error('Path does not contain /tts_audio_files/.');
        }

        const filePath = fullPath.substring(startIndex);
        if (!filePath) {
            throw new Error('No audioPath in TTS response.');
        }

        //replace with server URL
        const remoteUrl = ' ' + filePath;

        //downloading URI
        const localUri = FileSystem.documentDirectory + 'ttsOutput.wav';
        const { uri } = await FileSystem.downloadAsync(remoteUrl, localUri);
        //console.log('Downloaded WAV to:', uri);

        return uri;

    } catch (error) {
        console.error('Error fetching TTS:', error);
        return null;
    }
}

// 2) Play the local WAV file with expo-av
export async function playAudioFile(fileUri) {
    const sound = new Audio.Sound();
    try {
        await sound.loadAsync({ uri: fileUri });
        await sound.playAsync();
    } catch (error) {
        console.error('Error playing audio file:', error);
    }
}
