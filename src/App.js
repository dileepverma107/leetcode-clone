import React, { useRef, useEffect, useState, useCallback } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from './components/LeetCodeProfile/UserProfile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeComponent from './components/HomeComponent';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import MessengerCardOpener from "./components/Messenger/MessageCardOpener";
import QuestionList from './components/LeetCodeQuestionsComponent/QuestionList';
import ProblemSolvingPage from './components/LeetCodeQuestionsComponent/ProblemSolvingPage';
import { ThemeProvider } from './ThemeContext';
import { RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';

function App() {
  const contentRef = useRef();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [format, setFormat] = useState('');
  const location = useLocation();

  const loadImages = useCallback(() => {
    const images = document.images;
    let loaded = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }

    const imageLoaded = () => {
      loaded++;
      if (loaded === totalImages) {
        setImagesLoaded(true);
      }
    };

    for (let i = 0; i < totalImages; i++) {
      if (images[i].complete) {
        imageLoaded();
      } else {
        images[i].addEventListener('load', imageLoaded);
        images[i].addEventListener('error', imageLoaded);
      }
    }
  }, []);

  useEffect(() => {
    setImagesLoaded(false);
    loadImages();
  }, [location, loadImages]);

  const handleDownload = useCallback((selectedFormat) => {
    console.log('handleDownload called in App.js');
    console.log('Selected format:', selectedFormat);
    console.log('contentRef:', contentRef.current);
    console.log('imagesLoaded:', imagesLoaded);

    if (!contentRef.current) {
      console.error('Content reference is not available');
      return;
    }

    const captureContent = () => {
      return html2canvas(contentRef.current, { 
        useCORS: true, 
        allowTaint: true, 
        scale: 2,
        logging: true,
        onclone: (clonedDoc) => {
          console.log('Cloned document:', clonedDoc);
        }
      });
    };

    if (selectedFormat === 'image') {
      captureContent().then((canvas) => {
        console.log('html2canvas completed');
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'user_profile.png';
        link.click();
      }).catch(error => {
        console.error('Error in html2canvas:', error);
      });
    } else if (selectedFormat === 'pdf') {
      captureContent().then((canvas) => {
        console.log('html2canvas completed for PDF');
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('user_profile.pdf');
      }).catch(error => {
        console.error('Error in html2canvas for PDF:', error);
      });
    }
  }, [imagesLoaded]);

  return (
    <div>
      <ThemeProvider>
        <MessengerCardOpener />
        <Navbar onDownload={handleDownload} setFormat={setFormat} />
        <div ref={contentRef}>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/user-profile"
              element={
                <SignedIn>
                  <div style={{ paddingTop: '64px' }}>
                    <UserProfile />
                  </div>
                </SignedIn>
              }
            />
            <Route
              path="/question/:titleSlug"
              element={
                <SignedIn>
                  <div style={{ paddingTop: '64px' }}>
                    <ProblemSolvingPage />
                  </div>
                </SignedIn>
              }
            />
            <Route
              path="/solve-problems"
              element={
                <SignedIn>
                  <div style={{ paddingTop: '64px' }}>
                    <QuestionList />
                  </div>
                </SignedIn>
              }
            />
          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;