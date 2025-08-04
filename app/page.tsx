import Hero from './components/Hero';
import MainContent from './components/MainContent';
import LazyPlatformsShowcase from './components/LazyPlatformsShowcase';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <main className="overflow-x-hidden">
        <Hero />
        <MainContent />
        <div id="platforms" className="pb-20">
          <LazyPlatformsShowcase />
        </div>
      </main>
      <Footer />
    </>
  );
}