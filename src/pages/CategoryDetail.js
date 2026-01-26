import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './CategoryDetail.css';

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Helper function to get yoga pose image URLs
  // Uses local images first, then falls back to Unsplash
  const getPoseImage = (poseId, poseName) => {
    // Try local image first (from pose-images folder)
    // Images should be named: pose-{id}.jpg, pose-{id}.png, etc.
    const localImagePath = `/pose-images/pose-${poseId}.jpg`;
    
    // Direct image URLs from Unsplash for specific poses (fallback)
    const directImageMap = {
      // Standing Poses
      'Tadasana': 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop&auto=format',
      'Vrikshasana': 'https://images.unsplash.com/photo-1758274525911-402f99afec14?w=400&h=300&fit=crop&auto=format',
      
      // Backbends - Using local images from collage
      'Bhujangasana': localImagePath, // Pose ID 1 - from collage
      'Setu Bandhasana': localImagePath, // Pose ID 4 - from collage
      
      // Standing/Warrior Poses - Using local images from collage
      'Virabhadrasana': localImagePath, // Pose ID 2 - from collage
      'Anjaneyasana': localImagePath, // Pose ID 10 - from collage
      
      // Seated Poses - Using local images from collage
      'Paschimottanasana': localImagePath, // Pose ID 9 - from collage
      'Ardha Matsyendrasana': localImagePath, // Pose ID 5 - from collage
      'Gomukhasana': localImagePath, // Pose ID 7 - from collage
      
      // Balancing Poses - Using local images from collage
      'Garudasana': localImagePath, // Pose ID 8 - from collage
      
      // Supine Poses - Using local images from collage
      'Supta Padangusthasana': localImagePath, // Pose ID 6 - from collage
      
      // Other Poses - Using local images from collage
      'Marjariasana': localImagePath, // Pose ID 3 - from collage
      'Pavanamuktasana': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop&auto=format',
      'Uttanasana': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop&auto=format',
      'Viparita Karani': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop&auto=format',
    };
    
    // Check if we have a direct URL for this pose
    if (directImageMap[poseName]) {
      return directImageMap[poseName];
    }
    
    // For all other poses, extract English name and use Unsplash search
    // This will fetch appropriate yoga images based on pose name
    const englishName = poseName.split('(')[1]?.split(')')[0]?.trim() || 
                       poseName.split('-')[1]?.trim() || 
                       'yoga pose';
    
    // Clean the name for URL search
    const searchTerm = englishName.toLowerCase()
      .replace(/\s+/g, '%20')
      .replace(/[^a-z0-9%]/g, '');
    
    // Use Unsplash Source API with yoga + pose name search
    // The sig parameter ensures consistent images for same pose ID
    return `https://source.unsplash.com/400x300/?yoga%20${searchTerm}&sig=${poseId}`;
  };

  // Comprehensive pose data with 10-15 poses per category and 3-7 poses per subcategory
  const poseData = {
    'pain-relief': [
      {
        id: 1,
        name: 'ભુજંગાસન (Bhujangasana) - Cobra Pose',
        image: getPoseImage(1, 'Bhujangasana'),
        description: 'A gentle backbend that strengthens the spine and opens the chest. This pose helps relieve back pain by stretching the front body and strengthening the back muscles.',
        advantages: [
          'Relieves lower back pain',
          'Strengthens the spine',
          'Opens the chest and shoulders',
          'Improves posture',
          'Stretches abdominal muscles',
          'Stimulates abdominal organs'
        ],
        disadvantages: [
          'Not suitable for severe back injuries',
          'Avoid during pregnancy',
          'May cause strain if done incorrectly',
          'Can worsen carpal tunnel syndrome'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Back Pain', 'Spine Health']
      },
      {
        id: 2,
        name: 'વીરભદ્રાસન II (Virabhadrasana II) - Warrior II',
        image: getPoseImage(2, 'Virabhadrasana'),
        description: 'A powerful standing pose that strengthens the legs, opens the hips, and improves balance. Excellent for knee and hip joint health.',
        advantages: [
          'Strengthens legs and ankles',
          'Stretches hips and groin',
          'Improves balance and stability',
          'Opens the chest',
          'Builds stamina',
          'Relieves knee pain'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'May strain hip flexors if overdone',
          'Not recommended for high blood pressure',
          'Can cause dizziness if held too long'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds',
        subCategories: ['Knee Pain', 'Hip Pain']
      },
      {
        id: 3,
        name: 'માર્જરીઆસન (Marjariasana) - Cat-Cow Pose',
        image: getPoseImage(3, 'Marjariasana'),
        description: 'A gentle flowing movement that warms up the spine and relieves tension in the back and neck. Perfect for office workers.',
        advantages: [
          'Relieves neck and back tension',
          'Improves spinal flexibility',
          'Massages abdominal organs',
          'Reduces stress and fatigue',
          'Improves posture',
          'Safe for beginners'
        ],
        disadvantages: [
          'Avoid with severe neck injuries',
          'May cause discomfort with wrist issues',
          'Not suitable during late pregnancy',
          'Can cause dizziness if done too fast'
        ],
        difficulty: 'Beginner',
        duration: '1-2 minutes',
        subCategories: ['Neck Pain', 'Back Pain']
      },
      {
        id: 4,
        name: 'સેતુ બંધાસન (Setu Bandhasana) - Bridge Pose',
        image: getPoseImage(4, 'Setu Bandhasana'),
        description: 'A gentle backbend that strengthens the back muscles and opens the chest. Excellent for relieving lower back pain and improving spinal flexibility.',
        advantages: [
          'Relieves lower back pain',
          'Strengthens glutes and hamstrings',
          'Opens the chest and shoulders',
          'Improves spinal flexibility',
          'Stimulates thyroid gland',
          'Reduces anxiety and fatigue'
        ],
        disadvantages: [
          'Avoid with neck injuries',
          'Not suitable for severe back problems',
          'May strain knees if misaligned',
          'Avoid during late pregnancy'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Back Pain', 'Spine Health']
      },
      {
        id: 5,
        name: 'અર્ધ મત્સ્યેન્દ્રાસન (Ardha Matsyendrasana) - Half Lord of the Fishes Pose',
        image: getPoseImage(5, 'Ardha Matsyendrasana'),
        description: 'A seated twist that improves spinal mobility and relieves back stiffness. Helps with sciatica and lower back tension.',
        advantages: [
          'Relieves back stiffness',
          'Improves spinal mobility',
          'Stretches shoulders and hips',
          'Stimulates digestive organs',
          'Helps with sciatica',
          'Reduces fatigue'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Not suitable during pregnancy',
          'May cause discomfort with knee issues',
          'Can strain spine if forced'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds each side',
        subCategories: ['Back Pain', 'Sciatica']
      },
      {
        id: 6,
        name: 'સુપ્ત પદાંગુષ્ઠાસન (Supta Padangusthasana) - Reclining Hand-to-Big-Toe Pose',
        image: getPoseImage(6, 'Supta Padangusthasana'),
        description: 'A supine pose that stretches the hamstrings and relieves lower back pain. Excellent for sciatica relief.',
        advantages: [
          'Stretches hamstrings and calves',
          'Relieves lower back pain',
          'Helps with sciatica',
          'Improves flexibility',
          'Strengthens legs',
          'Safe for beginners'
        ],
        disadvantages: [
          'Avoid with severe hamstring injuries',
          'Not suitable with knee problems',
          'May cause strain if overstretched',
          'Avoid with high blood pressure'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds each leg',
        subCategories: ['Back Pain', 'Sciatica', 'Joint Pain']
      },
      {
        id: 7,
        name: 'ગોમુખાસન (Gomukhasana) - Cow Face Pose',
        image: getPoseImage(7, 'Gomukhasana'),
        description: 'A seated pose that stretches shoulders, hips, and thighs. Excellent for shoulder and hip pain relief.',
        advantages: [
          'Stretches shoulders and chest',
          'Opens hips and thighs',
          'Improves posture',
          'Relieves shoulder tension',
          'Stretches triceps',
          'Improves flexibility'
        ],
        disadvantages: [
          'Avoid with shoulder injuries',
          'Not suitable with knee problems',
          'May cause discomfort with tight hips',
          'Can strain if forced'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds each side',
        subCategories: ['Shoulder Pain', 'Hip Pain', 'Joint Pain']
      },
      {
        id: 8,
        name: 'ગરુડાસન (Garudasana) - Eagle Pose',
        image: getPoseImage(8, 'Garudasana'),
        description: 'A balancing pose that strengthens legs and improves joint mobility. Helps with joint pain and improves circulation.',
        advantages: [
          'Strengthens legs and ankles',
          'Improves balance',
          'Stretches shoulders and upper back',
          'Improves joint mobility',
          'Enhances concentration',
          'Relieves joint stiffness'
        ],
        disadvantages: [
          'Avoid with knee or ankle injuries',
          'Not suitable for balance issues',
          'May cause dizziness',
          'Can strain if held too long'
        ],
        difficulty: 'Intermediate',
        duration: '20-40 seconds each side',
        subCategories: ['Joint Pain', 'Knee Pain', 'Arthritis']
      },
      {
        id: 9,
        name: 'પશ્ચિમોત્તાનાસન (Paschimottanasana) - Seated Forward Bend',
        image: getPoseImage(9, 'Paschimottanasana'),
        description: 'A forward fold that stretches the entire back body and relieves back pain. Calms the nervous system.',
        advantages: [
          'Stretches entire back body',
          'Relieves back pain',
          'Calms the nervous system',
          'Stimulates abdominal organs',
          'Improves digestion',
          'Reduces stress'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Not suitable with disc problems',
          'May cause strain if forced',
          'Avoid during pregnancy'
        ],
        difficulty: 'Beginner',
        duration: '1-3 minutes',
        subCategories: ['Back Pain', 'Muscle Tension']
      },
      {
        id: 10,
        name: 'અંજનેયાસન (Anjaneyasana) - Low Lunge',
        image: getPoseImage(10, 'Anjaneyasana'),
        description: 'A lunge pose that stretches hip flexors and relieves hip and knee pain. Strengthens legs and improves flexibility.',
        advantages: [
          'Stretches hip flexors',
          'Strengthens legs',
          'Opens the chest',
          'Relieves hip pain',
          'Improves balance',
          'Stretches psoas muscle'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with hip problems',
          'May strain if overstretched',
          'Can cause discomfort with ankle issues'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds each side',
        subCategories: ['Hip Pain', 'Knee Pain', 'Muscle Tension']
      },
      {
        id: 11,
        name: 'ઉત્તાનાસન (Uttanasana) - Standing Forward Bend',
        image: getPoseImage(11, 'Uttanasana'),
        description: 'A standing forward fold that relieves back and neck tension. Calms the mind and stretches the entire back body.',
        advantages: [
          'Relieves back and neck tension',
          'Stretches hamstrings and calves',
          'Calms the mind',
          'Improves circulation',
          'Reduces stress',
          'Stimulates abdominal organs'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Not suitable with high blood pressure',
          'May cause dizziness',
          'Avoid during late pregnancy'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Back Pain', 'Neck Pain', 'Muscle Tension']
      },
      {
        id: 12,
        name: 'વિપરીત કરણી (Viparita Karani) - Legs-Up-the-Wall Pose',
        image: getPoseImage(12, 'Viparita Karani'),
        description: 'A restorative inversion that relieves back pain and reduces swelling. Excellent for sciatica and lower back relief.',
        advantages: [
          'Relieves lower back pain',
          'Reduces leg swelling',
          'Calms the nervous system',
          'Improves circulation',
          'Reduces stress',
          'Helps with sciatica'
        ],
        disadvantages: [
          'Avoid with eye pressure issues',
          'Not suitable with severe back problems',
          'May cause discomfort with neck issues',
          'Avoid during menstruation'
        ],
        difficulty: 'Beginner',
        duration: '5-15 minutes',
        subCategories: ['Back Pain', 'Sciatica', 'Muscle Tension']
      },
      {
        id: 13,
        name: 'પવનમુક્તાસન (Pavanamuktasana) - Wind-Relieving Pose',
        image: getPoseImage(13, 'Pavanamuktasana'),
        description: 'A supine pose that relieves lower back pain and improves digestion. Excellent for joint pain and arthritis.',
        advantages: [
          'Relieves lower back pain',
          'Improves digestion',
          'Stretches lower back',
          'Relieves gas and bloating',
          'Strengthens core',
          'Helps with joint pain'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Not suitable during pregnancy',
          'May cause discomfort with knee issues',
          'Avoid with high blood pressure'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Back Pain', 'Joint Pain', 'Arthritis']
      },
      {
        id: 14,
        name: 'ત્રિકોણાસન (Trikonasana) - Triangle Pose',
        image: getPoseImage(14, 'Trikonasana'),
        description: 'A standing pose that strengthens legs and relieves back pain. Improves flexibility and balance.',
        advantages: [
          'Strengthens legs',
          'Stretches hamstrings and hips',
          'Relieves back pain',
          'Improves balance',
          'Opens the chest',
          'Stimulates abdominal organs'
        ],
        disadvantages: [
          'Avoid with low blood pressure',
          'Not suitable with neck injuries',
          'May cause dizziness',
          'Can strain if overstretched'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds each side',
        subCategories: ['Back Pain', 'Hip Pain', 'Muscle Tension']
      },
      {
        id: 15,
        name: 'અધો મુખ શ્વાનાસન (Adho Mukha Svanasana) - Downward-Facing Dog',
        image: getPoseImage(15, 'Adho Mukha Svanasana'),
        description: 'An inversion that strengthens the entire body and relieves back pain. Excellent for shoulder and neck tension.',
        advantages: [
          'Strengthens arms and legs',
          'Stretches hamstrings and calves',
          'Relieves back pain',
          'Improves circulation',
          'Calms the mind',
          'Relieves shoulder tension'
        ],
        disadvantages: [
          'Avoid with wrist injuries',
          'Not suitable with high blood pressure',
          'May cause strain with shoulder issues',
          'Avoid during late pregnancy'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Back Pain', 'Shoulder Pain', 'Neck Pain']
      }
    ],
    'disease-specific': [
      {
        id: 16,
        name: 'સૂર્ય નમસ્કાર (Surya Namaskar) - Sun Salutation',
        image: getPoseImage(16, 'Surya Namaskar'),
        description: 'A complete sequence of 12 poses that provides a full-body workout. Excellent for diabetes management and cardiovascular health.',
        advantages: [
          'Helps control blood sugar levels',
          'Improves cardiovascular health',
          'Boosts metabolism',
          'Enhances flexibility',
          'Reduces stress',
          'Improves circulation'
        ],
        disadvantages: [
          'Avoid with severe heart conditions',
          'Not recommended during pregnancy',
          'May cause fatigue if overdone',
          'Requires good physical condition'
        ],
        difficulty: 'Intermediate',
        duration: '5-10 minutes',
        subCategories: ['Diabetes', 'Heart Health']
      },
      {
        id: 17,
        name: 'સર્વાંગાસન (Sarvangasana) - Shoulder Stand',
        image: getPoseImage(17, 'Sarvangasana'),
        description: 'An inverted pose that stimulates the thyroid gland and improves blood circulation. Beneficial for thyroid disorders.',
        advantages: [
          'Stimulates thyroid gland',
          'Improves blood circulation',
          'Relieves stress and anxiety',
          'Strengthens shoulders and arms',
          'Improves digestion',
          'Calms the nervous system'
        ],
        disadvantages: [
          'Avoid with neck injuries',
          'Not suitable for high blood pressure',
          'Avoid during menstruation',
          'Not recommended for glaucoma',
          'Requires proper technique'
        ],
        difficulty: 'Advanced',
        duration: '1-3 minutes',
        subCategories: ['Thyroid', 'Blood Pressure']
      },
      {
        id: 18,
        name: 'હલાસન (Halasana) - Plow Pose',
        image: getPoseImage(18, 'Halasana'),
        description: 'An inverted pose that stimulates the thyroid gland and improves digestion. Beneficial for diabetes and thyroid disorders.',
        advantages: [
          'Stimulates thyroid gland',
          'Improves digestion',
          'Stretches the spine',
          'Calms the nervous system',
          'Helps with diabetes',
          'Reduces stress'
        ],
        disadvantages: [
          'Avoid with neck injuries',
          'Not suitable during menstruation',
          'Avoid with high blood pressure',
          'Requires flexibility',
          'Not for beginners'
        ],
        difficulty: 'Advanced',
        duration: '1-3 minutes',
        subCategories: ['Thyroid', 'Diabetes', 'Digestive Issues']
      },
      {
        id: 19,
        name: 'ધનુરાસન (Dhanurasana) - Bow Pose',
        image: getPoseImage(19, 'Dhanurasana'),
        description: 'A backbend that stimulates abdominal organs and improves digestion. Excellent for diabetes and digestive issues.',
        advantages: [
          'Stimulates abdominal organs',
          'Improves digestion',
          'Strengthens back muscles',
          'Opens the chest',
          'Helps with diabetes',
          'Reduces belly fat'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Not suitable during pregnancy',
          'Avoid with high blood pressure',
          'May strain neck if done incorrectly'
        ],
        difficulty: 'Intermediate',
        duration: '20-30 seconds',
        subCategories: ['Diabetes', 'Digestive Issues']
      },
      {
        id: 20,
        name: 'ભસ્ત્રિકા પ્રાણાયામ (Bhastrika Pranayama) - Bellows Breath',
        image: getPoseImage(20, 'Bhastrika Pranayama'),
        description: 'A powerful breathing technique that improves lung capacity and helps with asthma. Boosts energy and metabolism.',
        advantages: [
          'Improves lung capacity',
          'Helps with asthma',
          'Boosts metabolism',
          'Increases energy',
          'Improves circulation',
          'Strengthens respiratory system'
        ],
        disadvantages: [
          'Avoid with high blood pressure',
          'Not suitable with heart conditions',
          'May cause dizziness',
          'Avoid during pregnancy',
          'Not for beginners'
        ],
        difficulty: 'Intermediate',
        duration: '2-5 minutes',
        subCategories: ['Asthma', 'Heart Health', 'Immune System']
      },
      {
        id: 21,
        name: 'કપાલભાતિ પ્રાણાયામ (Kapalbhati Pranayama) - Skull Shining Breath',
        image: getPoseImage(21, 'Kapalbhati Pranayama'),
        description: 'A cleansing breathing technique that helps control diabetes and improves digestion. Strengthens abdominal muscles.',
        advantages: [
          'Helps control diabetes',
          'Improves digestion',
          'Strengthens abdominal muscles',
          'Cleanses respiratory system',
          'Boosts metabolism',
          'Improves focus'
        ],
        disadvantages: [
          'Avoid with high blood pressure',
          'Not suitable with heart problems',
          'Avoid during pregnancy',
          'May cause dizziness',
          'Not for beginners'
        ],
        difficulty: 'Intermediate',
        duration: '2-5 minutes',
        subCategories: ['Diabetes', 'Digestive Issues', 'Immune System']
      },
      {
        id: 22,
        name: 'મત્સ્યાસન (Matsyasana) - Fish Pose',
        image: getPoseImage(22, 'Matsyasana'),
        description: 'A backbend that opens the chest and improves breathing. Beneficial for asthma and respiratory issues.',
        advantages: [
          'Opens the chest',
          'Improves breathing',
          'Stretches hip flexors',
          'Stimulates thyroid',
          'Helps with asthma',
          'Relieves neck tension'
        ],
        disadvantages: [
          'Avoid with neck injuries',
          'Not suitable with high blood pressure',
          'Avoid during late pregnancy',
          'May strain lower back'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Asthma', 'Thyroid', 'Heart Health']
      },
      {
        id: 23,
        name: 'વજ્રાસન (Vajrasana) - Thunderbolt Pose',
        image: getPoseImage(23, 'Vajrasana'),
        description: 'A seated pose that improves digestion and helps control diabetes. Excellent for meditation and pranayama.',
        advantages: [
          'Improves digestion',
          'Helps with diabetes',
          'Strengthens thigh muscles',
          'Calms the mind',
          'Improves posture',
          'Aids in meditation'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with ankle problems',
          'May cause discomfort initially',
          'Can strain knees if held too long'
        ],
        difficulty: 'Beginner',
        duration: '5-30 minutes',
        subCategories: ['Diabetes', 'Digestive Issues']
      },
      {
        id: 24,
        name: 'પશ્ચિમોત્તાનાસન (Paschimottanasana) - Seated Forward Bend',
        image: getPoseImage(24, 'Paschimottanasana'),
        description: 'A forward fold that stimulates abdominal organs and helps with diabetes. Calms the nervous system.',
        advantages: [
          'Stimulates abdominal organs',
          'Helps with diabetes',
          'Calms nervous system',
          'Improves digestion',
          'Stretches entire back',
          'Reduces stress'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Not suitable with disc problems',
          'Avoid during pregnancy',
          'May cause strain if forced'
        ],
        difficulty: 'Beginner',
        duration: '1-3 minutes',
        subCategories: ['Diabetes', 'Digestive Issues', 'Heart Health']
      },
      {
        id: 25,
        name: 'ઉષ્ટ્રાસન (Ustrasana) - Camel Pose',
        image: getPoseImage(25, 'Ustrasana'),
        description: 'A deep backbend that opens the chest and improves breathing. Beneficial for asthma and respiratory health.',
        advantages: [
          'Opens the chest',
          'Improves breathing',
          'Stretches hip flexors',
          'Strengthens back',
          'Helps with asthma',
          'Stimulates thyroid'
        ],
        disadvantages: [
          'Avoid with neck injuries',
          'Not suitable with high blood pressure',
          'Avoid during pregnancy',
          'May strain lower back'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds',
        subCategories: ['Asthma', 'Thyroid', 'Heart Health']
      },
      {
        id: 26,
        name: 'નાડી શોધન પ્રાણાયામ (Nadi Shodhana Pranayama) - Alternate Nostril Breathing',
        image: getPoseImage(26, 'Nadi Shodhana Pranayama'),
        description: 'A balancing breathing technique that regulates blood pressure and calms the mind. Excellent for heart health.',
        advantages: [
          'Regulates blood pressure',
          'Calms the mind',
          'Balances nervous system',
          'Improves focus',
          'Reduces stress',
          'Benefits heart health'
        ],
        disadvantages: [
          'Avoid with blocked nostrils',
          'Not suitable during illness',
          'May cause dizziness if done incorrectly',
          'Requires proper technique'
        ],
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        subCategories: ['Blood Pressure (BP)', 'Heart Health', 'Immune System']
      },
      {
        id: 27,
        name: 'સુપ્ત બદ્ધ કોનાસન (Supta Baddha Konasana) - Reclining Bound Angle Pose',
        image: getPoseImage(27, 'Supta Baddha Konasana'),
        description: 'A restorative pose that helps with PCOS and hormonal balance. Calms the nervous system and reduces stress.',
        advantages: [
          'Helps with PCOS',
          'Improves hormonal balance',
          'Stretches inner thighs',
          'Calms nervous system',
          'Reduces stress',
          'Improves circulation'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with groin injuries',
          'May cause discomfort with tight hips',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '3-10 minutes',
        subCategories: ['PCOS', 'Hormonal Balance', 'Immune System']
      },
      {
        id: 28,
        name: 'બદ્ધ કોનાસન (Baddha Konasana) - Butterfly Pose',
        image: getPoseImage(28, 'Baddha Konasana'),
        description: 'A seated pose that helps with PCOS and improves reproductive health. Stretches inner thighs and groin.',
        advantages: [
          'Helps with PCOS',
          'Improves reproductive health',
          'Stretches inner thighs',
          'Stimulates abdominal organs',
          'Improves flexibility',
          'Calms the mind'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with groin problems',
          'May cause discomfort initially',
          'Use props for support'
        ],
        difficulty: 'Beginner',
        duration: '1-5 minutes',
        subCategories: ['PCOS', 'Hormonal Balance']
      },
      {
        id: 29,
        name: 'શવાસન (Shavasana) - Corpse Pose',
        image: getPoseImage(29, 'Shavasana'),
        description: 'A restorative pose that reduces blood pressure and calms the entire system. Essential for heart health.',
        advantages: [
          'Reduces blood pressure',
          'Calms entire system',
          'Reduces stress',
          'Improves heart health',
          'Promotes relaxation',
          'Enhances recovery'
        ],
        disadvantages: [
          'May cause sleepiness',
          'Not suitable if feeling unwell',
          'Keep warm during practice',
          'Avoid if very tired'
        ],
        difficulty: 'Beginner',
        duration: '5-20 minutes',
        subCategories: ['Blood Pressure (BP)', 'Heart Health', 'Immune System']
      },
      {
        id: 30,
        name: 'વિપરીત કરણી (Viparita Karani) - Legs-Up-the-Wall Pose',
        image: getPoseImage(30, 'Viparita Karani'),
        description: 'A gentle inversion that improves circulation and helps with blood pressure. Calms the nervous system.',
        advantages: [
          'Improves circulation',
          'Helps with blood pressure',
          'Reduces leg swelling',
          'Calms nervous system',
          'Relieves stress',
          'Benefits heart health'
        ],
        disadvantages: [
          'Avoid with eye pressure issues',
          'Not suitable during menstruation',
          'May cause discomfort with neck issues',
          'Avoid if feeling dizzy'
        ],
        difficulty: 'Beginner',
        duration: '5-15 minutes',
        subCategories: ['Blood Pressure (BP)', 'Heart Health', 'Immune System']
      },
      {
        id: 31,
        name: 'અર્ધ ચંદ્રાસન (Ardha Chandrasana) - Half Moon Pose',
        image: getPoseImage(31, 'Ardha Chandrasana'),
        description: 'A balancing pose that improves circulation and strengthens the immune system. Enhances coordination and focus.',
        advantages: [
          'Improves circulation',
          'Strengthens immune system',
          'Improves balance',
          'Strengthens legs',
          'Stretches hamstrings',
          'Enhances focus'
        ],
        disadvantages: [
          'Avoid with low blood pressure',
          'Not suitable with balance issues',
          'May cause dizziness',
          'Requires good flexibility'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds each side',
        subCategories: ['Immune System', 'Heart Health']
      },
      {
        id: 32,
        name: 'ઉત્કટાસન (Utkatasana) - Chair Pose',
        image: getPoseImage(32, 'Utkatasana'),
        description: 'A strengthening pose that improves metabolism and helps with diabetes. Builds endurance and strength.',
        advantages: [
          'Improves metabolism',
          'Helps with diabetes',
          'Strengthens legs',
          'Builds endurance',
          'Tones muscles',
          'Improves balance'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with low blood pressure',
          'May cause strain if held too long',
          'Can be challenging for beginners'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds',
        subCategories: ['Diabetes', 'Heart Health', 'Immune System']
      }
    ],
    'mental-health': [
      {
        id: 33,
        name: 'બાલાસન (Balasana) - Child\'s Pose',
        image: getPoseImage(33, 'Balasana'),
        description: 'A restorative pose that calms the mind and relieves stress. Perfect for anxiety and stress management.',
        advantages: [
          'Reduces stress and anxiety',
          'Calms the mind',
          'Stretches hips and thighs',
          'Relieves back pain',
          'Promotes relaxation',
          'Improves sleep quality'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable during pregnancy',
          'May cause discomfort with ankle issues',
          'Can be difficult with tight hips'
        ],
        difficulty: 'Beginner',
        duration: '1-3 minutes',
        subCategories: ['Stress Relief', 'Anxiety Management']
      },
      {
        id: 34,
        name: 'પદ્માસન (Padmasana) - Lotus Pose',
        image: getPoseImage(34, 'Padmasana'),
        description: 'The classic meditation pose that promotes mental clarity and focus. Ideal for meditation and concentration practices.',
        advantages: [
          'Improves focus and concentration',
          'Calms the mind',
          'Opens hips',
          'Improves posture',
          'Reduces anxiety',
          'Enhances meditation practice'
        ],
        disadvantages: [
          'Requires flexible hips',
          'Can strain knees if forced',
          'Not suitable for knee injuries',
          'May cause ankle discomfort',
          'Difficult for beginners'
        ],
        difficulty: 'Intermediate',
        duration: '5-30 minutes',
        subCategories: ['Focus & Concentration', 'Meditation']
      },
      {
        id: 35,
        name: 'શવાસન (Shavasana) - Corpse Pose',
        image: getPoseImage(35, 'Shavasana'),
        description: 'The ultimate relaxation pose that calms the mind and reduces stress. Essential for mental health and sleep quality.',
        advantages: [
          'Reduces stress and anxiety',
          'Calms the mind',
          'Improves sleep quality',
          'Promotes deep relaxation',
          'Reduces blood pressure',
          'Enhances recovery'
        ],
        disadvantages: [
          'May cause sleepiness',
          'Keep warm during practice',
          'Not suitable if feeling unwell',
          'Avoid if very tired'
        ],
        difficulty: 'Beginner',
        duration: '5-20 minutes',
        subCategories: ['Stress Relief', 'Sleep Disorders', 'Emotional Balance']
      },
      {
        id: 36,
        name: 'વિપરીત કરણી (Viparita Karani) - Legs-Up-the-Wall Pose',
        image: getPoseImage(36, 'Viparita Karani'),
        description: 'A restorative inversion that calms the nervous system and reduces anxiety. Excellent for stress relief and sleep.',
        advantages: [
          'Reduces anxiety',
          'Calms nervous system',
          'Improves sleep',
          'Reduces stress',
          'Relieves fatigue',
          'Promotes relaxation'
        ],
        disadvantages: [
          'Avoid with eye pressure issues',
          'Not suitable during menstruation',
          'May cause discomfort with neck issues',
          'Avoid if feeling dizzy'
        ],
        difficulty: 'Beginner',
        duration: '5-15 minutes',
        subCategories: ['Stress Relief', 'Anxiety Management', 'Sleep Disorders']
      },
      {
        id: 37,
        name: 'અનુલોમ વિલોમ પ્રાણાયામ (Anulom Vilom Pranayama) - Alternate Nostril Breathing',
        image: getPoseImage(37, 'Anulom Vilom Pranayama'),
        description: 'A balancing breathing technique that calms the mind and reduces stress. Excellent for anxiety and emotional balance.',
        advantages: [
          'Reduces stress and anxiety',
          'Calms the mind',
          'Balances emotions',
          'Improves focus',
          'Reduces depression symptoms',
          'Enhances mental clarity'
        ],
        disadvantages: [
          'Avoid with blocked nostrils',
          'Not suitable during illness',
          'May cause dizziness if done incorrectly',
          'Requires proper technique'
        ],
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        subCategories: ['Stress Relief', 'Anxiety Management', 'Depression Support', 'Emotional Balance']
      },
      {
        id: 38,
        name: 'ભ્રમરી પ્રાણાયામ (Bhramari Pranayama) - Bee Breath',
        image: getPoseImage(38, 'Bhramari Pranayama'),
        description: 'A calming breathing technique that reduces anxiety and promotes sleep. Excellent for stress relief and emotional balance.',
        advantages: [
          'Reduces anxiety',
          'Promotes sleep',
          'Calms the mind',
          'Reduces stress',
          'Improves focus',
          'Balances emotions'
        ],
        disadvantages: [
          'Avoid with ear infections',
          'Not suitable with severe sinus issues',
          'May cause discomfort initially',
          'Practice in quiet environment'
        ],
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        subCategories: ['Anxiety Management', 'Sleep Disorders', 'Stress Relief', 'Emotional Balance']
      },
      {
        id: 39,
        name: 'સુખાસન (Sukhasana) - Easy Pose',
        image: getPoseImage(39, 'Sukhasana'),
        description: 'A comfortable seated pose for meditation that calms the mind and improves focus. Perfect for beginners.',
        advantages: [
          'Calms the mind',
          'Improves focus',
          'Reduces stress',
          'Improves posture',
          'Easy for beginners',
          'Enhances meditation'
        ],
        disadvantages: [
          'May cause discomfort with tight hips',
          'Use props for support',
          'Avoid with knee injuries',
          'Keep spine straight'
        ],
        difficulty: 'Beginner',
        duration: '5-30 minutes',
        subCategories: ['Focus & Concentration', 'Meditation', 'Stress Relief']
      },
      {
        id: 40,
        name: 'વીરાસન (Virasana) - Hero Pose',
        image: getPoseImage(40, 'Virasana'),
        description: 'A seated pose that calms the mind and improves focus. Excellent for meditation and concentration practices.',
        advantages: [
          'Calms the mind',
          'Improves focus',
          'Stretches thighs',
          'Improves digestion',
          'Reduces stress',
          'Enhances meditation'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with ankle problems',
          'May cause discomfort initially',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '5-30 minutes',
        subCategories: ['Focus & Concentration', 'Meditation', 'Stress Relief']
      },
      {
        id: 41,
        name: 'ઉજ્જાયી પ્રાણાયામ (Ujjayi Pranayama) - Victorious Breath',
        image: getPoseImage(41, 'Ujjayi Pranayama'),
        description: 'A calming breathing technique that reduces stress and improves focus. Excellent for anxiety management.',
        advantages: [
          'Reduces stress',
          'Improves focus',
          'Calms the mind',
          'Reduces anxiety',
          'Enhances concentration',
          'Balances emotions'
        ],
        disadvantages: [
          'Avoid with high blood pressure',
          'Not suitable with heart conditions',
          'May cause dizziness',
          'Requires proper technique'
        ],
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        subCategories: ['Stress Relief', 'Anxiety Management', 'Focus & Concentration']
      },
      {
        id: 42,
        name: 'સુપ્ત મત્સ્યેન્દ્રાસન (Supta Matsyendrasana) - Supine Spinal Twist',
        image: getPoseImage(42, 'Supta Matsyendrasana'),
        description: 'A gentle twist that calms the nervous system and reduces stress. Excellent for sleep and relaxation.',
        advantages: [
          'Calms nervous system',
          'Reduces stress',
          'Improves sleep',
          'Stretches spine',
          'Relieves tension',
          'Promotes relaxation'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Not suitable during pregnancy',
          'May cause discomfort with knee issues',
          'Keep shoulders on ground'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds each side',
        subCategories: ['Stress Relief', 'Sleep Disorders', 'Emotional Balance']
      },
      {
        id: 43,
        name: 'મત્સ્યાસન (Matsyasana) - Fish Pose',
        image: getPoseImage(43, 'Matsyasana'),
        description: 'A backbend that opens the heart and reduces depression. Calms the mind and improves emotional balance.',
        advantages: [
          'Reduces depression',
          'Opens the heart',
          'Calms the mind',
          'Improves emotional balance',
          'Stretches chest',
          'Reduces stress'
        ],
        disadvantages: [
          'Avoid with neck injuries',
          'Not suitable with high blood pressure',
          'Avoid during late pregnancy',
          'May strain lower back'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Depression Support', 'Emotional Balance', 'Stress Relief']
      },
      {
        id: 44,
        name: 'સેતુ બંધાસન (Setu Bandhasana) - Bridge Pose',
        image: getPoseImage(44, 'Setu Bandhasana'),
        description: 'A gentle backbend that calms the mind and reduces anxiety. Excellent for stress relief and sleep.',
        advantages: [
          'Reduces anxiety',
          'Calms the mind',
          'Improves sleep',
          'Reduces stress',
          'Opens the chest',
          'Promotes relaxation'
        ],
        disadvantages: [
          'Avoid with neck injuries',
          'Not suitable with severe back problems',
          'Avoid during late pregnancy',
          'May strain knees if misaligned'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Anxiety Management', 'Sleep Disorders', 'Stress Relief']
      },
      {
        id: 45,
        name: 'નાડી શોધન (Nadi Shodhana) - Alternate Nostril Breathing',
        image: getPoseImage(45, 'Nadi Shodhana'),
        description: 'A balancing breathing technique that reduces stress and improves emotional balance. Excellent for depression support.',
        advantages: [
          'Reduces stress',
          'Improves emotional balance',
          'Reduces depression symptoms',
          'Calms the mind',
          'Enhances focus',
          'Balances nervous system'
        ],
        disadvantages: [
          'Avoid with blocked nostrils',
          'Not suitable during illness',
          'May cause dizziness if done incorrectly',
          'Requires proper technique'
        ],
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        subCategories: ['Depression Support', 'Emotional Balance', 'Stress Relief']
      },
      {
        id: 46,
        name: 'શીતલી પ્રાણાયામ (Shitali Pranayama) - Cooling Breath',
        image: getPoseImage(46, 'Shitali Pranayama'),
        description: 'A cooling breathing technique that calms the mind and reduces stress. Excellent for anxiety and emotional balance.',
        advantages: [
          'Calms the mind',
          'Reduces stress',
          'Reduces anxiety',
          'Cools the body',
          'Improves focus',
          'Balances emotions'
        ],
        disadvantages: [
          'Avoid in cold weather',
          'Not suitable with respiratory issues',
          'May cause discomfort initially',
          'Practice in comfortable temperature'
        ],
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        subCategories: ['Anxiety Management', 'Stress Relief', 'Emotional Balance']
      },
      {
        id: 47,
        name: 'યોગ નિદ્રા (Yoga Nidra) - Yogic Sleep',
        image: getPoseImage(47, 'Yoga Nidra'),
        description: 'A deep relaxation practice that reduces stress and improves sleep. Excellent for depression and anxiety management.',
        advantages: [
          'Reduces stress',
          'Improves sleep quality',
          'Reduces anxiety',
          'Helps with depression',
          'Promotes deep relaxation',
          'Enhances recovery'
        ],
        disadvantages: [
          'May cause deep sleep',
          'Practice in quiet environment',
          'Not suitable if very tired',
          'Keep warm during practice'
        ],
        difficulty: 'Beginner',
        duration: '20-45 minutes',
        subCategories: ['Sleep Disorders', 'Depression Support', 'Stress Relief', 'Anxiety Management']
      }
    ],
    'fitness-goals': [
      {
        id: 48,
        name: 'ચતુરંગ દંડાસન (Chaturanga Dandasana) - Four-Limbed Staff Pose',
        image: getPoseImage(48, 'Chaturanga Dandasana'),
        description: 'A challenging arm balance that builds upper body strength and core stability. Excellent for weight loss and muscle toning.',
        advantages: [
          'Builds upper body strength',
          'Strengthens core muscles',
          'Tones arms and shoulders',
          'Improves balance',
          'Burns calories',
          'Builds endurance'
        ],
        disadvantages: [
          'Requires significant upper body strength',
          'Can strain wrists',
          'Not suitable for shoulder injuries',
          'May cause lower back strain',
          'Difficult for beginners'
        ],
        difficulty: 'Advanced',
        duration: '10-30 seconds',
        subCategories: ['Strength Building', 'Weight Loss']
      },
      {
        id: 49,
        name: 'સૂર્ય નમસ્કાર (Surya Namaskar) - Sun Salutation',
        image: getPoseImage(49, 'Surya Namaskar'),
        description: 'A complete sequence of 12 poses that provides a full-body workout. Excellent for weight loss and cardio fitness.',
        advantages: [
          'Burns calories',
          'Improves cardio fitness',
          'Enhances flexibility',
          'Strengthens entire body',
          'Boosts metabolism',
          'Improves circulation'
        ],
        disadvantages: [
          'Avoid with severe heart conditions',
          'Not recommended during pregnancy',
          'May cause fatigue if overdone',
          'Requires good physical condition'
        ],
        difficulty: 'Intermediate',
        duration: '5-10 minutes',
        subCategories: ['Weight Loss', 'Cardio Fitness', 'Body Sculpting']
      },
      {
        id: 50,
        name: 'ઉત્કટાસન (Utkatasana) - Chair Pose',
        image: getPoseImage(50, 'Utkatasana'),
        description: 'A strengthening pose that builds leg and core strength. Excellent for weight loss and muscle toning.',
        advantages: [
          'Burns calories',
          'Strengthens legs',
          'Tones muscles',
          'Builds endurance',
          'Improves balance',
          'Strengthens core'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with low blood pressure',
          'May cause strain if held too long',
          'Can be challenging for beginners'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds',
        subCategories: ['Weight Loss', 'Strength Building', 'Muscle Tone']
      },
      {
        id: 51,
        name: 'નાવાસન (Navasana) - Boat Pose',
        image: getPoseImage(51, 'Navasana'),
        description: 'A core strengthening pose that tones abdominal muscles. Excellent for weight loss and core strength.',
        advantages: [
          'Strengthens core',
          'Tones abdominal muscles',
          'Burns calories',
          'Improves balance',
          'Strengthens hip flexors',
          'Improves digestion'
        ],
        disadvantages: [
          'Avoid with lower back injuries',
          'Not suitable during pregnancy',
          'May cause strain if forced',
          'Requires core strength'
        ],
        difficulty: 'Intermediate',
        duration: '20-40 seconds',
        subCategories: ['Core Strength', 'Weight Loss', 'Body Sculpting']
      },
      {
        id: 52,
        name: 'ફલકાસન (Phalakasana) - Plank Pose',
        image: getPoseImage(52, 'Phalakasana'),
        description: 'A full-body strengthening pose that builds core and upper body strength. Excellent for muscle toning.',
        advantages: [
          'Strengthens entire body',
          'Builds core strength',
          'Tones arms and shoulders',
          'Burns calories',
          'Improves posture',
          'Builds endurance'
        ],
        disadvantages: [
          'Avoid with wrist injuries',
          'Not suitable with shoulder problems',
          'May cause strain if held too long',
          'Requires upper body strength'
        ],
        difficulty: 'Intermediate',
        duration: '20-60 seconds',
        subCategories: ['Core Strength', 'Strength Building', 'Muscle Tone']
      },
      {
        id: 53,
        name: 'વીરભદ્રાસન I (Virabhadrasana I) - Warrior I',
        image: getPoseImage(53, 'Virabhadrasana I'),
        description: 'A powerful standing pose that builds strength and stamina. Excellent for weight loss and muscle building.',
        advantages: [
          'Strengthens legs',
          'Builds stamina',
          'Tones muscles',
          'Burns calories',
          'Improves balance',
          'Opens hips'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with high blood pressure',
          'May cause strain if overdone',
          'Can be challenging'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds each side',
        subCategories: ['Strength Building', 'Weight Loss', 'Muscle Tone']
      },
      {
        id: 54,
        name: 'હનુમાનાસન (Hanumanasana) - Monkey Pose/Splits',
        image: getPoseImage(54, 'Hanumanasana'),
        description: 'An advanced flexibility pose that stretches hamstrings and hip flexors. Excellent for flexibility training.',
        advantages: [
          'Improves flexibility',
          'Stretches hamstrings',
          'Opens hip flexors',
          'Strengthens legs',
          'Improves balance',
          'Enhances range of motion'
        ],
        disadvantages: [
          'Requires significant flexibility',
          'Avoid with hamstring injuries',
          'Not suitable with hip problems',
          'Very challenging for beginners'
        ],
        difficulty: 'Advanced',
        duration: '30-60 seconds each side',
        subCategories: ['Flexibility', 'Body Sculpting']
      },
      {
        id: 55,
        name: 'એક પદ રાજકપોતાસન (Eka Pada Rajakapotasana) - Pigeon Pose',
        image: getPoseImage(55, 'Eka Pada Rajakapotasana'),
        description: 'A deep hip opener that improves flexibility. Excellent for flexibility and body sculpting.',
        advantages: [
          'Opens hips',
          'Improves flexibility',
          'Stretches hip flexors',
          'Relieves tension',
          'Improves posture',
          'Enhances range of motion'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with hip problems',
          'May cause discomfort initially',
          'Use props for support'
        ],
        difficulty: 'Intermediate',
        duration: '1-3 minutes each side',
        subCategories: ['Flexibility', 'Body Sculpting']
      },
      {
        id: 56,
        name: 'ધનુરાસન (Dhanurasana) - Bow Pose',
        image: getPoseImage(56, 'Dhanurasana'),
        description: 'A backbend that strengthens back muscles and improves flexibility. Excellent for strength and flexibility.',
        advantages: [
          'Strengthens back',
          'Improves flexibility',
          'Tones muscles',
          'Opens chest',
          'Stimulates organs',
          'Builds strength'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Not suitable during pregnancy',
          'Avoid with high blood pressure',
          'May strain neck if done incorrectly'
        ],
        difficulty: 'Intermediate',
        duration: '20-30 seconds',
        subCategories: ['Strength Building', 'Flexibility', 'Body Sculpting']
      },
      {
        id: 57,
        name: 'અધો મુખ વૃક્ષાસન (Adho Mukha Vrksasana) - Handstand',
        image: getPoseImage(57, 'Adho Mukha Vrksasana'),
        description: 'An advanced inversion that builds upper body and core strength. Excellent for strength building and body sculpting.',
        advantages: [
          'Builds upper body strength',
          'Strengthens core',
          'Improves balance',
          'Tones entire body',
          'Builds confidence',
          'Enhances coordination'
        ],
        disadvantages: [
          'Requires significant strength',
          'Avoid with wrist injuries',
          'Not suitable with high blood pressure',
          'Very challenging',
          'Requires proper technique'
        ],
        difficulty: 'Advanced',
        duration: '10-30 seconds',
        subCategories: ['Strength Building', 'Body Sculpting']
      },
      {
        id: 58,
        name: 'બકાસન (Bakasana) - Crow Pose',
        image: getPoseImage(58, 'Bakasana'),
        description: 'An arm balance that builds upper body and core strength. Excellent for strength building and muscle toning.',
        advantages: [
          'Builds upper body strength',
          'Strengthens core',
          'Improves balance',
          'Tones arms',
          'Builds confidence',
          'Enhances coordination'
        ],
        disadvantages: [
          'Requires upper body strength',
          'Avoid with wrist injuries',
          'Not suitable with shoulder problems',
          'Challenging for beginners'
        ],
        difficulty: 'Intermediate',
        duration: '10-30 seconds',
        subCategories: ['Strength Building', 'Muscle Tone', 'Core Strength']
      },
      {
        id: 59,
        name: 'ઊર્ધ્વ ધનુરાસન (Urdhva Dhanurasana) - Wheel Pose',
        image: getPoseImage(59, 'Urdhva Dhanurasana'),
        description: 'An advanced backbend that builds strength and flexibility. Excellent for body sculpting and flexibility.',
        advantages: [
          'Builds strength',
          'Improves flexibility',
          'Opens chest',
          'Strengthens arms and legs',
          'Tones entire body',
          'Enhances energy'
        ],
        disadvantages: [
          'Requires significant flexibility',
          'Avoid with back injuries',
          'Not suitable with high blood pressure',
          'Very challenging',
          'Requires proper technique'
        ],
        difficulty: 'Advanced',
        duration: '10-30 seconds',
        subCategories: ['Flexibility', 'Strength Building', 'Body Sculpting']
      },
      {
        id: 60,
        name: 'ત્રિકોણાસન (Trikonasana) - Triangle Pose',
        image: getPoseImage(60, 'Trikonasana'),
        description: 'A standing pose that improves flexibility and strengthens legs. Excellent for flexibility and muscle toning.',
        advantages: [
          'Improves flexibility',
          'Strengthens legs',
          'Stretches hamstrings',
          'Tones muscles',
          'Improves balance',
          'Opens hips'
        ],
        disadvantages: [
          'Avoid with low blood pressure',
          'Not suitable with neck injuries',
          'May cause dizziness',
          'Can strain if overstretched'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds each side',
        subCategories: ['Flexibility', 'Muscle Tone', 'Body Sculpting']
      },
      {
        id: 61,
        name: 'પરિવૃત્ત ત્રિકોણાસન (Parivrtta Trikonasana) - Revolved Triangle Pose',
        image: getPoseImage(61, 'Parivrtta Trikonasana'),
        description: 'A twisting pose that improves flexibility and strengthens core. Excellent for flexibility and core strength.',
        advantages: [
          'Improves flexibility',
          'Strengthens core',
          'Stretches hamstrings',
          'Tones muscles',
          'Improves balance',
          'Stimulates organs'
        ],
        disadvantages: [
          'Avoid with low blood pressure',
          'Not suitable with back injuries',
          'May cause dizziness',
          'Requires good flexibility'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds each side',
        subCategories: ['Flexibility', 'Core Strength', 'Body Sculpting']
      },
      {
        id: 62,
        name: 'વસિષ્ઠાસન (Vasisthasana) - Side Plank Pose',
        image: getPoseImage(62, 'Vasisthasana'),
        description: 'A side plank that builds core and arm strength. Excellent for core strength and muscle toning.',
        advantages: [
          'Strengthens core',
          'Builds arm strength',
          'Tones muscles',
          'Improves balance',
          'Strengthens obliques',
          'Burns calories'
        ],
        disadvantages: [
          'Avoid with wrist injuries',
          'Not suitable with shoulder problems',
          'May cause strain if held too long',
          'Requires core strength'
        ],
        difficulty: 'Intermediate',
        duration: '20-40 seconds each side',
        subCategories: ['Core Strength', 'Muscle Tone', 'Strength Building']
      }
    ],
    'age-groups': [
      {
        id: 58,
        name: 'તાડાસન (Tadasana) - Mountain Pose',
        image: getPoseImage(58, 'Tadasana'),
        description: 'A foundational standing pose perfect for all ages. Improves posture and balance. Safe for kids, teens, adults, and seniors.',
        advantages: [
          'Improves posture',
          'Strengthens thighs',
          'Promotes balance',
          'Safe for all ages',
          'Easy to learn',
          'Builds body awareness'
        ],
        disadvantages: [
          'May seem too simple',
          'Requires focus',
          'Keep feet grounded',
          'Maintain alignment'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Kids Yoga (5-12 years)', 'Teens Yoga (13-19 years)', 'Adults (20-50 years)', 'Seniors (50+ years)']
      },
      {
        id: 59,
        name: 'વૃક્ષાસન (Vrikshasana) - Tree Pose',
        image: getPoseImage(59, 'Vrikshasana'),
        description: 'A fun balancing pose perfect for kids and teens. Improves focus and balance. Can be modified for seniors.',
        advantages: [
          'Improves balance',
          'Strengthens legs',
          'Enhances focus',
          'Fun for kids',
          'Builds confidence',
          'Opens hips'
        ],
        disadvantages: [
          'Avoid with balance issues',
          'Not suitable with knee injuries',
          'May cause falls',
          'Use wall support if needed'
        ],
        difficulty: 'Beginner',
        duration: '20-40 seconds each side',
        subCategories: ['Kids Yoga (5-12 years)', 'Teens Yoga (13-19 years)', 'Adults (20-50 years)']
      },
      {
        id: 60,
        name: 'બાલાસન (Balasana) - Child\'s Pose',
        image: getPoseImage(60, 'Balasana'),
        description: 'A gentle resting pose suitable for all ages. Calms the mind and stretches the back. Perfect for kids and seniors.',
        advantages: [
          'Calms the mind',
          'Stretches back',
          'Safe for all ages',
          'Easy to do',
          'Promotes relaxation',
          'Reduces stress'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable during pregnancy',
          'May cause discomfort with tight hips',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '1-3 minutes',
        subCategories: ['Kids Yoga (5-12 years)', 'Teens Yoga (13-19 years)', 'Adults (20-50 years)', 'Seniors (50+ years)']
      },
      {
        id: 61,
        name: 'માર્જરીઆસન (Marjariasana) - Cat-Cow Pose',
        image: getPoseImage(61, 'Marjariasana'),
        description: 'A fun flowing movement perfect for kids. Warms up the spine and improves flexibility. Safe for all ages.',
        advantages: [
          'Warms up spine',
          'Improves flexibility',
          'Fun for kids',
          'Safe for all ages',
          'Reduces stress',
          'Easy to learn'
        ],
        disadvantages: [
          'Avoid with severe neck injuries',
          'May cause discomfort with wrist issues',
          'Not suitable during late pregnancy',
          'Move slowly'
        ],
        difficulty: 'Beginner',
        duration: '1-2 minutes',
        subCategories: ['Kids Yoga (5-12 years)', 'Teens Yoga (13-19 years)', 'Adults (20-50 years)', 'Seniors (50+ years)']
      },
      {
        id: 62,
        name: 'ભુજંગાસન (Bhujangasana) - Cobra Pose',
        image: getPoseImage(62, 'Bhujangasana'),
        description: 'A gentle backbend suitable for teens and adults. Strengthens the spine and opens the chest. Can be modified for seniors.',
        advantages: [
          'Strengthens spine',
          'Opens chest',
          'Improves posture',
          'Suitable for teens and adults',
          'Stretches front body',
          'Builds strength'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Not suitable during pregnancy',
          'May cause strain if done incorrectly',
          'Keep it gentle for seniors'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Teens Yoga (13-19 years)', 'Adults (20-50 years)', 'Seniors (50+ years)']
      },
      {
        id: 63,
        name: 'વીરભદ્રાસન II (Virabhadrasana II) - Warrior II',
        image: getPoseImage(63, 'Virabhadrasana II'),
        description: 'A powerful standing pose perfect for teens and adults. Builds strength and stamina. Can be modified for seniors.',
        advantages: [
          'Strengthens legs',
          'Builds stamina',
          'Improves balance',
          'Suitable for teens and adults',
          'Opens hips',
          'Builds confidence'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with high blood pressure',
          'May cause strain if overdone',
          'Use props for seniors'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds',
        subCategories: ['Teens Yoga (13-19 years)', 'Adults (20-50 years)']
      },
      {
        id: 64,
        name: 'સુખાસન (Sukhasana) - Easy Pose',
        image: getPoseImage(64, 'Sukhasana'),
        description: 'A comfortable seated pose perfect for all ages. Excellent for meditation and breathing exercises. Safe for kids and seniors.',
        advantages: [
          'Comfortable for all ages',
          'Easy to do',
          'Improves posture',
          'Calms the mind',
          'Safe for kids and seniors',
          'Enhances meditation'
        ],
        disadvantages: [
          'May cause discomfort with tight hips',
          'Use props for support',
          'Avoid with knee injuries',
          'Keep spine straight'
        ],
        difficulty: 'Beginner',
        duration: '5-30 minutes',
        subCategories: ['Kids Yoga (5-12 years)', 'Teens Yoga (13-19 years)', 'Adults (20-50 years)', 'Seniors (50+ years)']
      },
      {
        id: 65,
        name: 'અધો મુખ શ્વાનાસન (Adho Mukha Svanasana) - Downward-Facing Dog',
        image: getPoseImage(65, 'Adho Mukha Svanasana'),
        description: 'An inversion suitable for teens and adults. Strengthens the entire body. Can be modified for seniors with props.',
        advantages: [
          'Strengthens entire body',
          'Stretches hamstrings',
          'Suitable for teens and adults',
          'Improves circulation',
          'Calms the mind',
          'Builds strength'
        ],
        disadvantages: [
          'Avoid with wrist injuries',
          'Not suitable with high blood pressure',
          'May cause strain with shoulder issues',
          'Use props for seniors'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Teens Yoga (13-19 years)', 'Adults (20-50 years)']
      },
      {
        id: 66,
        name: 'વિપરીત કરણી (Viparita Karani) - Legs-Up-the-Wall Pose',
        image: getPoseImage(66, 'Viparita Karani'),
        description: 'A gentle restorative pose perfect for seniors. Relieves fatigue and improves circulation. Safe and comfortable.',
        advantages: [
          'Gentle and safe',
          'Perfect for seniors',
          'Relieves fatigue',
          'Improves circulation',
          'Reduces stress',
          'No strain on joints'
        ],
        disadvantages: [
          'Avoid with eye pressure issues',
          'Not suitable during menstruation',
          'May cause discomfort with neck issues',
          'Keep warm'
        ],
        difficulty: 'Beginner',
        duration: '5-15 minutes',
        subCategories: ['Adults (20-50 years)', 'Seniors (50+ years)']
      },
      {
        id: 67,
        name: 'સેતુ બંધાસન (Setu Bandhasana) - Bridge Pose',
        image: getPoseImage(67, 'Setu Bandhasana'),
        description: 'A gentle backbend suitable for adults and seniors. Strengthens the back and opens the chest. Can be modified easily.',
        advantages: [
          'Gentle backbend',
          'Suitable for adults and seniors',
          'Strengthens back',
          'Opens chest',
          'Improves flexibility',
          'Can be modified'
        ],
        disadvantages: [
          'Avoid with neck injuries',
          'Not suitable with severe back problems',
          'Avoid during late pregnancy',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Adults (20-50 years)', 'Seniors (50+ years)']
      },
      {
        id: 68,
        name: 'ત્રિકોણાસન (Trikonasana) - Triangle Pose',
        image: getPoseImage(68, 'Trikonasana'),
        description: 'A standing pose suitable for teens and adults. Improves flexibility and strength. Can be modified for seniors.',
        advantages: [
          'Improves flexibility',
          'Strengthens legs',
          'Suitable for teens and adults',
          'Opens hips',
          'Improves balance',
          'Can be modified'
        ],
        disadvantages: [
          'Avoid with low blood pressure',
          'Not suitable with neck injuries',
          'May cause dizziness',
          'Use props for seniors'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds each side',
        subCategories: ['Teens Yoga (13-19 years)', 'Adults (20-50 years)']
      },
      {
        id: 69,
        name: 'શવાસન (Shavasana) - Corpse Pose',
        image: getPoseImage(69, 'Shavasana'),
        description: 'The ultimate relaxation pose perfect for all ages. Essential for recovery and relaxation. Safe for everyone.',
        advantages: [
          'Perfect for all ages',
          'Promotes relaxation',
          'Reduces stress',
          'Essential for recovery',
          'Safe and comfortable',
          'No physical strain'
        ],
        disadvantages: [
          'May cause sleepiness',
          'Keep warm',
          'Not suitable if feeling unwell',
          'Practice in quiet environment'
        ],
        difficulty: 'Beginner',
        duration: '5-20 minutes',
        subCategories: ['Kids Yoga (5-12 years)', 'Teens Yoga (13-19 years)', 'Adults (20-50 years)', 'Seniors (50+ years)']
      },
      {
        id: 70,
        name: 'સૂર્ય નમસ્કાર (Surya Namaskar) - Sun Salutation',
        image: getPoseImage(70, 'Surya Namaskar'),
        description: 'A complete sequence perfect for teens and adults. Provides full-body workout. Can be simplified for seniors.',
        advantages: [
          'Full-body workout',
          'Suitable for teens and adults',
          'Improves flexibility',
          'Builds strength',
          'Boosts energy',
          'Can be modified'
        ],
        disadvantages: [
          'Avoid with severe heart conditions',
          'Not recommended during pregnancy',
          'May cause fatigue if overdone',
          'Simplify for seniors'
        ],
        difficulty: 'Intermediate',
        duration: '5-10 minutes',
        subCategories: ['Teens Yoga (13-19 years)', 'Adults (20-50 years)']
      },
      {
        id: 71,
        name: 'વજ્રાસન (Vajrasana) - Thunderbolt Pose',
        image: getPoseImage(71, 'Vajrasana'),
        description: 'A seated pose suitable for all ages. Excellent for digestion and meditation. Safe and comfortable.',
        advantages: [
          'Suitable for all ages',
          'Improves digestion',
          'Calms the mind',
          'Safe and comfortable',
          'Easy to maintain',
          'Enhances meditation'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with ankle problems',
          'May cause discomfort initially',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '5-30 minutes',
        subCategories: ['Kids Yoga (5-12 years)', 'Teens Yoga (13-19 years)', 'Adults (20-50 years)', 'Seniors (50+ years)']
      },
      {
        id: 72,
        name: 'અંજનેયાસન (Anjaneyasana) - Low Lunge',
        image: getPoseImage(72, 'Anjaneyasana'),
        description: 'A lunge pose suitable for teens and adults. Stretches hip flexors and strengthens legs. Can be modified for seniors.',
        advantages: [
          'Stretches hip flexors',
          'Strengthens legs',
          'Suitable for teens and adults',
          'Opens chest',
          'Improves flexibility',
          'Can be modified'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with hip problems',
          'May strain if overstretched',
          'Use props for seniors'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds each side',
        subCategories: ['Teens Yoga (13-19 years)', 'Adults (20-50 years)']
      }
    ],
    'women': [
      {
        id: 73,
        name: 'Baddha Konasana (Baddha Konasana) - Butterfly Pose',
        image: getPoseImage(73, 'Baddha Konasana'),
        description: 'A seated pose that helps with PCOS and menstrual health. Stretches inner thighs and improves reproductive health.',
        advantages: [
          'Helps with PCOS',
          'Improves menstrual health',
          'Stretches inner thighs',
          'Stimulates reproductive organs',
          'Improves flexibility',
          'Calms the mind'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with groin problems',
          'May cause discomfort initially',
          'Use props for support'
        ],
        difficulty: 'Beginner',
        duration: '1-5 minutes',
        subCategories: ['PCOS', 'Menstrual Health', 'Hormonal Balance', 'Pelvic Health']
      },
      {
        id: 74,
        name: 'Supta Baddha Konasana (Supta Baddha Konasana) - Reclining Bound Angle Pose',
        image: getPoseImage(74, 'Supta Baddha Konasana'),
        description: 'A restorative pose that helps with PCOS and hormonal balance. Calms the nervous system and reduces stress.',
        advantages: [
          'Helps with PCOS',
          'Improves hormonal balance',
          'Stretches inner thighs',
          'Calms nervous system',
          'Reduces stress',
          'Improves circulation'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with groin injuries',
          'May cause discomfort with tight hips',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '3-10 minutes',
        subCategories: ['PCOS', 'Hormonal Balance', 'Menstrual Health', 'Pelvic Health']
      },
      {
        id: 75,
        name: 'વિપરીત કરણી (Viparita Karani) - Legs-Up-the-Wall Pose',
        image: getPoseImage(75, 'Viparita Karani'),
        description: 'A gentle inversion that helps with menstrual cramps and reduces stress. Excellent for pregnancy and postnatal recovery.',
        advantages: [
          'Relieves menstrual cramps',
          'Reduces stress',
          'Gentle and safe',
          'Improves circulation',
          'Calms nervous system',
          'Suitable for pregnancy (with modifications)'
        ],
        disadvantages: [
          'Avoid with eye pressure issues',
          'Not suitable during active menstruation',
          'May cause discomfort with neck issues',
          'Avoid if feeling dizzy'
        ],
        difficulty: 'Beginner',
        duration: '5-15 minutes',
        subCategories: ['Menstrual Health', 'Pregnancy Yoga', 'Postnatal Yoga', 'Hormonal Balance']
      },
      {
        id: 76,
        name: 'માલાસન (Malasana) - Garland Pose',
        image: getPoseImage(76, 'Malasana'),
        description: 'A squatting pose that strengthens pelvic floor and helps with pregnancy. Excellent for pelvic health and hormonal balance.',
        advantages: [
          'Strengthens pelvic floor',
          'Helps with pregnancy',
          'Opens hips',
          'Improves pelvic health',
          'Stretches groin',
          'Aids in delivery preparation'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with ankle problems',
          'May cause discomfort with tight hips',
          'Use props for support'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Pregnancy Yoga', 'Pelvic Health', 'Hormonal Balance']
      },
      {
        id: 77,
        name: 'Cat-Cow Pose (Cat-Cow Pose) - Marjariasana-Bitilasana',
        image: getPoseImage(77, 'Cat-Cow Pose'),
        description: 'A gentle flowing movement safe for pregnancy. Relieves back pain and improves spinal flexibility. Perfect for all stages.',
        advantages: [
          'Safe for pregnancy',
          'Relieves back pain',
          'Improves spinal flexibility',
          'Gentle and safe',
          'Reduces stress',
          'Can be done throughout pregnancy'
        ],
        disadvantages: [
          'Avoid with severe neck injuries',
          'May cause discomfort with wrist issues',
          'Move slowly',
          'Stop if any discomfort'
        ],
        difficulty: 'Beginner',
        duration: '1-2 minutes',
        subCategories: ['Pregnancy Yoga', 'Postnatal Yoga', 'Menstrual Health']
      },
      {
        id: 78,
        name: 'બાલાસન (Balasana) - Child\'s Pose',
        image: getPoseImage(78, 'Balasana'),
        description: 'A restorative pose that helps with menstrual cramps and reduces stress. Can be modified for pregnancy.',
        advantages: [
          'Relieves menstrual cramps',
          'Reduces stress',
          'Calms the mind',
          'Stretches back',
          'Promotes relaxation',
          'Can be modified for pregnancy'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable during active menstruation',
          'May cause discomfort with tight hips',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '1-3 minutes',
        subCategories: ['Menstrual Health', 'Pregnancy Yoga', 'Hormonal Balance']
      },
      {
        id: 79,
        name: 'સેતુ બંધાસન (Setu Bandhasana) - Bridge Pose',
        image: getPoseImage(79, 'Setu Bandhasana'),
        description: 'A gentle backbend that helps with hormonal balance and reduces stress. Excellent for menopause symptoms.',
        advantages: [
          'Helps with hormonal balance',
          'Reduces stress',
          'Opens chest',
          'Strengthens back',
          'Helps with menopause',
          'Improves mood'
        ],
        disadvantages: [
          'Avoid with neck injuries',
          'Not suitable with severe back problems',
          'Avoid during late pregnancy',
          'Keep it gentle'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Menopause', 'Hormonal Balance', 'Postnatal Yoga']
      },
      {
        id: 80,
        name: 'Supta Matsyendrasana (Supta Matsyendrasana) - Supine Spinal Twist',
        image: getPoseImage(80, 'Supta Matsyendrasana'),
        description: 'A gentle twist that helps with menstrual discomfort and improves digestion. Safe for most stages.',
        advantages: [
          'Relieves menstrual discomfort',
          'Improves digestion',
          'Stretches spine',
          'Calms nervous system',
          'Reduces stress',
          'Safe and gentle'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Not suitable during active pregnancy',
          'May cause discomfort with knee issues',
          'Keep shoulders on ground'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds each side',
        subCategories: ['Menstrual Health', 'Hormonal Balance', 'Postnatal Yoga']
      },
      {
        id: 81,
        name: 'વિપરીત કરણી (Viparita Karani) - Legs-Up-the-Wall Pose',
        image: getPoseImage(81, 'Viparita Karani'),
        description: 'A restorative pose perfect for postnatal recovery. Reduces swelling and promotes healing. Excellent for new mothers.',
        advantages: [
          'Perfect for postnatal recovery',
          'Reduces swelling',
          'Promotes healing',
          'Gentle and safe',
          'Reduces stress',
          'Improves circulation'
        ],
        disadvantages: [
          'Avoid with eye pressure issues',
          'Not suitable during active bleeding',
          'May cause discomfort with neck issues',
          'Keep warm'
        ],
        difficulty: 'Beginner',
        duration: '5-15 minutes',
        subCategories: ['Postnatal Yoga', 'Hormonal Balance', 'Pelvic Health']
      },
      {
        id: 82,
        name: 'અધો મુખ શ્વાનાસન (Adho Mukha Svanasana) - Downward-Facing Dog',
        image: getPoseImage(82, 'Adho Mukha Svanasana'),
        description: 'An inversion that helps with hormonal balance and reduces stress. Can be modified for pregnancy and postnatal.',
        advantages: [
          'Helps with hormonal balance',
          'Reduces stress',
          'Strengthens body',
          'Improves circulation',
          'Can be modified',
          'Calms the mind'
        ],
        disadvantages: [
          'Avoid with wrist injuries',
          'Not suitable with high blood pressure',
          'Modify for pregnancy',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Hormonal Balance', 'Pregnancy Yoga', 'Postnatal Yoga']
      },
      {
        id: 83,
        name: 'સુખાસન (Sukhasana) - Easy Pose',
        image: getPoseImage(83, 'Sukhasana'),
        description: 'A comfortable seated pose for meditation and breathing. Excellent for hormonal balance and stress relief.',
        advantages: [
          'Comfortable and safe',
          'Improves hormonal balance',
          'Calms the mind',
          'Reduces stress',
          'Easy to maintain',
          'Enhances meditation'
        ],
        disadvantages: [
          'May cause discomfort with tight hips',
          'Use props for support',
          'Avoid with knee injuries',
          'Keep spine straight'
        ],
        difficulty: 'Beginner',
        duration: '5-30 minutes',
        subCategories: ['Hormonal Balance', 'Menstrual Health', 'Menopause']
      },
      {
        id: 84,
        name: 'શવાસન (Shavasana) - Corpse Pose',
        image: getPoseImage(84, 'Shavasana'),
        description: 'The ultimate relaxation pose essential for women\'s health. Reduces stress and promotes hormonal balance.',
        advantages: [
          'Reduces stress',
          'Promotes hormonal balance',
          'Essential for recovery',
          'Reduces anxiety',
          'Improves sleep',
          'Calms entire system'
        ],
        disadvantages: [
          'May cause sleepiness',
          'Keep warm',
          'Not suitable if feeling unwell',
          'Practice in quiet environment'
        ],
        difficulty: 'Beginner',
        duration: '5-20 minutes',
        subCategories: ['Hormonal Balance', 'Menstrual Health', 'Menopause', 'Postnatal Yoga']
      },
      {
        id: 85,
        name: 'Uttanasana (Uttanasana) - Standing Forward Bend',
        image: getPoseImage(85, 'Uttanasana'),
        description: 'A forward fold that helps with menstrual cramps and reduces stress. Can be modified for pregnancy.',
        advantages: [
          'Relieves menstrual cramps',
          'Reduces stress',
          'Stretches back',
          'Calms the mind',
          'Can be modified',
          'Improves circulation'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Not suitable with high blood pressure',
          'Modify for pregnancy',
          'May cause dizziness'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Menstrual Health', 'Hormonal Balance', 'Pregnancy Yoga']
      },
      {
        id: 86,
        name: 'વીરાસન (Virasana) - Hero Pose',
        image: getPoseImage(86, 'Virasana'),
        description: 'A seated pose that helps with pelvic health and improves digestion. Excellent for hormonal balance.',
        advantages: [
          'Improves pelvic health',
          'Helps with hormonal balance',
          'Improves digestion',
          'Stretches thighs',
          'Calms the mind',
          'Enhances meditation'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with ankle problems',
          'May cause discomfort initially',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '5-30 minutes',
        subCategories: ['Pelvic Health', 'Hormonal Balance', 'Menstrual Health']
      },
      {
        id: 87,
        name: 'Anulom Vilom Pranayama (Anulom Vilom Pranayama) - Alternate Nostril Breathing',
        image: getPoseImage(87, 'Anulom Vilom Pranayama'),
        description: 'A balancing breathing technique that helps with hormonal balance and reduces stress. Excellent for menopause.',
        advantages: [
          'Helps with hormonal balance',
          'Reduces stress',
          'Balances emotions',
          'Helps with menopause',
          'Calms the mind',
          'Improves focus'
        ],
        disadvantages: [
          'Avoid with blocked nostrils',
          'Not suitable during illness',
          'May cause dizziness if done incorrectly',
          'Requires proper technique'
        ],
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        subCategories: ['Hormonal Balance', 'Menopause', 'Menstrual Health']
      }
    ],
    'lifestyle': [
      {
        id: 88,
        name: 'Desk Yoga - Seated Cat-Cow (Desk Yoga - Seated Cat-Cow) - Desk Yoga - Seated Cat-Cow',
        image: getPoseImage(88, 'Desk Yoga - Seated Cat-Cow'),
        description: 'A seated version of cat-cow perfect for office workers. Relieves back and neck tension from desk work.',
        advantages: [
          'Perfect for office workers',
          'Relieves back tension',
          'Relieves neck pain',
          'Can be done at desk',
          'Quick and easy',
          'Improves posture'
        ],
        disadvantages: [
          'May look unusual at office',
          'Requires some space',
          'Move slowly',
          'Stop if any discomfort'
        ],
        difficulty: 'Beginner',
        duration: '1-2 minutes',
        subCategories: ['Office Workers', 'Desk Yoga', 'Daily Routine', 'Quick Sessions']
      },
      {
        id: 89,
        name: 'Desk Yoga - Seated Spinal Twist (Desk Yoga - Seated Spinal Twist) - Desk Yoga - Seated Spinal Twist',
        image: getPoseImage(89, 'Desk Yoga - Seated Spinal Twist'),
        description: 'A seated twist perfect for office breaks. Relieves back stiffness and improves spinal mobility.',
        advantages: [
          'Perfect for office',
          'Relieves back stiffness',
          'Improves spinal mobility',
          'Quick to do',
          'Can be done at desk',
          'Reduces fatigue'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Move slowly',
          'Keep spine straight',
          'Stop if any pain'
        ],
        difficulty: 'Beginner',
        duration: '30 seconds each side',
        subCategories: ['Office Workers', 'Desk Yoga', 'Daily Routine', 'Quick Sessions']
      },
      {
        id: 90,
        name: 'સૂર્ય નમસ્કાર (Surya Namaskar) - Sun Salutation',
        image: getPoseImage(90, 'Surya Namaskar'),
        description: 'A complete sequence perfect for morning routine. Energizes the body and prepares for the day. Excellent for athletes.',
        advantages: [
          'Perfect for morning',
          'Energizes body',
          'Full-body workout',
          'Excellent for athletes',
          'Boosts energy',
          'Improves flexibility'
        ],
        disadvantages: [
          'Avoid with severe heart conditions',
          'Not recommended during pregnancy',
          'May cause fatigue if overdone',
          'Requires some space'
        ],
        difficulty: 'Intermediate',
        duration: '5-10 minutes',
        subCategories: ['Morning Yoga', 'Athletes', 'Daily Routine']
      },
      {
        id: 91,
        name: 'વિપરીત કરણી (Viparita Karani) - Legs-Up-the-Wall Pose',
        image: getPoseImage(91, 'Viparita Karani'),
        description: 'A restorative pose perfect for evening routine. Relieves fatigue and promotes relaxation. Excellent after work.',
        advantages: [
          'Perfect for evening',
          'Relieves fatigue',
          'Promotes relaxation',
          'Reduces stress',
          'Improves sleep',
          'No physical strain'
        ],
        disadvantages: [
          'Avoid with eye pressure issues',
          'Not suitable during menstruation',
          'May cause discomfort with neck issues',
          'Keep warm'
        ],
        difficulty: 'Beginner',
        duration: '5-15 minutes',
        subCategories: ['Evening Yoga', 'Daily Routine', 'Office Workers']
      },
      {
        id: 92,
        name: 'તાડાસન (Tadasana) - Mountain Pose',
        image: getPoseImage(92, 'Tadasana'),
        description: 'A foundational pose perfect for daily routine. Improves posture and body awareness. Can be done anywhere.',
        advantages: [
          'Can be done anywhere',
          'Improves posture',
          'Quick and easy',
          'Perfect for daily routine',
          'Builds body awareness',
          'No space required'
        ],
        disadvantages: [
          'May seem too simple',
          'Requires focus',
          'Keep feet grounded',
          'Maintain alignment'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Daily Routine', 'Quick Sessions', 'Office Workers', 'Travel Yoga']
      },
      {
        id: 93,
        name: 'બાલાસન (Balasana) - Child\'s Pose',
        image: getPoseImage(93, 'Balasana'),
        description: 'A restorative pose perfect for quick breaks. Calms the mind and relieves stress. Excellent for travel.',
        advantages: [
          'Perfect for quick breaks',
          'Calms the mind',
          'Relieves stress',
          'Can be done anywhere',
          'Quick and easy',
          'Excellent for travel'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable during pregnancy',
          'May cause discomfort with tight hips',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '1-3 minutes',
        subCategories: ['Quick Sessions', 'Travel Yoga', 'Daily Routine', 'Office Workers']
      },
      {
        id: 94,
        name: 'અધો મુખ શ્વાનાસન (Adho Mukha Svanasana) - Downward-Facing Dog',
        image: getPoseImage(94, 'Adho Mukha Svanasana'),
        description: 'An inversion perfect for athletes. Strengthens the entire body and improves flexibility. Excellent for warm-up.',
        advantages: [
          'Perfect for athletes',
          'Strengthens entire body',
          'Improves flexibility',
          'Excellent warm-up',
          'Energizes body',
          'Improves circulation'
        ],
        disadvantages: [
          'Avoid with wrist injuries',
          'Not suitable with high blood pressure',
          'May cause strain with shoulder issues',
          'Requires some space'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Athletes', 'Morning Yoga', 'Daily Routine']
      },
      {
        id: 95,
        name: 'વીરભદ્રાસન II (Virabhadrasana II) - Warrior II',
        image: getPoseImage(95, 'Virabhadrasana II'),
        description: 'A powerful standing pose excellent for athletes. Builds strength and stamina. Perfect for training.',
        advantages: [
          'Excellent for athletes',
          'Builds strength',
          'Builds stamina',
          'Improves balance',
          'Strengthens legs',
          'Perfect for training'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with high blood pressure',
          'May cause strain if overdone',
          'Requires good physical condition'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds',
        subCategories: ['Athletes', 'Daily Routine', 'Morning Yoga']
      },
      {
        id: 96,
        name: 'શવાસન (Shavasana) - Corpse Pose',
        image: getPoseImage(96, 'Shavasana'),
        description: 'The ultimate relaxation pose perfect for evening routine. Essential for recovery and rest. Excellent after work.',
        advantages: [
          'Perfect for evening',
          'Promotes relaxation',
          'Essential for recovery',
          'Reduces stress',
          'Improves sleep',
          'No physical effort'
        ],
        disadvantages: [
          'May cause sleepiness',
          'Keep warm',
          'Not suitable if feeling unwell',
          'Practice in quiet environment'
        ],
        difficulty: 'Beginner',
        duration: '5-20 minutes',
        subCategories: ['Evening Yoga', 'Daily Routine', 'Office Workers']
      },
      {
        id: 97,
        name: 'માર્જરીઆસન (Marjariasana) - Cat-Cow Pose',
        image: getPoseImage(97, 'Marjariasana'),
        description: 'A gentle flowing movement perfect for morning routine. Warms up the spine and energizes the body.',
        advantages: [
          'Perfect for morning',
          'Warms up spine',
          'Energizes body',
          'Quick and easy',
          'Improves flexibility',
          'Reduces stiffness'
        ],
        disadvantages: [
          'Avoid with severe neck injuries',
          'May cause discomfort with wrist issues',
          'Move slowly',
          'Stop if any discomfort'
        ],
        difficulty: 'Beginner',
        duration: '1-2 minutes',
        subCategories: ['Morning Yoga', 'Daily Routine', 'Quick Sessions', 'Office Workers']
      },
      {
        id: 98,
        name: 'સુખાસન (Sukhasana) - Easy Pose',
        image: getPoseImage(98, 'Sukhasana'),
        description: 'A comfortable seated pose perfect for travel. Can be done anywhere. Excellent for meditation and breathing.',
        advantages: [
          'Perfect for travel',
          'Can be done anywhere',
          'Comfortable',
          'Easy to maintain',
          'Enhances meditation',
          'No space required'
        ],
        disadvantages: [
          'May cause discomfort with tight hips',
          'Use props for support',
          'Avoid with knee injuries',
          'Keep spine straight'
        ],
        difficulty: 'Beginner',
        duration: '5-30 minutes',
        subCategories: ['Travel Yoga', 'Daily Routine', 'Quick Sessions']
      },
      {
        id: 99,
        name: 'Anulom Vilom Pranayama (Anulom Vilom Pranayama) - Alternate Nostril Breathing',
        image: getPoseImage(99, 'Anulom Vilom Pranayama'),
        description: 'A breathing technique perfect for quick sessions. Calms the mind and reduces stress. Can be done anywhere.',
        advantages: [
          'Perfect for quick sessions',
          'Calms the mind',
          'Reduces stress',
          'Can be done anywhere',
          'Quick and effective',
          'No space required'
        ],
        disadvantages: [
          'Avoid with blocked nostrils',
          'Not suitable during illness',
          'May cause dizziness if done incorrectly',
          'Requires proper technique'
        ],
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        subCategories: ['Quick Sessions', 'Daily Routine', 'Travel Yoga', 'Office Workers']
      },
      {
        id: 100,
        name: 'Utkatasana (Utkatasana) - Chair Pose',
        image: getPoseImage(100, 'Utkatasana'),
        description: 'A strengthening pose perfect for athletes. Builds leg strength and endurance. Excellent for training.',
        advantages: [
          'Perfect for athletes',
          'Builds leg strength',
          'Builds endurance',
          'Improves balance',
          'Tones muscles',
          'Excellent for training'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with low blood pressure',
          'May cause strain if held too long',
          'Can be challenging'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds',
        subCategories: ['Athletes', 'Daily Routine', 'Morning Yoga']
      },
      {
        id: 101,
        name: 'ત્રિકોણાસન (Trikonasana) - Triangle Pose',
        image: getPoseImage(101, 'Trikonasana'),
        description: 'A standing pose perfect for daily routine. Improves flexibility and strength. Can be done in small spaces.',
        advantages: [
          'Perfect for daily routine',
          'Improves flexibility',
          'Strengthens legs',
          'Can be done in small spaces',
          'Improves balance',
          'Opens hips'
        ],
        disadvantages: [
          'Avoid with low blood pressure',
          'Not suitable with neck injuries',
          'May cause dizziness',
          'Requires some space'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds each side',
        subCategories: ['Daily Routine', 'Morning Yoga', 'Athletes']
      },
      {
        id: 102,
        name: 'વિપરીત કરણી (Viparita Karani) - Legs-Up-the-Wall Pose',
        image: getPoseImage(102, 'Viparita Karani'),
        description: 'A restorative pose perfect for evening routine. Relieves fatigue and promotes sleep. Excellent after long day.',
        advantages: [
          'Perfect for evening',
          'Relieves fatigue',
          'Promotes sleep',
          'Reduces stress',
          'No physical strain',
          'Excellent after work'
        ],
        disadvantages: [
          'Avoid with eye pressure issues',
          'Not suitable during menstruation',
          'May cause discomfort with neck issues',
          'Keep warm'
        ],
        difficulty: 'Beginner',
        duration: '5-15 minutes',
        subCategories: ['Evening Yoga', 'Daily Routine', 'Office Workers']
      }
    ],
    'meditation': [
      {
        id: 103,
        name: 'Padmasana (Padmasana) - Lotus Pose',
        image: getPoseImage(103, 'Padmasana'),
        description: 'The classic meditation pose that promotes mental clarity and focus. Ideal for deep meditation practice.',
        advantages: [
          'Perfect for meditation',
          'Improves focus',
          'Calms the mind',
          'Opens hips',
          'Improves posture',
          'Enhances concentration'
        ],
        disadvantages: [
          'Requires flexible hips',
          'Can strain knees if forced',
          'Not suitable for knee injuries',
          'May cause ankle discomfort',
          'Difficult for beginners'
        ],
        difficulty: 'Intermediate',
        duration: '5-30 minutes',
        subCategories: ['Meditation', 'Mindfulness', 'Focus & Concentration', 'Chakra Balancing']
      },
      {
        id: 104,
        name: 'સુખાસન (Sukhasana) - Easy Pose',
        image: getPoseImage(104, 'Sukhasana'),
        description: 'A comfortable seated pose perfect for beginners. Excellent for meditation and breathing exercises.',
        advantages: [
          'Perfect for beginners',
          'Comfortable',
          'Easy to maintain',
          'Enhances meditation',
          'Calms the mind',
          'Improves focus'
        ],
        disadvantages: [
          'May cause discomfort with tight hips',
          'Use props for support',
          'Avoid with knee injuries',
          'Keep spine straight'
        ],
        difficulty: 'Beginner',
        duration: '5-30 minutes',
        subCategories: ['Meditation', 'Mindfulness', 'Breathing Exercises', 'Relaxation Techniques']
      },
      {
        id: 105,
        name: 'વીરાસન (Virasana) - Hero Pose',
        image: getPoseImage(105, 'Virasana'),
        description: 'A seated pose that calms the mind and improves focus. Excellent for meditation and pranayama practice.',
        advantages: [
          'Calms the mind',
          'Improves focus',
          'Enhances meditation',
          'Stretches thighs',
          'Improves digestion',
          'Reduces stress'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with ankle problems',
          'May cause discomfort initially',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '5-30 minutes',
        subCategories: ['Meditation', 'Mindfulness', 'Breathing Exercises', 'Chakra Balancing']
      },
      {
        id: 106,
        name: 'Anulom Vilom Pranayama (Anulom Vilom Pranayama) - Alternate Nostril Breathing',
        image: getPoseImage(106, 'Anulom Vilom Pranayama'),
        description: 'A balancing breathing technique that calms the mind and enhances meditation. Excellent for chakra balancing.',
        advantages: [
          'Calms the mind',
          'Enhances meditation',
          'Balances chakras',
          'Improves focus',
          'Reduces stress',
          'Balances nervous system'
        ],
        disadvantages: [
          'Avoid with blocked nostrils',
          'Not suitable during illness',
          'May cause dizziness if done incorrectly',
          'Requires proper technique'
        ],
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        subCategories: ['Breathing Exercises', 'Chakra Balancing', 'Meditation', 'Mindfulness']
      },
      {
        id: 107,
        name: 'Bhramari Pranayama (Bhramari Pranayama) - Bee Breath',
        image: getPoseImage(107, 'Bhramari Pranayama'),
        description: 'A calming breathing technique that promotes deep relaxation. Excellent for meditation and energy healing.',
        advantages: [
          'Promotes deep relaxation',
          'Calms the mind',
          'Enhances meditation',
          'Reduces stress',
          'Improves focus',
          'Energy healing'
        ],
        disadvantages: [
          'Avoid with ear infections',
          'Not suitable with severe sinus issues',
          'May cause discomfort initially',
          'Practice in quiet environment'
        ],
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        subCategories: ['Breathing Exercises', 'Meditation', 'Relaxation Techniques', 'Energy Healing']
      },
      {
        id: 108,
        name: 'Ujjayi Pranayama (Ujjayi Pranayama) - Victorious Breath',
        image: getPoseImage(108, 'Ujjayi Pranayama'),
        description: 'A calming breathing technique that enhances focus and meditation. Excellent for mindfulness practice.',
        advantages: [
          'Enhances focus',
          'Improves meditation',
          'Calms the mind',
          'Reduces stress',
          'Enhances concentration',
          'Mindfulness practice'
        ],
        disadvantages: [
          'Avoid with high blood pressure',
          'Not suitable with heart conditions',
          'May cause dizziness',
          'Requires proper technique'
        ],
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        subCategories: ['Breathing Exercises', 'Mindfulness', 'Meditation', 'Focus & Concentration']
      },
      {
        id: 109,
        name: 'શવાસન (Shavasana) - Corpse Pose',
        image: getPoseImage(109, 'Shavasana'),
        description: 'The ultimate relaxation pose essential for meditation practice. Promotes deep relaxation and energy healing.',
        advantages: [
          'Essential for meditation',
          'Promotes deep relaxation',
          'Energy healing',
          'Reduces stress',
          'Calms entire system',
          'Enhances recovery'
        ],
        disadvantages: [
          'May cause sleepiness',
          'Keep warm',
          'Not suitable if feeling unwell',
          'Practice in quiet environment'
        ],
        difficulty: 'Beginner',
        duration: '5-20 minutes',
        subCategories: ['Meditation', 'Relaxation Techniques', 'Energy Healing', 'Chakra Balancing']
      },
      {
        id: 110,
        name: 'વિપરીત કરણી (Viparita Karani) - Legs-Up-the-Wall Pose',
        image: getPoseImage(110, 'Viparita Karani'),
        description: 'A restorative pose that calms the nervous system. Excellent for meditation preparation and relaxation.',
        advantages: [
          'Calms nervous system',
          'Prepares for meditation',
          'Promotes relaxation',
          'Reduces stress',
          'Improves focus',
          'Energy healing'
        ],
        disadvantages: [
          'Avoid with eye pressure issues',
          'Not suitable during menstruation',
          'May cause discomfort with neck issues',
          'Keep warm'
        ],
        difficulty: 'Beginner',
        duration: '5-15 minutes',
        subCategories: ['Meditation', 'Relaxation Techniques', 'Energy Healing', 'Chakra Balancing']
      },
      {
        id: 111,
        name: 'Yoga Nidra (Yoga Nidra) - Yogic Sleep',
        image: getPoseImage(111, 'Yoga Nidra'),
        description: 'A deep relaxation practice that promotes meditation and energy healing. Excellent for chakra balancing.',
        advantages: [
          'Deep relaxation',
          'Promotes meditation',
          'Energy healing',
          'Chakra balancing',
          'Reduces stress',
          'Enhances recovery'
        ],
        disadvantages: [
          'May cause deep sleep',
          'Practice in quiet environment',
          'Not suitable if very tired',
          'Keep warm'
        ],
        difficulty: 'Beginner',
        duration: '20-45 minutes',
        subCategories: ['Meditation', 'Relaxation Techniques', 'Energy Healing', 'Chakra Balancing']
      },
      {
        id: 112,
        name: 'Kapalbhati Pranayama (Kapalbhati Pranayama) - Skull Shining Breath',
        image: getPoseImage(112, 'Kapalbhati Pranayama'),
        description: 'A cleansing breathing technique that enhances focus and meditation. Excellent for chakra balancing.',
        advantages: [
          'Enhances focus',
          'Improves meditation',
          'Chakra balancing',
          'Cleanses system',
          'Boosts energy',
          'Improves concentration'
        ],
        disadvantages: [
          'Avoid with high blood pressure',
          'Not suitable with heart problems',
          'Avoid during pregnancy',
          'May cause dizziness',
          'Not for beginners'
        ],
        difficulty: 'Intermediate',
        duration: '2-5 minutes',
        subCategories: ['Breathing Exercises', 'Chakra Balancing', 'Meditation', 'Energy Healing']
      },
      {
        id: 113,
        name: 'Nadi Shodhana (Nadi Shodhana) - Alternate Nostril Breathing',
        image: getPoseImage(113, 'Nadi Shodhana'),
        description: 'A balancing breathing technique perfect for meditation. Balances chakras and enhances energy healing.',
        advantages: [
          'Perfect for meditation',
          'Balances chakras',
          'Energy healing',
          'Calms the mind',
          'Enhances focus',
          'Balances nervous system'
        ],
        disadvantages: [
          'Avoid with blocked nostrils',
          'Not suitable during illness',
          'May cause dizziness if done incorrectly',
          'Requires proper technique'
        ],
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        subCategories: ['Breathing Exercises', 'Chakra Balancing', 'Meditation', 'Energy Healing']
      },
      {
        id: 114,
        name: 'Sitali Pranayama (Sitali Pranayama) - Cooling Breath',
        image: getPoseImage(114, 'Sitali Pranayama'),
        description: 'A cooling breathing technique that calms the mind and enhances meditation. Excellent for relaxation.',
        advantages: [
          'Calms the mind',
          'Enhances meditation',
          'Promotes relaxation',
          'Cools the body',
          'Reduces stress',
          'Improves focus'
        ],
        disadvantages: [
          'Avoid in cold weather',
          'Not suitable with respiratory issues',
          'May cause discomfort initially',
          'Practice in comfortable temperature'
        ],
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        subCategories: ['Breathing Exercises', 'Relaxation Techniques', 'Meditation', 'Mindfulness']
      },
      {
        id: 115,
        name: 'Bhastrika Pranayama (Bhastrika Pranayama) - Bellows Breath',
        image: getPoseImage(115, 'Bhastrika Pranayama'),
        description: 'A powerful breathing technique that enhances energy and meditation. Excellent for chakra balancing.',
        advantages: [
          'Enhances energy',
          'Improves meditation',
          'Chakra balancing',
          'Boosts energy',
          'Improves focus',
          'Energy healing'
        ],
        disadvantages: [
          'Avoid with high blood pressure',
          'Not suitable with heart conditions',
          'May cause dizziness',
          'Avoid during pregnancy',
          'Not for beginners'
        ],
        difficulty: 'Intermediate',
        duration: '2-5 minutes',
        subCategories: ['Breathing Exercises', 'Chakra Balancing', 'Energy Healing', 'Meditation']
      },
      {
        id: 116,
        name: 'વજ્રાસન (Vajrasana) - Thunderbolt Pose',
        image: getPoseImage(116, 'Vajrasana'),
        description: 'A seated pose perfect for meditation and pranayama. Calms the mind and enhances focus.',
        advantages: [
          'Perfect for meditation',
          'Calms the mind',
          'Enhances focus',
          'Improves digestion',
          'Strengthens thighs',
          'Aids in pranayama'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with ankle problems',
          'May cause discomfort initially',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '5-30 minutes',
        subCategories: ['Meditation', 'Breathing Exercises', 'Mindfulness', 'Chakra Balancing']
      },
      {
        id: 117,
        name: 'Ardha Padmasana (Ardha Padmasana) - Half Lotus Pose',
        image: getPoseImage(117, 'Ardha Padmasana'),
        description: 'A modified lotus pose perfect for meditation. Easier than full lotus but still effective for practice.',
        advantages: [
          'Perfect for meditation',
          'Easier than full lotus',
          'Improves focus',
          'Opens hips',
          'Improves posture',
          'Enhances concentration'
        ],
        disadvantages: [
          'Requires some hip flexibility',
          'Can strain knees if forced',
          'Not suitable for knee injuries',
          'May cause discomfort initially'
        ],
        difficulty: 'Intermediate',
        duration: '5-30 minutes',
        subCategories: ['Meditation', 'Mindfulness', 'Focus & Concentration', 'Chakra Balancing']
      }
    ],
    'programs': [
      {
        id: 118,
        name: 'તાડાસન (Tadasana) - Mountain Pose',
        image: getPoseImage(118, 'Tadasana'),
        description: 'A foundational pose perfect for beginner courses. Improves posture and body awareness. Essential for all programs.',
        advantages: [
          'Perfect for beginners',
          'Improves posture',
          'Builds foundation',
          'Essential for all programs',
          'Easy to learn',
          'Builds body awareness'
        ],
        disadvantages: [
          'May seem too simple',
          'Requires focus',
          'Keep feet grounded',
          'Maintain alignment'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Beginner Course', 'Online Programs', 'Offline Classes', '7-Day Challenge']
      },
      {
        id: 119,
        name: 'સૂર્ય નમસ્કાર (Surya Namaskar) - Sun Salutation',
        image: getPoseImage(119, 'Surya Namaskar'),
        description: 'A complete sequence perfect for 7-day and 30-day challenges. Provides full-body workout and transformation.',
        advantages: [
          'Perfect for challenges',
          'Full-body workout',
          'Transformation program',
          'Improves flexibility',
          'Builds strength',
          'Boosts energy'
        ],
        disadvantages: [
          'Avoid with severe heart conditions',
          'Not recommended during pregnancy',
          'May cause fatigue if overdone',
          'Requires good physical condition'
        ],
        difficulty: 'Intermediate',
        duration: '5-10 minutes',
        subCategories: ['7-Day Challenge', '30-Day Transformation', 'Online Programs', 'Offline Classes']
      },
      {
        id: 120,
        name: 'Virabhadrasana Series (Virabhadrasana Series) - Warrior Poses',
        image: getPoseImage(120, 'Virabhadrasana Series'),
        description: 'A series of warrior poses perfect for advanced training. Builds strength and stamina. Excellent for transformation programs.',
        advantages: [
          'Perfect for advanced training',
          'Builds strength',
          'Builds stamina',
          'Transformation program',
          'Improves balance',
          'Strengthens entire body'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with high blood pressure',
          'May cause strain if overdone',
          'Requires good physical condition'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds each',
        subCategories: ['Advanced Training', '30-Day Transformation', 'Offline Classes']
      },
      {
        id: 121,
        name: 'બાલાસન (Balasana) - Child\'s Pose',
        image: getPoseImage(121, 'Balasana'),
        description: 'A restorative pose essential for all programs. Promotes recovery and relaxation. Perfect for beginner courses.',
        advantages: [
          'Essential for all programs',
          'Perfect for beginners',
          'Promotes recovery',
          'Promotes relaxation',
          'Calms the mind',
          'Reduces stress'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable during pregnancy',
          'May cause discomfort with tight hips',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '1-3 minutes',
        subCategories: ['Beginner Course', 'Online Programs', 'Offline Classes', '7-Day Challenge']
      },
      {
        id: 122,
        name: 'અધો મુખ શ્વાનાસન (Adho Mukha Svanasana) - Downward-Facing Dog',
        image: getPoseImage(122, 'Adho Mukha Svanasana'),
        description: 'An inversion perfect for online and offline programs. Strengthens entire body and improves flexibility.',
        advantages: [
          'Perfect for programs',
          'Strengthens entire body',
          'Improves flexibility',
          'Energizes body',
          'Improves circulation',
          'Calms the mind'
        ],
        disadvantages: [
          'Avoid with wrist injuries',
          'Not suitable with high blood pressure',
          'May cause strain with shoulder issues',
          'Requires some space'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Online Programs', 'Offline Classes', '7-Day Challenge', '30-Day Transformation']
      },
      {
        id: 123,
        name: 'ભુજંગાસન (Bhujangasana) - Cobra Pose',
        image: getPoseImage(123, 'Bhujangasana'),
        description: 'A gentle backbend perfect for beginner courses. Strengthens spine and opens chest. Essential foundation pose.',
        advantages: [
          'Perfect for beginners',
          'Essential foundation',
          'Strengthens spine',
          'Opens chest',
          'Improves posture',
          'Easy to learn'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Not suitable during pregnancy',
          'May cause strain if done incorrectly',
          'Keep it gentle'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Beginner Course', 'Online Programs', 'Offline Classes', '7-Day Challenge']
      },
      {
        id: 124,
        name: 'ત્રિકોણાસન (Trikonasana) - Triangle Pose',
        image: getPoseImage(124, 'Trikonasana'),
        description: 'A standing pose perfect for transformation programs. Improves flexibility and strength. Excellent for challenges.',
        advantages: [
          'Perfect for transformation',
          'Improves flexibility',
          'Strengthens legs',
          'Excellent for challenges',
          'Improves balance',
          'Opens hips'
        ],
        disadvantages: [
          'Avoid with low blood pressure',
          'Not suitable with neck injuries',
          'May cause dizziness',
          'Requires some flexibility'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds each side',
        subCategories: ['30-Day Transformation', 'Advanced Training', 'Offline Classes']
      },
      {
        id: 125,
        name: 'Navasana (Navasana) - Boat Pose',
        image: getPoseImage(125, 'Navasana'),
        description: 'A core strengthening pose perfect for advanced training. Tones abdominal muscles and builds strength.',
        advantages: [
          'Perfect for advanced training',
          'Strengthens core',
          'Tones muscles',
          'Builds strength',
          'Improves balance',
          'Transformation program'
        ],
        disadvantages: [
          'Avoid with lower back injuries',
          'Not suitable during pregnancy',
          'May cause strain if forced',
          'Requires core strength'
        ],
        difficulty: 'Intermediate',
        duration: '20-40 seconds',
        subCategories: ['Advanced Training', '30-Day Transformation', 'Offline Classes']
      },
      {
        id: 126,
        name: 'શવાસન (Shavasana) - Corpse Pose',
        image: getPoseImage(126, 'Shavasana'),
        description: 'The ultimate relaxation pose essential for all programs. Promotes recovery and deep relaxation.',
        advantages: [
          'Essential for all programs',
          'Promotes recovery',
          'Deep relaxation',
          'Reduces stress',
          'Calms entire system',
          'Enhances transformation'
        ],
        disadvantages: [
          'May cause sleepiness',
          'Keep warm',
          'Not suitable if feeling unwell',
          'Practice in quiet environment'
        ],
        difficulty: 'Beginner',
        duration: '5-20 minutes',
        subCategories: ['Online Programs', 'Offline Classes', '7-Day Challenge', '30-Day Transformation', 'Beginner Course', 'Advanced Training']
      },
      {
        id: 127,
        name: 'વૃક્ષાસન (Vrikshasana) - Tree Pose',
        image: getPoseImage(127, 'Vrikshasana'),
        description: 'A balancing pose perfect for beginner courses. Improves focus and balance. Fun and engaging.',
        advantages: [
          'Perfect for beginners',
          'Fun and engaging',
          'Improves balance',
          'Enhances focus',
          'Builds confidence',
          'Easy to learn'
        ],
        disadvantages: [
          'Avoid with balance issues',
          'Not suitable with knee injuries',
          'May cause falls',
          'Use wall support if needed'
        ],
        difficulty: 'Beginner',
        duration: '20-40 seconds each side',
        subCategories: ['Beginner Course', 'Online Programs', 'Offline Classes', '7-Day Challenge']
      },
      {
        id: 128,
        name: 'Chaturanga Dandasana (Chaturanga Dandasana) - Four-Limbed Staff Pose',
        image: getPoseImage(128, 'Chaturanga Dandasana'),
        description: 'A challenging pose perfect for advanced training. Builds upper body and core strength. Excellent for transformation.',
        advantages: [
          'Perfect for advanced training',
          'Builds strength',
          'Transformation program',
          'Tones entire body',
          'Builds endurance',
          'Challenging and rewarding'
        ],
        disadvantages: [
          'Requires significant strength',
          'Avoid with wrist injuries',
          'Not suitable with shoulder problems',
          'Very challenging',
          'Not for beginners'
        ],
        difficulty: 'Advanced',
        duration: '10-30 seconds',
        subCategories: ['Advanced Training', '30-Day Transformation', 'Offline Classes']
      },
      {
        id: 129,
        name: 'Utkatasana (Utkatasana) - Chair Pose',
        image: getPoseImage(129, 'Utkatasana'),
        description: 'A strengthening pose perfect for challenges and transformation programs. Builds leg strength and endurance.',
        advantages: [
          'Perfect for challenges',
          'Builds strength',
          'Transformation program',
          'Improves balance',
          'Tones muscles',
          'Builds endurance'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with low blood pressure',
          'May cause strain if held too long',
          'Can be challenging'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds',
        subCategories: ['7-Day Challenge', '30-Day Transformation', 'Online Programs', 'Offline Classes']
      },
      {
        id: 130,
        name: 'સેતુ બંધાસન (Setu Bandhasana) - Bridge Pose',
        image: getPoseImage(130, 'Setu Bandhasana'),
        description: 'A gentle backbend perfect for beginner courses and online programs. Strengthens back and opens chest.',
        advantages: [
          'Perfect for beginners',
          'Online program friendly',
          'Strengthens back',
          'Opens chest',
          'Improves flexibility',
          'Easy to learn'
        ],
        disadvantages: [
          'Avoid with neck injuries',
          'Not suitable with severe back problems',
          'Avoid during late pregnancy',
          'Keep it gentle'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Beginner Course', 'Online Programs', 'Offline Classes', '7-Day Challenge']
      },
      {
        id: 131,
        name: 'માર્જરીઆસન (Marjariasana) - Cat-Cow Pose',
        image: getPoseImage(131, 'Marjariasana'),
        description: 'A gentle flowing movement perfect for all programs. Warms up the spine and improves flexibility.',
        advantages: [
          'Perfect for all programs',
          'Warms up spine',
          'Improves flexibility',
          'Easy to learn',
          'Reduces stiffness',
          'Safe for everyone'
        ],
        disadvantages: [
          'Avoid with severe neck injuries',
          'May cause discomfort with wrist issues',
          'Move slowly',
          'Stop if any discomfort'
        ],
        difficulty: 'Beginner',
        duration: '1-2 minutes',
        subCategories: ['Beginner Course', 'Online Programs', 'Offline Classes', '7-Day Challenge', '30-Day Transformation']
      },
      {
        id: 132,
        name: 'વિપરીત કરણી (Viparita Karani) - Legs-Up-the-Wall Pose',
        image: getPoseImage(132, 'Viparita Karani'),
        description: 'A restorative pose essential for all programs. Promotes recovery and relaxation. Perfect for online programs.',
        advantages: [
          'Essential for all programs',
          'Perfect for online',
          'Promotes recovery',
          'Promotes relaxation',
          'Reduces stress',
          'No physical strain'
        ],
        disadvantages: [
          'Avoid with eye pressure issues',
          'Not suitable during menstruation',
          'May cause discomfort with neck issues',
          'Keep warm'
        ],
        difficulty: 'Beginner',
        duration: '5-15 minutes',
        subCategories: ['Online Programs', 'Offline Classes', '7-Day Challenge', '30-Day Transformation', 'Beginner Course']
      }
    ],
    'levels': [
      {
        id: 133,
        name: 'તાડાસન (Tadasana) - Mountain Pose',
        image: getPoseImage(133, 'Tadasana'),
        description: 'The foundational pose for all beginners. Improves posture and body awareness. Essential starting point.',
        advantages: [
          'Perfect for beginners',
          'Essential foundation',
          'Improves posture',
          'Builds body awareness',
          'Easy to learn',
          'Safe for everyone'
        ],
        disadvantages: [
          'May seem too simple',
          'Requires focus',
          'Keep feet grounded',
          'Maintain alignment'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Beginner', 'Gentle Yoga', 'Therapeutic']
      },
      {
        id: 134,
        name: 'બાલાસન (Balasana) - Child\'s Pose',
        image: getPoseImage(134, 'Balasana'),
        description: 'A restorative pose perfect for beginners and gentle yoga. Calms the mind and promotes relaxation.',
        advantages: [
          'Perfect for beginners',
          'Gentle yoga',
          'Calms the mind',
          'Promotes relaxation',
          'Safe and comfortable',
          'Therapeutic'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable during pregnancy',
          'May cause discomfort with tight hips',
          'Use props if needed'
        ],
        difficulty: 'Beginner',
        duration: '1-3 minutes',
        subCategories: ['Beginner', 'Gentle Yoga', 'Restorative', 'Therapeutic']
      },
      {
        id: 135,
        name: 'ભુજંગાસન (Bhujangasana) - Cobra Pose',
        image: getPoseImage(135, 'Bhujangasana'),
        description: 'A gentle backbend perfect for beginners. Strengthens spine and opens chest. Can progress to intermediate.',
        advantages: [
          'Perfect for beginners',
          'Strengthens spine',
          'Opens chest',
          'Improves posture',
          'Can progress',
          'Therapeutic'
        ],
        disadvantages: [
          'Avoid with severe back injuries',
          'Not suitable during pregnancy',
          'May cause strain if done incorrectly',
          'Keep it gentle'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Beginner', 'Gentle Yoga', 'Therapeutic']
      },
      {
        id: 136,
        name: 'વીરભદ્રાસન II (Virabhadrasana II) - Warrior II',
        image: getPoseImage(136, 'Virabhadrasana II'),
        description: 'A powerful standing pose perfect for intermediate level. Builds strength and stamina. Progress from beginner.',
        advantages: [
          'Perfect for intermediate',
          'Builds strength',
          'Builds stamina',
          'Improves balance',
          'Opens hips',
          'Progress from beginner'
        ],
        disadvantages: [
          'Avoid with knee injuries',
          'Not suitable with high blood pressure',
          'May cause strain if overdone',
          'Requires foundation'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds',
        subCategories: ['Intermediate', 'Power Yoga']
      },
      {
        id: 137,
        name: 'ત્રિકોણાસન (Trikonasana) - Triangle Pose',
        image: getPoseImage(137, 'Trikonasana'),
        description: 'A standing pose perfect for intermediate level. Improves flexibility and strength. Progress from beginner poses.',
        advantages: [
          'Perfect for intermediate',
          'Improves flexibility',
          'Strengthens legs',
          'Progress from beginner',
          'Improves balance',
          'Opens hips'
        ],
        disadvantages: [
          'Avoid with low blood pressure',
          'Not suitable with neck injuries',
          'May cause dizziness',
          'Requires some flexibility'
        ],
        difficulty: 'Intermediate',
        duration: '30-60 seconds each side',
        subCategories: ['Intermediate', 'Power Yoga']
      },
      {
        id: 138,
        name: 'Navasana (Navasana) - Boat Pose',
        image: getPoseImage(138, 'Navasana'),
        description: 'A core strengthening pose perfect for intermediate level. Builds core strength and improves balance.',
        advantages: [
          'Perfect for intermediate',
          'Strengthens core',
          'Improves balance',
          'Tones muscles',
          'Builds strength',
          'Progress from beginner'
        ],
        disadvantages: [
          'Avoid with lower back injuries',
          'Not suitable during pregnancy',
          'May cause strain if forced',
          'Requires core strength'
        ],
        difficulty: 'Intermediate',
        duration: '20-40 seconds',
        subCategories: ['Intermediate', 'Power Yoga']
      },
      {
        id: 139,
        name: 'Chaturanga Dandasana (Chaturanga Dandasana) - Four-Limbed Staff Pose',
        image: getPoseImage(139, 'Chaturanga Dandasana'),
        description: 'A challenging pose perfect for advanced level. Builds upper body and core strength. Requires significant strength.',
        advantages: [
          'Perfect for advanced',
          'Builds strength',
          'Tones entire body',
          'Builds endurance',
          'Challenging',
          'Requires skill'
        ],
        disadvantages: [
          'Requires significant strength',
          'Avoid with wrist injuries',
          'Not suitable with shoulder problems',
          'Very challenging',
          'Not for beginners'
        ],
        difficulty: 'Advanced',
        duration: '10-30 seconds',
        subCategories: ['Advanced', 'Expert', 'Power Yoga']
      },
      {
        id: 140,
        name: 'Adho Mukha Vrksasana (Adho Mukha Vrksasana) - Handstand',
        image: getPoseImage(140, 'Adho Mukha Vrksasana'),
        description: 'An advanced inversion perfect for expert level. Builds upper body strength and improves balance. Very challenging.',
        advantages: [
          'Perfect for expert',
          'Builds upper body strength',
          'Improves balance',
          'Tones entire body',
          'Builds confidence',
          'Very challenging'
        ],
        disadvantages: [
          'Requires significant strength',
          'Avoid with wrist injuries',
          'Not suitable with high blood pressure',
          'Very challenging',
          'Requires proper technique',
          'Not for beginners'
        ],
        difficulty: 'Expert',
        duration: '10-30 seconds',
        subCategories: ['Expert', 'Advanced', 'Power Yoga']
      },
      {
        id: 141,
        name: 'Urdhva Dhanurasana (Urdhva Dhanurasana) - Wheel Pose',
        image: getPoseImage(141, 'Urdhva Dhanurasana'),
        description: 'An advanced backbend perfect for expert level. Requires significant flexibility and strength. Very challenging.',
        advantages: [
          'Perfect for expert',
          'Builds strength',
          'Improves flexibility',
          'Opens chest',
          'Tones entire body',
          'Very challenging'
        ],
        disadvantages: [
          'Requires significant flexibility',
          'Avoid with back injuries',
          'Not suitable with high blood pressure',
          'Very challenging',
          'Requires proper technique',
          'Not for beginners'
        ],
        difficulty: 'Expert',
        duration: '10-30 seconds',
        subCategories: ['Expert', 'Advanced', 'Power Yoga']
      },
      {
        id: 142,
        name: 'વિપરીત કરણી (Viparita Karani) - Legs-Up-the-Wall Pose',
        image: getPoseImage(142, 'Viparita Karani'),
        description: 'A restorative pose perfect for gentle and therapeutic yoga. Promotes relaxation and recovery. Safe for all levels.',
        advantages: [
          'Perfect for gentle yoga',
          'Therapeutic',
          'Restorative',
          'Promotes relaxation',
          'Safe for all levels',
          'No physical strain'
        ],
        disadvantages: [
          'Avoid with eye pressure issues',
          'Not suitable during menstruation',
          'May cause discomfort with neck issues',
          'Keep warm'
        ],
        difficulty: 'Beginner',
        duration: '5-15 minutes',
        subCategories: ['Gentle Yoga', 'Restorative', 'Therapeutic', 'Beginner']
      },
      {
        id: 143,
        name: 'શવાસન (Shavasana) - Corpse Pose',
        image: getPoseImage(143, 'Shavasana'),
        description: 'The ultimate relaxation pose essential for all levels. Promotes deep relaxation and recovery.',
        advantages: [
          'Essential for all levels',
          'Promotes deep relaxation',
          'Promotes recovery',
          'Reduces stress',
          'Calms entire system',
          'Therapeutic'
        ],
        disadvantages: [
          'May cause sleepiness',
          'Keep warm',
          'Not suitable if feeling unwell',
          'Practice in quiet environment'
        ],
        difficulty: 'Beginner',
        duration: '5-20 minutes',
        subCategories: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Gentle Yoga', 'Restorative', 'Therapeutic', 'Power Yoga']
      },
      {
        id: 144,
        name: 'સૂર્ય નમસ્કાર (Surya Namaskar) - Sun Salutation',
        image: getPoseImage(144, 'Surya Namaskar'),
        description: 'A complete sequence perfect for intermediate to advanced levels. Provides full-body workout and builds strength.',
        advantages: [
          'Perfect for intermediate/advanced',
          'Full-body workout',
          'Builds strength',
          'Improves flexibility',
          'Boosts energy',
          'Power yoga'
        ],
        disadvantages: [
          'Avoid with severe heart conditions',
          'Not recommended during pregnancy',
          'May cause fatigue if overdone',
          'Requires good physical condition'
        ],
        difficulty: 'Intermediate',
        duration: '5-10 minutes',
        subCategories: ['Intermediate', 'Advanced', 'Power Yoga']
      },
      {
        id: 145,
        name: 'Bakasana (Bakasana) - Crow Pose',
        image: getPoseImage(145, 'Bakasana'),
        description: 'An arm balance perfect for advanced level. Builds upper body and core strength. Requires significant strength.',
        advantages: [
          'Perfect for advanced',
          'Builds upper body strength',
          'Strengthens core',
          'Improves balance',
          'Tones arms',
          'Requires skill'
        ],
        disadvantages: [
          'Requires upper body strength',
          'Avoid with wrist injuries',
          'Not suitable with shoulder problems',
          'Challenging',
          'Not for beginners'
        ],
        difficulty: 'Advanced',
        duration: '10-30 seconds',
        subCategories: ['Advanced', 'Expert', 'Power Yoga']
      },
      {
        id: 146,
        name: 'સેતુ બંધાસન (Setu Bandhasana) - Bridge Pose',
        image: getPoseImage(146, 'Setu Bandhasana'),
        description: 'A gentle backbend perfect for beginners and gentle yoga. Strengthens back and opens chest. Therapeutic.',
        advantages: [
          'Perfect for beginners',
          'Gentle yoga',
          'Therapeutic',
          'Strengthens back',
          'Opens chest',
          'Safe and gentle'
        ],
        disadvantages: [
          'Avoid with neck injuries',
          'Not suitable with severe back problems',
          'Avoid during late pregnancy',
          'Keep it gentle'
        ],
        difficulty: 'Beginner',
        duration: '30-60 seconds',
        subCategories: ['Beginner', 'Gentle Yoga', 'Restorative', 'Therapeutic']
      },
      {
        id: 147,
        name: 'Padmasana (Padmasana) - Lotus Pose',
        image: getPoseImage(147, 'Padmasana'),
        description: 'The classic meditation pose perfect for intermediate to advanced levels. Requires flexibility and practice.',
        advantages: [
          'Perfect for intermediate/advanced',
          'Classic meditation pose',
          'Improves focus',
          'Opens hips',
          'Improves posture',
          'Enhances concentration'
        ],
        disadvantages: [
          'Requires flexible hips',
          'Can strain knees if forced',
          'Not suitable for knee injuries',
          'May cause ankle discomfort',
          'Difficult for beginners'
        ],
        difficulty: 'Intermediate',
        duration: '5-30 minutes',
        subCategories: ['Intermediate', 'Advanced', 'Expert']
      }
    ]
  };

  useEffect(() => {
    if (location.state?.category) {
      setCategory(location.state.category);
      setSelectedSubCategory(location.state.subCategory);
    } else {
      // Fallback: define categories here if needed
      const categories = {
        'pain-relief': { id: 'pain-relief', name: 'Pain Relief Yoga', icon: '🩹', subCategories: ['Back Pain', 'Knee Pain', 'Neck Pain', 'Shoulder Pain', 'Sciatica', 'Joint Pain', 'Arthritis', 'Muscle Tension'] },
        'disease-specific': { id: 'disease-specific', name: 'Disease-Specific Yoga', icon: '🏥', subCategories: ['Diabetes', 'Blood Pressure (BP)', 'Thyroid', 'PCOS', 'Asthma', 'Heart Health', 'Digestive Issues', 'Immune System'] },
        'age-groups': { id: 'age-groups', name: 'Yoga for Age Groups', icon: '👥', subCategories: ['Kids Yoga (5-12 years)', 'Teens Yoga (13-19 years)', 'Adults (20-50 years)', 'Seniors (50+ years)'] },
        'women': { id: 'women', name: 'Yoga for Women', icon: '👩', subCategories: ['Pregnancy Yoga', 'Postnatal Yoga', 'Menstrual Health', 'Menopause', 'Hormonal Balance', 'Pelvic Health'] },
        'mental-health': { id: 'mental-health', name: 'Yoga for Mental Health', icon: '🧘', subCategories: ['Stress Relief', 'Anxiety Management', 'Depression Support', 'Sleep Disorders', 'Focus & Concentration', 'Emotional Balance'] },
        'fitness-goals': { id: 'fitness-goals', name: 'Fitness & Body Goals', icon: '💪', subCategories: ['Weight Loss', 'Weight Gain', 'Flexibility', 'Strength Building', 'Muscle Tone', 'Core Strength', 'Cardio Fitness', 'Body Sculpting'] },
        'lifestyle': { id: 'lifestyle', name: 'Lifestyle Yoga', icon: '🌱', subCategories: ['Office Workers', 'Athletes', 'Daily Routine', 'Morning Yoga', 'Evening Yoga', 'Desk Yoga', 'Travel Yoga', 'Quick Sessions'] },
        'meditation': { id: 'meditation', name: 'Meditation & Pranayama', icon: '🕉️', subCategories: ['Breathing Exercises', 'Mindfulness', 'Guided Meditation', 'Chakra Balancing', 'Energy Healing', 'Relaxation Techniques'] },
        'programs': { id: 'programs', name: 'Yoga Programs', icon: '📚', subCategories: ['Online Programs', 'Offline Classes', '7-Day Challenge', '30-Day Transformation', 'Beginner Course', 'Advanced Training'] },
        'levels': { id: 'levels', name: 'Yoga Levels', icon: '📊', subCategories: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Therapeutic', 'Restorative', 'Power Yoga', 'Gentle Yoga'] }
      };
      setCategory(categories[categoryId] || categories['pain-relief']);
    }
  }, [categoryId, location.state]);

  const getPosesForCategory = () => {
    return poseData[categoryId] || poseData['pain-relief'];
  };

  const filteredPoses = selectedSubCategory
    ? getPosesForCategory().filter(pose => 
        pose.subCategories?.some(sub => 
          sub.toLowerCase().includes(selectedSubCategory.toLowerCase())
        )
      )
    : getPosesForCategory();

  return (
    <div className="category-detail-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate('/pose-detection')}>
          <FaArrowLeft /> Back to Categories
        </button>

        {category && (
          <>
            <div className="category-header-detail">
              <div className="category-icon-large">{category.icon}</div>
              <h1>{category.name}</h1>
              <p>Explore yoga poses tailored for your specific needs</p>
            </div>

            {category.subCategories && category.subCategories.length > 0 && (
              <div className="subcategory-filter">
                <button
                  className={`subcategory-filter-btn ${!selectedSubCategory ? 'active' : ''}`}
                  onClick={() => setSelectedSubCategory(null)}
                >
                  All
                </button>
                {category.subCategories.map((sub, index) => (
                  <button
                    key={index}
                    className={`subcategory-filter-btn ${selectedSubCategory === sub ? 'active' : ''}`}
                    onClick={() => setSelectedSubCategory(sub)}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}

            <div className="poses-grid">
              {filteredPoses.map((pose) => (
                <div key={pose.id} className="pose-card">
                  <div className="pose-image-container">
                    <img 
                      src={pose.image} 
                      alt={pose.name} 
                      className="pose-image"
                      loading="lazy"
                      onError={(e) => {
                        // If image fails to load, try generic yoga image
                        const fallbackUrl = `https://source.unsplash.com/400x300/?yoga&sig=${pose.id}`;
                        
                        // Try fallback, if that fails too, hide image to show gradient
                        let errorCount = 0;
                        e.target.onerror = () => {
                          errorCount++;
                          if (errorCount >= 2) {
                            e.target.style.display = 'none';
                          } else {
                            e.target.src = fallbackUrl;
                          }
                        };
                        e.target.src = fallbackUrl;
                      }}
                    />
                    <span className={`pose-difficulty-badge ${pose.difficulty.toLowerCase()}`}>
                      {pose.difficulty}
                    </span>
                  </div>
                  
                  <div className="pose-content">
                    <h3 className="pose-name">{pose.name}</h3>
                    <p className="pose-description">{pose.description}</p>
                    
                    <div className="pose-duration">
                      <strong>Duration:</strong> {pose.duration}
                    </div>

                    <div className="pose-advantages">
                      <h4>
                        <FaCheckCircle className="icon-advantage" />
                        Advantages
                      </h4>
                      <ul>
                        {pose.advantages.map((adv, index) => (
                          <li key={index}>{adv}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pose-disadvantages">
                      <h4>
                        <FaTimesCircle className="icon-disadvantage" />
                        Disadvantages & Precautions
                      </h4>
                      <ul>
                        {pose.disadvantages.map((dis, index) => (
                          <li key={index}>{dis}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
