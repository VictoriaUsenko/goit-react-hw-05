import { Link, Outlet } from "react-router-dom";
import css from "./MovieInfo.module.css";

export default function MovieInfo() {
  return (
    <div className={css.infoWrap}>
      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
