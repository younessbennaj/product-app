import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    spacing: [0, 4, 8, 16, 32, 64],
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#f50057',
        },
        error: {
            main: red.A400,
        },
        success: {
            main: "#4caf50"
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;