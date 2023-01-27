import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <div className="Header">
      <div className="container">
        <div>
          <a href="/">FlashCardsSage</a>
        </div>

        <div>
          <a href="/">Decks</a>
        </div>
      </div>
    </div>
  );
}
