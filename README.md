# mcp-zendesk

Zendesk MCP Pack — tickets, users, organizations via OAuth.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1476+ live data sources.

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

### What this endpoint actually serves

`tools/list` at `https://gateway.pipeworx.io/zendesk/mcp` returns the tools in the table
above **plus the shared Pipeworx meta-tools** — `ask_pipeworx`,
`discover_tools`, `search_within`, `remember`/`recall` and the rest of the
gateway-wide set. So the tool count you see is larger than this table: a
single-pack endpoint currently lists roughly 30 shared tools alongside the
pack's own. The connection's `initialize` response states its exact scope, and
is the authoritative answer for a given day.

This is deliberate, not multiplexing by accident. The meta-tools are what let a
scoped connection answer a question this pack does not cover — via
`ask_pipeworx`, which routes across the whole catalog — without you adding a
second MCP server. There is currently no way to mount a pack endpoint without
them; if the extra schemas cost you more context than the routing is worth,
connect to the full gateway once rather than to several pack endpoints.

Or connect to the full Pipeworx gateway to get every pack's tools listed
directly, instead of just this one's:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

Both URLs reach the same gateway and the same 1476+ data sources. The
only difference is which pack's tools are listed **directly**; `ask_pipeworx`
reaches all of them from either one.

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English —
this works on the pack endpoint above as well as on the full gateway:

```
ask_pipeworx({ question: "your question about Zendesk data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT

## No MCP client? Call it over HTTP

This pack runs against a connected zendesk account, so it needs a Pipeworx key: sign in at https://pipeworx.io/account, connect zendesk, then call `POST https://gateway.pipeworx.io/v1/tools/zd_list_tickets` with `Authorization: Bearer <your Pipeworx key>`. Inspect any tool: `GET https://gateway.pipeworx.io/v1/tools/zd_list_tickets`. Find one: `POST https://gateway.pipeworx.io/v1/tools/search_packs` with `{"query":"..."}`.
