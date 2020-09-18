import {createMuiTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    overrides: {
        MuiListItem: {
            icon: {
                fill: '#1B67D2',
            },
            root: {
                borderTopRightRadius: 100,
                borderBottomRightRadius: 100,
                "&$selected": {
                    color: '#1B67D2',
                    backgroundColor: "#E5EFFC",
                    "&:hover": {
                        backgroundColor: "#ebf3fd",
                    },
                },
            },
        },
        MuiTypography: {
            body2: {
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                fontSize: 15,
                color: '#5F6367',
                lineHeight: 1.2
            }
        }
    },
    typography: {
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
        fontFamily: `"Product Sans", "Helvetica", "Arial", sans-serif`,
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
