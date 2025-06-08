# AI Paraphrasing Tool

A modern web application built with React, TypeScript, and Vite that provides AI-powered text paraphrasing capabilities. The application features a clean, responsive UI with dark mode support and multiple paraphrasing styles.

## Quick Start 🚀

1. Clone and install:
```bash
git clone <the-repository-url>
cd <repository-name>
npm install
cd api
npm install
cd ..
```

2. Create a `.env` file in the `api` directory with your Hugging Face API token:
```
HUGGING_FACE_API_KEY=your_api_token_here
```
> 💡 Get your free API token from [Hugging Face](https://huggingface.co/settings/tokens) - it takes less than 2 minutes!

3. Start the application:
```bash
npm run start
```

That's it! The application will be available at http://localhost:5173 🎉

## Features
![image](https://github.com/user-attachments/assets/25a5648c-27f5-451a-b02c-f24210d8e82a)

- 🤖 AI-powered text paraphrasing
- 🌓 Dark/Light mode support
- 🎨 Multiple paraphrasing styles (Formal, Casual, Concise, Creative)
- 📱 Responsive design
- ⚡ Fast and modern UI with Vite
- 🎯 TypeScript for better development experience

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Hugging Face API token (get it from [Hugging Face](https://huggingface.co/settings/tokens))

## Running the Application

You need to run both the frontend and backend servers:

1. Start the backend server (in one terminal):
```bash
cd api
npx ts-node src/server.ts
```

2. Start the frontend development server (in another terminal):
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Available Scripts

In the project directory, you can run:

```bash
# Start frontend development server
npm run dev

# Build frontend for production
npm run build

# Preview frontend production build
npm run preview

# Run linting
npm run lint
```

In the api directory, you can run:
```bash
# Start backend server
npx ts-node src/server.ts
```

## Key Dependencies

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Express](https://expressjs.com/) - Backend server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [React Router](https://reactrouter.com/) - Routing
- [Lucide Icons](https://lucide.dev/) - Icon set

## Development

The project uses several modern tools and practices:

- **TypeScript** for type safety
- **ESLint** for code linting
- **Tailwind CSS** for styling
- **shadcn/ui** for pre-built components
- **Vite** for fast development and building

### Project Structure

```
src/            # Frontend source code
├── components/ # React components
├── lib/        # Utility functions
├── types/      # TypeScript type definitions
└── main.tsx    # Frontend entry point

api/            # Backend source code
├── src/        # Backend TypeScript files
└── server.ts   # Backend entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
