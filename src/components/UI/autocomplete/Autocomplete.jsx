import { useState } from "react";
import styles from "./Autocomplete.module.scss";
import { findLocation } from "../../../utils/searchLocation";

const Autocomplete = ({ children, query, setQuery }) => {
  const [flag, setFlag] = useState(false);
  const locations = findLocation(query);
  return (
    <div
      className={styles.autocomplete}
      onClick={() => setFlag(true)}
      onBlur={(e) => setFlag(false)}
    >
      <div className={styles.autocomplete__field}>{children}</div>
      {flag && query.length > 0 && (
        <ul className={styles["autocomplete-options"]}>
          {locations.map((item) => (
            <li
              key={item.id}
              className={styles["options__item"]}
              onMouseDown={(e) => {
                setQuery(item);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
