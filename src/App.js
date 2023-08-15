import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ReactComponent as UpIcon } from "feather-icons/dist/icons/chevron-up.svg";
import { Link } from "react-scroll";
import { Element } from "react-scroll";
import "tailwindcss/lib/css/preflight.css";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Home from "components/Home/Home";
import Features from "components/Features/Features";
import Team from "components/Team/Team";
import FAQs from "components/FAQs/FAQs";
import Testimonials from "components/Testimonials/Testimonials";
import CTA from "components/CTA/CTA";
import ContactUs from "components/ContactUs/ContactUs";
import Footer from "components/Footer/Footer";
import Signin from "components/Signin/Signin";
import SignUp from "components/Signup/Signup";
import ChatBox from "components/ChatBox/ChatBox";

function App() {
    const [scrollY, setScrollY] = useState(0);
    const [user, setUser] = useState(null);
    const setUserOnSignin = (user) => {
        setUser(user);
    }
    // For 'To Home' Icon
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Routes>
            <Route path="/" element={
                <AnimationRevealPage>
                    {scrollY > 700 ? <Link to="home" smooth>
                        <div class="mt-16 hover:bg-gray-300 border border-gray-300 cursor-pointer bg-gray-100 z-30 fixed bottom-0 right-0 p-1 md:p-2 m-2 rounded-full shadow">
                            <UpIcon style={{ color: "#5011CC" }} />
                        </div>
                    </Link> : null}
                    <Element name="home"><Home /></Element>
                    <Element name="about"><Features /></Element>
                    <Element name="team"><Team /></Element>
                    <Element name="faqs"><FAQs /></Element>
                    <Element name="testimonials"><Testimonials /></Element>
                    <CTA />
                    <Element name="contact"><ContactUs /></Element>
                    <Footer />
                </AnimationRevealPage>
            } />
            <Route path="/signin" element={<Signin setUserOnSignin={setUserOnSignin} />} />
            <Route path="/signup" element={<SignUp setUserOnSignin={setUserOnSignin} />} />
            <Route path="/chat" element={<ChatBox user={user} setUserOnSignin={setUserOnSignin} />} />
        </Routes>
    );
}

export default App;