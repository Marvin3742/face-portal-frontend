import { useState } from "react"
import marvinPfp from "../Images/marvin_pfp.jpg"
import "../css/contact.css"

function Contact(){
    const [openFaq, setOpenFaq] = useState(null)

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index)
    }

    const faqs = [
        {
            question: "Is my photo stored or shared?",
            answer: "No, your privacy is our priority. All photos are processed locally and automatically deleted after generation. We don't store your images or share them with third parties."
        },

        {
            question: "What about signed-in users?",
            answer: "Our gallery feature allows signed-in users to save their generated images to their account. Users have the right to delete their images at any time from our database. "
        },
        {
            question: "What photo formats are supported?",
            answer: "We support JPG, JPEG, and PNG formats. For best results, use a clear, front-facing photo with good lighting and minimal shadows."
        },
        {
            question: "How long does it take to generate results?",
            answer: "Processing typically takes 15-30 seconds depending on image size and complexity. Larger images may take slightly longer to process."
        },
        {
            question: "Can I use photos of other people?",
            answer: "You should only upload photos that you have permission to use. We recommend using your own photos or photos you have explicit consent to process."
        },
        {
            question: "What age ranges can the AI predict?",
            answer: "Our model can age faces forward or backward by 10-20 years. The accuracy tends to be higher for moderate age changes (10-15 years) compared to extreme changes."
        },
        {
            question: "Why doesn't my result look realistic?",
            answer: "Several factors can affect quality: photo lighting, angle, resolution, or facial obstructions. Try using a clear, well-lit, front-facing photo for best results."
        },
    ]

    return(
        <div className="contact-container">
            {/* Header */}
            <section className="header-section">
                <h1 className="page-title">Help & Contact</h1>
                <p className="page-subtitle">Find answers to common questions or learn more about the developer</p>
            </section>

            <div className="content-wrapper">
                {/* FAQ Section */}
                <section className="faq-section">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div key={index} className="faq-item">
                                <button 
                                    className={`faq-question ${openFaq === index ? 'active' : ''}`}
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span>{faq.question}</span>
                                    <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                                </button>
                                {openFaq === index && (
                                    <div className="faq-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>


                {/* Bio Section */}
                <div className="bio-section">
                    <img
                    src={marvinPfp}  // 
                    alt="Marvin"
                    className="bio-image"
                    />
                    <div className="bio-text">
                    <h2>About the Developer</h2>
                    <p>
                        Hi, my name is Marvin Guerrero-Rangel and I am a student with a focus in data science and artificial intelligence. I'm passionate about exploring the latest developments in the field and leveraging them to engineer powerful solutions to meaningful problems. I’m always eager to learn, collaborate, and grow. If you have suggestions for this project or would simply like to connect, please feel free to reach out using the contact information below.
                    </p>
                    </div>
                </div>

                {/* Quick Contact Info */}
                <section className="quick-contact">
                    <h3>Contact Information</h3>
                    <div className="contact-methods">
                        <div className="contact-method">
                            <img 
                            src="mail.png" 
                            alt="mail-icon"
                            className="contact-icon" />
                            <div>
                                <strong>Email Support</strong>
                                <p>marving@usf.edu</p>
                            </div>
                        </div>
                        <div className="contact-method">
                            <img 
                            src="linkedin.png"
                            alt="linkedin" 
                            className="contact-icon"/>
                            <div>
                                <strong>LinkedIn</strong>
                                    <a 
                                    href="https://linkedin.com/in/marvin3742" 
                                    target="_blank"
                                    rel="noopener noreferrer" 
                                    className="links">linkedin.com/in/marvin3742</a>
                            </div>
                        </div>
                        <div className="contact-method">
                            <img 
                            src="github.png"
                            alt="github" 
                            className="contact-icon"/>
                            <div>
                                <strong>GitHub</strong>
                                <a 
                                href="https://github.com/Marvin3742" 
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="links">github.com/Marvin37422</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Contact
