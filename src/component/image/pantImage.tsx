import { Theme } from '@emotion/react';
import { SxProps, styled } from '@mui/material/styles';
import { memo } from 'react';

interface PantImageProps {
    src: string;
    alt?: string;
    sx?: SxProps<Theme>
    onClick?: React.MouseEventHandler<HTMLImageElement> | undefined
}

const StyledImage = styled('img')(() => ({
    maxWidth: '100%',
    height: 'auto',
    '&::hover': {
        cursor: 'pointer'
    }
}));

export const PantImage: React.FC<PantImageProps> = memo(({ src, alt = '', sx = {}, onClick }) => (
    <StyledImage
        src={src}
        alt={alt}
        onClick={onClick}
        sx={{ ...sx }}
    />
));
