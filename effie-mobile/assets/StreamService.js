
/*
 // if you need Blob constructor
// or just rely on the built-in fetch blob() in modern React Native


 
Sends a POST request and reads the response as a Blob, then as text.
If you only need the full text, you won't get chunk streaming, but
this stays compatible with Expo's managed workflow.
*/
export async function getChunkedResponse(question, history, onComplete) {
  try {
    const payload = {
      history: history.length > 0 ? history : [{ role: "user", content: question }],
      question,
      client_code: "CLIENT_CODE",
      domain_name: "DOMAIN_NAME",
    };
    console.log("Payload being sent:", JSON.stringify(payload, null, 2));

    const response = await fetch('https://diosol.com/ml/effie-mistral/chat_gguf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });


    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const blobData = await response.blob();

    // Convert the Blob to text via a Response wrapper
    const textData = await new Response(blobData).text();
    
    // Then do something with textData
    onComplete(textData);

  } catch (err) {
    console.error('Error fetching data:', err);
  }
}


