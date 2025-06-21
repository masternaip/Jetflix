<Route element={<PublicRoute />}>
  <Route path="/" element={<WelcomePage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup">
    <Route index element={<SignUp />} />
    <Route path="plan" element={<PlanPage />} />
  </Route>
</Route>
<Route element={<PrivateRoute />}>
  <Route path="/accounts" element={<AccountPage />} />
  <Route path="/YourAccount" element={<YourAccount />} />
  <Route path="/homepage/:id">
    <Route index element={<PageLayout component={<HomePage />} />} />
    <Route path=":movietype" element={<PageLayout component={<MovieList />} className={'nav-wrapper'} />} />
  </Route>
</Route>
