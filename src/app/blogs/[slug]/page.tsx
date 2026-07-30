
'use client';

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getBlogPostBySlug, blogPosts } from "@/lib/blogs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

const getImage = (id: string): ImagePlaceholder | undefined => {
    return PlaceHolderImages.find((img) => img.id === id);
};

export default function BlogPostDetail() {
    const { slug } = useParams();
    const router = useRouter();
    const post = getBlogPostBySlug(slug as string);

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                <p className="text-muted-foreground mb-8">The article you are looking for does not exist or has been moved.</p>
                <Button asChild>
                    <Link href="/blogs">Back to Blog</Link>
                </Button>
            </div>
        );
    }

    const postImage = getImage(post.postImageId);
    const authorImage = getImage(post.authorImageId);

    // Suggested posts (excluding current)
    const relatedPosts = blogPosts
        .filter(p => p.slug !== post.slug && (p.category === post.category || p.featured))
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] w-full">
                {postImage && (
                    <Image
                        src={postImage.imageUrl}
                        alt={post.title}
                        fill
                        unoptimized={true}
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="container relative z-10 mx-auto flex h-full flex-col justify-end px-4 pb-12">
                    <Button
                        variant="ghost"
                        className="mb-8 w-fit text-white hover:bg-white/10"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
                    </Button>
                    <Badge className="mb-4 w-fit bg-primary text-primary-foreground">{post.category}</Badge>
                    <h1 className="text-4xl font-black text-white md:text-6xl lg:text-7xl leading-tight max-w-4xl">
                        {post.title}
                    </h1>
                    <div className="mt-8 flex flex-wrap items-center gap-6 text-white/80">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                    {/* Main Content */}
                    <article className="lg:col-span-8">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="text-xl leading-relaxed text-muted-foreground mb-8 font-medium italic">
                                {post.excerpt}
                            </p>
                            <div className="text-lg leading-relaxed space-y-6">
                                {post.content.split('\n\n').map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Author Info */}
                        <div className="mt-16 rounded-2xl bg-slate-50 dark:bg-slate-900 p-8 border border-slate-100 dark:border-slate-800">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                {authorImage && (
                                    <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 shadow-xl">
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={authorImage.imageUrl}
                                                alt={post.author}
                                                fill
                                                unoptimized={true}
                                                className="object-cover"
                                            />
                                        </div>
                                    </Avatar>
                                )}
                                <div className="text-center sm:text-left">
                                    <h3 className="text-xl font-bold mb-2">Written by {post.author}</h3>
                                    <p className="text-muted-foreground italic">
                                        Lead researcher and expert at Quantum Leap Academy, specializing in {post.category.toLowerCase()} and modern technical architectures.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sharing */}
                        <div className="mt-12 flex items-center justify-between border-y border-slate-100 dark:border-slate-800 py-6">
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-sm uppercase tracking-wider text-slate-500">Share This</span>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full shadow-sm hover:text-blue-600 transition-colors"
                                        onClick={() => {
                                            const url = window.location.href;
                                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                                        }}
                                    >
                                        <Facebook className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full shadow-sm hover:text-sky-500 transition-colors"
                                        onClick={() => {
                                            const url = window.location.href;
                                            const title = post.title;
                                            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
                                        }}
                                    >
                                        <Twitter className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full shadow-sm hover:text-blue-700 transition-colors"
                                        onClick={() => {
                                            const url = window.location.href;
                                            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                                        }}
                                    >
                                        <Linkedin className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                className="gap-2 hover:text-primary transition-colors"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    // You could add a toast here if available, but copy to clipboard is the main task.
                                }}
                            >
                                <Share2 className="h-4 w-4" /> Copy Link
                            </Button>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* Suggested Articles */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Tag className="h-5 w-5 text-primary" /> More from QuantumPod
                            </h3>
                            <div className="space-y-6">
                                {relatedPosts.map((related) => {
                                    const relImage = getImage(related.postImageId);
                                    return (
                                        <Link
                                            key={related.slug}
                                            href={`/blogs/${related.slug}`}
                                            className="group block"
                                        >
                                            <div className="flex gap-4">
                                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                                                    {relImage && (
                                                        <Image
                                                            src={relImage.imageUrl}
                                                            alt={related.title}
                                                            fill
                                                            className="object-cover transition-transform group-hover:scale-110"
                                                        />
                                                    )}
                                                </div>
                                                <div className="space-y-1">
                                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{related.category}</Badge>
                                                    <h4 className="font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                        {related.title}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground">{related.date}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/blogs">View All Articles</Link>
                            </Button>
                        </div>

                        {/* Newsletter */}
                        <div className="rounded-3xl bg-slate-950 p-8 text-white relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 h-24 w-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors" />
                            <h3 className="text-2xl font-black mb-4 tracking-tight">Stay Ahead of the Curve</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                Join 5,000+ tech professionals receiving our weekly insights on AI, Data, and Engineering.
                            </p>
                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                                />
                                <Button className="w-full h-12 font-bold shadow-lg shadow-primary/20">Subscribe Now</Button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
