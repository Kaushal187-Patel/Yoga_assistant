import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { FaArrowLeft, FaPlay, FaStop, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import './PoseDetail.css';

const PoseDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  const [pose, setPose] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [detector, setDetector] = useState(null);
  const [accuracy, setAccuracy] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [isModelLoading, setIsModelLoading] = useState(false);

  // Initialize pose data
  useEffect(() => {
    if (location.state?.pose) {
      setPose(location.state.pose);
    } else {
      // Fallback: navigate back if no pose data
      navigate('/pose-detection');
    }
  }, [location.state, navigate]);

  // Initialize pose detection model
  useEffect(() => {
    const initModel = async () => {
      setIsModelLoading(true);
      try {
        // Initialize TensorFlow.js backend
        await tf.setBackend('webgl');
        await tf.ready();
        console.log('TensorFlow.js backend initialized:', tf.getBackend());
        
        // Use MoveNet for fast, accurate pose detection
        const model = poseDetection.SupportedModels.MoveNet;
        
        // Try different MoveNet configurations
        let poseDetector = null;
        
        // Try 1: MoveNet Lightning with enum (if available)
        try {
          if (poseDetection.movenet && poseDetection.movenet.modelType) {
            const detectorConfig = {
              modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
            };
            poseDetector = await poseDetection.createDetector(model, detectorConfig);
            console.log('MoveNet Lightning (enum) loaded successfully');
          } else {
            throw new Error('movenet.modelType not available');
          }
        } catch (e1) {
          console.warn('MoveNet Lightning (enum) failed:', e1.message);
          
          // Try 2: MoveNet Lightning with string
          try {
            const detectorConfig = {
              modelType: 'lightning',
            };
            poseDetector = await poseDetection.createDetector(model, detectorConfig);
            console.log('MoveNet Lightning (string) loaded successfully');
          } catch (e2) {
            console.warn('MoveNet Lightning (string) failed:', e2.message);
            
            // Try 3: MoveNet Thunder
            try {
              const detectorConfig = {
                modelType: 'thunder',
              };
              poseDetector = await poseDetection.createDetector(model, detectorConfig);
              console.log('MoveNet Thunder loaded successfully');
            } catch (e3) {
              console.warn('MoveNet Thunder failed:', e3.message);
              
              // Try 4: Default MoveNet (no config)
              try {
                poseDetector = await poseDetection.createDetector(model);
                console.log('MoveNet (default) loaded successfully');
              } catch (e4) {
                throw new Error(`All MoveNet variants failed. Last error: ${e4.message}`);
              }
            }
          }
        }
        
        if (poseDetector) {
          setDetector(poseDetector);
        } else {
          throw new Error('Failed to create detector');
        }
      } catch (error) {
        console.error('Error loading pose detection model:', error);
        console.error('Error details:', error.message);
        
        // Try fallback to BlazePose if MoveNet fails completely
        try {
          console.log('Attempting to load BlazePose as fallback...');
          const model = poseDetection.SupportedModels.BlazePose;
          const detectorConfig = {
            runtime: 'tfjs',
            modelType: 'lite',
            enableSmoothing: true,
          };
          const poseDetector = await poseDetection.createDetector(model, detectorConfig);
          setDetector(poseDetector);
          console.log('BlazePose model loaded successfully as fallback');
        } catch (fallbackError) {
          console.error('All models failed to load:', fallbackError);
          setFeedback([
            'Error loading pose detection model.',
            'Please check your internet connection and refresh the page.',
            'The model needs to be downloaded on first use.',
            `Error: ${error.message || 'Unknown error'}`
          ]);
        }
      } finally {
        setIsModelLoading(false);
      }
    };

    initModel();
  }, []);

  const handleUserMedia = useCallback(() => {
    setHasPermission(true);
  }, []);

  const handleUserMediaError = useCallback(() => {
    setHasPermission(false);
    setFeedback(['Camera access denied. Please enable camera permissions.']);
  }, []);

  // Validate keypoint position - check if it's in a reasonable location
  const isValidKeypoint = (keypoint, index, keypoints, videoWidth, videoHeight) => {
    if (!keypoint || keypoint.score < 0.5) return false; // Higher confidence threshold
    
    const x = keypoint.x;
    const y = keypoint.y;
    
    // Check if keypoint is within video bounds
    if (x < 0 || x > videoWidth || y < 0 || y > videoHeight) return false;
    
    // Validate left/right side positioning for symmetric keypoints
    const leftShoulder = keypoints[5];
    const rightShoulder = keypoints[6];
    const leftHip = keypoints[11];
    const rightHip = keypoints[12];
    
    // Left side keypoints should be on the left side of the body
    if (index === 5 || index === 7 || index === 9 || index === 11 || index === 13 || index === 15) {
      if (rightShoulder && rightShoulder.score > 0.5) {
        // Left keypoints should be to the left of right shoulder
        if (x > rightShoulder.x + 50) return false; // Too far to the right
      }
    }
    
    // Right side keypoints should be on the right side of the body
    if (index === 6 || index === 8 || index === 10 || index === 12 || index === 14 || index === 16) {
      if (leftShoulder && leftShoulder.score > 0.5) {
        // Right keypoints should be to the right of left shoulder
        if (x < leftShoulder.x - 50) return false; // Too far to the left
      }
    }
    
    // Validate vertical relationships (knees should be below hips, etc.)
    if (index === 13 && leftHip && leftHip.score > 0.5) {
      // Left knee should be below left hip
      if (y < leftHip.y - 20) return false;
    }
    if (index === 14 && rightHip && rightHip.score > 0.5) {
      // Right knee should be below right hip
      if (y < rightHip.y - 20) return false;
    }
    if (index === 15 && keypoints[13] && keypoints[13].score > 0.5) {
      // Left ankle should be below left knee
      if (y < keypoints[13].y - 20) return false;
    }
    if (index === 16 && keypoints[14] && keypoints[14].score > 0.5) {
      // Right ankle should be below right knee
      if (y < keypoints[14].y - 20) return false;
    }
    
    return true;
  };

  // Calculate distance between two keypoints
  const getDistance = (kp1, kp2) => {
    if (!kp1 || !kp2) return Infinity;
    const dx = kp1.x - kp2.x;
    const dy = kp1.y - kp2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Validate connection between two keypoints
  const isValidConnection = (start, end, startIdx, endIdx, videoWidth, videoHeight) => {
    if (!start || !end || start.score < 0.5 || end.score < 0.5) return false;
    
    const distance = getDistance(start, end);
    const maxReasonableDistance = Math.max(videoWidth, videoHeight) * 0.6; // Max 60% of frame
    
    // Check if distance is reasonable (not too far apart)
    if (distance > maxReasonableDistance) return false;
    
    // Validate specific connections
    // Shoulder to elbow should be reasonable
    if ((startIdx === 5 && endIdx === 7) || (startIdx === 6 && endIdx === 8)) {
      if (distance > videoWidth * 0.4) return false;
    }
    
    // Hip to knee should be reasonable
    if ((startIdx === 11 && endIdx === 13) || (startIdx === 12 && endIdx === 14)) {
      if (distance > videoHeight * 0.5) return false;
    }
    
    return true;
  };

  // Draw pose skeleton on canvas
  const drawPose = (keypoints, ctx, videoWidth, videoHeight, currentAccuracy) => {
    if (!keypoints || keypoints.length === 0) return;

    // MoveNet keypoint indices (17 keypoints)
    // 0: nose, 1: left_eye, 2: right_eye, 3: left_ear, 4: right_ear
    // 5: left_shoulder, 6: right_shoulder, 7: left_elbow, 8: right_elbow
    // 9: left_wrist, 10: right_wrist, 11: left_hip, 12: right_hip
    // 13: left_knee, 14: right_knee, 15: left_ankle, 16: right_ankle

    // Determine line color based on current accuracy (90% threshold for green)
    const isCorrect = currentAccuracy >= 90;
    const lineColor = isCorrect ? '#00ff00' : '#ff0000'; // Green if >= 90%, red otherwise
    const pointColor = isCorrect ? '#00ff00' : '#ff0000'; // Green if >= 90%, red otherwise
    const lineWidth = isCorrect ? 4 : 3; // Thicker green lines for correct pose

    // Draw connections first (so they appear behind keypoints)
    // These represent the skeleton structure
    const moveNetConnections = [
      [5, 6], // Shoulders
      [5, 7], [7, 9], // Left arm (shoulder -> elbow -> wrist)
      [6, 8], [8, 10], // Right arm (shoulder -> elbow -> wrist)
      [5, 11], [6, 12], // Torso (shoulders to hips)
      [11, 12], // Hips
      [11, 13], [13, 15], // Left leg (hip -> knee -> ankle)
      [12, 14], [14, 16], // Right leg (hip -> knee -> ankle)
    ];

    // Draw skeleton lines with proper validation
    moveNetConnections.forEach(([startIdx, endIdx]) => {
      if (startIdx < keypoints.length && endIdx < keypoints.length) {
        const start = keypoints[startIdx];
        const end = keypoints[endIdx];
        
        // Validate connection before drawing
        if (isValidConnection(start, end, startIdx, endIdx, videoWidth, videoHeight)) {
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }
    });

    // Draw keypoints (gesture points) - only valid, properly positioned points
    keypoints.forEach((keypoint, index) => {
      // Validate keypoint before drawing
      if (isValidKeypoint(keypoint, index, keypoints, videoWidth, videoHeight)) {
        const x = keypoint.x;
        const y = keypoint.y;
        
        // Draw outer circle (white border)
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Draw inner circle (colored based on accuracy)
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = pointColor;
        ctx.fill();
        
        // Draw center dot for better visibility
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
    });
  };

  // Analyze pose and calculate accuracy - returns the calculated accuracy
  const analyzePose = (keypoints) => {
    if (!keypoints || keypoints.length === 0) {
      setAccuracy(0);
      setFeedback(['No pose detected. Please ensure your full body is visible.']);
      return 0;
    }

    // Count visible keypoints with higher confidence threshold
    // Only count keypoints with score > 0.5 for better accuracy
    const visibleKeypoints = keypoints.filter(kp => kp && kp.score > 0.5).length;
    const totalKeypoints = keypoints.length;
    const visibilityScore = (visibleKeypoints / totalKeypoints) * 100;

    // Enhanced pose analysis with more detailed checks
    let poseScore = 0;
    const feedbackMessages = [];

    // MoveNet keypoint indices
    // 5: left_shoulder, 6: right_shoulder, 11: left_hip, 12: right_hip
    const leftShoulder = keypoints[5];
    const rightShoulder = keypoints[6];
    const leftHip = keypoints[11];
    const rightHip = keypoints[12];

    // Check shoulder alignment (more strict for better accuracy)
    if (leftShoulder && rightShoulder && leftShoulder.score > 0.5 && rightShoulder.score > 0.5) {
      const shoulderAlignment = Math.abs(leftShoulder.y - rightShoulder.y);
      if (shoulderAlignment < 20) {
        poseScore += 20;
      } else if (shoulderAlignment < 40) {
        poseScore += 10;
        feedbackMessages.push('Keep your shoulders more level');
      } else {
        feedbackMessages.push('Keep your shoulders level');
      }
    }

    // Check hip alignment
    if (leftHip && rightHip && leftHip.score > 0.5 && rightHip.score > 0.5) {
      const hipAlignment = Math.abs(leftHip.y - rightHip.y);
      if (hipAlignment < 20) {
        poseScore += 20;
      } else if (hipAlignment < 40) {
        poseScore += 10;
        feedbackMessages.push('Align your hips better');
      } else {
        feedbackMessages.push('Align your hips');
      }
    }

    // Check overall body visibility
    const essentialKeypoints = [leftShoulder, rightShoulder, leftHip, rightHip];
    const essentialVisible = essentialKeypoints.filter(kp => kp && kp.score > 0.3).length;
    if (essentialVisible >= 4) {
      poseScore += 20;
    } else if (essentialVisible >= 3) {
      poseScore += 10;
      feedbackMessages.push('Ensure your full body is visible in the frame');
    } else {
      feedbackMessages.push('Ensure your full body is visible in the frame');
    }

    // Check for symmetry (both sides visible)
    if (leftShoulder && rightShoulder && leftHip && rightHip) {
      const leftSideVisible = (leftShoulder.score > 0.5 && leftHip.score > 0.5);
      const rightSideVisible = (rightShoulder.score > 0.5 && rightHip.score > 0.5);
      if (leftSideVisible && rightSideVisible) {
        poseScore += 20;
      } else {
        feedbackMessages.push('Try to show both sides of your body');
      }
    }

    // Check keypoint confidence scores (higher confidence = better detection)
    const avgConfidence = keypoints.reduce((sum, kp) => sum + (kp?.score || 0), 0) / keypoints.length;
    if (avgConfidence > 0.7) {
      poseScore += 20;
    } else if (avgConfidence > 0.5) {
      poseScore += 10;
    }

    // Overall score combines visibility and pose quality
    const finalScore = Math.min(100, (visibilityScore * 0.3) + (poseScore * 0.7));
    const roundedScore = Math.round(finalScore);
    
    // Update state
    setAccuracy(roundedScore);

    if (finalScore >= 90) {
      if (feedbackMessages.length === 0) {
        feedbackMessages.push('Excellent pose! Perfect alignment - Green lines indicate correct form');
      }
    } else if (finalScore >= 70) {
      if (feedbackMessages.length === 0) {
        feedbackMessages.push('Good form! Minor adjustments needed to reach 90% accuracy');
      }
    } else {
      if (feedbackMessages.length === 0) {
        feedbackMessages.push('Adjust your pose for better alignment - Aim for 90% accuracy for green lines');
      }
    }

    setFeedback(feedbackMessages);
    
    // Return the calculated accuracy for immediate use in drawing
    return roundedScore;
  };

  // Main detection loop
  const detectPose = useCallback(async () => {
    if (!webcamRef.current || !canvasRef.current || !detector) return;

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (video && video.readyState === 4) {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      canvas.width = videoWidth;
      canvas.height = videoHeight;

      // Clear canvas
      ctx.clearRect(0, 0, videoWidth, videoHeight);

      // Detect poses
      try {
        const poses = await detector.estimatePoses(video);
        
        if (poses && poses.length > 0) {
          let keypoints = poses[0].keypoints;
          
          // IMPORTANT: Flip keypoints horizontally to match mirrored video display
          // Since webcam is mirrored, we need to flip X coordinates so keypoints
          // appear on the same side as the user sees their body parts
          keypoints = keypoints.map(kp => ({
            ...kp,
            x: videoWidth - kp.x  // Flip X coordinate to match mirrored video
          }));
          
          // IMPORTANT: Swap left/right keypoints after flipping
          // After flipping, what was "left" in model space is now "right" in display space
          // So we need to swap the left/right keypoint indices
          const swappedKeypoints = [...keypoints];
          
          // Swap left and right body parts to match the mirrored view
          // 5: left_shoulder <-> 6: right_shoulder
          [swappedKeypoints[5], swappedKeypoints[6]] = [swappedKeypoints[6], swappedKeypoints[5]];
          // 7: left_elbow <-> 8: right_elbow
          [swappedKeypoints[7], swappedKeypoints[8]] = [swappedKeypoints[8], swappedKeypoints[7]];
          // 9: left_wrist <-> 10: right_wrist
          [swappedKeypoints[9], swappedKeypoints[10]] = [swappedKeypoints[10], swappedKeypoints[9]];
          // 11: left_hip <-> 12: right_hip
          [swappedKeypoints[11], swappedKeypoints[12]] = [swappedKeypoints[12], swappedKeypoints[11]];
          // 13: left_knee <-> 14: right_knee
          [swappedKeypoints[13], swappedKeypoints[14]] = [swappedKeypoints[14], swappedKeypoints[13]];
          // 15: left_ankle <-> 16: right_ankle
          [swappedKeypoints[15], swappedKeypoints[16]] = [swappedKeypoints[16], swappedKeypoints[15]];
          // 1: left_eye <-> 2: right_eye
          [swappedKeypoints[1], swappedKeypoints[2]] = [swappedKeypoints[2], swappedKeypoints[1]];
          // 3: left_ear <-> 4: right_ear
          [swappedKeypoints[3], swappedKeypoints[4]] = [swappedKeypoints[4], swappedKeypoints[3]];
          
          // Use swapped keypoints for analysis and drawing
          keypoints = swappedKeypoints;
          
          // IMPORTANT: Calculate accuracy FIRST, then draw with that accuracy
          // This ensures the color matches the accuracy value
          const calculatedAccuracy = analyzePose(keypoints);
          
          // Draw pose with the calculated accuracy to ensure color matches
          drawPose(keypoints, ctx, videoWidth, videoHeight, calculatedAccuracy);
        } else {
          setAccuracy(0);
          setFeedback(['No pose detected. Please ensure your full body is visible.']);
          
          // Clear canvas when no pose detected
          ctx.clearRect(0, 0, videoWidth, videoHeight);
        }
      } catch (error) {
        console.error('Error detecting pose:', error);
      }
    }

    if (isDetecting) {
      animationFrameRef.current = requestAnimationFrame(detectPose);
    }
    // drawPose and analyzePose are stable functions that don't change between renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detector, isDetecting]);

  // Start/stop detection
  useEffect(() => {
    if (isDetecting && detector) {
      detectPose();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDetecting, detector, detectPose]);

  const startDetection = () => {
    if (!detector) {
      setFeedback(['Pose detection model is still loading. Please wait...']);
      return;
    }
    setIsDetecting(true);
    setFeedback([]);
  };

  const stopDetection = () => {
    setIsDetecting(false);
    setAccuracy(0);
    setFeedback([]);
  };

  if (!pose) {
    return (
      <div className="pose-detail-page">
        <div className="container">
          <p>Loading pose details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pose-detail-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate('/pose-detection')}>
          <FaArrowLeft /> Back to Poses
        </button>

        {/* Pose Information Section */}
        <section className="pose-info-section">
          <div className="pose-header">
            <div className="pose-image-large">
              <img 
                src={pose.image} 
                alt={pose.name}
                loading="eager"
                onError={(e) => {
                  // Extract English name for better image search
                  const englishName = pose.name.split('(')[1]?.split(')')[0]?.trim() || 
                                     pose.name.split('-')[1]?.trim() || 
                                     'yoga pose';
                  
                  // Clean the name for URL
                  let searchTerm = englishName.toLowerCase()
                    .replace(/\s+/g, '%20')
                    .replace(/[^a-z0-9%]/g, '');
                  
                  // Special handling for specific poses with direct URLs
                  let fallbackUrl;
                  if (englishName.toLowerCase().includes('warrior') || englishName.toLowerCase().includes('virabhadrasana')) {
                    // Direct URL for Warrior II
                    fallbackUrl = 'https://images.unsplash.com/photo-1758599878236-47f6a918aed2?w=600&h=400&fit=crop&auto=format&q=80';
                  } else if (englishName.toLowerCase().includes('cobra') || englishName.toLowerCase().includes('bhujangasana')) {
                    fallbackUrl = 'https://images.unsplash.com/photo-1717821552922-61e18814a44a?w=600&h=400&fit=crop&auto=format&q=80';
                  } else if (englishName.toLowerCase().includes('cat') || englishName.toLowerCase().includes('cow') || englishName.toLowerCase().includes('marjariasana')) {
                    fallbackUrl = 'https://images.unsplash.com/photo-1758599881262-7b79a56ac284?w=600&h=400&fit=crop&auto=format&q=80';
                  } else if (englishName.toLowerCase().includes('bridge') || englishName.toLowerCase().includes('setu') || englishName.toLowerCase().includes('bandhasana')) {
                    fallbackUrl = 'https://images.unsplash.com/photo-1767611086180-6b1176976371?w=600&h=400&fit=crop&auto=format&q=80';
                  } else if (englishName.toLowerCase().includes('triangle') || englishName.toLowerCase().includes('trikonasana')) {
                    fallbackUrl = 'https://images.unsplash.com/photo-1767611090899-163209a4ead1?w=600&h=400&fit=crop&auto=format&q=80';
                  } else if (englishName.toLowerCase().includes('downward') || englishName.toLowerCase().includes('dog') || englishName.toLowerCase().includes('svanasana') || englishName.toLowerCase().includes('adho')) {
                    fallbackUrl = 'https://images.unsplash.com/photo-1767611121194-3cb554c9a9ec?w=600&h=400&fit=crop&auto=format&q=80';
                  } else if (englishName.toLowerCase().includes('sun') || englishName.toLowerCase().includes('salutation') || englishName.toLowerCase().includes('surya') || englishName.toLowerCase().includes('namaskar')) {
                    fallbackUrl = 'https://images.unsplash.com/photo-1606663368493-131f4f97c095?w=600&h=400&fit=crop&auto=format&q=80';
                  } else if (englishName.toLowerCase().includes('child') || englishName.toLowerCase().includes('balasana')) {
                    fallbackUrl = 'https://images.unsplash.com/photo-1767611118672-d3887038786c?w=600&h=400&fit=crop&auto=format&q=80';
                  } else if (englishName.toLowerCase().includes('lotus') || englishName.toLowerCase().includes('padmasana')) {
                    fallbackUrl = 'https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?w=600&h=400&fit=crop&auto=format&q=80';
                  } else if (englishName.toLowerCase().includes('thunderbolt') || englishName.toLowerCase().includes('vajrasana')) {
                    fallbackUrl = 'https://images.unsplash.com/photo-1697274834392-04ff3b76ef20?w=600&h=400&fit=crop&auto=format&q=80';
                  } else if (englishName.toLowerCase().includes('tree') || englishName.toLowerCase().includes('vrikshasana')) {
                    fallbackUrl = 'https://images.unsplash.com/photo-1758274525911-402f99afec14?w=600&h=400&fit=crop&auto=format&q=80';
                  } else {
                    // Try Unsplash with pose name
                    fallbackUrl = `https://images.unsplash.com/600x400/?yoga%20${searchTerm}&sig=${pose.id}`;
                  }
                  
                  // Try fallback, if that fails too, use generic yoga image
                  let errorCount = 0;
                  e.target.onerror = () => {
                    errorCount++;
                    if (errorCount >= 2) {
                      // Final fallback to generic yoga image
                      e.target.src = `https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&auto=format&q=80`;
                    } else {
                      e.target.src = fallbackUrl;
                    }
                  };
                  e.target.src = fallbackUrl;
                }}
              />
              <span className={`pose-difficulty-badge-large ${pose.difficulty.toLowerCase()}`}>
                {pose.difficulty}
              </span>
            </div>
            <div className="pose-details">
              <h1>{pose.name}</h1>
              <p className="pose-description-large">{pose.description}</p>
              <div className="pose-meta-large">
                <span>⏱ Duration: {pose.duration}</span>
                <span>📂 Category: {pose.category}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pose Detection Section */}
        <section className="pose-detection-section">
          <div className="detection-container">
            <div className="webcam-wrapper-detection">
              {hasPermission === false ? (
                <div className="permission-denied">
                  <FaExclamationTriangle />
                  <h3>Camera Access Denied</h3>
                  <p>Please enable camera permissions to use pose detection.</p>
                </div>
              ) : (
                <>
                  <div className="webcam-container-detection">
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      mirrored={true}
                      onUserMedia={handleUserMedia}
                      onUserMediaError={handleUserMediaError}
                      className="webcam-video-detection"
                      videoConstraints={{
                        width: 640,
                        height: 480,
                        facingMode: "user"
                      }}
                    />
                    <canvas ref={canvasRef} className="pose-canvas-detection" />
                    
                    {isDetecting && (
                      <div className="pose-overlay-detection">
                        <div className="accuracy-display-detection">
                          <div 
                            className="accuracy-circle-detection"
                            style={{ 
                              borderColor: accuracy >= 90 ? '#00ff00' : '#ff0000',
                              color: accuracy >= 90 ? '#00ff00' : '#ff0000'
                            }}
                          >
                            <span>{accuracy}%</span>
                          </div>
                          <p>Accuracy {accuracy >= 90 ? '✓' : '⚠'}</p>
                          <p className="accuracy-hint">
                            {accuracy >= 90 ? 'Green lines = Correct!' : 'Aim for 90% for green lines'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="detection-controls">
                    {!isDetecting ? (
                      <button 
                        className="btn btn-primary start-detection-btn"
                        onClick={startDetection}
                        disabled={hasPermission === false || isModelLoading || !detector}
                      >
                        <FaPlay /> {
                          isModelLoading 
                            ? 'Loading Model...' 
                            : !detector 
                              ? 'Model Not Ready' 
                              : 'Start Pose Detection'
                        }
                      </button>
                    ) : (
                      <button 
                        className="btn btn-danger stop-detection-btn"
                        onClick={stopDetection}
                      >
                        <FaStop /> Stop Detection
                      </button>
                    )}
                    {isModelLoading && (
                      <p className="model-loading-message">
                        Loading pose detection model... This may take a moment on first use.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="detection-feedback-panel">
              <h3><FaInfoCircle /> Real-time Feedback</h3>
                  {feedback.length > 0 ? (
                    <ul className="feedback-list-detection">
                      {feedback.map((msg, index) => (
                        <li 
                          key={index} 
                          className={accuracy >= 90 ? 'success' : 'warning'}
                        >
                          {accuracy >= 90 ? <FaCheckCircle /> : <FaExclamationTriangle />}
                          <span>{msg}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                <p className="no-feedback-detection">
                  {isDetecting 
                    ? 'Position yourself in the camera frame to start detection...' 
                    : 'Click "Start Pose Detection" to begin practicing with real-time feedback.'}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PoseDetail;
