import About from "@/pages/About";
import Auth from "@/pages/Auth";
import Cart from "@/pages/Cart";
import Collection from "@/pages/Collection";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Orders from "@/pages/Orders";
import PlaceOrders from "@/pages/PlaceOrders";
import Product from "@/pages/Product";

import AppLayouts from "@/components/layouts/AppLayout";
import NotFoundPage from "@/pages/NotFoundPage";
import Verify from "@/pages/Verify";

const Routes = [
	{
		path: "/",
		element: <AppLayouts />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "/about", element: <About /> },
			{ path: "/contact", element: <Contact /> },
			{ path: "/products", element: <Collection /> },
			{ path: "products/:id", element: <Product /> },
			{ path: "/cart", element: <Cart /> },
			{ path: "/auth", element: <Auth /> },
			{ path: "/orders", element: <Orders /> },
			{ path: "/checkout", element: <PlaceOrders /> },
			{ path: "/verify", element: <Verify /> },
			{ path: "*", element: <NotFoundPage /> },
		],
	},
];

export default Routes;
