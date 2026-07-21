const fs = require('fs');
const path = require('path');

const projectDir = '/home/talha/Dev/meds-ee-uet/src/content/projects';

// Remove old files
const files = fs.readdirSync(projectDir);
for (const file of files) {
  fs.unlinkSync(path.join(projectDir, file));
}

const projectsData = [
  {
    slug: 'uetrv-esoc',
    title: 'UETRV_ESoC',
    members: 'Abdul Wadood, Ali Imran, Junaid Amjad',
    advisor: 'Umer Shahid',
    status: 'Completed',
    link: 'https://github.com/ee-uet/UETRV_ESoC'
  },
  {
    slug: 'sermo-soc',
    title: 'Sermo- SoC',
    members: 'Umer Shahid',
    advisor: 'Dr. M Tahir',
    status: 'Completed',
    link: 'https://github.com/ee-uet/sermo_soc'
  },
  {
    slug: 'uetrv-pcore',
    title: 'UETRV-PCORE',
    members: 'Umer Shahid, Ali Imran, Abdul Wadood, Shehzeen Malik',
    advisor: 'Dr. M Tahir',
    status: 'Completed',
    link: 'https://github.com/ee-uet/UETRV-PCore'
  },
  {
    slug: 'uetrv-mcu',
    title: 'UETRV_MCU',
    members: 'Aman Murad, Shehzeen Malik',
    advisor: 'Dr. M Tahir',
    status: 'Completed',
    link: 'https://github.com/meds-uet/UET-RVMCU'
  },
  {
    slug: 'riscv-vector-accelerator',
    title: 'Design & Implementation of RISC-V Vector Accelerator',
    members: 'Rehan Qasim, Asmara Rauf, Taimoor Hassan, Abdul Waheed',
    advisor: 'Dr. M Tahir',
    status: 'Completed',
    link: 'https://github.com/RehanQasim-dev/Optimizing-RISC-V-for-High-Performance-Matrix-Multiplication-with-Custom-GEMM-Accelerator'
  },
  {
    slug: 'riscv-privilege-arch-acts',
    title: 'RISC-V Privilege Architecture Compliance Test Generator',
    members: 'M. Hammad Bashir, Wasif Ali, Dawood Khan',
    advisor: 'Umer Shahid',
    status: 'Completed',
    link: 'https://github.com/meds-uet'
  },
  {
    slug: 'gem5-riscv-core-modeling',
    title: 'Modelling RISC-V Core on gem5',
    members: 'Ayesha Ahmed, Shanzay Wasim, Bisal Saeed',
    advisor: 'Umer Shahid',
    status: 'Completed',
    link: 'https://lnkd.in/gqu8JcG6'
  },
  {
    slug: 'triton-router-acceleration',
    title: 'Turbocharging Triton Router for Accelerated Run Time',
    members: 'Moavia Adeel, Muhammad Abdullah, Muhammad Faizan',
    advisor: 'Dr. Ubaidullah Fiaz',
    status: 'Completed',
    link: 'https://github.com/meds-uet'
  },
  {
    slug: 'fault-tolerant-cache',
    title: 'A Fault Tolerant Cache',
    members: 'Arhum Ahmed, Muhammad Waseem, Muhammad Huzaifa, Uzair Ahmed Hamayun',
    advisor: 'Dr. Ubaidullah Fiaz',
    status: 'Completed',
    link: 'https://github.com/meds-uet'
  },
  {
    slug: 'spi-uart-pcore-integration',
    title: 'Integrating SPI and UART to PCore',
    members: 'Aman Murad, Shehzeen Malik',
    advisor: 'Umer Shahid',
    status: 'Completed',
    link: 'https://ee.uet.edu.pk/meds/spi-uart-pcore/'
  },
  {
    slug: 'virtual-memory-compliance-riscv',
    title: 'Virtual Memory Compliance with RISC-V',
    members: 'Wajid Ali, Masooma Zia, Uneeb Kamal, Abdullah Azhar',
    advisor: 'Umer Shahid',
    status: 'Completed',
    link: 'https://drive.google.com/file/d/10-nmQHGd4OnKpi1_Z6zalUvhDI05wip7/view'
  },
  {
    slug: 'uetrv-pcore-linux-boot',
    title: 'UET-RV-PCore Linux Boot',
    members: 'Wajid Ali, Masooma Zia, Uneeb Kamal, Abdullah Azhar',
    advisor: 'Umer Shahid, Dr. M. Tahir',
    status: 'Completed',
    link: 'https://github.com/wajidali4907/UETRV-PCORE-Linux'
  },
  {
    slug: 'multicore-cache-coherence',
    title: 'Multi Core Cache Coherence',
    members: 'Abeera Adnan, Ammar Saqib, Muhammad Zeeshan Malik',
    advisor: 'Umer Shahid, Dr. M. Tahir',
    status: 'Completed',
    link: 'https://drive.google.com/file/d/1bZ-FsxCNwrSkkj38Fpz67WBOncrTOgpY/view'
  },
  {
    slug: 'ip-core-vector-processor',
    title: 'IP Core Design for Vector Processor Components',
    members: 'Fazail Ali Butt, Shanzay Wasim, Zawaher Bin Asim, Muhammad Bilal Matloob',
    advisor: 'Dr. Ubaidullah Fayyaz',
    status: 'Completed',
    link: 'https://drive.google.com/file/d/1sOuJB73zMliu1fMbFM8VSu5q5ErJawqs/view'
  },
  {
    slug: 'h264-fpga-encoder',
    title: 'FPGA-Based Implementation of H.264 Encoder for Interframe Compression',
    members: 'Muhammad Ramzan, Moazzam Ali, Salman Saeed, Muhammad Bilal Ikram',
    advisor: 'Dr. M Tahir',
    status: 'Completed',
    link: 'https://drive.google.com/file/d/1Qz2mH7S58_QxRhBOX4Np5cKS7S3nUc5z/view'
  },
  {
    slug: 'placement-routing-pcore',
    title: 'Placement and Routing of UETRV-PCore',
    members: 'Abdullah Azhar, Wajid Ali, Uneed Kamal, Sir Saad Hashim Gillani',
    advisor: 'Dr. Suleman Sami Qazi',
    status: 'Completed',
    link: 'https://drive.google.com/file/d/1-VdsP2bVOGjGYEA7lFEjfijy6CIuTWxI/view'
  },
  {
    slug: 'rtl-analysis-genus-synthesis',
    title: 'RTL Analysis and Genus Synthesis of PCore',
    members: 'Masooma Zia, Eman Ijaz, Abubakar Nadeem, Aman Murad',
    advisor: 'Umer Shahid',
    status: 'Completed',
    link: 'https://drive.google.com/file/d/1Or1_itCqyqj-QQER6MlVouuHjjl0r9gM/view'
  },
  {
    slug: 'debug-interface-pcore',
    title: 'Integration of Debug Interface in UETRV-PCore',
    members: 'Muhammad Mujahid Siddiq, Umm-e-Ammara, Muhammad Faiq, Sufyan Ahmad Basra',
    advisor: 'Khalid Butt',
    status: 'Completed',
    link: 'https://drive.google.com/file/d/1jfyHT0CEkW8W3Lp6kKRYZJxRF-gaHL78/view'
  },
  {
    slug: 'tensor-array-engine',
    title: 'Cryptic Hybrid Efficient Engine for Tensor Array Processing',
    members: 'Sheheryar, Khushbakht, Waqar Ali, M. Ehsan',
    advisor: 'Dr. M Tahir',
    status: 'Completed',
    link: 'https://drive.google.com/file/d/1ofVjxlyA0USaNC1RmUpGWWYhhQn4Eu_4/view'
  },
  {
    slug: 'riscv-architectural-verification',
    title: 'RISC-V Architectural Functional Verification',
    members: 'Muhammad Zain, Abdullah, Hamza',
    advisor: 'David Harris, Umer Shahid',
    status: 'Completed',
    link: 'https://riscv-europe.org/summit/2025/posters'
  },
  {
    slug: 'zephyr-boot-pcore',
    title: 'Zephyr Boot on PCore',
    members: 'Muhammad Ramzan',
    advisor: 'Dr. M Tahir',
    status: 'Completed',
    link: 'https://ee.uet.edu.pk/meds/running-zephyr-on-uetrv-pcore-with-risc-v/'
  },
  {
    slug: 'f-extension-rvmcu',
    title: 'Adding F-Extension to RVMCU',
    members: 'Waleed Tariq, Muhammad Boota',
    advisor: 'Dr. M Tahir and Umer Shahid',
    status: 'Completed',
    link: 'https://uetpk-my.sharepoint.com/:w:/g/personal/meds_uet_edu_pk/EUD_EASqDkVDkuyRmn-VnPMBQS8RPEZ1j534d6mYR14WSQ?e=qfpXqA'
  },
  {
    slug: 'dma-controller',
    title: 'DMA Controller',
    members: 'Muhammad Mouzzam, Danish Hassan',
    advisor: 'Shehzeen Malik',
    status: 'Completed',
    link: 'https://github.com/meds-uet'
  },
  {
    slug: 'ahb-bus',
    title: 'AHB Bus',
    members: 'Muhammad Yousaf, Ali Tahir',
    advisor: 'Shehzeen Malik',
    status: 'Completed',
    link: 'https://github.com/meds-uet'
  },
  {
    slug: 'dwt-ip-development',
    title: 'DWT (Discrete Wavelet Transform) IP Development',
    members: 'Saima Khalil, Aleeza',
    advisor: 'Shehzeen Malik',
    status: 'Completed',
    link: 'https://github.com/meds-uet'
  },
  {
    slug: 'systolic-array',
    title: 'Systolic Array',
    members: 'Abdul Muiz, Muhammad Waleem Akram',
    advisor: 'Wajid Ali',
    status: 'Completed',
    link: 'https://github.com/meds-uet'
  },
  {
    slug: 'cnn-accelerator',
    title: 'CNN Accelerator',
    members: 'Abdullah Nadeem, Talha Ayyaz',
    advisor: 'Wajid Ali',
    status: 'Completed',
    link: 'https://github.com/meds-uet'
  },
  {
    slug: 'can-bus',
    title: 'CAN Bus',
    members: 'Ayesha Qadir, Aryam Shabbir, Nimra Javed',
    advisor: 'Aman Murad',
    status: 'Completed',
    link: 'https://github.com/meds-uet'
  },
  {
    slug: 'reconfigurable-cache',
    title: 'Reconfigurable Cache',
    members: 'Ayesha Anwar, Ammarah Wakeel, Eman Nasar',
    advisor: 'Aman Murad',
    status: 'Completed',
    link: 'https://github.com/meds-uet'
  },
  {
    slug: 'jpeg-encoder',
    title: 'JPEG Encoder',
    members: 'Navaal Nooshi, Rameen Khan',
    advisor: 'Aman Murad',
    status: 'Completed',
    link: 'https://github.com/meds-uet'
  },
  {
    slug: 'riscv-vector-ip-fyp',
    title: 'RISC-V Vector IP (FYP)',
    members: 'Muhammad Ahmad, Javeria, Aftab Fiaz, Muneeb Noor',
    advisor: 'Dr. M Tahir',
    status: 'Completed',
    link: 'https://github.com/meds-uet'
  },
  {
    slug: 'hypervisor-acts-fyp',
    title: 'Hypervisor ACTs (FYP)',
    members: 'Hamza Ali, Abdullah, Muhammad Zain',
    advisor: 'Umer Shahid',
    status: 'In Progress',
    link: 'https://github.com/meds-uet'
  }
];

projectsData.forEach((p, idx) => {
  const content = `title: "${p.title.replace(/"/g, '\\"')}"
members: "${p.members.replace(/"/g, '\\"')}"
advisor: "${p.advisor.replace(/"/g, '\\"')}"
status: "${p.status}"
link: "${p.link}"
sortOrder: ${idx + 1}
`;
  fs.writeFileSync(path.join(projectDir, `${p.slug}.yaml`), content, 'utf8');
});

console.log('Successfully created', projectsData.length, 'project YAML files!');
