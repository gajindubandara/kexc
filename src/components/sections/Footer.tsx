import React from 'react';
import { Row, Col, Typography, Space, Divider } from 'antd';
import {
    FacebookOutlined,
    InstagramOutlined,
    TwitterOutlined,
    LinkedinOutlined
} from '@ant-design/icons';
import logo from '../../assets/images/logo/full-logo_white.png';

const { Title, Text, Link } = Typography;

const Footer: React.FC = () => {
    return (
        <footer id="footer" style={{
            padding: '30px 24px'
        }}
        className="black-section">
            <Row gutter={[24, 24]} justify="space-between" style={{ fontFamily: "'OPTIBodoni-Antiqua', serif !important"}}>
                {/* Company Info */}
                <Col xs={24} sm={12} md={6}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <img
                            src={logo}
                            alt="Ken Exclusive Logo"
                            style={{ height: '60px', marginRight: '16px' }}
                        />
                        {/*<Title level={4} style={{ color: 'white', margin: 0 }}>*/}
                        {/*    Ken Exclusive*/}
                        {/*</Title>*/}
                    </div>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                        Premium Fashion & Luxury Clothing Brand dedicated to delivering
                        exceptional style and quality to discerning customers.
                    </Text>
                </Col>

                {/* Quick Links */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={5} style={{ color: 'white' }}>Quick Links</Title>
                    <Space direction="vertical">
                        <Link href="#home" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Home</Link>
                        <Link href="#collection" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Shop</Link>
                        <Link href="#exclusive" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Exclusive</Link>
                        <Link href="#offers" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Offers</Link>
                    </Space>
                </Col>

                {/* Contact Us */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={5} style={{ color: 'white' }}>Contact Us</Title>
                    <Space direction="vertical">
                        <Text style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                            Email: info@kenexclusive.com
                        </Text>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                            Phone: +1 (555) 123-4567
                        </Text>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                            Address: 123 Fashion Street, New York, NY 10001
                        </Text>
                    </Space>
                </Col>

                {/* Social Media */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={5} style={{ color: 'white' }}>Connect With Us</Title>
                    <Space size="large">
                        <Link href="#" style={{ color: 'white' }}>
                            <FacebookOutlined style={{ fontSize: '24px' }} />
                        </Link>
                        <Link href="#" style={{ color: 'white' }}>
                            <InstagramOutlined style={{ fontSize: '24px' }} />
                        </Link>
                        <Link href="#" style={{ color: 'white' }}>
                            <TwitterOutlined style={{ fontSize: '24px' }} />
                        </Link>
                        <Link href="#" style={{ color: 'white' }}>
                            <LinkedinOutlined style={{ fontSize: '24px' }} />
                        </Link>
                    </Space>
                </Col>
            </Row>

            <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }} />

            {/* Powered by G2 Labs */}
            <div style={{textAlign: 'center'}}>
                <a href="https://www.gtwolabs.com" target="_blank" style={{textDecoration: 'none'}}>
                    <Space align="center">
                        <img
                            src="https://res.cloudinary.com/dkznriytt/image/upload/f_auto,q_auto/v1/g2-site/zjgue0tgbm3rj5ihdbyz"
                            alt="G2 Labs Logo"
                            style={{height: '32px'}}
                        />
                        <Text style={{color: 'rgba(255, 255, 255, 0.75)'}}>Powered by G2 Labs</Text>
                    </Space>
                </a>
            </div>
        </footer>
    );
};

export default Footer;


// import React from 'react';
//
// const Footer: React.FC = () => {
//     return (
//         <footer className="bg-dark text-white py-5">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-4">
//                         <h5>Ken Exclusive</h5>
//                         <p>Premium Fashion & Luxury Clothing Brand</p>
//                     </div>
//                     <div className="col-md-4">
//                         <h5>Quick Links</h5>
//                         <ul className="list-unstyled">
//                             <li><a href="#home" className="text-white">Home</a></li>
//                             <li><a href="#shop" className="text-white">Shop</a></li>
//                             <li><a href="#exclusive" className="text-white">Exclusive</a></li>
//                             <li><a href="#offers" className="text-white">Offers</a></li>
//                         </ul>
//                     </div>
//                     <div className="col-md-4">
//                         <h5>Contact Us</h5>
//                         <p>Email: info@kenexclusive.com</p>
//                         <p>Phone: +1 (555) 123-4567</p>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };
//
// export default Footer;