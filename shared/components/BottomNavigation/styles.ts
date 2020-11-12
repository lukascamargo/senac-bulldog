import styled from 'styled-components';

import { Theme, lighten } from '@material-ui/core';
import MaterialFab from '@material-ui/core/Fab';
import MaterialBottomNavigation from '@material-ui/core/BottomNavigation';
import MaterialBottomNavigationAction from '@material-ui/core/BottomNavigationAction';

interface Props {
    theme: Theme;
}

export const BottomNavigation = styled(MaterialBottomNavigation)`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #cecece;

    background: #000;
`;

export const BottomNavigationAction = styled(MaterialBottomNavigationAction)`
    color: #cecece;

    &.Mui-selected {
        color: #cecece;
        border-bottom: 3px solid #cecece;
    }
`;