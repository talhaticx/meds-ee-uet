import fs from 'fs/promises';
import path from 'path';

const sharedCodeBlock = `
\`\`\`verilog
module pipeline_top (
  input  logic        clk,
  input  logic        rst_n,
  output logic [31:0] trace
);
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      trace <= '0;
    end else begin
      trace <= trace + 32'd1;
    end
  end
endmodule
\`\`\`
`;

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    await fs.writeFile(destPath, Buffer.from(buffer));
    console.log(`Downloaded: ${destPath}`);
  } catch (err) {
    console.error(`Failed to download ${url}: ${err.message}`);
  }
}

async function seed() {
  // Members
  const members = [
    {
      slug: 'amina-shah',
      name: 'Dr. Amina Shah',
      role: 'Director, Chip Design Research Center',
      bio: 'Leads the center’s ASIC roadmap with a focus on low-power RISC-V systems and hardware security.',
      linkedin: 'https://www.linkedin.com/',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
      imageAlt: 'Portrait of Dr. Amina Shah',
    },
    {
      slug: 'bilal-khan',
      name: 'Engr. Bilal Khan',
      role: 'Silicon Verification Lead',
      bio: 'Coordinates RTL verification, regression infrastructure, and sign-off readiness for tape-out candidates.',
      linkedin: 'https://www.linkedin.com/',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
      imageAlt: 'Portrait of Bilal Khan',
    },
    {
      slug: 'sara-iqbal',
      name: 'Sara Iqbal',
      role: 'FPGA Prototyping Engineer',
      bio: 'Builds accelerator prototypes and benchmark harnesses for compute-heavy research demonstrators.',
      linkedin: 'https://www.linkedin.com/',
      imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80',
      imageAlt: 'Portrait of Sara Iqbal',
    },
    {
      slug: 'zain-abbas',
      name: 'Zain Abbas',
      role: 'Research Assistant',
      bio: 'Works on open-source EDA flows, SoC integration, and documentation for reproducible hardware builds.',
      linkedin: 'https://www.linkedin.com/',
      imageUrl: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
      imageAlt: 'Portrait of Zain Abbas',
    },
  ];

  for (let [i, m] of members.entries()) {
    const ext = '.jpg';
    const imageFilename = `${m.slug}${ext}`;
    if (m.imageUrl) await downloadImage(m.imageUrl, path.join('src/assets/images/members', imageFilename));
    
    const yaml = `name: ${m.name}
role: "${m.role}"
bio: "${m.bio}"
linkedin: ${m.linkedin}
image: ${imageFilename}
imageAlt: "${m.imageAlt}"
sortOrder: ${i + 1}
`;
    await fs.writeFile(`src/content/members/${m.slug}.yaml`, yaml);
  }

  // Posts
  const posts = [
    {
      title: 'Tape-out Readiness for the Spring RISC-V Core',
      slug: 'tapeout-readiness-spring-riscv-core',
      publishedAt: '2026-05-14T10:00:00.000Z',
      author: 'amina-shah',
      mainImageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
      mainImageAlt: 'Chip design workspace with monitors and circuit boards',
      excerpt: 'We closed timing on the control plane, tightened the power grid, and completed pre-layout verification across the final branch of the core.',
      content: `We closed timing on the control plane, tightened the power grid, and completed pre-layout verification across the final branch of the core.

The latest milestone was a full regression pass across synthesis, STA, and gate-level simulation. We also tuned the memory subsystem to avoid back-pressure when the accelerator queue is saturated.

![Laboratory hardware close-up](../../assets/images/posts/lab-hardware.jpg)

${sharedCodeBlock}
`
    },
    {
      title: 'Bringing the Accelerator Lab Up to Speed',
      slug: 'accelerator-lab-up-to-speed',
      publishedAt: '2026-04-21T09:30:00.000Z',
      author: 'sara-iqbal',
      mainImageUrl: 'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=1600&q=80',
      mainImageAlt: 'FPGA boards and instruments on a workbench',
      excerpt: 'A new cluster of FPGA boards now drives overnight kernel profiling and throughput experiments for the center’s research projects.',
      content: `A new cluster of FPGA boards now drives overnight kernel profiling and throughput experiments for the center’s research projects.

The lab upgrade adds deterministic power delivery, shared logging, and a single dashboard for comparing different bitstreams against the same dataset.`
    },
    {
      title: 'Workshop Notes: Open Hardware Flows for Students',
      slug: 'workshop-notes-open-hardware-flows',
      publishedAt: '2026-03-08T12:15:00.000Z',
      author: 'zain-abbas',
      mainImageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
      mainImageAlt: 'Students collaborating around a laptop',
      excerpt: 'Students walked through RTL coding, simulation, synthesis, and packaging their first verifiable hardware design.',
      content: `Students walked through RTL coding, simulation, synthesis, and packaging their first verifiable hardware design.`
    }
  ];

  await downloadImage('https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80', 'src/assets/images/posts/lab-hardware.jpg');

  for (let p of posts) {
    const ext = '.jpg';
    const imageFilename = `${p.slug}${ext}`;
    if (p.mainImageUrl) await downloadImage(p.mainImageUrl, path.join('src/assets/images/posts', imageFilename));
    
    const mdoc = `---
title: "${p.title}"
publishedAt: '${p.publishedAt}'
author: ${p.author}
mainImage: ${imageFilename}
mainImageAlt: "${p.mainImageAlt}"
excerpt: "${p.excerpt}"
---
${p.content}
`;
    await fs.writeFile(`src/content/posts/${p.slug}.mdoc`, mdoc);
  }

  // Projects
  const projects = [
    {
      title: 'Aurora RISC-V SoC',
      slug: 'aurora-risc-v-soc',
      status: 'Active',
      abstract: 'A compact 64-bit RISC-V system with custom memory protection, DMA support, and a power-aware interconnect.',
      techStack: ['Verilog', 'SystemVerilog', 'RISC-V', 'FPGA'],
      heroImageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80',
      heroImageAlt: 'FPGA board and wiring on a bench',
      content: `Aurora is the center’s flagship SoC effort and the main proving ground for tape-out methodology.

The current branch integrates a secure boot path, a dual-port scratchpad, and a bus fabric built for timing closure on the target process node.

${sharedCodeBlock}
`
    },
    {
      title: 'TensorEdge FPGA Accelerator',
      slug: 'tensoredge-fpga-accelerator',
      status: 'Completed',
      abstract: 'An FPGA accelerator for edge inference benchmarks with tuned datapaths for matrix-heavy workloads.',
      techStack: ['VHDL', 'HLS', 'FPGA', 'Python'],
      heroImageUrl: 'https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?auto=format&fit=crop&w=1600&q=80',
      heroImageAlt: 'Electronics and FPGA development boards',
      content: `TensorEdge shows how a small hardware team can package a production-quality accelerator for teaching and research.`
    },
    {
      title: 'NoC Instrumentation Suite',
      slug: 'noc-instrumentation-suite',
      status: 'Active',
      abstract: 'A reusable on-chip network tracing toolkit for profiling congestion, latency, and bandwidth hotspots.',
      techStack: ['SystemVerilog', 'Python', 'Chipyard'],
      heroImageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80',
      heroImageAlt: 'Silicon prototyping area',
      content: `The suite helps students and staff compare routing strategies and validate changes to the NoC fabric.`
    }
  ];

  for (let [i, p] of projects.entries()) {
    const ext = '.jpg';
    const imageFilename = `${p.slug}${ext}`;
    if (p.heroImageUrl) await downloadImage(p.heroImageUrl, path.join('src/assets/images/projects', imageFilename));
    
    const mdoc = `---
title: "${p.title}"
status: ${p.status}
abstract: "${p.abstract}"
techStack:
${p.techStack.map(t => `  - ${t}`).join('\\n')}
heroImage: ${imageFilename}
heroImageAlt: "${p.heroImageAlt}"
featuredOrder: ${i + 1}
---
${p.content}
`;
    await fs.writeFile(`src/content/projects/${p.slug}.mdoc`, mdoc);
  }

  // Publications
  const publications = [
    {
      title: 'A Low-Power RISC-V Core for University Tape-Out Labs',
      authors: 'A. Shah, B. Khan, S. Iqbal',
      publishedDate: '2026-02-01',
      venue: 'IEEE International Symposium on Circuits and Systems',
      link: 'https://ieeexplore.ieee.org/',
    },
    {
      title: 'FPGA Prototyping Strategies for Accelerator-Centric Research',
      authors: 'S. Iqbal, Z. Abbas',
      publishedDate: '2025-11-18',
      venue: 'ACM/SIGDA Student Research Forum',
      link: 'https://example.com/paper.pdf',
    },
    {
      title: 'Open-Source Verification Pipelines for Emerging Silicon Teams',
      authors: 'B. Khan, A. Shah',
      publishedDate: '2025-09-09',
      venue: 'Design Automation Conference Workshop',
      link: 'https://example.com/paper.pdf',
    },
  ];

  for (let p of publications) {
    const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const yaml = `title: "${p.title}"
authors: "${p.authors}"
publishedDate: '${p.publishedDate}'
venue: "${p.venue}"
link: "${p.link}"
`;
    await fs.writeFile(`src/content/publications/${slug}.yaml`, yaml);
  }

  // Activities
  const activities = [
    {
      title: 'Open Hardware Hack Night',
      date: '2026-06-10T18:00:00.000Z',
      location: 'Chip Design Lab 2',
      description: 'Teams built register maps, debugged bus bridges, and demoed first-pass FPGA synth results.',
      imageGallery: [
        {
          url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
          alt: 'Students collaborating in a workshop space',
        },
      ],
    },
    {
      title: 'RISC-V Bring-Up Workshop',
      date: '2026-05-01T09:00:00.000Z',
      location: 'Engineering Auditorium',
      description: 'A hands-on session covering ISA basics, simulation, synthesis, and first boot firmware.',
      imageGallery: [
        {
          url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
          alt: 'Workshop attendees listening to a presentation',
        },
      ],
    },
    {
      title: 'Tape-out Planning Review',
      date: '2026-03-18T14:30:00.000Z',
      location: 'Center Conference Room',
      description: 'Faculty and students reviewed target-node constraints, package options, and verification milestones.',
      imageGallery: [
        {
          url: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80',
          alt: 'Planning session around a conference table',
        },
      ],
    },
  ];

  for (let a of activities) {
    const slug = a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let images = [];
    for (let [i, img] of a.imageGallery.entries()) {
      const filename = `${slug}-${i}.jpg`;
      await downloadImage(img.url, path.join('src/assets/images/activities', filename));
      images.push({ image: filename, alt: img.alt });
    }
    
    const yaml = `title: "${a.title}"
date: '${a.date}'
location: "${a.location}"
description: "${a.description}"
imageGallery:
${images.map(img => `  - image: ${img.image}\n    alt: "${img.alt}"`).join('\n')}
`;
    await fs.writeFile(`src/content/activities/${slug}.yaml`, yaml);
  }

}

seed().then(() => console.log('Done'));
