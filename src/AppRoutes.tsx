import { Route, Routes } from "react-router";
import Auth from "./components/Auth";
import GuestRoute from "./components/auth/GuestRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";

function AppRoutes() {
  return (
    <Routes>
      {/* Guest only */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="auth" element={<Auth />} />
        </Route>
      </Route>

      {/* Auth required */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route element={<ProtectedRoute />}>
//         <Route element={<RootLayout />}>
//           <Route index path="/" element={<Home />} />
//         </Route>
//       </Route>
//       {/* <Route path="about" element={<About />} /> */}

//       <Route element={<ProtectedRoute />}>
//         <Route element={<AuthLayout />}>
//           <Route path="auth" element={<Auth />} />
//           {/* <Route path="register" element={<Register />} /> */}
//         </Route>
//       </Route>

//       {/* <Route path="concerts">
//         <Route index element={<ConcertsHome />} />
//         <Route path=":city" element={<City />} />
//         <Route path="trending" element={<Trending />} />
//       </Route>  */}
//     </Routes>
//   );
// }

export default AppRoutes;
