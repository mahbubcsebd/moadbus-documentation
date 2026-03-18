import { Inter } from "next/font/google";
import { Layout, Navbar } from "nextra-theme-docs";
import "nextra-theme-docs/style.css";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import DocFooter from "./components/DocFooter";
import DocLogo from "./components/DocLogo";
import HeaderSearch from "./components/HeaderSearch";
import NavExtra from "./components/NavExtra";
import "./globals.css";
import "./search.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap();

  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={inter.variable}
    >
      <Head />
      <body className="antialiased">
        <Layout
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/your-repo"
          navbar={
            <Navbar logo={<DocLogo />}>
              <NavExtra />
            </Navbar>
          }
          search={<HeaderSearch />}
          sidebar={{
            defaultMenuCollapseLevel: 1,
            toggleButton: true,
          }}
          footer={<DocFooter />}
          editLink={null}
          feedback={{ content: null }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
