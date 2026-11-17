import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Bodoni_Moda, Amiri } from "next/font/google";
import "./globals.css";
const script = Great_Vibes({ weight:"400", subsets:["latin"], variable:"--f-script" });
const serif = Cormorant_Garamond({ weight:["400","500","600"], subsets:["latin"], variable:"--f-serif" });
const display = Bodoni_Moda({ subsets:["latin"], style:["normal","italic"], variable:"--f-display" });
const arabic = Amiri({ weight:"400", subsets:["arabic"], variable:"--f-arabic" });
export const metadata: Metadata = { title:"Ansharah & Azhar | Wedding Invitation", description:"Together with their families, Ansharah & Azhar request the pleasure of your company at their Mehndi, Baraat and Walima.", openGraph:{ title:"Ansharah & Azhar", description:"A wedding invitation." } };
export default function RootLayout({ children }:{ children: React.ReactNode }) {
  return <html lang="en" className={`${script.variable} ${serif.variable} ${display.variable} ${arabic.variable}`}><body className="font-serif text-[1.05rem]">{children}</body></html>;
}
