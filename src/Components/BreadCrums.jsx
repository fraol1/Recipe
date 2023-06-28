import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function BreadCrums() {
  const location = useLocation();
  let currentLink = "";

  const crumb = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;
      return (
        <div className='crumb'>
          <Link to={currentLink} key={crumb}>{crumb}</Link>
        </div>
      );
    });

  return <div className='breadcrumbs'>{crumb}</div>;
}

export default BreadCrums;
