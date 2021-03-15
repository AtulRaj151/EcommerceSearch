import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBTooltip,
  MDBCardFooter,
  MDBBtn,
  MDBIcon,
} from "mdbreact";

function ProductCard(props) {
  const { product } = props;
  return (
    <div className="cards">
      <MDBCard
        className="m-2"
        style={{ width: "22rem" }}
        cascade
        ecommerce
        narrow
      >
        <MDBCardImage cascade top src={product.imgUrl} className="card-image" />
        <MDBCardBody cascade className="text-center">
          <MDBCardTitle tag="h5">Shoes</MDBCardTitle>
          <MDBCardTitle>
            <a href="#!">
              <strong>{product.name}</strong>
            </a>
          </MDBCardTitle>
          <MDBCardText>{product.description}</MDBCardText>
          <MDBCardFooter>
            <span className="float-left">₹{product.price}</span>
            <span className="float-right">
              <MDBTooltip placement="top">
                <MDBBtn
                  tag="a"
                  href="https://mdbootstrap.com"
                  target="_blank"
                  color="transparent"
                  size="lg"
                  className="p-1 m-0 mr-2 z-depth-0"
                >
                  <MDBIcon icon="eye" />
                </MDBBtn>
                <div>Quick Look</div>
              </MDBTooltip>
              <MDBTooltip placement="top">
                <MDBBtn
                  tag="a"
                  color="transparent"
                  size="lg"
                  className="p-1 m-0 z-depth-0"
                >
                  <MDBIcon icon="heart" />
                </MDBBtn>
                <div>Added to Wishlist</div>
              </MDBTooltip>
            </span>
          </MDBCardFooter>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default ProductCard;
