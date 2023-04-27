import React, { useState } from 'react';
import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const GridColum =(props) =>{
  const [data , setData]=useState({});
  const {names}= props;
  console.log(names)
  const classes = useStyles();
  function FormRow() {
    const clickHandler = (data)=>{
      fetch(`http://localhost:8001/fetchById/${data.restaurant_id}`).then(res => res.json()).then(res => props.postHandler(JSON.stringify(res)));
    }
    return (
      <React.Fragment>
      {names.length>0 && names.map((n)=>
     <>   
    <Grid item xs={4}>
    <Card onClick={()=>clickHandler(n)} variant="outlined">{n.name}</Card>
        </Grid>
       
        </>
      )}
      </React.Fragment>
    );
  }
    return (
        <Grid container spacing={1}>
  <Grid container item xs={12} spacing={3}>
   <FormRow/>
  </Grid>
</Grid>
    );

}
