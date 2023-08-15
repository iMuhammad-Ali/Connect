import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Container as ContainerBase } from "components/misc/Layouts.js"
import { Link as HyperLink } from "react-scroll";
import logo from "../../images/connect-logo.svg";
import { ReactComponent as FacebookIcon } from "../../images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "../../images/twitter-icon.svg";
import { ReactComponent as LinkedinIcon } from "../../images/linkedin-icon.svg";
// import { ReactComponent as GithubIcon } from "../../images/github-icon.svg";
// Layout Styling
const Container = tw(ContainerBase)`bg-gray-900 text-gray-100 -mx-8 -mb-8`
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Row = tw.div`flex items-center justify-center flex-col px-8`
// Logo Styling
const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-4 text-2xl font-black tracking-wider`;
// Links Styling
const Hover = tw.span`cursor-pointer hocus:text-primary-500`
const LinksContainer = tw.div`mt-8 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`
const Link = tw.a`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300 pb-1 transition duration-300 mt-2 mx-4`;
const SocialLinksContainer = tw.div`mt-10`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block text-gray-100 hover:text-primary-500 transition duration-300 mx-4`}
  svg {
    ${tw`w-6 h-6`}
  }`;
const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`
// Footer Component
const Footer = () => {
    return (
        <Container>
            <Content>
                <Row>
                    <LogoContainer>
                        <LogoImg src={logo} />
                        <LogoText>Connect</LogoText>
                    </LogoContainer>
                    <LinksContainer>
                        <HyperLink to="home" smooth><Hover><Link>Home</Link></Hover></HyperLink>
                        <HyperLink to="about" smooth><Hover><Link>About</Link></Hover></HyperLink>
                        <HyperLink to="team" smooth><Hover><Link>Team</Link></Hover></HyperLink>
                        <HyperLink to="contact" smooth><Hover><Link>Contact Us</Link></Hover></HyperLink>
                    </LinksContainer>
                    <SocialLinksContainer>
                        <SocialLink href="https://www.facebook.com/iMuhammadAliii?mibextid=ZbWKwL">
                            <FacebookIcon />
                        </SocialLink>
                        <SocialLink href="https://twitter.com/i_MuhammadAli_">
                            <TwitterIcon />
                        </SocialLink>
                        <SocialLink href="https://www.linkedin.com/in/muhammad-ali-a4602223b/">
                            <LinkedinIcon />
                        </SocialLink>
                        <SocialLink href="https://github.com/iMuhammad-Ali">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github</title> <rect width="24" height="24" fill="none"></rect> <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"></path> </g></svg>
                        </SocialLink>
                    </SocialLinksContainer>
                    <CopyrightText>
                        &copy; Copyright 2023, Connect Inc. All Rights Reserved.
                    </CopyrightText>
                </Row>
            </Content>
        </Container>
    );
};

export default Footer