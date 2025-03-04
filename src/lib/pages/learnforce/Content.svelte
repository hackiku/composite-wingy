<!-- src/lib/pages/learnforce/Content.svelte -->

<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
</script>

<div class="max-w-4xl mx-auto px-4">
  <!-- Rounded image with semi-transparent background after hero -->
  <div class="relative rounded-2xl overflow-hidden mb-24 mt-8">
    <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 z-0"></div>
    <img 
      src="/api/placeholder/1200/600" 
      alt="Learning development"
      class="w-full h-auto max-h-[400px] object-cover relative z-10 opacity-85"
    />
    <div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/90 to-transparent z-20">
      <p class="text-xl">Your people don't just need skills—they need the right opportunities to grow, adapt, and contribute at their best.</p>
    </div>
  </div>
  
  <!-- Learning Solutions Section -->
  <section id="learning-solutions" class="mb-24 scroll-mt-24">
    <h2 class="text-4xl font-bold mb-6">Learning mapped to your people's career journey</h2>
    
    <div class="mt-12">
      <h3 class="text-2xl font-semibold mb-4">Lifecycle based development</h3>
      <p class="text-lg text-muted-foreground mb-8">Continual learning throughout the workforce lifecycle.</p>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-muted/30 p-6 rounded-lg">
          <h4 class="text-xl font-medium mb-3">Onboarding Experiences</h4>
          <p>Help new hires find their place and make an impact from day one.</p>
        </div>
        
        <div class="bg-muted/30 p-6 rounded-lg">
          <h4 class="text-xl font-medium mb-3">Capability boosters</h4>
          <p>Strengthen specific skills and confidence exactly when needed, without disrupting workflow.</p>
        </div>
        
        <div class="bg-muted/30 p-6 rounded-lg">
          <h4 class="text-xl font-medium mb-3">Mentoring</h4>
          <p>Connect experience with potential through relationships that accelerate growth and transfer knowledge.</p>
        </div>
      </div>
      
      <div class="mt-12 p-6 bg-secondary/10 rounded-lg">
        <blockquote class="text-xl italic mb-4">
          "We reduced our onboarding time by 40% while improving performance metrics. New hires contribute meaningfully within weeks now, not months."
        </blockquote>
        <div class="flex items-center">
          <span class="font-medium">Person Van Quote</span>
          <span class="mx-2">-</span>
          <span class="text-muted-foreground">Global Talent Director</span>
        </div>
      </div>
    </div>
    
    <div class="mt-16">
      <h3 class="text-2xl font-semibold mb-4">Integrated Learning Systems</h3>
      <p class="text-lg text-muted-foreground mb-8">Development experiences that weave seamlessly into daily work.</p>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-muted/30 p-6 rounded-lg">
          <h4 class="text-xl font-medium mb-3">Agile Learning Campaigns</h4>
          <p>Shift mindsets, drive behavior change, and create lasting impact in the flow of work.</p>
        </div>
        
        <div class="bg-muted/30 p-6 rounded-lg">
          <h4 class="text-xl font-medium mb-3">Performance-Driven Online Learning</h4>
          <p>Make learning practical, relevant, and built for action applied to real challenges.</p>
        </div>
        
        <div class="bg-muted/30 p-6 rounded-lg">
          <h4 class="text-xl font-medium mb-3">Embedded learning systems</h4>
          <p>Transform daily work into growth opportunities by integrating development into routine activities.</p>
        </div>
      </div>
    </div>
    
    <div class="mt-12 flex justify-center">
      <a href="#book-demo" class="bg-primary text-primary-foreground px-6 py-3 inline-flex items-center gap-2 rounded-lg hover:bg-primary/90 transition-colors">
        Book a Demo <ArrowRight class="w-4 h-4" />
      </a>
    </div>
  </section>
  
  <!-- Accelerator Apps Section -->
  <section id="accelerator-apps" class="mb-24 scroll-mt-24">
    <h2 class="text-4xl font-bold mb-6">Accelerator Apps</h2>
    <p class="text-lg text-muted-foreground mb-8">Proprietary technology solutions engineered to map and sustainably harness skill, career and team dynamics.</p>
    
    <div class="flex flex-wrap gap-4 mb-8">
      <span class="bg-primary/10 px-4 py-1 rounded-full text-sm">Cloud and on-premise</span>
      <span class="bg-primary/10 px-4 py-1 rounded-full text-sm">Easy to use independently</span>
    </div>
    
    <div class="space-y-12">
      <div class="border border-border p-6 rounded-xl">
        <h3 class="text-2xl font-semibold mb-3">Performance Pathways</h3>
        <p class="mb-4">Affectionately known as the Metro Map, this visualization tool helps employees see their growth options while giving leadership clear insights into talent mobility.</p>
        <div class="flex justify-between items-center">
          <span class="bg-secondary/20 px-4 py-1 rounded-full text-sm">Perfect for talent mobility</span>
          <a href="#" class="text-primary hover:underline flex items-center gap-1">
            See how Company did it <ArrowRight class="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <div class="border border-border p-6 rounded-xl">
        <h3 class="text-2xl font-semibold mb-3">Personal Identity Scan</h3>
        <p class="mb-4">Dig deeper than outdated competency models, uncovering the unique blend of talents, motivations, and work preferences that define each employee's strengths.</p>
        <div class="flex justify-between items-center">
          <span class="bg-secondary/20 px-4 py-1 rounded-full text-sm">Perfect for personal growth</span>
          <a href="#" class="text-primary hover:underline flex items-center gap-1">
            See how Company did it <ArrowRight class="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <div class="border border-border p-6 rounded-xl">
        <h3 class="text-2xl font-semibold mb-3">Team Dynamics Scan</h3>
        <p class="mb-4">Build on personal identity scans to map out how teams collaborate, adapt, and perform as a collective. Includes interaction patterns, communication styles and all the little things that make work work—together.</p>
        <div class="flex justify-between items-center">
          <span class="bg-secondary/20 px-4 py-1 rounded-full text-sm">Perfect for team optimization</span>
          <a href="#" class="text-primary hover:underline flex items-center gap-1">
            See how Company did it <ArrowRight class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
    
    <div class="mt-12 p-6 bg-secondary/10 rounded-lg">
      <blockquote class="text-xl italic mb-4">
        "The Team Dynamics Scan revealed collaboration patterns we never noticed before. We restructured two key teams based on the insights and saw productivity jump 28% in just one quarter."
      </blockquote>
      <div class="flex items-center">
        <span class="font-medium">Client McPerson</span>
        <span class="mx-2">-</span>
        <span class="text-muted-foreground">CTO, Acme Corp</span>
      </div>
    </div>
    
    <div class="mt-12 text-center">
      <h3 class="text-xl font-medium mb-4">Let us show you our tech in action</h3>
      <a href="#book-demo" class="bg-primary text-primary-foreground px-6 py-3 inline-flex items-center gap-2 rounded-lg hover:bg-primary/90 transition-colors">
        Book a Demo <ArrowRight class="w-4 h-4" />
      </a>
    </div>
  </section>
  
  <!-- Performance Programs Section -->
  <section id="performance-programs" class="mb-24 scroll-mt-24">
    <h2 class="text-4xl font-bold mb-6">Performance Programs</h2>
    <p class="text-lg text-muted-foreground mb-8">Structured deep dives that link development, to transformation, to business results.</p>
    
    <div class="grid md:grid-cols-3 gap-8">
      <div class="border border-border p-6 rounded-xl">
        <h3 class="text-2xl font-semibold mb-3">Personal performance</h3>
        <p class="mb-6">From talent to mastery. Personal growth fuels business success. We develop individuals who lead with impact, sharpen their expertise, and drive results.</p>
        <a href="#" class="text-primary hover:underline flex items-center gap-1">
          Explore <ArrowRight class="w-4 h-4" />
        </a>
      </div>
      
      <div class="border border-border p-6 rounded-xl">
        <h3 class="text-2xl font-semibold mb-3">Team performance</h3>
        <p class="mb-6">Stronger teams, better outcomes. We break down silos, realign roles, and turn collaboration into momentum for lasting results.</p>
        <a href="#" class="text-primary hover:underline flex items-center gap-1">
          Explore <ArrowRight class="w-4 h-4" />
        </a>
      </div>
      
      <div class="border border-border p-6 rounded-xl">
        <h3 class="text-2xl font-semibold mb-3">Organizational performance</h3>
        <p class="mb-6">From strategy to execution. When people, teams, and business goals align, real impact follows. We build adaptive organizations that sustain performance.</p>
        <a href="#" class="text-primary hover:underline flex items-center gap-1">
          Explore <ArrowRight class="w-4 h-4" />
        </a>
      </div>
    </div>
    
    <div class="mt-12 p-6 bg-muted/30 rounded-lg text-center">
      <h3 class="text-2xl font-semibold mb-4">All learning solutions follow the People-Powered Performance Cycle</h3>
      <p class="mb-6">Our battle-tested philosophy ensures development isn't just an event, but a continuous driver of growth and adaptability.</p>
      <a href="#" class="text-primary hover:underline flex items-center justify-center gap-1">
        Learn about our approach <ArrowRight class="w-4 h-4" />
      </a>
    </div>
  </section>
  
  <!-- CTA Section -->
  <section id="book-demo" class="mb-24 scroll-mt-24 text-center">
    <h2 class="text-4xl font-bold mb-6">Lead with learning designed around your people</h2>
    <a href="/contact" class="bg-primary text-primary-foreground px-8 py-4 inline-flex items-center gap-2 rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium">
      Let's Talk <ArrowRight class="w-5 h-5" />
    </a>
  </section>
</div>