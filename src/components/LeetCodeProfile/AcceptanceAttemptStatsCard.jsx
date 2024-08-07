
import { Card, CardContent, Typography, Box } from '@mui/material';
import ProgressIndicator from './ProgressIndicator';

const AcceptanceAttemptStatsCard = ({profileData}) => {

  const totalSubm = profileData?.matchedUser?.submitStats?.totalSubmissionNum[0].submissions + profileData?.matchedUser?.submitStats?.totalSubmissionNum[1].submissions +
  profileData?.matchedUser?.submitStats?.totalSubmissionNum[2].submissions + profileData?.matchedUser?.submitStats?.totalSubmissionNum[3].submissions;

  const acSubmission = profileData?.matchedUser?.submitStats?.acSubmissionNum[0].submissions + profileData?.matchedUser?.submitStats?.acSubmissionNum[1].submissions +
  profileData?.matchedUser?.submitStats?.acSubmissionNum[2].submissions + profileData?.matchedUser?.submitStats?.acSubmissionNum[3].submissions;

  const percentageCal = (profileData?.matchedUser?.submitStats?.acSubmissionNum[0].count / profileData?.allQuestionsCount[0]?.count) * 100;

  const acceptanceRate = (acSubmission/totalSubm)*100;
  const acceptanceRateInteger = Math.floor(acceptanceRate).toString();
  const acceptanceRateDecimal = (acceptanceRate % 1).toFixed(2).substring(1); 

  return (
    <Card style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', height: '100%' }}>
      <CardContent style={{marginTop:'20px'}}>
        <Box display="flex" alignItems="center">
          <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ProgressIndicator
        progress={percentageCal.toFixed(2)} 
        progressText={
          <>
            <Typography variant="h4" component="span" style={{  fontWeight: 'bold' }}>
              {profileData?.matchedUser?.submitStats?.acSubmissionNum[0].count}
            </Typography>
            /
            <span>
              {profileData?.allQuestionsCount[0]?.count}
            </span>
          </>
        }
        progressColor="#1CBABA" 
        backgroundColor="#264545" 
        submission="9 Attempting"
        hoverProgress={acceptanceRate.toFixed(2)}
        hoverProgressText={
          <>
            <Typography variant="h4" component="span" style={{fontWeight: 'bold' }}>
              {acceptanceRateInteger}
            </Typography>
            <Typography component="span" style={{fontWeight: 'bold' }}>
              {acceptanceRateDecimal}%
            </Typography>
          </>
        }
        hoverSubmission={`${totalSubm} submission`}
      />
          </Box>
          <Box style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center'  }}>
            <Box display="flex" flexDirection="column" width="150px">
              <Card style={{ marginBottom: 8, padding: 5, textAlign: 'center' }}>
                <Typography variant="body2" style={{ color: '#28BABA' }}>{profileData?.allQuestionsCount[1]?.difficulty}</Typography>
                <Typography variant="body2">{profileData?.matchedUser?.submitStats?.acSubmissionNum[1].count}/{profileData?.allQuestionsCount[1]?.count}</Typography>
              </Card>
              <Card style={{ marginBottom: 8, padding: 5, textAlign: 'center' }}>
                <Typography variant="body2" style={{ color: '#FFAB22' }}>{profileData?.allQuestionsCount[2]?.difficulty}</Typography>
                <Typography variant="body2">{profileData?.matchedUser?.submitStats?.acSubmissionNum[2].count}/{profileData?.allQuestionsCount[2]?.count}</Typography>
              </Card>
              <Card style={{ padding: 5, textAlign: 'center' }}>
                <Typography variant="body2" style={{ color: '#F63635' }}>{profileData?.allQuestionsCount[3]?.difficulty}</Typography>
                <Typography variant="body2">{profileData?.matchedUser?.submitStats?.acSubmissionNum[3].count}/{profileData?.allQuestionsCount[3]?.count}</Typography>
              </Card>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AcceptanceAttemptStatsCard;
