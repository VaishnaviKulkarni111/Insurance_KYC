import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

const products = [
  {
    name: "Life Insurance",
    image: "https://www.renewbuy.com/sites/default/files/2023-10/Asset%205%40300x%20%281%29.png",
  },
  {
    name: "Retirement Plans",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkC8uXkU_hU-PRDMwXASSedtSbBK1R2T3N1A&s",
  },
  {
    name: "Children's Savings",
    image: "https://media.istockphoto.com/id/1269833434/vector/vector-illustration-cartoon-of-a-little-girl-putting-coin-into-piggy-bank.jpg?s=612x612&w=0&k=20&c=bIc2w76nH0hpPjerRtIOUp6MVCbIGCnAh-kaZP1HA14=",
  },
  {
    name: "Fixed Returns",
    image: "https://jupiter.money/blog/wp-content/uploads/2023/06/investment-planning.jpg",
  },
  {
    name: "Health Insurance",
    image: "https://1finance.co.in/magazine/wp-content/uploads/2023/06/16404392_tp212-socialmedia-02-1-scaled.jpg",
  },
  {
    name: "Home Insurance",
    image: "https://www.fincover.com/wp-content/uploads/2023/02/Untitled-5.png",
  },
  {
    name: "Travel Insurance",
    image: "https://media.istockphoto.com/id/1350713547/vector/travel-insurance-banner-concept-red-traveling-luggage-suitcase-and-airplane-trip-protect-by.jpg?s=612x612&w=0&k=20&c=hkbOAbQAWJU0im5mXrve8Zq7hbTBTh03BV_hy2m7RaM=",
  },
  {
    name: "Vehicle Insurance",
    image: "https://media.istockphoto.com/id/1341519862/vector/car-insurance-auto-insurance.jpg?s=612x612&w=0&k=20&c=WvOwoHB8SoZwAIbwEe8D1R8eb92h2hG0oB4m-qp6zZY=",
  },
  {
    name: "Term Insurance",
    image: "https://www.probusinsurance.com/wp-content/uploads/2021/09/term-insurance.png",
  },
  {
    name: "Group Insurance",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjyZEdy39V56ZJxNMEAMHEO99g0c5Gz4eC5g&s",
  },
  {
    name: "Critical Illness Insurance",
    image: "https://www.hdfclife.com/content/dam/hdfclifeinsurancecompany/knowledge-center/images/health/Win-the-Battle-Against-Critical-Illness-With-Critical-Illness-Rider.jpg",
  },
  {
    name: "Accident Insurance",
    image: "https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/blog/finance/benefits-of-personal-accident-insurance-717x404.jpg",
  },
 
];

const Products = () => {
  return (
    <div style={{ backgroundColor: "#f4f6f9", padding: "30px 0" }}>
      <Container>
        <h2 className="text-center mb-4">What We Offer</h2>
        <Row>
          {products.map((product, index) => (
            <Col sm={6} md={4} lg={2} className="mb-4" key={index}>
              <Card className="border-light">
                <Card.Body className="text-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fluid
                    style={{ height: "150px", objectFit: "cover", cursor:"pointer"}}
                  />
                  <h5 className="mt-3">{product.name}</h5>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Products;
