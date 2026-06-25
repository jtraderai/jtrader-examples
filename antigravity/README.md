# Antigravity Setup for JTrader MCP

[Antigravity](https://github.com/google/antigravity) (Agy) is an advanced agentic coding assistant that can utilize MCP servers to interact with external tools like JTrader.

## Setup Instructions

Antigravity natively supports lazily and eagerly loaded MCP tools through schemas defined in its internal configuration.

1. **Locate your MCP Configuration Root:**
   Depending on your setup, this is located at `C:\Users\<User>\.gemini\antigravity\mcp\`.

2. **Add the Server Configuration:**
   Inside the `mcp/` directory, create a folder named `jtrader`.
   Inside this `jtrader` folder, you can place the JSON schemas (`<toolName>.json`) for each of your JTrader MCP tools, alongside an optional `instructions.md` file that provides best practices for the agent on how to use them.

   By registering these schemas, Antigravity will automatically be aware of the JTrader tools and can call them via its `call_mcp_tool` command.

## Usage

When pairing with Antigravity, simply tell the agent to use JTrader. The agent will read the schemas and execute the tools directly.

**Example Prompt:**
> "Agy, use the JTrader MCP tools to analyze TSLA and implement a new signal handler in my `agent.py` based on the data."
