import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const fetchUser = () => {
    Axios.get("https://deploycfg.herokuapp.com/users")
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    fetchUser()
  }, [])
  return (
    <React.Fragment>
      <Title>Information</Title>
      <Typography component="p" variant="h4">
        Harsh
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Kerala
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Courses
        </Link>
      </div>
    </React.Fragment>
  );
}
