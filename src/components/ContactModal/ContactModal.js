import styles from "./styles.module.css";

export const ContactModal = () => {
  return (
    <div className={styles.main}>
      <form>
        <input placeholder="Name" />
        <input placeholder="Phone Number" />
        <input placeholder="Email Address" />
      </form>
    </div>
  );
};
