interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * Zendesk MCP Pack — tickets, users, organizations via OAuth.
 */


interface ZendeskContext {
  zendesk?: { accessToken: string; subdomain?: string };
}

async function zdFetch(ctx: ZendeskContext, path: string) {
  if (!ctx.zendesk) {
    return { error: 'connection_required', message: 'Connect your Zendesk account at https://pipeworx.io/account' };
  }
  const subdomain = ctx.zendesk.subdomain ?? 'd3v-pipeworx';
  const res = await fetch(`https://${subdomain}.zendesk.com/api/v2${path}`, {
    headers: { Authorization: `Bearer ${ctx.zendesk.accessToken}`, 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zendesk API error (${res.status}): ${text}`);
  }
  return res.json();
}

const tools: McpToolExport['tools'] = [
  {
    name: 'zd_list_tickets',
    description: 'List recent Zendesk tickets.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        sort_by: { type: 'string', description: 'Sort field (created_at, updated_at, priority, status)' },
        page: { type: 'number', description: 'Page number' },
      },
    },
  },
  {
    name: 'zd_get_ticket',
    description: 'Get a Zendesk ticket by ID.',
    inputSchema: {
      type: 'object' as const,
      properties: { id: { type: 'number', description: 'Ticket ID' } },
      required: ['id'],
    },
  },
  {
    name: 'zd_search_tickets',
    description: 'Search Zendesk tickets with a query string.',
    inputSchema: {
      type: 'object' as const,
      properties: { query: { type: 'string', description: 'Search query (e.g., "status:open priority:high")' } },
      required: ['query'],
    },
  },
  {
    name: 'zd_list_users',
    description: 'List Zendesk users.',
    inputSchema: {
      type: 'object' as const,
      properties: { page: { type: 'number', description: 'Page number' } },
    },
  },
  {
    name: 'zd_get_user',
    description: 'Get a Zendesk user by ID.',
    inputSchema: {
      type: 'object' as const,
      properties: { id: { type: 'number', description: 'User ID' } },
      required: ['id'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const context = (args._context ?? {}) as ZendeskContext;
  delete args._context;

  switch (name) {
    case 'zd_list_tickets': {
      const params = new URLSearchParams();
      if (args.sort_by) params.set('sort_by', args.sort_by as string);
      if (args.page) params.set('page', String(args.page));
      return zdFetch(context, `/tickets.json?${params}`);
    }
    case 'zd_get_ticket':
      return zdFetch(context, `/tickets/${args.id}.json`);
    case 'zd_search_tickets':
      return zdFetch(context, `/search.json?query=${encodeURIComponent(args.query as string)}`);
    case 'zd_list_users': {
      const params = new URLSearchParams();
      if (args.page) params.set('page', String(args.page));
      return zdFetch(context, `/users.json?${params}`);
    }
    case 'zd_get_user':
      return zdFetch(context, `/users/${args.id}.json`);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 10 }, provider: 'zendesk' } satisfies McpToolExport;
