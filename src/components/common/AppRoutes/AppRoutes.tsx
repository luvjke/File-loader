import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from '../../../pages/Home';
import { RoutesMap } from '../../../common/constans';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path={RoutesMap.MAIN} element={<Home />} />
      </Routes>
    </>
  );
};
