import React, { Component } from 'react';
import './Footer.css';
class Footer extends Component {
  render() {
    return (
        <div >
        <footer className="page-footer mdb-color black">
          <div className="footer-copyright text-right py-0.5 mr-5">© 2020 Copyright:
            <a href="/#"> LetsChat.com</a>
            <a className="TermOfUser" href="/#" data-toggle="modal" data-target="#modalTermOfUser">  Term of user</a>
            <a className="Privacy" href="/#" data-toggle="modal" data-target="#modalPrivacy">  Privacy and cookie policy</a>
          </div>
        </footer>
        <div className="modal fade" id="modalTermOfUser" tabIndex="-1" role="dialog" aria-labelledby="modalTermOfUser"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header blue-gradient">
                <h5 className="modal-title " id="modalTermOfUser">Term of user</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Microsoft collects data from you, through our interactions with you and through our products. You provide some of this data directly, and we get some of it by collecting data about your interactions, use, and experiences with our products. The data we collect depends on the context of your interactions with Microsoft and the choices you make, including your privacy settings and the products and features you use. We also obtain data about you from third parties.
                If you represent an organization, such as a business or school, that utilizes Enterprise and Developer Products from Microsoft, please see the Enterprise and developer products section of this privacy statement to learn how we process your data. If you are an end user of a Microsoft product or a Microsoft account provided by your organization, please see the Products provided by your organization and the Microsoft account sections for more information.
                You have choices when it comes to the technology you use and the data you share. When we ask you to provide personal data, you can decline. Many of our products require some personal data to provide you with a service. If you choose not to provide data required to provide you with a product or feature, you cannot use that product or feature. Likewise, where we need to collect personal data by law or to enter into or carry out a contract with you, and you do not provide the data, we will not be able to enter into the contract; or if this relates to an existing product you’re using, we may have to suspend or cancel it. We will notify you if this is the case at the time. Where providing the data is optional, and you choose not to share personal data, features like personalization that use such data will not work for you.
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary morpheus-den-gradient" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="modalPrivacy" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header blue-gradient">
                <h5 className="modal-title" id="exampleModalLongTitle">Privacy and cookie policy</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Your Privacy. Your privacy is important to us. Please read the Microsoft Privacy Statement (https://go.microsoft.com/fwlink/?LinkId=521839) (the "Privacy Statement") as it describes the types of data we collect from you and your devices ("Data"), how we use your Data, and the legal bases we have to process your Data. The Privacy Statement also describes how Microsoft uses your content, which is your communications with others; postings submitted by you to Microsoft via the Services; and the files, photos, documents, audio, digital works, livestreams and videos that you upload, store, broadcast or share through the Services ("Your Content"). Where processing is based on consent and to the extent permitted by law, by agreeing to these Terms, you consent to Microsoft’s collection, use and disclosure of Your Content and Data as described in the Privacy Statement. In some cases, we will provide separate notice and request your consent as referenced in the Privacy Statement.
                </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary morpheus-den-gradient" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        </div>


    );
  }

}

export default Footer;
