/// <reference types="@cloudflare/workers-types" />

declare const CLIENT_BUNDLE: string;
declare const FAVICON_SVG: string;

const worker = {
  async fetch(request: Request) {
    try {
      const url = new URL(request.url);
      
      if (url.pathname === '/') {
        const html = `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Kitchenometry</title>
            <link rel="icon" type="image/svg+xml" href="/favicon.svg">
          </head>
          <body>
            <div id="root"></div>
            <script>${CLIENT_BUNDLE}</script>
          </body>
        </html>`;

        return new Response(html, {
          headers: { 'Content-Type': 'text/html;charset=UTF-8' },
        });
      }

      if (url.pathname === '/favicon.svg') {
        return new Response(FAVICON_SVG, {
          headers: { 'Content-Type': 'image/svg+xml' },
        });
      }

      return new Response('Not Found', { status: 404 });
    } catch (error) {
      console.error('Error in worker:', error);
      return new Response(
        `Server Error: ${error instanceof Error ? error.message : String(error)}`, 
        { status: 500 }
      );
    }
  }
};

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(worker.fetch(event.request))
});

export default worker;