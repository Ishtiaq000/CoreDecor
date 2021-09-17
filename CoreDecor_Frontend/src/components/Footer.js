import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPagePro = () => {
  return (
    <MDBFooter className="page-footer font-small pt-4 mt-4 footer-color">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol className="mb-4 mt-3 font-weight" md="8">
            <div className="text-center">
              <h6 className="text-uppercase font-weight-bold" style={{color:"white"}}>About Us</h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
            </div>
            <p className="text-center text-justify">
              CoreDecor is aimed to provide you with the latest in home
              furnishings, home decor and accessories at a price you can afford.
              We always carry products that will be the focus of your home's
              décor with superior selection, value, and quality. CoreDecor is
              more than just an online furniture store. We hand pick and curate
              the best in quality and style for you and your home. Why spend
              days driving from store to store trying to find that perfect look
              or unique piece. Find everything you're looking for and more from
              the comfort of your own home.
            </p>
          </MDBCol>

          <hr className="clearfix w-100 d-md-none" />
          <MDBCol
            lg="3"
            xl="3"
            className="text-uppercase mb-4 mt-3 font-weight"
          >
            <h6 className="text-uppercase font-weight-bold" style={{color:"white"}}>
              <strong>Contact</strong>
            </h6>
            <hr
              className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            <p>
              <i className="fas fa-building mr-3" /> Shop#12, Kala Khan Shopping Center, Shamsabad, Muree Road, Rawalpindi
            </p>
            <p>
              <i className="fa fa-envelope mr-3" /> Amjadbashir2090@gmail.com
            </p>
            <p>
              <i className="fa fa-phone mr-3" /> +92 321 5372090
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <hr />

     
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: CoreDecor
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPagePro;
