import { Link } from "react-router-dom";
import OuterPage from "../layouts/OuterPage";

const TermsOfUse = () => {
  return (
    <OuterPage>
      <div className="leading-10 px-20">
        <h2 className="text-2xl font-bold text-center my-6">
          GOVWATCH TERMS OF USE
        </h2>
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">1. Introduction</h3>
          <p className="text-black">
            Welcome to the Government Policies Digital Archive. These Terms of
            Use ("Terms") govern your access to and use of our digital archive
            services ("Services"), including the free and subscription-based
            content available on our website. By accessing or using our
            Services, you agree to comply with and be bound by these Terms. If
            you do not agree with these Terms, please do not use our Services.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">2. Definitions</h3>
          <ul className="list-disc ml-5 text-black">
            <li>
              <strong>Archive</strong>: GovWatch, including all content and
              services provided.
            </li>
            <li>
              <strong>User</strong>: Any individual or entity accessing the
              Archive.
            </li>
            <li>
              <strong>Content</strong>: All text, data, documents, graphics,
              images, and other materials available in the Archive.
            </li>
            <li>
              <strong>Subscription Service</strong>: Paid access to premium
              content and features within the Archive.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">3. Eligibility</h3>
          <p className="text-black">
            The Archive is available to users worldwide over the internet. By
            using the Archive, you represent and warrant that you are at least
            18 years old or have parental consent to use the Service.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">4. Use of the Archive</h3>

          <h5 className="text-base font-semibold mb-2">4.1 Free Access</h5>
          <ul className="list-disc ml-5 text-black">
            <li>
              Users may access a portion of the Archive's content for free. Free
              access is provided for personal, non-commercial use only. You may:
            </li>
            <li>View and download content for personal use.</li>
            <li>
              Cite content in academic and educational works, provided proper
              attribution is given.
            </li>
          </ul>

          <h5 className="text-base font-semibold mb-2">
            4.2 Subscription Service
          </h5>
          <ul className="list-disc ml-5 text-black">
            <li>
              Users may subscribe to gain access to premium content and
              additional features. Subscription terms, including pricing and
              payment details, are outlined during the subscription process. By
              subscribing, you agree to pay all fees associated with the chosen
              subscription plan.
            </li>
          </ul>

          <h5 className="text-base font-semibold mb-2">4.3 Prohibited Use</h5>
          <ul className="list-disc ml-5 text-black">
            <li>Users may not:</li>
            <li>
              Redistribute, sell, or otherwise exploit the content for
              commercial purposes without explicit permission from the Archive.
            </li>
            <li>
              Modify, adapt, or create derivative works based on the content
              without authorization.
            </li>
            <li>
              Use the Archive in any manner that could harm, disrupt, or impair
              the Archive or its users.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">5. User Conduct</h3>
          <p className="text-black">Users agree to:</p>
          <ul className="list-disc ml-5 text-black">
            <li>Comply with all applicable laws and regulations.</li>
            <li>Use the Archive in a respectful and lawful manner.</li>
            <li>
              Refrain from uploading or distributing any content that is
              unlawful, harmful, or offensive.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            6. Intellectual Property Rights
          </h3>

          <h5 className="text-base font-semibold mb-2">6.1 Ownership</h5>
          <p className="text-black">
            All content in the Archive is owned by or licensed to the Archive.
            The Archive and its licensors retain all rights, title, and interest
            in the content.
          </p>

          <h5 className="text-base font-semibold mb-2">6.2 License</h5>
          <p className="text-black">
            Users are granted a limited, non-exclusive, non-transferable, and
            revocable license to access and use the content as described in
            these Terms.
          </p>

          <h5 className="text-base font-semibold mb-2">
            6.3 Copyright Infringement
          </h5>
          <p className="text-black">
            If you believe that content in the Archive infringes your copyright,
            please contact us with the details of the alleged infringement, and
            we will investigate and take appropriate action.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">7. Privacy Policy</h3>
          <p className="text-black">
            Your use of the Archive is subject to our Privacy Policy, which can
            be found{" "}
            <Link to="/privacy-policy" className="text-blue-600">
              here
            </Link>
            . Please review the Privacy Policy to understand how we collect,
            use, and protect your information.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            8. Disclaimers and Limitation of Liability
          </h3>

          <h5 className="text-base font-semibold mb-2">8.1 No Warranties</h5>
          <p className="text-black">
            The Archive is provided "as is" without warranties of any kind,
            either express or implied, including, but not limited to, implied
            warranties of merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>

          <h5 className="text-base font-semibold mb-2">
            8.2 Limitation of Liability
          </h5>
          <p className="text-black">
            To the fullest extent permitted by law, the Archive shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill,
            or other intangible losses, resulting from:
          </p>
          <ul className="list-disc ml-5 text-black">
            <li>Your use of or inability to use the Archive.</li>
            <li>
              Unauthorized access to or alteration of your transmissions or
              data.
            </li>
            <li>Any other matter relating to the Archive.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">9. Changes to Terms</h3>
          <p className="text-black">
            We reserve the right to modify these Terms at any time. Changes will
            be effective immediately upon posting on our website. Your continued
            use of the Archive following the posting of revised Terms means that
            you accept and agree to the changes.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">10. Governing Law</h3>
          <p className="text-black">
            These Terms shall be governed by and construed in accordance with
            the laws of Nigeria, without regard to its conflict of law
            principles.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            11. Contact Information
          </h3>
          <p className="text-black">
            For questions or concerns about these Terms, please contact us{" "}
            <Link to="/contact-us" className="text-blue-600">
              here
            </Link>
            .
          </p>
        </section>
      </div>
    </OuterPage>
  );
};

export { TermsOfUse };
