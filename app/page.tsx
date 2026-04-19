import HomeClient from '@/components/HomeClient';

async function getCustomizations() {
  try {
    const customerId = process.env.CUSTOMER_ID || null;
    if (!customerId) return null;

    const response = await fetch(
      `https://lawyer-tattoo-silly-interface.trycloudflare.com/api/customizations?sessionId=${customerId}`,
      { cache: 'no-store' }
    );
    const data = await response.json();
    if (data.exists && data.customizations) {
      return data.customizations;
    }
  } catch (error) {
    console.error('Failed to fetch customizations:', error);
  }
  return null;
}

export default async function Home() {
  const customizations = await getCustomizations();
  return <HomeClient customizations={customizations} />;
}
