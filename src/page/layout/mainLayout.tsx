import React, { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../../component/loading/header/header';

// Background color from CSS variables
const bgColor = 'var(--background-color)';
const textColor = 'var(--text-color)';

// Define the props for MainContainer
interface MainContainerProps {
    children: ReactNode; // Specify that children can be any React node
}

// MainContainer Component
const MainContainer: React.FC<MainContainerProps> = ({ children }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            background: bgColor,
            color: textColor,
        }}
    >
        {children}
    </Box>
);

const MainLayout: React.FC = () => {
    return (
        <MainContainer>
            <Header />

            <Box component="main" sx={{ flex: 1, py: 3 }}>
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </Box>
        </MainContainer>
    );
};

export default MainLayout;
