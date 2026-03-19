import React from "react"
import { Link } from "gatsby-plugin-intl"
import Sidebar from "react-sidebar"
import NavLinks from "./navlinks"
import Logo from "./logo"
import { Hamburger } from "./icons"
import NavButtons from "./navbuttons"

function SidebarContents({ onNavigate }) {
  const handleClick = event => {
    const link = event.target.closest("a")
    if (link && typeof onNavigate === "function") {
      onNavigate()
    }
  }

  return (
    <div className="sidebar-contents" onClick={handleClick}>
      <div className="logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="links text-secondary">
        <NavLinks />
      </div>
    </div>
  )
}

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navbarPlaceholderHeight: 100,
      sidebarOpen: false,
    }

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    this.menuOpen = this.menuOpen.bind(this)
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open })
  }

  menuOpen(event) {
    event.preventDefault()
    this.onSetSidebarOpen(true)
  }

  componentDidMount() {
    this.changeNavbarPlaceholderHeight()

    let logo = this.nav.querySelector(".logo"),
      _this = this

    logo.addEventListener("load", function () {
      _this.changeNavbarPlaceholderHeight()
    })

    this.changeNavbarHeight()
  }

  changeNavbarHeight() {
    if (typeof window != "undefined") {
      window.addEventListener("scroll", function () {
        if (this.scrollY > 0) {
          document.querySelector("nav.navbar-main").classList.add("scrolled")
        } else {
          document.querySelector("nav.navbar-main").classList.remove("scrolled")
        }
      })
    }
  }

  changeNavbarPlaceholderHeight() {
    let navBar = document.querySelector("nav.navbar-main")
    let navbarPlaceholderHeight = navBar.offsetHeight
    this.setState({
      navbarPlaceholderHeight: navbarPlaceholderHeight,
    })
  }

  render() {
    const placeholder = this.props.placeholder
    return (
      <React.Fragment>
        <Sidebar
          sidebar={<SidebarContents onNavigate={() => this.onSetSidebarOpen(false)} />}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          sidebarClassName="sidebar-content"
          styles={{
            sidebar: {
              zIndex: 2001,
              position: "fixed",
            },
            overlay: {
              zIndex: 2000,
              background: "rgba(0, 0, 0, 0.28)",
              backdropFilter: "blur(2px)",
            },
            dragHandle: {
              position: "fixed",
              zIndex: 2002,
            },
          }}
        >
          <span></span>
        </Sidebar>
        <nav className="navbar-main text-secondary" ref={c => (this.nav = c)}>
          <a href="#mobilenav" id="menu-open" onClick={this.menuOpen}>
            <span className="icon">
              <Hamburger />
            </span>
          </a>
          <Link to="/" className="logo">
            <Logo />
          </Link>
          <NavLinks />
          <div className="nav-actions">
            <NavButtons />
          </div>
        </nav>
        {placeholder && (
          <div
            className="navbar-placeholder"
            style={{
              height: this.state.navbarPlaceholderHeight + "px",
            }}
          />
        )}
      </React.Fragment>
    )
  }
}

export default Navbar
