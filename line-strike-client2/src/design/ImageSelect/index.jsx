import PropTypes from "prop-types";

import { Button } from "../Button";

import styles from "./styles.module.css";
import { Modal } from "../Modal";
import { Dialog } from "../Dialog";
import { useState } from "react";

export function ImageSelect({
  name,
  value,
  title,
  onChange,
  folder,
  collection,
}) {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const openModal = () => setOpen(true);
  return (
    <>
      <input
        type="hidden"
        name={name}
        value={value}
        onChange={(e) => e.preventDefault()}
      />
      <div className={styles.select}>
        <div className={styles.preview}>
          <img src={`/${folder}/${value}`} />
        </div>
        <Button onClick={openModal}>Change...</Button>
      </div>
      <Modal onClose={onClose} open={open}>
        <Dialog>
          <Dialog.Header>
            <h3>{title}</h3>
          </Dialog.Header>
          <Dialog.Body>
            <div className={styles.grid}>
              {collection.map((item) => (
                <Button
                  key={item}
                  onClick={() => {
                    onChange(item);
                    onClose();
                  }}
                >
                  <img src={`/${folder}/${item}`} className={styles.option} />
                </Button>
              ))}
            </div>
          </Dialog.Body>
        </Dialog>
      </Modal>
    </>
  );
}

ImageSelect.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  folder: PropTypes.string,
  collection: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};
