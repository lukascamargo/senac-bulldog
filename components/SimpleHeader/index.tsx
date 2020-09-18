import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { Grid, Icon } from '@material-ui/core';

export default function SimpleHeader() {
    return (
        <div style={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="secondary">
                        <ArrowBackIos />
                    </IconButton>
                    <Grid container>
                        <Grid item xs={9}>
                            <Typography variant="h6">
                                Bulldog
                            </Typography>
                            </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                Olá, Usuário
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}