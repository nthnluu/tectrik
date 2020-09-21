import {createMuiTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    overrides: {
        MuiButtonBase: {
            // The properties to apply
            disableRipple: true // No more ripple, on the whole application!
        },
        MuiTypography: {
            body2: {
                fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
                fontSize: 15,
                color: '#5F6367',
                lineHeight: 1.2
            }
        },
    },
    typography: {
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
        fontFamily: `"Google Sans", "Helvetica", "Arial", sans-serif`,
    },
    palette: {
        primary: {
            main: '#4285F4',
        },
        secondary: {
            main: '#989898',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;
