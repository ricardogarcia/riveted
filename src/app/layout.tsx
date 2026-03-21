import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Bebas_Neue, Instrument_Serif } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Riveted, Inc. — AI-Powered Websites & Web App Consulting",
  description:
    "We build AI-powered websites for small businesses and partner with founders to design, build, and ship production-grade web applications.",
  keywords: [
    "AI websites",
    "web app consulting",
    "small business websites",
    "AI chatbot",
    "Intercom",
    "web development",
    "Shopify apps",
    "SaaS development",
    "Riveted",
  ],
  icons: {
    icon: "/images/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${bebasNeue.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <Script
          id="gtag"
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-Q133ZQR65D"
        />
        <Script
          id="gtag-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q133ZQR65D');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        <Script
          id="intercom"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.intercomSettings = {
                app_id: "${process.env.NEXT_PUBLIC_INTERCOM_APP_ID || ""}"
              };
              (function(){
                var w=window;var ic=w.Intercom;
                if(typeof ic==="function"){
                  ic('reattach_activator');
                  ic('update',w.intercomSettings);
                } else {
                  var d=document;var i=function(){i.c(arguments);};
                  i.q=[];i.c=function(args){i.q.push(args);};
                  w.Intercom=i;
                  var l=function(){
                    var s=d.createElement('script');
                    s.type='text/javascript';s.async=true;
                    s.src='https://widget.intercom.io/widget/${process.env.NEXT_PUBLIC_INTERCOM_APP_ID || ""}';
                    var x=d.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s,x);
                  };
                  if(document.readyState==='complete'){l();}
                  else{w.addEventListener('DOMContentLoaded',l,false);}
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
