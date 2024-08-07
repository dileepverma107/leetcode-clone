import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  CircularProgress,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco, dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CodeEditor from './CodeEditor';
import { useParams } from 'react-router-dom';
import apiClient from '../apiClient';
import { useTheme } from '../../ThemeContext';

const ProblemSolvingPage = () => {
  const { darkMode } = useTheme();
  const [tab, setTab] = useState(0);
  const [questionData, setQuestionData] = useState(null);
  const { titleSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  useEffect(() => {
    const fetchQuestionData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.post('', {
          query: `query getQuestionDetail($titleSlug: String!) { question(titleSlug: $titleSlug) { questionId title difficulty content exampleTestcases codeSnippets { lang langSlug code } topicTags { name slug } hints } }`,
          variables: {
            titleSlug: titleSlug
          },
        });

        if (response.data.errors) {
          setError('Failed to fetch question details. Please try again.');
        } else {
          setQuestionData(response.data.data.question);
          setError('');
        }
      } catch (error) {
        setError('Failed to fetch question details. Please try again.');
        console.error('Error fetching question details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionData();
  }, [titleSlug]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const tabColors = ['#1976d2', '#388e3c', '#ffa000', '#d32f2f'];

  const CustomTab = ({ icon, label, index, ...props }) => (
    <Tab
      {...props}
      sx={{
        minHeight: '45px',
        padding: '8px 8px',
        fontSize: '12px',
        color: darkMode ? '#fff' : tabColors[index],
        '&.Mui-selected': {
          color: darkMode ? '#fff' : tabColors[index],
          borderBottom: `3px solid ${tabColors[index]}`,
        },
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiTab-iconWrapper': {
          fontSize: '18px', // Adjust the icon size here
        },
      }}
      icon={icon}
      label={isMobile ? null : label}
    />
  );
  
  

  const renderContent = (content) => {
    const containerDiv = document.createElement('div');
    containerDiv.innerHTML = content;
    const elements = Array.from(containerDiv.childNodes);

    return elements.map((element, index) => {
      if (element.nodeName === 'PRE') {
        return (
          <Box key={index} sx={{ my: 2, position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                backgroundColor: darkMode ? '#555' : '#e8e8e8',
              }}
            />
            <SyntaxHighlighter
              language="text"
              style={darkMode ? dark : docco}
              customStyle={{
                backgroundColor: darkMode ? '#2d2d2d' : '#f7f9fa',
                padding: '16px 16px 16px 24px',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              {element.textContent}
            </SyntaxHighlighter>
          </Box>
        );
      } else {
        return <div key={index} dangerouslySetInnerHTML={{ __html: element.outerHTML }} />;
      }
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              height: '80vh', 
              display: 'flex', 
              flexDirection: 'column',
              bgcolor: darkMode ? '#333' : '#fff',
              color: darkMode ? '#fff' : 'inherit',
            }}
          >
            <Box 
              sx={{ 
                boxShadow: darkMode ? '0 4px 6px rgba(255, 255, 255, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px 8px 0 0',    
                height: '45px',
              }}
            >
              <Tabs 
                value={tab} 
                onChange={handleTabChange} 
                aria-label="problem tabs"
                sx={{ 
                  bgcolor: darkMode ? '#444' : 'background.paper',
                  height: '100%',
                  '& .MuiTabs-flexContainer': {
                    height: '100%',
                  },
                  '& .MuiTab-root': { 
                    height: '100%',
                  },
                  '& .MuiTabs-indicator': { 
                    display: 'none',
                  },
                }}
              >
                <CustomTab icon={<DescriptionIcon />} label="Description" index={0} />
                <CustomTab icon={<EditIcon />} label="Editorial" index={1} />
                <CustomTab icon={<LightbulbIcon />} label="Solutions" index={2} />
                <CustomTab icon={<AssignmentTurnedInIcon />} label="Submissions" index={3} />
              </Tabs>
            </Box>
            <Box sx={{ p: 3, overflowY: 'auto', flexGrow: 1 }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress color={darkMode ? "secondary" : "primary"} />
                </Box>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <>
                  {tab === 0 && questionData && (
                    <>
                      <Typography variant="h5" gutterBottom>
                        {questionData.title}
                      </Typography>
                      <Typography variant="subtitle1" color={darkMode ? "rgba(255, 255, 255, 0.7)" : "textSecondary"} gutterBottom>
                        Difficulty: {questionData.difficulty}
                      </Typography>
                      {renderContent(questionData.content)}
                    </>
                  )}
                  {tab === 1 && <Typography>Editorial content goes here</Typography>}
                  {tab === 2 && <Typography>Solutions content goes here</Typography>}
                  {tab === 3 && <Typography>Submissions content goes here</Typography>}
                </>
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              height: '80vh', 
              display: 'flex', 
              flexDirection: 'column',
              bgcolor: darkMode ? '#333' : '#fff',
              color: darkMode ? '#fff' : 'inherit',
            }}
          >
            <CodeEditor questionData={questionData} darkMode={darkMode} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProblemSolvingPage;
