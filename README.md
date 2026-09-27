The Hero Protocol

A cinematic, space-inspired event website built with React and Vite. The experience introduces the mission, showcases featured heroes and event highlights, and guides visitors through the event timeline and registration section.

- **Live website:** [the-hero-protocol.vercel.app](https://the-hero-protocol.vercel.app)
- **GitHub repository:** [Divyanshu122008/The-Hero-Protocol](https://github.com/Divyanshu122008/The-Hero-Protocol)

## Features

- Hero landing section with a mission-focused call to action
- Space-themed visual backgrounds and animation assets
- Sections for choosing a hero, mission briefing, event highlights, timeline, and registration
- Responsive React interface

## Built with

- React 19
- Vite 8
- Tailwind CSS 4
- Three.js with React Three Fiber and Drei
- Lucide React icons

## Run locally

You’ll need [Node.js](https://nodejs.org/) installed.

```bash
git clone https://github.com/Divyanshu122008/The-Hero-Protocol.git
cd The-Hero-Protocol
npm install
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Available commands

```bash
npm run dev      # Start the local development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Deployment

The site is deployed on [Vercel](https://vercel.com/) and served at [https://the-hero-protocol.vercel.app](https://the-hero-protocol.vercel.app). The project is connected to GitHub, so pushing changes to the main branch can trigger a new deployment.

## Project structure

```text
public/           Static public assets
src/
  components/     Reusable interface and visual components
  data/           Hero content
  hooks/          Reusable React hooks
  sections/       Main page sections
  assets/         Images and media imported by the app
```

## License

No license has been specified for this repository. Contact the project owner before reusing or redistributing its code or assets.
