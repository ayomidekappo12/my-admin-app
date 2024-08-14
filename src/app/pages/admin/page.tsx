"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import SecondaryButton from "@/components/SecondaryButton";
import PrimaryTextArea from "@/components/PrimaryTextArea";
import UserDetailsSkeleton from "@/components/AdminSkeleton";
import { fetchEmails, sendEmail } from "./utils";

interface EmailData {
  EMAILADDRESS: string;
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

export default function AdminPage() {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [selectedEmails, setSelectedEmails] = useState("");
  const [htmlMessage, setHtmlMessage] = useState("");
  const [tenant, setTenant] = useState("gridiron");
  const [loading, setLoading] = useState(true);
  const [showEmails, setShowEmails] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmailData = async () => {
      setLoading(true);
      try {
        const data = await fetchEmails(tenant);
        setEmails(data);
        setLoading(false);
        setTimeout(() => {
          setShowEmails(true);
        }, 2000);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error fetching emails",
          description: error.message,
        });
        setLoading(false);
      }
    };

    fetchEmailData();
  }, [tenant, toast]);

  const handleIndividualSubmit = (email: string) => {
    setSelectedEmails(email);
  };

  const handleAllSubmit = () => {
    const allEmails = emails.map((email) => email.EMAILADDRESS).join(", ");
    setSelectedEmails(allEmails);
  };

  const handleSubmit = async () => {
    const emailList = selectedEmails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);

    if (emailList.length > 20 || emailList.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          emailList.length === 0
            ? "No email addresses provided."
            : "You can send emails to a maximum of 20 addresses at a time.",
      });
      return;
    }

    const invalidEmails = emailList.filter((email) => !isValidEmail(email));

    if (invalidEmails.length > 0) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: `Invalid email(s): ${invalidEmails.join(", ")}`,
      });
      return;
    }

    try {
      await Promise.all(
        emailList.map((email) => sendEmail(email, htmlMessage))
      );
      toast({
        title: "Success",
        description: "Emails sent successfully!",
      });
    } catch (error: any) {
      console.error("Error sending emails:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send some or all emails.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white min-h-screen justify-center p-10 pb-32">
        <h5 className="flex text-sm lg:text-2xl text-black font-semibold mt-2 mb-5">
          Admin Panel
        </h5>
        <div>
          <label className="relative block" htmlFor="searchInput">
            <p className="mb-2 text-[#979797]">
              Email Address(es) (comma-separated):
            </p>
            <Input
              type="text"
              value={selectedEmails}
              onChange={(e) => setSelectedEmails(e.target.value)}
              placeholder="Enter email addresses"
              className="h-10 rounded-[8px] focus:outline-none block text-sm md:text-base placeholder:text-[#979797]"
            />
          </label>

          <label className="relative block mt-6" htmlFor="htmlMessage">
            <PrimaryTextArea
              id="htmlMessage"
              placeholder="Enter HTML content here.."
              className="w-full mt-4"
              title="HTML Message:"
              onChange={(value: string) => setHtmlMessage(value)}
              defaultValue={htmlMessage}
            />
          </label>

          <div className="flex gap-4">
            <SecondaryButton
              type="button"
              text="Submit"
              className="flex w-fit mt-4 mb-6 bg-primary font-medium hover:bg-primary-darker text-bgWhite"
              action={handleSubmit}
            />
          </div>
        </div>

        <h3 className="flex text-lg font-semibold my-4 text-[#979797]">
          Available Email Addresses:
        </h3>
        {loading || !showEmails ? (
          <UserDetailsSkeleton className="mt-5" />
        ) : (
          <div className="flex flex-col gap-4 my-2 pt-3 text-xl font-bold">
            <ul className="flex flex-col bg-white rounded w-full px-8 pt-6 pb-8 border border-gray-100">
              {emails.map(({ EMAILADDRESS }) => (
                <li
                  key={EMAILADDRESS}
                  className="flex justify-between py-2 items-center"
                >
                  <span>{EMAILADDRESS}</span>
                  <SecondaryButton
                    type="button"
                    text="Submit"
                    className="bg-primary font-medium hover:bg-primary-darker text-bgWhite"
                    action={() => handleIndividualSubmit(EMAILADDRESS)}
                  />
                </li>
              ))}
            </ul>
            <SecondaryButton
              type="button"
              text="Submit All Emails"
              className="flex w-fit mt-4 mb-6 bg-primary font-medium hover:bg-primary-darker text-bgWhite"
              action={handleAllSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
}
