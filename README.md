# mcp-zendesk

Zendesk MCP Pack — tickets, users, organizations via OAuth.

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `zd_list_tickets` | List recent Zendesk tickets. |
| `zd_get_ticket` | Get a Zendesk ticket by ID. |
| `zd_search_tickets` | Search Zendesk tickets with a query string. |
| `zd_list_users` | List Zendesk users. |
| `zd_get_user` | Get a Zendesk user by ID. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "zendesk": {
      "url": "https://gateway.pipeworx.io/zendesk/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use zendesk
```

## License

MIT
