import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeProvider';

interface Section {
  id: string;
  title: string;
  number: number;
}

export default function Terms() {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const location = useLocation();
    const navbarHeight = 66; // Same height as in PrivacyPolicyPage
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    // Define sections for the on-page navigation
    const sections: Section[] = [
      { id: "acceptance", title: "Acceptance of Terms", number: 1 },
      { id: "use-of-app", title: "Use of the App", number: 2 },
      { id: "intellectual-property", title: "Intellectual Property", number: 3 },
      { id: "disclaimer", title: "Disclaimer of Warranty", number: 4 },
      { id: "limitation", title: "Limitation of Liability", number: 5 },
      { id: "governing-law", title: "Governing Law", number: 6 },
      { id: "changes", title: "Changes to These Terms", number: 7 },
      { id: "contact-us", title: "Contact Us", number: 8 },
    ];

    // Track active section for highlighting in the navigation
    const [activeSection, setActiveSection] = useState<string>(sections[0].id);

    // Function to scroll to a specific section
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
          // Get the element's position
          const rect = element.getBoundingClientRect();
          const navbarOffset = 66; // Adjust this value based on your navbar height
          
          // Calculate scroll position with offset
          const scrollPosition = window.pageYOffset + rect.top - navbarOffset;
          
          // Scroll to the position with smooth behavior
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
          
          setActiveSection(sectionId);
        }
      };


    // Define dynamic classes based on theme
    const headingClass = isDarkMode ? "text-gray-100" : "text-gray-900";
    const paragraphClass = isDarkMode ? "text-gray-300" : "text-gray-700";
    const sectionBorderClass = isDarkMode ? "border-gray-700" : "border-gray-200";
    const navLinkClass = (sectionId: string) => 
      `block py-2 px-3 text-sm transition-colors duration-200 ${
        activeSection === sectionId 
          ? (isDarkMode ? "bg-gray-800 text-blue-400 font-medium" : "bg-gray-100 text-blue-600 font-medium") 
          : (isDarkMode ? "text-gray-300 hover:text-blue-300" : "text-gray-700 hover:text-blue-500")
      } rounded cursor-pointer`;
    const sideNavClass = isDarkMode 
      ? "bg-gray-900 border-gray-700" 
      : "bg-white border-gray-200";

    return (
        <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8 relative">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main content */}
                <div className="lg:w-3/4">
                    <h1 className={`text-3xl font-bold mb-6 ${headingClass}`}>Terms and Conditions</h1>

                    <section 
                      id="acceptance" 
                      className={`mb-6 ${sectionBorderClass} pb-4 border-b`}
                      style={{ scrollMarginTop: `${navbarHeight}px` }}
                    >
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>1. Acceptance of Terms</h2>
                        <p className={paragraphClass}>
                            By accessing or using the EcoCart application ("the App"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you may not access or use the App.
                        </p>
                    </section>

                    <section 
                      id="use-of-app" 
                      className={`mb-6 ${sectionBorderClass} pb-4 border-b`}
                      style={{ scrollMarginTop: `${navbarHeight}px` }}
                    >
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>2. Use of the App</h2>
                        <p className={paragraphClass}>
                            The App is intended to provide academic planning and course scheduling assistance for students. You agree to use the App only for lawful purposes and in accordance with these Terms.
                        </p>
                        <ul className="list-disc pl-5 mt-2">
                            <li className={paragraphClass}>You must be at least 13 years old to use the App.</li>
                            <li className={paragraphClass}>You are responsible for maintaining the confidentiality of your account credentials.</li>
                            <li className={paragraphClass}>You agree not to use the App in any way that could damage, disable, overburden, or impair our servers or networks.</li>
                        </ul>
                    </section>

                    {/* Other sections remain the same */}
                    <section 
                      id="intellectual-property" 
                      className={`mb-6 ${sectionBorderClass} pb-4 border-b`}
                      style={{ scrollMarginTop: `${navbarHeight}px` }}
                    >
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>3. Intellectual Property</h2>
                        <p className={paragraphClass}>
                            The App and its original content, features, and functionality are owned by EcoCart and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
                        </p>
                    </section>

                    <section 
                      id="disclaimer" 
                      className={`mb-6 ${sectionBorderClass} pb-4 border-b`}
                      style={{ scrollMarginTop: `${navbarHeight}px` }}
                    >
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>4. Disclaimer of Warranty</h2>
                        <p className={paragraphClass}>
                            THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.
                        </p>
                    </section>

                    <section 
                      id="limitation" 
                      className={`mb-6 ${sectionBorderClass} pb-4 border-b`}
                      style={{ scrollMarginTop: `${navbarHeight}px` }}
                    >
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>5. Limitation of Liability</h2>
                        <p className={paragraphClass}>
                            IN NO EVENT SHALL EcoCart BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOOD-WILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE APP; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE APP; (C) ANY CONTENT OBTAINED FROM THE APP; AND (D) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
                        </p>
                    </section>

                    <section 
                      id="governing-law" 
                      className={`mb-6 ${sectionBorderClass} pb-4 border-b`}
                      style={{ scrollMarginTop: `${navbarHeight}px` }}
                    >
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>6. Governing Law</h2>
                        <p className={paragraphClass}>
                            These Terms shall be governed by and construed in accordance with the laws of Washington State, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section 
                      id="changes" 
                      className={`mb-6 ${sectionBorderClass} pb-4 border-b`}
                      style={{ scrollMarginTop: `${navbarHeight}px` }}
                    >
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>7. Changes to These Terms</h2>
                        <p className={paragraphClass}>
                            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>
                    </section>

                    <section 
                      id="contact-us" 
                      className="mb-6"
                      style={{ scrollMarginTop: `${navbarHeight}px` }}
                    >
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>8. Contact Us</h2>
                        <p className={paragraphClass}>
                            If you have any questions about these Terms, please contact us at <a href="mailto:info@email.com" className="hover:text-blue-400 underline">info@email.com</a>.
                        </p>
                    </section>
                </div>

                {/* On this page navigation - only visible on lg screens and above */}
                <div className="lg:w-1/4">
                    <div className={`lg:sticky lg:top-20 p-4 border rounded-md ${sideNavClass}`}>
                        <h3 className={`font-semibold mb-3 ${headingClass}`}>On This Page</h3>
                        <nav>
                            <ul>
                                {sections.map((section) => (
                                    <li key={section.id} className="mb-1">
                                        <button 
                                            onClick={() => scrollToSection(section.id)}
                                            className={navLinkClass(section.id)}
                                        >
                                            {section.number}. {section.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}