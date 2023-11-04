import { Layout } from "./components/Layout";
import { Routes, Route } from 'react-router-dom'
import { MainPage } from "./pages/MainPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice";
import { AccountPage } from "./pages/AccountPage";
import { PostPage } from "./pages/PostPage";
import { AddPostPage } from "./pages/AddPostPage";
import { EditPostPage } from "./pages/EditPostPage";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path=':id' element={<PostPage />} />
          <Route path=':id/edit' element={<EditPostPage />} />
          <Route path='new' element={<AddPostPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='me' element={<AccountPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
