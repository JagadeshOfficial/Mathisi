"use client";

import { useParams } from "next/navigation";
import { courses } from "@/lib/courses";
import { MathisiLogo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, BarChart, GraduationCap, Phone, Mail, Globe } from "lucide-react";
import { useEffect } from "react";

export default function CourseBrochurePage() {
    const params = useParams();
    const slug = params.slug as string;
    const course = courses.find((c) => c.slug === slug);

    useEffect(() => {
        // Auto-print on load if the user wants a "Download" effect
        // window.print();
    }, []);

    if (!course) {
        return <div className="p-20 text-center">Course not found</div>;
    }

    return (
        <div className="min-h-screen bg-white p-8 md:p-16 text-slate-900 border-[12px] border-primary/10 print:border-none print:p-0">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-primary/20 pb-8 mb-12">
                <div className="mb-6 md:mb-0">
                    <MathisiLogo className="h-16 mb-4" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">School of Technology & AI</p>
                </div>
                <div className="text-right">
                    <h1 className="text-3xl md:text-5xl font-black text-primary uppercase leading-none mb-2">Program</h1>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase leading-none tracking-tighter">Brochure</h1>
                </div>
            </header>

            {/* Course Title & Overview */}
            <section className="mb-16">
                <Badge className="mb-4 bg-primary/10 text-primary border-none px-4 py-1 text-sm uppercase font-black tracking-widest">
                    {course.category} Level
                </Badge>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] text-slate-950">
                    {course.name}
                </h2>
                <p className="text-2xl text-slate-600 font-medium italic max-w-3xl leading-relaxed">
                    "{course.tagline}"
                </p>
            </section>

            {/* Key Highlights Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="flex flex-col items-center text-center p-4">
                    <Clock className="w-8 h-8 text-primary mb-4" />
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</p>
                    <p className="text-xl font-black text-slate-900">{course.duration}</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                    <BarChart className="w-8 h-8 text-primary mb-4" />
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Learning</p>
                    <p className="text-xl font-black text-slate-900">{course.learningHours}</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                    <GraduationCap className="w-8 h-8 text-primary mb-4" />
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Fee</p>
                    <p className="text-xl font-black text-slate-900">{course.fees}</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                    <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Certification</p>
                    <p className="text-xl font-black text-slate-900">Recognized</p>
                </div>
            </div>

            {/* Curriculum Section */}
            <section className="mb-16">
                <h3 className="text-3xl font-black mb-8 border-l-8 border-primary pl-6 uppercase tracking-tight">Curriculum Breakdown</h3>
                <div className="grid md:grid-cols-2 gap-12">
                    {course.learningPath.map((module: { title: string; topics: string[] }, idx: number) => (
                        <div key={idx} className="relative group">
                            <div className="absolute -left-6 top-1 text-4xl font-black text-slate-100 group-hover:text-primary/10 transition-colors">0{idx + 1}</div>
                            <h4 className="text-xl font-black mb-3 text-slate-900">{module.title}</h4>
                            <ul className="space-y-2">
                                {module.topics.map((topic: string, tidx: number) => (
                                    <li key={tidx} className="flex items-start gap-2 text-slate-600 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                                        {topic}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Mathisi? */}
            <section className="mb-16 bg-slate-900 text-white p-12 rounded-[2rem] overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
                <h3 className="text-3xl font-black mb-8 uppercase tracking-tight">Why Choose Mathisi?</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h5 className="font-black text-lg text-primary mb-2 italic">Industry Projects</h5>
                        <p className="text-slate-400 text-sm leading-relaxed">Work on production-grade architectures and real datasets provided by our tech partners.</p>
                    </div>
                    <div>
                        <h5 className="font-black text-lg text-primary mb-2 italic">Expert Mentorship</h5>
                        <p className="text-slate-400 text-sm leading-relaxed">Direct guidance from engineers at top-tier companies like Google, Microsoft, and Oracle.</p>
                    </div>
                    <div>
                        <h5 className="font-black text-lg text-primary mb-2 italic">Career Support</h5>
                        <p className="text-slate-400 text-sm leading-relaxed">Resume reviews, mock interviews, and direct referrals through our 1200+ hiring partners.</p>
                    </div>
                </div>
            </section>

            {/* Contact Information (Footer) */}
            <footer className="mt-auto pt-16 border-t-2 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-slate-600 font-bold">
                        <Phone className="w-5 h-5 text-primary" />
                        <span>+91 709 0000 311 / +91 988 0289 192</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 font-bold">
                        <Mail className="w-5 h-5 text-primary" />
                        <span>admissions@mathisi.in</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-3 text-primary font-black text-xl mb-1">
                        <Globe className="w-6 h-6" />
                        <span>www.mathisi.in</span>
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic text-right">Transforming Careers. Building the Future.</p>
                </div>
            </footer>

            {/* Print Button (Hidden in Print) */}
            <div className="fixed bottom-8 right-8 print:hidden">
                <button 
                    onClick={() => window.print()}
                    className="bg-primary text-white font-black px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-transform flex items-center gap-3"
                >
                    <BarChart className="w-5 h-5" />
                    Print / Save as PDF
                </button>
            </div>
        </div>
    );
}
