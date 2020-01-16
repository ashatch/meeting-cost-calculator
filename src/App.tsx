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
  paper: {
    textAlign: 'center',
  }
}));

function Infos() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://github.com/ashatch/meeting-cost-calculator">
        {'Project Home'}
      </Link>
    </Typography>
  );
}

export default function App() {
  const classes = useStyles();

  const defaultCurrency = "$";
  const defaultParticipantCount = "2";
  const defaultMeetingMinutes = "60";
  const defaultAverageSalary = "20000";

  const [currency, setCurrency] = useState<string>(defaultCurrency);
  const [participants, setParticipants] = useState<string>(defaultParticipantCount);
  const [meetingMinutes, setMeetingMinutes] = useState<string>(defaultMeetingMinutes);
  const [averageSalary, setAverageSalary] = useState<string>(defaultAverageSalary);
  const [cost, setCost] = useState<string>("1");

  useEffect(() => {
    const currencySymbol = currency.valueOf();
    const numParticipants = Number(participants.valueOf());
    const numMeetingMinutes = Number(meetingMinutes.valueOf());
    const numAverageSalary = Number(averageSalary.valueOf());
    const workingMinutesPerYear = 260 * 7.5 * 60;
    const cost = (numParticipants * numMeetingMinutes * numAverageSalary) / workingMinutesPerYear;    
    setCost(`${currencySymbol}${cost.toFixed(2)}`);
  }, [currency, participants, meetingMinutes, averageSalary]);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" align="center">
          Meeting Cost Calculator
        </Typography>              
      </Box>
      <Box className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">          
          <TextField
            defaultValue={defaultCurrency}
            id="input-currency"
            label="Currency"
            onChange={event => {setCurrency(event.target.value);}}
            variant="outlined" />

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
            label="Average yearly salary"
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
      <Typography variant="body2" color="textSecondary" align="center">
        {'7½ hour days, 260 working days per year'}
      </Typography>
      <Box m={10} />
      <Infos />
    </Container>
  );
}
