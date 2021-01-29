import React, { FunctionComponent } from 'react';
import { UserServer, UserServerQuestion } from 'types/Server';
import { Button, TextField, Grid } from '@material-ui/core';

interface Props {
  server: UserServer;
  handleDataChange(server: UserServer): void;
}

export const ServerQuizForm: FunctionComponent<Props> = ({
  server,
  handleDataChange,
}) => {
  const handleQuestionChange = (event, index) => {
    event.preventDefault();
    let tempQuestions = [...server.questions];
    let question = { ...server.questions[index] };
    if (!question) {
      return;
    }
    question.question = event.target.value;
    tempQuestions[index] = question;
    handleDataChange({ ...server, questions: tempQuestions });
  };

  const handleAnswerChange = (event, index) => {
    event.preventDefault();
    let tempQuestions = [...server.questions];
    let question = { ...server.questions[index] };
    if (!question) {
      return;
    }
    question.answer = event.target.value;
    tempQuestions[index] = question;
    handleDataChange({ ...server, questions: tempQuestions });
  };

  const questionMaps = server.questions?.map((q, index) => {
    return (
      <Grid item xs={12}>
        <form
          noValidate
          autoComplete="off"
          style={{ display: 'flex', width: '100%' }}
        >
          <TextField
            id="outlined-full-width"
            label="Quiz question"
            style={{ margin: 8 }}
            placeholder="Quiz question"
            value={q.question}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => handleQuestionChange(e, index)}
            variant="outlined"
          />

          <TextField
            id="outlined-full-width"
            label="Quiz answer"
            style={{ margin: 8 }}
            placeholder="Quiz answer"
            value={q.answer}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => handleAnswerChange(e, index)}
            variant="outlined"
          />
        </form>
      </Grid>
    );
  });

  // const newForm = () => {
  //     <form
  //         noValidate
  //         autoComplete="off"
  //         style={{ display: 'flex', width: '100%' }}
  //     >
  //         <TextField
  //             id="outlined-full-width"
  //             label="Quiz question"
  //             style={{ margin: 8 }}
  //             placeholder="Quiz question"
  //             value={q.question}
  //             fullWidth
  //             margin="normal"
  //             InputLabelProps={{
  //                 shrink: true,
  //             }}
  //             onChange={e => handleQuestionChange(e, index, true)}
  //             variant="outlined" />

  //         <TextField
  //             id="outlined-full-width"
  //             label="Quiz answer"
  //             style={{ margin: 8 }}
  //             placeholder="Quiz answer"
  //             value={q.answer}
  //             fullWidth
  //             margin="normal"
  //             InputLabelProps={{
  //                 shrink: true,
  //             }}
  //             onChange={e => handleAnswerChange(e, index, true)}
  //             variant="outlined" />
  //     </form>
  // }

  // questionMaps.push(newForm())

  const addNewQuestion = event => {
    event.preventDefault();
    let tempQuestions: UserServerQuestion[] = [];
    if (server && server.questions && server.questions.length !== 0) {
      tempQuestions = [...server.questions];
    }

    tempQuestions.push({ question: '', answer: '', id: '' });
    handleDataChange({ ...server, questions: tempQuestions });
  };
  return (
    <Grid container>
      {questionMaps}

      <Button variant="contained" color="secondary" onClick={addNewQuestion}>
        Add new question
      </Button>
    </Grid>
  );
};
