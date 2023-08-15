import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; // eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Layout Styling
const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
// Image Styling
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
   tw`md:w-7/12 mt-16 md:mt-0`,
   props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`]);
const Image = styled.div(props => [
   `background-image: url("${props.imageSrc}");`,
   tw`rounded bg-contain bg-no-repeat bg-center h-full`,]);
// Description Section Styling
const TextContent = tw.div`lg:py-8 text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`
// Form Styling
const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0 hocus:outline-none`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}`
const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`
// ContactUs Component
const ContactUs = () => {
   // Form Submission
   const formSubmitHandler = async (event) => {
      event.preventDefault();
      const email = event.target[0].value;
      const name = event.target[1].value;
      const subject = event.target[2].value;
      const message = event.target[3].value;
      try {
         const formsCollectionRef = collection(db, 'forms');
         await addDoc(formsCollectionRef, {
            email: email,
            senderName: name,
            subject: subject,
            message: message,
            timestamp: serverTimestamp(),
         });
         toast.success('Form submitted. Thank you! We\'ll reply soon.', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
         });
      } catch (error) {
         console.error('Error sending message:', error.message);
         toast.error('An error occurred. Please try again later.', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
         });
      }
      event.target[0].value = event.target[1].value = event.target[2].value = event.target[3].value = '';
   }
   return (
      <Container>
         <TwoColumn>
            <ImageColumn>
               <Image imageSrc={EmailIllustrationSrc} />
            </ImageColumn>
            <TextColumn textOnLeft={true}>
               <TextContent>
                  <Heading>Feel free to <span tw="text-primary-500">get in touch</span><wbr /> with us.</Heading>
                  <Description>Have a question or feedback? We'd love to hear from you! Contact us today for any inquiries, suggestions, or feedback.</Description>
                  <Form onSubmit={formSubmitHandler} method="get">
                     <Input required type="email" name="email" placeholder="Your Email Address" className="input" />
                     <Input required type="text" name="name" placeholder="Full Name" />
                     <Input required type="text" name="subject" placeholder="Subject" />
                     <Textarea required name="message" placeholder="Your Message Here" />
                     <SubmitButton type="submit">Send</SubmitButton>
                     <ToastContainer />
                  </Form>
               </TextContent>
            </TextColumn>
         </TwoColumn>
      </Container>
   );
};

export default ContactUs