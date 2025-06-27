import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Loader } from "lucide-react";

// import { useAuthStore } from "./store/useAuthStore";
import PrivateRoute from "./components/Private Route/PrivateRoute";
import { privateRoutes } from "./components/Private Route/privateRoutes";
import GenerateQR from "./components/GenerateQR";
import QRScanner from "./components/QRScanner";

const Landing = lazy(() => import("./pages/Landing"));
const Viewed = lazy(() => import("./pages/Viewed/Viewed"));
const ShortListedYou = lazy(() =>
  import("./pages/ShortListedYou/ShortListedYou")
);
const MyProfile = lazy(() => import("./pages/My Profile/MyProfile"));
const More = lazy(() => import("./pages/More/More"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const MyPhotos = lazy(() => import("./pages/MyPhotos/MyPhotos"));
const PartnerPreferences = lazy(() =>
  import("./pages/PartnerPreferences/PartnerPreferences")
);
const Home = lazy(() => import("./pages/Home/Home"));
const Matches = lazy(() => import("./pages/Matches/Matches"));
const UserProfilePage = lazy(() =>
  import("./pages/User's Profile/UserProfilePage")
);
const ShortlistOfUser = lazy(() =>
  import("./pages/User's Shortlist/ShortlistOfUser")
);
const FamilyDetails = lazy(() => import("./pages/FamilyDetails/FamilyDetails"));
const Hobby = lazy(() => import("./pages/Hobbies&Interests/Hobby"));
const ProfilePreview = lazy(() =>
  import("./pages/Profile Preview/ProfilePreview")
);
const CreateProfile = lazy(() =>
  import("./pages/Profile Creation/CreateProfile")
);
const Inbox = lazy(() => import("./pages/Inbox/Inbox"));
const App = () => {
  // const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const componentsMap = {
    Home,
    Matches,
    UserProfilePage,
    ShortlistOfUser,
    Viewed,
    ShortListedYou,
    More,
    Settings,
    MyPhotos,
    FamilyDetails,
    Hobby,
    ProfilePreview,
    CreateProfile,
    Inbox,
    MyProfile,
    PartnerPreferences,
  };
  const stepsMap = {
    "/profile-creation/about-me": "about-me",
    "/profile-creation/family-details": "family-details",
    "/profile-creation/upload-photo": "upload-photo",
    "/matches/all-matches": "all-matches",
    "/matches/photo-matches": "photo-matches",
    "/matches/profiles-with-horoscope": "profiles-with-horoscope",
    "/matches/hobby-matches": "hobby-matches",
  };
  // const user = {
  //   name: "Rudra Deb",
  //   age: 24,
  //   height: "5'9\"",
  //   weight: "72 kg",
  //   imageUrl:
  //     "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?ga=GA1.1.1426186378.1750559581&semt=ais_items_boosted&w=740", // replace with real profile pic URL
  // };
  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  // if (isCheckingAuth && !authUser)
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className="size-10 animate-spin" />
  //     </div>
  //   );
  return (
    <div>
      <ToastContainer />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />

          {privateRoutes.map(({ path, component }) => {
            const Component = componentsMap[component];
            const step = stepsMap[path];

            return (
              <Route
                key={path}
                path={path}
                element={
                  <PrivateRoute>
                    <Component {...(step ? { steps: step } : {})} />
                  </PrivateRoute>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
