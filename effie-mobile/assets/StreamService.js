
export async function getChunkedResponse(question, history, onComplete) {
    try {
        const payload = {
            history: history.length > 0 ? history : [{ role: "user", content: question }],
            question,
            client_code: " ", //INSERT CODE
            domain_name: " ", //INSERT NAME
        };
        //console.log("Payload being sent:", JSON.stringify(payload, null, 2));

        const response = await fetch('', { //INSERT URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }

        const textData = await response.text();
        onComplete(textData);

    } catch (err) {
        console.error('Error fetching data:', err);
    }
}


