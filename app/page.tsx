"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, CheckCircle, GraduationCap, Users, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TestimonialSlider from "@/components/testimonial-slider";
import CompanySlider from "@/components/company-slider";
import { CheckIcon } from "lucide-react";
import VideoSlider from "@/components/video-slider";

const slides = [
  { type: 'image', src: "/courses/informatica.png", alt: "Hands-on Practice" },
  { type: 'short-video', src: "/videos/video1.mp4", duration: 8000 },
  { type: 'short-video', src: "/videos/video2.mp4", duration: 8000 },
  { type: 'short-video', src: "/videos/video3.mp4", duration: 8000 },
  { type: 'youtube', videoId: "4DfifZbfk7w", duration: 10000 },
  { type: 'youtube', videoId: "Kg86_3njK6A", duration: 10000 },
  { type: 'image', src: "/courses/informatica.png", alt: "Hands-on Practice" },
  { type: 'image', src: "/courses/informatica.png", alt: "Hands-on Practice" }
];

export default function Home() {
  const [customizations, setCustomizations] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomizations = async () => {
      try {
        const idRes = await fetch('/api/customer-id');
        const { customerId } = await idRes.json();

        console.log('🔍 Customer ID:', customerId);

        if (!customerId) {
          console.warn('No customer ID found');
          setLoading(false);
          return;
        }

       const response = await fetch(
  `https://f575-115-99-222-168.ngrok-free.app/api/customizations?sessionId=${customerId}`,
  {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  }
);
        const data = await response.json();

        if (data.exists && data.customizations) {
          setCustomizations(data.customizations);
          console.log('✅ Customizations loaded:', data.customizations.homepage?.heroTitle);
        } else {
          console.warn('⚠️ No customizations found — using defaults');
        }
      } catch (error) {
        console.error('Failed to load customizations:', error);
      }

      setLoading(false);
    };

    fetchCustomizations();
  }, []);

 
  // ✅ Get ALL data from customizations (with fallbacks)
  const homepage = customizations?.homepage || {};
  const global = customizations?.global || {};
  
  // Hero Section
  const heroTitle = homepage.heroTitle || "Get software join in 45 days";
  const heroSubtitle = homepage.heroSubtitle || "Rishab Informatica Group offers industry-leading courses in Informatica IICS Combo, Azure Data Eng. Combo, Snowflake Combo.";
  const heroTagline = homepage.heroTagline || "👉 Click to see how we make it happen!";
  const heroTaglineLink = homepage.heroTaglineLink || "/blogs/how-to-get-it-job-in-45days";
  const heroCtaText = homepage.heroCtaText || "Explore Courses";
  const heroCtaLink = homepage.heroCtaLink || "/courses";
  
  // Colors
  const primaryColor = global.primaryColor || "#2563eb";
  const businessName = global.businessName || "Rishab Informatica Group";
  const heroBgColor = homepage.heroBgColor || "#2563eb";
  const heroTitleColor = homepage.heroTitleColor || "#1f2937";
  const heroSubtitleColor = homepage.heroSubtitleColor || "#4b5563";
  const statsBgColor = homepage.statsBgColor || "#ffffff";
  const whyBgColor = homepage.whyBgColor || "#edf2f7";
  const ctaBgColor = homepage.ctaBgColor || "#2b6cb0";
  
  // ✅ STATS - Your "5000+ TEST" should appear here!
  const stats = homepage.stats || [
    { value: "5000+test ", label: "Students Trained" },
    { value: "15+test ", label: "Professional Courses" },
    { value: "98%", label: "Placement Rate" },
    { value: "10+", label: "Years Experience" }
  ];
  
  // Courses
  const courses = homepage.courses || [
    { title: "Informatica IICS COMBO", description: "Master IICS, PowerCenter, SQL & Snowflake in 45 days", image: "/courses/informatica.png", href: "/courses/iics-combo-live" },
    { title: "Azure Data Engineering", description: "Learn to build and optimize data solutions with Microsoft Azure.", image: "/courses/azure.png", href: "/courses/azure-combo-live" },
    { title: "Snowflake Training", description: "Become proficient in Snowflake's cloud data platform.", image: "/courses/snowflake.png", href: "/courses/snowflake-combo-live" },
    { title: "Performance Engineering", description: "Master performance optimization techniques.", image: "/courses/performance.png", href: "/courses/performance-engineering" }
  ];
  
  // Why Choose Us
  const whyChooseUs = homepage.whyChooseUs || [
    { icon: <GraduationCap className="h-10 w-10" />, title: "Expert Instructors", description: "Learn from industry professionals with real-world experience." },
    { icon: <BookOpen className="h-10 w-10" />, title: "Comprehensive Curriculum", description: "Courses covering both theory and practical applications." },
    { icon: <Users className="h-10 w-10" />, title: "Placement Assistance", description: "Get help with resume building and interview preparation." }
  ];
  
  // Learning Approach
  const learningApproach = homepage.learningApproach || [
    "Practical, hands-on training with real-world projects",
    "Small batch sizes for personalized attention",
    "Flexible learning options - online and offline",
    "Regular assessments and feedback",
    "Industry-aligned curriculum updated regularly"
  ];
  
  // Blog Posts
  const blogPosts = homepage.blogPosts || [
    { title: "How to Land a High-Paying Software Job in 45 Days (2025 Proven Steps)", excerpt: "Looking to break into the IT industry fast?", date: "June 15, 2025", href: "/blogs/job-in-45days" },
    { title: "What Will You Learn in the IICS Combo online Training?", excerpt: "Dive deep into our 45-day IICS Combo training program...", date: "June 10, 2025", href: "/blogs/iics-combo-course-content" }
  ];
  
  // CTA
  const ctaTitle = homepage.ctaTitle || "Ready to Advance Your Career?";
  const ctaSubtitle = homepage.ctaSubtitle || "Join thousands of successful professionals.";
  
  // Contact
  const phone1 = global.contactInfo?.phone?.split("/")[0]?.trim() || "+91 8970853557";
  const phone2 = global.contactInfo?.phone?.split("/")[1]?.trim() || "9448005273";

  const heroBg = `linear-gradient(to right, ${heroBgColor}10, ${heroBgColor}08, #ffffff)`;

  const renderTitleWithAccent = (title: string) => {
    const keyword = "COMBO Courses";
    if (!title?.includes(keyword)) return title;
    const [before, after] = title.split(keyword);
    return <>{before}<span style={{ color: primaryColor }}>{keyword}</span>{after}</>;
  };

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <div className="flex-1" style={{ background: heroBg }}>
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col gap-4">
            <div className="flex flex-col justify-center space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: heroTitleColor }}>
                {renderTitleWithAccent(heroTitle)}
              </h1>

              <Link href={heroTaglineLink} className="text-lg font-medium hover:underline flex items-center" style={{ color: primaryColor }}>
                {heroTagline}
              </Link>

              <p className="text-base font-medium" style={{ color: heroSubtitleColor }}>
                {heroSubtitle}
              </p>

              <div className="mt-2 text-center font-semibold text-base leading-snug" style={{ color: heroTitleColor }}>
                <div>📞 Call / WhatsApp</div>
                <div>
                  <a href={`tel:${phone1.replace(/\s/g, '')}`} className="hover:underline">{phone1}</a> /{" "}
                  <a href={`tel:${phone2.replace(/\s/g, '')}`} className="hover:underline">{phone2}</a>
                </div>
              </div>

              <div className="flex flex-row gap-2 justify-center mt-3">
                <Button asChild size="lg" className="rounded-full text-sm w-1/2" style={{ backgroundColor: primaryColor }}>
                  <Link href={heroCtaLink}>{heroCtaText}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full text-sm w-1/2">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>

            <div className="w-full mt-1 bg-black rounded-xl overflow-hidden">
              <VideoSlider slides={slides} slideDuration={5000} />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center space-y-3">
              <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: heroTitleColor }}>
                {renderTitleWithAccent(heroTitle)}
              </h1>
              
              <Link href={heroTaglineLink} className="text-lg font-medium hover:underline flex items-center" style={{ color: primaryColor }}>
                {heroTagline}
              </Link>
              
              <p className="text-base" style={{ color: heroSubtitleColor }}>
                {heroSubtitle}
              </p>
              
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button asChild size="lg" className="rounded-full text-sm" style={{ backgroundColor: primaryColor }}>
                    <Link href={heroCtaLink}>{heroCtaText}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full text-sm">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>

                <div className="mt-4 text-base font-semibold text-center sm:text-left" style={{ color: heroTitleColor }}>
                  <span>📞 Call/WhatsApp: </span>
                  <a href={`tel:${phone1.replace(/\s/g, '')}`} className="hover:underline" style={{ color: primaryColor }}>{phone1}</a>
                  <span> / </span>
                  <a href={`tel:${phone2.replace(/\s/g, '')}`} className="hover:underline" style={{ color: primaryColor }}>{phone2}</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="w-full bg-black rounded-xl overflow-hidden">
                <VideoSlider slides={slides} slideDuration={5000} />
              </div>
            </div>
          </div>
        </section>

        {/* Student Success Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-1 text-center">
          <h2 className="text-xl font-bold tracking-tight" style={{ color: heroTitleColor }}>
            Our Students Excel At Leading Companies
          </h2>
        </div>

        {/* Moving Logos */}
        <div className="w-full overflow-hidden py-2 bg-white/10">
          <CompanySlider 
            direction="right-to-left" 
            fullWidth
            logos={[
              { name: "Accenture", src: "/logos/Accenture.PNG", width: 180, height: 60 }, 
              { name: "TCS", src: "/logos/TCS.PNG", width: 120, height: 60 },
              { name: "Wipro", src: "/logos/Wipro.PNG", width: 140, height: 60 },
              { name: "Cognizant", src: "/logos/Cognizant.PNG", width: 160, height: 60 },
              { name: "Infosys", src: "/logos/Infosys.PNG", width: 150, height: 60 },
            ]}
            speed="medium"
          />
        </div>
      </div>

      {/* Stats Section - Your "5000+ TEST" will appear here! */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ backgroundColor: statsBgColor }}>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat: any, index: number) => (
            <div key={index} className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
              <span className="text-3xl font-bold" style={{ color: primaryColor }}>{stat.value}</span>
              <span className="mt-2 text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:pt-8 pb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Top Courses</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Industry-relevant courses designed to help you master the latest technologies and advance your career.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course: any, index: number) => (
            <div key={index} className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
              <Image src={course.image} width={400} height={225} alt={course.title} className="h-48 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="mt-2 text-muted-foreground">{course.description}</p>
                <Button asChild className="mt-6 w-full" style={{ backgroundColor: primaryColor }}>
                  <Link href={course.href}>Enroll Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" style={{ backgroundColor: primaryColor }}>
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16" style={{ backgroundColor: whyBgColor }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose {businessName}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              We're committed to providing the highest quality training to help you succeed in your tech career.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {whyChooseUs.map((item: any, index: number) => (
              <div key={index} className="flex flex-col items-center rounded-lg bg-background p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Student Success Stories</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Hear what our students say about their experience.
            </p>
          </div>
          <div className="mt-12">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* Learning Approach Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <Image src="/images/approach.jpeg" width={600} height={400} alt="Learning approach" className="rounded-xl shadow-lg" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Learning Approach</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Practical training that prepares you for real-world challenges.
            </p>
            <ul className="mt-8 space-y-4">
              {learningApproach.map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest from Our Blog</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Stay updated with the latest trends in tech.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post: any, index: number) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground">{post.date}</div>
                <h3 className="mt-2 text-xl font-bold">{post.title}</h3>
                <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                <Button asChild variant="link" className="mt-4 px-0" style={{ color: primaryColor }}>
                  <Link href={post.href} className="flex items-center">
                    Read more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" style={{ backgroundColor: primaryColor }}>
            <Link href="/blogs">View All Blogs</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: ctaBgColor }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">{ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{ctaSubtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-white hover:bg-white/90" style={{ color: ctaBgColor }}>
              <Link href={heroCtaLink}>{heroCtaText}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`tel:${phone1.replace(/\s/g, '')}`} className="flex items-center gap-2 text-base font-semibold text-white hover:underline">
              <Phone className="h-5 w-5" /> Call: {phone1}
            </a>
            <a href={`https://wa.me/${phone1.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base font-semibold text-white hover:underline">
              <MessageCircle className="h-5 w-5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
