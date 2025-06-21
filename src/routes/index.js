<Route path="/login" element={<Login />} />
<Route path="/signup">
  <Route index element={<SignUp />} />
  <Route path="plan" element={<PlanPage />} />
</Route>
<Route element={<PrivateRoute />}>
  ...
</Route>
