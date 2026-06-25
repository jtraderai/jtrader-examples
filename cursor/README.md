# Cursor IDE Setup for JTrader MCP

Cursor provides built-in support for the Model Context Protocol (MCP), allowing you to seamlessly integrate JTrader's tools into your AI IDE workflows. 

You can configure the MCP server in Cursor via the graphical Settings interface, or through a JSON configuration file.

## Method 1: Settings UI (Recommended)

1. Open Cursor Settings (Command Palette `Cmd/Ctrl + Shift + P` or click the gear icon).
2. Navigate to **Features** -> **MCP Servers**.
3. Click the **+ Add New MCP Server** button.
4. Fill out the configuration fields:
   * **Name:** `jtrader`
   * **Type:** `command`
   * **Command:** `npx -y @jtraderai/jtrader-mcp-server`
5. Click **Save**.
6. Ensure the green indicator dot appears next to the `jtrader` server, showing it has connected successfully.

## Method 2: mcp.json Configuration File

You can also define the MCP server using an `mcp.json` file. This allows you to configure it globally for all projects, or locally for a specific workspace.

1. Open or create the appropriate `mcp.json` file:
   * **Global Scope:** `~/.cursor/mcp.json`
   * **Project Scope:** `.cursor/mcp.json` (at the root of your current project workspace)
2. Add the following JSON structure:

```json
{
  "mcpServers": {
    "jtrader": {
      "command": "npx",
      "args": [
        "-y",
        "@jtraderai/jtrader-mcp-server"
      ],
      "env": {
        "JTRADER_API_KEY": "your_api_key_here_if_needed"
      }
    }
  }
}
```

## Usage

In Cursor's Chat (`Cmd/Ctrl + L`) or Composer (`Cmd/Ctrl + I`), the model will automatically be aware of your tools if the MCP server is running. You can explicitly ask Cursor to use them.

**Example Prompt:**
> "Please use the JTrader MCP to fetch the latest research report for MSFT and update my trading strategy script accordingly."
