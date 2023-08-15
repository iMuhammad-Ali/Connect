import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled, { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
// Layout Styling
const PrimaryBackgroundContainer = tw(Container)`-mx-8 px-8 bg-primary-700 text-gray-100`;
const HeadingContainer = tw.div``;
const Subheading = tw(SubheadingBase)`text-center text-gray-100 mb-4`;
const Heading = tw(SectionHeading)``;
const Description = tw(SectionDescription)`mx-auto text-center text-gray-300`;
// Questions Section Styling
const FaqsContainer = tw.div`mt-10 sm:mt-16 w-full flex-1 lg:flex justify-between items-start max-w-screen-lg mx-auto`;
const FaqsColumn = tw.div`w-full lg:max-w-lg lg:mr-12 last:mr-0`;
const Faq = tw.div`select-none cursor-pointer border-b-2 border-primary-100 hover:border-primary-500 transition-colors duration-300 py-6`;
const Question = tw.div`flex justify-between items-center`;
const QuestionText = tw.div`text-sm sm:text-lg font-semibold tracking-wide`;
const Answer = tw(motion.div)`hidden text-sm font-normal mt-4 text-gray-300`;
const QuestionToggleIcon = styled(motion.span)`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}}`;
// FAQs Component
const FAQs = () => {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
    const faqCol1 = [];
    const faqCol2 = [];
    const faqs = [
        {
            question: "What types of multimedia can I share with the Connect app?",
            answer: "You can share a variety of multimedia files, including photos, videos, documents, and more, making it easy to exchange and collaborate on different types of content."
        },
        {
            question: "Is there a limit to the number of participants in group chats?",
            answer: "The Connect app supports group chats with multiple participants, but the maximum number of participants may depend on the specific configuration and capabilities of the app."
        },
        {
            question: "Is the Connect app available on multiple platforms?",
            answer: "The Connect app is currently available for Windows devices, allowing Windows users to enjoy its features and functionalities. But development team is actively working on bringing the Connect app to iOS and Android platforms. Stay tuned for updates on the official website or app store listings for announcements regarding iOS and Android availability."
        },
        {
            question: "Does the Connect app provide a backup and restore feature for conversations and media?",
            answer: "The Connect app might offer a backup and restore feature to safeguard your conversations and media. Check the app's settings or documentation for information on how to enable and manage backups.",
        },
        {
            question: "How does data storage work in the Connect app?",
            answer: "Empower your Connect app with Firestore's real-time, scalable data storage for seamless global group chatting. From user information to messages, Firestore synchronizes changes instantly, ensuring a dynamic and responsive experience. Enjoy efficient queries, offline support, and secure data management for a user-centric communication platform"
        },
        {
            question: "Can I react to a message in the chat?",
            answer: "Absolutely! the app allows you to react to messages with emojis, adding a touch of expression to your conversations. Your reaction will be shared with everyone in the chat, enhancing your interactive communication experience."
        },
    ]
    const toggleQuestion = questionIndex => {
        if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
        else setActiveQuestionIndex(questionIndex);
    };
    // Map Funtion that fills faqCol1 and faqCol2
    faqs.map((faq, index) => {
        const renderedFaq = (
            <Faq key={index} onClick={() => toggleQuestion(index)}>
                <Question>
                    <QuestionText>{faq.question}</QuestionText>
                    <QuestionToggleIcon
                        variants={{
                            collapsed: { rotate: 0 },
                            open: { rotate: -180 }
                        }}
                        initial="collapsed"
                        animate={activeQuestionIndex === index ? "open" : "collapsed"}
                        transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}                    >
                        <ChevronDownIcon />
                    </QuestionToggleIcon>
                </Question>
                <Answer
                    variants={{
                        open: { opacity: 1, height: "auto", marginTop: "16px", display: "block" },
                        collapsed: { opacity: 0, height: 0, marginTop: "0px", display: "none" }
                    }}
                    initial="collapsed"
                    animate={activeQuestionIndex === index ? "open" : "collapsed"}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                    {faq.answer}
                </Answer>
            </Faq>
        );
        if (index % 2 === 0) faqCol1.push(renderedFaq);
        else faqCol2.push(renderedFaq);
        return null;
    });
    return (
        <PrimaryBackgroundContainer>
            <ContentWithPaddingXl>
                <HeadingContainer>
                    <Subheading></Subheading>
                    <Heading>Frequently Asked Questions</Heading>
                    <Description>Find answers to common queries about the Connect app's features, platform availability, data storage and recovery, and more.</Description>
                </HeadingContainer>
                <FaqsContainer>
                    <FaqsColumn>{faqCol1}</FaqsColumn>
                    <FaqsColumn>{faqCol2}</FaqsColumn>
                </FaqsContainer>
            </ContentWithPaddingXl>
        </PrimaryBackgroundContainer>
    );
};

export default FAQs