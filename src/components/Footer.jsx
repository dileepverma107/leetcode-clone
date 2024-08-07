import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';
import { GitHub, LinkedIn, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{
        backgroundColor: '#f8f9fa',
        padding: '16px 0',
        boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.1)',
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          {/* Left side with copyright */}
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Dileep Verma. All rights reserved.
          </Typography>

          {/* Center with social icons */}
          <Box display="flex" gap={2}>
            <Link href="https://github.com/dileepverma107" target="_blank" aria-label="GitHub">
              <GitHub sx={{ color: '#333' }} />
            </Link>
            <Link href="https://www.linkedin.com/in/dileep-verma-35a319139/" target="_blank" aria-label="LinkedIn">
              <LinkedIn sx={{ color: '#0A66C2' }} />
            </Link>
            <Link href="https://x.com/nextgensolver" target="_blank" aria-label="Twitter">
              <Twitter sx={{ color: '#1DA1F2' }} />
            </Link>
            <Link href="https://www.instagram.com/dileepverma107" target="_blank" aria-label="Instagram">
              <Instagram sx={{ color: '#C13584' }} />
            </Link>
          </Box>

          {/* Right side with additional links */}
          <Box display="flex" gap={2}>
            <Link href="https://dileep-verma-portfolio.vercel.app/" color="inherit" underline="hover">
              About
            </Link>
            <Link href="/contact" color="inherit" underline="hover">
              Contact
            </Link>
            <Link href="/privacy-policy" color="inherit" underline="hover">
              Privacy Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
