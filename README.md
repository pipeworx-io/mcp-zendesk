# mcp-zendesk

Zendesk MCP Pack — tickets, users, organizations via OAuth.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `zd_list_tickets` | List recent Zendesk tickets. |
| `zd_get_ticket` | Get a Zendesk ticket by ID. |
| `zd_search_tickets` | Search Zendesk tickets with a query string. |
| `zd_list_users` | List Zendesk users. |
| `zd_get_user` | Get a Zendesk user by ID. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "zendesk": {
      "url": "https://gateway.pipeworx.io/zendesk/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Zendesk data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
