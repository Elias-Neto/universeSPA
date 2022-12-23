export default class Router {
  routes = {}

  addRoute(routName, route) {
    this.routes[routName] = route
  }

  makeLinkActive() {
    const navigationLinks = document.querySelectorAll("header nav ul li a")

    navigationLinks.forEach((a) => a.classList.remove("active"))

    const { pathname } = window.location

    const currentLink = document.querySelector(
      'header nav ul li a[href="' + pathname + '"]'
    )

    if (currentLink === null) {
      return
    } else {
      currentLink.classList.add("active")
    }
  }

  addCurrentPageAsClassToBody() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes["/"]
    const [_, pages, file] = route.split("/")
    const [className] = file.split(".")
    document.querySelector("body").setAttribute("class", className)
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState(null, null, event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location

    const route = this.routes[pathname] || this.routes[404]

    fetch(route)
      .then((data) => data.text())
      .then((html) => (document.querySelector("#App").innerHTML = html))

    this.makeLinkActive()
    this.addCurrentPageAsClassToBody()
  }
}
