import * as React from "react";

interface EmailTemplateProps {
    firstName: string;
    email: string
    password: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName, email, password
}) => (
  <div>
        <h1>Hello, {firstName}!</h1>
        <p>Find the attached username and password for access to the report site<br />
           {email} {password}
        </p>
        
  </div>
);
