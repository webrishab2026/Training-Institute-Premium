export async function getCustomizations() {
  try {
    const customerId = process.env.CUSTOMER_ID || null;
    if (!customerId) return null;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(
      `https://api.webrisab.xyz/api/customizations?sessionId=${customerId}`,
      {
        cache: 'no-store',
        signal: controller.signal
      }
    );
    clearTimeout(timeout);

    const data = await response.json();
    if (data.exists && data.customizations) {
      return data.customizations;
    }
  } catch (error) {
    console.error('Failed to fetch customizations:', error);
  }
  return null;
}
