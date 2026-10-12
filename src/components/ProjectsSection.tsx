import React from 'react';
import GlassJarProjects from './GlassJarProjects';

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      data-scroll-type="content"
      data-scroll-section
      className="cinematic-section projects-section relative w-full h-auto bg-black/60 backdrop-blur-sm text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black overflow-visible border-t border-[#D4AF37]/20 shadow-[0_-20px_50px_rgba(0,0,0,0.95)]"
    >
      <span id="work" className="sr-only" />
      
      {/* Studio Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

      {/* The Glass Jar Pinned Scroll & Origami Paper Unfold Engine */}
      <GlassJarProjects />
    </section>
  );
};

export default ProjectsSection;