import { FaClock } from 'react-icons/fa';
import './BasicWarmupExercises.css';

const BasicWarmupExercises = () => {

  const warmupCategories = [
    {
      id: 1,
      title: 'Full-Body Warm-Up',
      duration: '5 Minutes',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop&auto=format&q=80',
      description: 'Get your entire body ready for yoga with these essential warm-up movements.',
      color: '#667eea',
      exercises: [
        {
          name: 'March in Place',
          time: '1 minute',
          description: 'Lift your knees and swing your arms naturally.'
        },
        {
          name: 'Arm Circles',
          time: '30 seconds per direction',
          description: 'Stretch arms out to the sides and rotate them forward, then backward.'
        },
        {
          name: 'Torso Twists',
          time: '30 seconds',
          description: 'Stand with feet shoulder-width apart, twist your upper body from side to side.'
        },
        {
          name: 'Side-to-Side Steps with Arm Swings',
          time: '1 minute',
          description: 'Step side to side while swinging arms across your body.'
        }
      ]
    },
    {
      id: 2,
      title: 'Dynamic Stretches',
      duration: '3-5 Minutes',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&auto=format&q=80',
      description: 'Active movements to increase flexibility and prepare your muscles for deeper stretches.',
      color: '#764ba2',
      exercises: [
        {
          name: 'Leg Swings',
          time: '10 reps per leg',
          description: 'Hold onto a support and swing one leg forward and backward, then sideways.'
        },
        {
          name: 'High Knees',
          time: '30 seconds',
          description: 'Jog in place, lifting knees to hip height.'
        },
        {
          name: 'Hip Circles',
          time: '10 reps per side',
          description: 'Stand with hands on hips and make big circles.'
        },
        {
          name: 'Dynamic Side Lunges',
          time: '10 reps per side',
          description: 'Step out to the side and shift your weight back and forth.'
        }
      ]
    },
    {
      id: 3,
      title: 'Mobility and Loosening Exercises',
      duration: '3 Minutes',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80',
      description: 'Release tension and improve joint mobility with these gentle movements.',
      color: '#f093fb',
      exercises: [
        {
          name: 'Neck Rolls',
          time: '30 seconds each direction',
          description: 'Gently roll your neck clockwise, then counterclockwise.'
        },
        {
          name: 'Shoulder Rolls',
          time: '30 seconds each direction',
          description: 'Roll your shoulders forward and backward to release tension.'
        },
        {
          name: 'Wrist and Ankle Rotations',
          time: '30 seconds per joint',
          description: 'Rotate wrists and ankles in both directions.'
        },
        {
          name: 'Spinal Roll Down',
          time: '5 reps',
          description: 'Stand tall, tuck your chin, and roll down vertebra by vertebra, reaching for your toes.'
        }
      ]
    },
    {
      id: 4,
      title: 'Basic Static Stretches',
      duration: '2-3 Minutes',
      image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=400&fit=crop&auto=format&q=80',
      description: 'Hold these stretches to lengthen muscles and increase flexibility.',
      color: '#4facfe',
      exercises: [
        {
          name: 'Hamstring Stretch',
          time: '15-20 seconds per leg',
          description: 'Extend one leg forward with a slight bend and lean into it.'
        },
        {
          name: 'Side Stretch',
          time: '15 seconds per side',
          description: 'Reach one arm overhead and lean sideways gently.'
        },
        {
          name: 'Calf Stretch',
          time: '15 seconds per leg',
          description: 'Step one foot back and press the heel down while leaning forward.'
        },
        {
          name: 'Butterfly Stretch',
          time: '15 seconds',
          description: 'Sit with the soles of your feet together and knees apart, pressing lightly downward.'
        }
      ]
    },
    {
      id: 5,
      title: 'Breathing and Relaxation',
      duration: '1 Minute',
      image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600&h=400&fit=crop&auto=format&q=80',
      description: 'Center your mind and body with deep breathing techniques.',
      color: '#00f2fe',
      exercises: [
        {
          name: 'Deep Breathing',
          time: '1 minute',
          description: 'Take deep breaths, inhaling for 4 counts and exhaling for 4 counts. This helps center your mind and body.'
        }
      ]
    }
  ];

  return (
    <div className="warmup-page">
      {/* Header Section */}
      <div className="warmup-header">
        <div className="container">
          <div className="warmup-header-content">
            <h1>Basic Warmup Exercises</h1>
            <p>Prepare your body and mind for yoga practice with these essential warm-up routines</p>
            <div className="total-time">
              <FaClock />
              <span>Total Duration: 14-17 Minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="container">
        <div className="warmup-cards-grid">
          {warmupCategories.map((category, index) => (
            <div 
              key={category.id} 
              className="warmup-card"
              style={{ '--card-color': category.color }}
            >
              <div className="warmup-card-image">
                <img src={category.image} alt={category.title} />
                <div className="warmup-card-overlay">
                  <span className="step-number">{index + 1}</span>
                </div>
                <div className="duration-badge">
                  <FaClock />
                  <span>{category.duration}</span>
                </div>
              </div>
              
              <div className="warmup-card-content">
                <h3>{category.title}</h3>
                <p className="card-description">{category.description}</p>
                
                <div className="exercises-list show">
                  {category.exercises.map((exercise, idx) => (
                    <div key={idx} className="exercise-item">
                      <div className="exercise-header">
                        <h4>{exercise.name}</h4>
                        <span className="exercise-time">{exercise.time}</span>
                      </div>
                      <p>{exercise.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="warmup-tips">
          <h2>Tips for Effective Warm-Up</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">💡</div>
              <h4>Start Slow</h4>
              <p>Begin with gentle movements and gradually increase intensity as your body warms up.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🎯</div>
              <h4>Focus on Form</h4>
              <p>Quality over quantity. Proper form prevents injuries and maximizes benefits.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🧘</div>
              <h4>Breathe Deeply</h4>
              <p>Synchronize your breath with movements for better oxygen flow and relaxation.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">⏱️</div>
              <h4>Don't Rush</h4>
              <p>Give each exercise adequate time. A proper warm-up prepares both body and mind.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicWarmupExercises;
