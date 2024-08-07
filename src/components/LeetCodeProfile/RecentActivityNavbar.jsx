import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ForumIcon from '@mui/icons-material/Forum';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const RecentActivityNavbar = ({ onSelect }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" style={{ background: '#fff', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" width="100%">
          <IconButton edge="start" aria-label="Recent AC" onClick={() => onSelect('recent')}>
            <HomeIcon style={{ color: '#f44336' }} />
          </IconButton>
          <a href="#" style={{ textDecoration: 'none', color: '#000', marginLeft: 8, marginRight: 16 }} onClick={(e) => { e.preventDefault(); onSelect('recent'); }}>
            {!isMobile && <Typography variant="body1">Recent AC</Typography>}
          </a>

          <IconButton aria-label="List" onClick={() => onSelect('list')}>
            <ListIcon style={{ color: '#2196f3' }} />
          </IconButton>
          <a href="#" style={{ textDecoration: 'none', color: '#000', marginLeft: 8, marginRight: 16 }} onClick={(e) => { e.preventDefault(); onSelect('list'); }}>
            {!isMobile && <Typography variant="body1">List</Typography>}
          </a>

          <IconButton aria-label="Solutions" onClick={() => onSelect('solutions')}>
            <CheckCircleIcon style={{ color: '#4caf50' }} />
          </IconButton>
          <a href="#" style={{ textDecoration: 'none', color: '#000', marginLeft: 8, marginRight: 16 }} onClick={(e) => { e.preventDefault(); onSelect('solutions'); }}>
            {!isMobile && <Typography variant="body1">Solutions</Typography>}
          </a>

          <IconButton aria-label="Discuss" onClick={() => onSelect('discuss')}>
            <ForumIcon style={{ color: '#ff9800' }} />
          </IconButton>
          <a href="#" style={{ textDecoration: 'none', color: '#000', marginLeft: 8 }} onClick={(e) => { e.preventDefault(); onSelect('discuss'); }}>
            {!isMobile && <Typography variant="body1">Discuss</Typography>}
          </a>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default RecentActivityNavbar;
