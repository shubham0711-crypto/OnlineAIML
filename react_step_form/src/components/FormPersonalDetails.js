import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class FormPersonalDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Enter Demographic Details" />
            <TextField
              placeholder="Enter Your Climate Desc"
              label="VarDesc"
              onChange={handleChange('VarDesc')}
              defaultValue={values.VarDesc}
              margin="normal"
              fullWidth
            />
            <br />
            <TextField
              placeholder="Enter Your UrbanPop"
              label="UrbanPop"
              onChange={handleChange('UrbanPop')}
              defaultValue={values.UrbanPop}
              margin="normal"
              fullWidth
            />
            <br />
            <TextField
              placeholder="Enter Your RuralPop"
              label="RuralPop"
              onChange={handleChange('RuralPop')}
              defaultValue={values.RuralPop}
              margin="normal"
              fullWidth
            />
            <TextField
            placeholder="Enter Your TotalPop"
            label="TotalPop"
            onChange={handleChange('TotalPop')}
            defaultValue={values.TotalPop}
            margin="normal"
            fullWidth
          />
            <TextField
            placeholder="Enter Your LendCat"
            label="LendCat"
            onChange={handleChange('LendCat')}
            defaultValue={values.LendCat}
            margin="normal"
            fullWidth
          />
            <br />
            
            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormPersonalDetails;
