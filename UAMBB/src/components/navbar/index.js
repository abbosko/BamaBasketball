// components/Navbar/index.js

import React from "react";
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
} from "./navbarElements.js";

const Navbar = () => {
	return (
		<>
			<Nav>
				<Bars />

				<NavMenu>
					<NavLink to="/home" activeStyle>
						Home
					</NavLink>
					<NavLink to="/playerlocker" activeStyle>
						Player Locker
					</NavLink>
					<NavLink to="/teamlocker" activeStyle>
						Team Locker
					</NavLink>
					{/* Second Nav */}
					{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
