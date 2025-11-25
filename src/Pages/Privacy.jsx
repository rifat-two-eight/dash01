import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy – YeSpend</h1>

      <p>(in accordance with EU Regulation 2016/679 – GDPR)</p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">1. Data Controller</h2>
      <p>
        The Data Controller is <strong>Center Industry</strong>, based in
        Pescara (Italy). Contact e-mail:{" "}
        <a href="mailto:info@center-industry.com" className="text-blue-600">
          info@center-industry.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        2. Types of Data Processed
      </h2>
      <ul className="list-disc ml-6">
        <li>Identification data: name, surname, e-mail, user ID.</li>
        <li>Economic data: expenses, income, notes, amounts, categories.</li>
        <li>Images/documents processed via OCR.</li>
        <li>
          Technical data: device model, OS, unique identifiers, access logs.
        </li>
        <li>Backup data (Pro users) via Google Drive OAuth.</li>
        <li>
          Payment data (Pro subscriptions) handled by Apple/Google, never by
          Center Industry.
        </li>
        <li>Anonymous analytics (e.g., Firebase).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        3. Purpose of Processing
      </h2>
      <p>Data is used for:</p>
      <ul className="list-disc ml-6">
        <li>User account management (Free/Pro).</li>
        <li>Recording and analyzing expenses and income.</li>
        <li>Generating statistics and reports.</li>
        <li>OCR receipt processing.</li>
        <li>Google Drive backup (Pro users).</li>
        <li>Price comparison and savings features.</li>
        <li>Notifications and service communication.</li>
        <li>Support requests and issue handling.</li>
        <li>Legal and security obligations.</li>
      </ul>

      <p className="mt-2 font-semibold">
        Data is never sold, transferred, or used for advertising or profiling.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        4. Legal Basis of Processing
      </h2>
      <ul className="list-disc ml-6">
        <li>User consent.</li>
        <li>Contract execution.</li>
        <li>Legal obligations.</li>
        <li>Legitimate interest (security & maintenance).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        5. Processing Methods & Security
      </h2>
      <p>
        Data is processed electronically with appropriate security measures
        against unauthorized access, loss, and disclosure. Sensitive data and
        API keys are encrypted on secure servers.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        6. Data Retention
      </h2>
      <p>
        Data is stored as long as necessary to provide services or until the
        user deletes their account. Accounts inactive for 24 months may receive
        a notification before removal.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        7. Data Sharing
      </h2>
      <p>Data may be shared only with:</p>
      <ul className="list-disc ml-6">
        <li>Technical service providers under confidentiality.</li>
        <li>Apple/Google for app distribution and payments.</li>
        <li>Authorities when required by law.</li>
      </ul>

      <p className="font-semibold mt-2">Data is never made public.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        8. International Data Transfers
      </h2>
      <p>
        Transfers outside the EU (e.g., Google Drive, AWS) comply with GDPR
        using approved safeguards such as Standard Contractual Clauses.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">9. User Rights</h2>
      <p>Users may request:</p>
      <ul className="list-disc ml-6">
        <li>access</li>
        <li>rectification</li>
        <li>deletion (“right to be forgotten”)</li>
        <li>restriction or objection</li>
        <li>portability</li>
        <li>withdrawal of consent</li>
      </ul>
      <p>
        Requests must be sent to:{" "}
        <a href="mailto:info@center-industry.com" className="text-blue-600">
          info@center-industry.com
        </a>
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">10. Minors</h2>
      <p>
        The app can be used by users aged 4+. No data is knowingly collected
        from children under 13 without verified parental consent. Parents may
        request data deletion at the contact email above.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        11. Cookies & Tracking
      </h2>
      <p>
        Only technical cookies necessary for security, sessions, and
        performance are used. No advertising or profiling cookies.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        12. Policy Updates
      </h2>
      <p>
        The policy may be updated at any time, with changes effective upon
        publication in the app or website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        13. Contact Information
      </h2>
      <p>
        <strong>Center Industry</strong> – Pescara, Italy <br />
        Email:{" "}
        <a href="mailto:info@center-industry.com" className="text-blue-600">
          info@center-industry.com
        </a>
        <br />
        Suggested subject: “Request – Privacy YeSpend”
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        14. Jurisdiction
      </h2>
      <p>The exclusive competent court is Pescara (Italy).</p>

      <p className="mt-10 text-sm text-gray-600">
        © Center Industry – Last update: 25/11/2025
      </p>
    </div>
  );
};

export default Privacy;
