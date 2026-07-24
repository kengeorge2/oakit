'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from './profile.module.css';

function SvgServerRack() {
  return (
    <svg viewBox="0 0 220 160" role="img" aria-label="Server rack">
      <text className={styles.galLabel} x="78" y="12">RACK-A</text>
      <rect className={styles.galA} x="78" y="20" width="64" height="120" rx="3" />
      <line className={styles.galB} x1="85" y1="36" x2="135" y2="36" />
      <line className={styles.galB} x1="85" y1="52" x2="135" y2="52" />
      <line className={styles.galB} x1="85" y1="68" x2="135" y2="68" />
      <line className={styles.galB} x1="85" y1="84" x2="135" y2="84" />
      <line className={styles.galB} x1="85" y1="100" x2="135" y2="100" />
      <line className={styles.galB} x1="85" y1="116" x2="135" y2="116" />
      <circle className={styles.galF} cx="130" cy="28" r="2" />
      <circle className={styles.galF} cx="130" cy="44" r="2" />
      <circle className={styles.galF} cx="130" cy="60" r="2" />
      <line className={styles.galB} x1="88" y1="28" x2="104" y2="28" />
      <line className={styles.galB} x1="88" y1="44" x2="104" y2="44" />
      <line className={styles.galB} x1="88" y1="60" x2="104" y2="60" />
      <path className={`${styles.galB} ${styles.galDash}`} d="M142 44 C 172 52, 172 96, 146 104" />
      <line className={styles.galA} x1="58" y1="146" x2="162" y2="146" />
    </svg>
  );
}

function SvgCabling() {
  return (
    <svg viewBox="0 0 220 160" role="img" aria-label="Patch panel cabling">
      <text className={styles.galLabel} x="40" y="14">PATCH-01</text>
      <rect className={styles.galA} x="40" y="22" width="140" height="26" rx="3" />
      <rect className={styles.galB} x="50" y="30" width="10" height="9" />
      <rect className={styles.galB} x="66" y="30" width="10" height="9" />
      <rect className={styles.galB} x="82" y="30" width="10" height="9" />
      <rect className={styles.galB} x="98" y="30" width="10" height="9" />
      <rect className={styles.galB} x="114" y="30" width="10" height="9" />
      <rect className={styles.galB} x="130" y="30" width="10" height="9" />
      <rect className={styles.galB} x="146" y="30" width="10" height="9" />
      <path className={styles.galA} d="M56 39 C 48 60, 52 90, 36 110" />
      <path className={styles.galA} d="M72 39 C 64 70, 70 100, 56 130" />
      <path className={styles.galA} d="M88 39 C 82 55, 88 80, 74 100" />
      <path className={styles.galA} d="M104 39 C 102 50, 96 58, 82 72" />
      <path className={styles.galB} d="M120 39 C 128 60, 118 90, 134 110" />
      <path className={styles.galB} d="M136 39 C 144 70, 138 100, 152 130" />
      <path className={styles.galB} d="M152 39 C 158 55, 152 80, 166 100" />
      <path className={styles.galB} d="M168 39 C 170 50, 176 58, 190 72" />
      <circle className={styles.galF} cx="36" cy="110" r="3" />
      <circle className={styles.galF} cx="56" cy="130" r="3" />
      <circle className={styles.galF} cx="74" cy="100" r="3" />
      <circle className={styles.galF} cx="82" cy="72" r="3" />
      <circle className={styles.galF} cx="134" cy="110" r="3" />
      <circle className={styles.galF} cx="152" cy="130" r="3" />
      <circle className={styles.galF} cx="166" cy="100" r="3" />
      <circle className={styles.galF} cx="190" cy="72" r="3" />
    </svg>
  );
}

function SvgWorkstations() {
  return (
    <svg viewBox="0 0 220 160" role="img" aria-label="Workstations">
      <text className={styles.galLabel} x="70" y="14">WS-05</text>
      <rect className={styles.galA} x="18" y="26" width="80" height="56" rx="3" />
      <rect className={styles.galA} x="122" y="26" width="80" height="56" rx="3" />
      <rect className={styles.galB} x="24" y="32" width="68" height="38" rx="2" />
      <rect className={styles.galB} x="128" y="32" width="68" height="38" rx="2" />
      <rect className={styles.galF} x="44" y="86" width="28" height="6" rx="2" />
      <rect className={styles.galF} x="148" y="86" width="28" height="6" rx="2" />
      <rect className={styles.galB} x="38" y="96" width="40" height="4" rx="1" />
      <rect className={styles.galB} x="142" y="96" width="40" height="4" rx="1" />
      <rect className={styles.galA} x="10" y="106" width="200" height="4" rx="2" />
      <line className={styles.galB} x1="58" y1="92" x2="58" y2="106" />
      <line className={styles.galB} x1="162" y1="92" x2="162" y2="106" />
    </svg>
  );
}

function SvgCctv() {
  return (
    <svg viewBox="0 0 220 160" role="img" aria-label="CCTV installation">
      <text className={styles.galLabel} x="78" y="14">CCTV-03</text>
      <circle className={styles.galA} cx="110" cy="60" r="40" />
      <circle className={styles.galB} cx="110" cy="60" r="28" />
      <circle className={styles.galF} cx="110" cy="60" r="6" />
      <rect className={styles.galA} x="104" y="20" width="12" height="12" rx="2" />
      <line className={styles.galA} x1="110" y1="20" x2="110" y2="0" />
      <rect className={styles.galB} x="60" y="10" width="20" height="16" rx="2" />
      <rect className={styles.galB} x="140" y="10" width="20" height="16" rx="2" />
      <line className={styles.galB} x1="110" y1="100" x2="110" y2="140" />
      <path className={styles.galA} d="M50 140 C 50 148, 60 152, 110 152 C 160 152, 170 148, 170 140" />
      <rect className={styles.galB} x="106" y="130" width="8" height="10" rx="1" />
    </svg>
  );
}

function SvgVsat() {
  return (
    <svg viewBox="0 0 220 160" role="img" aria-label="VSAT installation">
      <text className={styles.galLabel} x="78" y="14">VSAT-01</text>
      <ellipse className={styles.galA} cx="110" cy="76" rx="60" ry="26" />
      <ellipse className={styles.galB} cx="110" cy="66" rx="60" ry="26" />
      <line className={styles.galA} x1="110" y1="50" x2="110" y2="10" />
      <circle className={styles.galF} cx="110" cy="50" r="5" />
      <line className={styles.galA} x1="68" y1="66" x2="110" y2="102" />
      <line className={styles.galA} x1="152" y1="66" x2="110" y2="102" />
      <rect className={styles.galB} x="104" y="104" width="12" height="14" rx="2" />
      <rect className={styles.galB} x="98" y="118" width="24" height="8" rx="2" />
      <rect className={styles.galA} x="88" y="128" width="44" height="6" rx="2" />
      <line className={styles.galB} x1="110" y1="40" x2="90" y2="26" />
      <line className={styles.galB} x1="110" y1="40" x2="130" y2="26" />
      <rect className={styles.galB} x="86" y="22" width="8" height="8" rx="1" />
      <rect className={styles.galB} x="126" y="22" width="8" height="8" rx="1" />
    </svg>
  );
}

function SvgNetworking() {
  return (
    <svg viewBox="0 0 220 160" role="img" aria-label="Networking equipment">
      <text className={styles.galLabel} x="54" y="14">SW-01</text>
      <rect className={styles.galA} x="32" y="24" width="156" height="32" rx="3" />
      <rect className={styles.galB} x="38" y="30" width="16" height="20" rx="2" />
      <rect className={styles.galB} x="60" y="30" width="16" height="20" rx="2" />
      <rect className={styles.galB} x="82" y="30" width="16" height="20" rx="2" />
      <rect className={styles.galB} x="104" y="30" width="16" height="20" rx="2" />
      <rect className={styles.galB} x="126" y="30" width="16" height="20" rx="2" />
      <rect className={styles.galB} x="148" y="30" width="16" height="20" rx="2" />
      <circle className={styles.galF} cx="46" cy="40" r="3" />
      <circle className={styles.galF} cx="68" cy="40" r="3" />
      <circle className={styles.galF} cx="90" cy="40" r="3" />
      <circle className={styles.galF} cx="112" cy="40" r="3" />
      <circle className={styles.galF} cx="134" cy="40" r="3" />
      <circle className={styles.galF} cx="156" cy="40" r="3" />
      <rect className={styles.galB} x="42" y="64" width="30" height="6" rx="1" />
      <rect className={styles.galB} x="148" y="64" width="30" height="6" rx="1" />
      <rect className={styles.galA} x="24" y="76" width="172" height="24" rx="3" />
      <rect className={styles.galB} x="30" y="82" width="12" height="12" rx="1" />
      <rect className={styles.galB} x="48" y="82" width="12" height="12" rx="1" />
      <rect className={styles.galB} x="66" y="82" width="12" height="12" rx="1" />
      <rect className={styles.galB} x="84" y="82" width="12" height="12" rx="1" />
      <rect className={styles.galB} x="102" y="82" width="12" height="12" rx="1" />
      <rect className={styles.galB} x="120" y="82" width="12" height="12" rx="1" />
      <rect className={styles.galB} x="138" y="82" width="12" height="12" rx="1" />
      <rect className={styles.galB} x="156" y="82" width="12" height="12" rx="1" />
      <rect className={styles.galB} x="174" y="82" width="12" height="12" rx="1" />
      <rect className={styles.galA} x="40" y="108" width="140" height="20" rx="3" />
      <rect className={styles.galB} x="48" y="114" width="20" height="8" rx="1" />
      <rect className={styles.galB} x="76" y="114" width="20" height="8" rx="1" />
      <rect className={styles.galB} x="104" y="114" width="20" height="8" rx="1" />
      <rect className={styles.galB} x="132" y="114" width="20" height="8" rx="1" />
      <rect className={styles.galB} x="160" y="114" width="12" height="8" rx="1" />
    </svg>
  );
}

function SvgStructuredCabling() {
  return (
    <svg viewBox="0 0 220 160" role="img" aria-label="Structured cabling">
      <text className={styles.galLabel} x="38" y="14">CABLING</text>
      <rect className={styles.galA} x="20" y="24" width="180" height="4" rx="1" />
      <rect className={styles.galA} x="40" y="40" width="140" height="4" rx="1" />
      <rect className={styles.galA} x="60" y="56" width="100" height="4" rx="1" />
      <rect className={styles.galA} x="80" y="72" width="60" height="4" rx="1" />
      <rect className={styles.galB} x="100" y="88" width="20" height="40" rx="2" />
      <rect className={styles.galB} x="95" y="130" width="30" height="6" rx="2" />
      <line className={styles.galB} x1="110" y1="88" x2="110" y2="72" />
      <line className={styles.galA} x1="110" y1="56" x2="110" y2="40" />
      <line className={styles.galA} x1="110" y1="40" x2="110" y2="24" />
      <line className={`${styles.galB} ${styles.galDash}`} x1="40" y1="28" x2="40" y2="44" />
      <line className={`${styles.galB} ${styles.galDash}`} x1="180" y1="28" x2="180" y2="44" />
      <line className={`${styles.galB} ${styles.galDash}`} x1="60" y1="44" x2="60" y2="60" />
      <line className={`${styles.galB} ${styles.galDash}`} x1="160" y1="44" x2="160" y2="60" />
      <line className={`${styles.galB} ${styles.galDash}`} x1="80" y1="60" x2="80" y2="76" />
      <line className={`${styles.galB} ${styles.galDash}`} x1="140" y1="60" x2="140" y2="76" />
      <circle className={styles.galF} cx="110" cy="110" r="4" />
      <line className={styles.galB} x1="110" y1="114" x2="110" y2="130" />
    </svg>
  );
}

export default function CompanyProfile() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.rvIn);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    const els = document.querySelectorAll(`.${styles.rv}`);
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const animCount = (el: HTMLElement) => {
      const to = parseInt(el.getAttribute('data-to') || '0', 10);
      const dur = 1500;
      let t0: number | null = null;
      const f = (t: number) => {
        if (!t0) t0 = t;
        const p = Math.min(1, (t - t0) / dur);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * ease).toString();
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    };

    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-to]').forEach((el) => {
              animCount(el as HTMLElement);
            });
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    const statGrid = document.querySelector(`.${styles.statgrid}`);
    if (statGrid) cio.observe(statGrid);

    return () => cio.disconnect();
  }, []);

  const handleDownloadPDF = async () => {
    if (!wrapperRef.current) return;
    setIsLoading(true);
    try {
      const element = wrapperRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }

      pdf.save('OAK-IT-Company-Profile.pdf');
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>

      {/* Progress bar */}
      <div className={styles.progress} ref={progressRef} />

      {/* ====== COVER ====== */}
      <section className={`${styles.section} ${styles.cover} ${styles.dark}`} id="top">
        <div className={styles.wrap}>
          <div className={styles.topstrip}>
            <span>COMPANY PROFILE &middot; KAMPALA, UGANDA</span>
            <span>EST. 2015 &middot; REG 80010000953729 &middot; TIN 1009657242</span>
          </div>
          <div className={styles.covergrid}>
            <div className={`${styles.rv} ${styles.rvIn}`}>
              <p className={styles.eyebrow}>INFORMATION TECHNOLOGY &middot; SINCE 2015</p>
              <h1 className={styles.wordmark}>
                OAK IT<br />Solutions <em>&amp;</em> Supplies
              </h1>
              <p className={styles.wordsub}>Consult &middot; Build &middot; Secure &middot; Support</p>
              <p className={styles.tagline}>
                Revolutionizing business through cutting-edge technology solutions — helping organizations cut costs, increase efficiency and grow their return on investment.
              </p>
            </div>
            <aside className={`${styles.facts} ${styles.corner} ${styles.rv} ${styles.rvIn} ${styles.d1}`}>
              <h2>KEY FACTS</h2>
              <dl className={styles.factsDl}>
                <div className={styles.frow}>
                  <dt className={styles.frowDt}>Founded</dt>
                  <dd className={styles.frowDd}>2015 &middot; Kampala, Uganda</dd>
                </div>
                <div className={styles.frow}>
                  <dt className={styles.frowDt}>Founders</dt>
                  <dd className={styles.frowDd}>
                    Ms. Beatrice Baguma<br />Mr. Kenneth Okello
                  </dd>
                </div>
                <div className={styles.frow}>
                  <dt className={styles.frowDt}>Reg No.</dt>
                  <dd className={styles.frowDd}>80010000953729</dd>
                </div>
                <div className={styles.frow}>
                  <dt className={styles.frowDt}>TIN</dt>
                  <dd className={styles.frowDd}>1009657242</dd>
                </div>
                <div className={styles.frow}>
                  <dt className={styles.frowDt}>Bank</dt>
                  <dd className={styles.frowDd}>Bank of Africa &ndash; Ntinda</dd>
                </div>
                <div className={styles.frow}>
                  <dt className={styles.frowDt}>Head Office</dt>
                  <dd className={styles.frowDd}>
                    Plot 246 Kyebando Central Rd,<br />next to Total Bahai, Kampala
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
          <div className={styles.coverfoot}>
            <span className={styles.chip}><b>100+</b> CLIENTS SERVED</span>
            <span className={styles.chip}><b>10+</b> YEARS EXPERIENCE</span>
            <span className={styles.chip}><b>24/7</b> MONITORING &amp; SUPPORT</span>
            <span className={styles.scrollhint}>SCROLL &darr;</span>
          </div>
        </div>
      </section>

      {/* ====== OVERVIEW ====== */}
      <section className={`${styles.section} ${styles.sec} ${styles.paper}`} id="overview">
        <div className={styles.wrap}>
          <div className={`${styles.sechead} ${styles.rv}`}>
            <span className={styles.idx}>01</span>
            <h2 className={styles.sech2}>Company Overview</h2>
            <span className={styles.rule} />
          </div>
          <p className={`${styles.secsub} ${styles.rv}`}>Who we are &middot; Mission &middot; Vision</p>
          <div className={styles.ovgrid}>
            <p className={`${styles.lead} ${styles.dropcap} ${styles.rv}`}>
              OAK IT Solutions and Supplies, established in <strong>2015</strong>, is a leading Information Technology legal entity based in <strong>Kampala, Uganda</strong>. The company is dedicated to providing top-notch IT solutions and addressing complex business challenges. By leveraging the power of technology and innovation, OAK IT Solutions aims to help organizations <strong>cut costs, increase efficiency</strong>, and ultimately improve their <strong>Return on Investment (ROI)</strong>.
            </p>
            <div className={styles.mv}>
              <div className={`${styles.mvcard} ${styles.mission} ${styles.rv} ${styles.d1}`}>
                <h3>OUR MISSION</h3>
                <p>To provide exceptional value for every dollar spent, and to exceed our own expectations as well as those of our clients.</p>
              </div>
              <div className={`${styles.mvcard} ${styles.vision} ${styles.rv} ${styles.d2}`}>
                <h3>OUR VISION</h3>
                <p>To revolutionize the business landscape by integrating cutting-edge technology solutions.</p>
              </div>
            </div>
          </div>
          <div className={styles.why}>
            <div className={`${styles.whyrow} ${styles.rv}`}>
              <span className={styles.whyN}>A&mdash;01</span>
              <h4 className={styles.whyH4}>Customer Service</h4>
              <p className={styles.whyP}>Exceptional customer support and dedicated service teams.</p>
            </div>
            <div className={`${styles.whyrow} ${styles.rv} ${styles.d1}`}>
              <span className={styles.whyN}>A&mdash;02</span>
              <h4 className={styles.whyH4}>Commitment to Quality</h4>
              <p className={styles.whyP}>Commitment to delivering high-quality services and products.</p>
            </div>
            <div className={`${styles.whyrow} ${styles.rv} ${styles.d2}`}>
              <span className={styles.whyN}>A&mdash;03</span>
              <h4 className={styles.whyH4}>Continuous Innovation</h4>
              <p className={styles.whyP}>Continuously evolving technology solutions that drive business growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section className={`${styles.section} ${styles.stats} ${styles.dark}`}>
        <div className={styles.wrap}>
          <div className={styles.statgrid}>
            <div className={styles.stat}>
              <div className={styles.statNum}><span className="count" data-to="100">0</span><sup>+</sup></div>
              <div className={styles.statLbl}>Clients Served</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}><span className="count" data-to="10">0</span><sup>+</sup></div>
              <div className={styles.statLbl}>Years Experience</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}><span className="count" data-to="6">0</span></div>
              <div className={styles.statLbl}>Service Lines</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>24<sup>/7</sup></div>
              <div className={styles.statLbl}>Monitoring &amp; Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SERVICES ====== */}
      <section className={`${styles.section} ${styles.sec} ${styles.paper} ${styles.pg}`} id="services">
        <div className={styles.wrap}>
          <div className={`${styles.sechead} ${styles.rv}`}>
            <span className={styles.idx}>02</span>
            <h2 className={styles.sech2}>Our Services</h2>
            <span className={styles.rule} />
          </div>
          <p className={`${styles.secsub} ${styles.rv}`}>Six practice areas &middot; one accountable partner</p>

          <div className={`${styles.svc} ${styles.rv}`}>
            <span className={styles.svcNo}>01</span>
            <div>
              <h3 className={styles.svcH3}>IT Consulting &amp; Cybersecurity</h3>
              <p className={styles.svcP}>Business IT consulting, cloud computing solutions, cybersecurity solutions, network security assessments, firewall configuration, intrusion detection and prevention systems, and compliance support (ISO, GDPR).</p>
              <div className={styles.tags}>
                <span className={styles.tag}>CLOUD COMPUTING</span>
                <span className={styles.tag}>FIREWALLS</span>
                <span className={styles.tag}>IDS / IPS</span>
                <span className={styles.tag}>ISO &amp; GDPR</span>
                <span className={styles.tag}>SECURITY ASSESSMENTS</span>
              </div>
            </div>
          </div>

          <div className={`${styles.svc} ${styles.rv}`}>
            <span className={styles.svcNo}>02</span>
            <div>
              <h3 className={styles.svcH3}>IT Infrastructure &amp; Collaboration</h3>
              <p className={styles.svcP}>Network design &amp; implementation, server installation &amp; configuration, storage solutions, email hosting, collaboration platforms, intranet development, and knowledge management systems.</p>
              <div className={styles.tags}>
                <span className={styles.tag}>NETWORK DESIGN</span>
                <span className={styles.tag}>SERVER INSTALLATION</span>
                <span className={styles.tag}>STORAGE</span>
                <span className={styles.tag}>EMAIL HOSTING</span>
                <span className={styles.tag}>INTRANET</span>
              </div>
            </div>
          </div>

          <div className={`${styles.svc} ${styles.rv}`}>
            <span className={styles.svcNo}>03</span>
            <div>
              <h3 className={styles.svcH3}>Software Development</h3>
              <p className={styles.svcP}>Custom software development, mobile app development, enterprise applications, web development, CMS development, and e-commerce solutions.</p>
              <div className={styles.tags}>
                <span className={styles.tag}>WEB DEVELOPMENT</span>
                <span className={styles.tag}>MOBILE APPS</span>
                <span className={styles.tag}>ENTERPRISE SYSTEMS</span>
                <span className={styles.tag}>CMS</span>
                <span className={styles.tag}>E-COMMERCE</span>
              </div>
            </div>
          </div>

          <div className={`${styles.svc} ${styles.rv}`}>
            <span className={styles.svcNo}>04</span>
            <div>
              <h3 className={styles.svcH3}>Managed IT Services</h3>
              <p className={styles.svcP}>24/7 monitoring &amp; alerting, proactive maintenance, backup management, priority response SLAs, dedicated account manager, custom integrations, remote troubleshooting and on-site support.</p>
              <div className={styles.tags}>
                <span className={styles.tag}>24/7 MONITORING</span>
                <span className={styles.tag}>PROACTIVE MAINTENANCE</span>
                <span className={styles.tag}>BACKUP MANAGEMENT</span>
                <span className={styles.tag}>SLA SUPPORT</span>
                <span className={styles.tag}>ON-SITE SUPPORT</span>
              </div>
            </div>
          </div>

          <div className={`${styles.svc} ${styles.rv}`}>
            <span className={styles.svcNo}>05</span>
            <div>
              <h3 className={styles.svcH3}>Automation &amp; AI</h3>
              <p className={styles.svcP}>Business process automation, AI-powered analytics, chatbot development, RPA (robotic process automation), machine learning model integration, and intelligent document processing.</p>
              <div className={styles.tags}>
                <span className={styles.tag}>PROCESS AUTOMATION</span>
                <span className={styles.tag}>AI ANALYTICS</span>
                <span className={styles.tag}>CHATBOT</span>
                <span className={styles.tag}>RPA</span>
                <span className={styles.tag}>ML INTEGRATION</span>
              </div>
            </div>
          </div>

          <div className={`${styles.svc} ${styles.rv}`}>
            <span className={styles.svcNo}>06</span>
            <div>
              <h3 className={styles.svcH3}>IT Training &amp; Bootcamps</h3>
              <p className={styles.svcP}>Full-stack web development bootcamps, cybersecurity training programs, cloud computing certifications, ITIL foundation training, and customized corporate training workshops.</p>
              <div className={styles.tags}>
                <span className={styles.tag}>FULL-STACK BOOTCAMP</span>
                <span className={styles.tag}>CYBERSECURITY</span>
                <span className={styles.tag}>CLOUD CERTIFICATION</span>
                <span className={styles.tag}>ITIL</span>
                <span className={styles.tag}>CORPORATE TRAINING</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== JOURNEY ====== */}
      <section className={`${styles.section} ${styles.sec} ${styles.dark} ${styles.pg}`} id="journey">
        <div className={styles.wrap}>
          <div className={`${styles.sechead} ${styles.rv}`}>
            <span className={styles.idx}>03</span>
            <h2 className={styles.sech2}>Our Journey</h2>
            <span className={styles.rule} />
          </div>
          <p className={`${styles.secsub} ${styles.rv}`}>A decade of building trust, one installation at a time</p>
          <div className={styles.jgrid}>
            <p className={`${styles.jnote} ${styles.rv}`}>
              From a two-founder startup in Kyebando to a full-stack technology partner serving aviation, insurance, non-profit, education and sports institutions across Uganda.
            </p>
            <div className={styles.tl}>
              <div className={`${styles.tli} ${styles.rv}`}>
                <span className={styles.tliPh}>2015 &middot; FOUNDING</span>
                <h4 className={styles.tliH4}>The mission begins</h4>
                <p className={styles.tliP}>Company founded with a mission to revolutionize IT solutions.</p>
              </div>
              <div className={`${styles.tli} ${styles.rv} ${styles.d1}`}>
                <span className={styles.tliPh}>GROWTH &middot; CLOUD</span>
                <h4 className={styles.tliH4}>Cloud computing launched</h4>
                <p className={styles.tliP}>Launched comprehensive cloud computing services.</p>
              </div>
              <div className={`${styles.tli} ${styles.rv} ${styles.d2}`}>
                <span className={styles.tliPh}>EXPANSION &middot; SECURITY</span>
                <h4 className={styles.tliH4}>Cybersecurity practice</h4>
                <p className={styles.tliP}>Expanded services to include advanced cybersecurity solutions.</p>
              </div>
              <div className={`${styles.tli} ${styles.rv} ${styles.d3}`}>
                <span className={styles.tliPh}>TODAY &middot; SCALE</span>
                <h4 className={styles.tliH4}>100+ clients and counting</h4>
                <p className={styles.tliP}>Reached over 100 clients in supplies, installation, and support, showcasing trust and reliability.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== LEADERSHIP ====== */}
      <section className={`${styles.section} ${styles.sec} ${styles.paper} ${styles.pg}`} id="leadership">
        <div className={styles.wrap}>
          <div className={`${styles.sechead} ${styles.rv}`}>
            <span className={styles.idx}>04</span>
            <h2 className={styles.sech2}>Leadership</h2>
            <span className={styles.rule} />
          </div>
          <p className={`${styles.secsub} ${styles.rv}`}>Hands-on experience from the server room to the boardroom</p>
          <div className={styles.leadgrid}>

            {/* Kenneth */}
            <div className={`${styles.person} ${styles.corner} ${styles.rv} ${styles.avoid}`}>
              <Image
                src="/images/ken-okello.jpg"
                alt="Okello Kenneth George"
                width={86}
                height={86}
                className={styles.personImg}
              />
              <h3 className={styles.personH3}>Okello Kenneth George</h3>
              <p className={styles.role}>Co-Founder &amp; Managing Director / CEO</p>
              <p className={styles.personP}>
                Okello Kenneth George is a highly experienced IT professional with a diverse background encompassing IT Consulting, Systems Administration, Cyber Security, Systems Analysis, and Systems Development. He is a co-founder and the Chief Executive Officer of OAK IT Solutions and Supplies Ltd, a role he has held since January 2015.
              </p>
              <a href="https://www.linkedin.com/in/okello-kenneth-george/" target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
                <svg className={styles.linkedinIcon} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn Profile
              </a>
            </div>

            {/* Beatrice */}
            <div className={`${styles.person} ${styles.corner} ${styles.rv} ${styles.d1} ${styles.avoid}`}>
              <Image
                src="/images/beatrice-baguma.jpg"
                alt="Beatrice Baguma"
                width={86}
                height={86}
                className={styles.personImg}
              />
              <h3 className={styles.personH3}>Beatrice Baguma</h3>
              <p className={styles.role}>Co-Founder</p>
              <p className={styles.personP}>
                Beatrice Baguma is a co-founder of OAK IT Solutions and Supplies Ltd, bringing over three decades of exceptional customer service experience from her distinguished career as Senior Customer Service Personnel at British Airways Uganda. Her extensive background in client relations and service excellence forms the foundation of the company&apos;s customer-first philosophy.
              </p>
              <a href="https://www.linkedin.com/in/beatrice-baguma-97795980/" target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
                <svg className={styles.linkedinIcon} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Kenneth's certs & experience */}
          <div className={styles.rv} style={{ marginTop: 'clamp(26px,4vw,60px)' }}>
            <h4 className={styles.subh}>CERTIFICATIONS &amp; SKILLS</h4>
            <div className={styles.certs}>
              <span className={styles.cert}>ISC2 &middot; CERTIFIED IN CYBERSECURITY</span>
              <span className={styles.cert}>CISCO CCNA ROUTING &amp; SWITCHING</span>
              <span className={styles.cert}>CCNA SECURITY</span>
              <span className={styles.cert}>COMPTIA IT FUNDAMENTALS</span>
              <span className={styles.cert}>OPSWAT FILE SECURITY ASSOCIATE</span>
              <span className={styles.cert}>NIST 800-171 COMPLIANCE</span>
              <span className={styles.cert}>CRITICAL INFRASTRUCTURE PROTECTION</span>
              <span className={styles.cert}>IT &amp; CYBER RISK MANAGEMENT</span>
              <span className={styles.cert}>PROMPT ENGINEERING &middot; GENAI</span>
              <span className={styles.cert}>MONGODB &amp; PYTHON</span>
              <span className={styles.cert}>JAVASCRIPT &middot; BOOTSTRAP &middot; PHP</span>
              <span className={styles.cert}>ADOBE XD DESIGN</span>
            </div>

            <h4 className={styles.subh}>PROFESSIONAL EXPERIENCE</h4>
            <ul className={styles.xp}>
              <li className={styles.xpLi}>
                <span className={styles.xpYrs}>2015 &mdash; PRESENT</span>
                <div><b className={styles.xpB}>Chief Executive Officer</b><span className={styles.xpSpan}>OAK IT Solutions and Supplies Ltd</span></div>
              </li>
              <li className={styles.xpLi}>
                <span className={styles.xpYrs}>2015 &mdash; PRESENT</span>
                <div><b className={styles.xpB}>IT Support Manager</b><span className={styles.xpSpan}>Hillcrest Insurance Brokers</span></div>
              </li>
              <li className={styles.xpLi}>
                <span className={styles.xpYrs}>2014 &mdash; PRESENT</span>
                <div><b className={styles.xpB}>IT Management</b><span className={styles.xpSpan}>Uganda Debt Network</span></div>
              </li>
              <li className={styles.xpLi}>
                <span className={styles.xpYrs}>2021 &mdash; PRESENT</span>
                <div><b className={styles.xpB}>IT Consultant</b><span className={styles.xpSpan}>Claim Care Loss Adjuster Uganda Ltd</span></div>
              </li>
              <li className={styles.xpLi}>
                <span className={styles.xpYrs}>2022 &mdash; PRESENT</span>
                <div><b className={styles.xpB}>IT Consultant</b><span className={styles.xpSpan}>Bar Aviation Uganda Ltd</span></div>
              </li>
              <li className={styles.xpLi}>
                <span className={styles.xpYrs}>2023 &mdash; PRESENT</span>
                <div><b className={styles.xpB}>Systems Administrator &amp; IT Support Engineer</b><span className={styles.xpSpan}>Extreeme Adventure Park, Busiika</span></div>
              </li>
            </ul>

            <h4 className={styles.subh}>BEATRICE BAGUMA &mdash; EXPERIENCE</h4>
            <ul className={styles.xp}>
              <li className={styles.xpLi}>
                <span className={styles.xpYrs}>2015 &mdash; PRESENT</span>
                <div><b className={styles.xpB}>Co-Founder</b><span className={styles.xpSpan}>OAK IT Solutions and Supplies Ltd</span></div>
              </li>
              <li className={styles.xpLi}>
                <span className={styles.xpYrs}>OVER THREE DECADES</span>
                <div><b className={styles.xpB}>Senior Customer Service Personnel</b><span className={styles.xpSpan}>British Airways Uganda</span></div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ====== CLIENTS ====== */}
      <section className={`${styles.section} ${styles.sec} ${styles.dark} ${styles.clients} ${styles.pg}`} id="clients">
        <div className={styles.wrap}>
          <div className={`${styles.sechead} ${styles.rv}`}>
            <span className={styles.idx}>05</span>
            <h2 className={styles.sech2}>Our Clients</h2>
            <span className={styles.rule} />
          </div>
          <p className={`${styles.secsub} ${styles.rv}`}>Serving aviation, insurance, non-profit, and education sectors across Uganda</p>
          <div className={`${styles.crow} ${styles.rv} ${styles.avoid}`}>
            <span className={styles.crowCi}>CL&mdash;01</span>
            <h4 className={styles.crowH4}>Bar Aviation Uganda Ltd</h4>
            <span className={styles.sector}>AVIATION</span>
          </div>
          <div className={`${styles.crow} ${styles.rv} ${styles.avoid}`}>
            <span className={styles.crowCi}>CL&mdash;02</span>
            <h4 className={styles.crowH4}>Visa Bar Uganda Ltd</h4>
            <span className={styles.sector}>HOSPITALITY</span>
          </div>
          <div className={`${styles.crow} ${styles.rv} ${styles.avoid}`}>
            <span className={styles.crowCi}>CL&mdash;03</span>
            <h4 className={styles.crowH4}>Uganda Sports Arena</h4>
            <span className={styles.sector}>SPORTS &amp; EVENTS</span>
          </div>
          <div className={`${styles.crow} ${styles.rv} ${styles.avoid}`}>
            <span className={styles.crowCi}>CL&mdash;04</span>
            <h4 className={styles.crowH4}>Uganda Debt Network</h4>
            <span className={styles.sector}>NON-PROFIT</span>
          </div>
          <div className={`${styles.crow} ${styles.rv} ${styles.avoid}`}>
            <span className={styles.crowCi}>CL&mdash;05</span>
            <h4 className={styles.crowH4}>Hillcrest Insurance Brokers Ltd</h4>
            <span className={styles.sector}>INSURANCE</span>
          </div>
          <div className={`${styles.crow} ${styles.rv} ${styles.avoid}`}>
            <span className={styles.crowCi}>CL&mdash;06</span>
            <h4 className={styles.crowH4}>Claim Care Loss Adjuster Uganda Ltd</h4>
            <span className={styles.sector}>INSURANCE</span>
          </div>
          <div className={`${styles.crow} ${styles.rv} ${styles.avoid}`}>
            <span className={styles.crowCi}>CL&mdash;07</span>
            <h4 className={styles.crowH4}>Good Times Schools</h4>
            <span className={styles.sector}>EDUCATION</span>
          </div>
          <div className={`${styles.crow} ${styles.rv} ${styles.avoid}`}>
            <span className={styles.crowCi}>CL&mdash;08</span>
            <h4 className={styles.crowH4}>Gets Technical Services Ltd</h4>
            <span className={styles.sector}>CIVIL WORKS &amp; TECHNICAL SERVICES</span>
          </div>
        </div>
      </section>

      {/* ====== GALLERY ====== */}
      <section className={`${styles.section} ${styles.sec} ${styles.darkAlt} ${styles.pg}`} id="gallery">
        <div className={styles.wrap}>
          <div className={`${styles.sechead} ${styles.rv}`}>
            <span className={styles.idx}>06</span>
            <h2 className={styles.sech2}>Gallery &mdash; IT Works &amp; Installations</h2>
            <span className={styles.rule} />
          </div>
          <p className={`${styles.secsub} ${styles.rv}`}>Representative scope of works &middot; supplies, installation &amp; support</p>
          <div className={styles.galgrid}>
            <figure className={`${styles.tile} ${styles.rv} ${styles.avoid}`}>
              <div className={styles.tileArt}><SvgServerRack /></div>
              <figcaption className={styles.tcap}>
                <h4 className={styles.tcapH4}>Server Room &amp; Data Center Fit-outs</h4>
                <span className={styles.tcapK}>INFRASTRUCTURE</span>
              </figcaption>
            </figure>
            <figure className={`${styles.tile} ${styles.rv} ${styles.d1} ${styles.avoid}`}>
              <div className={styles.tileArt}><SvgCabling /></div>
              <figcaption className={styles.tcap}>
                <h4 className={styles.tcapH4}>Patch Panel &amp; Structured Cabling</h4>
                <span className={styles.tcapK}>NETWORKING</span>
              </figcaption>
            </figure>
            <figure className={`${styles.tile} ${styles.rv} ${styles.d2} ${styles.avoid}`}>
              <div className={styles.tileArt}><SvgWorkstations /></div>
              <figcaption className={styles.tcap}>
                <h4 className={styles.tcapH4}>Workstation Deployment &amp; Setup</h4>
                <span className={styles.tcapK}>HARDWARE</span>
              </figcaption>
            </figure>
            <figure className={`${styles.tile} ${styles.rv} ${styles.d3} ${styles.avoid}`}>
              <div className={styles.tileArt}><SvgCctv /></div>
              <figcaption className={styles.tcap}>
                <h4 className={styles.tcapH4}>CCTV &amp; Surveillance Installation</h4>
                <span className={styles.tcapK}>SECURITY</span>
              </figcaption>
            </figure>
            <figure className={`${styles.tile} ${styles.rv} ${styles.d1} ${styles.avoid}`}>
              <div className={styles.tileArt}><SvgVsat /></div>
              <figcaption className={styles.tcap}>
                <h4 className={styles.tcapH4}>VSAT &amp; Wireless Connectivity</h4>
                <span className={styles.tcapK}>TELECOM</span>
              </figcaption>
            </figure>
            <figure className={`${styles.tile} ${styles.rv} ${styles.d2} ${styles.avoid}`}>
              <div className={styles.tileArt}><SvgNetworking /></div>
              <figcaption className={styles.tcap}>
                <h4 className={styles.tcapH4}>Network Switch &amp; Rack Installations</h4>
                <span className={styles.tcapK}>INFRASTRUCTURE</span>
              </figcaption>
            </figure>
          </div>
          <p className={styles.galnote}>
            * Representative illustrations of recent installations and project scopes.
          </p>
        </div>
      </section>

      {/* ====== CSR ====== */}
      <section className={`${styles.section} ${styles.sec} ${styles.paper} ${styles.pg}`} id="csr">
        <div className={styles.wrap}>
          <div className={`${styles.sechead} ${styles.rv}`}>
            <span className={styles.idx}>07</span>
            <h2 className={styles.sech2}>Corporate Social Responsibility</h2>
            <span className={styles.rule} />
          </div>
          <p className={`${styles.secsub} ${styles.rv}`}>Technology with a conscience</p>
          <div className={styles.csr}>
            <div className={`${styles.csrrow} ${styles.rv} ${styles.avoid}`}>
              <svg viewBox="0 0 24 24" width="44" height="44">
                <path className={styles.csrIcons} d="M12 3C5.5 7 4.5 14.5 12 21c7.5-6.5 6.5-14 0-18Z" />
                <path className={styles.csrIcons} d="M12 7v10M12 11l-3-2M12 14l3-2.5" />
              </svg>
              <div>
                <h4 className={styles.csrrowH4}>Green IT Initiative</h4>
                <p className={styles.csrrowP}>Implementing eco-friendly IT solutions to reduce carbon footprint.</p>
              </div>
            </div>
            <div className={`${styles.csrrow} ${styles.rv} ${styles.avoid}`}>
              <svg viewBox="0 0 24 24" width="44" height="44">
                <path className={styles.csrIcons} d="M3 6c4-2 7-2 9 0 2-2 5-2 9 0v12c-4-2-7-2-9 0-2-2-5-2-9 0Z" />
                <path className={styles.csrIcons} d="M12 6v12" />
              </svg>
              <div>
                <h4 className={styles.csrrowH4}>Tech for Good</h4>
                <p className={styles.csrrowP}>Providing technology resources and training to underserved communities.</p>
              </div>
            </div>
            <div className={`${styles.csrrow} ${styles.rv} ${styles.avoid}`}>
              <svg viewBox="0 0 24 24" width="44" height="44">
                <circle className={styles.csrIcons} cx="8.5" cy="8" r="3" />
                <circle className={styles.csrIcons} cx="16.5" cy="9" r="2.5" />
                <path className={styles.csrIcons} d="M3 19c.5-3.5 2.8-5 5.5-5s5 1.5 5.5 5M14.5 14.2c2.6.2 4.6 1.6 5 4.8" />
              </svg>
              <div>
                <h4 className={styles.csrrowH4}>Community Engagement</h4>
                <p className={styles.csrrowP}>Actively participating in local community development projects.</p>
              </div>
            </div>
          </div>
          <div className={`${styles.future} ${styles.corner} ${styles.rv} ${styles.avoid}`}>
            <h3>Future Plans</h3>
            <div className={styles.fgrid}>
              <div className={styles.fitem}>
                <span className={styles.fitemFn}>F&mdash;01</span>
                <p className={styles.fitemP}>Expand service offerings internationally.</p>
              </div>
              <div className={styles.fitem}>
                <span className={styles.fitemFn}>F&mdash;02</span>
                <p className={styles.fitemP}>Develop and integrate next-generation AI-driven solutions.</p>
              </div>
              <div className={styles.fitem}>
                <span className={styles.fitemFn}>F&mdash;03</span>
                <p className={styles.fitemP}>Invest in R&amp;D for innovative and sustainable technologies.</p>
              </div>
              <div className={styles.fitem}>
                <span className={styles.fitemFn}>F&mdash;04</span>
                <p className={styles.fitemP}>Train and skill up over 10,000 students worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CONTACT ====== */}
      <section className={`${styles.section} ${styles.sec} ${styles.dark} ${styles.pg}`} id="contact">
        <div className={styles.wrap}>
          <div className={`${styles.sechead} ${styles.rv}`}>
            <span className={styles.idx}>08</span>
            <h2 className={styles.sech2}>Contact Us</h2>
            <span className={styles.rule} />
          </div>
          <h2 className={`${styles.contactBig} ${styles.rv}`}>
            Let&rsquo;s build your next <em>system</em> together.
          </h2>
          <div className={`${styles.cgrid} ${styles.rv}`}>
            <div className={styles.ccell}>
              <p className={styles.ccellK}>VISIT</p>
              <p>
                Plot 246 Kyebando Central Road,<br />
                next to Total Bahai,<br />
                P.O Box 23144, Kampala, Uganda
              </p>
            </div>
            <div className={styles.ccell}>
              <p className={styles.ccellK}>CALL</p>
              <p><a href="tel:+256704302335">+256 704 302 335</a></p>
            </div>
            <div className={styles.ccell}>
              <p className={styles.ccellK}>WRITE</p>
              <p>
                <a href="mailto:info@oakitsolutionsandsupplies.com">
                  info@oakitsolutions<br />andsupplies.com
                </a>
              </p>
            </div>
            <div className={styles.ccell}>
              <p className={styles.ccellK}>WEB</p>
              <p>
                <a href="https://oakitsolutionsandsupplies.com">
                  oakitsolutions<br />andsupplies.com
                </a>
              </p>
            </div>
          </div>
          <div className={styles.legal}>
            <span>BANK &middot; BANK OF AFRICA &ndash; NTINDA</span>
            <span>REG NO &middot; 80010000953729</span>
            <span>TIN &middot; 1009657242</span>
            <span>&copy; {new Date().getFullYear()} OAK IT SOLUTIONS AND SUPPLIES LTD &middot; ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </section>

      {/* ====== FLOATING PDF BUTTON ====== */}
      <button className={styles.printBtn} onClick={handleDownloadPDF} disabled={isLoading}>
        {isLoading ? '⏳ GENERATING PDF...' : '⬇ DOWNLOAD PDF'}
      </button>

    </div>
  );
}
