import React from "react";
import { useNavigate } from "react-router";
import tw from "twin.macro";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-9.svg";
import { ContentWithPaddingXl, Container } from "components/misc/Layouts";
import { Link as HyperLink } from "react-scroll";
// Layout Styling
const PrimaryBackgroundContainer = tw.div`py-16 lg:py-20 bg-purple-200 rounded-lg relative`
const Row = tw.div`px-4 sm:px-16 mx-auto flex justify-center items-center relative z-10 flex-col lg:flex-row text-center lg:text-left`;
const ColumnContainer = tw.div`lg:w-1/2 max-w-lg`
const TextContainer = tw(ColumnContainer)`text-2xl sm:text-4xl font-bold`;
const Subheading = tw.h6`text-primary-500 opacity-75`;
const Heading = tw.h5`text-primary-500`;
// Buttons Styling
const LinksContainer = tw(ColumnContainer)`flex justify-center lg:justify-end mt-6 lg:mt-0 flex-col sm:flex-row`;
const Link = tw.a`w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 mt-4 first:mt-0 sm:mt-0 sm:mr-8 sm:last:mr-0 rounded font-bold border border-transparent tracking-wide transition duration-300 focus:outline-none focus:shadow-outline`;
const Hocus = tw.span`hocus:text-gray-300 hocus:bg-primary-700`;
const Hover = tw.span`hocus:text-primary-600  hocus:bg-gray-200`;
const PrimaryLink = tw(Link)`cursor-pointer shadow text-gray-100 hocus:text-gray-300 bg-primary-500 hocus:bg-primary-700`;
const SecondaryLink = tw(Link)`text-primary-500 hover:text-primary-600 bg-gray-100 hover:bg-gray-200`;
// Random Decorators
const DecoratorBlobContainer = tw.div`absolute inset-0 overflow-hidden rounded-lg`
const DecoratorBlob1 = tw(SvgDecoratorBlob1)`absolute bottom-0 left-0 w-80 h-80 transform -translate-x-20 translate-y-32 text-primary-500 opacity-5`
const DecoratorBlob2 = tw(SvgDecoratorBlob1)`absolute top-0 right-0 w-80 h-80 transform  translate-x-20 -translate-y-64 text-primary-500 opacity-5`
// CTA Component
const CTA = () => {
    const navigate = useNavigate();
    return (
        <Container css={true && tw`mb-6 lg:mb-10`}>
            <ContentWithPaddingXl>
                <PrimaryBackgroundContainer>
                    <Row>
                        <TextContainer>
                            <Subheading>Interested in Connect ?</Subheading>
                            <Heading>Join Connect community now.</Heading>
                        </TextContainer>
                        <LinksContainer>
                            <Hocus><PrimaryLink style={{ display: "block" }} onClick={() => navigate('/signin')}>Get Started</PrimaryLink></Hocus>
                            <HyperLink to="contact" smooth><Hover><SecondaryLink style={{ display: "block" }} href="http://google.com">Contact Us</SecondaryLink></Hover></HyperLink>
                        </LinksContainer>
                    </Row>
                    <DecoratorBlobContainer>
                        <DecoratorBlob1 />
                        <DecoratorBlob2 />
                    </DecoratorBlobContainer>
                </PrimaryBackgroundContainer>
            </ContentWithPaddingXl>
        </Container>
    );
};

export default CTA