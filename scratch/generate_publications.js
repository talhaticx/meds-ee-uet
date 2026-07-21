import fs from 'fs';
import path from 'path';

const publications = [
  {
    title: "Physical Design of UET-RVMCU: A Streamlined Open-Source RISC-V Microcontroller",
    authors: "Abdullah Azhar, Uneeb Kamal, Wajid Ali, Saad Gillani, Suleman Sami Qazi",
    venue: "WOVEN associated with ISCA",
    year: "2025",
    link: "",
    sortOrder: 1
  },
  {
    title: "Architectural Exploration and Performance Enhancement of the CVA6 RISC-V Core using the Gem5 Simulation Framework",
    authors: "Umer Shahid, Muhammad Tahir, Bilal Zafar, Ayesha Ahmad, Shanzay Wasim, and Bisal Saeed",
    venue: "IEEE Access (Journal)",
    year: "2025",
    link: "https://ieeexplore.ieee.org/abstract/document/11050389",
    sortOrder: 2
  },
  {
    title: "Static Signature Embedding: Self-Verifying RISC-V Architecture Compliance Tests",
    authors: "Muhammad Hammad Bashir, Umer Shahid, Allen Baum, and James Shi",
    venue: "RISC-V Summit China 2025",
    year: "2025",
    link: "",
    sortOrder: 3
  },
  {
    title: "Verification of CoreSwap: Replacing ARM Cortex-A5 with RISC-V CVA6 in ARM SoC Environment",
    authors: "Muhammad Hammad Bashir, Umer Shahid, Muhammad Tahir, Yazan Hussnain, and Fatima Saleem",
    venue: "RISC-V Summit Europe 2025",
    year: "2025",
    link: "https://riscv-europe.org/summit/2025/posters",
    sortOrder: 4
  },
  {
    title: "RISC-V Architectural Functional Verification",
    authors: "David Harris, Jordan Carlin, Corey Hickson, Larry Lapides, Lee Moore, Huda Sajjad, Umer Shahid, Aimee Sutton, Mike Thompson, Rose Thompson, and Muhammad Zain",
    venue: "RISC-V Summit Europe 2025",
    year: "2025",
    link: "https://riscv-europe.org/summit/2025/posters",
    sortOrder: 5
  },
  {
    title: "Gem5-Based Evaluation of CVA6 SoC: Insights into the Architectural Design",
    authors: "Umer Shahid, Ayesha Ahmad, and Shanzay Wasim",
    venue: "IEEE International Symposium on Performance Analysis of Systems and Software (ISPASS) 2024",
    year: "2024",
    link: "https://ieeexplore.ieee.org/document/10590027",
    sortOrder: 6
  },
  {
    title: "Enhancing Privilege Architecture Support in RISC-V ISAC (RISCOF)",
    authors: "Muhammad Hammad Bashir, Umer Shahid, Allen Baum, and Pawan Kumar Sanjaya",
    venue: "RISC-V Summit Europe 2024",
    year: "2024",
    link: "",
    sortOrder: 7
  },
  {
    title: "Accelerating Computer Architecture Simulation through Machine Learning",
    authors: "Wajid Ali (UET Lahore), Ayaz Akram (UC Davis)",
    venue: "CAMS (Computer Architecture Modelling and Simulation) Associated with MICRO",
    year: "2023",
    link: "https://arxiv.org/pdf/2402.18746",
    sortOrder: 8
  },
  {
    title: "Virtual Memory Verification - SV32",
    authors: "Wajid Ali, Masooma Zia, Uneeb Kamal, Abdullah Azhar",
    venue: "IEEE Elektron Magazine UET Lahore",
    year: "2023",
    link: "https://www.authorea.com/users/693095/articles/700385-virtual-memory-verification-sv32",
    sortOrder: 9
  },
  {
    title: "Democratizing IC Design: The Story of a New Movement and the Launch of the SSCS PICO Program",
    authors: "Umer Shahid",
    venue: "IEEE Solid-State Circuits Magazine, p. 123 (Journal)",
    year: "2021",
    link: "https://ieeexplore.ieee.org/document/9621274",
    sortOrder: 10
  }
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

const dir = path.join(process.cwd(), 'src/content/publications');

// Remove existing files
if (fs.existsSync(dir)) {
  fs.readdirSync(dir).forEach(file => {
    fs.unlinkSync(path.join(dir, file));
  });
} else {
  fs.mkdirSync(dir, { recursive: true });
}

publications.forEach((pub) => {
  const slug = slugify(pub.title);
  const filePath = path.join(dir, `${slug}.yml`);
  
  const content = `title: "${pub.title.replace(/"/g, '\\"')}"
authors: "${pub.authors.replace(/"/g, '\\"')}"
venue: "${pub.venue.replace(/"/g, '\\"')}"
year: "${pub.year}"
link: "${pub.link}"
sortOrder: ${pub.sortOrder}
`;

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`Successfully created ${publications.length} publication YAML files!`);
