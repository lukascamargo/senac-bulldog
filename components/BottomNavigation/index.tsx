import React from 'react';
import Link from 'next/link';
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
            <Link href="/admin/produtos">
                <BottomNavigationAction label="Product List" icon={<SmokingRoomsIcon />} />
            </Link>
            <Link href="/admin/usuarios">
                <BottomNavigationAction label="User List" icon={<PeopleAltIcon />} />
            </Link>
        </BottomNavigation>
    );
}