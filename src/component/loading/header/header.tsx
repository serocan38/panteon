import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { PantImage } from '../../image/pantImage';
import { PantIconButton } from '../../button/iconButton';
import { useTheme } from '../../../provider/themeProvider';

const HeaderContainer = styled('header')(() => ({
    backgroundColor: 'var(--header-background-color)',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    top: 0
}));


const Header: React.FC = () => {
    const { toggleTheme, theme } = useTheme();

    return (
        <HeaderContainer sx={{ justifyContent: { xs: 'start', md: 'center' }, }}>
            <PantImage src={`/static/logos/${theme === 'light' ? "logoLight.svg" : "logo.png"}`} alt="Logo" sx={{ height: { xs: '30px', md: '40px' }, marginLeft: '0' }} />
            <PantIconButton onClick={toggleTheme} sx={{ position: 'absolute', right: '20px' }}>
                {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
            </PantIconButton>
        </HeaderContainer>
    );
};

export default Header;
