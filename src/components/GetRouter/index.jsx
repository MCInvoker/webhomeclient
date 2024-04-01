import { useRoutes } from 'react-router-dom';

import routes from '../../router';

export default function GetRouter() {
  let element = useRoutes(routes);
  return element;
}
