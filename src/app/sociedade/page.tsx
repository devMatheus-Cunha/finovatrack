// src/app/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- DEFINIÇÃO DE TIPO ---
export interface Product {
  id: number;
  title: string;
  image: string;
  price_from: string;
  price: string;
  link: string;
  coupon?: string | null;
  seller: string;
}

// --- ÍCONES ---
const TagIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
);
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
const TicketIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2M3 15v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2M10 12h4"></path><path d="M10 5v14"></path></svg>
);
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
);
const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
);
const StorefrontIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 21h16M8 21V11h8v10M4 7h16M8 7V3h8v4m-4 4h0"></path></svg>
);
const ShoppingCartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
);
const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="15 18 9 12 15 6"></polyline></svg>
);
const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg>
);
const SaleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <line x1="19" y1="5" x2="5" y2="19"></line>
        <circle cx="6.5" cy="6.5" r="2.5"></circle>
        <circle cx="17.5" cy="17.5" r="2.5"></circle>
    </svg>
);
const SmartphoneIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
const LaptopIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.29 2.58A2 2 0 0 1 19.7 21H4.3a2 2 0 0 1-1.6-2.42L4 16"></path></svg>;
const TvIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>;
const ShirtIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>;
const HomeDecorIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"></path><path d="M9 22V12h6v10M2 8.5l10-6 10 6"></path></svg>;
const SparkleIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L9.1 8.5 2 10l6.2 5.9L6.4 22 12 18l5.6 4-1.8-6.1L22 10l-7.1-1.5z"></path></svg>;
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M22 2 11 13H2l2.65-9.36L22 2zm0 0-7 18-3.5-7-7-3.5L22 2z"></path></svg>;


// --- HEADER COMPONENT ---
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: 'Início', href: '/', icon: HomeIcon },
    { name: 'Cupons', href: '/cupons', icon: TicketIcon },
    { name: 'Grupos', href: '/grupos', icon: UsersIcon },
    { name: 'Sobre Nós', href: '/sobre', icon: InfoIcon },
  ];
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="bg-amber-400 text-center py-2 px-4 text-sm font-semibold text-gray-800">
        🔥 As melhores ofertas da semana estão aqui! 🔥
      </div>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="flex items-center gap-2 text-2xl font-extrabold text-gray-800 transition-transform transform hover:scale-105">
            <TagIcon className="w-7 h-7 text-amber-500"/>
            <span>Achado<span className="text-amber-500">Certo</span></span>
          </a>
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-amber-100 transition-all duration-300 font-medium">
                <link.icon className="w-5 h-5 text-amber-500" />
                <span>{link.name}</span>
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-amber-500 focus:outline-none transition-colors">
              {isMenuOpen ? <CloseIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>
      {/* Menu Mobile com Animação */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-white border-t border-gray-100">
            <nav className="flex flex-col items-start space-y-2 p-4">
                {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-amber-100 transition-all duration-300 font-medium text-lg" onClick={() => setIsMenuOpen(false)}>
                    <link.icon className="w-6 h-6 text-amber-500" />
                    <span>{link.name}</span>
                </a>
                ))}
            </nav>
        </div>
      </div>
    </header>
  );
}


// --- FEATURED SLIDER COMPONENT ---
function FeaturedSlider({ products = [] }: { products?: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasProducts = Array.isArray(products) && products.length > 0;

  const goToPrevious = () => {
    if (!hasProducts) return;
    const newIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    if (!hasProducts) return;
    const newIndex = currentIndex === products.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (!hasProducts) return;
    const timer = setTimeout(goToNext, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, hasProducts]);

  if (!hasProducts) return null;

  return (
    <div className="relative w-full mb-12 group">
      <div className="relative h-72 md:h-64 w-full overflow-hidden rounded-2xl shadow-2xl bg-gray-900">
        <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {products.map((product) => (
            <div key={product.id} className="relative w-full flex-shrink-0 h-full grid grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left p-6 sm:p-8 text-white z-10">
                <p className="text-sm text-amber-300 mb-2 font-semibold">Oferta em Destaque</p>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 line-clamp-3">{product.title}</h2>
                <div className="flex items-baseline gap-3 mb-5">
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">{product.price}</p>
                  <p className="text-sm sm:text-md line-through opacity-60">{product.price_from}</p>
                </div>
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="self-center md:self-start bg-amber-400 text-gray-900 font-bold py-2 px-5 rounded-lg hover:bg-amber-300 transition-colors text-sm">
                  Eu Quero!
                </a>
              </div>
              <div className="hidden md:flex relative items-center justify-center">
                 <SaleIcon className="w-28 h-28 text-amber-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={goToPrevious} className="absolute top-1/2 left-3 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-1 md:p-2 transition-all opacity-0 group-hover:opacity-100"><ChevronLeftIcon className="w-6 h-6 text-white" /></button>
      <button onClick={goToNext} className="absolute top-1/2 right-3 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-1 md:p-2 transition-all opacity-0 group-hover:opacity-100"><ChevronRightIcon className="w-6 h-6 text-white" /></button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {products.map((_, index) => (<button key={index} onClick={() => setCurrentIndex(index)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-amber-400 w-6' : 'bg-white/50 hover:bg-white/80'}`}></button>))}
      </div>
    </div>
  );
}


// --- CATEGORY NAVIGATION COMPONENT ---
function CategoryNavigation() {
    const categories = [
        { name: 'Celulares', href: '/categorias/celulares', icon: SmartphoneIcon },
        { name: 'Notebooks', href: '/categorias/notebooks', icon: LaptopIcon },
        { name: 'TVs e Vídeo', href: '/categorias/tvs', icon: TvIcon },
        { name: 'Moda', href: '/categorias/moda', icon: ShirtIcon },
        { name: 'Casa', href: '/categorias/casa', icon: HomeDecorIcon },
        { name: 'Beleza', href: '/categorias/beleza', icon: SparkleIcon },
    ];

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Navegue por Categorias</h2>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {categories.map((category) => (
                    <a key={category.name} href={category.href} className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-3">
                            <category.icon className="w-8 h-8 text-amber-500" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 text-center">{category.name}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}


// --- PRODUCT CARD COMPONENT ---
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col overflow-hidden">
      <div className="relative w-full" style={{paddingBottom: '100%'}}>
        <img src={product.image} alt={product.title} className="absolute top-0 left-0 w-full h-full object-contain p-4" loading="lazy" />
        {product.coupon && (<div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">CUPOM</div>)}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-gray-700 font-semibold text-sm flex-grow mb-4" style={{ minHeight: '3rem' }}>{product.title}</h2>
        <div className="text-right mb-4"><p className="text-gray-400 line-through text-xs">{product.price_from}</p><p className="text-gray-800 text-2xl font-extrabold">{product.price}</p></div>
        {product.coupon && (<div className="text-center bg-amber-100 border-2 border-dashed border-amber-400 text-amber-600 font-bold py-1 px-2 rounded-lg mb-4">Use o cupom: {product.coupon}</div>)}
        <a href={product.link} target="_blank" rel="noopener noreferrer" className="mt-auto w-full flex items-center justify-center gap-2 text-center bg-amber-400 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-amber-500 transition-colors"><ShoppingCartIcon className="w-5 h-5"/><span>Pegar Oferta</span></a>
        <p className="text-center text-gray-400 text-xs mt-3">Vendido por <span className="font-semibold">{product.seller}</span></p>
      </div>
    </div>
  )
}

// --- STORE SECTION COMPONENT ---
function StoreSection({ title, products }: { title: string, products: Product[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    
    if (!products || products.length === 0) return null;

    const showNavigation = products.length > 4;

    return (
        <section className="mb-12">
            <div className="flex justify-between items-center mb-4">
                <h2 className="flex items-center gap-3 text-2xl font-extrabold text-gray-800">
                    <StorefrontIcon className="w-8 h-8 text-amber-500" />
                    <span>{title}</span>
                </h2>
                {showNavigation && (
                    <div className="hidden md:flex gap-2">
                        <button onClick={() => scroll('left')} className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"><ChevronLeftIcon className="w-6 h-6" /></button>
                        <button onClick={() => scroll('right')} className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"><ChevronRightIcon className="w-6 h-6" /></button>
                    </div>
                )}
            </div>
            <div className="relative">
                <div ref={scrollRef} className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
                    {products.map(product => (
                        <div key={product.id} className="flex-shrink-0 w-4/5 sm:w-2/5 md:w-1/3 lg:w-[calc(25%-0.75rem)]" style={{ scrollSnapAlign: 'start' }}>
                           <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


// --- FOOTER COMPONENT ---
function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex items-center gap-2 text-2xl font-extrabold">
                            <TagIcon className="w-7 h-7 text-amber-400"/>
                            <span>Achado<span className="text-amber-400">Certo</span></span>
                        </a>
                        <p className="mt-4 text-gray-400 text-sm">As melhores ofertas e cupons da internet, selecionados para você.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Navegação</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/cupons" className="hover:text-amber-400 transition-colors">Cupons</a></li>
                            <li><a href="/categorias" className="hover:text-amber-400 transition-colors">Categorias</a></li>
                            <li><a href="/lojas" className="hover:text-amber-400 transition-colors">Lojas</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Legal</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/termos-de-uso" className="hover:text-amber-400 transition-colors">Termos de Uso</a></li>
                            <li><a href="/politica-de-privacidade" className="hover:text-amber-400 transition-colors">Política de Privacidade</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Siga-nos</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors"><InstagramIcon className="w-6 h-6" /></a>
                            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors"><TelegramIcon className="w-6 h-6" /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8">
                    <p className="text-sm text-gray-500 text-center">
                        © {new Date().getFullYear()} Achado Certo. Todos os direitos reservados.
                    </p>
                    <p className="text-xs text-gray-600 text-center mt-4 max-w-3xl mx-auto">
                        Aviso de Afiliado: O Achado Certo pode receber comissões por compras realizadas através dos nossos links. Isso não gera custos adicionais para você e ajuda-nos a manter o site. Os preços e a disponibilidade dos produtos são precisos na data e hora da publicação e estão sujeitos a alterações.
                    </p>
                </div>
            </div>
        </footer>
    );
}


// --- LAYOUT COMPONENT ---
function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <Header />
            <main className="flex-grow container mx-auto p-4">
                {children}
            </main>
            <Footer />
        </div>
    )
}


// --- PAGE COMPONENT ---
export default function Home() {
  const [productsByStore, setProductsByStore] = useState<Record<string, Product[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockProducts: Product[] = [
        // Amazon
        { id: 25079518, title: "Lysoform Original, Desinfetante Líquido, 4 Unidades de 1L", image: "https://m.media-amazon.com/images/I/41tkF1Xpy+L._SL500_.jpg", price_from: "R$ 54,99", price: "R$ 35,00", link: "#", seller: "Amazon" },
        { id: 25139150, title: "Fritadeira Airfryer Série 3000, Philips Walita, 6.2L", image: "https://m.media-amazon.com/images/I/31CmZZDqXWL._SL500_.jpg", price_from: "R$ 509,90", price: "R$ 328,94", link: "#", coupon: "10CASA", seller: "Amazon" },
        { id: 25175421, title: "Vichy Shampoo Estimulante Antiqueda Energy+ Dercos 400g", image: "https://m.media-amazon.com/images/I/31PPXVQKESL._SL500_.jpg", price_from: "R$ 129,84", price: "R$ 79,00", link: "#", coupon: "FINALPRIME20", seller: "Amazon" },
        { id: 25121474, title: "Wella Professionals Nutri Enrich Shampoo 1000 ml", image: "https://m.media-amazon.com/images/I/31z6oFoGuoL._SL500_.jpg", price_from: "R$ 140,90", price: "R$ 118,65", link: "#", seller: "Amazon" },
        { id: 25139481, title: "WOLFF - Garrafa Térmica de Aço Inox Parede Dupla Ice 500ml", image: "https://m.media-amazon.com/images/I/21BXztKTpRL._SL500_.jpg", price_from: "R$ 59,00", price: "R$ 50,15", link: "#", seller: "Amazon" },
        // Magazine Luiza
        { id: 30000001, title: "Smart TV 50\" UHD 4K Samsung 50CU7700", image: "https://m.media-amazon.com/images/I/71f-d242eEL._AC_SL1500_.jpg", price_from: "R$ 2.499,00", price: "R$ 2.180,00", link: "#", seller: "Magazine Luiza" },
        { id: 30000002, title: "iPhone 14 Apple 128GB Meia-noite", image: "https://m.media-amazon.com/images/I/61cMQeXl65L._AC_SL1500_.jpg", price_from: "R$ 5.999,00", price: "R$ 4.899,00", link: "#", coupon: "IPHONE10", seller: "Magazine Luiza" },
        { id: 30000003, title: "Geladeira/Refrigerador Brastemp Frost Free Duplex 375L", image: "https://m.media-amazon.com/images/I/51X2i2q22JL._AC_SL1000_.jpg", price_from: "R$ 3.199,00", price: "R$ 2.899,00", link: "#", seller: "Magazine Luiza" },
        // Americanas
        { id: 40000001, title: "Notebook Lenovo IdeaPad 3i Intel Core i5", image: "https://m.media-amazon.com/images/I/61q-83VdkGL._AC_SL1500_.jpg", price_from: "R$ 3.500,00", price: "R$ 3.150,00", link: "#", seller: "Americanas" },
        { id: 40000002, title: "Cadeira Gamer Profissional TGC12 Preta ThunderX3", image: "https://m.media-amazon.com/images/I/616P2-YI60L._AC_SL1000_.jpg", price_from: "R$ 1.200,00", price: "R$ 999,90", link: "#", seller: "Americanas" },
    ];
    
    const groupedProducts = mockProducts.reduce((acc, product) => {
        const store = product.seller;
        if (!acc[store]) {
            acc[store] = [];
        }
        acc[store].push(product);
        return acc;
    }, {} as Record<string, Product[]>);

    const timer = setTimeout(() => {
        setProductsByStore(groupedProducts);
        setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
        <Layout>
            <div className="text-center p-10">Carregando ofertas...</div>
        </Layout>
    );
  }

  const featuredProducts = Object.values(productsByStore).flat().slice(0, 3);
  const storeOrder = ["Amazon", "Magazine Luiza", "Americanas"];

  return (
    <Layout>
      <FeaturedSlider products={featuredProducts} />
      
      <CategoryNavigation />

      <div className="space-y-12">
        {storeOrder.map(storeName => (
            productsByStore[storeName] && (
                <StoreSection 
                    key={storeName}
                    title={`Ofertas ${storeName}`} 
                    products={productsByStore[storeName]} 
                />
            )
        ))}
      </div>
    </Layout>
  );
}
