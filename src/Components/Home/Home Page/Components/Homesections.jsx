import React from "react";
import { Link } from "react-router"; // use 'react-router-dom' if v6
import { motion } from "framer-motion";
import {
  Search, PlusCircle, ShieldCheck, Mail, MapPin, PawPrint, Smartphone, IdCard, Wallet,
  CheckCircle2, AlertTriangle, Sparkles
} from "lucide-react";

/* 1) Urgent alerts ribbon */
export const UrgentAlertBar = ({ count = 3 }) => (
  <div className="w-full bg-red-50 border-y border-red-100 text-red-700">
    <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2 text-sm">
      <AlertTriangle className="w-4 h-4" />
      <span className="font-semibold">Urgent:</span>
      <span>{count} new LOST reports in the last 24 hours.</span>
      <Link to="/postItems" className="ml-auto underline hover:no-underline">See all</Link>
    </div>
  </div>
);

/* 2) Hero with search + quick action */
export const HeroSearchPost = ({ onSearch }) => (
  <section className="max-w-6xl mx-auto px-4 pt-8 pb-6">
    <div className="grid md:grid-cols-3 gap-6 items-center">
      <div className="md:col-span-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Reunite People with Their <span className="text-blue-600">Lost Items</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Post what you lost or found, filter by category & location, and connect safely.
        </p>
        <div className="mt-5 flex gap-3">
          <div className="flex items-center gap-2 flex-1 rounded-xl border px-3 py-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full outline-none"
              placeholder="Search: e.g., ‘Black wallet Dhanmondi’"
            />
          </div>
          <Link
            to="/postItems"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2 hover:opacity-90"
          >
            <PlusCircle className="w-5 h-5" /> Post
          </Link>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="rounded-2xl border  p-4 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-green-600" />
          <div>
            <p className="font-semibold">Safe return policy</p>
            <p className="text-sm ">Verify ownership before handover.</p>
          </div>
        </div>
        <div className="mt-3 text-sm ">
          Never pay for recovery. Use in-app contact to protect your privacy.
        </div>
      </motion.div>
    </div>
  </section>
);

/* 3) Categories grid */
export const CategoriesGrid = () => {
  const cats = [
    { name: "Pets", icon: <PawPrint className="w-5 h-5" /> },
    { name: "Electronics", icon: <Smartphone className="w-5 h-5" /> },
    { name: "IDs & Cards", icon: <IdCard className="w-5 h-5" /> },
    { name: "Wallets & Bags", icon: <Wallet className="w-5 h-5" /> },
    { name: "Keys", icon: <Sparkles className="w-5 h-5" /> },
    { name: "Other", icon: <Sparkles className="w-5 h-5" /> },
  ];
  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {cats.map((c) => (
          <Link
            key={c.name}
            to={`/postItems?category=${encodeURIComponent(c.name.toLowerCase())}`}
            className="group rounded-xl border  p-3 hover:shadow-md transition flex items-center gap-2"
          >
            <span className="shrink-0">{c.icon}</span>
            <span className="font-medium group-hover:text-blue-600">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

/* 4) How it works */
export const HowItWorks = () => {
  const steps = [
    { title: "Post", desc: "Create a Lost or Found post with photos & details." },
    { title: "Filter", desc: "Search by category, location, and date." },
    { title: "Connect", desc: "Use safe contact; never share sensitive info." },
    { title: "Verify & Return", desc: "Ask for unique proof before handover." },
  ];
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">How It Works</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border bg-white p-4 hover:shadow-md"
          >
            <div className="text-3xl font-bold text-blue-600/80">{i + 1}</div>
            <div className="mt-1 text-gray-600 font-semibold">{s.title}</div>
            <div className="text-sm text-gray-600">{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* 5) Success stories */
export const SuccessStories = () => {
  const items = [
    { quote: "Got my wallet back within hours. Amazing!", who: "Rafi, Dhaka" },
    { quote: "Neighbor found my cat thanks to this site.", who: "Maliha, Chattogram" },
    { quote: "Returned a phone—owner proved it with lock screen detail.", who: "Tanvir, Sylhet" },
  ];
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">Success Stories</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border bg-white p-4"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="mt-2 text-gray-700">“{t.quote}”</p>
            <p className="mt-1 text-sm text-gray-500">— {t.who}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* 6) Safety & claim policy */
export const SafetyTipsClaim = () => (
  <section className="max-w-6xl mx-auto px-4 py-8">
    <div className="rounded-2xl border  p-5">
      <h2 className="text-xl font-bold mb-3">Safety & Claim Policy</h2>
      <ul className="list-disc pl-5  space-y-2">
        <li>Verify ownership with unique details (photos, marks, receipts).</li>
        <li>Meet in public places; avoid sharing home addresses.</li>
        <li>Never pay a reward in advance—completely optional.</li>
        <li>Use in-app/anonymous contact; avoid sharing phone numbers early.</li>
      </ul>
    </div>
  </section>
);


/* 8) Location CTA footer */
export const LocationCTA = () => (
  <section className="max-w-6xl mx-auto px-4 py-10">
    <div className="rounded-2xl border bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex flex-col md:flex-row items-center gap-3">
      <div className="flex-1">
        <h2 className="text-xl font-bold">See posts near you</h2>
        <p className=" text-sm">Filter by area to speed up recovery.</p>
      </div>
      <Link
        to="/postItems?filter=nearby"
        className="inline-flex items-center gap-2 rounded-xl bg-white text-blue-700 px-4 py-2 font-semibold hover:opacity-90"
      >
        <MapPin className="w-5 h-5" /> Browse Nearby
      </Link>
    </div>
  </section>
);

/* Example wrapper to render all on a home page */
const HomeSections = () => {
  return (
    <>
      
      
      <CategoriesGrid />
      {/* Your existing Latest Items grid here */}
      {/* <HowItWorks /> */}
      
      {/* <SafetyTipsClaim /> */}
      {/* <UrgentAlertBar count={3} /> */}
   
      {/* <HeroSearchPost /> */}
      <SuccessStories />
         <LocationCTA />
    </>
  );
};

export default HomeSections;
