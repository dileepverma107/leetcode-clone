import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Box, Divider, Select, MenuItem, TextField, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DownloadIcon from '@mui/icons-material/Download';

const UserProfile = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = 30; // Number of days to show in each month (for simplicity, using 30)

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Box display="flex" justifyContent="center" padding={2}>
      <Grid container spacing={2} style={{ maxWidth: '1200px' }}>
        {/* Left Vertical Card */}
        <Grid item xs={12} md={3}>
          <Card style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar
                  alt="User Avatar"
                  src="https://assets.leetcode.com/users/dileepverma107/avatar_1711819606.png"
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 16,
                    borderRadius: 12, // Rounded corners
                  }}
                />
                <Box>
                  <Typography variant="h5" style={{ fontSize: '1.2rem' }}>
                    dileepverma107
                  </Typography>
                  <Typography variant="body2">Rank: 969,679</Typography>
                </Box>
              </Box>
              
              {/* New Input and Buttons */}
              <Box display="flex" flexDirection="column" alignItems="center" marginTop={2}>
                <Box display="flex" alignItems="center" marginBottom={2}>
                  <TextField
                    placeholder="Enter username"
                    variant="outlined"
                    size="small"
                    style={{ marginRight: 8 }}
                  />
                  <Button variant="contained" color="primary">Generate</Button>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DownloadIcon />}
                  style={{ marginTop: 8 }}
                >
                  Download
                </Button>
              </Box>

              <Divider style={{ margin: '20px 0' }} />
              <Typography variant="h6">Community Stats</Typography>
              <Box marginBottom={2}>
                <Typography variant="body2" style={{ marginBottom: 8 }}>
                  <strong>Views:</strong> 137
                </Typography>
                <Typography variant="body2" style={{ marginBottom: 8 }}>
                  Last week: 0
                </Typography>
                <Typography variant="body2" style={{ marginBottom: 8 }}>
                  <strong>Solutions:</strong> 7
                </Typography>
                <Typography variant="body2" style={{ marginBottom: 8 }}>
                  Last week: +1
                </Typography>
                <Typography variant="body2" style={{ marginBottom: 8 }}>
                  <strong>Discuss:</strong> 0
                </Typography>
                <Typography variant="body2" style={{ marginBottom: 8 }}>
                  Last week: 0
                </Typography>
                <Typography variant="body2" style={{ marginBottom: 8 }}>
                  <strong>Reputation:</strong> 0
                </Typography>
                <Typography variant="body2">
                 Last week: 0
                </Typography>
              </Box>
              
              <Divider style={{ margin: '20px 0' }} />
              <Typography variant="h6">Problem Solving Stats</Typography>
              <Typography>Languages:</Typography>
              <Typography>Java: 94 problems solved</Typography>
              <Typography>MySQL: 1 problem solved</Typography>
              <Typography>Skills:</Typography>
              <Typography>Advanced: Dynamic Programming (8), Divide and Conquer (6), Union Find (4)</Typography>
              <Typography>Intermediate: Hash Table (20), Math (15), Binary Search (14)</Typography>
              <Typography>Fundamental: Array (44), Two Pointers (27), String (24)</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side Content */}
        <Grid container item xs={12} md={9} spacing={2}>
          <Grid container item xs={12} spacing={2}>
            {/* Acceptance and Attempt Stats */}
            <Grid item xs={12} md={6}>
              <Card style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CircularProgress
                        variant="determinate"
                        value={52.82}
                        size={100}
                        thickness={4}
                        style={{ color: '#4CAF50' }}
                      />
                      <Box position="absolute">
                        <Typography variant="body2" align="center" style={{ color: '#4CAF50' }}>
                          Acceptance Rate: 52.82%
                        </Typography>
                        <Typography variant="body2" align="center" style={{ color: 'gray' }}>
                          Beats: 75.89%, 72.36%, 40.61%
                        </Typography>
                        <Typography variant="body2" align="center" style={{ color: 'gray' }}>
                          Total Attempts: 9
                        </Typography>
                      </Box>
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Box display="flex" flexDirection="column">
                        <Card style={{ marginBottom: 8, padding: 8, textAlign: 'center' }}>
                          <Typography variant="body2">Easy</Typography>
                          <Typography variant="body2">47/813</Typography>
                        </Card>
                        <Card style={{ marginBottom: 8, padding: 8, textAlign: 'center' }}>
                          <Typography variant="body2">Medium</Typography>
                          <Typography variant="body2">44/1697</Typography>
                        </Card>
                        <Card style={{ padding: 8, textAlign: 'center' }}>
                          <Typography variant="body2">Hard</Typography>
                          <Typography variant="body2">4/721</Typography>
                        </Card>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Badges */}
            <Grid item xs={12} md={6}>
              <Card style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6">Badges</Typography>
                  <Typography>Total Badges: 1</Typography>
                  <Typography>
                    Most Recent Badge: <img src="https://assets.leetcode.com/static_assets/marketing/2024-50-lg.png" alt="50 Days Badge 2024" style={{ width: '50px' }} />
                  </Typography>
                  <Typography>Badge Description: 50 Days Badge 2024</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Activity Stats */}
          <Grid item xs={12}>
            <Card style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
                  <Box display="flex" alignItems="center" style={{ marginRight: 'auto' }}>
                    <Typography variant="body2" style={{ marginRight: 16 }}>
                      Total Active Days: 64
                    </Typography>
                    <Typography variant="body2" style={{ marginRight: 16 }}>
                      Max Streak: 6
                    </Typography>
                    <Typography variant="body2" style={{ marginRight: 16 }}>
                      Activity by Month:
                    </Typography>
                    <Select
                      value={selectedYear}
                      onChange={handleYearChange}
                      style={{ marginLeft: 0 }}
                    >
                      {[2022, 2023, 2024].map(year => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Typography variant="body2" style={{ marginLeft: 'auto' }}>
                    Total Submissions in the Past Year: 235
                  </Typography>
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                  {months.map((month, index) => (
                    <Box key={index} textAlign="center" padding={1}>
                      <Typography variant="body2" color="textSecondary">{month}</Typography>
                      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={0.5}>
                        {[...Array(days)].map((_, dayIndex) => (
                          <Box
                            key={dayIndex}
                            width={8}
                            height={8}
                            borderRadius="50%"
                            bgcolor={Math.random() > 0.5 ? '#4CAF50' : '#e0e0e0'}
                            style={{ cursor: 'pointer', display: 'inline-block' }}
                          />
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12}>
            <Card style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6">Recent Activity</Typography>
                <Typography>
                  Most Recent Submissions:
                  <ul>
                    <li><a href="https://leetcode.com/submissions/detail/1333792578/">Pow(x, n)</a> - an hour ago</li>
                    <li><a href="https://leetcode.com/submissions/detail/1333775057/">String to Integer (atoi)</a> - an hour ago</li>
                    <li><a href="https://leetcode.com/submissions/detail/1333635625/">Is Subsequence</a> - 5 hours ago</li>
                    <li><a href="https://leetcode.com/submissions/detail/1331699657/">Kth Missing Positive Number</a> - 2 days ago</li>
                    <li><a href="https://leetcode.com/submissions/detail/1331579895/">Find the Smallest Divisor Given a Threshold</a> - 2 days ago</li>
                    <li><a href="https://leetcode.com/submissions/detail/1330313098/">Append Characters to String to Make Subsequence</a> - 3 days ago</li>
                    <li><a href="https://leetcode.com/submissions/detail/1328466484/">Reverse Pairs</a> - 5 days ago</li>
                    <li><a href="https://leetcode.com/submissions/detail/1328387707/">Find First and Last Position of Element in Sorted Array</a> - 5 days ago</li>
                    <li><a href="https://leetcode.com/submissions/detail/1327353069/">Search Insert Position</a> - 6 days ago</li>
                    <li><a href="https://leetcode.com/submissions/detail/1327169247/">Single Element in a Sorted Array</a> - 6 days ago</li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
