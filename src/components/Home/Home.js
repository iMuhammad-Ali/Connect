import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";
import Header from "../Header/Header";
import ReactModalAdapter from "../../helpers/ReactModalAdapter.js";
import DesignIllustration from "../../images/contact-us-illustration.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
// Layout Styling
const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col justify-center`;
// Header and Paragraph Styling
const Heading = tw.h1`font-black text-3xl md:text-4xl leading-snug max-w-3xl`;
const Paragraph = tw.p`my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0`;
// Get Started Buttons Styling
const Actions = tw.div`flex flex-col items-center sm:flex-row justify-center lg:justify-start mt-8 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;
const PrimaryButton = tw.button`cursor-pointer font-bold px-8 lg:px-16 py-3 rounded bg-primary-500 text-gray-100`;
// Home Page Image Styling
const IllustrationContainer = tw.div`flex justify-center md:justify-end items-center relative max-w-3xl lg:max-w-none`;
// Random Decorator
const DecoratorBlob = styled(SvgDecoratorBlob1)`${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3  -z-10`}`;
// Modal Styling
const CloseModalButton = tw.button`absolute top-0 right-0 mt-8 mr-8 hocus:text-primary-500`;
const StyledModal = styled(ReactModalAdapter)`
  &.mainHeroModal__overlay {
    ${tw`fixed inset-0 z-50`}
  }
  &.mainHeroModal__content {
    ${tw`xl:mx-auto m-4 sm:m-16 max-w-screen-xl absolute inset-0 flex justify-center items-center rounded-lg bg-gray-200 outline-none`}
  }
  .content {
    ${tw`w-full lg:p-16`}
  }
`;
// Home Component
const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => setModalIsOpen(!modalIsOpen);
  const navigate = useNavigate();
  const pageToggler = (link) => navigate("/" + link);
  return (
    <>
      <Header />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>Connect - Bridge the Gap</Heading>
            <Paragraph>
              Experience the power of connectivity with Connect - the ultimate
              chat app that revolutionizes communication, fostering a vibrant
              community where conversations come alive and relationships thrive.
            </Paragraph>
            <Actions>
              <PrimaryButton
                css={tw`rounded-full hover:bg-primary-700`}
                as="a"
                onClick={() => pageToggler("signin")}>
                Get Started
              </PrimaryButton>
            </Actions>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img src={DesignIllustration} alt="Illustrator" />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob />
        <StyledModal
          closeTimeoutMS={300}
          className="mainHeroModal"
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          shouldCloseOnOverlayClick={true}>
          <CloseModalButton onClick={toggleModal}>
            <CloseIcon tw="w-6 h-6" />
          </CloseModalButton>
        </StyledModal>
      </Container>
    </>
  );
};

export default Home;