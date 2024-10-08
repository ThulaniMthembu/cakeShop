'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ContactForm from '@/components/ui/contact-form';
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

function smoothScroll(
	e: React.MouseEvent<HTMLAnchorElement>,
	targetId: string
) {
	e.preventDefault();
	const targetElement = document.getElementById(targetId);
	if (targetElement) {
		targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}

export default function CakeBakerLanding() {
	const [isLoading, setIsLoading] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [fullScreenImage, setFullScreenImage] = useState<ImageData | null>(
		null
	);
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const closeMenu = () => setIsMenuOpen(false);

	const animatedElementsRef = useRef<HTMLElement[]>([]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
			setIsLoaded(true);
		}, 2000);

		const handleLoad = () => {
			setIsLoading(false);
			setIsLoaded(true);
		};

		window.addEventListener('load', handleLoad);

		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1,
		};

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-fadeInSlideUp');
					observer.unobserve(entry.target);
				}
			});
		};

		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions
		);

		animatedElementsRef.current = Array.from(
			document.querySelectorAll('.animate-on-scroll')
		);
		animatedElementsRef.current.forEach((el) => observer.observe(el));

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
			clearTimeout(timer);
			window.removeEventListener('load', handleLoad);
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	}, [prevScrollPos]);

	const NavLinks: React.FC<NavLinksProps> = ({ onClick }) => (
		<>
			<Link
				className='text-md font-medium hover:underline underline-offset-4 text-[#FFD700]'
				href='#about'
				onClick={(e) => {
					smoothScroll(e, 'about');
					onClick();
				}}
			>
				About
			</Link>
			<Link
				className='text-md font-medium hover:underline underline-offset-4 text-[#FFD700]'
				href='#services'
				onClick={(e) => {
					smoothScroll(e, 'services');
					onClick();
				}}
			>
				Services
			</Link>
			<Link
				className='text-md font-medium hover:underline underline-offset-4 text-[#FFD700]'
				href='#gallery'
				onClick={(e) => {
					smoothScroll(e, 'gallery');
					onClick();
				}}
			>
				Gallery
			</Link>
			<Link
				className='text-md font-medium hover:underline underline-offset-4 text-[#FFD700]'
				href='#contact'
				onClick={(e) => {
					smoothScroll(e, 'contact');
					onClick();
				}}
			>
				Contact
			</Link>
		</>
	);

	interface NavLinksProps {
		onClick: () => void;
	}

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
			alt: 'Monthly Specials',
		},
		{ src: '/images/more.jpg?height=300&width=300', alt: 'And More' },
	];

	return (
		<div
			className={`flex flex-col min-h-screen relative transition-opacity duration-1000 ease-in-out ${
				isLoaded ? 'opacity-100' : 'opacity-0'
			} bg-[#432818]`}
		>
			{isLoading && (
				<div className='fixed inset-0 z-50 bg-[#432818] flex items-center justify-center'>
					<div className='flex-col gap-4 w-full flex items-center justify-center'>
						<div className='w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full'>
							<div className='w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full'></div>
						</div>
					</div>
				</div>
			)}

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
				<div className='px-4 lg:px-6 h-20 flex items-center bg-[#432818]'>
					<Link className='flex items-center justify-center' href='#'>
						<Image
							src='/images/logo.jpg'
							alt="Amazin' Glazin' Cakes Logo"
							width={60}
							height={60}
							className='rounded-full animate-on-scroll'
						/>
						<span className='font-bold text-[#FFD700] ml-2 text-xl'>
							Amazin&apos; Glazin&apos; Cakes
						</span>
					</Link>
					<nav className='ml-auto hidden md:flex gap-4 sm:gap-6'>
						<NavLinks onClick={() => {}} />
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
								<NavLinks onClick={closeMenu} />
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</header>

			<main className='flex-1 pt-20'>
				<section
					className='relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center'
					style={{
						backgroundImage: `url('/images/background.jpg')`,
					}}
				>
					<div className='absolute inset-0 bg-black bg-opacity-40'></div>

					<div className='relative container px-4 md:px-6 max-w-6xl mx-auto'>
						<div className='flex flex-col items-center space-y-4 text-center'>
							<div className='space-y-2'>
								<h1 className='animate-on-scroll text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#FFFFFF]'>
									Delicious Cakes for Your Special Moments
								</h1>
								<p className='animate-on-scroll mx-auto max-w-[700px] text-[#FFFFFF] md:text-xl'>
									Handcrafted cakes for birthdays, weddings, and events. Made
									with love and the finest ingredients.
								</p>
							</div>
							<div>
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
					id='about'
					className='w-full py-12 md:py-24 lg:py-32 bg-[#FFF5E6]'
				>
					<div className='container px-4 md:px-6 max-w-6xl mx-auto'>
						<h2 className='animate-on-scroll text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-[#8B4513]'>
							About Us
						</h2>
						<p className='animate-on-scroll text-start text-[#8B4513] max-w-3xl mx-auto md:text-lg'>
							Founded in 2020, Amazin&apos; Glazin&apos; Cakes is a proudly
							South African cake shop operating in Johannesburg and Thohoyandou,
							Venda. Our passion is crafting extraordinary cakes for all
							occasions, from birthdays and weddings to special events. Each
							cake is meticulously designed and baked with the finest
							ingredients, ensuring both taste and elegance are second to none.
						</p>
						<br />

						<p className='animate-on-scroll text-start text-[#8B4513] max-w-3xl mx-auto md:text-lg'>
							Whether you&apos;re dreaming of a classic design or something more
							unique, our skilled bakers and decorators are here to turn your
							vision into a delicious reality. At Amazin&apos; Glazin&apos;
							Cakes, we believe that every celebration deserves a show-stopping
							cake.
						</p>
						<br />

						<p className='animate-on-scroll text-start text-[#8B4513] max-w-3xl mx-auto md:text-lg'>
							Let us make your next occasion unforgettable with a masterpiece
							that&apos;s as delightful to the eyes as it is to the palate.
						</p>
					</div>
				</section>

				<section
					id='services'
					className='w-full py-12 md:py-24 lg:py-32 bg-[#FFE6a7]'
				>
					<div className='container px-4 md:px-6 max-w-6xl mx-auto'>
						<h2 className='animate-on-scroll text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-[#8B4513]'>
							Our Services
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							<div className='flex flex-col items-center text-center'>
								<PartyPopperIcon className='h-12 w-12 mb-4 text-[#8B4513]' />
								<h3 className='text-xl font-bold mb-2 text-[#8B4513]'>
									Birthday Cakes
								</h3>
								<p className='text-[#8B4513]'>
									Custom cakes to make your birthday celebration unforgettable.
								</p>
							</div>
							<div className='flex flex-col items-center text-center'>
								<HeartIcon className='h-12 w-12 mb-4 text-[#8B4513]' />
								<h3 className='text-xl font-bold mb-2 text-[#8B4513]'>
									Wedding Cakes
								</h3>
								<p className='text-[#8B4513]'>
									Elegant and beautiful cakes for your perfect wedding day.
								</p>
							</div>
							<div className='flex flex-col items-center text-center'>
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
					className='w-full py-12 md:py-24 lg:py-32 bg-[#BB9457]'
				>
					<div className='container px-4 md:px-6 max-w-6xl mx-auto'>
						<h2 className='animate-on-scroll text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-[#000000]'>
							Cake Gallery
						</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
							{galleryImages.map((image, index) => (
								<div
									key={index}
									className='animate-on-scroll relative overflow-hidden rounded-lg group aspect-[4/5]'
									style={{ animationDelay: `${index * 100}ms` }}
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

						<div className='mt-12'>
							<div className='bg-[#8B4513] rounded-lg p-6 text-center'>
								<h3 className='text-2xl font-bold text-[#FFD700] mb-4'>
									See More Delicious Creations!
								</h3>
								<p className='text-[#FFFFFF] mb-6'>
									Follow us on social media for daily cake inspiration,
									behind-the-scenes content, and exclusive offers.
								</p>
								<div className='flex justify-center space-x-4'>
									<Link
										href='https://www.facebook.com/profile.php?id=100063864528201'
										aria-label='Visit our Facebook page'
										className='bg-[#FFD700] text-[#8B4513] hover:bg-[#FFA500] transition-colors duration-300 py-2 px-4 rounded-full flex items-center'
										target='_blank'
										rel='noopener noreferrer'
									>
										<FacebookIcon className='h-6 w-6 mr-2' />
										<span>Facebook</span>
									</Link>
									<Link
										href='https://www.instagram.com/amazinglazincakess/'
										aria-label='Visit our Instagram page'
										className='bg-[#FFD700] text-[#8B4513] hover:bg-[#FFA500] transition-colors duration-300 py-2 px-4 rounded-full flex items-center'
										target='_blank'
										rel='noopener noreferrer'
									>
										<InstagramIcon className='h-6 w-6 mr-2' />
										<span>Instagram</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='w-full py-12 md:py-24 lg:py-32 bg-[#8B4513]'>
					<div className='container px-4 md:px-6 max-w-6xl mx-auto'>
						<h2 className='animate-on-scroll text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-[#FFFFFF]'>
							What Our Customers Say
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
							<div className='bg-[#FFD700] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
								<p className='text-[#8B4513] mb-4'>
									&quot;I absolutely love your cakes! They are not only
									beautiful but taste amazing too. Every bite is pure joy! Can I
									book in again lol? &quot;
								</p>
								<p className='font-bold text-[#8B4513]'>
									- Chanell on Instagram
								</p>
							</div>
							<div className='bg-[#FFD700] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
								<p className='text-[#8B4513] mb-4'>
									&quot;I&apos;ve ordered multiple birthday cakes, and they
									always exceed my expectations. Highly recommended!&quot;
								</p>
								<p className='font-bold text-[#8B4513]'>- Nangi on Facebook</p>
							</div>
							<div className='bg-[#FFD700] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
								<p className='text-[#8B4513] mb-4'>
									&quot;The custom design for my daughter&apos;s themed birthday
									cake was absolutely perfect. Amazin&apos; Glazin&apos; Cakes
									brought her dreams to life!&quot;
								</p>
								<p className='font-bold text-[#8B4513]'>
									- Mukwevho on Facebook
								</p>
							</div>
							<div className='bg-[#FFD700] p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
								<p className='text-[#8B4513] mb-4'>
									&quot;Our corporate event was a success, thanks in part to the
									amazing dessert spread from Amazin&apos; Glazin&apos; Cakes.
									Professional service and exquisite taste!&quot;
								</p>
								<p className='font-bold text-[#8B4513]'>
									- Palesa, an Event Planner
								</p>
							</div>
						</div>
					</div>
				</section>

				<section
					id='contact'
					className='w-full py-12 md:py-24 lg:py-32 bg-[#BC6C25]'
				>
					<div className='container px-4 md:px-6 max-w-6xl mx-auto'>
						<h2 className='animate-on-scroll text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-white-800'>
							Contact Us
						</h2>
						<div className='grid md:grid-cols-2 gap-8'>
							<div className='flex'>
								<ContactForm />
							</div>
							<div className='flex flex-col h-full'>
								<div className='flex-1 flex flex-col'>
									<h4 className='text-xl font-semibold mb-2 text-white-800'>
										Johannesburg & Soweto
									</h4>
									<div className='flex-grow'>
										<iframe
											src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28632.90625550841!2d27.823469911883905!3d-26.225508483803317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a15d7cf11131%3A0x719a6f632dd70f77!2sDobsonville%2C%20Soweto%2C%201863!5e0!3m2!1sen!2sza!4v1726606726769!5m2!1sen!2sza'
											style={{ border: 0 }}
											allowFullScreen={false}
											loading='lazy'
											referrerPolicy='no-referrer-when-downgrade'
											title="Amazin' Glazin' Cakes Johannesburg Location"
											className='w-full h-full rounded-lg shadow-lg'
										></iframe>
									</div>
								</div>
								<div className='flex-1 flex flex-col mt-4'>
									<h4 className='text-xl font-semibold mb-2 text-white-800'>
										Thohoyandou, Venda
									</h4>
									<div className='flex-grow'>
										<iframe
											src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235182.3881794668!2d30.325731868485008!3d-22.923518717512486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec5c72c7472097b%3A0xd5d5f24ad8f27122!2sThohoyandou!5e0!3m2!1sen!2sza!4v1726607247580!5m2!1sen!2sza'
											style={{ border: 0 }}
											allowFullScreen={false}
											loading='lazy'
											referrerPolicy='no-referrer-when-downgrade'
											title="Amazin' Glazin' Cakes Thohoyandou Location"
											className='w-full h-full rounded-lg shadow-lg'
										></iframe>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			<footer className='w-full py-6 px-4 md:px-6 bg-[#432818]'>
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
									Mulalo: (27) 79-390-1667 <br />
									Cecilia: (27) 79-120-1122
								</span>
							</div>
							<div className='flex items-center text-sm text-[#FFA500]'>
								<MailIcon className='h-4 w-4 mr-2 flex-shrink-0' />
								<span>amazinglazincakes110@gmail.com</span>
							</div>
						</div>

						<div className='flex flex-col items-start'>
							<h3 className='text-lg font-semibold mb-2 text-[#FFD700]'>
								Quick Links
							</h3>
							<nav className='flex flex-col space-y-1'>
								<Link
									className='text-sm text-[#FFA500] hover:underline'
									href='#about'
									onClick={(e) => smoothScroll(e, 'about')}
								>
									About
								</Link>
								<Link
									className='text-sm text-[#FFA500] hover:underline'
									href='#services'
									onClick={(e) => smoothScroll(e, 'services')}
								>
									Services
								</Link>
								<Link
									className='text-sm text-[#FFA500] hover:underline'
									href='#gallery'
									onClick={(e) => smoothScroll(e, 'gallery')}
								>
									Gallery
								</Link>
								<Link
									className='text-sm text-[#FFA500] hover:underline'
									href='#contact'
									onClick={(e) => smoothScroll(e, 'contact')}
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
							© 2020 Amazin&apos; Glazin&apos; Cakes. All rights reserved.
						</p>
						<p className='text-sm text-[#FFA500] text-center'>
							Website by{' '}
							<a
								href='mailto:thulanim457@gmail.com'
								className='text-[#ffffff] hover:underline'
								onClick={(e) => e.stopPropagation()}
							>
								Thulani Mthembu | thulanim457@gmail.com
							</a>
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
