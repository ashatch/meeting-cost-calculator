import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/ashatch/">
        ashatch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  const classes = useStyles();

  const defaultParticipantCount = "2";
  const defaultMeetingMinutes = "60";
  const defaultAverageSalary = "12000";

  const [participants, setParticipants] = useState<string>(defaultParticipantCount);
  const [meetingMinutes, setMeetingMinutes] = useState<string>(defaultMeetingMinutes);
  const [averageSalary, setAverageSalary] = useState<string>(defaultAverageSalary);
  const [cost, setCost] = useState<string>("1");

  useEffect(() => {
    const numParticipants = Number(participants.valueOf());
    const numMeetingMinutes = Number(meetingMinutes.valueOf());
    const numAverageSalary = Number(averageSalary.valueOf());
    const workingMinutesPerYear = 260 * 7.5 * 60;
    const cost = (numParticipants * numMeetingMinutes * numAverageSalary) / workingMinutesPerYear;    
    setCost(`${cost.toFixed(2)}`);
  }, [participants, meetingMinutes, averageSalary]);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" align="center">
          Meeting Cost Calculator
        </Typography>              
      </Box>
      <Box>
        <form className={classes.root} noValidate autoComplete="off">          
          <TextField 
            defaultValue={defaultParticipantCount}
            id="input-participants"
            label="Number of participants"
            onChange={event => {setMeetingMinutes(event.target.value);}}
            variant="outlined" />

          <TextField
            defaultValue={defaultMeetingMinutes}
            id="input-meeting-minutes"
            label="Meeting length (minutes)"
            onChange={event => {setParticipants(event.target.value);}}
            variant="outlined"/>

          <TextField
            defaultValue={defaultAverageSalary}
            id="input-average-salary"
            label="Average salary"
            onChange={event => {setAverageSalary(event.target.value);}}
            variant="outlined"/>          
        </form>
      </Box>
      <Typography variant="body1" color="textSecondary" align="center">
        the meeting cost is
      </Typography>
      <Typography variant="h2" color="textSecondary" align="center">
        {cost}
      </Typography>
      <hr />
      <Copyright />
    </Container>
  );
}
