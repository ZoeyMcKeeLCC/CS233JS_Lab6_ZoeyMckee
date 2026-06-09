export async function onRequest(context) {
  const { request, env } = context;

  // Strip the /api/web-service prefix: /api/web-service/search → https://api.web-service.com/search
  const url = new URL(request.url);
  url.pathname.replace('/api/web-service', '')
  const targetUrl = `https://api.jsonbin.io/v3/b/6a26050cf5f4af5e29c86e86`;

  try {
    return await fetch(targetUrl, {
      method: request.method,
      headers: {
            "X-Master-Key": env.SECRET_THIRD_PARTY_KEY,
          },
      body: request.method === 'GET'? undefined : await request.text(),
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}