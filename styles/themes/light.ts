import { createMuiTheme } from '@material-ui/core';

const LightTheme = createMuiTheme({
    overrides: {
        MuiTextField: {
            root: {
                margin: '15px 0',
            },
        },
        MuiButton: {
            label: {
                textTransform: 'none',
                fontWeight: 400,
            },
        },
    },
    palette: {
        type: 'light',
        primary: {
            main: '#1F1E21',
        },
        secondary: {
            main: '#ffffff',
        },
        success: {
            main: '#28B67A',
        },
        error: {
            main: '#EF3E2D',
        },
        info: {
            main: '#4995DF',
        },
        warning: {
            main: '#EFD359',
        },
        background: {
            default: '#ffffff',
        },
        common: {
            white: '#ffffff',
        },
        text: {
            primary: '#000',
            secondary: '#000',
            hint: '#fff'
        }
    },
});

export default LightTheme;
