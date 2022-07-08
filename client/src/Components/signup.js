import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();
const Signup = () => {
    const navigate = useNavigate();
    const [fullname, updateFullName] = useState(null);
    const [userName, updateUserName] = useState(null);
    const [phoneNumber, updatePhoneNumber] = useState(null);
    const [location, updateLocation] = useState(null);
    const [password, updatePassword] = useState(null);
    const [repassword, updateRepassword] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        Axios.post("https://deploycfg.herokuapp.com/register", {
            "full_name": fullname,
            "username": userName,
            "phone_no": phoneNumber,
            "location": location,
            "password": password
        }).then(res => alert("Signed Up"), navigate("/")).catch(err => console.log(err))
    };
    console.log(fullname, userName, phoneNumber, location, password);
    // const check = () => {
    //     if (userName == "test" && password == "ok1") {
    //         alert("Signed In");
    //         navigate("/dashboard");
    //     }
    //     else {
    //         alert("Invalid Credentials")
    //     }
    // }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="User Name"
                            label="Full Name"
                            name="User Name"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => updateFullName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="User Name"
                            label="User Name"
                            name="User Name"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => updateUserName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="User Name"
                            label="Phone"
                            name="User Name"
                            autoComplete="email"
                            type="Number"
                            autoFocus
                            onChange={(e) => updatePhoneNumber(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="User Name"
                            label="Location"
                            name="User Name"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => updateLocation(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => updatePassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Repeat Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => updateRepassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => { handleSubmit(); }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link href="/" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
export default Signup;