import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, CircularProgress, InputAdornment } from '@mui/material';
import DataTable from '../component/table/pantDataTable';
import { UserModel } from '../model/userModel';
import { ApiService } from '../core/services/apiService';
import PantTextField from '../component/textField/pantTextField';
import SearchIcon from '@mui/icons-material/Search';
import UserAutocomplete from '../component/textField/userAutocomplete';
import debounce from '../core/helper/debouncer';

const PageContainer = styled(Box)({
    padding: '20px',
    overflowX: 'hidden'
});

const Title = styled(Typography)({
    textAlign: 'center',
    marginBottom: '20px',
});

const SearchContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'sticky',
    top: 0,
    backdropFilter: 'blur(0)',
    transition: 'backdrop-filter 0.3s ease'
});

const apiService = new ApiService();

const HomePage: React.FC = () => {
    const [defaultLeaderboardData, setDefaultLeaderboardData] = useState<UserModel[]>([]);
    const [leaderboardData, setLeaderboardData] = useState<UserModel[]>([]);
    const [searchedUsers, setSearchedUsers] = useState<UserModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState('');
    const [inputValue, setInputValue] = useState<string>('');
    const [isBlurred, setIsBlurred] = useState(false);

    const handleSearch = async (inputValue: string) => {
        try {
            if (inputValue.length === 0 && defaultLeaderboardData.length) {
                setLeaderboardData(defaultLeaderboardData);
            }
            if (inputValue.length < 2) return;
            const leaderboardEndpoint = `/panteon/autocomplete/${inputValue}`;
            const data = await apiService.get<UserModel[]>(leaderboardEndpoint);
            if (data && data.data) {
                setSearchedUsers(data.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const debouncedSearch = debounce(handleSearch, 1000);


    useEffect(() => {
        fetchLeaderboardData();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        debouncedSearch(inputValue);
    }, [inputValue]);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsBlurred(true);
        } else {
            setIsBlurred(false);
        }
    };

    const fetchLeaderboardData = async (id?: string) => {
        try {
            setLoading(true)
            const leaderboardEndpoint = `/panteon/getLeaderboard${id ? `/${id}` : ''}`;
            const data = await apiService.get<UserModel[]>(leaderboardEndpoint);
            if (data && data.data) {
                setDefaultLeaderboardData(data.data);
                setLeaderboardData(data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.target.value);
    };

    const getLeaderboardWithUser = () => {
        fetchLeaderboardData(userId);
    };

    const onUserSelect = async (user: UserModel) => {
        if (!user || !user.id) return;
        const leaderboardEndpoint = "/panteon/getLeaderboardUser/" + user.id;
        const data = await apiService.get<UserModel>(leaderboardEndpoint);
        if (data && data.data) {
            setLeaderboardData([data.data]);
        }
    };

    return (
        <PageContainer>
            <Title variant="h4">Leaderboard</Title>
            <SearchContainer className={`sticky-box ${isBlurred ? 'blurred' : ''}`}>
                <UserAutocomplete
                    users={searchedUsers}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    onUserSelect={onUserSelect}
                />
                <PantTextField
                    label="User Id"
                    variant="outlined"
                    value={userId}
                    onChange={handleUserIdChange}
                    sx={{ ml: 4 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment sx={{ '&::hover': { cursor: 'pointer' }, zIndex: 999 }} onClick={getLeaderboardWithUser} position="end">
                                <SearchIcon sx={{ color: 'var(--svg-fill-color)' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </SearchContainer>
            {loading ?
                <CircularProgress /> :
                leaderboardData.length === 0 ?
                    <Typography textAlign='center'>No User</Typography>
                    : <DataTable data={leaderboardData} setData={setLeaderboardData} />
            }
        </PageContainer>
    );
};

export default HomePage;
