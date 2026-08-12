import React, { useState } from 'react';
import { ViewTab } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureThreeStrip } from './components/FeatureThreeStrip';
import { OneDesignSection } from './components/OneDesignSection';
import { OneConfigSection } from './components/OneConfigSection';
import { DeepDiveSection } from './components/DeepDiveSection';
import { CtaBanner } from './components/CtaBanner';
import { BuiltForHardPartsSection } from './components/BuiltForHardPartsSection';
import { InstallStrip } from './components/InstallStrip';
import { Footer } from './components/Footer';
import { InteractivePlayground } from './components/InteractivePlayground';
import { SearchModal } from './components/SearchModal';
import { DocsSection } from './components/DocsSection';
import { SEOHead } from './components/SEOHead';
import { DOCS_DATA } from './data/docsData';
import { useLocationPath, navigateTo } from './lib/router';

export default function App() {
  const currentPath = useLocationPath();
  const [currentTab, setCurrentTab] = useState<ViewTab>(
    currentPath.startsWith('/docs') ? 'docs' : 'framework'
  );
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isDocsRoute = currentPath.startsWith('/docs');

  // Find active doc article for SEO meta tags
  const activeArticle =
    DOCS_DATA.find((doc) => doc.path === currentPath || currentPath.startsWith(doc.path)) ||
    DOCS_DATA[0];

  const handleOpenPlayground = () => setPlaygroundOpen(true);
  const handleOpenDocs = () => navigateTo('/docs/introduction');
  const handleOpenSearch = () => setSearchOpen(true);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#e2e2e2] flex flex-col font-sans selection:bg-[#E11D63] selection:text-white">
      {/* Dynamic SEO Head Management */}
      <SEOHead currentPath={currentPath} activeArticle={isDocsRoute ? activeArticle : undefined} />

      {/* Navbar */}
      <Navbar
        currentTab={isDocsRoute ? 'docs' : currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab === 'docs' || tab === 'resources') {
            navigateTo('/docs/introduction');
          } else if (tab === 'framework') {
            navigateTo('/');
          }
        }}
        onOpenSearch={handleOpenSearch}
        onOpenPlayground={handleOpenPlayground}
        onOpenDocs={handleOpenDocs}
      />

      {/* Main Content: Render DocsSection if on /docs, otherwise Homepage */}
      <main className="flex-1">
        {isDocsRoute ? (
          <DocsSection
            currentPath={currentPath}
            onOpenSearch={handleOpenSearch}
            onOpenPlayground={handleOpenPlayground}
          />
        ) : (
          <>
            <HeroSection
              onOpenPlayground={handleOpenPlayground}
              onOpenDocs={handleOpenDocs}
            />

            <FeatureThreeStrip
              onOpenDocs={handleOpenDocs}
              onOpenPlayground={handleOpenPlayground}
            />

            <OneDesignSection
              onOpenDocs={handleOpenDocs}
              onOpenPlayground={handleOpenPlayground}
            />

            <OneConfigSection
              onOpenDocs={handleOpenDocs}
              onOpenPlayground={handleOpenPlayground}
            />

            <DeepDiveSection />

            <CtaBanner onOpenPlayground={handleOpenPlayground} />

            <BuiltForHardPartsSection onOpenDocs={handleOpenDocs} />

            <InstallStrip
              onOpenPlayground={handleOpenPlayground}
              onOpenDocs={handleOpenDocs}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenDocs={handleOpenDocs}
        onOpenPlayground={handleOpenPlayground}
      />

      {/* Interactive Modals */}
      <InteractivePlayground
        isOpen={playgroundOpen}
        onClose={() => setPlaygroundOpen(false)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenDocs={handleOpenDocs}
        onOpenPlayground={handleOpenPlayground}
      />
    </div>
  );
}
