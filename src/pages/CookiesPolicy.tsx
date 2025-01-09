import { Link } from "react-router-dom";
import OuterPage from "../layouts/OuterPage";

const CookiesPolicy = () => {
  return (
    <OuterPage>
      <div className="leading-10 px-20">
        <h2 className="text-2xl font-bold text-center my-6">
          GOVWATCH COOKIES POLICY
        </h2>

        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">1. Introduction</h3>
          <p className="text-black">
            Welcome to GovWatch ("we", "our", "us"). We use cookies and similar
            tracking technologies to enhance your experience on our platform,
            analyze site traffic, and serve advertisements to our free users.
            This Cookie Policy explains how we use cookies, your choices
            regarding their use, and provides details about our subscription
            service which offers an ad-free experience.
          </p>
        </section>

        {/* What are Cookies? */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">2. What are Cookies?</h3>
          <p className="text-black">
            Cookies are small text files placed on your device when you visit a
            website. They allow the website to recognize your device and store
            certain information about your preferences or past actions.
          </p>
        </section>

        {/* Types of Cookies We Use */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            3. Types of Cookies We Use
          </h3>
          <p className="text-black">
            We use the following types of cookies on our platform:
          </p>
        </section>

        {/* Essential Cookies */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">
            3.1 Essential Cookies
          </h5>
          <ul className="list-disc ml-5 text-black">
            <li>
              These cookies are necessary for the website to function properly.
              They enable core functionalities such as security, network
              management, and accessibility.
            </li>
            <li>
              Without these cookies, certain parts of our platform may not work
              as intended.
            </li>
          </ul>
        </section>

        {/* Performance Cookies */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">
            3.2 Performance Cookies
          </h5>
          <ul className="list-disc ml-5 text-black">
            <li>
              Performance cookies collect information about how users interact
              with our platform, such as which pages are visited most often.
            </li>
            <li>
              This data helps us improve the functionality and user experience
              of our platform.
            </li>
          </ul>
        </section>

        {/* Functionality Cookies */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">
            3.3 Functionality Cookies
          </h5>
          <ul className="list-disc ml-5 text-black">
            <li>
              Functionality cookies remember choices you make, such as your
              language preferences and the country you are in.
            </li>
            <li>
              They provide a more personalized experience and enhance the
              usability of our platform.
            </li>
          </ul>
        </section>

        {/* Advertising Cookies */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">
            3.4 Advertising Cookies
          </h5>
          <ul className="list-disc ml-5 text-black">
            <li>
              Advertising cookies are used to serve ads relevant to users and to
              measure the effectiveness of our advertising campaigns.
            </li>
            <li>
              These cookies track your browsing habits and help us deliver
              personalized advertisements based on your interests. Free users
              will see ads on our platform.
            </li>
          </ul>
        </section>

        {/* Subscription Cookies */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">
            3.5 Subscription Cookies
          </h5>
          <ul className="list-disc ml-5 text-black">
            <li>
              Subscription cookies help manage and verify your subscription
              status.
            </li>
            <li>
              If you are a subscribed user, these cookies ensure you enjoy an
              ad-free experience.
            </li>
          </ul>
        </section>

        {/* How We Use Cookies */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">4. How We Use Cookies</h3>
          <ul className="list-disc ml-5 text-black">
            <li>Provide and maintain our Services.</li>
            <li>Improve user experience and platform performance.</li>
            <li>Personalize content and advertisements for free users.</li>
            <li>Analyze site traffic and user behavior.</li>
            <li>
              Manage and verify subscription services for an ad-free experience.
            </li>
          </ul>
        </section>

        {/* Third-Party Cookies */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">5. Third-Party Cookies</h3>
          <p className="text-black">
            We may also use third-party cookies from trusted partners to help us
            analyze usage, measure advertising effectiveness, and provide social
            media features. These third parties may collect information about
            your online activities over time and across different websites.
          </p>
        </section>

        {/* Your Choices */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">6. Your Choices</h3>
          <p className="text-black">
            You have the right to manage your cookie preferences. You can:
          </p>
        </section>

        {/* Accept or Decline Cookies */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">
            6.1 Accept or Decline Cookies
          </h5>
          <p className="text-black">
            Most web browsers automatically accept cookies, but you can modify
            your browser settings to decline cookies if you prefer.
          </p>
        </section>

        {/* Manage Cookies */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">6.2 Manage Cookies</h5>
          <p className="text-black">
            You can manage your cookie preferences through your browser
            settings. For more information on how to control cookies, please
            visit your browser’s help pages.
          </p>
        </section>

        {/* Opt-Out of Ads */}
        <section className="mb-4">
          <h5 className="text-base font-semibold mb-2">6.3 Opt-Out of Ads</h5>
          <p className="text-black">
            If you do not want to see personalized ads, you can opt-out by
            adjusting your ad preferences. Please note that opting out does not
            remove ads entirely but will prevent the use of personalized
            advertising.
          </p>
        </section>

        {/* Subscription Service */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            7. Subscription Service
          </h3>
          <p className="text-black">
            Subscribers to our premium service will not see ads while using our
            platform. Subscription cookies ensure that the ad-free experience is
            maintained for the duration of your subscription.
          </p>
        </section>

        {/* Changes to This Cookie Policy */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            8. Changes to This Cookie Policy
          </h3>
          <p className="text-black">
            We may update this Cookie Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any significant changes by
            posting the updated policy on our website. Your continued use of our
            platform after the changes take effect constitutes your acceptance
            of the revised policy.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">9. Contact Us</h3>
          <p className="text-black">
            If you have any questions or concerns about this Cookie Policy or
            our cookie practices, please contact us at{" "}
            <span> hello@govwatch.ng </span>or{" "}
            <Link to="/contact-us" className="text-blue-600">
              here
            </Link>
          </p>
        </section>
      </div>
    </OuterPage>
  );
};

export { CookiesPolicy };
