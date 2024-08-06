import styles from "./connectButton.module.scss";

interface ConnectButtonProps {
  name: string;
  icon: string | undefined;
  connect: any;
}

const ConnectButton = ({ connect, icon, name }: ConnectButtonProps) => {
  return (
    <div className={styles.connectButtonContainer} onClick={connect}>
      <img src={icon} alt={name} />
      <span>{name}</span>
    </div>
  );
};

export default ConnectButton;
