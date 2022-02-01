import { useState, useEffect, useContext } from 'react';
import { Dialog } from '@material-ui/core';
import { makeStyles, Typography, List, ListItem, Box, withStyles } from '@material-ui/core';

import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { addUser } from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';

const useStyle = makeStyles({
    component: {
        display: 'flex'
    },
    dialog: {
        padding: '56px 0 56px 56px',
        width: '100%',
    },
    qr: {
        margin: '50px 0 0 50px',
        height: 264,
        width: 264
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 25,
        color: '#525252',
        fontFamily: 'Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif',
        fontWeight: 300   
    },
    list: {
        '&  > *': {
            justifyContent:'center',
            padding: 0,
            marginTop: 15,
            fontSize: 18,
            lineHeight: '28px',
            color: '#4a4a4a'
        }
    }
})

const style = {
    dialogPaper: {
        marginTop: '12%',
        height: '95%',
        width: '60%',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: 0,
        boxShadow: 'none',
        overflow: 'hidden'
    }
};

const LoginDialog = ({ classes }) => {
    const classname = useStyle();
    const clientId = '591939134175-nslnkig0l9bhcineedur9q2a5lbussnb.apps.googleusercontent.com';

    const [open, setOpen] = useState(false);

    const { account, setAccount,showloginButton, setShowloginButton, showlogoutButton, setShowlogoutButton } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        console.log('Login Success:', res.profileObj);
        setAccount(res.profileObj);
        setShowloginButton(false);
        setShowlogoutButton(true);
        await addUser(res.profileObj);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };

    useEffect(() => {
        setOpen(true);
    }, [])

    // const url = 'https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg';

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog onClose={handleClose}
            open={true}
            classes={{paper: classes.dialogPaper}} 
            BackdropProps={{style: {backgroundColor: 'unset'}}}
        >
            <Box className={classname.component}>
                <Box className={classname.dialog}>
                    <Typography className={classname.title}>To use WhatsApp on your computer:</Typography>
                    <List className={classname.list}>
                        <ListItem>
                            {/* Login with Google */}
                <Box style={{position:'relative',display: 'flex', justifyContent: 'center'}}>
                    {/* <img src={url} alt="QR" className={classname.qr} /> */}
                    {/* <div style={{position: 'absolute', left: '10%', top: '50%', transform: 'translateX(0%) translateY(-25%)'}}> */}
                    <div style={{marginLeft:'20px'}}>
                        { showloginButton ?
                            <GoogleLogin
                                clientId={clientId}
                                buttonText="Login with Google"
                                onSuccess={onLoginSuccess}
                                onFailure={onLoginFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            /> : null}

                        { showlogoutButton ?
                            <GoogleLogout
                                clientId={clientId}
                                buttonText=""
                                onLogoutSuccess={onSignoutSuccess}
                            >
                            </GoogleLogout> : null
                        }
                    </div>
                </Box>
                </ListItem>
                <br/><br/><br/><br/><br/>
                        <ListItem>Whatsapp Clone</ListItem>
                        <ListItem>Created by Rohit Parakh</ListItem>
                    </List>
                </Box>
            </Box>
        </Dialog>
    )
}

export default withStyles(style)(LoginDialog);