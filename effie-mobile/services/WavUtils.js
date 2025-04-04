// WavUtils.js
import { Buffer } from 'buffer';

/**
 * Parse the standard 44-byte WAV header to extract key fields.
 * Returns an object with the format, number of channels, sample rate, bits per sample, etc.
 * This assumes no extra chunks and exactly 44 bytes before data starts.
 *
 * @param {Buffer} buffer - The full WAV file as a Node.js Buffer
 * @returns {object} - { audioFormat, numChannels, sampleRate, bitsPerSample, dataSize, dataOffset }
 */
export function parseWavHeader(buffer) {
  if (buffer.length < 44) {
    throw new Error("Buffer too short to contain a valid WAV header.");
  }

  // RIFF chunk descriptor
  const riff = buffer.toString('ascii', 0, 4);         // "RIFF"
  const fileSize = buffer.readUInt32LE(4);            // file size - 8
  const wave = buffer.toString('ascii', 8, 12);       // "WAVE"

  if (riff !== 'RIFF' || wave !== 'WAVE') {
    throw new Error("Invalid WAV file. Missing RIFF/WAVE header.");
  }

  // fmt sub-chunk
  const fmtChunkMarker = buffer.toString('ascii', 12, 16); // "fmt "
  const fmtChunkSize = buffer.readUInt32LE(16);           // usually 16 for PCM
  const audioFormat = buffer.readUInt16LE(20);            // 1 = PCM, 3 = IEEE float, etc.
  const numChannels = buffer.readUInt16LE(22);
  const sampleRate = buffer.readUInt32LE(24);
  const byteRate = buffer.readUInt32LE(28);
  const blockAlign = buffer.readUInt16LE(32);
  const bitsPerSample = buffer.readUInt16LE(34);

  // data sub-chunk
  const dataChunkMarker = buffer.toString('ascii', 36, 40); // "data"
  const dataSize = buffer.readUInt32LE(40);                 // num samples * blockAlign

  // Data offset typically starts at byte 44
  const dataOffset = 44;

  return {
    riff,
    fileSize,
    wave,
    fmtChunkMarker,
    fmtChunkSize,
    audioFormat,
    numChannels,
    sampleRate,
    byteRate,
    blockAlign,
    bitsPerSample,
    dataChunkMarker,
    dataSize,
    dataOffset,
  };
}

/**
 * Convert a WAV file (16-bit PCM or 32-bit float) to raw float32 base64.
 * If it's already 32-bit float, we simply strip the header.
 * If it's 16-bit PCM, we convert each sample to float32.
 *
 * @param {string} wavBase64 - The base64-encoded WAV file
 * @returns {string} - base64-encoded raw float32 PCM data (no header)
 */
export function convertWavToFloat32Base64(wavBase64) {
  const wavBuffer = Buffer.from(wavBase64, 'base64');

  // 1) Parse header
  const header = parseWavHeader(wavBuffer);

  console.log("WAV header info:", header);
  // Example logs:
  // audioFormat = 1 (PCM int), 3 (IEEE float)
  // bitsPerSample = 16 or 32
  // numChannels, sampleRate, etc.

  const { audioFormat, bitsPerSample, dataOffset, dataSize, numChannels } = header;
  if (numChannels !== 1) {
    console.warn("Currently only handling mono. If stereo, you'd need to adapt the logic.");
  }

  // 2) Extract the audio data portion
  const audioData = wavBuffer.slice(dataOffset, dataOffset + dataSize);

  let float32Array;
  // 3) Check if it's 16-bit int or 32-bit float
  if (audioFormat === 1 && bitsPerSample === 16) {
    // PCM 16-bit => convert to float32
    console.log("Detected 16-bit PCM. Converting to float32...");
    const sampleCount = audioData.length / 2; // 2 bytes per sample for mono
    float32Array = new Float32Array(sampleCount);

    for (let i = 0; i < sampleCount; i++) {
      const int16 = audioData.readInt16LE(i * 2);
      float32Array[i] = int16 / 32768; // scale int16 -> float32 in [-1, 1]
    }
  } else if (audioFormat === 3 && bitsPerSample === 32) {
    // 32-bit float => just strip header
    console.log("Detected 32-bit float PCM. Stripping header only...");
    // The data is already float32, so we just copy it into a Float32Array
    const sampleCount = audioData.length / 4;
    float32Array = new Float32Array(sampleCount);

    for (let i = 0; i < sampleCount; i++) {
      float32Array[i] = audioData.readFloatLE(i * 4);
    }
  } else {
    // Some other format (e.g. 24-bit PCM, compressed, etc.)
    throw new Error(`Unsupported WAV format: audioFormat=${audioFormat}, bitsPerSample=${bitsPerSample}`);
  }

  // 4) Convert the Float32Array to a base64 string
  const float32Buffer = Buffer.from(float32Array.buffer);
  const float32Base64 = float32Buffer.toString('base64');

  console.log("Final float32 data length in bytes:", float32Buffer.length);
  console.log("Returning float32 base64 string (length):", float32Base64.length);
  return float32Base64;
}
