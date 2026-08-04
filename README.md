# mcp-zendesk

Zendesk MCP Pack — tickets, users, organizations via OAuth.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `zd_list_tickets` | List Zendesk support tickets for the connected account, sortable by created_at, updated_at, priority, or status. Returns ticket IDs, subjects, statuses, and metadata. Supports pagination via page. |
| `zd_get_ticket` | Get a Zendesk ticket by ID. |
| `zd_search_tickets` | Search Zendesk tickets with a query string. |
| `zd_list_users` | List all Zendesk users (agents and end-users) in the connected account. Returns user IDs, names, emails, and roles. Supports pagination via page number. |
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

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

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

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
