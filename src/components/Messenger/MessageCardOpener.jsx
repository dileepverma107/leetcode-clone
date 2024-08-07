import React, { useState, useEffect, useRef, useMemo } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import EmojiPicker from 'emoji-picker-react';
import moment from 'moment';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import chatBg from './chat-background.jpg';
import chatBgDark from './dark-mode.jpg';

const ChatWidget = styled(Paper)(({ theme, visible, isMobile }) => ({
  position: 'fixed',
  bottom: 0,
  right: 0,
  width: isMobile ? '100%' : 370,
  height: isMobile ? '93%' : 600,
  maxHeight: '100%',
  maxWidth: isMobile ? '100%' : 'calc(100% - 48px)',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: isMobile ? 0 : 12,
  border: isMobile ? 'none' : `2px solid ${theme.palette.primary.main}`,
  overflow: 'hidden',
  boxShadow: isMobile ? 'none' : '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  transform: visible ? 'translateY(0)' : isMobile ? 'translateY(100%)' : 'translateY(calc(100% + 70px))',
  opacity: visible ? 1 : 0,
  zIndex: 1001,
}));

const transformUsername = (username) => {
  const parts = username.split(/[._]/);
  return parts
    .filter((part) => isNaN(part))
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const MessengerIcon = styled('div')(({ theme, isMobile, visible }) => ({
  position: 'fixed',
  bottom: 20,
  right: 20,
  width: isMobile ? 50 : 60,
  height: isMobile ? 50 : 60,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  display: visible && isMobile ? 'none' : 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  transition: 'all 0.3s ease',
  zIndex: 1000,
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const MessengerIconInner = styled('div')(({ theme }) => ({
  width: 0,
  height: 0,
  borderLeft: '10px solid transparent',
  borderRight: '10px solid transparent',
  borderBottom: `20px solid ${theme.palette.background.paper}`,
  transform: 'rotate(-45deg)',
  marginLeft: '-5px',
  marginTop: '-5px',
}));

const ConversationList = styled(List)(({ theme }) => ({
  padding: 0,
  margin: 0,
  listStyle: 'none',
  flex: 1,
  overflowY: 'scroll',
  backgroundImage: theme.palette.mode === 'dark' ? `url(${chatBgDark})` : `url(${chatBg})`,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'inherit',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '-ms-overflow-style': 'none',
  'scrollbar-width': 'none',
}));

const ConversationItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  marginRight: 10,
}));

const InputContainer = styled('div')(({ theme, isMobile }) => ({
  display: 'flex',
  alignItems: 'center',
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  padding: isMobile ? '10px 5px' : '5px 10px',
  position: 'relative',
  zIndex: 1002,
}));

const EmojiPickerWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: '100%',
  left: 0,
  zIndex: 2,
  backgroundColor: 'white',
  boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: 12,
  width: '100%',
  maxHeight: 300,
  overflowY: 'auto',
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const HeaderContent = styled('div')(({ theme, isMobile }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: isMobile ? '10px 20px 10px 30px' : '10px', // Adjust padding for mobile
}));


const ErrorAlert = styled(Alert)(({ theme }) => ({
  width: '100%',
}));

const HeaderText = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '10px',
}));

const MessageBody = styled('div')(({ theme, messageType }) => ({
  width: '100%',
  position: 'relative',
  marginBottom: '10px',
  textAlign: messageType === 'sender' ? 'right' : 'left',
}));

const MessageContent = styled('div')(({ theme, messageType }) => ({
  display: 'flex',
  flexDirection: messageType === 'sender' ? 'row-reverse' : 'row',
  alignItems: 'flex-start',
  width: '100%',
  position: 'relative',
  marginBottom: '10px',
}));

const MessageContainer = styled('div')(({ theme, messageType }) => ({
  display: 'flex',
  flexDirection: messageType === 'sender' ? 'row-reverse' : 'row',
  justifyContent: messageType === 'sender' ? 'flex-end' : 'flex-start',
  marginBottom: '10px',
  width: '100%',
  padding: '0 10px',
}));

const UserInfo = styled('div')(({ theme, messageType }) => ({
  display: 'flex',
  flexDirection: messageType === 'sender' ? 'row-reverse' : 'row',
  alignItems: 'center',
  marginBottom: '5px',
  textAlign: messageType === 'sender' ? 'right' : 'left',
  marginRight: messageType === 'sender' ? '10px' : '10px',
}));

const MessageText = styled('div')(({ theme, messageType }) => ({
  backgroundColor: messageType === 'sender' 
    ? (theme.palette.mode === 'dark' ? '#1a5f7a' : '#D9FDD3')
    : (theme.palette.mode === 'dark' ? '#3b3b3b' : '#f5f6f7'),
  color: theme.palette.text.primary,
  padding: '10px',
  borderRadius: '10px',
  width: '200px',
  minHeight: '30px',
  wordWrap: 'break-word',
  margin: messageType === 'sender' ? '0 10px 0 0' : '0 0 0 10px',
  position: 'relative',
  paddingBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const MessageTextContent = styled('p')({
  margin: 0,
  padding: 0,
  fontSize:15,
});

const Timestamp = styled('span')(({ theme }) => ({
  position: 'absolute',
  right: '10px',
  bottom: '5px',
  fontSize: '0.7em',
  color: 'gray',
  whiteSpace: 'nowrap',
}));

const UserName = styled('span')(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '0.8em',
  display: 'flex',
  alignItems: 'center',
}));

const StatusIndicator = styled('i')(({ theme, messageType }) => ({
  color: messageType === 'sender' ? '#6c757d' : '#5cb85c',
  marginRight: '5px',
  fontSize: '0.8em',
}));

const StartChatButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  minWidth: '100px',
  height: '36px', // Reduced height
  padding: '0 16px', // Adjust padding as needed
  textTransform: 'none', // Prevents all-caps text
}));

const ButtonContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.875rem', // Slightly smaller font size
});

// Adjust the InputBase to match the new button height
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: '36px', // Match the button height
}));

const OnlineStatus = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}));

const OnlineIndicator = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#5cb85c',
  marginRight: 4,
}));



const ChatWidgetComponent = () => {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [channelId, setChannelId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState('');
  
  const widgetRef = useRef(null);
  const conversationListRef = useRef(null);
  const componentRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  
  useEffect(() => {
    const ws = new WebSocket('wss://my-discord-backend-websocket.onrender.com/');
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.channelId === channelId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };
    return () => ws.close();
  }, [channelId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [visible, animating, isMobile]);

  const handleToggleWidget = () => {
    setAnimating(true);
    setVisible((prev) => !prev);
    setTimeout(() => setAnimating(false), 300);
  };

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target) && visible && !animating) {
      handleToggleWidget();
    }
  };

  const scrollToBottom = () => {
    if (conversationListRef.current) {
      conversationListRef.current.scrollTop = conversationListRef.current.scrollHeight;
    }
  };

  // Function to get the current time in India
function getCurrentTimeInIndia() {
  const now = new Date();
  const indiaTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  return indiaTime;
}

function getGreeting() {
  const indiaTime = getCurrentTimeInIndia();
  const hour = indiaTime.getUTCHours();
  
  if (hour >= 5 && hour < 12) {
    return 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  } else if (hour >= 17 && hour < 22) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
}


  const createChannel = async () => {
    if (!sessionId.trim()) {
      setError('Username is mandatory to start!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://my-discord-backend.onrender.com/create-channel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
      if (response.ok) {
        const data = await response.json();
        setChannelId(data.channelId);
        setMessages([
          {
            username: '',
            content: `${getGreeting()}, How may I help you!`,
            timestamp: new Date().toLocaleString(),
          },
        ]);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create session. Please try again.');
      }
    } catch (error) {
      console.error('Error creating channel:', error);
      setError('An error occurred while creating the channel. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendMessageToBackend = async () => {
    if (!channelId) {
      setError('User is not created yet. Please enter a session ID and start chat first.');
      return;
    }
    try {
      const response = await fetch('https://my-discord-backend.onrender.com/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channelId, messageContent: inputMessage }),
      });
      if (response.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            username: 'You',
            content: inputMessage,
            timestamp: new Date().toLocaleString(),
          },
        ]);
        setInputMessage('');
      } else {
        console.error('Failed to send message:', response.statusText);
        setError('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Error sending message:', error);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInputMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError('');
  };

  return (
    <ThemeProvider theme={theme}>
      <div ref={componentRef}>
        <MessengerIcon 
          onClick={handleToggleWidget} 
          isMobile={isMobile} 
          visible={visible}
        >
          <MessengerIconInner />
        </MessengerIcon>
        <ChatWidget ref={widgetRef} visible={visible} isMobile={isMobile}>
          <Header>
            <Collapse in={!!error}>
              <ErrorAlert 
                severity="error" 
                onClose={handleCloseError}
              >
                {error}
              </ErrorAlert>
            </Collapse>
            <HeaderContent isMobile={isMobile}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AvatarStyle src="/me.jpg" />
                <HeaderText>
                <Typography variant={isMobile ? "subtitle1" : "h8"}>ɖıƖɛɛ℘ ۷ɛཞɱą</Typography>
                  <OnlineStatus>
                    <OnlineIndicator />
                    {channelId ? `online` : 'Offline'}
                  </OnlineStatus>
                </HeaderText>
              </div>
              <div>
                <IconButton onClick={toggleDarkMode} color="inherit">
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                {isMobile && (
                  <IconButton onClick={handleToggleWidget}>
                    ✕
                  </IconButton>
                )}
              </div>
            </HeaderContent>
          </Header>
          <ConversationList ref={conversationListRef}>
            {messages.map((msg, index) => (
              <ConversationItem key={index}>
                <MessageContainer messageType={msg.username === "You" ? "sender" : "receiver"}>
                  <MessageBody>
                    <UserInfo messageType={msg.username === "You" ? "sender" : "receiver"}>
                      <UserName>
                        <StatusIndicator
                          className="fa fa-circle online"
                          style={{
                            color: msg.username === "You" ? '#6c757d' : '#5cb85c',
                          }}
                        />
                        {msg.username === "You" ? "You" : (msg.username === "System" ? "System" : transformUsername(msg.username))}
                      </UserName>
                    </UserInfo>
                    <MessageContent messageType={msg.username === "You" ? "sender" : "receiver"}>
                      <MessageText messageType={msg.username === "You" ? "sender" : "receiver"}>
                        <MessageTextContent>{msg.content}</MessageTextContent>
                        <Timestamp>
                          {moment(msg.timestamp).format('LT')}
                        </Timestamp>
                      </MessageText>
                    </MessageContent>
                  </MessageBody>
                </MessageContainer>
              </ConversationItem>
            ))}
          </ConversationList>
          <InputContainer>
            <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <EmojiEmotionsIcon />
            </IconButton>
            {channelId ? (
              <>
                <StyledInputBase
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  fullWidth
                />
                <IconButton color="primary" onClick={sendMessageToBackend}>
                  <SendIcon />
                </IconButton>
              </>
            ) : (
              <>
                <StyledInputBase
                  placeholder="Enter any username.."
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  fullWidth
                />
                <StartChatButton
                  onClick={createChannel}
                  disabled={loading}
                  variant="contained"
                >
                  <ButtonContent>
                    {loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Start Chat'
                    )}
                  </ButtonContent>
                </StartChatButton>
              </>
            )}
            {showEmojiPicker && (
              <EmojiPickerWrapper>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </EmojiPickerWrapper>
            )}
          </InputContainer>
        </ChatWidget>
      </div>
    </ThemeProvider>
  );
};

export default ChatWidgetComponent;