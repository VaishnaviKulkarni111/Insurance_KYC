import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Partners = () => {
  const partnerLogos = [
    {
      src: "https://www.maxlifeinsurance.com/static-page/assets/homepage/axislogo_e07f64792c.webp",
      alt: "Axis Bank",
    },
    {
      src: "https://www.maxlifeinsurance.com/static-page/assets/homepage/yesbanklogo_384588fc36.webp",
      alt: "Yes Bank",
    },
    {
      src: "https://www.maxlifeinsurance.com/static-page/assets/homepage/Adobe.webp",
      alt: "Adobe",
    },
    {
      src: "https://www.maxlifeinsurance.com/static-page/assets/homepage/Google.webp",
      alt: "Google",
    },
    {
        src: "https://joinditto.in/static/2ef89b7a1f6efbff596990cfc23a80e7/72740/logo.png",
        alt: "Ditto",
      },
    {
      src: "https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-logo.jpg",
      alt: "HDFC Bank",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp8mXBusladp4eop5YLbiGOpipboZcpsGylw&s",
      alt: "ICICI Bank",
    },
    {
      src: "https://cdn.uxhack.co/product_logos/Zerodha_logo_0709210957",
      alt: "Zerodha",
    },
    {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzwdw5LRRgFpiRRMi-TsjpT2KUPYL8lutKMQ&s",
        alt: "Wipro",
      },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Bajaj_Finserv_Logo.svg/2560px-Bajaj_Finserv_Logo.svg.png",
      alt: "Bajaj finserv",
    },
    
    {
      src: "https://1000logos.net/wp-content/uploads/2018/03/SBI-Logo.png",
      alt: "State Bank of India",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Max_Life_Insurance_logo.svg/2560px-Max_Life_Insurance_logo.svg.png",
      alt: "Maxlife",
    },
    
  ];

  return (
    <section className="py-5 bg-white">
      <Container>
        <h2 className="text-center mb-4">Our Trusted Partners</h2>
        <Row>
          {partnerLogos.map((logo, index) => (
            <Col key={index} xs={12} sm={6} md={4} className="mb-4 text-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width="160"
                height="70"
                className="shadow-sm"
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Partners;
