export async function onRequest(event) {
    const apiUrl = "https://worker.apd.xstar97thenoob.com";
    const url = new URL(apiUrl);

    // Get date from the query parameter
    const urlParams = new URLSearchParams(event.request.url);
    const requestedDate = urlParams.get('date');

    // Append date to the URL if available
    if (requestedDate) {
        url.searchParams.set('date', requestedDate);
    }

    try {
        const response = await fetch(url.toString());
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
