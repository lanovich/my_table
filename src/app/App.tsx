import styles from "./App.module.css";

import { mockPaymentRows } from "@/entities/payment/model";
import { PaymentsTable } from "@/entities/payment/ui";

const App = () => {
  const rows = mockPaymentRows;

  return (
    <div className={styles.tableWrapper}>
      <PaymentsTable rows={rows} />
    </div>
  );
};

export default App;
