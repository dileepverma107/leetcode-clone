import React, { useState, useEffect } from 'react';
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
  Box,
  Select,
  MenuItem,
  Container,
  InputAdornment,
  CircularProgress,
  useMediaQuery,
  useTheme as useMuiTheme,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Link } from 'react-router-dom';
import apiClient from '../apiClient';
import { useTheme } from '../../ThemeContext';
import '../../DarkMode.css';

const QuestionList = () => {
  const { darkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [questionsPerPage, setQuestionsPerPage] = useState(10);
  const [fetchError, setFetchError] = useState('');
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.post('', {
          query: `query { allQuestions { questionId title titleSlug difficulty topicTags { name } } }`,
        });

        if (response.data.errors) {
          setFetchError('Failed to fetch data. Please try again.');
          return;
        }
        const questions = response.data.data.allQuestions.map(q => ({
          id: q.questionId,
          name: q.title,
          titleSlug: q.titleSlug,
          difficulty: q.difficulty,
          topics: q.topicTags.map(tag => tag.name),
        }));
        setAllQuestions(questions);
        setFilteredQuestions(questions);
        setFetchError('');
      } catch (error) {
        setFetchError('Failed to fetch data. Please try again.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = allQuestions.filter((question) =>
      question.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuestions(filtered);
    setPage(1);
  }, [searchTerm, allQuestions]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageInputChange = (event) => {
    const pageNumber = parseInt(event.target.value, 10);
    if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredQuestions.length / questionsPerPage)) {
      setPage(pageNumber);
    }
  };

  const handleQuestionsPerPageChange = (event) => {
    setQuestionsPerPage(event.target.value);
    setPage(1);
  };

  const startIndex = (page - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const displayedQuestions = filteredQuestions.slice(startIndex, endIndex);

  const shadowStyle = {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: 'none',
    borderRadius: '4px',
  };

  const renderPaginationControls = () => (
    <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'stretch' : 'center'} justifyContent="space-between" sx={{ marginBottom: 3 }}>
      <Typography variant="body1" sx={{ marginBottom: isMobile ? 2 : 0 }}>
        Total {filteredQuestions.length} questions
      </Typography>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'stretch' : 'center'}>
        <Pagination
          count={Math.ceil(filteredQuestions.length / questionsPerPage)}
          page={page}
          onChange={handleChangePage}
          color={darkMode ? "secondary" : "primary"}
          siblingCount={isMobile ? 0 : 1}
          boundaryCount={isMobile ? 0 : 1}
          size={isMobile ? 'small' : 'medium'}
          sx={{ marginBottom: isMobile ? 2 : 0 }}
        />
        <Select
          value={questionsPerPage}
          onChange={handleQuestionsPerPageChange}
          sx={{
            marginLeft: isMobile ? 0 : 2,
            marginTop: isMobile ? 2 : 0,
            minWidth: 120,
            ...shadowStyle,
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            backgroundColor: darkMode ? '#444' : '#fff',
            color: darkMode ? '#fff' : 'inherit',
          }}
        >
          <MenuItem value={10}>10 / page</MenuItem>
          <MenuItem value={20}>20 / page</MenuItem>
          <MenuItem value={50}>50 / page</MenuItem>
          <MenuItem value={100}>100 / page</MenuItem>
        </Select>
      </Box>
      <Box display="flex" alignItems="center" sx={{ marginTop: isMobile ? 2 : 0 }}>
        <Typography variant="body2" sx={{ marginRight: 1 }}>
          Go to Page
        </Typography>
        <TextField
          type="number"
          size="small"
          InputProps={{
            inputProps: { min: 1, max: Math.ceil(filteredQuestions.length / questionsPerPage) },
          }}
          onChange={handlePageInputChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              const pageNumber = parseInt(event.target.value, 10);
              if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredQuestions.length / questionsPerPage)) {
                setPage(pageNumber);
              }
            }
          }}
          sx={{
            width: 70,
            ...shadowStyle,
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            backgroundColor: darkMode ? '#444' : '#fff',
            '& .MuiInputBase-input': {
              color: darkMode ? '#fff' : 'inherit',
            },
          }}
        />
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} className={darkMode ? 'dark-mode' : ''}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box sx={{ padding: 3, width: '100%' }}>
          <Box display="flex" alignItems="center" sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={handleSearch}
              sx={{
                ...shadowStyle,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                backgroundColor: darkMode ? '#444' : '#fff',
                '& .MuiInputBase-input': {
                  color: darkMode ? '#fff' : 'inherit',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: darkMode ? '#fff' : 'inherit' }} />
                  </InputAdornment>
                ),
              }}
            />
            {isMobile && (
              <IconButton onClick={() => setShowFilters(!showFilters)} sx={{ ml: 1 }}>
                <FilterListIcon />
              </IconButton>
            )}
          </Box>

          {(showFilters || !isMobile) && renderPaginationControls()}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
              <CircularProgress color={darkMode ? "secondary" : "primary"} />
            </Box>
          ) : fetchError ? (
            <Typography color="error" variant="body1">
              {fetchError}
            </Typography>
          ) : (
            <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: darkMode ? '#333' : '#fff' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {!isMobile && <TableCell>Number</TableCell>}
                    <TableCell>Name</TableCell>
                    {!isMobile && <TableCell>Difficulty</TableCell>}
                    {!isMobile && <TableCell>Topics</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedQuestions.map((question, index) => (
                    <TableRow key={question.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: darkMode ? '#444' : 'action.hover' } }}>
                      {!isMobile && <TableCell>{startIndex + index + 1}</TableCell>}
                      <TableCell>
                        <Link to={`/question/${question.titleSlug}`} style={{ textDecoration: 'none', color: darkMode ? '#fff' : 'inherit' }}>
                          {question.name}
                        </Link>
                        {isMobile && (
                          <Typography variant="caption" display="block" color="textSecondary">
                            {question.difficulty} | {question.topics.join(', ')}
                          </Typography>
                        )}
                      </TableCell>
                      {!isMobile && <TableCell>{question.difficulty}</TableCell>}
                      {!isMobile && <TableCell>{question.topics.join(', ')}</TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {renderPaginationControls()}
        </Box>
      </Box>
    </Container>
  );
};

export default QuestionList;