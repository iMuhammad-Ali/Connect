import React, { useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import styled from "styled-components";
import illustration from "images/login-illustration.svg";
import logo from "images/connect-logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import 'react-toastify/dist/ReactToastify.css';
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, Toaster } from "react-hot-toast";
import classes from '../../helpers/Loader.module.css';
// Layout Styling
const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 px-6 sm:p-12`;
// Logo and Header Styling
const LogoLink = tw.a`cursor-pointer`;
const LogoImage = tw.img`mt-12 sm:mt-0 h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
// Social Links Styling
const Hover = tw.span`hover:bg-primary-800`;
const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`cursor-pointer w-full max-w-xs font-semibold rounded-lg py-2 border text-gray-900 bg-gray-100 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }`;
// Divider Styling
const DividerTextContainer = tw.div`w-full my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;
// Form Styling
const Form = tw.form`mx-auto max-w-xs`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg transition-all ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }`;
// Illustration Styling
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}`;
// Signin Component
const Signin = (props) => {
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const [ph, setPh] = useState("");
    const [otp, setOtp] = useState("");
    const [showOTPBlock, setShowOTPBlock] = useState(false)
    const [backdrop, setBackdrop] = useState(false)
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();

    const userDataUploadHandler = async (collectionRef, user) => {
        const usersQuery = query(collectionRef, where('userInfo.uid', '==', user.uid));
        const usersSnapshot = await getDocs(usersQuery);
        if (usersSnapshot.empty) {
            addDoc(collectionRef, {
                userInfo: {
                    uid: user.uid,
                    provider: user.providerData[0],
                },
            });
        }
    }
    // GOOGLE Signin
    const googleSigninHandler = async () => {
        setBackdrop(true);
        const token = localStorage.getItem('authToken');
        if (token) {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = result.user;
            // Active Users
            const activeUsersCollectionRef = collection(db, "activeUsers");
            userDataUploadHandler(activeUsersCollectionRef, user);
            props.setUserOnSignin(user);
            navigate('/chat');
        } else {
            signInWithPopup(auth, googleProvider)
                .then(async function (result) {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                    localStorage.setItem('authToken', token);
                    // Firestore Database
                    const usersCollectionRef = collection(db, "users");
                    userDataUploadHandler(usersCollectionRef, user);
                    // Active Users
                    const activeUsersCollectionRef = collection(db, "activeUsers");
                    userDataUploadHandler(activeUsersCollectionRef, user);
                    props.setUserOnSignin(user);
                    navigate('/chat')
                }).catch((error) => {
                    setBackdrop(false);
                });
        }
    }
    // PHONE Signin
    const recaptchaHandler = () => {
        setRecaptchaLoaded(true);
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                phoneSigninHandler();
            },
            'expired-callback': () => {
                setBackdrop(false);
            }
        });
    }
    const phoneSigninHandler = (event) => {
        event.preventDefault();
        setBackdrop(true);
        if (!showOTPBlock) {
            if (!recaptchaLoaded) {
                recaptchaHandler();
            }
            const appVerifier = window.recaptchaVerifier;
            const formatPh = "+" + ph;
            signInWithPhoneNumber(auth, formatPh, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    setShowOTPBlock(true);
                    toast.success("OTP sended successfully!");
                    setBackdrop(false);
                }).catch((error) => {
                    toast.error("OTP wasn't sent. Please try again later.");
                    setBackdrop(false);
                });
        } else {
            window.confirmationResult.confirm(otp)
                .then(async (result) => {
                    const user = result.user;
                    user.providerData[0].displayName = user.providerData[0].phoneNumber;
                    user.displayName = user.providerData[0].phoneNumber;
                    const usersCollectionRef = collection(db, "users");
                    userDataUploadHandler(usersCollectionRef, user);
                    // Active Users Collection
                    const activeUsersCollectionRef = collection(db, "activeUsers");
                    userDataUploadHandler(activeUsersCollectionRef, user);
                    props.setUserOnSignin(user);
                    setBackdrop(false);
                    toast.success("OTP Verified!");
                    navigate('/chat');
                }).catch((error) => {
                    toast.error("Invalid OTP Code");
                    setBackdrop(false);
                });
        }
    }
    const socialButtons = [
        {
            iconImageSrc: googleIconImageSrc,
            text: "Sign In With Google",
            onClick: googleSigninHandler,
        },
    ]

    return (
        <>
            {backdrop ?
                <div style={{ backgroundColor: '#43434379' }} class="w-screen h-screen fixed top-0 bg-gray-200 z-30 flex items-center justify-center
                        [&>*]:opacity-100 [&>*]:w-14 [&>*]:h-14 [&>*]:z-50 [&>*]:rounded-full">
                    <span className={classes.Loader}></span>
                </div>
                : null}
            <AnimationRevealPage>
                <Container>
                    <Toaster toastOptions={{ duration: 4000 }} />
                    <Content>
                        <MainContainer>
                            <LogoLink onClick={() => navigate('/')}>
                                <LogoImage src={logo} />
                            </LogoLink>
                            <MainContent>
                                <Heading>Sign In To <span tw="text-primary-600">Connect</span></Heading>
                                <FormContainer>
                                    <SocialButtonsContainer>
                                        {socialButtons.map((socialButton, index) => (
                                            <SocialButton key={index} onClick={socialButton.onClick}>
                                                <span className="iconContainer">
                                                    <img src={socialButton.iconImageSrc} className="icon" alt="" />
                                                </span>
                                                <span className="text">{socialButton.text}</span>
                                            </SocialButton>
                                        ))}
                                    </SocialButtonsContainer>
                                    <DividerTextContainer>
                                        <DividerText>Or Sign in with <span tw="text-primary-600">Phone Number</span></DividerText>
                                    </DividerTextContainer>
                                    <Form onSubmit={(e) => phoneSigninHandler(e)}>
                                        {!showOTPBlock ?
                                            <>
                                                <PhoneInput
                                                    country={"pk"}
                                                    value={ph}
                                                    onChange={setPh}
                                                    placeholder="Phone Number"
                                                    inputStyle={{
                                                        width: '100%',
                                                        height: '50px',
                                                        backgroundColor: '#F7FAFC',
                                                        fontSize: '16px',
                                                        borderRadius: '5px',
                                                    }}
                                                />
                                                <div class="mx-auto my-5 ml-2" id="recaptcha-container"></div>
                                                <button
                                                    type="submit"
                                                    disabled={ph.length < 7}
                                                    style={{
                                                        backgroundColor: ph.length < 7 ? '#7937ff' : '#6415ff',
                                                        color: ph.length < 7 ? 'lightgray' : '',
                                                        cursor: ph.length < 7 ? 'not-allowed' : '',
                                                    }}

                                                    class="mt-5 tracking-wide font-semibold text-gray-100 w-full py-4 rounded-lg transition-all ease-in-out flex items-center justify-center" >
                                                    <LoginIcon class="w-6 h-6 -ml-2" />
                                                    <span class="ml-3" >Get OTP</span>
                                                </button>
                                            </> :
                                            <>
                                                <OtpInput
                                                    value={otp}
                                                    onChange={setOtp}
                                                    OTPLength={6}
                                                    otpType="number"
                                                    disabled={false}
                                                    autoFocus
                                                    className="bg-gray-100 px-3 py-4 rounded-lg text-xl border border-blue-200 [&>*]:rounded [&>*]:shadow [&>*]:outline-none [&>*]:text-blue-600 [&>*]:border [&>*]:border-gray-200 "
                                                />
                                                <Hover>
                                                    <SubmitButton type="submit">
                                                        <LoginIcon className="icon" />
                                                        <span className="text">Verify</span>
                                                    </SubmitButton>
                                                </Hover>
                                            </>
                                        }
                                    </Form>
                                    <p tw="mt-8 px-8 text-sm text-gray-600 text-center">
                                        Don't have an account?{" "}
                                        <a onClick={() => navigate('/signup')} tw="cursor-pointer text-primary-600 border-b border-primary-600 border-dotted"> {/* eslint-disable-line */}
                                            Sign Up
                                        </a>
                                    </p>
                                </FormContainer>
                            </MainContent>
                        </MainContainer>
                        <IllustrationContainer>
                            <IllustrationImage imageSrc={illustration} />
                        </IllustrationContainer>
                    </Content>
                </Container>
            </AnimationRevealPage >
        </>
    );
}

export default Signin