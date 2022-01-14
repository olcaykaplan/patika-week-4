import {useEffect} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {getUsers} from '../actions/authAction';

export default function BasicTable() {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userAction).userList
    useEffect(() => {
       dispatch(getUsers())
    }, [])
    const getDateToShow = (dt) => {
        const date = new Date(dt)
        const dateToShow = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
        return dateToShow;
    }
  return (
      <Grid container style={{height: '85vh', textAlign:'-webkit-center'}}>
    <TableContainer component={Paper} >
        <Typography variant="h2" style={{margin:'20px 0'}}>User List</Typography>
        <hr/>
      <Table aria-label="simple table"  style={{width:'40%', marginTop:'20px'}}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Full Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Registered At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((row,i) => (
            <TableRow
              key={i}
            >
              <TableCell align="center">{row.fullName}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{getDateToShow(row.registeredAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  );
}