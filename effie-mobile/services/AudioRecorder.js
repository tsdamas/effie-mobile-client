// AudioRecorder.js
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer'; // if needed
import { convertWavToFloat32Base64 } from './WavUtils'; // <-- Import the new function

let recordingInstance = null;

// WAV recording options (iOS float32, Android may be 16-bit)
const recordingOptions = {
  android: {
    extension: '.wav',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 32,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: true,
  },
};

export async function startRecording() {
  try {
    console.log("Requesting microphone permissions...");
    const { status } = await Audio.requestPermissionsAsync();
    console.log("Microphone permission status:", status);
    if (status !== 'granted') {
      console.log('Microphone permission not granted');
      return false;
    }
    console.log("Setting audio mode for recording...");
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true });

    recordingInstance = new Audio.Recording();
    console.log("Preparing recording instance with custom options...");
    await recordingInstance.prepareToRecordAsync(recordingOptions);
    console.log("Starting recording...");
    await recordingInstance.startAsync();
    console.log("Recording started successfully.");
    return true;
  } catch (error) {
    console.error('Failed to start recording:', error);
    return false;
  }
}

export async function stopRecording() {
  try {
    if (!recordingInstance) {
      console.log('No recording instance to stop');
      return null;
    }
    console.log("Stopping recording...");
    await recordingInstance.stopAndUnloadAsync();
    const uri = recordingInstance.getURI();
    console.log('Recording stopped. File stored at:', uri);
    return uri;
  } catch (error) {
    console.error('Failed to stop recording:', error);
    return null;
  }
}

export async function fileToBase64(fileUri) {
  try {
    console.log("Converting file to base64. File URI:", fileUri);
    const base64String = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log("Conversion to base64 successful.");
    return base64String;
  } catch (error) {
    console.error('Error reading file as base64:', error);
    return null;
  }
}

// Remove or comment out stripWavHeader, since we now have a more robust approach:
// export function stripWavHeader(base64String) { ... }

// Updated getRawPCMFromWav:
export async function getRawPCMFromWav(fileUri) {
  try {
    console.log("Getting raw PCM data from WAV file at:", fileUri);
    const wavBase64 = await fileToBase64(fileUri);

    const buffer = Buffer.from(wavBase64, 'base64');
    console.log("First 12 bytes as ASCII:", buffer.toString('ascii', 0, 12));
    console.log("First 12 bytes in hex:", buffer.slice(0, 12).toString('hex'));

    if (!wavBase64) return null;

    // Use the new convertWavToFloat32Base64 function
    const float32Base64 = convertWavToFloat32Base64(wavBase64);
    return float32Base64;
  } catch (error) {
    console.error("Error getting raw PCM from WAV:", error);
    return null;
  }
}
