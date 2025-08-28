# Echo Integration Setup

Your Next.js app has been successfully integrated with Echo for AI functionality! 🎉

## What's Changed

1. **Installed Echo React SDK** - `@merit-systems/echo-react-sdk` package added
2. **Added EchoProvider** - Wraps your app to provide Echo context
3. **Updated AI Page** - Now uses Echo for AI calls instead of server routes
4. **Enhanced Header** - Shows Echo authentication status and balance
5. **Server Route** - Deprecated the old AI server route

## Next Steps to Get Started

### 1. Get Your Echo App ID
1. Visit [Echo Dashboard](https://echo.merit.systems/owner/apps/create)
2. Create a new app or use an existing one
3. Copy your `app_id`

### 2. Update Environment Variables
Open `/apps/web/.env.local` and replace the placeholder:

```env
NEXT_PUBLIC_ECHO_APP_ID=your-actual-echo-app-id-here
```

### 3. Start the Development Server
```bash
cd apps/web
bun dev
```

### 4. Test the Integration
1. Visit `http://localhost:3001`
2. Click "AI Chat" in the navigation
3. Sign in with Echo when prompted
4. Start chatting with the AI!

## Features

- **Client-side AI calls** - No server routes needed, all handled by Echo
- **Authentication** - Secure sign-in through Echo
- **Balance tracking** - See your AI usage balance in real-time
- **Streaming responses** - Real-time AI responses
- **Error handling** - Graceful error handling for AI calls

## Available Models

The app is configured to use `gpt-4o-mini` by default. You can change this in the AI page component or explore other available models through Echo.

## Support

If you encounter any issues:
1. Verify your Echo App ID is correct
2. Check that you're signed in to Echo
3. Ensure you have sufficient balance
4. Check the browser console for any errors

Happy coding! 🚀
