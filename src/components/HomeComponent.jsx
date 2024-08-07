import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Grid, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useClerk, useUser } from '@clerk/clerk-react'; // Import useClerk and useUser
import backgroundImage from '../components/bg2.png';
import LeetCodeIcon from '../components/leetcode.webp'; // Adjust path if needed
import apiClient from './apiClient'; // Import your API client

// Background component with image
const Background = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '100%',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'auto', // Maintain the image's original size
  backgroundPosition: 'center', // Center the image
  backgroundRepeat: 'no-repeat', // Prevent the image from repeating
  position: 'relative', // Positioning context for overlay
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

// Transparent overlay component
const TransparentOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))', // Gradient overlay
  zIndex: 1, // Ensure it sits above the background image
}));

// Main content overlay
const ContentOverlay = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white background
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  maxWidth: 800,
  width: '100%',
  boxShadow: theme.shadows ? theme.shadows[5] : '0px 5px 15px rgba(0, 0, 0, 0.3)', // Default shadow if theme.shadows is undefined
  position: 'relative', // Ensure it sits above the transparent overlay
  zIndex: 2, // Ensure it sits above the transparent overlay
}));

const Highlight = styled('span')(({ theme }) => ({
  color: theme.palette.primary ? theme.palette.primary.main : '#1976d2', // Fallback color
  fontWeight: 'bold',
}));

const StyledText = styled('span')({
  color: '#808080', // Desired color
  fontWeight: 'bold', // Same font weight as Highlight
});

const HomeComponent = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { openSignIn } = useClerk(); // Get the openSignIn function from Clerk
  const { isSignedIn } = useUser(); // Check if the user is signed in

  const handleFetchData = () => {
    if (!isSignedIn) {
      openSignIn(); // Open the sign-in modal if the user is not signed in
      return;
    }

    if (!username) {
      setError('Username cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);

    apiClient.post('', {
      operationName: "GetLeetCodeProfileData",
      variables: { username },
      query: `query GetLeetCodeProfileData($username: String!) { allQuestionsCount { difficulty count } matchedUser(username: $username) { username profile { realName userAvatar ranking reputation solutionCount contestCount postViewCount categoryDiscussCount } submissionCalendar submitStats { acSubmissionNum { difficulty count submissions } totalSubmissionNum { difficulty count submissions } } badges { displayName icon } languageProblemCount { languageName problemsSolved } tagProblemCounts { advanced { tagName tagSlug problemsSolved } intermediate { tagName tagSlug problemsSolved } fundamental { tagName tagSlug problemsSolved } } userCalendar { activeYears streak totalActiveDays submissionCalendar } } recentAcSubmissionList(username: $username) { id title titleSlug timestamp lang statusDisplay } }`,
    })
    .then((response) => {
      if (response.data.errors) {
        setError(response.data.errors[0].message);
        setLoading(false);
        return;
      }
      navigate('/user-profile', { state: { homeData: response.data.data } });
    })
    .catch((error) => {
      setError('Failed to fetch data. Please try again.');
      setLoading(false);
    });
  };

  return (
    <Background>
      <TransparentOverlay /> {/* Transparent overlay above the background image */}
      <ContentOverlay>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" align="center" gutterBottom>
              <StyledText>Enter username to generate</StyledText> <Highlight>LeetCode statistics</Highlight>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Username"
              variant="standard" // Use the standard variant for customization
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                borderRadius: '8px', // Adjust the border radius if needed
                '& .MuiInputBase-root': {
                  borderBottom: `2px solid #1976D2`, // Bottom border color and thickness
                  borderRadius: 0, // No border radius on the bottom border
                },
                '& .MuiInputLabel-root': {
                  color: '#1976d2', // Adjust label color
                },
                '& .MuiInputBase-input': {
                  color: '#FF4900', // Adjust input text color
                },
                '& .MuiInput-underline:before': {
                  borderBottom: `2px solid #1976D2`, // Bottom border color before focus
                },
                '& .MuiInput-underline:hover:before': {
                  borderBottom: `2px solid #1976D2`, // Bottom border color on hover
                },
                '& .MuiInput-underline:after': {
                  borderBottom: `2px solid #1976D2`, // Bottom border color after focus
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#B0B0B0', // Placeholder color
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img src={LeetCodeIcon} alt="LeetCode" style={{ width: 24, height: 24 }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ width: '100%', marginTop: 2 }}
              onClick={handleFetchData}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Loading...' : 'Generate Stats'}
            </Button>
            {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
          </Grid>
        </Grid>
      </ContentOverlay>
    </Background>
  );
};

export default HomeComponent;
