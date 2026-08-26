# AyushWorks authentication

AyushWorks (ayushworks.com) is the public portfolio of Ayush Singh (shydev). No API key, OAuth token, cookie, or login is required to read the site or call its machine interfaces.

## Discover

- Developer portal: https://ayushworks.com/developers
- OpenAPI spec: https://ayushworks.com/openapi.json
- MCP server: https://ayushworks.com/mcp
- MCP manifest: https://ayushworks.com/.well-known/mcp.json

## Pick a method

There is only one method: anonymous HTTPS. Send GET for documents and POST JSON-RPC for the MCP server. Do not send an Authorization header.

## Register

Nothing to register. There is no client-id, no developer dashboard, and no paid plan.

## Claim

No credential is issued. Skip this step.

## Use the credential

Call the public URLs directly:

```
curl -H "Accept: text/markdown" https://ayushworks.com/
curl -X POST https://ayushworks.com/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"example","version":"1"}}}'
```

## Errors

JSON-RPC errors from `/mcp` use `{ "jsonrpc": "2.0", "error": { "code", "message" } }`. Unknown pages return HTTP 404. Unsupported Accept values on HTML routes return HTTP 406.

## Revocation

There are no tokens to revoke.

Brand: AyushWorks. Person: Ayush Singh. Email: ayush1337@hotmail.com. Location: India.
