import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { convertWavToFloat32Base64 } from './WavUtils';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';

let recordingInstance = null;

// WAV recording options (iOS float32, Android may be 16-bit or produce 3GP/AAC)
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

/**
 * Converts a non-WAV file (e.g. 3GP/AAC) to raw Float32 PCM using FFmpeg.
 * Returns the output file URI of the converted raw PCM data.
 */
export async function convertToFloat32RawPCM(inputUri) {
  try {
    const inputPath = inputUri.replace(/^file:\/\//, '');
    const outputPath = FileSystem.documentDirectory + 'converted.raw';
    
    // The ffmpeg command converts input to raw float32 PCM at 44100 Hz.
    const command = `-i "${inputPath}" -f f32le -acodec pcm_f32le -ar 44100 "${outputPath}"`;
    console.log("Executing FFmpeg command:", command);

    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();

    if (ReturnCode.isSuccess(returnCode)) {
      console.log("FFmpeg conversion successful. Output file:", outputPath);
      return outputPath;
    } else {
      console.error("FFmpeg conversion failed with return code:", returnCode);
      const failStackTrace = await session.getFailStackTrace();
      console.error("FFmpeg fail stack trace:", failStackTrace);
      return null;
    }
  } catch (error) {
    console.error("Error during FFmpeg conversion:", error);
    return null;
  }
}

/**
 * Retrieves raw PCM (float32) data from the recorded file.
 * If the file does not have a valid WAV header (i.e. doesn't start with "RIFF"),
 * it uses FFmpeg to convert the file to raw float32 PCM.
 */
export async function getRawPCMFromWav(fileUri) {
  try {
    console.log("Getting raw PCM data from recorded file at:", fileUri);
    const fileBase64 = await fileToBase64(fileUri);
    if (!fileBase64) return null;

    const buffer = Buffer.from(fileBase64, 'base64');
    console.log("First 12 bytes as ASCII:", buffer.toString('ascii', 0, 12));
    console.log("First 12 bytes in hex:", buffer.slice(0, 12).toString('hex'));

    // Check if the file starts with "RIFF"
    if (buffer.toString('ascii', 0, 4) !== 'RIFF') {
      console.log("File is not a valid WAV (missing RIFF header). Initiating FFmpeg conversion...");
      const convertedUri = await convertToFloat32RawPCM(fileUri);
      if (!convertedUri) {
        console.log("FFmpeg conversion failed.");
        return null;
      }
      const rawBase64 = await FileSystem.readAsStringAsync(convertedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log("Converted raw PCM base64 extracted.");
      return rawBase64;
    } else {
      console.log("File is a valid WAV. Processing with WAV parser...");
      // Use WAV utility to extract float32 PCM (this works if file is already WAV)
      const float32Base64 = convertWavToFloat32Base64(fileBase64);
      return float32Base64;
    }
  } catch (error) {
    console.error("Error in getRawPCMFromWav:", error);
    return null;
  }
}
