import HomeClient from '@/components/HomeClient';
import { getCustomizations } from '@/lib/getCustomizations';

export default async function Home() {
  const customizations = await getCustomizations();
  return <HomeClient customizations={customizations} />;
}
