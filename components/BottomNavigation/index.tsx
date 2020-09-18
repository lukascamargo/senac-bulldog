import React from 'react';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {
    BottomNavigation,
    BottomNavigationAction
} from './styles';


export default function BottomNavigationMenu() {
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
        >
            <BottomNavigationAction label="Product List" icon={<SmokingRoomsIcon />} />
            <BottomNavigationAction label="User List" icon={<PeopleAltIcon />} />
        </BottomNavigation>
    );
}