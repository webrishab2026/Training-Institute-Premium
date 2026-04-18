import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    customerId: process.env.CUSTOMER_ID || null
  });
}
