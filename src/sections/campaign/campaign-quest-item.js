/* eslint-disable no-nested-ternary */

// import { t } from 'i18next';
import PropTypes from 'prop-types';
import {
  useState,
  // useEffect, useRef, 
  useCallback
} from 'react';

import { alpha } from '@mui/material/styles';
// import { varTranHover } from 'src/components/animate';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
// import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
// import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import CardContent from '@mui/material/CardContent';
// import ListItemText from '@mui/material/ListItemText';
import ListItemText from '@mui/material/ListItemText';
import FormControlLabel from '@mui/material/FormControlLabel';

import Markdown from 'src/components/markdown';

// import { fDate } from 'src/utils/format-time';
// import { fCurrency } from 'src/utils/format-number';
// import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import {
  Upload,
  // UploadBox, UploadAvatar 
} from 'src/components/upload';

// import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------
// làm ngắn URL
const createShortenedUrl = (url) => {
  const startLength = 15;
  const endLength = 15;

  if (url.length <= startLength + endLength) {
    return url;
  }

  const start = url.slice(0, startLength);
  const end = url.slice(-endLength);

  return `${start}...${end}`;
};


const ShortenedUrl = ({ url }) => {
  const shortUrl = createShortenedUrl(url);

  return (
    <Tooltip title={url}>
      <Stack sx={{ display: 'inline-block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
        <Link href={url} target="_blank" rel="noopener noreferrer" underline="none">
          {shortUrl}
        </Link>
      </Stack>
    </Tooltip>
  );
};

// layout của một câu hỏi
const Question = ({ questionData }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults] = useState(false);

  const handleCheckboxChange = (event, answerName) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [answerName]: event.target.checked
    });
  };

  // const checkResults = () => {
  //   setShowResults(true);
  // };

  // const resetResults = () => {
  //   setSelectedAnswers({});
  //   setShowResults(false);
  // };

  return (
    <Stack sx={{ px: 1 }}>
      <Typography variant="h6" gutterBottom>
        {questionData.question}
      </Typography>
      <FormGroup>
        {questionData.answers.map((answer, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedAnswers[answer.name] || false}
                onChange={(event) => handleCheckboxChange(event, answer.name)}
                disabled={showResults}
              />
            }
            label={answer.name}
            style={
              showResults
                ? answer.value
                  ? { color: 'green' }
                  : selectedAnswers[answer.name]
                    ? { color: 'red' }
                    : {}
                : {}
            }
          />
        ))}
      </FormGroup>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={checkResults}
        disabled={showResults}
        style={{ marginRight: '10px' }}
      >
        Check Result
      </Button>
      {showResults && (
        <Button variant="contained" onClick={resetResults}>
          Reset
        </Button>
      )}
      {showResults && (
        <Alert severity="info" style={{ marginTop: '20px' }}>
          Correct answers are highlighted in green. Incorrect selections are highlighted in red.
        </Alert>
      )} */}
    </Stack>
  );
};

export default function CampignQuestItem({
  quest,
  sx
}) {

  const [files, setFiles] = useState([]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = useCallback(() => { }, []);
  // const handleRemoveAllFiles = useCallback(() => { }, []);


  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // console.log('quest: ', quest)

  const {
    description,
    submission_type,
    name,
    reward,
    actions
  } = quest;

  // hiện thị tên của nút làm nhiệm vụ tuỳ thuộc vào từng loại nhiệm vụ
  const getAcctionName = () => {
    let result = ''
    try {
      const actionName = actions[0]?.action

      // loại nhiệm vụ submit
      if (submission_type === 'submit') return "Submit"

      // các nhiệm vụ còn lại
      switch (actionName) {
        case 'quiz':
          result = "Submit answer"
          break;

        case 'visit_link':
          result = "Visit Now"
          break;

        default:
          // Replace underscores with spaces
          result = actionName.replace(/_/g, ' ');
          // Capitalize the first letter of each word
          result = result.replace(/\b\w/g, char => char.toUpperCase());
          break;
      }
    } catch (error) {
      console.log(error)
    }
    return result;
  }

  // nhiệm vụ vào link nào đó
  const renderVisitLinkQuest = () => {
    if (!actions[0].link) return null
    return (
      <Typography variant="body" >
        Click
        <Typography component="span" color='success.main' sx={{ px: 1 }}>
          {getAcctionName()}
        </Typography>
        button to visit&nbsp;
        <ShortenedUrl url={actions[0].link} />&nbsp;and wait at least

        <Typography component="span" color='success.main' sx={{ px: 0.5 }}>
          {actions[0].duration}s
        </Typography>

        to complete this quest
      </Typography>
    )
  }

  // nhiệm vụ liên quan tới discord, telegram, twitter (cần verify)
  const renderVerifyQuest = () => {
    if (!actions[0].link) return null
    return (
      <>
        <Typography variant="body" >
          <strong>Step 1: </strong>Click
          <Typography component="span" color='success.main' sx={{ px: 0.5 }}>
            {getAcctionName()}
          </Typography> button
          to access&nbsp;
          <ShortenedUrl url={actions[0].link} />
        </Typography>

        <Typography variant="body" >
          <strong>Step 2: </strong>Click <Typography component="span" color='warning.main' sx={{ px: 0.5 }}>
            Verify
          </Typography> and wait for system check your action!
        </Typography>
      </>
    )
  }

  // nhiệm vụ trả lời câu hỏi
  const renderQuizQuest = () => {
    if (!actions[0]?.quiz) return null
    return (
      <>
        {actions[0]?.quiz.map((question) => (
          <Question key={question.id} questionData={question} />
        ))}
      </>
    )
  }

  // nhiệm vụ liên quan tới upload file
  const renderSubmitQuest = (
    <Stack spacing={1.5}>
      <Markdown children={description} />
      {
        (actions.type === "url"
          || actions.type === "email"
          || actions.type === "text") && <TextField
          fullWidth
          placeholder={actions.type}
        />
      }

      {
        actions.type === "file" && <Upload
          multiple
          files={files}
          onDrop={handleDrop}
          onRemove={handleRemoveFile}
        // onRemoveAll={handleRemoveAllFiles}
        // onUpload={() => console.info('ON UPLOAD')}
        />
      }

    </Stack>
  )


  const renderQuestContent = () => {
    switch (submission_type) {
      case 'visit_link':
        return renderVisitLinkQuest();
      case 'quiz':
        return renderQuizQuest();
      case 'submit':
        return renderSubmitQuest;
      case 'twitter':
      case 'telegram':
      case 'discord':
        return renderVerifyQuest();
      default:
        return submission_type;
    }
  }

  // kiểm tra nhiệm vụ có cần nút verify hay không
  const checkVerifyBtn = () => {
    if (submission_type === "submit") return false
    if (submission_type === "quiz") return false
    if (actions[0]?.action === "visit_link") return false
    return true;
  }

  return (
    <Card
      sx={{
        my: 2,
        // p: 2,
        // boxShadow: 'none',
        borderRadius: 2,
        // color: (theme) => (theme.palette.mode === 'light' ? 'primary.darker' : 'primary.lighter'),
        // bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
        ...sx,
      }}
    >
      <Stack
        spacing={3}
        sx={{
          p: 2,
          cursor: 'pointer',
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
          },
        }}
        onClick={handleExpandClick}
      >

        <Stack direction="row" alignItems="center" >
          {/* <Avatar src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg" sx={{ width: 48, height: 48, mr: 2 }} /> */}
          <Iconify
            width={30}
            icon={
              (submission_type === "submit" && 'ic:round-upload') ||
              (submission_type === "discord" && 'ic:baseline-discord') ||
              (submission_type === "telegram" && 'basil:telegram-solid') ||
              (submission_type === "visit_link" && 'fa6-solid:link') ||
              (submission_type === "quiz" && 'mdi:quiz') ||
              (submission_type === 'twitter' && 'ri:twitter-x-fill') ||
              ''
            }
            color={
              (submission_type === "discord" && '#5865F2') ||
              (submission_type === "telegram" && '#0088cc') ||
              (submission_type === "quiz" && '#6640ce') ||
              (submission_type === 'twitter' && '#000000') || 'primary.main'
            }
            sx={{ mr: 1 }}
          />

          <ListItemText
            primary={
              <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
                {name}
              </Typography>
            } />

          <Box
            component="span"
            sx={{
              typography: 'button',
              color: 'success.main'
            }}
          >
            +{reward} Points
          </Box>
        </Stack>

      </Stack>

      <Collapse in={expanded} timeout="auto" unmountOnExit>

        <Stack sx={{ px: 3, pt: 1.5 }}>
          {renderQuestContent()}
        </Stack>

        <Stack spacing={2} direction="row" alignItems="center" sx={{ p: 3, pt: 2 }}>
          <Button
            fullWidth
            color="success"
            variant="soft"
            onClick={() => console.info('click')}
          >
            {getAcctionName()}
          </Button>

          {
            checkVerifyBtn() && <Button
              fullWidth
              color="warning"
              variant="soft"
              onClick={() => console.info('click')}
            >
              Verify
            </Button>
          }

        </Stack>

      </Collapse>

    </Card>
  );
}

CampignQuestItem.propTypes = {
  quest: PropTypes.object,
  sx: PropTypes.object,
  // onDelete: PropTypes.func,
  // onEdit: PropTypes.func,
  // onView: PropTypes.func,
};


Question.propTypes = {
  questionData: PropTypes.any
};

ShortenedUrl.propTypes = {
  url: PropTypes.string
};
