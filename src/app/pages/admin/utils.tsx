interface EmailData {
  EMAILADDRESS: string;
}

export const fetchEmails = async (tenant: string): Promise<EmailData[]> => {
  const response = await fetch(
    `http://localhost:5000/emails?tenant=${tenant}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch emails");
  }

  return response.json();
};

export const sendEmail = async (
  email: string,
  htmlMessage: string
): Promise<void> => {
  const response = await fetch("http://localhost:5000/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailaddress: email,
      status: "SENDING",
      emailtemplate: htmlMessage,
      transactiontype: "EMAIL",
      transaction: "BULK",
      recipient: email,
    }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to send email");
  }
};
