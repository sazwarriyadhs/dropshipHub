import React from 'react';
import { Link } from 'react-router-dom';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CButton
} from '@coreui/react';
import {
  Users,
  Target,
  Award,
  Globe,
  Code,
  Shield,
  TrendingUp,
  Heart,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from 'lucide-react';
import './AboutUs.css';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Digimedia Komunika",
      role: "Pemilik & Pengembang Platform",
      description: "Perusahaan teknologi yang berfokus pada pengembangan solusi digital inovatif untuk UMKM dan e-commerce.",
      image: "https://www.digimediakomunika.cloud/static/media/logo.8a087c510928bfd2c8b4.png",
      expertise: ["Web Development", "Digital Marketing", "Cloud Solutions", "E-commerce"],
      website: "https://www.digimediakomunika.cloud",
      email: "hello@digimediakomunika.cloud",
      phone: "+62 812-3456-7890"
    }
  ];

  const companyStats = [
    { number: "500+", label: "Klien Terlayani" },
    { number: "1000+", label: "Proyek Selesai" },
    { number: "5+", label: "Tahun Pengalaman" },
    { number: "50+", label: "Tim Ahli" }
  ];

  const services = [
    {
      icon: <Code size={32} />,
      title: "Pengembangan Web",
      description: "Membangun platform web yang scalable dan user-friendly dengan teknologi terbaru"
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Digital Marketing",
      description: "Strategi pemasaran digital yang terukur untuk meningkatkan visibilitas bisnis"
    },
    {
      icon: <Globe size={32} />,
      title: "Solusi Cloud",
      description: "Infrastruktur cloud yang handal untuk mendukung pertumbuhan bisnis digital"
    },
    {
      icon: <Shield size={32} />,
      title: "Keamanan Digital",
      description: "Protection system yang menjaga keamanan data dan transaksi bisnis Anda"
    }
  ];

  const values = [
    {
      icon: <Target size={24} />,
      title: "Inovasi",
      description: "Terus berinovasi dalam memberikan solusi teknologi terkini"
    },
    {
      icon: <Award size={24} />,
      title: "Kualitas",
      description: "Komitmen terhadap kualitas terbaik dalam setiap proyek"
    },
    {
      icon: <Users size={24} />,
      title: "Kolaborasi",
      description: "Bekerja sama dengan klien untuk mencapai hasil optimal"
    },
    {
      icon: <Heart size={24} />,
      title: "Dedikasi",
      description: "Dedikasi penuh dalam mewujudkan visi digital klien"
    }
  ];

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero-section bg-primary text-white py-5">
        <CContainer>
          <CRow className="align-items-center min-vh-50">
            <CCol lg={8}>
              <h1 className="display-4 fw-bold mb-4">Tentang DropshipHub</h1>
              <p className="lead mb-4">
                Platform dropshipping terdepan yang dikembangkan oleh
                <strong> Digimedia Komunika</strong> untuk memberdayakan
                pelaku bisnis dalam era digital.
              </p>
              <div className="d-flex gap-3">
                <CButton color="light" size="lg">
                  Jelajahi Layanan
                </CButton>
                <CButton color="outline-light" size="lg">
                  Hubungi Kami
                </CButton>
              </div>
            </CCol>
            <CCol lg={4}>
              <div className="hero-image-container">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Team Collaboration"
                  className="img-fluid rounded-3"
                />
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </section>

      {/* Company Stats */}
      <section className="stats-section py-5 bg-light">
        <CContainer>
          <CRow className="text-center">
            {companyStats.map((stat, index) => (
              <CCol key={index} md={3} className="mb-4">
                <div className="stat-item">
                  <h2 className="text-primary fw-bold">{stat.number}</h2>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </CCol>
            ))}
          </CRow>
        </CContainer>
      </section>

      {/* Our Story */}
      <section className="story-section py-5">
        <CContainer>
          <CRow className="align-items-center">
            <CCol lg={6}>
              <h2 className="fw-bold mb-4">Cerita Kami</h2>
              <p className="mb-4">
                <strong>DropshipHub</strong> lahir dari visi
                <strong> Digimedia Komunika</strong> untuk menciptakan
                ekosistem dropshipping yang terintegrasi dan mudah diakses
                oleh semua kalangan.
              </p>
              <p className="mb-4">
                Sebagai perusahaan pengembang terpercaya, Digimedia Komunika
                telah membangun DropshipHub dengan teknologi mutakhir untuk
                memberikan pengalaman berbelanja dan berjualan yang optimal.
              </p>
              <p>
                Platform ini dirancang khusus untuk memudahkan proses
                dropshipping dengan fitur auto-update produk, perhitungan
                ongkir real-time, dan integrasi dengan berbagai marketplace
                terkemuka.
              </p>
            </CCol>
            <CCol lg={6}>
              <div className="story-image-container">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Our Story"
                  className="img-fluid rounded-3"
                />
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </section>

      {/* Team Section */}
      <section className="team-section py-5 bg-light">
        <CContainer>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Tim Pengembang</h2>
            <p className="text-muted">
              Dikelola oleh profesional di bidangnya
            </p>
          </div>
          <CRow className="justify-content-center">
            {teamMembers.map((member, index) => (
              <CCol key={index} lg={8}>
                <CCard className="team-card border-0 shadow-sm">
                  <CCardBody className="p-4">
                    <CRow className="align-items-center">
                      <CCol md={4} className="text-center">
                        <div className="team-image-container mb-3">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="img-fluid rounded-circle"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';
                            }}
                          />
                        </div>
                      </CCol>
                      <CCol md={8}>
                        <h4 className="fw-bold">{member.name}</h4>
                        <p className="text-primary mb-3">{member.role}</p>
                        <p className="mb-4">{member.description}</p>

                        <div className="mb-3">
                          <h6 className="fw-semibold">Keahlian:</h6>
                          <div className="d-flex flex-wrap gap-2">
                            {member.expertise.map((skill, skillIndex) => (
                              <span key={skillIndex} className="badge bg-primary">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="contact-info">
                          <div className="d-flex align-items-center mb-2">
                            <Globe size={16} className="me-2 text-muted" />
                            <a
                              href={member.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              {member.website} <ExternalLink size={14} />
                            </a>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <Mail size={16} className="me-2 text-muted" />
                            <a href={`mailto:${member.email}`} className="text-decoration-none">
                              {member.email}
                            </a>
                          </div>
                          <div className="d-flex align-items-center">
                            <Phone size={16} className="me-2 text-muted" />
                            <a href={`tel:${member.phone}`} className="text-decoration-none">
                              {member.phone}
                            </a>
                          </div>
                        </div>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CContainer>
      </section>

      {/* Services Section */}
      <section className="services-section py-5">
        <CContainer>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Layanan Digimedia Komunika</h2>
            <p className="text-muted">
              Solusi lengkap untuk transformasi digital bisnis Anda
            </p>
          </div>
          <CRow className="g-4">
            {services.map((service, index) => (
              <CCol key={index} md={6} lg={3}>
                <CCard className="service-card border-0 shadow-sm h-100">
                  <CCardBody className="text-center p-4">
                    <div className="service-icon text-primary mb-3">
                      {service.icon}
                    </div>
                    <h5 className="fw-bold mb-3">{service.title}</h5>
                    <p className="text-muted">{service.description}</p>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CContainer>
      </section>

      {/* Values Section */}
      <section className="values-section py-5 bg-light">
        <CContainer>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Nilai Kami</h2>
            <p className="text-muted">
              Prinsip yang kami pegang dalam setiap proyek
            </p>
          </div>
          <CRow className="g-4">
            {values.map((value, index) => (
              <CCol key={index} md={6} lg={3}>
                <div className="value-item text-center">
                  <div className="value-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: '60px', height: '60px' }}>
                    {value.icon}
                  </div>
                  <h5 className="fw-bold mb-3">{value.title}</h5>
                  <p className="text-muted mb-0">{value.description}</p>
                </div>
              </CCol>
            ))}
          </CRow>
        </CContainer>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-primary text-white">
        <CContainer>
          <CRow className="text-center">
            <CCol lg={8} className="mx-auto">
              <h2 className="fw-bold mb-4">Mulai Perjalanan Dropshipping Anda</h2>
              <p className="lead mb-4">
                Bergabunglah dengan DropshipHub dan rasakan kemudahan
                berjualan dengan platform terdepan yang dikembangkan
                oleh ahli di bidangnya.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <CButton color="light" size="lg">
                  Daftar Sekarang
                </CButton>
                <CButton color="outline-light" size="lg">
                  Pelajari Lebih Lanjut
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </section>

      {/* Contact Section */}
      <section className="contact-section py-5">
        <CContainer>
          <CRow>
            <CCol lg={8} className="mx-auto">
              <div className="text-center mb-5">
                <h2 className="fw-bold">Hubungi Digimedia Komunika</h2>
                <p className="text-muted">
                  Tertarik dengan layanan kami? Mari berkolaborasi
                </p>
              </div>
              <CRow className="g-4">
                <CCol md={4} className="text-center">
                  <div className="contact-item">
                    <div className="contact-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: '50px', height: '50px' }}>
                      <Mail size={24} />
                    </div>
                    <h6>Email</h6>
                    <a href="mailto:hello@digimediakomunika.cloud" className="text-decoration-none">
                      hello@digimediakomunika.cloud
                    </a>
                  </div>
                </CCol>
                <CCol md={4} className="text-center">
                  <div className="contact-item">
                    <div className="contact-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: '50px', height: '50px' }}>
                      <Phone size={24} />
                    </div>
                    <h6>Telepon</h6>
                    <a href="tel:+6281234567890" className="text-decoration-none">
                      +62 812-3456-7890
                    </a>
                  </div>
                </CCol>
                <CCol md={4} className="text-center">
                  <div className="contact-item">
                    <div className="contact-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: '50px', height: '50px' }}>
                      <Globe size={24} />
                    </div>
                    <h6>Website</h6>
                    <a
                      href="https://www.digimediakomunika.cloud"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      www.digimediakomunika.cloud
                    </a>
                  </div>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
      </section>
    </div>
  );
};

export default AboutUs;
