import standartStyles from "../commonStyles.module.scss";
import styles from "./ShippingReturns.module.scss";

const ShippingReturns = () => {
  return (
    <div className={standartStyles.wrapper}>
      <div className={standartStyles.content}>
        <div className={styles.delivery}>
          <h1 className={standartStyles.title}>Shipping</h1>
          <h4 className={styles.type}>
            Delivery across Ukraine by the NovaPoshta postal service.
          </h4>
          <p className={styles.description}>
            In Ukraine, delivery is carried out within 1-2 days. Delivery in the
            cities of Ukraine to the branch of the transport company
            "NovaPoshta".
          </p>
          <h4 className={styles.type}>
            Delivery across Ukraine by the UkrPoshta postal service.
          </h4>
          <p className={styles.description}>
            In Ukraine, delivery is carried out within 1-3 days. Delivery in the
            cities of Ukraine to the branch of the transport company
            "UkrPoshta".
          </p>
          <h4 className={styles.type}>NovaPoshta or UkrPoshta courier</h4>
          <p className={styles.description}>
            In Ukraine, delivery is carried out within 1-2 days. Delivery to the
            specified address
          </p>
          <p className={styles.warning}>The buyer pays the COD commission.</p>
        </div>
        <div className={styles.returns}>
          <h1 className={standartStyles.title}>Exchange and return</h1>
          <h3 className={styles["sub-title"]}>
            Terms of exchange and return of quality goods
          </h3>
          <p className={styles.description}>
            In accordance with the Law of Ukraine "On the protection of consumer
            rights", within 14 days from the date of receipt of the order, you
            can return the ordered goods and get their cost back It is also
            possible to exchange for a different size or a different model of
            the product.
          </p>
          <p className={styles["sub-type"]}>
            In the case of an exchange or return, the client pays for the
            delivery of goods to the warehouse of the store. If the client
            decides not to exchange the goods, but to take the money, the cost
            of the goods is returned to him minus the transport costs. If the
            buyer did not notify the online store about the return of the goods,
            and did not pay for its delivery to us, the amount of costs will be
            deducted from the cost of the ordered goods.
          </p>
          <p className={styles.type}>
            The reason for the return was the error of the store employees.
          </p>
          <p className={styles.description}>
            The full cost of the order is returned to the client, and the store
            pays for the return shipment of the goods. Shop error means:
          </p>
          <ul className={styles.list}>
            <li>
              <span>-</span>not the model that is specified in the order was
              sent;
            </li>
            <li>
              <span>-</span>the wrong size was sent, which is indicated in the
              order;
            </li>
            <li>
              <span>-</span>the color of the model does not match the photo;
            </li>
            <li>
              <span>-</span>a clearly defective model was sent.
            </li>
          </ul>
          <p className={styles.type}>When making a parcel by mail</p>
          <ul className={styles.list}>
            <li>
              <span>-</span>a refund or exchange for another pair is made only
              after the parcel is returned to the store;
            </li>
            <li>
              <span>-</span>return of goods is carried out by a regular parcel,
              and not by cash on delivery. Parcels that customers send cash on
              delivery will not be picked up from the post office, since payment
              for the returned goods is made only after viewing the parcel;
            </li>
            <li>
              <span>-</span>when filling out the form for sending a parcel, it
              is imperative to indicate the full cost of the goods in the column
              “Varity of the parcel has been voiced”, since, in case of loss of
              the goods, this is the amount compensated by the carrier.
            </li>
          </ul>
          <h3 className={styles["sub-title"]}>A refund</h3>
          <p className={styles.description}>
            The money will be returned within 1-2 days from the date of receipt
            of the return at the post office. Refunds are made by bank transfer,
            based on the value of the product at the time of purchase.
          </p>
          <p className={styles.note}>
            Please note that only the cost of the item will be refunded. Return
            shipping costs are paid by the customer. The money transfer
            institution (bank or post office) deducts the money transfer fee
            from the refund amount. The exceptions are cases when the reason for
            the return was the error of the site's employees (see above). In
            this case, we compensate the cost of sending the return and pay for
            banking services for the transfer of funds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturns;
