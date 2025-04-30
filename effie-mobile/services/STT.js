// // STT.js
// /**
//  * Sends a POST request to your STT API with base64 audio and returns the transcribed text.
//  * @param {string} base64Audio - The base64-encoded audio data
//  * @param {number} samplingRate - The audio sampling rate; 44100
//  * @returns {string|null} - The transcribed text
//  */
// export async function sendToSTTApi(base64Audio, samplingRate = 44100) {
//     const payload = {
//         base64_str: base64Audio,
//         sampling_rate: samplingRate,
//     };

//     console.log('Sending payload to STT API:', payload);

//     try {
//         const response = await fetch('https://diosol.com/ml/speech_recognition', {// Replace with actual endpoint
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload),
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
//         }
//         //testing api response
//         const rawResponse = await response.text();
//         console.log('Raw STT API response:', rawResponse);
//         const result = JSON.parse(rawResponse);
//         console.log('Parsed STT API result:', result);

//         // Adjust if API returns a different field for the transcript
//         return result.transcript || null;
//     } catch (error) {
//         console.error('Error sending to STT API:', error);
//         return null;
//     }
// }
// STT.js
import * as FileSystem from 'expo-file-system';
import { FFmpegKit } from 'ffmpeg-kit-react-native';

/**
 * Converts a recorded WAV file to raw Float32 PCM and returns its base64.
 * @param {string} fileUri - The URI of the recorded audio file.
 * @returns {Promise<string>} - Base64-encoded Float32 PCM audio.
 */
async function convertWavToFloat32Base64(fileUri) {
    console.log('Starting conversion to Float32 PCM...');

    const inputPath = fileUri.replace('file://', '');
    const outputPath = `${FileSystem.documentDirectory}converted.raw`;

    const ffmpegCommand = `-y -i "${inputPath}" -f f32le -acodec pcm_f32le -ar 44100 "${outputPath.replace('file://', '')}"`;
    console.log('Running FFmpeg command:', ffmpegCommand);

    await FFmpegKit.execute(ffmpegCommand); // don't trust returnCode anymore

    // Now, check if the output file actually exists
    const fileInfo = await FileSystem.getInfoAsync(outputPath);
    if (!fileInfo.exists) {
        throw new Error('FFmpeg conversion failed: output file not found.');
    }

    console.log('FFmpeg conversion successful. Reading converted file...');
    const base64 = await FileSystem.readAsStringAsync(outputPath, {
        encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
}


/**
 * Sends a POST request to your STT API with base64 audio and returns the transcribed text.
 * @param {string} fileUri - The URI of the recorded audio file.
 * @param {number} samplingRate - The audio sampling rate; 44100
 * @returns {Promise<string|null>} - The transcribed text
 */
export async function sendToSTTApi(fileUri, samplingRate = 44100) {
    try {
        // Optional: inspect first few bytes to validate format
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        console.log('Recorded file info:', fileInfo);

        if (!fileInfo.exists) {
            throw new Error('Recorded file does not exist.');
        }

        // Directly attempt conversion (safe even if already good)
        const base64Audio = await convertWavToFloat32Base64(fileUri);

        const payload = {
            base64_str: base64Audio,
            sampling_rate: samplingRate,
        };

        console.log('Sending payload to STT API...');

        const response = await fetch('https://diosol.com/ml/speech_recognition', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }
        console.log("The response from the api is ", response);

        const rawResponse = await response.text();
        console.log('Raw STT API response:', rawResponse);
        
        // Directly use the raw text
        const transcript = rawResponse.trim().replace(/^"+|"+$/g, '');

        return transcript || null;
    } catch (error) {
        console.error('Error sending to STT API:', error);
        return null;
    }
}
