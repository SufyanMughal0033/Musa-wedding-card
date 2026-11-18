import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Bodoni_Moda, Amiri, Cinzel } from "next/font/google";
import "./globals.css";
const script = Great_Vibes({ weight:"400", subsets:["latin"], variable:"--f-script" });
const serif = Cormorant_Garamond({ weight:["400","500","600"], subsets:["latin"], variable:"--f-serif" });
const display = Bodoni_Moda({ subsets:["latin"], style:["normal","italic"], variable:"--f-display" });
const name = Cinzel({ weight:["500","600","700"], subsets:["latin"], variable:"--f-name" });
const arabic = Amiri({ weight:"400", subsets:["arabic"], variable:"--f-arabic" });
export const metadata: Metadata = { title:"ANSHARAH & AZHAR | Wedding Invitation", description:"Together with their families, ANSHARAH & AZHAR request the pleasure of your company at their Mehndi, Baraat and Walima.", openGraph:{ title:"ANSHARAH & AZHAR", description:"A wedding invitation." } };
export default function RootLayout({ children }:{ children: React.ReactNode }) {
  return <html lang="en" className={`${script.variable} ${serif.variable} ${display.variable} ${arabic.variable} ${name.variable}`}><body className="font-serif text-[1.05rem]">{children}</body></html>;
}
