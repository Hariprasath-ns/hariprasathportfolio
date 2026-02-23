import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

// ─── EmailJS Configuration ───────────────────────────────────────────────────
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add an Email Service (Gmail) → copy its Service ID below
// 3. Create an Email Template → copy its Template ID below
//    Template variables to use: {{from_name}}, {{from_email}}, {{message}}
// 4. Go to Account → API Keys → copy your Public Key below
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // e.g. 'aBcDeFgHiJkLmNoP'
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
    const formRef = useRef(null);
    const [result, setResult] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult('Sending...');
        setIsSuccess(null);

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );
            setResult('✅ Message sent successfully! I\'ll get back to you soon.');
            setIsSuccess(true);
            formRef.current.reset();
        } catch (err) {
            console.error('EmailJS error:', err);
            setResult('❌ Something went wrong. Please try again or email me directly.');
            setIsSuccess(false);
        }
    };

    return (
        <div id="contact" className="w-full px-[12%] py-10 scroll-mt-20 bg-[url('./assets/footer-bg-color.png')] bg-no-repeat bg-[length:90%_auto] bg-center dark:bg-none">

            <h4 className="text-center mb-2 text-lg font-Ovo">Connect with me</h4>
            <h2 className="text-center text-5xl font-Ovo">Get in touch</h2>
            <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">I&apos;d love to hear from you! If you have any questions, comments or feedback, please use the form below.</p>

            <form ref={formRef} onSubmit={onSubmit} className="max-w-2xl mx-auto">

                <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="flex-1 px-3 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white dark:bg-darkHover/30"
                        required
                        name="from_name"
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-3 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white dark:bg-darkHover/30"
                        required
                        name="from_email"
                    />
                </div>

                <textarea
                    rows="6"
                    placeholder="Enter your message"
                    className="w-full px-4 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white mb-6 dark:bg-darkHover/30"
                    required
                    name="message"
                ></textarea>

                <button
                    type="submit"
                    className="py-2 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border dark:border-white/30 dark:hover:bg-darkHover"
                >
                    Submit now
                    <img src="./assets/right-arrow-white.png" alt="" className="w-4" />
                </button>

                {result && (
                    <p className={`mt-4 text-center font-Ovo ${isSuccess === true ? 'text-green-600' : isSuccess === false ? 'text-red-500' : 'text-gray-500'}`}>
                        {result}
                    </p>
                )}
            </form>
        </div>
    )
}