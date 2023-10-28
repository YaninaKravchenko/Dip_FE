import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const StyledArrowBackIcon = styled(ArrowBackIcon)`
    color: black;
    font-size: 50px;
    cursor: pointer;

    &:hover {
        color: #6be;
    }

    &.MuiSvgIcon-root {
        width: 50px;
        height: 50px;
        padding-top: 8px;
    }
`;