"use client";
import { Button } from "./components/button";
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/ui/components/card";
import { Badge } from "@/app/ui/components/badge";
import { Input } from "./components/input";
import { 
  Layout, 
  Palette, 
  Layers, 
  Github, 
  CheckCircle2,
  Zap,
  Accessibility,
  Monitor,
  ArrowRight,
  Code2
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

function Home() {
  const [mobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Palette,
      title: "Gnome Aesthetics",
      description: "Beautifully crafted components following the GNOME Human Interface Guidelines.",
    },
    {
      icon: Layers,
      title: "Modular Architecture",
      description: "Built on top of Radix UI primitives for maximum flexibility and control.",
    },
    {
      icon: Accessibility,
      title: "Accessible by Default",
      description: "Adheres to WAI-ARIA standards, providing a seamless experience for everyone.",
    },
    {
      icon: Zap,
      title: "Blazing Fast",
      description: "Optimized for speed. Zero runtime CSS, tiny bundle size, and high performance.",
    },
    {
      icon: Code2,
      title: "TypeScript Native",
      description: "Strictly typed components for a robust and safe development experience.",
    },
    {
      icon: Monitor,
      title: "Ultra Responsive",
      description: "Fluid layouts that look stunning on everything from phones to ultrawide monitors.",
    }
  ];

  const components = [
    { name: "Button", description: "Versatile button system with multiple states." },
    { name: "Dialog", description: "Modal windows for focused interactions." },
    { name: "Popover", description: "Contextual info that floats near its anchor." },
    { name: "Forms", description: "Beautifully styled accessible input fields." },
    { name: "Tabs", description: "Switch between views with elegant animations." },
    { name: "Toast", description: "Unobtrusive notifications for your users." }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl">
        <div className="container mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-zinc-900 flex items-center justify-center">
                <Image className="h-3.5 w-3.5 text-white" src="/icon.svg" alt="GnomeUI Logo" width={14} height={14} />
              </div>
              <span className="text-sm font-bold tracking-tight">GnomeUI</span>
            </div>
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-zinc-500">
              <a href="/docs" className="hover:text-zinc-950 transition-colors">Documentation</a> 
            </nav>
          </div>

          <div className="flex items-center gap-2">
             <div className="hidden sm:flex items-center gap-2 mr-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200 text-[11px] font-medium text-zinc-500">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  v0.4.1
                </div>
             </div>
             <Button   className="h-8 w-8 p-0">
               <Github className="h-4 w-4" />
             </Button>
             <Button   className="h-8 px-3 text-xs bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-colors">
               Get Started
             </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <Badge  className="mb-6 py-1 px-4 border-zinc-200 text-zinc-600 rounded-full font-medium">
            Introducing GnomeUI v2.0
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-zinc-900 mb-6 leading-[1.1]">
            Build your interface <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500">with precision and speed.</span>
          </h1>
          
          <p className="max-w-[42rem] mx-auto text-zinc-500 text-lg md:text-xl mb-10 leading-relaxed">
            Beautifully designed components that you can copy and paste into your apps. 
            Accessible. Customizable. Open Source. Inspired by GNOME.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button   className="w-full sm:w-auto px-8 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md h-11 transition-colors">
              Read the docs
            </Button>
            <Button   className="w-full sm:w-auto px-8 border-zinc-200 hover:bg-zinc-50 rounded-md h-11 transition-all">
              Browse components
            </Button>
          </div>

          {/* Installation Terminal Style */}
          <div className="max-w-xl mx-auto text-left relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-blue-500/10 blur-2xl opacity-50" />
            <div className="relative rounded-xl border border-zinc-200 bg-white shadow-2xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-100 bg-zinc-50/50">
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                <span className="ml-2 text-[11px] font-medium text-zinc-400 font-mono">bash — gnome-ui</span>
              </div>
              <div className="p-5 font-mono text-sm sm:text-base">
                <div className="flex gap-3">
                  <span className="text-zinc-400 shrink-0">$</span>
                  <span className="text-zinc-800">npx gnome-ui@latest init</span>
                </div>
                <div className="mt-2 text-zinc-400">
                  <span className="text-green-600">✔</span> Success! Project initialized.
                </div>
                <div className="mt-1 flex gap-3">
                  <span className="text-zinc-400 shrink-0">$</span>
                  <span className="text-zinc-800">npx gnome-ui@latest add button card</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Display Section */}
      <section className="py-24 border-t border-zinc-100">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="group relative">
                <div className="flex flex-col space-y-3">
                   <div className="h-10 w-10 rounded-lg bg-zinc-50 flex items-center justify-center border border-zinc-100 transition-colors group-hover:bg-zinc-100">
                      <feature.icon className="h-5 w-5 text-zinc-900" />
                   </div>
                   <h3 className="text-base font-bold text-zinc-900">{feature.title}</h3>
                   <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Showcase */}
      <section id="components" className="py-24 bg-zinc-50/50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-zinc-900">Featured Components</h2>
            <p className="text-zinc-500 text-lg max-w-[42rem]">
              A library of high-quality components designed for modern web apps. 
              Built with performance and accessibility in mind.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((component, index) => (
              <Card key={index} className="group border-zinc-200 bg-white hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-bold group-hover:text-zinc-900 transition-colors">{component.name}</CardTitle>
                  <CardDescription className="text-zinc-500 mt-2">{component.description}</CardDescription>
                </CardHeader>
                <CardFooter className="px-6 pb-6 pt-0">
                  <span className="text-xs font-semibold text-zinc-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Demo <ArrowRight className="h-3 w-3" />
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 overflow-hidden border-t border-zinc-100">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col space-y-6">
              <Badge  className="w-fit py-1 px-3 border-zinc-200 text-zinc-600 rounded-full text-xs font-semibold">
                PREVIEW
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-zinc-900">
                The full power of <span className="text-orange-600">GNOME</span> in your React app.
              </h2>
              <p className="text-lg text-zinc-500 leading-relaxed">
                We've spent thousands of hours refining the details. From the exact shadow 
                on our buttons to the accessibility of our dropdowns.
              </p>

              <div className="space-y-4">
                {[
                  "Accessible and compliant (WCAG)",
                  "Customizable via Tailwind utility classes",
                  "Dark mode and light mode out of the box",
                  "Fluid, native-feeling animations",
                  "Modular architecture with Radix UI"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-zinc-900 flex items-center justify-center">
                       <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-zinc-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:ml-10">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-3xl blur-2xl opacity-10 animate-pulse" />
              <Card className="relative p-8 bg-white border-zinc-200 shadow-2xl rounded-3xl overflow-hidden">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-zinc-900">Create an account</h3>
                    <p className="text-sm text-zinc-500">Enter your email below to create your account</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <Button  className="h-10 text-xs font-bold border-zinc-200 hover:bg-zinc-50">
                         <Github className="h-4 w-4 mr-2" /> GitHub
                       </Button>
                       <Button  className="h-10 text-xs font-bold border-zinc-200 hover:bg-zinc-50">
                         <Layout className="h-4 w-4 mr-2" /> Google
                       </Button>
                    </div>
                    <div className="relative">
                       <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-zinc-100" />
                       </div>
                       <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white px-2 text-zinc-400 font-medium">Or continue with</span>
                       </div>
                    </div>
                    <div className="space-y-3">
                      <Input placeholder="m@example.com" className="h-10 border-zinc-200 bg-zinc-50/50" />
                      <Input type="password" placeholder="Password" className="h-10 border-zinc-200 bg-zinc-50/50" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button  className="flex-1 h-10 bg-zinc-900 text-white hover:bg-zinc-800 font-bold rounded-lg transition-all">
                      Create account
                    </Button>
                  </div>
                  
                  <p className="text-[11px] text-zinc-400 text-center px-8">
                    By clicking continue, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-zinc-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-extrabold tracking-tighter text-white sm:text-5xl mb-6 leading-tight">
            Start building your <br /> next big idea today.
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Stop worrying about the UI and focus on your business logic. 
            GnomeUI gives you the foundations you need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button   className="w-full sm:w-auto px-10 bg-white text-zinc-950 hover:bg-zinc-100 font-bold h-12 rounded-xl transition-colors">
              Get Started for Free
            </Button>
            <Button   className="w-full sm:w-auto px-10 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white font-bold h-12 rounded-xl bg-transparent transition-all">
              <Github className="h-5 w-5 mr-2" /> Star on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-zinc-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
                <Layout className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-zinc-900">GnomeUI</span>
            </div>
            
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-zinc-500">
              <a href="#" className="hover:text-zinc-900 transition-colors">GitHub</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Documentation</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">NPM</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">License</a>
            </nav>

            <p className="text-sm text-zinc-400 font-medium">
              Built by the community. Open source.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;