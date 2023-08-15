import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";
import logo from "../../images/connect-logo.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
// Header and Links Styling
const HeaderBar = tw.header`pt-8 flex justify-between items-center max-w-screen-xl mx-auto`;
const NavLinks = tw.div`inline-block`;
const Hocus = tw.span`border-b-2 border-transparent lg:hover:border-primary-500 hocus:text-primary-500`
const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-5 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 hover:border-primary-500 hocus:text-primary-500`;
const PrimaryLink = tw(NavLink)`
  lg:mx-0 cursor-pointer! border-b-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline`;
const Hover = tw.span` hover:text-primary-600`
const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};
  img {
    ${tw`w-10 mr-3`}
  }`;
const DesktopNavLinks = tw.nav`cursor-pointer hidden lg:flex flex-1 justify-between items-center`;
// Mobile Header Styling
const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
const NavToggle = tw.button`lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300`;
const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`cursor-pointer flex flex-col items-center`}}`);
// Header Component
const Header = () => {
      const navigate = useNavigate();
      const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
      const collapseBreakpointCss = collapseBreakPointCssMap["lg"];
      const logoLink = (
            <Hover><LogoLink href="/">
                  <img src={logo} alt="Logo" />
                  Connect
            </LogoLink></Hover>
      );
      const links = [
            <NavLinks key={1}>
                  <Link onClick={toggleNavbar} to="about" smooth><Hocus><NavLink>About</NavLink></Hocus></Link>
                  <Link onClick={toggleNavbar} to="team" smooth><Hocus><NavLink>Team</NavLink></Hocus></Link>
                  <Link onClick={toggleNavbar} to="faqs" smooth><Hocus><NavLink>FAQs</NavLink></Hocus></Link>
                  <Link onClick={toggleNavbar} to="testimonials" smooth><Hocus><NavLink>Testimonials</NavLink></Hocus></Link>
                  <Link onClick={toggleNavbar} to="contact" smooth><Hocus><NavLink>Contact Us</NavLink></Hocus></Link>
                  <Hocus><NavLink onClick={() => navigate("/signin")} tw="cursor-pointer lg:ml-16!">Login</NavLink></Hocus>
                  <span tw="mt-4 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline">
                        <PrimaryLink onClick={() => navigate("/signup")}>Sign Up</PrimaryLink>
                  </span>
            </NavLinks>,
      ];

      return (
            <HeaderBar className={"header-light"}>
                  <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
                        {logoLink}
                        {links}
                  </DesktopNavLinks>
                  <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
                        {logoLink}
                        <MobileNavLinks
                              initial={{ x: "150%", display: "none" }}
                              animate={animation}
                              css={collapseBreakpointCss.mobileNavLinks}>
                              {links}
                        </MobileNavLinks>
                        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
                              {showNavLinks ? (<CloseIcon tw="w-6 h-6" />) : (<MenuIcon tw="w-6 h-6" />)}
                        </NavToggle>
                  </MobileNavLinksContainer>
            </HeaderBar>
      );
};

const collapseBreakPointCssMap = {
      sm: {
            mobileNavLinks: tw`sm:hidden`,
            desktopNavLinks: tw`sm:flex`,
            mobileNavLinksContainer: tw`sm:hidden`,
      },
      md: {
            mobileNavLinks: tw`md:hidden`,
            desktopNavLinks: tw`md:flex`,
            mobileNavLinksContainer: tw`md:hidden`,
      },
      lg: {
            mobileNavLinks: tw`lg:hidden`,
            desktopNavLinks: tw`lg:flex`,
            mobileNavLinksContainer: tw`lg:hidden`,
      },
      xl: {
            mobileNavLinks: tw`lg:hidden`,
            desktopNavLinks: tw`lg:flex`,
            mobileNavLinksContainer: tw`lg:hidden`,
      },
};

export default Header;