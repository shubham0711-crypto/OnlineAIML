import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
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
            <AppBar title="Enter User Details" />
            <TextField
              placeholder="Enter Your Admin Name"
              label="Admin Name"
              onChange={handleChange('AdminName')}
              defaultValue={values.AdminName}
              margin="normal"
              fullWidth
            />
            <br />
            <TextField
              placeholder="Enter Your GeoRegion"
              label="GeoRegion"
              onChange={handleChange('GeoRegion')}
              defaultValue={values.GeoRegion}
              margin="normal"
              fullWidth
            />
            <br />
            <TextField
              placeholder="Enter Your GeoSubreg"
              label="GeoSubreg"
              onChange={handleChange('GeoSubreg')}
              defaultValue={values.GeoSubreg}
              margin="normal"
              fullWidth
            />
           
            <br />
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

export default FormUserDetails;
