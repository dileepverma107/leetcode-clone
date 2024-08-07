import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {
  Select,
  MenuItem,
  IconButton,
  Typography,
  Paper,
  Button,
  TextField,
  Tabs,
  Tab,
  Box
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import ErrorIcon from '@mui/icons-material/Error';
import AceEditor from 'react-ace';

import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/');
ace.config.setModuleUrl('ace/mode/javascript_worker', 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-javascript.js');

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}));

const Header = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const EditorWrapper = styled(Paper)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const IOWrapper = styled(Paper)(({ theme }) => ({
  height: 'auto',
  minHeight: '100px',
  flexDirection: 'column',
  marginTop: '10px',
}));

const Footer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const CodeEditor = ({questionData}) => {
  const [code, setCode] = useState(`console.log("Hello, World!");`);
  const [language, setLanguage] = useState('javascript');
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ row: 1, column: 1 });
  const [activeTab, setActiveTab] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [fetchError, setFetchError] = useState('');

  // Define the list of languages you want to include
  const includedLanguages = ['java', 'c', 'cpp', 'python', 'javascript'];

  // Define language templates
  const languageTemplates = {
    java: `${questionData?.codeSnippets[1].code}`,
    c: `${questionData?.codeSnippets[4].code}`,
    cpp: `${questionData?.codeSnippets[0].code}`,
    python: `${questionData?.codeSnippets[2].code}`,
    javascript: `${questionData?.codeSnippets[6].code}`,
    ruby: `${questionData?.codeSnippets[13].code}`,
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('https://emkc.org/api/v2/piston/runtimes');
        console.log('Available languages:', response.data);
        let allLanguages = response.data;
        
        // Manually add Python and C++ if they're not provided by the API
        if (!allLanguages.some(lang => lang.language === 'python')) {
          allLanguages.push({ language: 'python', version: '3.x' });
        }
        if (!allLanguages.some(lang => lang.language === 'cpp')) {
          allLanguages.push({ language: 'cpp', version: '17' });
        }

        // Filter languages based on the includedLanguages list
        const filteredLanguages = allLanguages.filter(lang =>
          includedLanguages.includes(lang.language)
        );
        setLanguages(filteredLanguages);
        setFetchError('');
      } catch (error) {
        console.error('Error fetching languages:', error);
        setFetchError('Failed to load languages.');
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      // Implement auto-save logic here
      console.log('Auto-saved');
    }, 30000);

    return () => clearInterval(saveInterval);
  }, []);

  const handleRunCode = async () => {
    try {
      const response = await axios.post('https://leetcode-clone-a0ts.onrender.com/piston/execute', {
        language: language,
        code: code,
        stdin: stdin
      });

      const { run } = response.data;
      if (run) {
        const stdout = run.stdout || '';
        const stderr = run.stderr || '';
        const compileOutput = run.compile_output || '';

        if (stderr) {
          setError(stderr);
          setActiveTab(2);
        } else if (compileOutput) {
          setError(compileOutput);
          setActiveTab(2);
        } else {
          setOutput(stdout);
          setError('');
          setActiveTab(1);
        }
      }
    } catch (err) {
      setError('Error submitting code');
      setActiveTab(2);
      console.error(err);
    }
  };

  const handleReset = () => {
    setCode('');
    setOutput('');
    setError('');
  };

  const handleCursorChange = (selection) => {
    setCursorPosition({ row: selection.cursor.row + 1, column: selection.cursor.column + 1 });
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(languageTemplates[selectedLanguage] || '');
  };

  return (
    <Root>
      <EditorWrapper elevation={3}>
        <Header elevation={1}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {fetchError ? (
              <Typography color="error">{fetchError}</Typography>
            ) : (
              <Select
                value={language}
                onChange={handleLanguageChange}
                size="small"
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.language} value={lang.language}>
                    {lang.language.charAt(0).toUpperCase() + lang.language.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleRunCode}
              style={{ marginLeft: '16px' }}
            >
              Run Code
            </Button>
          </div>
          <IconButton color="default" onClick={handleReset} size="small">
            <RefreshIcon />
          </IconButton>
        </Header>
        <AceEditor
          mode={language}
          value={code}
          onChange={setCode}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          width="100%"
          height="100%"
          onCursorChange={handleCursorChange}
        />
        <Footer elevation={1}>
          <Typography variant="body2">Auto-saved</Typography>
          <Typography variant="body2">
            Ln {cursorPosition.row}, Col {cursorPosition.column}
          </Typography>
        </Footer>
      </EditorWrapper>

      <IOWrapper elevation={3}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} aria-label="io tabs" sx={{ minHeight: 32 }}>
          <Tab icon={<InputIcon />} label="Input" iconPosition="start" sx={{ minHeight: 30, height: 30, '& .MuiTab-wrapper': { textTransform: 'none' } }} />
          <Tab icon={<OutputIcon />} label="Output" iconPosition="start" sx={{ minHeight: 30, height: 30, '& .MuiTab-wrapper': { textTransform: 'none' } }} />
          <Tab icon={<ErrorIcon />} label="Error" iconPosition="start" sx={{ minHeight: 30, height: 30, '& .MuiTab-wrapper': { textTransform: 'none' } }} />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          <TextField
            multiline
            rows={4}
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            variant="outlined"
            fullWidth
            label="Standard Input"
          />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <TextField
            multiline
            rows={4}
            value={output}
            variant="outlined"
            fullWidth
            label="Standard Output"
            InputProps={{
              readOnly: true,
            }}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <TextField
            multiline
            rows={4}
            value={error}
            variant="outlined"
            fullWidth
            label="Error"
            InputProps={{
              readOnly: true,
            }}
          />
        </TabPanel>
      </IOWrapper>
    </Root>
  );
};

export default CodeEditor;
