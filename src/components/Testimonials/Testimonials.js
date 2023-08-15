import "slick-carousel/slick/slick.css";
import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as StarIconBase } from "images/star-icon.svg";
import { ReactComponent as ArrowLeftIcon } from "images/arrow-left-3-icon.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-3-icon.svg";
import loveIllustrationImageSrc from "images/love-illustration.svg";
import SajjadAliPhoto from "images/SajjadAli.jpg";
import FurqanZahidPhoto from "images/FurqanZahid.JPG";
// Layout Styling
const Row = tw.div`flex flex-col md:flex-row justify-between items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 xl:w-6/12 flex-shrink-0 relative`;
const TextColumn = styled(Column)(props => [
    tw`md:w-7/12 xl:w-6/12 mt-16 md:mt-0`,
    props.textOnLeft ? tw`md:pr-12 lg:pr-16 md:order-first` : tw`md:pl-12 lg:pl-16 md:order-last`
]);
// Illustration Image Styling
const Image = styled.img(props => [
    props.imageRounded && tw`rounded`,
    props.imageBorder && tw`border`,
    props.imageShadow && tw`shadow`
]);
// Testimonial Section Styling
const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-6 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;
const TestimonialSlider = styled(Slider)`
  ${tw`w-full mt-10 text-center md:text-left`}
  .slick-track {
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }`;
const Testimonial = tw.div`outline-none h-full flex! flex-col`;
const StarsContainer = styled.div``;
const StarIcon = tw(StarIconBase)`inline-block w-5 h-5 text-orange-400 fill-current mr-1 last:mr-0`;
const TestimonialHeading = tw.div`mt-4 text-xl font-bold`;
const Quote = tw.blockquote`mt-4 mb-8 sm:mb-10 leading-relaxed font-medium text-gray-700`;
const CustomerInfoAndControlsContainer = tw.div`mt-auto flex justify-between items-center flex-col sm:flex-row`;
const CustomerInfo = tw.div`flex flex-col sm:flex-row items-center justify-center lg:justify-start`;
const CustomerProfilePicture = tw.img`rounded-full w-16 h-16 sm:w-20 sm:h-20`;
const CustomerTextInfo = tw.div`text-center md:text-left sm:ml-6 mt-2 sm:mt-0`;
const CustomerName = tw.h5`font-bold text-xl`;
const CustomerTitle = tw.p`font-medium text-secondary-100`;
const Hocus = tw.span`hover:bg-gray-300`;
const Controls = styled.div`
  ${tw`flex mt-8 sm:mt-0`}
  .divider {
    ${tw`my-3 border-r`}
  }`;
const ControlButton = styled.button`
  ${tw`mx-3 p-4 rounded-full transition duration-300 bg-gray-200 hover:bg-gray-300 text-primary-500 hover:text-primary-700 focus:outline-none focus:shadow-outline`}
  svg {
    ${tw`w-4 h-4 stroke-3`}
  }`;
// Testimonials Component
const Testimonials = () => {
    const [sliderRef, setSliderRef] = useState(null);
    const testimonials = [
        {
            stars: 5,
            profileImageSrc: SajjadAliPhoto,
            heading: "Amazing User Experience",
            quote: "Connect app has truly revolutionized my communication experience. As someone who relies heavily on staying connected with friends, family, and colleagues, this app has become an indispensable part of my daily life. Its intuitive interface and seamless functionality make chatting a breeze, allowing me to effortlessly connect and engage in meaningful conversations. I highly recommend Connect app to anyone seeking a reliable, user-friendly, and feature-rich chatting platform. It has truly transformed the way I communicate and connect with others.",
            customerName: "Sajjad Ali",
            customerTitle: "CEO, SajjadTech"
        },
        {
            stars: 5,
            profileImageSrc: FurqanZahidPhoto,
            heading: "Seamless and Elegant!",
            quote: "Connect Chat has transformed the way I communicate. With its global reach, I've connected with people from diverse cultures effortlessly. The reaction emojis add a fun touch, enhancing interactions. Plus, the customizable themes and secure environment provide a personalized and safe chat experience. I'm hooked on the app's user-friendly interface, making it my go-to choice for staying connected with friends and making new connections around the world!",
            customerName: "Furqan Zahid",
            customerTitle: "Founder, DataSphere Analytics"
        },
    ]

    return (
        <Container>
            <ContentWithPaddingXl>
                <Row>
                    <ImageColumn>
                        <Image src={loveIllustrationImageSrc} imageBorder={false} imageShadow={false} imageRounded={false} />
                    </ImageColumn>
                    <TextColumn textOnLeft={false}>
                        <Subheading></Subheading>
                        <Heading>Our Clients Love Us.</Heading>
                        <Description>Discover what our users have to say about their experiences with the Connect app and how it transformed their communication and collaboration.</Description>
                        <TestimonialSlider arrows={false} ref={setSliderRef}>
                            {testimonials.map((testimonial, index) => (
                                <Testimonial key={index}>
                                    <StarsContainer>
                                        {Array.from({ length: testimonial.stars }).map((_, indexIcon) => (
                                            <StarIcon key={indexIcon} />
                                        ))}
                                    </StarsContainer>
                                    <TestimonialHeading>{testimonial.heading}</TestimonialHeading>
                                    <Quote>{testimonial.quote}</Quote>
                                    <CustomerInfoAndControlsContainer>
                                        <CustomerInfo>
                                            <CustomerProfilePicture src={testimonial.profileImageSrc} alt={testimonial.customerName} />
                                            <CustomerTextInfo>
                                                <CustomerName>{testimonial.customerName}</CustomerName>
                                                <CustomerTitle>{testimonial.customerTitle}</CustomerTitle>
                                            </CustomerTextInfo>
                                        </CustomerInfo>
                                        <Controls>
                                            <Hocus>
                                                <ControlButton onClick={sliderRef?.slickPrev}>
                                                    <ArrowLeftIcon />
                                                </ControlButton>
                                            </Hocus>
                                            <div className="divider" />
                                            <Hocus>
                                                <ControlButton onClick={sliderRef?.slickNext}>
                                                    <ArrowRightIcon />
                                                </ControlButton>
                                            </Hocus>
                                        </Controls>
                                    </CustomerInfoAndControlsContainer>
                                </Testimonial>
                            ))}
                        </TestimonialSlider>
                    </TextColumn>
                </Row>
            </ContentWithPaddingXl>
        </Container>
    );
};

export default Testimonials