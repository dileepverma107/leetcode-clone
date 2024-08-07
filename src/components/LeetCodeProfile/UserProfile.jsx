import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import ProfileCard from './ProfileCard';
import AcceptanceAttemptStatsCard from './AcceptanceAttemptStatsCard';
import BadgesCard from './BadgesCard';
import ActivityStatsCard from './ActivityStatsCard';
import ActivityCard from './ActivityCard';
import apiClient from '../apiClient'; // Import the Axios instance
import ErrorAlert from '../../components/ErrorAlert'; // Import the ErrorAlert component
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { homeData } = location.state || {};

  // Handle API data fetching
  const handleFetchData = (username) => {
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
      setProfileData(response.data.data);
      setLoading(false);
    })
    .catch((error) => {
      setError('Failed to fetch data. Please try again.');
      setLoading(false);
    });
  };

  // Use default data initially, if available
  const dataToUse = profileData || homeData;
  

  return (
    <Box display="flex" justifyContent="center" padding={2}>
      <Grid container spacing={2} style={{ maxWidth: '1200px' }}>
        {error && (
          <Grid item xs={12}>
            <ErrorAlert errorMessage={error} onClose={() => setError(null)} />
          </Grid>
        )}

        <Grid item xs={12} md={3} style={{ display: 'flex', flexDirection: 'column' }}>
          <ProfileCard onFetchData={handleFetchData} profileData={dataToUse}/>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <AcceptanceAttemptStatsCard profileData={dataToUse} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BadgesCard profileData={dataToUse} />
            </Grid>
            <Grid item xs={12}>
              <ActivityStatsCard profileData={dataToUse} />
            </Grid>
            <Grid item xs={12}>
              <ActivityCard profileData={dataToUse} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
