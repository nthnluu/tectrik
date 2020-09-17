import {createMuiTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    typography: {
        button: {
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: 0.75
        },
        fontFamily: `"Product Sans", "Helvetica", "Arial", sans-serif`,
        body2: {
            fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
            fontSize: 16
        }
    },
    palette: {
        primary: {
            main: '#4285F4',
        },
        secondary: {
            main: '#19857b',
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
