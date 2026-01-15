import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AISOD 3A - Namibia\'s #1 AI Assistant | AI Development, Automation & Agents',
  description: 'Meet 3A - AISOD\'s AI assistant that develops AI, automates processes, and solves real problems. Transform your business, advance your career, or automate operations with AISOD 3A. Serving Namibia and Africa.',
  keywords: [
    'AISOD',
    'AISOD 3A',
    '3A AI',
    'Namibia AI',
    'AI assistant Namibia',
    'AI development',
    'AI automation',
    'AI agents',
    'artificial intelligence Namibia',
    'business automation',
    'AI training Namibia',
    'Switch2AI',
    'AISOD Institute'
  ],
  authors: [{ name: 'AISOD - Artificial Intelligence Service Optimization for Development' }],
  creator: 'AISOD',
  publisher: 'AISOD Investments CC',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_NA',
    url: 'https://aisod.cloud',
    siteName: 'AISOD 3A',
    title: 'AISOD 3A - Namibia\'s #1 AI Assistant',
    description: 'Meet 3A - AISOD\'s AI assistant that develops AI, automates processes, and solves real problems. Transform your business with AI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AISOD 3A - Namibia\'s #1 AI Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AISOD 3A - Namibia\'s #1 AI Assistant',
    description: 'Meet 3A - AISOD\'s AI assistant that develops AI, automates processes, and solves real problems.',
    images: ['/og-image.png'],
    creator: '@AISOD',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'google-site-verification-code', // Replace with actual verification code
  },
  alternates: {
    canonical: 'https://aisod.cloud',
  },
  other: {
    'msapplication-TileColor': '#2563eb',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AISOD - Artificial Intelligence Service Optimization for Development',
    alternateName: 'AISOD 3A',
    url: 'https://aisod.cloud',
    logo: 'https://aisod.cloud/aisod-logo.png',
    description: 'Namibia\'s leading AI development and capacity-building company focused on AI Development, Automation, and Intelligent Agents.',
    foundingDate: '2023-08-25',
    founders: [
      {
        '@type': 'Person',
        name: 'Joel Tiago',
        jobTitle: 'Founder & CEO'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office 18, Go Work Offices Suits, Maerua Mall',
      addressLocality: 'Windhoek',
      addressCountry: 'NA'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+264-81-497-1482',
      contactType: 'Customer Service',
      email: 'info@aisodinstitute.tech',
      availableLanguage: ['English', 'Portuguese', 'Afrikaans', 'Oshiwambo']
    },
    sameAs: [
      'https://aisod.tech',
      'https://solutions.aisod.tech',
      'https://switch.aisod.tech',
      'https://aisodinstitute.tech',
      'https://techbehemoths.com/company/artificial-intelligence-service-optimization-for-development-aisod',
      'https://www.observer24.com.na/aisod-sets-out-vision-for-namibias-ai-future/'
    ],
    areaServed: {
      '@type': 'Place',
      name: 'Namibia'
    },
    makesOffer: [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          name: 'AI Development Services',
          description: 'Custom AI solutions, automation, and intelligent agents for businesses'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          name: 'AI Training & Education',
          description: 'Professional AI training programs and certifications'
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#2563eb" />
        <link rel="canonical" href="https://aisod.cloud" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
