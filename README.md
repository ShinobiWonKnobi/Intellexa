# Intellexa - Collaborative Campus Learning Platform

Intellexa is a modern, collaborative learning platform designed for university students to share knowledge, ask questions, and access study resources. Built with a focus on community engagement, Intellexa enables students to connect, contribute, and grow together through a gamified reward system.

## Features

### Core Functionality
- **Question & Answer System** - Ask academic questions and receive answers from peers and TAs
- **Resource Sharing** - Upload and share study materials, notes, and helpful resources
- **Smart Search** - Quickly find questions and resources with powerful search and filtering
- **Course-Based Organization** - Content organized by courses for easy navigation

### Engagement & Gamification
- **Karma Points System** - Earn points for contributing to the community
- **Leaderboard** - Track top contributors and celebrate academic excellence
- **Redeemable Rewards** - Exchange karma points for campus perks and merchandise
- **Voting System** - Upvote helpful answers and quality resources

### Productivity Tools
- **Exam Countdown** - Stay informed about upcoming exams with countdown widgets
- **Daily Study Tips** - Receive personalized study tips and techniques
- **Activity Dashboard** - Track your contributions and engagement history
- **Profile Management** - Manage your academic profile and achievements

### User Experience
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Real-time Updates** - Instant feedback on questions, answers, and resources
- **Anonymous Posting** - Option to ask questions anonymously for sensitive topics
- **Verified Answers** - TA-verified answers for reliable information

## Technology Stack

- **Frontend Framework**: React 19.2.4 with TypeScript
- **Build Tool**: Vite 6.2.0
- **UI Components**: Custom components with Lucide React icons
- **Data Visualization**: Recharts for analytics and statistics
- **Styling**: Tailwind CSS for modern, responsive design
- **State Management**: React Context API
- **AI Integration**: Gemini API for intelligent features

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Gemini API key (for AI-powered features)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Intellexa-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
Intellexa-main/
├── components/          # Reusable UI components
│   ├── AskModal.tsx    # Question submission modal
│   ├── Cards.tsx       # Card components for questions, resources, etc.
│   ├── Layout.tsx      # Main application layout
│   └── ShareModal.tsx  # Resource sharing modal
├── context/            # React Context for state management
│   └── AppContext.tsx  # Global application state
├── pages/              # Page components
│   ├── Dashboard.tsx           # Main dashboard with questions and resources
│   ├── LandingPage.tsx        # Landing and authentication page
│   ├── LeaderboardPage.tsx    # Community leaderboard
│   ├── ProfilePage.tsx        # User profile management
│   ├── QuestionDetailPage.tsx # Detailed question view
│   └── RedemptionPortal.tsx   # Rewards redemption interface
├── services/            # API and external service integrations
│   └── geminiService.ts       # AI service integration
├── App.tsx             # Root application component
├── constants.tsx       # Application constants and data
├── types.ts            # TypeScript type definitions
└── vite.config.ts      # Vite configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run TypeScript type checking

## Karma Points System

Users earn karma points through various activities:

| Activity | Points |
|----------|--------|
| Ask a Question | +5 |
| Answer a Question | +10 |
| Share a Resource | +15 |
| Provide Best Answer | +20 |
| Receive Upvote | +1 |

Points can be redeemed in the Redemption Portal for campus perks, merchandise, and academic benefits.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, questions, or feedback, please open an issue in the repository or contact the development team.
