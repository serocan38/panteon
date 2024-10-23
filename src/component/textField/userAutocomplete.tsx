import React, { useState } from 'react';
import { Autocomplete, AutocompleteRenderOptionState, TextField } from '@mui/material';
import { UserModel } from '../../model/userModel';



interface UserAutocompleteProps {
    users: UserModel[];
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    onUserSelect: (user: UserModel) => void;
}

const UserAutocomplete: React.FC<UserAutocompleteProps> = ({ users, inputValue, setInputValue, onUserSelect }) => {

    const handleOptionSelect = (event: React.ChangeEvent<{}>, value: UserModel | null) => {
        if (value) {
            onUserSelect(value);
        }
    };

    return (
        <Autocomplete
            fullWidth
            options={users}
            getOptionLabel={(option: any) => option.username}
            inputValue={inputValue}
            onInputChange={(event: React.ChangeEvent<{}>, newInputValue: string) => {
                setInputValue(newInputValue);
            }}
            onChange={handleOptionSelect}
            renderInput={(params: any) => (
                <TextField {...params} label="Search" variant="outlined" />
            )}
            renderOption={(
                props: React.HTMLAttributes<HTMLLIElement>,
                option: UserModel,
            ) => (
                <li {...props} key={option.id}>
                    {option.username}
                </li>
            )}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'var(--border-color)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'var(--border-color)',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'var(--border-color)',
                    },
                },
                '& .MuiInputLabel-root': {
                    color: 'var(--text-color)',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'var(--text-color)',
                },
                '& .MuiOutlinedInput-input': {
                    color: 'var(--text-color)',
                },
                '& .MuiSvgIcon-root': {
                    color: 'var(--text-color)',
                },
            }}
        />
    );
};

export default UserAutocomplete;
