import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { styled, Box } from '@mui/material';

const RootStyle = styled('div')(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: 40,
  overflow: 'hidden',
}));

interface ProgressBarProps {
  progress: number;
}

const ProgressBarContainer = styled('div')<ProgressBarProps>(({ theme, progress }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '2px',
  width: `${progress}%`,
  backgroundColor: theme.palette.primary.main,
  transition: 'width 0.1s ease',
  zIndex: theme.zIndex.snackbar,
}));


export default function LoadingScreen({ ...other }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 5;
        }
        clearInterval(interval);
        return prev;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <RootStyle {...other}>
      <ProgressBarContainer progress={progress} />

      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeatDelay: 1,
          repeat: Infinity,
        }}
      >
        <Box sx={{ width: 140 }} component='img' src='static/logos/logoLight.svg' />
      </motion.div>

      <Box
        component={motion.div}
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        sx={{
          width: 100,
          height: 100,
          borderRadius: '25%',
          position: 'absolute',
          border: (theme) => `solid 3px rgba(255, 80, 130, 0.24)`,
        }}
      />

      <Box
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{
          ease: 'linear',
          duration: 3.2,
          repeat: Infinity,
        }}
        sx={{
          width: 150,
          height: 150,
          borderRadius: '25%',
          position: 'absolute',
          border: (theme) => `solid 8px rgba(255, 80, 130, 0.24)`,
        }}
      />
    </RootStyle>
  );
}
