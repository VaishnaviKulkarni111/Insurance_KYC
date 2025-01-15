import React from "react";
import { Container, Card } from "react-bootstrap";

const Statistics = () => {
  const stats = [
    {
      id: 1,
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaXK_HNH3IAGABhw5tKTVP_u87JOOyWSCWhQ&s",
      title: "99.65%",
      subtitle: "Death Claim Paid Ratio",
      source: "(Source: FY 2023-24)",
    },
    {
      id: 2,
      icon: "https://cdn5.vectorstock.com/i/1000x1000/46/89/winner-cup-flat-design-icon-trophy-prize-on-blue-vector-21554689.jpg",
      title: "₹1,779,409 Cr.",
      subtitle: "Sum Assured In Force",
      source: "(Source: FY 2023-24)",
    },
    {
      id: 3,
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhpnmv3qyvehuIvByK5K8xtl8OsfHXWZ39Ug&s",
      title: "₹150,836 Cr.",
      subtitle: "Assets Managed",
      source: "(Source: FY 2023-24)",
    },
    {
      id: 4,
      icon: "https://w7.pngwing.com/pngs/23/209/png-transparent-logo-building-business-sales-industry-building-angle-building-apartment-thumbnail.png",
      title: "304 Offices",
      subtitle: "Axis Max Life Presence",
      source: "(Source: FY 2023-24)",
    },
    {
      id: 5,
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRixmppAR9hUikRST1KrKPiwIDB-TzbfHBgmg&s",
      title: "Empathy",
      subtitle: "For our customers",
    },
    {
      id: 6,
      icon: "https://c8.alamy.com/comp/R1PMP4/transparency-vector-icon-isolated-on-transparent-background-transparency-transparency-logo-concept-R1PMP4.jpg",
      title: "Transparency",
      subtitle: "In all phases",
    },
  ];

  return (
    <Container className="py-5" style={{ overflow: "hidden", maxWidth: "100%" }}>
      <h2 className="text-center mb-4">Why Prefer us???</h2>
      <div className="scroll-container">
        {/* Duplicate the content for infinite scrolling */}
        {[...stats, ...stats].map((stat, index) => (
          <Card
            key={index}
            className="text-center shadow-sm mx-3"
            style={{
              flex: "0 0 auto",
              minWidth: "300px",
              margin: "10px",
            }}
          >
            <Card.Body>
              <img
                src={stat.icon}
                alt={stat.title}
                style={{ height: "64px", marginBottom: "10px" }}
              />
              <h5 className="font-weight-bold">{stat.title}</h5>
              <p className="text-muted">{stat.subtitle}</p>
              {stat.source && <small className="text-muted">{stat.source}</small>}
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Custom styling for horizontal scrolling */}
      <style jsx>{`
        .scroll-container {
          display: flex;
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </Container>
  );
};

export default Statistics;
