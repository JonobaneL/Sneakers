import React, { useState } from "react";
import styles from "./UserOrders.module.scss";
import { useAsync } from "../../hooks/useAsync";
import { useAuth } from "../../context/AuthContext";
import { getUserOrders } from "../../firebase/ordersFirebaseAPI";
import Loader from "../UI/loader/Loader";
import rightArrow from "../../images/right-arrow.svg";
import { groupByObject } from "../../utils/objectSort";
import { dateSortMethod, getMonth } from "../../utils/dateSort";
import { useNavigate } from "react-router-dom";
import Select from "../UI/select/Select";

const UserOrders = () => {
  const { currentUser } = useAuth();
  const [statusFilter, setStatusFilter] = useState(null);
  const [isLoading, , userOrders] = useAsync(
    () => getUserOrders(currentUser.uid, statusFilter),
    [statusFilter],
    "firebase"
  );
  const navigate = useNavigate();
  const groupedOrders = groupByObject(userOrders, "sortDate");
  const ordersKey = dateSortMethod(Object.keys(groupedOrders));
  return (
    <div className={styles.orders}>
      <div className={styles["list-header"]}>
        <p className={styles["single-column"]}>Orders</p>
        <p className={styles["column-title"]}>Order Number</p>
        <p className={styles["column-title"]}>Status</p>
        <p className={styles["column-title"]}>Total</p>
        <p className={styles["column-title"]}>Date</p>
      </div>
      <div className={styles["status-filter"]}>
        <Select
          type="borderType"
          placeholder="Status"
          height="45px"
          disabled={!statusFilter ? ["1"] : []}
          params={[
            { id: "1", value: "All" },
            { id: "2", value: "Ordered" },
            { id: "3", value: "Delivered" },
            { id: "4", value: "Canceled" },
          ]}
          getData={(option) => setStatusFilter(option?.value)}
        />
      </div>

      {isLoading ? (
        <div className={styles.wrapper}>
          <Loader />
        </div>
      ) : (
        ordersKey.map((key, index) => {
          const date = key.split("/");
          return (
            <div key={index} className={styles["order-group"]}>
              <h2 className={styles.month}>
                {getMonth(date[0])} {date[1]}
              </h2>
              <ul className={styles["orders-list"]}>
                {groupedOrders[key].reverse().map((item) => {
                  return (
                    <li
                      key={item.orderID}
                      className={styles.order}
                      onClick={() => navigate(`${item.orderID}`)}
                    >
                      <p>{item.orderID}</p>
                      <p className={styles.order__status}>
                        <span className={styles["field-name"]}>Status: </span>
                        {item.status}
                      </p>
                      <p className={styles.total}>
                        <span className={styles["field-name"]}>Total: </span>$
                        {item.userCart.cartTotal}
                      </p>
                      <p className={styles.date}>{item.date}</p>
                      <img
                        className={styles.arrow}
                        src={rightArrow}
                        alt="arrow"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UserOrders;
