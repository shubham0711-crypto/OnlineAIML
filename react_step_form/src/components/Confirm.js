import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent'

export class Confirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      linearData: null,
      dialogOpen: false,
      ClassifierData: null
    };
  }

  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };


  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  handleCloseDialog = () => {
    this.setState({ dialogOpen: false });
  };
  handlePostRequest = () => {
    const { values } = this.props;
    const postData = JSON.stringify(values);
    // const postData = {
    //   values: Array.from(values), // Convert set to array before sending
    // };
   
    
    fetch('http://127.0.0.1:5000/api/Data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: postData,
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log(data['Linear_pred'])
        console.log(data['classifier_pred'])
        this.setState({ linearData: data['Linear_pred'],ClassifierData: data['classifier_pred'], dialogOpen: true });

      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  };

  render() {
    const { linearData, dialogOpen } = this.state;
    const { ClassifierData } = this.state;

    const {
      values: { AdminName, GeoRegion, GeoSubreg, LendCat, VarDesc, UrbanPop, RuralPop, TotalPop,UrbanLA, RuralLA, TotalLA }
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog open={dialogOpen} onClose={this.handleCloseDialog}>
          <DialogContent>
            {/* Render your data here */}
            {linearData && (
              <div>
                {/* Render your data fields */}
                <p>{linearData}</p>
                <p>{ClassifierData}</p>
                {/* Add more fields as needed */}
              </div>
            )}
          </DialogContent>
        </Dialog>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Confirm Data" />
            <List>
              <ListItem>
                <ListItemText primary="AdminName" secondary={AdminName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="GeoRegion" secondary={GeoRegion} />
              </ListItem>
              <ListItem>
                <ListItemText primary="GeoSubreg" secondary={GeoSubreg} />
              </ListItem>
              <ListItem>
                <ListItemText primary="LendCat" secondary={LendCat} />
              </ListItem>
              <ListItem>
                <ListItemText primary="VarDesc" secondary={VarDesc} />
              </ListItem>
              <ListItem>
                <ListItemText primary="UrbanPop" secondary={UrbanPop} />
              </ListItem>
              <ListItem>
                <ListItemText primary="RuralPop" secondary={RuralPop} />
              </ListItem>
              <ListItem>
                <ListItemText primary="TotalPop" secondary={TotalPop} />
              </ListItem>
              <ListItem>
                <ListItemText primary="UrbanLA" secondary={UrbanLA} />
              </ListItem>
              <ListItem>
                <ListItemText primary="RuralLA" secondary={RuralLA} />
              </ListItem>
              <ListItem>
                <ListItemText primary="TotalLA" secondary={TotalLA} />
              </ListItem>
            </List>
            <br />

            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button 
              color="default"
              variant="contained"
              onClick={this.handlePostRequest}
            >Print</Button>
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Confirm & Continue</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
