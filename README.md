# SendGrid Send

You don't need a library to use a REST API. Just create a valid JSON body, and make a POST request to SendGrid.

## Features

1. TypeScript support - be confident about your JSON.
2. `ESM` and `CJS` - choose either `import` or `require`.
3. Use the Fetch API or any HTTP library[^1] of your choice.
4. Literally `0kb` - import a single-line JavaScript function.

[^1]: [@sendgrid/mail] uses Axios - [@sendgrid/client] depends on it.

[@sendgrid/mail]: https://www.npmjs.com/package/@sendgrid/mail
[@sendgrid/client]: https://www.npmjs.com/package/@sendgrid/client

```javascript
export const generateSgSendBody = (requestBody) => requestBody;
```

The `requestBody` is [typed] according to the [API documentation].

[typed]: dist/index.d.ts
[API documentation]: https://docs.sendgrid.com/api-reference/mail-send/mail-send

## Fetch API

The `generateSgSendRequest` function returns a [Request] object which can be used with the Fetch API. The URL, method, and HTTP headers are all set.

[Request]: https://developer.mozilla.org/en-US/docs/Web/API/Request/Request

```javascript
import { generateSgSendRequest } from 'sendgrid-send';

await fetch(
  generateSgSendRequest(
    {
      from: { email: 'sender@doamin.com' },
      personalizations: [{ to: [{ email: 'receiver@domain.com' }] }],
      subject: 'SendGrid and the Fetch API is awesome.',
      content: [{ type: 'text/plain', value: 'Best of both worlds.' }],
    },
    '<<YOUR_API_KEY_HERE>>'
  )
);
```

## Usage

```bash
npm i sendgrid-send
```

```javascript
import { generateSgSendBody } from 'sendgrid-send';
// const { generateSgSendBody } = require('sendgrid-send');

const body = generateSgSendBody({
  from: { email: 'sender@doamin.com' },
  // ...
});

// Make a HTTP request using the method of your choice.
// e.g. node-fetch, cross-fetch, axios, got, undici

await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <<YOUR_API_KEY_HERE>>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});
```

### JavaScript + VS Code

Create a [`jsconfig.json`] file and enable `checkJs`.

[`jsconfig.json`]: https://code.visualstudio.com/docs/languages/jsconfig

```json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

### TypeScript: Type Only

```bash
npm i sendgrid-send -D
```

```typescript
import type { SendGridRequestBody } from 'sendgrid-send';

const body = {
  from: { email: 'sender@doamin.com' },
  // ...
} satisfies SendGridRequestBody;
```

### Browser

The library does work on browsers, and it can be imported from [jsDelivr] and other CDNs that mirrors [npm].

[jsDelivr]: https://www.jsdelivr.com/
[npm]: https://www.npmjs.com/

> **Warning**
> The SendGrid API key should not be exposed to the client.
