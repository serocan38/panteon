import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const PantTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: `1px solid var(--input-border-color)`,
        },
        '&:hover fieldset': {
            border: `1px solid var(--primary-color)`,
        },
        '&.Mui-focused fieldset': {
            border: `1px solid var(--primary-color)`,
        },
    },
    '& .MuiInputBase-input': {
        color: 'var(--text-color)',
    },
    '& label': {
        color: 'var(--input-label-color)',
    },
    '& .MuiInputBase-input::placeholder': {
        color: 'var(--input-placeholder-color)',
    },
}));

export default PantTextField;
