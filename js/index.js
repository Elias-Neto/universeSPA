import Router from "./router.js"

const router = new Router()

router.addRoute("/", "./pages/home.html")
router.addRoute("/universo", "./pages/universo.html")
router.addRoute("/exploracao", "./pages/exploracao.html")
router.addRoute(404, "./pages/404.html")

router.handle()
window.onpopstate = () => router.handle()
window.route = () => router.route()
