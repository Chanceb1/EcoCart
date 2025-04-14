import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeProvider';

interface Section {
  id: string;
  title: string;
  number: number;
}

export default function PrivacyPolicy() {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    // Define sections for the on-page navigation
    const sections: Section[] = [
      { id: "information-we-collect", title: "Information We Collect", number: 1 },
      { id: "how-we-use", title: "How We Use Your Information", number: 2 },
      { id: "data-sharing", title: "Data Sharing and Disclosure", number: 3 },
      { id: "data-security", title: "Data Security", number: 4 },
      { id: "your-rights", title: "Your Rights", number: 5 },
      { id: "childrens-privacy", title: "Children's Privacy", number: 6 },
      { id: "changes", title: "Changes to This Privacy Policy", number: 7 },
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
          ? (isDarkMode ? "bg-gray-800 text-blue-400" : "bg-gray-100 text-blue-600") 
          : (isDarkMode ? "text-gray-300 hover:text-blue-300" : "text-gray-700 hover:text-blue-500")
      } rounded`;
    const sideNavClass = isDarkMode 
      ? "bg-gray-900 border-gray-700" 
      : "bg-white border-gray-200";

    return (
        <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8 relative">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main content */}
                <div className="lg:w-3/4">
                    <h1 className={`text-3xl font-bold mb-6 ${headingClass}`}>Privacy Policy</h1>

                    <section id="information-we-collect" className={`mb-6 ${sectionBorderClass} pb-4 border-b`}>
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>1. Information We Collect</h2>
                        <p className={paragraphClass}>
                            We collect the following types of information:
                        </p>
                        <ul className="list-disc pl-5 mt-2">
                            <li className={paragraphClass}>Personal Information: [Describe what personal information you collect, e.g., name, email address, student ID].</li>
                            <li className={paragraphClass}>Usage Data: [Describe what usage data you collect, e.g., pages visited, features used, time spent on the app].</li>
                            <li className={paragraphClass}>Device Information: [Describe what device information you collect, e.g., device type, operating system, browser type].</li>
                        </ul>
                    </section>

                    <section id="how-we-use" className={`mb-6 ${sectionBorderClass} pb-4 border-b`}>
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>2. How We Use Your Information</h2>
                        <p className={paragraphClass}>
                            We use your information for the following purposes:
                        </p>
                        <ul className="list-disc pl-5 mt-2">
                            <li className={paragraphClass}>To provide and maintain the App.</li>
                            <li className={paragraphClass}>To personalize your experience.</li>
                            <li className={paragraphClass}>To communicate with you.</li>
                            <li className={paragraphClass}>To improve the App.</li>
                            <li className={paragraphClass}>To comply with legal obligations.</li>
                        </ul>
                    </section>

                    <section id="data-sharing" className={`mb-6 ${sectionBorderClass} pb-4 border-b`}>
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>3. Data Sharing and Disclosure</h2>
                        <p className={paragraphClass}>
                            We may share your information with the following third parties:
                        </p>
                        <ul className="list-disc pl-5 mt-2">
                            <li className={paragraphClass}>Service Providers: [Describe any third-party service providers you use, e.g., hosting providers, analytics providers].</li>
                            <li className={paragraphClass}>Legal Authorities: [Describe when you may disclose information to legal authorities].</li>
                        </ul>
                        <p className={paragraphClass}>
                            We will not sell your personal information to third parties.
                        </p>
                    </section>

                    <section id="data-security" className={`mb-6 ${sectionBorderClass} pb-4 border-b`}>
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>4. Data Security</h2>
                        <p className={paragraphClass}>
                            We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet, or method of electronic storage, is 100% secure.
                        </p>
                    </section>

                    <section id="your-rights" className={`mb-6 ${sectionBorderClass} pb-4 border-b`}>
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>5. Your Rights</h2>
                        <p className={paragraphClass}>
                            You have the following rights regarding your information:
                        </p>
                        <ul className="list-disc pl-5 mt-2">
                            <li className={paragraphClass}>Access: You have the right to access the information we hold about you.</li>
                            <li className={paragraphClass}>Correction: You have the right to correct any inaccurate or incomplete information.</li>
                            <li className={paragraphClass}>Deletion: You have the right to request deletion of your information.</li>
                        </ul>
                    </section>

                    <section id="childrens-privacy" className={`mb-6 ${sectionBorderClass} pb-4 border-b`}>
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>6. Children's Privacy</h2>
                        <p className={paragraphClass}>
                            Our App is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.
                        </p>
                    </section>

                    <section id="changes" className={`mb-6 ${sectionBorderClass} pb-4 border-b`}>
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>7. Changes to This Privacy Policy</h2>
                        <p className={paragraphClass}>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                        </p>
                    </section>

                    <section id="contact-us" className="mb-6">
                        <h2 className={`text-xl font-semibold mb-2 ${headingClass}`}>8. Contact Us</h2>
                        <p className={paragraphClass}>
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@email.com" className="hover:text-blue-400 underline">info@email.com</a>.
                        </p>
                    </section>
                </div>

                {/* On this page navigation - only visible on lg screens and above */}
                <div className="lg:w-1/4">
                    <div className={`lg:sticky lg:top-24 p-4 border rounded-md ${sideNavClass}`}>
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