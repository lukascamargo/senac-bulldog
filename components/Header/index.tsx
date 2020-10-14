import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Icon } from '@material-ui/core';

export default function Header() {
    return (
        <div style={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="secondary">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                       The Bulldog
                    </Typography>
                    <Button color="inherit" style={{marginLeft: "70%"}}>Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}