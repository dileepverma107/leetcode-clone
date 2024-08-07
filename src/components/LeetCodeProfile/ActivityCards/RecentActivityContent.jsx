import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Box, Pagination } from '@mui/material';

/*const submissions = [
  { question: 'Pow(x, n)', time: 'an hour ago', link: 'https://leetcode.com/submissions/detail/1333792578/' },
  { question: 'String to Integer (atoi)', time: 'an hour ago', link: 'https://leetcode.com/submissions/detail/1333775057/' },
  { question: 'Is Subsequence', time: '5 hours ago', link: 'https://leetcode.com/submissions/detail/1333635625/' },
  { question: 'Kth Missing Positive Number', time: '2 days ago', link: 'https://leetcode.com/submissions/detail/1331699657/' },
  { question: 'Find the Smallest Divisor Given a Threshold', time: '2 days ago', link: 'https://leetcode.com/submissions/detail/1331579895/' },
  { question: 'Append Characters to String to Make Subsequence', time: '3 days ago', link: 'https://leetcode.com/submissions/detail/1330313098/' },
  { question: 'Reverse Pairs', time: '5 days ago', link: 'https://leetcode.com/submissions/detail/1328466484/' },
  { question: 'Find First and Last Position of Element in Sorted Array', time: '5 days ago', link: 'https://leetcode.com/submissions/detail/1328387707/' },
  { question: 'Search Insert Position', time: '6 days ago', link: 'https://leetcode.com/submissions/detail/1327353069/' },
  { question: 'Single Element in a Sorted Array', time: '6 days ago', link: 'https://leetcode.com/submissions/detail/1327169247/' },
];*/

const RecentActivityContent = ({recentAc}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  
  const submissions = recentAc?.recentAcSubmissionList;
  console.log('Recent Activity:', submissions);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedSubmissions = submissions?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const timestampConverter = (timestamp) => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const elapsedTime = currentTime - timestamp;
  
    const secondsInAnHour = 3600;
    const secondsInADay = 86400;
    const secondsInAMonth = 30 * secondsInADay;
    const secondsInAYear = 12 * secondsInAMonth;
  
    if (elapsedTime < secondsInADay) {
      const hours = Math.floor(elapsedTime / secondsInAnHour);
      return `${hours} hour ago`;
    } else if (elapsedTime <= secondsInAMonth) {
      const days = Math.floor(elapsedTime / secondsInADay);
      return `${days} day ago`;
    } else if (elapsedTime < secondsInAYear) {
      const months = Math.floor(elapsedTime / secondsInAMonth);
      return `${months} month ago`;
    } else {
      const years = Math.floor(elapsedTime / secondsInAYear);
      return `${years} year ago`;
    }
  };
  
  

  return (
    <>
      <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
        <Table aria-label="recent activity table">
          <TableBody>
            {paginatedSubmissions?.map((submission, index) => (
              <TableRow
                key={index}
                component="a"
                href={submission.link}
                target="_blank"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff'
                }}
              >
                <TableCell component="th" scope="row">
                  {submission?.title}
                </TableCell>
                <TableCell align="right">{timestampConverter(submission.timestamp)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {submissions?.length > rowsPerPage && (
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Pagination
            count={Math.ceil(submissions.length / rowsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default RecentActivityContent;
