export async function onRequest(event) {
    const url = "https://worker.apd.xstar97thenoob.com";

    try {
        const response = await fetch(url);
        const data = await response.text();
        
        // You can modify the response as needed, for example, setting a specific content type.
        const headers = {
            "Content-Type": "text/plain",
        };

        return new Response(data, { headers });
    } catch (error) {
        return new Response("Error fetching data from the URL", { status: 500 });
    }
}
