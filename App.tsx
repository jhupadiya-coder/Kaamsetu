import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { TrustStrip } from './components/TrustStrip.tsx';
import { CategorySection } from './components/CategorySection.tsx';
import { ExploreServices } from './components/ExploreServices.tsx';
import { FeaturedProviders } from './components/FeaturedProviders.tsx';
import { LatestOpportunities } from './components/LatestOpportunities.tsx';
import { WhyKaamSetu } from './components/WhyKaamSetu.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { Footer } from './components/Footer.tsx';
import { UserProfilePage } from './components/UserProfilePage.tsx';
import { AddServiceModal } from './components/AddServiceModal.tsx';
import {
  PostJobModal,
  ApplyModal,
  ProviderModal,
  BookServiceModal,
} from './components/Modals.tsx';
import {
  Opportunity,
  ServiceProvider,
  ServiceListing,
  UserProfile,
  INITIAL_SERVICES,
  INITIAL_USER_PROFILE,
} from './data/mockData.ts';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Navigation View: 'home' or 'profile'
  const [currentView, setCurrentView] = useState<'home' | 'profile'>('home');

  // Dynamic Data State
  const [services, setServices] = useState<ServiceListing[]>(INITIAL_SERVICES);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All India (Remote)');
  const [activeRoleTab, setActiveRoleTab] = useState<'freelancer' | 'client'>('freelancer');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Modals state
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postModalDefaultCategory, setPostModalDefaultCategory] = useState('Web Development');

  const [addServiceModalOpen, setAddServiceModalOpen] = useState(false);

  const [selectedServiceForBook, setSelectedServiceForBook] = useState<ServiceListing | null>(null);
  const [bookServiceModalOpen, setBookServiceModalOpen] = useState(false);

  const [selectedOppForApply, setSelectedOppForApply] = useState<Opportunity | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const [selectedProviderForDetail, setSelectedProviderForDetail] = useState<ServiceProvider | null>(null);
  const [providerModalOpen, setProviderModalOpen] = useState(false);

  // Toast banner for real user feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Action Handlers
  const handleNavigate = (view: 'home' | 'profile', targetSectionId?: string) => {
    setCurrentView(view);
    if (view === 'home' && targetSectionId) {
      setTimeout(() => {
        const el = document.getElementById(targetSectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFindWorkClick = () => {
    if (currentView !== 'home') setCurrentView('home');
    setActiveRoleTab('freelancer');
    setTimeout(() => {
      const el = document.getElementById('opportunities');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleHireTalentClick = () => {
    if (currentView !== 'home') setCurrentView('home');
    setActiveRoleTab('client');
    setTimeout(() => {
      const el = document.getElementById('featured-talent');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleExecuteSearch = () => {
    if (currentView !== 'home') setCurrentView('home');
    setTimeout(() => {
      if (activeRoleTab === 'freelancer') {
        const el = document.getElementById('opportunities');
        el?.scrollIntoView({ behavior: 'smooth' });
        showToast(`Showing opportunities matching "${searchQuery || 'all'}" in ${selectedCity}`);
      } else {
        const el = document.getElementById('featured-talent');
        el?.scrollIntoView({ behavior: 'smooth' });
        showToast(`Showing verified specialists matching "${searchQuery || 'all'}" in ${selectedCity}`);
      }
    }, 50);
  };

  const handleQuickSearchFocus = () => {
    if (currentView !== 'home') setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('search-section');
      el?.scrollIntoView({ behavior: 'smooth' });
      const input = el?.querySelector('input');
      input?.focus();
    }, 50);
  };

  const handleCategoryExplore = (categoryName: string) => {
    if (currentView !== 'home') setCurrentView('home');
    setSearchQuery(categoryName);
    setTimeout(() => {
      const el = document.getElementById('explore-services');
      el?.scrollIntoView({ behavior: 'smooth' });
      showToast(`Browsing services & gigs for ${categoryName}`);
    }, 50);
  };

  const handleOpenPostForCategory = (catName: string) => {
    setPostModalDefaultCategory(catName);
    setPostModalOpen(true);
  };

  const handleSelectProvider = (provider: ServiceProvider) => {
    setSelectedProviderForDetail(provider);
    setProviderModalOpen(true);
  };

  const handleApplyOpportunity = (opp: Opportunity) => {
    setSelectedOppForApply(opp);
    setApplyModalOpen(true);
  };

  const handleAddService = (newService: ServiceListing) => {
    setServices([newService, ...services]);
    showToast(`Service "${newService.title}" is now live!`);
  };

  const handleBookService = (service: ServiceListing) => {
    setSelectedServiceForBook(service);
    setBookServiceModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenPostModal={() => setPostModalOpen(true)}
        onOpenAddServiceModal={() => setAddServiceModalOpen(true)}
        onOpenSearchFocus={handleQuickSearchFocus}
        onSelectRole={(role) => setActiveRoleTab(role)}
      />

      {/* View Switching: Profile Page vs Home Page */}
      {currentView === 'profile' ? (
        <UserProfilePage
          profile={userProfile}
          onUpdateProfile={(updated) => {
            setUserProfile(updated);
            showToast('Your professional profile has been updated!');
          }}
          userServices={services.filter(
            (s) => s.providerName === userProfile.name || s.id.startsWith('srv-')
          )}
          onOpenAddServiceModal={() => setAddServiceModalOpen(true)}
          onBackToHome={() => handleNavigate('home')}
        />
      ) : (
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            activeRoleTab={activeRoleTab}
            setActiveRoleTab={setActiveRoleTab}
            onExecuteSearch={handleExecuteSearch}
            onFindWorkClick={handleFindWorkClick}
            onHireTalentClick={handleHireTalentClick}
          />

          {/* 2. Proof & Trust Strip */}
          <TrustStrip />

          {/* 3. Popular Categories Section */}
          <CategorySection
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={(id) => {
              setSelectedCategoryId(id);
              if (id) {
                const el = document.getElementById('explore-services');
                el?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onExploreGigs={handleCategoryExplore}
          />

          {/* 4. Explore Services Section (New Feature 1) */}
          <ExploreServices
            services={services}
            onOpenAddServiceModal={() => setAddServiceModalOpen(true)}
            onBookService={handleBookService}
          />

          {/* 5. Featured Service Providers Section */}
          <FeaturedProviders
            selectedCategoryId={selectedCategoryId}
            onSelectProvider={handleSelectProvider}
            onPostJobForCategory={handleOpenPostForCategory}
          />

          {/* 6. Latest Opportunities Section */}
          <LatestOpportunities
            selectedCategoryId={selectedCategoryId}
            onApplyOpportunity={handleApplyOpportunity}
            onPostNewOpportunity={() => setPostModalOpen(true)}
          />

          {/* 7. Why KaamSetu / Dual Value Engine */}
          <WhyKaamSetu onExploreGlobal={handleHireTalentClick} />

          {/* 8. How It Works Section */}
          <HowItWorks
            onGetStartedTalent={handleFindWorkClick}
            onGetStartedClient={() => setPostModalOpen(true)}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onPostRequirement={() => setPostModalOpen(true)}
        onSelectCategory={(catId) => {
          if (currentView !== 'home') setCurrentView('home');
          setSelectedCategoryId(catId);
          setTimeout(() => {
            const el = document.getElementById('explore-services');
            el?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
      />

      {/* Interactive Modals */}
      <PostJobModal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
        defaultCategory={postModalDefaultCategory}
        onSuccess={(title) => {
          showToast(`Requirement "${title}" has been successfully posted!`);
        }}
      />

      <ApplyModal
        isOpen={applyModalOpen}
        opportunity={selectedOppForApply}
        onClose={() => setApplyModalOpen(false)}
        onSuccess={(oppTitle) => {
          showToast(`Application for "${oppTitle}" sent successfully!`);
        }}
      />

      <ProviderModal
        isOpen={providerModalOpen}
        provider={selectedProviderForDetail}
        onClose={() => setProviderModalOpen(false)}
        onInitiateHire={(name) => {
          showToast(`Project inquiry sent to ${name}!`);
        }}
      />

      {/* Service Listing Creation Modal (Feature 3) */}
      <AddServiceModal
        isOpen={addServiceModalOpen}
        onClose={() => setAddServiceModalOpen(false)}
        onAddService={handleAddService}
        currentUser={{
          name: userProfile.name,
          city: userProfile.city,
          avatarBg: userProfile.avatarBg,
          initials: userProfile.initials,
        }}
      />

      {/* Service Booking Modal */}
      <BookServiceModal
        isOpen={bookServiceModalOpen}
        service={selectedServiceForBook}
        onClose={() => setBookServiceModalOpen(false)}
        onSuccess={(serviceTitle) => {
          showToast(`Order confirmed for "${serviceTitle}"!`);
        }}
      />
    </div>
  );
}
