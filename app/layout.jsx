import { Inter, JetBrains_Mono } from 'next/font/google';
import { Layout, Navbar } from 'nextra-theme-docs';
import 'nextra-theme-docs/style.css';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import DocLogo from './components/DocLogo';
import HeaderSearch from './components/HeaderSearch';
import NavExtra from './components/NavExtra';
import './globals.css';
import './search.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap();

  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
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
          toc={{
            backToTop: 'Scroll to top',
          }}
          // footer={<DocFooter />}
          editLink={null}
          feedback={{ content: null }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
