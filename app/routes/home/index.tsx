import Hero from "~/components/Hero";

export default function Home() {
    const now = new Date().toISOString();
    if(typeof window === 'undefined') console.log('Server Render At ', now);
    else console.log('Client Hydration At ', now);
  return <section>
    <Hero />
  </section>;
}
