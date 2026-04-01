import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import { IconMapPinFilled, IconClock, IconScissors, IconPhone, IconStar } from '@tabler/icons-react';

export default function Welcome({ auth, services, barbers }) {
    
    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    // The user's uploaded images for the masonry layout
    const galleryItems = [
        "/images/25 Haircut for Curly Hair Men_ Tips & Maintenance Guide.jpg",
        "/images/A photograph of a man with a trendy 2025 men's haircut, featuring a textured top and faded sides.jpg",
        "/images/Gentleman & Rogues Club Barbershop - Tim Collins.jpg",
        "/images/Hilarious pictures show people having a VERY bad hair day.jpg",
        "/images/Hk.jpg",
        "/images/Homem num salão de barbearia a cortar o cabelo e a barba _ Foto Grátis.jpg",
        "/images/Male Hairstyles_ Wavy Curtain Haircut for Effortless Charm.jpg",
        "/images/Man to Man a X_ _All Trending Mens Hairstyles https___t_co_c42onrBsQw_ _ X.jpg",
        "/images/Post by @seristy · 1 image.jpg",
        "/images/The Sophisticated Look_ 18 Cutting-Edge Asian Hairstyles for the Modern Man in 2025.jpg",
        "/images/anak punk.jpg",
        "/images/bannerbarber.jpg",
        "/images/download (10).jpg",
        "/images/download (11).jpg",
        "/images/download (12).jpg",
        "/images/download (13).jpg",
        "/images/download (14).jpg",
        "/images/download (15).jpg",
        "/images/download (16).jpg",
        "/images/download (17).jpg",
        "/images/download (18).jpg",
        "/images/download (8).jpg",
        "/images/download (9).jpg",
        "/images/men's hairstyles.jpg",
        "/images/nak meme.jpg",
        "/images/ruorouuorur.jpg"
    ];

    return (
        <PublicLayout auth={auth}>
            <Head title="Premium Barbershop" />

            {/* Background Decoration Nodes (Lively/Rame feeling) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <motion.div 
                    animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }} 
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} 
                    className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"
                ></motion.div>
                <motion.div 
                    animate={{ y: [0, 40, 0], x: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }} 
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} 
                    className="absolute top-2/4 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px]"
                ></motion.div>
                <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} 
                    transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }} 
                    className="absolute -bottom-10 left-1/3 w-80 h-80 bg-zinc-800/50 dark:bg-zinc-800/80 rounded-full blur-[80px]"
                ></motion.div>
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden z-10 pt-20">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80" alt="Barbershop Header" className="w-full h-full object-cover scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/70 to-zinc-950/95 dark:to-zinc-950"></div>
                </div>
                
                <div className="container mx-auto px-6 z-10 text-center relative mt-16 mb-20">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 font-bold text-xs uppercase tracking-widest mb-8 backdrop-blur-sm">
                            <IconStar size={14} className="fill-amber-500" /> Rated #1 in Kudus
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.9]">
                            Stay <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 [text-shadow:0_10px_30px_rgba(245,158,11,0.3)]">Sharp</span><br/>Rule the day.
                        </h1>
                        <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
                            Experience grooming excellence. Precision cuts, hot towel shaves, and an atmosphere tailored for gentlemen.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="relative group perspective-1000">
                                <Link href={auth && auth.user ? route('dashboard') : route('login')} className="relative block bg-gradient-to-br from-amber-400 to-amber-600 text-black px-12 py-5 rounded-full text-xl font-black uppercase tracking-widest transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-105 shadow-[0_0_40px_-5px_rgba(245,158,11,0.6)]">
                                    Book Now
                                </Link>
                                <div className="absolute -inset-1 bg-amber-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-300 -z-10"></div>
                            </div>
                            <a href="#services" className="border-2 border-white/20 hover:border-amber-500 text-white px-10 py-5 rounded-full text-lg font-bold uppercase tracking-widest transition-all hover:bg-amber-500/10 backdrop-blur-md">
                                View Services
                            </a>
                        </div>
                    </motion.div>

                    {/* Floating Hero Stats */}
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        {['Master Barbers', 'Premium Services', 'Satisfied Clients', 'Years Experience'].map((stat, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl md:-skew-x-12 hover:-translate-y-2 transition-transform duration-300">
                                <h3 className="text-4xl font-black text-amber-500 md:skew-x-12">{[5, 12, '10k+', 5][i]}</h3>
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-2 md:skew-x-12">{stat}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-white dark:bg-zinc-950 relative z-10 border-b border-gray-100 dark:border-zinc-900">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">The CukorBro <span className="text-amber-500">Difference</span></h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                Founded with a passion for traditional barbering infused with modern techniques, CukorBro is more than a haircut—it's an experience. 
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Our master barbers are dedicated to craft, specializing in everything from classic pompadours to modern skin fades. Step into our lounge, enjoy a complimentary beverage, and leave looking your absolute best.
                            </p>
                            <div className="grid grid-cols-2 gap-8 border-t border-gray-200 dark:border-zinc-800 pt-8">
                                <div>
                                    <h4 className="text-4xl font-black text-amber-500 mb-2">10+</h4>
                                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Years Experience</p>
                                </div>
                                <div>
                                    <h4 className="text-4xl font-black text-amber-500 mb-2">5K+</h4>
                                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Happy Clients</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:w-1/2 relative">
                            <div className="absolute inset-0 bg-amber-500 rounded-3xl transform translate-x-4 translate-y-4"></div>
                            <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" alt="Barber Working" className="relative z-10 rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section (Card Layout) */}
            <section id="services" className="py-32 bg-zinc-950 text-white relative z-10 overflow-hidden">
                {/* Decorative background Elements (Glowing gradient matching CTA) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 via-zinc-950 to-zinc-950"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px]"></div>
                
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-6 mt-4">Our <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-amber-600">Services</span></h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto">Premium grooming tailored to your style. Select your service.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div 
                                key={service.id} 
                                initial={{ opacity: 0, y: 30 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true, margin: "-50px" }} 
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden"
                            >
                                {/* Hover Glow */}
                                <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500 to-transparent opacity-0 group-hover:opacity-20 rounded-3xl blur transition duration-500"></div>
                                
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <IconScissors size={28} stroke={1.5} />
                                    </div>
                                    <h3 className="text-3xl font-black dark:text-white mb-3 group-hover:text-amber-500 transition-colors">{service.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-8 min-h-[60px] line-clamp-3">{service.description}</p>
                                    
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-zinc-800">
                                        <div className="font-light text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                            <IconClock size={16} /> {service.duration} mins
                                        </div>
                                        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
                                            Rp {service.price.toLocaleString('id-ID')}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dynamic Asymmetrical Gallery (Masonry style) */}
            <section id="gallery" className="py-32 bg-white dark:bg-zinc-950 relative z-10 border-t border-b border-gray-100 dark:border-zinc-900">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-6">Style <span className="text-amber-500">Gallerys</span></h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto">Explore our portfolio. Every cut is a masterpiece crafted with precision.</p>
                    </motion.div>

                    {/* CSS Columns Masonry */}
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {galleryItems.map((imgUrl, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "50px" }}
                                transition={{ duration: 0.5, delay: (idx % 5) * 0.1 }}
                                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
                            >
                                <img 
                                    src={imgUrl} 
                                    loading="lazy"
                                    alt={`Gallery Item ${idx}`} 
                                    className="w-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                    <div className="p-4 w-full text-center">
                                        <div className="inline-block p-2 bg-amber-500 rounded-full translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-black delay-100">
                                            <IconScissors size={20} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Masters (Team) */}
            <section id="team" className="py-32 bg-zinc-50 dark:bg-zinc-900 relative z-10">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-6">The <span className="text-amber-500">Masters</span></h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto">Meet the artists behind the chairs. Your style is in their hands.</p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-10">
                        {barbers.map((barber, index) => (
                            <motion.div 
                                key={barber.id} 
                                initial={{ opacity: 0, y: 50 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true }} 
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="group relative w-full md:w-[350px] overflow-hidden rounded-[2.5rem] shadow-2xl"
                            >
                                <img src={barber.photo_url || '/images/Hk.jpg'} alt={barber.name} className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110 filter saturate-50 group-hover:saturate-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
                                
                                <div className="absolute bottom-0 left-0 w-full p-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-4xl font-black text-white mb-2">{barber.name}</h3>
                                    <div className="w-12 h-1 bg-amber-500 mb-4 rounded-full group-hover:w-24 transition-all duration-500"></div>
                                    <p className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-6">{barber.specialization}</p>
                                    <Link href={auth && auth.user ? route('dashboard') : route('login')} className="inline-block bg-white/10 hover:bg-amber-500 hover:text-black border border-white/20 text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest backdrop-blur-md transition-all">
                                        Book {barber.name.split(' ')[0]}
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location & Map Section */}
            <section id="location" className="py-32 bg-white dark:bg-zinc-950 relative z-10 border-t border-gray-100 dark:border-zinc-900">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-amber-500 font-bold uppercase tracking-widest mb-6">
                                <IconMapPinFilled size={18} /> Visit Us
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-8">Locate Our <span className="text-amber-500">Lounge</span></h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 font-light mb-10 leading-relaxed">
                                Strategically situated at the heart of the city. Drop by for a premium haircut, a hot towel shave, or just to enjoy the masculine ambiance.
                            </p>
                            
                            <div className="space-y-8 bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-full flex items-center justify-center shrink-0">
                                        <IconMapPinFilled size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold dark:text-white mb-1">Address</h4>
                                        <p className="text-gray-500 dark:text-gray-400">Alun-Alun Simpang 7 Kudus<br/>Central Java, Indonesia</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-full flex items-center justify-center shrink-0">
                                        <IconClock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold dark:text-white mb-1">Opening Hours</h4>
                                        <p className="text-gray-500 dark:text-gray-400">Monday - Sunday<br/>09:00 AM - 21:00 PM</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-full flex items-center justify-center shrink-0">
                                        <IconPhone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold dark:text-white mb-1">Contact</h4>
                                        <p className="text-gray-500 dark:text-gray-400">+62 812-3456-7890<br/>hello@cukorbro.com</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-full min-h-[500px] w-full bg-zinc-200 dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15844.755495811796!2d110.8309192!3d-6.814399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70c4cb03e226d9%3A0x6b7b1349a5b48e02!2sAlun-alun%20Simpang%207%20Kudus!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0, minHeight: '500px' }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="filter dark:invert-[90%] dark:hue-rotate-180 dark:contrast-100 transition-all duration-500"
                            ></iframe>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 bg-zinc-950 text-white relative overflow-hidden z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 via-zinc-950 to-zinc-950"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px]"></div>
                
                <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <IconScissors size={64} className="mx-auto text-amber-500 mb-8 opacity-50" stroke={1} />
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-8">Don't settle for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Average</span></h2>
                        <p className="text-2xl text-gray-400 font-light mb-12 max-w-2xl mx-auto">It’s more than a haircut. It’s a statement. Book your appointment now and elevate your grooming game.</p>
                        
                        <Link href={auth && auth.user ? route('dashboard') : route('login')} className="group relative inline-flex items-center justify-center perspective-1000">
                            <span className="absolute inset-0 bg-amber-500 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-16 py-6 rounded-full text-2xl font-black uppercase tracking-widest transition-transform duration-300 transform group-hover:-translate-y-1">
                                Secure Your Slot
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </section>

        </PublicLayout>
    );
}
