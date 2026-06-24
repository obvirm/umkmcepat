# Graphify

Graphify is an optional local codebase map for contributors and AI agents. It is recommended for non-trivial work, but it is not required to install or run the app.

Use it to discover existing modules, reusable components, and relationships before adding new code.

## Install

Graphify is installed as a user-local tool, not as a project dependency:

```bash
uv tool install graphifyy
```

Do not add Graphify to `package.json` dependencies.

## Build the local graph

From the project root:

```bash
bun run setup:agent
```

This writes local artifacts to:

```text
graphify-out/
├── graph.html
├── GRAPH_TREE.html
├── GRAPH_REPORT.md
└── graph.json
```

`graphify-out/` is ignored by git and must not be committed.

## Update after meaningful changes

Run this after broad refactors or changes to architecture, project generation, preview, providers, auth, database schema, or reusable components:

```bash
bun run graph:update
```

For small one-file fixes, Graphify is usually not needed.

## Query the graph

Examples:

```bash
graphify query "where is project generation connected to preview?"
graphify explain "WorkspaceShell"
graphify path "Project" "buildGeneratedProject"
```

Recommended agent flow for non-trivial tasks:

1. Query Graphify for existing modules/components/helpers.
2. Read the specific files returned by the graph.
3. Reuse or extend existing code when it fits.
4. Add new abstractions only after a real second use case appears.

## Default scope

The default project Graphify config is code-first and offline-friendly. `.graphifyignore` skips Markdown, images, video, and other semantic files because those need an LLM API key.

If you intentionally want a full docs/media semantic graph, run a separate extraction with the needed API key and do not commit the output.
