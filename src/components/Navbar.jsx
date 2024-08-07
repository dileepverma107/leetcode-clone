import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Container, useMediaQuery, useTheme, Button, MenuItem, Select, FormControl, Menu, Alert, Link, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { LinkedIn, Twitter, GitHub, Instagram, Language, Brightness4, Brightness7, Home, Download as DownloadIcon, Menu as MenuIcon, Login as LoginIcon, Logout as LogoutIcon, AccountCircle, Close as CloseIcon, Code as CodeIcon } from '@mui/icons-material';
import profileImg from './me.jpg';
import { useNavigate } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../ThemeContext';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useClerk } from '@clerk/clerk-react';

const Navbar = ({ onDownload, setFormat }) => {
  const { darkMode, toggleDarkMode } = useCustomTheme();
  const [format, setLocalFormat] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const handleThemeToggle = () => {
    toggleDarkMode();
  };

  const handleRedirectHome = () => {
    navigate('/');
  };

  const handleDownload = () => {
    if (!format) {
      setErrorMessage('Please choose a format.');
      return;
    }
    onDownload(format);
  };

  const handleFormatChange = (event) => {
    const newFormat = event.target.value;
    setLocalFormat(newFormat);
    setFormat(newFormat);
    setErrorMessage('');
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const socialIcons = [
    { icon: <LinkedIn />, href: "https://www.linkedin.com/in/dileep-verma-35a319139/", label: "LinkedIn", color: "#0A66C2" },
    { icon: <Twitter />, href: "https://x.com/nextgensolver", label: "Twitter", color: "#1DA1F2" },
    { icon: <GitHub />, href: "https://github.com/dileepverma107", label: "GitHub", color: darkMode ? '#fff' : '#333' },
    { icon: <Instagram />, href: "https://www.instagram.com/dileepverma107/", label: "Instagram", color: "#C13584" },
    { icon: <Language />, href: "https://dileep-verma-portfolio.vercel.app/", label: "Portfolio", color: darkMode ? '#fff' : '#000' },
  ];

  const drawerContent = (
    <Box
      sx={{ width: 250, backgroundColor: darkMode ? '#000' : '#fff', color: darkMode ? '#fff' : '#000'}}
      role="presentation"
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
        </IconButton>
      </Box>
      <List>
        <ListItem button onClick={handleRedirectHome}>
          <ListItemIcon>
            <Home sx={{ color: darkMode ? '#fff' : '#000' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <SignedIn>
          <ListItem button component={Link} href="/solve-problems">
            <ListItemIcon>
              <CodeIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
            </ListItemIcon>
            <ListItemText primary="Solve Problems" />
          </ListItem>
          <ListItem>
            <FormControl fullWidth variant="outlined">
              <Select
                sx={{ width: 250, backgroundColor: darkMode ? '#000' : '#fff', color: darkMode ? '#fff' : '#000'}}
                value={format}
                onChange={handleFormatChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Choose format' }}
              >
                <MenuItem value="" disabled>Choose format</MenuItem>
                <MenuItem value="image">Image</MenuItem>
                <MenuItem value="pdf">PDF</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem button onClick={handleDownload}>
            <ListItemIcon>
              <DownloadIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
            </ListItemIcon>
            <ListItemText primary="Download Stats" />
          </ListItem>
        </SignedIn>
      </List>
      <Divider />
      <List>
        {socialIcons.map((item) => (
          <ListItem button key={item.label} component="a" href={item.href} target="_blank">
            <ListItemIcon sx={{ color: darkMode ? '#fff' : item.color }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem button onClick={handleThemeToggle}>
          <ListItemIcon>
            {darkMode ? <Brightness7 sx={{ color: '#fff' }} /> : <Brightness4 sx={{ color: '#000' }} />}
          </ListItemIcon>
          <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <SignedOut>
          <SignInButton mode="modal">
            <ListItem button>
              <ListItemIcon>
                <LoginIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItem>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <ListItem button onClick={() => signOut()}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </SignedIn>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          boxShadow: darkMode ? '0px 4px 20px rgba(255, 255, 255, 0.2)' : '0px 4px 20px rgba(0, 0, 0, 0.1)',
          backgroundColor: darkMode ? '#333' : '#fff',
          color: darkMode ? '#fff' : '#000',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
              <Box display="flex" alignItems="center">
                <img
                  src={profileImg}
                  alt="Dileep Verma"
                  style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 8, cursor: 'pointer' }}
                  onClick={handleRedirectHome}
                />
                <Typography 
                  variant="h6" 
                  component="div"
                  onClick={handleRedirectHome}
                  sx={{ cursor: 'pointer' }}
                >
                  ɖıƖɛɛ℘ ۷ɛཞɱą
                </Typography>
              </Box>
              
              {isMobile ? (
                <>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={toggleDrawer(true)}
                    aria-label="menu"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                  >
                    {drawerContent}
                  </Drawer>
                </>
              ) : (
                <Box display="flex" alignItems="center">
                  <SignedIn>
                    <Button
                      component={Link}
                      href="/solve-problems"
                      variant="contained"
                      startIcon={<CodeIcon />}
                      sx={{
                        marginRight: 2,
                        backgroundColor: theme.palette.primary.main,
                        color: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                          transform: 'translateY(-2px)',
                          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                        },
                      }}
                    >
                      Solve Problems
                    </Button>
                    <FormControl variant="outlined" sx={{ minWidth: 150, marginRight: 2 }}>
                      <Select
                        value={format}
                        onChange={handleFormatChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Choose format' }}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '& .MuiSelect-root': {
                            padding: '8px 14px',
                            backgroundColor: darkMode ? '#444' : '#f0f0f0',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s',
                          },
                          '&:hover .MuiSelect-root': {
                            backgroundColor: darkMode ? '#555' : '#e0e0e0',
                          },
                          '& .MuiSelect-icon': {
                            color: darkMode ? '#fff' : '#000',
                          },
                        }}
                      >
                        <MenuItem value="" disabled> 
                          Choose format
                        </MenuItem>
                        <MenuItem value="image">Image</MenuItem>
                        <MenuItem value="pdf">PDF</MenuItem>
                      </Select>
                    </FormControl>
                    <Box sx={{ position: 'relative', width: 'auto' }}>
                      <Button
                        onClick={handleDownload}
                        variant="contained"
                        color="secondary"
                        startIcon={<DownloadIcon />}
                        sx={{
                          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                          '&:hover': {
                            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
                            backgroundColor: '#d32f2f',
                          },
                        }}
                      >
                        Download Stats
                      </Button>
                      {errorMessage && (
                        <Alert
                          severity="error"
                          onClose={() => setErrorMessage('')}
                          sx={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            margin: '0 auto',
                            width: '100%',
                            zIndex: 2,
                            backgroundColor: darkMode ? '#ffcccc' : '#ffe6e6',
                            color: darkMode ? '#d32f2f' : '#c62828',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          {errorMessage}
                        </Alert>
                      )}
                    </Box>
                  </SignedIn>
                  <IconButton 
                    onClick={handleRedirectHome} 
                    color="inherit" 
                    aria-label="home"
                    sx={{ color: darkMode ? '#fff' : '#000', marginLeft: 2 }}
                  >
                    <Home />
                  </IconButton>
                  <Box 
                    sx={{ 
                      borderLeft: `1px solid ${darkMode ? '#666' : '#ddd'}`,
                      height: '24px',
                      marginX: 2
                    }} 
                  />
                  <Box display="flex" alignItems="center">
                    {socialIcons.map((item, index) => (
                      <IconButton key={index} href={item.href} target="_blank" aria-label={item.label}>
                        {React.cloneElement(item.icon, { 
                          sx: { 
                            color: darkMode ? '#fff' : item.color
                          } 
                        })}
                      </IconButton>
                    ))}
                    <IconButton onClick={handleThemeToggle} aria-label="Toggle dark/light mode">
                      {darkMode ? <Brightness7 sx={{ color: '#fff' }} /> : <Brightness4 sx={{ color: '#000' }} />}
                    </IconButton>
                  </Box>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <IconButton aria-label="Sign In">
                        <LoginIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
                      </IconButton>
                    </SignInButton>
                  </SignedOut>
                </Box>
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;