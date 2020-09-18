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
    border-top: 1px solid ${({ theme }: Props) => lighten(theme.palette.text.hint, 0.5)};

    background: ${({ theme }: Props) => theme.palette.primary.main};
`;

export const BottomNavigationAction = styled(MaterialBottomNavigationAction)`
    color: ${({ theme }: Props) => theme.palette.text.hint};

    &.Mui-selected {
        color: ${({ theme }: Props) => theme.palette.info.main};
        border-bottom: 3px solid ${({ theme }: Props) => theme.palette.info.main};
    }
`;