import React from 'react'

const Header = () => (<header className="header">
  <div className="container">
    <div className="site">
      <a href="index.html">
        <img src="/images/logo.svg" alt="ESSENTIALS" />
      </a>
    </div>

    <nav className="nav">
      <ul>
        <li><a href="base-index.html">TOP</a></li>
        <li><a href="base-about.html">ABOUT</a></li>
      </ul>
    </nav>
  </div>
</header>)

export default Header