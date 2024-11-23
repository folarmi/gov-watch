import { Link } from "react-router-dom";
import OuterPage from "../layouts/OuterPage";

const PrivacyPolicy = () => {
  return (
    <OuterPage>
      <div className="leading-10 px-20">
        <h2 className="text-2xl font-bold text-center my-6">
          GOVWATCH PRIVACY POLICY
        </h2>

        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">1. Introduction</h3>
          <p className="text-black">
            Welcome to the GovWatch. We are committed to protecting your privacy
            and ensuring that your personal information is handled in a safe and
            responsible manner. This Privacy Policy explains how we collect,
            use, disclose, and protect your information when you use our
            services ("Services").
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            2. Information We Collect
          </h3>
          <p className="text-black">
            We may collect the following types of information:
          </p>
        </section>

        {/* Personal Information */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">
            2.1 Personal Information
          </h5>
          <ul className="list-disc ml-5 text-black">
            <li>
              Contact Information: Name, email address, approximate location,
              and phone number.
            </li>
            <li>
              Account Information: Username, password, and subscription details.
            </li>
            <li>Payment Information: Subscription and transaction history.</li>
          </ul>
        </section>

        {/* Non-Personal Information */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">
            2.2 Non-Personal Information
          </h5>
          <ul className="list-disc ml-5 text-black">
            <li>
              Usage Data: Information about how you use our Services, including
              IP address, browser type, pages visited, and time spent on pages.
            </li>
            <li>
              Device Information: Information about the device you use to access
              our Services, such as device type, operating system, and browser
              type.
            </li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            3. How We Use Your Information
          </h3>
          <p className="text-black">
            We use your information for the following purposes:
          </p>
        </section>

        {/* To Provide and Improve Our Services */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">
            3.1 To Provide and Improve Our Services
          </h5>
          <ul className="list-disc ml-5 text-black">
            <li>To process your registration and manage your account.</li>
            <li>To process your subscription and payment transactions.</li>
            <li>To provide customer support and respond to your inquiries.</li>
            <li>
              To personalize your experience and provide content that matches
              your interests.
            </li>
            <li>To improve our Services and develop new features.</li>
          </ul>
        </section>

        {/* For Marketing and Communication */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">
            3.2 For Marketing and Communication
          </h5>
          <ul className="list-disc ml-5 text-black">
            <li>
              To send you promotional offers, newsletters, and updates about our
              Services.
            </li>
            <li>
              To conduct surveys and gather feedback to improve our Services.
            </li>
          </ul>
        </section>

        {/* Sharing Your Information */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            4. Sharing Your Information
          </h3>
          <p className="text-black">
            We may share your information with the following parties:
          </p>
        </section>

        {/* Service Providers */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">
            4.1 Service Providers
          </h5>
          <p className="text-black">
            We may share your information with third-party service providers who
            perform services on our behalf, such as payment processing, data
            analysis, and customer support.
          </p>
        </section>

        {/* Legal and Regulatory Authorities */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">
            4.2 Legal and Regulatory Authorities
          </h5>
          <p className="text-black">
            We may disclose your information to comply with legal obligations,
            such as responding to subpoenas or court orders.
          </p>
        </section>

        {/* Business Transfers */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">
            4.3 Business Transfers
          </h5>
          <p className="text-black">
            In the event of a merger, acquisition, or sale of our assets, your
            information may be transferred to the new owner.
          </p>
        </section>

        {/* Data Security */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">5. Data Security</h3>
          <p className="text-black">
            We implement a variety of security measures to protect your
            information from unauthorized access, use, or disclosure. These
            measures include:
          </p>
          <ul className="list-disc ml-5 text-black">
            <li>Encryption of sensitive data during transmission.</li>
            <li>Regular security assessments and updates.</li>
            <li>
              Restricted access to personal information by employees and service
              providers.
            </li>
            <li>
              Deletion of data regarding your approximate location to protect
              you from being politically targeted.
            </li>
          </ul>
        </section>

        {/* Your Rights */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">6. Your Rights</h3>
          <p className="text-black">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc ml-5 text-black">
            <li>
              Access: You can request access to your personal information and
              obtain a copy of it.
            </li>
            <li>
              Correction: You can request correction of any inaccuracies in your
              personal information.
            </li>
            <li>
              Deletion: You can request deletion of your personal information,
              subject to legal and contractual restrictions.
            </li>
            <li>
              Objection: You can object to the processing of your personal
              information for marketing purposes.
            </li>
            <li>
              Withdrawal of Consent: You can withdraw your consent to the
              processing of your personal information at any time.
            </li>
          </ul>
        </section>

        {/* Cookies and Tracking Technologies */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            7. Cookies and Tracking Technologies
          </h3>
          <p className="text-black">
            We use cookies and similar tracking technologies to collect usage
            data and improve your experience. You can manage your cookie
            preferences through your browser settings. For more information,
            please refer to our Cookie Policy.
          </p>
        </section>

        {/* Changes to This Privacy Policy */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            8. Changes to This Privacy Policy
          </h3>
          <p className="text-black">
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes by posting the updated policy on our
            website. Your continued use of our Services after the changes take
            effect constitutes your acceptance of the revised policy.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">9. Contact Information</h3>
          <p className="text-black">
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at{" "}
            <span> hello@govwatch.ng </span>or{" "}
            <Link to="/contact-us" className="text-blue-600">
              here
            </Link>
          </p>
          <ul className="list-disc ml-5 text-black">
            <li>Email: [YourEmail@example.com]</li>
            <li>Address: [YourCompany Address]</li>
            <li>Phone: [YourCompany Phone Number]</li>
          </ul>
        </section>
      </div>
    </OuterPage>
  );
};

export { PrivacyPolicy };
