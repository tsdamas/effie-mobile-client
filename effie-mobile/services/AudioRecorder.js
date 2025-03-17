// AudioRecorder.js
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

let recordingInstance = null;

/**
 * Start recording audio
 * Returns true if recording started, false otherwise.
 */
export async function startRecording() {
    try {
        // Request microphone permissions
        const { status } = await Audio.requestPermissionsAsync();
        console.log("Mic access granted.");
        if (status !== 'granted') {
            console.log('Microphone permission not granted');
            return false;
        }

        //Prepare to start recording
        await Audio.setAudioModeAsync({ allowsRecordingIOS: true });
        recordingInstance = new Audio.Recording();
        await recordingInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recordingInstance.startAsync();
        console.log('Recording started. AR.');
        return true;
    } catch (error) {
        console.error('Failed to start recording:', error);
        return false;
    }
}

/**
 * Stop recording
 * Returns null if something goes wrong
 */
export async function stopRecording() {
    try {
        if (!recordingInstance) {
            console.log('No recording instance to stop');
            return null;
        }
        await recordingInstance.stopAndUnloadAsync();
        const uri = recordingInstance.getURI();
        console.log('Recording stopped, file stored at:', uri);
        return uri;
    } catch (error) {
        console.error('Failed to stop recording:', error);
        return null;
    }
}

/**
 * Convert file to a base64 string
 */
export async function fileToBase64(fileUri) {
    try {
        const base64String = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return base64String;
    } catch (error) {
        console.error('Error reading file as base64:', error);
        return null;
    }
}

export async function convertM4AToWav(inputUri, outputUri) {
    try {
        const inputPath = inputUri.replace(/^file:\/\//, '');
        const outputPath = outputUri.replace(/^file:\/\//, '');

        console.log("Clean inputPath:", inputPath);
        console.log("Clean outputPath:", outputPath);

        const command = `-i "${inputPath}" -acodec pcm_f32le -ar 44100 "${outputPath}"`;
        const session = await FFmpegKit.execute(command);

        if (!session) {
            throw new Error("FFmpeg session returned null");
        }

        const returnCode = await session.getReturnCode();
        if (ReturnCode.isSuccess(returnCode)) {
            console.log("Conversion successful:", outputPath);
            return outputUri;
        } else {
            console.error("Conversion failed with return code:", returnCode);
            const failStackTrace = await session.getFailStackTrace();
            console.error("FFmpeg fail trace:", failStackTrace);
            return null;
        }
    } catch (error) {
        console.error("Error converting to WAV:", error);
        return null;
    }
}
