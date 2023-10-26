// components/Navbar/index.js

import React from "react";
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
} from "./navbarElements.js";

const Navbar = () => {
	return (
		<>
			<Nav>
				<Bars />

				<NavMenu>
					<NavLink to="/home" >
						Home
					</NavLink>
					<NavLink to="/teamlocker" activeStyle>
						Team Locker
					</NavLink>
					<NavLink to="/playerlocker" activeStyle>
						Player Locker
					</NavLink>
				
					{/* Second Nav */}
					{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
				</NavMenu>
				<NavBtn>
					<NavBtnLink to="/signin">
						Sign In
					</NavBtnLink>
				</NavBtn>
			</Nav>
		</>
	);
};

export default Navbar;
