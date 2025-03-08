// STT.js
/**
 * Sends a POST request to your STT API with base64 audio and returns the transcribed text.
 * @param {string} base64Audio - The base64-encoded audio data
 * @param {number} samplingRate - The audio sampling rate; 44100
 * @returns {string|null} - The transcribed text
 */
export async function sendToSTTApi(base64Audio, samplingRate = 44100) {
    const payload = {
        base64_str: base64Audio,
        sampling_rate: samplingRate,
    };

    //console.log('Sending payload to STT API:', payload);

    try {
        const response = await fetch('https://diosol.com/ml/speech_recognition', {// Replace with actual endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }
        //testing api response
        const rawResponse = await response.text();
        console.log('Raw STT API response:', rawResponse);
        const result = JSON.parse(rawResponse);
        console.log('Parsed STT API result:', result);
        //const result2 = await response.json();
        //console.log('result 2', result2);

        // Adjust if API returns a different field for the transcript
        return result.transcript || null;
    } catch (error) {
        console.error('Error sending to STT API:', error);
        return null;
    }
}
