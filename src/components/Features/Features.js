import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import defaultCardImage from "images/shield-icon.svg";
import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import MultimediaIconImage from "images/multimedia-icon.svg";
import FastIconImage from "images/fast-icon.svg";
import GlobalchatIconImage from "images/global-icon.svg";
import DataIconImage from "images/datastorage-icon.svg";

const Container = tw.div`relative bg-primary-700 -mx-8 px-8 text-gray-100`;
const ThreeColumnContainer = styled.div`${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24`}`;
const Subheading = tw(SubheadingBase)`mb-4 text-gray-100`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center text-gray-300`;
const VerticalSpacer = tw.div`mt-10 w-full`;
const Column = styled.div`${tw`md:w-1/2 lg:w-1/3 max-w-xs`}`;
const Card = styled.div`
  ${tw`flex flex-col items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8`}
  .imageContainer {
    ${tw`bg-gray-100 text-center rounded-full p-4 flex-shrink-0`}
    img {
      ${tw`w-8 h-8`}
    }
  }
  .textContainer {
    ${tw`mt-6`}
  }
  .title {
    ${tw`tracking-wider font-bold text-xl leading-none`}
  }
  .description {
    ${tw`mt-2 font-normal text-gray-400 leading-snug`}
  }
`;

const Features = () => {
  const features = [
    { imageSrc: ShieldIconImage, title: "Secure", description: "Ensures the utmost security and privacy with robust end-to-end encryption, guaranteeing that your voice calls, video calls, and shared multimedia remain confidential and protected from unauthorized access." },
    { imageSrc: FastIconImage, title: "Fast and Reliable", description: "Delivers a seamless and dependable communication experience, providing instant and responsive voice calls, video calls, and multimedia sharing, allowing you to connect with others effortlessly and without interruption." },
    { imageSrc: GlobalchatIconImage, title: "Global Chatting", description: "Imagine sharing laughter with someone halfway across the globe, discussing common interests with individuals from different backgrounds, or collaborating on projects with minds from various walks of life." },
    { imageSrc: SupportIconImage, title: "Voice Messaging", description: "Elevate your chats with the magic of voice messages. Speak your mind, share laughter, and convey emotions effortlessly. Just a tap to record, and your voice becomes a vibrant part of the conversation. Try it now and let your words resonate!" },
    { imageSrc: MultimediaIconImage, title: "Multimedia Sharing", description: "Share your favorite moments with ease using Connect app's intuitive multimedia sharing feature. From photos and videos to documents and files, seamlessly exchange and collaborate on various media formats, making communication more engaging and dynamic." },
    { imageSrc: DataIconImage, title: "Storage and Recovery", description: "Provide reliable data storage, ensuring your shared multimedia and important files are securely stored. In the event of device loss or data mishaps, leverage the app's data recovery feature to easily restore your valuable information." },
  ];

  return (
    <Container>
      <ThreeColumnContainer>
        <Subheading></Subheading>
        <Heading>Amazing Features</Heading>
        <Description>Experience the Power of Connect: Discover an incredible set of features, all designed to enhance your connectivity and collaboration.</Description>
        <VerticalSpacer />
        {features.map((feature, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <img src={feature.imageSrc || defaultCardImage} alt="" />
              </span>
              <span className="textContainer">
                <span className="title">{feature.title}</span>
                <p className="description">{feature.description}</p>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
    </Container>
  );
};

export default Features