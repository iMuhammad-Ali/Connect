import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as CertificationIcon } from "feather-icons/dist/icons/award.svg";
import { ReactComponent as AwardIcon } from "feather-icons/dist/icons/thumbs-up.svg";
import { ReactComponent as TrendingIcon } from "feather-icons/dist/icons/trending-up.svg";
import ProfileImage from "images/profile.jpg";
// Layout Styling
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-6 lg:py-10`;
const TwoColumn = tw.div`flex flex-col md:flex-row place-content-around max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div``;
const HeadingColumn = tw(Column)`w-full xl:w-1/2`;
const CardColumn = tw(Column)`w-full md:w-1/2 xl:w-1/3 mt-16 xl:mt-0`;
// Information Styling
const HeadingInfoContainer = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;
const HeadingTitle = tw(SectionHeading)`xl:text-left leading-tight`;
const HeadingDescription = tw.p`text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-8 mb-8`;
const FeatureList = tw.ul`mt-2 leading-loose`;
const Feature = tw.li`flex items-center`;
const CertificationsIcon = tw(CertificationIcon)`w-5 h-5 text-primary-500`;
const SkillsIcon = tw(AwardIcon)`w-5 h-5 text-primary-500`;
const FeatureText = tw.p`ml-2 font-medium text-gray-700`;
// Card Styling
const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImage = styled.div(props => [
   `background-image: url("${props.imageSrc}");`,
   tw`h-80 bg-cover bg-center rounded`]);
const CardText = tw.div`mt-4`;
const CardHeader = tw.div`flex justify-between items-center`;
const SectionHeader = tw.div`text-primary-500 font-bold text-xl`;
const CardTitle = tw.h5`text-lg mt-4 font-bold`;
const Hocus = tw.span`hocus:bg-primary-700`
const CardAction = tw(PrimaryButtonBase)`w-full mt-8`;
const CardMeta = styled.div`${tw`flex flex-row gap-x-4 flex-wrap justify-between sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}`;
const CardMetaFeature = styled.div`
  ${tw`flex items-center mt-4`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }`;
// Team Component
const Team = () => {
   const degrees = ["BS Electrical Engineering - MCS, NUST"]
   const skills = ["React, Redux, JavaScript, HTML", "CSS, Tailwind CSS, Bootstrap, SASS, SCSS", "Python, C++, MATLAB"]
   const openGmail = () => {
      const email = 'mali255241@gmail.com';
      const subject = 'Hello from React App';
      const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
      window.open(url);
   };
   return (
      <Container>
         <Content>
            <TwoColumn>
               <HeadingColumn>
                  <HeadingInfoContainer>
                     <HeadingTitle>Muhammad Ali Janjua</HeadingTitle>
                     <HeadingDescription>Specialized in creating dynamic and user-friendly web applications. With a focus on performance optimization and responsive design, I leverage my expertise in component-based development and state management to deliver seamless user experiences. Committed to clean and scalable code, I strive to exceed client expectations and contribute to the success of each project.</HeadingDescription>
                     <SectionHeader>Education</SectionHeader>
                     <FeatureList>
                        {degrees.map((degree, index) => (
                           <Feature key={index}>
                              <CertificationsIcon />
                              <FeatureText>{degree}</FeatureText>
                           </Feature>))}
                     </FeatureList>
                     <SectionHeader style={{ marginTop: 20 }}>Programming Skills</SectionHeader>
                     <FeatureList>
                        {skills.map((skill, index) => (
                           <Feature key={index}>
                              <SkillsIcon />
                              <FeatureText>{skill}</FeatureText>
                           </Feature>))}
                     </FeatureList>
                  </HeadingInfoContainer>
               </HeadingColumn>
               <CardColumn>
                  <Card>
                     <CardImage imageSrc={ProfileImage} />
                     <CardText>
                        <CardHeader>
                           <SectionHeader>React.js Developer</SectionHeader>
                        </CardHeader>
                        <CardTitle>Experienced in designing responsive interfaces and backend integration.</CardTitle>
                        <CardMeta>
                           <CardMetaFeature>
                              <TrendingIcon /> Emerging Developer
                           </CardMetaFeature>
                           <CardMetaFeature>
                              <LocationIcon /> Jhelum, Pakistan
                           </CardMetaFeature>
                        </CardMeta>
                        <Hocus>
                           <CardAction onClick={openGmail} >Hire Now</CardAction>
                        </Hocus>
                     </CardText>
                  </Card>
               </CardColumn>
            </TwoColumn>
         </Content>
      </Container>
   );
};

export default Team