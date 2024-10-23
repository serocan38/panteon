import { SxProps, styled } from '@mui/material/styles';
import { IconButton as MuiIconButton } from '@mui/material';
import { memo } from 'react';
import { PantImage } from '../image/pantImage';
import { Theme } from '@emotion/react';

interface PantIconButtonProps {
    onClick?: () => void;
    src?: string;
    alt?: string;
    sx?: SxProps<Theme>
    children?: React.ReactNode;
}

const StyledIconButton = styled(MuiIconButton)(({ theme }) => ({
    padding: 8,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

export const PantIconButton: React.FC<PantIconButtonProps> = memo(({ onClick, src, alt = '', sx = {}, children }) => (
    <StyledIconButton onClick={onClick} sx={{ ...sx }}>
        {src ? <PantImage src={src} alt={alt} sx={{ width: '40px', height: '40px' }} /> : children}
    </StyledIconButton>
));
