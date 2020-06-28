import React from 'react'

const Footer = () => (<footer className="footer">
  <div className="container">
    <div className="site">
      <a href="base-index.html">
        <img src="/images/logo-w.svg" alt="ESSENTIALS" />
        <p>おいしい食材と食事を探求するサイト</p>
      </a>
    </div>

    <ul className="sns">
      <li>
        <a href="https://twitter.com/">
          <i className="fab fa-twitter"></i>
          <span className="sr-only">Twitter</span>
        </a>
      </li>
      <li>
        <a href="https://facebook.com/">
          <i className="fab fa-facebook-square"></i>
          <span className="sr-only">Facebook</span>
        </a>
      </li>
      <li>
        <a href="http://instagram.com/">
          <i className="fab fa-instagram"></i>
          <span className="sr-only">Instagram</span>
        </a>
      </li>
    </ul>
  </div>
</footer>)

export default Footer