import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Onco EMR Form",
  description: "Created by Scale Healthcare Pvt. Ltd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex scale-90 bg-[#064a73]`}
      >
        <div>
          <Image src="/aic2.jpg" width={200} height={200} alt="aic logo" />
        </div>
        {children}
        <div className="my-14 px-4 mx-2 max-w-sm space-y-5 text-base md:text-md text-white">
          <h3 className="text-lg">Instructions for New Patient Entry</h3>
          <ul className="space-y-5 ml-6 list-disc">
            <li>
              All fields are required (only enter middle name/initial if on
              insurance card).
            </li>
            <li>
              Effective date of insurance will be defaulted to the current date.
            </li>
            <li>
              If policy holder is not &quot;Self&quot; please populate the last
              three fields.
              <br />
              If it is &quot;Self&quot; these fields will be populated with the
              data above.
            </li>
            <li>Upon Submission, you will be given a member if number.</li>
            <li>
              If additional information is required to be entered, please open
              patient in Onco EMR after submission.
            </li>
          </ul>
        </div>
      </body>
    </html>
  );
}
