# API Client SDK Generator

This script automatically generates a fully-typed TypeScript SDK for the api.statox.fr backend API.

## Features

- **Fully Type-Safe**: All endpoints have complete TypeScript types derived from JSON schemas
- **Runtime Validation**: Input validation using AJV before sending requests
- **Grouped by Module**: Methods organized by feature module (e.g., `client.homeTracker.getDashboard()`)
- **Automatic Credentials**: Session cookie handling with `credentials: 'include'`
- **Error Handling**: Configurable error handler for all requests

## Usage

### 1. Generate the SDK

```bash
npm run generate:sdk <output-directory>
```

**Example:** Generate SDK to SvelteKit frontend:

```bash
npmr generate:sdk ../apps.statox.fr/src/vendor/statox-api
```

This creates `verdor/statox-api/index.ts` in the specified directory.

### 2. Install Dependencies in Your Frontend

The generated SDK requires these dependencies:

```bash
npm install ajv json-schema-to-ts
```

### 3. Initialize the Client

```typescript
// src/lib/api/client.ts
import { APIClient } from '../../vendor/statox-api';

export const apiClient = new APIClient({
    baseURL: PUBLIC_API_URL,
    credentials: 'include', // For session cookies
    onError: (error, endpoint) => {
        console.error(`API Error on ${endpoint}:`, error);
        // Optional: Add custom error handling (toast notifications, etc.)
    }
});
```

### 4. Use the Client

```typescript
// In the SvelteKit components/routes

import { client } from '$lib/api/client';

// Authentication
await client.auth.login({ username: 'user', password: 'pass' });
const { status, user } = await client.auth.me();
await client.auth.logout();

// HomeTracker
const dashboard = await client.homeTracker.getSensorsDataForDashboard();
const histogram = await client.homeTracker.histogramData({
    timeWindow: '7d'
});

// Chords
const allChords = await client.chords.getAll();
await client.chords.addLinkVisit({ url: 'https://example.com' });

// With path parameters
const entry = await client.misc.r({ linkId: 'abc123' });
```

## Generated SDK Structure

```typescript
export class APIClient {
    // Configuration
    constructor(config: APIClientConfig);

    // Modules (grouped by feature)
    auth = {
        login: (input) => Promise<Output>,
        logout: (input) => Promise<Output>,
        me: (input) => Promise<Output>
    };

    homeTracker = {
        getDashboard: () => Promise<Output>,
        getEphemerides: () => Promise<Output>,
        histogramData: (input) => Promise<Output>,
        upload: (input) => Promise<Output>
        // ... more methods
    };

    // ... more modules
}
```

## Type Exports

All input/output types are exported for convenience:

```typescript
import type {
    Auth_Login_Input,
    Auth_Login_Output,
    HomeTracker_HistogramData_Input,
    HomeTracker_HistogramData_Output
} from './api-client';

// Use in your own functions
function processHistogram(data: HomeTracker_HistogramData_Output) {
    // Fully typed!
}
```

## Validation

### Input Validation

All POST requests validate input against schemas before sending:

```typescript
// This will throw an error if input is invalid
await apiClient.homeTracker.upload({
    sensorName: 'temp-sensor'
    // Missing required fields will be caught!
});
```

### Output Validation

Responses are validated against output schemas (warnings logged to console if invalid).

## Error Handling

### Global Error Handler

```typescript
const apiClient = new APIClient({
    baseURL: 'https://api.statox.fr',
    onError: (error, endpoint) => {
        if (error.message.includes('401')) {
            // Redirect to login
            goto('/login');
        }
        // Show toast notification
        toast.error(`Failed to call ${endpoint}`);
    }
});
```

### Per-Request Error Handling

```typescript
try {
    await apiClient.auth.login({ username, password });
} catch (error) {
    console.error('Login failed:', error);
}
```

## Customization

### Custom Credentials Mode

```typescript
const apiClient = new APIClient({
    baseURL: 'https://api.statox.fr',
    credentials: 'same-origin' // or 'omit'
});
```

## Development Workflow

1. **Add/modify route** in the backend
2. **Compile TypeScript**: `npm run watch` or `npm run postinstall` (runs `tsc`)
3. **Regenerate SDK**: `npm run generate:sdk <output-dir>`
4. **Frontend local repo gets updated types**

## Technical Details

### How It Works

1. Script reads from compiled route registry (`dist/src/libs/routes/index.js`)
2. Extracts metadata: path, method, schemas, authentication
3. Groups routes by module (first part of path)
4. Generates TypeScript code with:
    - Schema exports (for AJV validation)
    - Type definitions (using `FromSchema<>`)
    - Client class with typed methods
    - Validation helpers

### Bundle Impact

To minimize bundle size in your frontend:

- Tree-shaking automatically removes unused endpoints
- Only schemas for used endpoints are included
- AJV validator instances are cached and reused

## Examples (LLM generated)

### SvelteKit Load Function

```typescript
// +page.ts
import { apiClient } from '$lib/api/client';

export async function load() {
    const dashboard = await apiClient.homeTracker.getSensorsDataForDashboard();
    return { dashboard };
}
```

### Form Actions

```typescript
// +page.server.ts
import { apiClient } from '$lib/api/client';
import { fail } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        try {
            await apiClient.auth.login({
                username: data.get('username'),
                password: data.get('password')
            });
        } catch (error) {
            return fail(400, { error: 'Invalid credentials' });
        }
    }
};
```

### Reactive Updates

```svelte
<script lang="ts">
    import { apiClient } from '$lib/api/client';
    import { onMount } from 'svelte';

    let dashboard = $state(null);

    onMount(async () => {
        dashboard = await apiClient.homeTracker.getSensorsDataForDashboard();
    });

    async function refresh() {
        dashboard = await apiClient.homeTracker.getSensorsDataForDashboard();
    }
</script>

{#if dashboard}
    <pre>{JSON.stringify(dashboard, null, 2)}</pre>
    <button onclick={refresh}>Refresh</button>
{/if}
```
