'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
	HeartIcon,
	PartyPopperIcon,
	CalendarIcon,
	FacebookIcon,
	InstagramIcon,
	MenuIcon,
	XIcon,
	MapPinIcon,
	PhoneIcon,
	MailIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ImageData {
	src: string;
	alt: string;
}

const FullScreenImage = ({
	image,
	onClose,
}: {
	image: ImageData;
	onClose: () => void;
}) => (
	<div className='fixed inset-0 bg-black z-50 flex items-center justify-center'>
		<button
			onClick={onClose}
			className='absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none'
			aria-label='Close full screen image'
		>
			<XIcon className='h-8 w-8' />
		</button>
		<Image
			src={image.src}
			alt={image.alt}
			width={800}
			height={600}
			className='max-h-full max-w-full object-contain'
		/>
	</div>
);

export default function CakeBakerLanding() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [fullScreenImage, setFullScreenImage] = useState<ImageData | null>(
		null
	);
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	useEffect(() => {
		setIsLoaded(true);
		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1,
		};

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-fadeIn');
				}
			});
		};

		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions
		);

		document.querySelectorAll('.fade-in').forEach((element) => {
			observer.observe(element);
		});

		const handleScroll = () => {
			const currentScrollPos = window.pageYOffset;
			setVisible(
				(prevScrollPos > currentScrollPos && currentScrollPos > 0) ||
					currentScrollPos < 10
			);
			setPrevScrollPos(currentScrollPos);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', handleScroll);
		};
	}, [prevScrollPos]);

	const NavLinks = () => (
		<>
			<Link
				className='text-md font-medium hover:underline underline-offset-4 text-[#FFD700]'
				href='#services'
			>
				Services
			</Link>
			<Link
				className='text-md font-medium hover:underline underline-offset-4 text-[#FFD700]'
				href='#gallery'
			>
				Gallery
			</Link>
			<Link
				className='text-md font-medium hover:underline underline-offset-4 text-[#FFD700]'
				href='#contact'
			>
				Contact
			</Link>
		</>
	);

	const galleryImages: ImageData[] = [
		{
			src: '/images/birthday-cake.jpg?height=300px&width=300',
			alt: 'Birthday Cake',
		},
		{
			src: '/images/wedding-cake.jpg?height=400&width=300',
			alt: 'Wedding Cake',
		},
		{ src: '/images/biscuits.jpg?height=300&width=300', alt: 'Biscuits' },
		{ src: '/images/cupcakes.jpg?height=300&width=300', alt: 'Cupcakes' },
		{ src: '/images/themed-cake.jpg?height=300&width=300', alt: 'Themed Cake' },
		{ src: '/images/scones.jpg?height=300&width=300', alt: 'Scones' },
		{
			src: '/images/slices.jpg?height=300&width=300',
			alt: 'Cake Slices: 3 for R100',
		},
		{ src: '/images/more.jpg?height=300&width=300', alt: 'And More' },
	];

	return (
		<div
			className={`flex flex-col min-h-screen transition-opacity duration-1000 ease-in-out ${
				isLoaded ? 'opacity-100' : 'opacity-0'
			} bg-[#FFF5E6]`}
		>
			{fullScreenImage && (
				<FullScreenImage
					image={fullScreenImage}
					onClose={() => setFullScreenImage(null)}
				/>
			)}
			<header
				className={`fixed w-full transition-transform duration-300 ease-in-out z-50 ${
					visible ? 'translate-y-0' : '-translate-y-full'
				}`}
			>
				<div className='px-4 lg:px-6 h-20 flex items-center bg-[#8B4513]'>
					<Link className='flex items-center justify-center' href='#'>
						<Image
							src='/images/logo.jpg'
							alt="Amazin' Glazin' Cakes Logo"
							width={60}
							height={60}
							className='rounded-full'
						/>
						<span className='font-bold text-[#FFD700] ml-2 text-xl'>
							Amazin&apos; Glazin&apos; Cakes
						</span>
					</Link>
					<nav className='ml-auto hidden md:flex gap-4 sm:gap-6'>
						<NavLinks />
					</nav>
					<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
						<SheetTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='md:hidden ml-auto'
								onClick={toggleMenu}
							>
								<MenuIcon className='h-6 w-6 text-[#FFD700]' />
								<span className='sr-only'>Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='right' className='bg-[#8B4513]'>
							<nav className='flex flex-col gap-4'>
								<NavLinks />
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</header>

			<main className='flex-1 pt-20'>
				<section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#FFA500]'>
					<div className='container px-4 md:px-6 max-w-6xl mx-auto'>
						<div className='flex flex-col items-center space-y-4 text-center'>
							<div className='space-y-2'>
								<h1 className='fade-in text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#8B4513]'>
									Delicious Cakes for Your Special Moments
								</h1>
								<p className='fade-in mx-auto max-w-[700px] text-[#8B4513] md:text-xl'>
									Handcrafted cakes for birthdays, weddings, and events. Made
									with love and the finest ingredients.
								</p>
							</div>
							<div className='fade-in'>
								<Button
									className='bg-[#8B4513] text-[#FFD700] hover:bg-[#A0522D]'
									onClick={() =>
										document
											.getElementById('contact')
											?.scrollIntoView({ behavior: 'smooth' })
									}
								>
									Book Now
								</Button>
							</div>
						</div>
					</div>
				</section>
				<section
					id='services'
					className='w-full py-12 md:py-24 lg:py-32 bg-[#FFD700]'
				>
					<div className='container px-4 md:px-6 max-w-6xl mx-auto'>
						<h2 className='fade-in text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-[#8B4513]'>
							Our Services
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							<div className='fade-in flex flex-col items-center text-center'>
								<PartyPopperIcon className='h-12 w-12 mb-4 text-[#8B4513]' />
								<h3 className='text-xl font-bold mb-2 text-[#8B4513]'>
									Birthday Cakes
								</h3>
								<p className='text-[#8B4513]'>
									Custom cakes to make your birthday celebration unforgettable.
								</p>
							</div>
							<div className='fade-in flex flex-col items-center text-center'>
								<HeartIcon className='h-12 w-12 mb-4 text-[#8B4513]' />
								<h3 className='text-xl font-bold mb-2 text-[#8B4513]'>
									Wedding Cakes
								</h3>
								<p className='text-[#8B4513]'>
									Elegant and beautiful cakes for your perfect wedding day.
								</p>
							</div>
							<div className='fade-in flex flex-col items-center text-center'>
								<CalendarIcon className='h-12 w-12 mb-4 text-[#8B4513]' />
								<h3 className='text-xl font-bold mb-2 text-[#8B4513]'>
									Event Cakes
								</h3>
								<p className='text-[#8B4513]'>
									Stunning cakes for corporate events, anniversaries, and more.
								</p>
							</div>
						</div>
					</div>
				</section>

			  <section
					id='gallery'
					className='w-full py-12 md:py-24 lg:py-32 bg-[#FFF5E6]'
				>
					<div className='container px-4 md:px-6 max-w-6xl mx-auto'>
						<h2 className='fade-in text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-[#8B4513]'>
							Cake Gallery
						</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
							{galleryImages.map((image, index) => (
								<div
									key={index}
									className='fade-in relative overflow-hidden rounded-lg group aspect-[4/5]'
								>
									<Image
										src={image.src}
										alt={image.alt}
										width={300}
										height={375}
										className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer'
										onClick={() => setFullScreenImage(image)}
									/>
									<div className='absolute inset-0 bg-[#8B4513] opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center'>
										<span className='text-[#FFFFFF] text-xl font-semibold text-center px-4'>
											{image.alt}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className='w-full py-12 md:py-24 lg:py-32 bg-[#FFA500]'>
					<div className='container px-4 md:px-6 max-w-6xl mx-auto'>
						<h2 className='fade-in text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-[#8B4513]'>
							What Our Customers Say
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
							<div className='fade-in bg-[#FFD700] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
								<p className='text-[#8B4513] mb-4'>
									&quot;The cake was not only beautiful but also delicious! It
									was the highlight of our wedding reception.&quot;
								</p>
								<p className='font-bold text-[#8B4513]'>- Sarah &amp; John</p>
							</div>
							<div className='fade-in bg-[#FFD700] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
								<p className='text-[#8B4513] mb-4'>
									&quot;I&apos;ve ordered multiple birthday cakes, and they
									always exceed my expectations. Highly recommended!&quot;
								</p>
								<p className='font-bold text-[#8B4513]'>- Michael T.</p>
							</div>
							<div className='fade-in bg-[#FFD700] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
								<p className='text-[#8B4513] mb-4'>
									&quot;The custom design for my daughter&apos;s themed birthday
									cake was absolutely perfect. Amazin&apos; Glazin&apos; Cakes
									brought her dreams to life!&quot;
								</p>
								<p className='font-bold text-[#8B4513]'>- Emily R.</p>
							</div>
							<div className='fade-in bg-[#FFD700] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
								<p className='text-[#8B4513] mb-4'>
									&quot;Our corporate event was a success, thanks in part to the
									amazing dessert spread from Amazin&apos; Glazin&apos; Cakes.
									Professional service and exquisite taste!&quot;
								</p>
								<p className='font-bold text-[#8B4513]'>
									- David L., Event Planner
								</p>
							</div>
						</div>
					</div>
				</section>
        
				<section
					id='contact'
					className='w-full py-12 md:py-24 lg:py-32 bg-[#FFA500]'
				>
					<div className='container px-4 md:px-6 max-w-6xl mx-auto'>
						<h2 className='fade-in text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-[#8B4513]'>
							Contact Us
						</h2>
						<div className='grid md:grid-cols-2 gap-8'>
							<div className='fade-in'>
								<form className='space-y-4'>
									<Input
										placeholder='Your Name'
										className='bg-[#FFD700] text-[#8B4513] placeholder-[#8B4513]'
									/>
									<Input
										type='email'
										placeholder='Your Email'
										className='bg-[#FFD700] text-[#8B4513] placeholder-[#8B4513]'
									/>
									<Input
										placeholder='Phone Number'
										className='bg-[#FFD700] text-[#8B4513] placeholder-[#8B4513]'
									/>
									<Textarea
										placeholder='Tell us about your cake requirements'
										className='bg-[#FFD700] text-[#8B4513] placeholder-[#8B4513]'
									/>
									<Button className='w-full bg-[#8B4513] text-[#FFD700] hover:bg-[#A0522D]'>
										Send Message
									</Button>
								</form>
							</div>
							<div className='fade-in'>
								<div className='aspect-w-16 aspect-h-9 mb-4'>
									<iframe
										src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98784492439748!3d40.74844097138819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1682805705378!5m2!1sen!2sus'
										width='600'
										height='450'
										style={{ border: 0 }}
										allowFullScreen={false}
										loading='lazy'
										referrerPolicy='no-referrer-when-downgrade'
										title="Amazin' Glazin' Cakes Location"
										className='w-full h-full rounded-lg'
									></iframe>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			<footer className='w-full py-6 px-4 md:px-6 bg-[#8B4513]'>
				<div className='container mx-auto max-w-6xl'>
					<div className='flex flex-col md:flex-row md:items-start md:justify-between space-y-6 md:space-y-0 md:space-x-4'>
						<div className='flex flex-col items-start'>
							<Image
								src='/images/logo.jpg'
								alt='Company logo'
								width={100}
								height={50}
								className='rounded-lg shadow-md mb-2'
							/>
							<h3 className='text-lg font-semibold text-[#FFD700]'>
								Amazin&apos; Glazin&apos; Cakes
							</h3>
							<p className='text-sm text-[#FFA500]'>
								Delicious cakes for all occasions
							</p>
						</div>

						<div className='flex flex-col items-start'>
							<h3 className='text-lg font-semibold mb-2 text-[#FFD700]'>
								Contact
							</h3>
							<div className='flex items-center text-sm text-[#FFA500] mb-1'>
								<MapPinIcon className='h-4 w-4 mr-2 flex-shrink-0' />
								<span>Johannesburg and Thohoyandou Venda</span>
							</div>
							<div className='flex items-center text-sm text-[#FFA500] mb-1'>
								<PhoneIcon className='h-4 w-4 mr-2 flex-shrink-0' />
								<span>
									Mulalo: (27) 79-390-1667 | Cecilia: (27) 79-120-1122
								</span>
							</div>
							<div className='flex items-center text-sm text-[#FFA500]'>
								<MailIcon className='h-4 w-4 mr-2 flex-shrink-0' />
								<span>amazin&apos;glazingcakeshomeoffreshbakes@gmail.com</span>
							</div>
						</div>

						<div className='flex flex-col items-start'>
							<h3 className='text-lg font-semibold mb-2 text-[#FFD700]'>
								Quick Links
							</h3>
							<nav className='flex flex-col space-y-1'>
								<Link
									className='text-sm text-[#FFA500] hover:underline'
									href='#services'
								>
									Services
								</Link>
								<Link
									className='text-sm text-[#FFA500] hover:underline'
									href='#gallery'
								>
									Gallery
								</Link>
								<Link
									className='text-sm text-[#FFA500] hover:underline'
									href='#contact'
								>
									Contact
								</Link>
							</nav>
						</div>

						<div className='flex flex-col items-start'>
							<h3 className='text-lg font-semibold mb-2 text-[#FFD700]'>
								Follow Us
							</h3>
							<div className='flex space-x-4'>
								<Link
									href='https://www.facebook.com/profile.php?id=100063864528201'
									aria-label='Facebook'
									className='text-[#FFA500] hover:text-[#FFD700] transition-colors duration-300'
									target='_blank'
									rel='noopener noreferrer'
								>
									<FacebookIcon className='h-6 w-6' />
								</Link>
								<Link
									href='https://www.instagram.com/amazinglazincakess/'
									aria-label='Instagram'
									className='text-[#FFA500] hover:text-[#FFD700] transition-colors duration-300'
									target='_blank'
									rel='noopener noreferrer'
								>
									<InstagramIcon className='h-6 w-6' />
								</Link>
							</div>
						</div>
					</div>

					<div className='mt-6 pt-6 border-t border-[#FFA500]'>
						<p className='text-sm text-[#FFA500] text-center'>
							© 2024 Amazin&apos; Glazin&apos; Cakes. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
