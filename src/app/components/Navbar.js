import React from 'react';
import Image from 'next/image';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark pconly">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="https://rarible.com/thealien888" target="_blank" rel="noopener">
              <Image src="/config/images/web/icon/openseadark.png" width={50} height={50} className="d-inline-block align-top" alt="Opensea" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://twitter.com/TheAlien888" target="_blank" rel="noopener">
              <Image src="/config/images/web/icon/twitter.png" width={50} height={50} className="d-inline-block align-top" alt="Twitter" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://guild.xyz/thealien888.html" target="_blank" rel="noopener">
              <Image src="/config/images/web/icon/discord.png" width={50} height={50} className="d-inline-block align-top" alt="Discord" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://www.instagram.com/TheAlien888" target="_blank" rel="noopener">
              <Image src="/config/images/web/icon/insta.png" width={50} height={50} className="d-inline-block align-top" alt="Instagram" />
            </a>
          </li>
        </ul>
        <div className="d-flex">
          <a className="btn btn-secondary me-2 btn-nav" style={{width:'100%'}}>Get Started</a>
          <a href="/gallery.html" className="btn btn-secondary me-2 btn-nav">Gallery</a>
          <a href="/mindmap.html" className="btn btn-secondary me-2 btn-nav">Mindmap</a>
          <a href="/team.html" className="btn btn-secondary me-2 btn-nav">Team</a>
          <a href="https://thealien888.izndgroup.com/p/thealien888-generative-nft-faq.html" className="btn btn-secondary me-2 btn-nav" target="_blank" rel="noopener">FAQ</a>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
