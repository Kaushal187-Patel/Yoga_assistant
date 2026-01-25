# YOGA GURU - AI Yoga Pose Detection Platform

An AI-powered yoga website that helps users practice yoga correctly using computer vision and real-time pose detection. The platform educates users, detects yoga poses via camera, and provides feedback to improve posture and prevent injuries.

## Features

- **Real-time Pose Detection**: AI-powered yoga pose detection using webcam
- **Skeleton Keypoint Tracking**: 33 body keypoints tracked in real-time
- **Posture Correction Feedback**: Instant feedback to improve your form
- **Beginner-Friendly UI**: Clean, modern interface suitable for all skill levels
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Pages

1. **Home** - Hero section, benefits, FAQ, and quick start
2. **About Yoga** - Information about yoga and its importance
3. **Features** - Platform capabilities overview
4. **How It Works** - Step-by-step guide
5. **Yoga Pose Detection** - Live camera-based pose detection
6. **Technology Stack** - Technologies used in the project
7. **Results & Performance** - Accuracy metrics and charts
8. **Team** - Project team information
9. **Contact** - Contact form and information
10. **Login/Signup** - User authentication

## Technology Stack

### Frontend
- React.js
- React Router DOM
- React Icons
- Chart.js + React-Chartjs-2
- React Webcam

### AI/ML (For pose detection)
- TensorFlow.js
- MediaPipe Pose
- OpenCV

### Styling
- CSS3 with CSS Variables
- Responsive Design
- Modern UI/UX

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd yoga_assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
yoga_assistant/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Navbar.css
│   │   ├── Footer.js
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.js/css
│   │   ├── About.js/css
│   │   ├── Features.js/css
│   │   ├── HowItWorks.js/css
│   │   ├── PoseDetection.js/css
│   │   ├── TechStack.js/css
│   │   ├── Results.js/css
│   │   ├── Team.js/css
│   │   ├── Contact.js/css
│   │   └── Auth.js/css
│   ├── styles/
│   │   ├── index.css
│   │   └── App.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite

## Color Scheme

- Primary: `#a177b4` (Purple)
- Secondary: `#9fc5a7` (Green)
- Text Dark: `#232323`
- Text Gray: `#787878`
- Background Light: `#f9f0fe`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributors

- Student Name 1 - Project Lead
- Student Name 2 - ML Developer
- Student Name 3 - Backend Developer
- Student Name 4 - UI/UX Designer

## License

This project is created for educational purposes.

## Acknowledgments

- TensorFlow.js team for pose detection models
- Google MediaPipe for body tracking
- React community for excellent documentation
