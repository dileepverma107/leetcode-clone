import React, { useState } from 'react';
import { Typography, Box, Divider, Button } from '@mui/material';

const ProblemSolvingStatsCard = ({problemsData}) => {
  const [showMoreAdvanced, setShowMoreAdvanced] = useState(false);
  const [showMoreIntermediate, setShowMoreIntermediate] = useState(false);
  const [showMoreFundamental, setShowMoreFundamental] = useState(false);
  
  const maxVisibleSkills = 2; // Maximum number of visible skills before "Show more..."
  const skills = problemsData?.matchedUser?.tagProblemCounts || [];

  /*const skills = {
    advanced: [
      { tagName: 'Dynamic Programming', count: 8 },
      { tagName: 'Divide and Conquer', count: 6 },
      { tagName: 'Union Find', count: 4 },
      { tagName: 'Greedy', count: 7 },
    ],
    intermediate: [
      { tagName: 'Hash Table', count: 20 },
      { tagName: 'Math', count: 15 },
      { tagName: 'Binary Search', count: 14 },
      { tagName: 'Bit Manipulation', count: 10 },
    ],
    fundamental: [
      { tagName: 'Array', count: 44 },
      { tagName: 'Two Pointers', count: 27 },
      { tagName: 'String', count: 24 },
      { tagName: 'Stack', count: 12 },
    ],
  };*/


  const languages = problemsData?.matchedUser?.languageProblemCount || [];


  const renderSkills = (skillSet, showMore, setShowMore) => {
    const displayedSkills = showMore ? skillSet : skillSet?.slice(0, maxVisibleSkills);

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {displayedSkills?.map((skill, index) => (
          <Box 
            key={index} 
            sx={{ 
              backgroundColor: '#e0e0e0', 
              borderRadius: 1, 
              padding: '4px 8px',
              display: 'inline-block'
            }}
          >
            <Typography variant="body2" component="span">
              {`${skill.tagName} (${skill.problemsSolved})`}
            </Typography>
          </Box>
        ))}
        {skillSet?.length > maxVisibleSkills && (
          <Button variant="text" size="small" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show less' : 'Show more...'}
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="subtitle1">Languages:</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {languages.map((language, index) => (
          <Box 
            key={index} 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Box 
              sx={{ 
                backgroundColor: '#e0e0e0', 
                borderRadius: 1, 
                padding: '4px 8px',
                display: 'inline-block'
              }}
            >
              <Typography variant="body2" component="span">
                {language.languageName}
              </Typography>
            </Box>
            <Typography variant="body2" component="span" sx={{ marginLeft: 'auto' }}>
              {language.problemsSolved} problem solved
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1">Skills:</Typography>
      <Typography variant="subtitle2">Advanced:</Typography>
      {renderSkills(skills.advanced, showMoreAdvanced, setShowMoreAdvanced)}
      <Typography variant="subtitle2">Intermediate:</Typography>
      {renderSkills(skills.intermediate, showMoreIntermediate, setShowMoreIntermediate)}
      <Typography variant="subtitle2">Fundamental:</Typography>
      {renderSkills(skills.fundamental, showMoreFundamental, setShowMoreFundamental)}
    </Box>
  );
};

export default ProblemSolvingStatsCard;
