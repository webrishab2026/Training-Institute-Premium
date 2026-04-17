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

// ============================================================
// DEFAULT DATA (Fallback - Rishab Informatica Group)
// ============================================================
const DEFAULT_DATA = {
  global: {
    businessName: "Rishab Informatica Group",
    primaryColor: "#2563eb",
    logoUrl: "/logo.png",
  },
  homepage: {
    heroTitle: "Kickstart Your Software Career in 45 Days with our COMBO Courses",
    heroSubtitle: "Rishab Informatica Group offers industry-leading courses in Informatica IICS Combo, Azure Data Eng. Combo, Snowflake Combo.",
    heroTagline: "👉 Click to see how we make it happen!",
    heroTaglineLink: "/blogs/how-to-get-it-job-in-45days",
    heroCtaText: "Explore Courses",
    heroCtaLink: "/courses",
    heroBgColor: "#2563eb",
    heroBgGradient: true,
    heroTitleColor: "#1f2937",
    heroSubtitleColor: "#4b5563",
    stats: [
      { value: "5000+", label: "Students Trained" },
      { value: "15+", label: "Professional Courses" },
      { value: "98%", label: "Placement Rate" },
      { value: "10+", label: "Years Experience" }
    ],
    statsBgColor: "#ffffff",
    courses: [
      {
        title: "Informatica IICS COMBO",
        description: "Master IICS, PowerCenter, SQL & Snowflake in 45 days",
        image: "/courses/informatica.png",
        href: "/courses/iics-combo-live"
      },
      { 
        title: "Azure Data Engineering",
        description: "Learn to build and optimize data solutions with Microsoft Azure.",
        image: "/courses/azure.png",
        href: "/courses/azure-combo-live"
      },
      { 
        title: "Snowflake Training",
        description: "Become proficient in Snowflake's cloud data platform and analytics capabilities.",
        image: "/courses/snowflake.png",
        href: "/courses/snowflake-combo-live"
      },
      {
        title: "Performance Engineering",
        description: "Master the techniques to optimize application performance and scalability.",
        image: "/courses/performance.png",
        href: "/courses/performance-engineering"
      }
    ],
    whyChooseUs: [
      {
        icon: <GraduationCap className="h-10 w-10" />,
        title: "Expert Instructors",
        description: "Learn from industry professionals with real-world experience."
      },
      {
        icon: <BookOpen className="h-10 w-10" />,
        title: "Comprehensive Curriculum",
        description: "Courses covering both theory and practical applications."
      },
      {
        icon: <Users className="h-10 w-10" />,
        title: "Placement Assistance",
        description: "Get help with resume building and interview preparation."
      }
    ],
    whyBgColor: "#edf2f7",
    learningApproach: [
      "Practical, hands-on training with real-world projects",
      "Small batch sizes for personalized attention",
      "Flexible learning options - online and offline",
      "Regular assessments and feedback",
      "Industry-aligned curriculum updated regularly"
    ],
    blogPosts: [
      {
        title: "How to Land a High-Paying Software Job in 45 Days (2025 Proven Steps)",
        excerpt: "🚀 Looking to break into the IT industry fast? Our powerful Combo Courses...",
        date: "June 15, 2025",
        href: "/blogs/job-in-45days"
      },
      {
        title: "What Will You Learn in the IICS Combo online Training?",
        excerpt: "Dive deep into our 45-day IICS Combo training program...",
        date: "June 10, 2025",
        href: "/blogs/iics-combo-course-content"
      },
      {
        title: "Performance Engineering Best Practices",
        excerpt: "Discover techniques for optimizing application performance.",
        date: "Apr 5, 2025",
        href: "/blog/performance-engineering"
      }
    ],
    ctaTitle: "Ready to Advance Your Career?",
    ctaSubtitle: "Join thousands of successful professionals.",
    ctaBgColor: "#2b6cb0",
  }
};

// Helper function to merge customizations with defaults
const mergeCustomizations = (customizations: any) => {
  if (!customizations) return DEFAULT_DATA;
  
  return {
    global: { ...DEFAULT_DATA.global, ...customizations.global },
    homepage: { ...DEFAULT_DATA.homepage, ...customizations.homepage }
  };
};

const renderTitleWithAccent = (title: string, primaryColor: string) => {
  const keyword = "COMBO Courses";
  if (!title?.includes(keyword)) return title;
  const [before, after] = title.split(keyword);
  return <>{before}<span style={{ color: primaryColor }}>{keyword}</span>{after}</>;
};

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
  const [loading, setLoading] = useState(true);

  // ============================================================
  // FETCH CUSTOMIZATIONS FROM YOUR API USING CUSTOMER ID
  // ============================================================
  useEffect(() => {
    const fetchCustomizations = async () => {
      // Get customer ID from environment variable (set at deploy time)
      const customerId = process.env.NEXT_PUBLIC_CUSTOMER_ID;
      
      console.log('🔍 Customer ID from env:', customerId);
      
      if (customerId) {
        try {
          // Fetch customizations from your WebRishab API
          const response = await fetch(`https://webrishab.com/api/customizations?sessionId=${customerId}`);
          const data = await response.json();
          
          if (data.exists && data.customizations) {
            console.log('✅ Customizations loaded for customer:', customerId);
            setCustomizations(data.customizations);
          } else {
            console.log('⚠️ No customizations found, using defaults');
          }
        } catch (error) {
          console.error('Failed to fetch customizations:', error);
        }
      } else {
        console.log('⚠️ No NEXT_PUBLIC_CUSTOMER_ID found, using defaults');
      }
      
      setLoading(false);
    };
    
    fetchCustomizations();
  }, []);

  // Merge fetched customizations with defaults
  const mergedData = mergeCustomizations(customizations);
  const data = mergedData.homepage;
  const globalData = mergedData.global;
  
  const primaryColor = globalData.primaryColor;
  const businessName = globalData.businessName;
  
  // Apply primary color to CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', primaryColor);
  }, [primaryColor]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your website...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <div className="flex-1 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col gap-4">
            <div className="flex flex-col justify-center space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {renderTitleWithAccent(data.heroTitle, primaryColor)}
              </h1>

              <Link 
                href={data.heroTaglineLink}
                className="text-lg font-medium hover:underline flex items-center"
                style={{ color: primaryColor }}
              >
                {data.heroTagline}
              </Link>

              <p className="text-base font-medium" style={{ color: data.heroSubtitleColor }}>
                {data.heroSubtitle}
              </p>

              <div className="mt-2 text-center font-semibold text-base leading-snug" style={{ color: data.heroTitleColor }}>
                <div>📞 Call / WhatsApp</div>
                <div>
                  <a href="tel:+918970853557" className="hover:underline">+91 8970853557</a> /{" "}
                  <a href="tel:+919448005273" className="hover:underline">9448005273</a>
                </div>
              </div>

              <div className="flex flex-row gap-2 justify-center mt-3">
                <Button asChild size="lg" className="rounded-full text-sm w-1/2" style={{ backgroundColor: primaryColor }}>
                  <Link href={data.heroCtaLink}>{data.heroCtaText}</Link>
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
              <h1 className="text-5xl font-extrabold tracking-tight">
                {renderTitleWithAccent(data.heroTitle, primaryColor)}
              </h1>
              
              <Link 
                href={data.heroTaglineLink}
                className="text-lg font-medium hover:underline flex items-center"
                style={{ color: primaryColor }}
              >
                {data.heroTagline}
              </Link>
              
              <p className="text-base" style={{ color: data.heroSubtitleColor }}>
                {data.heroSubtitle}
              </p>
              
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button asChild size="lg" className="rounded-full text-sm" style={{ backgroundColor: primaryColor }}>
                    <Link href={data.heroCtaLink}>{data.heroCtaText}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full text-sm">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>

                <div className="mt-4 text-base font-semibold text-center sm:text-left" style={{ color: data.heroTitleColor }}>
                  <span>📞 Call/WhatsApp: </span>
                  <a href="tel:+918970853557" className="hover:underline" style={{ color: primaryColor }}>+91 8970853557</a>
                  <span> / </span>
                  <a href="tel:+919448005273" className="hover:underline" style={{ color: primaryColor }}>+91 9448005273</a>
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
          <h2 className="text-xl font-bold tracking-tight" style={{ color: data.heroTitleColor }}>
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

      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ backgroundColor: data.statsBgColor }}>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {data.stats.map((stat, index) => (
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
          {data.courses.map((course, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
              <Image 
                src={course.image} 
                width={400} 
                height={225} 
                alt={course.title} 
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="mt-2 text-muted-foreground">{course.description}</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>Live Training</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>Placement Assistance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>Real-time Projects</span>
                  </li>
                </ul>
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
      <section className="py-16" style={{ backgroundColor: data.whyBgColor }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose {businessName}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              We're committed to providing the highest quality training to help you succeed in your tech career.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {data.whyChooseUs.map((item, index) => (
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
            <Image
              src="/images/approach.jpeg"
              width={600}
              height={400}
              alt="Learning approach"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Learning Approach</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Practical training that prepares you for real-world challenges.
            </p>
            <ul className="mt-8 space-y-4">
              {data.learningApproach.map((item, index) => (
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
          {data.blogPosts.map((post, index) => (
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
      <section className="py-16" style={{ backgroundColor: data.ctaBgColor }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">{data.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{data.ctaSubtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-white hover:bg-white/90" style={{ color: data.ctaBgColor }}>
              <Link href={data.heroCtaLink}>{data.heroCtaText}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="tel:+918970853557" 
              className="flex items-center gap-2 text-base font-semibold text-white hover:underline"
            >
              <Phone className="h-5 w-5" />
              Call: +91 8970853557
            </a>
            <a 
              href="https://wa.me/918970853557" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base font-semibold text-white hover:underline"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
